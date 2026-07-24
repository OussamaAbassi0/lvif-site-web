export default function Wordmark({ className = '' }) {
  return (
    <span className={`inline-flex items-baseline gap-[0.55rem] ${className}`}>
      <span
        aria-hidden="true"
        className="grid h-[1.15em] w-[1.15em] shrink-0 translate-y-[0.12em] grid-cols-3 grid-rows-3 gap-[2px]"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((cell) => (
          <span
            key={cell}
            className={
              cell === 4 || cell === 1 || cell === 3 || cell === 5 || cell === 7
                ? 'bg-signal'
                : 'bg-hairline'
            }
          />
        ))}
      </span>
      <span className="font-[family-name:var(--font-display)] text-[0.95rem] font-bold uppercase tracking-[0.16em] [font-stretch:112%]">
        LVI
        <span className="text-signal">F</span>
      </span>
    </span>
  );
}
