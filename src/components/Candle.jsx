// The candle from Loop St.'s tables: a white candle in a wine bottle under its own wax drips.
// Lit while the doors are open; a wisp of smoke while they are closed.
export default function Candle({ lit, size = 72 }) {
  return (
    <svg
      className={`candle ${lit ? 'is-lit' : 'is-out'}`}
      width={size * (40 / 96)}
      height={size}
      viewBox="0 0 40 96"
      aria-hidden="true"
      focusable="false"
    >
      <g className="candle__flame">
        <path d="M20 2c4.2 5.6 5.8 9.6 5.8 12.9A5.8 5.8 0 0 1 20 20.7a5.8 5.8 0 0 1-5.8-5.8C14.2 11.6 15.8 7.6 20 2Z" fill="var(--accent)" />
        <path d="M20 10.5c1.8 2.6 2.4 4.3 2.4 5.6a2.4 2.4 0 0 1-4.8 0c0-1.3.6-3 2.4-5.6Z" fill="var(--ink)" />
      </g>
      <path className="candle__smoke" d="M20 19c-2.6-3.4 2.6-5.2 0-8.6s2.6-5.2 0-8.4" fill="none" stroke="var(--muted)" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M20 20.5v4" stroke="var(--ink)" strokeWidth="1.3" strokeLinecap="round" />
      {/* the bottle */}
      <path d="M15 40h10v14c0 4 9 7 9 15v23a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V69c0-8 9-11 9-15Z" fill="#2c2520" />
      <path d="M10 70h3.2v20H10Z" fill="#3d342d" />
      {/* the candle and its wax running down the neck */}
      <path d="M15.5 24h9v18h-9Z" fill="var(--ink)" />
      <path
        d="M14 40h12v3c-.9 0-1 6-2 6s-1-3-1.9-3-1 9.5-2.2 9.5-1.2-6.5-2.1-6.5-.9 3.2-1.9 3.2S14.8 43 14 43Z"
        fill="#d8d1c5"
      />
    </svg>
  );
}
