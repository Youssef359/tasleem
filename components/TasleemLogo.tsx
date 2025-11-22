export function TasleemLogo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Abstract geometric line-art logo */}
      <path
        d="M20 4L36 14V26L20 36L4 26V14L20 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      />
      <path
        d="M20 4V20M20 20L36 26M20 20L4 26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      />
      <circle
        cx="20"
        cy="20"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-white"
      />
    </svg>
  );
}