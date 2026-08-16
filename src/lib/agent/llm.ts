import { buildSystemPrompt } from "@/lib/agent/knowledge";
import { localReply, type ChatMessage } from "@/lib/agent/local-brain";
import { agentTools, runTool, type ToolResult } from "@/lib/agent/tools";

export function llmConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

type OpenAiMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  tool_call_id?: string;
  tool_calls?: Array<{
    id: string;
    function: { name: string; arguments: string };
  }>;
};

export async function runAgentTurn(history: ChatMessage[]): Promise<{
  reply: string;
  tool?: ToolResult;
}> {
  const lastUser = [...history].reverse().find((item) => item.role === "user");
  if (!lastUser) {
    const fallback = await localReply(history, "");
    return fallback;
  }

  if (!llmConfigured()) {
    return localReply(history, lastUser.content);
  }

  try {
    return await runOpenAi(history);
  } catch (error) {
    console.error("LLM turn failed, using local brain", error);
    return localReply(history, lastUser.content);
  }
}

async function runOpenAi(history: ChatMessage[]): Promise<{
  reply: string;
  tool?: ToolResult;
}> {
  const baseUrl = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(
    /\/$/,
    "",
  );
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const messages: OpenAiMessage[] = [
    { role: "system", content: buildSystemPrompt() },
    ...history.map((item) => ({ role: item.role, content: item.content })),
  ];

  const first = await complete(baseUrl, model, messages);
  const toolCall = first.choices?.[0]?.message?.tool_calls?.[0];

  if (toolCall?.function?.name) {
    let args: { email?: string; name?: string } = {};
    try {
      args = JSON.parse(toolCall.function.arguments || "{}") as {
        email?: string;
        name?: string;
      };
    } catch {
      args = {};
    }
    const tool = await runTool(toolCall.function.name, args);
    messages.push({
      role: "assistant",
      content: first.choices?.[0]?.message?.content || "",
      tool_calls: first.choices?.[0]?.message?.tool_calls,
    });
    messages.push({
      role: "tool",
      tool_call_id: toolCall.id,
      content: JSON.stringify(tool),
    });

    const second = await complete(baseUrl, model, messages, false);
    const reply =
      second.choices?.[0]?.message?.content?.trim() || tool.message;
    return { reply, tool };
  }

  const reply =
    first.choices?.[0]?.message?.content?.trim() ||
    "I can tell you about Kiran, or email you his CV.";
  return { reply };
}

async function complete(
  baseUrl: string,
  model: string,
  messages: OpenAiMessage[],
  withTools = true,
) {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      messages,
      ...(withTools ? { tools: agentTools, tool_choice: "auto" } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI ${response.status}: ${await response.text()}`);
  }

  return (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string;
        tool_calls?: Array<{
          id: string;
          function: { name: string; arguments: string };
        }>;
      };
    }>;
  };
}
