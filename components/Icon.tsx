interface IconProps {
  name: string;
  className?: string;
}

const paths: Record<string, JSX.Element> = {
  pickaxe: (
    <>
      <path d="M14.5 3.5c3 1 5.5 3.5 6 6.5-2-.5-4-1.5-5.5-3M14.5 3.5 4 14a2 2 0 0 0 0 3l3 3a2 2 0 0 0 3 0L20.5 10c-2-1.5-4-4.5-6-6.5Z" />
      <path d="m6.5 15.5 2 2" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="9" cy="7" rx="6" ry="3.5" />
      <path d="M3 7v4c0 1.9 2.7 3.5 6 3.5s6-1.6 6-3.5V7" />
      <path d="M3 11v4c0 1.9 2.7 3.5 6 3.5.7 0 1.4-.06 2-.2" />
      <ellipse cx="17" cy="14" rx="4.2" ry="2.6" />
      <path d="M12.8 14v3.2c0 1.4 1.9 2.6 4.2 2.6s4.2-1.2 4.2-2.6V14" />
    </>
  ),
  swords: (
    <>
      <path d="m14.5 4 5.5 5.5-1.5 1.5-1-1L14 13.5 10.5 17 6 12.5 9.5 9l3.5-3.5-1-1L13.5 3l1 1Z" />
      <path d="M4.5 20.5 8 17" />
      <path d="m17 13 3.5 3.5-1.5 1.5L15.5 14.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v6c0 4.6 3.2 7.8 7.5 9 4.3-1.2 7.5-4.4 7.5-9V6L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3v3M12 18v3M4.2 4.2l2 2M17.8 17.8l2 2M3 12h3M18 12h3M4.2 19.8l2-2M17.8 6.2l2-2" />
      <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 14.6c2.4.2 4.5 2.2 4.5 5.4" />
    </>
  ),
  server: (
    <>
      <rect x="3.5" y="4" width="17" height="6" rx="1.5" />
      <rect x="3.5" y="14" width="17" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-1.7 5.2-5.2 1.7 1.7-5.2 5.2-1.7Z" />
    </>
  ),
  gift: (
    <>
      <rect x="3.5" y="9" width="17" height="4" rx="0.6" />
      <path d="M5 13v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7" />
      <path d="M12 9v12" />
      <path d="M12 9C10 5 6.5 5.5 6.5 7.5S9.5 9 12 9Z" />
      <path d="M12 9c2-4 5.5-3.5 5.5-1.5S14.5 9 12 9Z" />
    </>
  ),
  star: (
    <path d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.4 20.1l1.4-6.3-4.8-4.3 6.4-.6L12 3Z" />
  ),
  crown: (
    <path d="m3 8 4 3 5-6 5 6 4-3-1.5 10.5h-15L3 8Z" />
  ),
};

export default function Icon({ name, className = "h-6 w-6" }: IconProps) {
  const path = paths[name] || paths.sparkles;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}
