const bars = [18, 34, 22, 48, 28, 56, 20, 42, 30, 62, 24, 50, 18, 38, 26, 46];

export function Waveform() {
  return (
    <div className="flex h-16 items-end gap-1" aria-hidden>
      {bars.map((height, index) => (
        <span
          key={index}
          className="wave-bar w-1 rounded-full bg-linear-to-t from-violet to-cyan"
          style={{
            height: `${height}px`,
            animationDelay: `${index * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}
