interface SettingsIconProps {
  className?: string;
}

function SettingsIcon({ className = "" }: SettingsIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 15.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.55 2.55l-.1-.1a1.8 1.8 0 0 0-3.06 1.27v.28a1.8 1.8 0 0 1-3.6 0v-.15A1.8 1.8 0 0 0 7.13 17.7l-.1.1a1.8 1.8 0 0 1-2.55-2.55l.1-.1A1.8 1.8 0 0 0 3.3 12.1h-.15a1.8 1.8 0 0 1 0-3.6h.15A1.8 1.8 0 0 0 4.57 5.44l-.1-.1a1.8 1.8 0 0 1 2.55-2.55l.1.1A1.8 1.8 0 0 0 10.18 1.6v-.15a1.8 1.8 0 0 1 3.6 0v.15a1.8 1.8 0 0 0 3.06 1.27l.1-.1a1.8 1.8 0 0 1 2.55 2.55l-.1.1a1.8 1.8 0 0 0 1.27 3.06h.15a1.8 1.8 0 0 1 0 3.6h-.15A1.8 1.8 0 0 0 19.4 15Z"
        transform="translate(1.5 1.5) scale(.875)"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SettingsIcon;
