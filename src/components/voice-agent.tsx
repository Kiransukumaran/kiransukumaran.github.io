"use client";

import { useEffect, useRef, useState } from "react";
import { knowledgeReply } from "@/lib/agent/knowledge-reply";

type Role = "user" | "assistant";
type Turn = { role: Role; content: string };
type Status = "idle" | "listening" | "thinking" | "speaking";

type ChatResponse = {
  reply: string;
  stored?: boolean;
  cvSent?: boolean;
  email?: string;
  downloadUrl?: string;
};

async function askAgent(messages: Turn[]): Promise<ChatResponse> {
  try {
    const response = await fetch("/api/agent/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
    if (response.ok) {
      return (await response.json()) as ChatResponse;
    }
  } catch {
    /* static hosts have no API */
  }

  const lastUser = [...messages].reverse().find((item) => item.role === "user");
  const result = knowledgeReply(messages, lastUser?.content || "");
  return {
    reply: result.reply,
    email: result.email,
    downloadUrl: result.downloadUrl || "/kiran-sukumaran-cv.pdf",
  };
}

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function getRecognitionCtor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function waitForVoices(): Promise<SpeechSynthesisVoice[]> {
  const existing = window.speechSynthesis.getVoices();
  if (existing.length) return Promise.resolve(existing);

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.speechSynthesis.removeEventListener("voiceschanged", finish);
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener("voiceschanged", finish);
    window.setTimeout(finish, 1500);
  });
}

