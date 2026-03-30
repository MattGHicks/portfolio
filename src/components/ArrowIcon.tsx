interface ArrowIconProps {
  stroke?: string;
  className?: string;
}

export default function ArrowIcon({ stroke = "currentColor", className = "arrow-icon" }: ArrowIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 4.5H13M13 4.5L9.5 1M13 4.5L9.5 8"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
