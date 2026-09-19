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
          <linearGradient id="nglg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22c55e" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>
        <path
          d="M24 2.5 42.5 12.5v11.4c0 9.1-6.3 17.2-18.5 21.9-12.2-4.7-18.5-12.8-18.5-21.9V12.5L24 2.5Z"
          fill="rgba(34,197,94,0.07)"
          stroke="url(#nglg)"
          strokeWidth="2.2"
        />
        <path
          d="M24 10 36 17.2v7.6L24 31.9 12 24.8v-7.6L24 10Z"
          stroke="rgba(34,197,94,0.35)"
          strokeWidth="1"
        />
        <path
          d="M17 32.5V15.5h3.6l7 9.4V15.5h3.4v17h-3.6l-7-9.4v9.4H17Z"
          fill="url(#nglg)"
        />
        <path
          d="M15.5 38.5h17"
          stroke="url(#nglg)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      {!compact && (
        <span className="leading-tight text-left">
          <span className="block text-base font-bold tracking-tight text-white">
            NEXGUARD
          </span>
          <span className="block text-[11px] font-medium tracking-[0.25em] text-green-500 uppercase">
            Technologies
          </span>
        </span>
      )}
    </span>
  );
}