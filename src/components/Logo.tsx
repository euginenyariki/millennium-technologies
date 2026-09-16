export default function Logo({
  className = "h-10 w-10",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
        <defs>
          <linearGradient id="mtlg" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#22c55e" />
            <stop offset="1" stopColor="#15803d" />
          </linearGradient>
        </defs>
        <path
          d="M24 3 42 13v22L24 45 6 35V13L24 3Z"
          stroke="url(#mtlg)"
          strokeWidth="2"
          fill="rgba(34,197,94,0.06)"
        />
        <path d="M14 32V16h4l6 10 6-10h4v16h-4V23l-6 9-6-9v9h-4Z" fill="url(#mtlg)" />
        <path d="M14 39h20" stroke="url(#mtlg)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {!compact && (
        <span className="leading-tight text-left">
          <span className="block text-base font-bold tracking-tight text-white">
            MILLENNIUM
          </span>
          <span className="block text-[11px] font-medium tracking-[0.25em] text-green-500 uppercase">
            Technologies
          </span>
        </span>
      )}
    </span>
  );
}