export function VoiceAgent() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [interim, setInterim] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [leadEmail, setLeadEmail] = useState<string | null>(null);
  const [cvSent, setCvSent] = useState(false);
  const [error, setError] = useState("");
  const [voiceReady, setVoiceReady] = useState(false);

  const activeRef = useRef(false);
  const busyRef = useRef(false);
  const turnsRef = useRef<Turn[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const statusRef = useRef<Status>("idle");
  const lockedVoiceUriRef = useRef<string | null>(null);
  const restartTimerRef = useRef<number | null>(null);

  useEffect(() => {
    turnsRef.current = turns;
  }, [turns]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    setVoiceReady(Boolean(getRecognitionCtor()));
    const warm = () => {
      window.speechSynthesis.getVoices();
    };
    warm();
    window.speechSynthesis.addEventListener("voiceschanged", warm);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", warm);
      window.speechSynthesis.cancel();
      if (restartTimerRef.current) window.clearTimeout(restartTimerRef.current);
      recognitionRef.current?.abort();
    };
  }, []);

  function selectVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
    if (lockedVoiceUriRef.current) {
      const locked = voices.find((voice) => voice.voiceURI === lockedVoiceUriRef.current);
      if (locked) return locked;
    }
    const preferred =
      voices.find(
        (voice) => /en-US|en-GB/i.test(voice.lang) && /female|samantha|google/i.test(voice.name),
      ) || voices.find((voice) => /en-US/i.test(voice.lang)) || voices.find((voice) => /en-/i.test(voice.lang));
    if (preferred) lockedVoiceUriRef.current = preferred.voiceURI;
    return preferred;
  }

  async function speak(text: string) {
    const voices = await waitForVoices();
    const voice = selectVoice(voices);

    window.speechSynthesis.cancel();
    await delay(80);

    await new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.02;
      utterance.pitch = 1;
      if (voice) utterance.voice = voice;

      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        window.clearInterval(watchdog);
        resolve();
      };

      utterance.onend = finish;
      utterance.onerror = finish;

      const words = Math.max(1, text.trim().split(/\s+/).filter(Boolean).length);
      const estimatedMs = words * 400 + 1200;
      const hardCap = estimatedMs + 2500;
      const started = Date.now();
      let wasSpeaking = false;

      const watchdog = window.setInterval(() => {
        const speaking = window.speechSynthesis.speaking || window.speechSynthesis.pending;
        if (speaking) wasSpeaking = true;
        const elapsed = Date.now() - started;
        if ((wasSpeaking && !speaking) || (!speaking && elapsed > estimatedMs) || elapsed > hardCap) {
          finish();
        }
      }, 180);

      window.speechSynthesis.speak(utterance);
    });

    window.speechSynthesis.cancel();
    await delay(450);
  }

  function ensureRecognition(): SpeechRecognition | null {
    if (recognitionRef.current) return recognitionRef.current;
    const Ctor = getRecognitionCtor();
    if (!Ctor) return null;
    const recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;
    return recognition;
  }

  function listen() {
    if (!activeRef.current) return;
    const recognition = ensureRecognition();
    if (!recognition) {
      setError("Voice input needs Chrome or Edge. You can still type below.");
      setStatus("idle");
      return;
    }

    setStatus("listening");
    setInterim("");

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const piece = result[0]?.transcript || "";
        if (result.isFinal) finalText += piece;
        else interimText += piece;
      }
      if (interimText) setInterim(interimText.trim());
      const collected = finalText.trim();
      if (collected) {
        setInterim("");
        void sendTurn(collected);
      }
    };

    recognition.onerror = (event) => {
      const code = event.error;
      if (code === "aborted" || code === "no-speech") return;
      if (code === "not-allowed") {
        setError("Microphone access was denied. You can still type below.");
        setStatus("idle");
        return;
      }
      setError(`Voice input error: ${code}. You can still type below.`);
    };

    recognition.onend = () => {
      if (!activeRef.current || statusRef.current !== "listening") return;
      if (restartTimerRef.current) window.clearTimeout(restartTimerRef.current);
      restartTimerRef.current = window.setTimeout(() => {
        restartTimerRef.current = null;
        if (!activeRef.current || statusRef.current !== "listening") return;
        try {
          recognition.start();
        } catch {
          // already started
        }
      }, 200);
    };

    try {
      recognition.start();
    } catch {
      if (restartTimerRef.current) window.clearTimeout(restartTimerRef.current);
      restartTimerRef.current = window.setTimeout(() => {
        restartTimerRef.current = null;
        if (!activeRef.current || statusRef.current !== "listening") return;
        try {
          recognition.start();
        } catch {
          // already started
        }
      }, 200);
    }
  }

  async function sendTurn(content: string) {
    if (!content.trim() || !activeRef.current || busyRef.current) return;
    busyRef.current = true;
    recognitionRef.current?.abort();
    setInterim("");
    setError("");
    const nextTurns: Turn[] = [...turnsRef.current, { role: "user", content }];
    setTurns(nextTurns);
    setStatus("thinking");

    try {
      const data = await askAgent(nextTurns);
      const reply = data.reply || "I am here.";
      const withReply: Turn[] = [...nextTurns, { role: "assistant", content: reply }];
      setTurns(withReply);
      if (data.downloadUrl) setDownloadUrl(data.downloadUrl);
      if (data.email) setLeadEmail(data.email);
      if (data.cvSent) setCvSent(true);
      setStatus("speaking");
      await speak(reply);
      busyRef.current = false;
      if (activeRef.current) listen();
      else setStatus("idle");
    } catch {
      setError("The agent could not answer just then. Try again.");
      busyRef.current = false;
      if (activeRef.current) listen();
      else setStatus("idle");
    }
  }

  async function requestMicrophone() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Microphone is not available. You can still type below.");
      return false;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch {
      setError("Microphone access was denied. You can still type below.");
      return false;
    }
  }

  async function startCall() {
    setOpen(true);
    activeRef.current = true;
    busyRef.current = false;
    setError("");
    setTurns([]);
    setDownloadUrl(null);
    setLeadEmail(null);
    setCvSent(false);
    setInterim("");

    await requestMicrophone();

    setStatus("thinking");
    try {
      const data = await askAgent([]);
      const reply = data.reply || "I am here.";
      setTurns([{ role: "assistant", content: reply }]);
      if (data.downloadUrl) setDownloadUrl(data.downloadUrl);
      setStatus("speaking");
      await speak(reply);
      if (activeRef.current) listen();
      else setStatus("idle");
    } catch {
      setError("The agent could not start just then. Try again or type below.");
      if (activeRef.current) listen();
      else setStatus("idle");
    }
  }

  function endCall() {
    activeRef.current = false;
    busyRef.current = false;
    if (restartTimerRef.current) window.clearTimeout(restartTimerRef.current);
    recognitionRef.current?.abort();
    window.speechSynthesis.cancel();
    setStatus("idle");
    setInterim("");
  }

  function restartListen() {
    if (!activeRef.current) {
      activeRef.current = true;
      setOpen(true);
    }
    setError("");
    window.speechSynthesis.cancel();
    recognitionRef.current?.abort();
    setStatus("listening");
    window.setTimeout(() => {
      if (activeRef.current) listen();
    }, 250);
  }

  function toggle() {
    if (activeRef.current) {
      endCall();
      setOpen(false);
      return;
    }
    void startCall();
  }

  return (
    <div className="voice-dock">
      {open ? (
        <section className="hud-frame voice-panel">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-cyan uppercase">
                Web call // Milo
              </p>
              <p className="mt-1 text-sm text-ice">AI personal assistant</p>
            </div>
            <span className="font-mono text-[10px] tracking-[0.16em] text-violet uppercase">
              {status === "listening" ? "listening — speak" : status}
            </span>
          </div>

          <div className="voice-wave" aria-hidden>
            {Array.from({ length: 12 }).map((_, index) => (
              <span
                key={index}
                className={status === "listening" || status === "speaking" ? "wave-bar" : ""}
                style={{
                  height: status === "idle" ? "8px" : `${10 + ((index * 7) % 22)}px`,
                  animationDelay: `${index * 0.07}s`,
                }}
              />
            ))}
          </div>

          <div className="voice-log">
            {turns.slice(-4).map((turn, index) => (
              <p key={`${turn.role}-${index}`} className={turn.role === "assistant" ? "text-ice" : "text-cyan"}>
                <span className="font-mono text-[10px] text-muted uppercase">
                  {turn.role === "assistant" ? "Milo" : "You"} ·{" "}
                </span>
                {turn.content}
              </p>
            ))}
            {interim ? (
              <p className="text-muted">
                <span className="font-mono text-[10px] uppercase">You · </span>
                {interim}
              </p>
            ) : null}
          </div>

          {leadEmail ? (
            <p className="font-mono text-[11px] text-cyan">
              Stored {leadEmail}
              {cvSent ? " · CV sent" : ""}
            </p>
          ) : null}
          {downloadUrl ? (
            <a href={downloadUrl} className="font-mono text-[11px] text-violet underline underline-offset-4">
              Download CV
            </a>
          ) : null}
          {error ? <p className="text-xs text-magenta">{error}</p> : null}

          <form
            className="mt-3 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              const value = draft.trim();
              if (!value) return;
              setDraft("");
              if (!activeRef.current) {
                activeRef.current = true;
                setOpen(true);
              }
              void sendTurn(value);
            }}
          >
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Or type here…"
              className="min-w-0 flex-1 border border-line bg-ink/80 px-3 py-2 font-mono text-xs text-ice outline-none focus:border-cyan"
            />
            <button
              type="button"
              onClick={restartListen}
              disabled={!voiceReady}
              className="border border-violet/40 px-3 py-2 font-mono text-[10px] text-violet uppercase disabled:opacity-40"
            >
              Speak
            </button>
            <button type="submit" className="border border-cyan/40 px-3 py-2 font-mono text-[10px] text-cyan uppercase">
              Send
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={toggle}
        className={`voice-orb ${activeRef.current ? "voice-orb-live" : ""}`}
        aria-label={activeRef.current ? "End voice call" : "Start voice call"}
      >
        <span className="voice-orb-core" />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
          {activeRef.current ? "End" : "Call"}
        </span>
      </button>
    </div>
  );
}
