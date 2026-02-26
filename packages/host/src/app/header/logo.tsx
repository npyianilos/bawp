import { useId } from 'react';

type LogoProps = React.SVGProps<SVGSVGElement> & {
  /** Sets both width/height (overridden by explicit width/height props). */
  size?: number | string;
  /** Accessible label. Set to undefined to mark as decorative. */
  title?: string;
};

export function AwpLogo({
  size = 128,
  title = 'Bluebook Authentic Work Platform logo mark',
  ...props
}: LogoProps) {
  // Avoid clipPath id collisions if you render this multiple times on a page
  const clipId = useId();

  const ariaProps =
    title != null
      ? { role: 'img' as const, 'aria-label': title }
      : { 'aria-hidden': true };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? size}
      height={props.height ?? size}
      viewBox="0 0 512 512"
      {...ariaProps}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M256 48 C198 82, 146 94, 96 110 V256 C96 354, 162 430, 256 464 C350 430, 416 354, 416 256 V110 C366 94, 314 82, 256 48 Z" />
        </clipPath>
      </defs>

      {/* Shield base */}
      <path
        d="M256 48 C198 82, 146 94, 96 110 V256 C96 354, 162 430, 256 464 C350 430, 416 354, 416 256 V110 C366 94, 314 82, 256 48 Z"
        fill="#1B2264"
      />

      {/* Shield outline */}
      <path
        d="M256 48 C198 82, 146 94, 96 110 V256 C96 354, 162 430, 256 464 C350 430, 416 354, 416 256 V110 C366 94, 314 82, 256 48 Z"
        fill="none"
        stroke="#324DC7"
        strokeWidth={14}
        strokeLinejoin="round"
      />

      {/* Blueprint grid + spine + check (clipped) */}
      <g clipPath={`url(#${clipId})`}>
        {/* vertical grid */}
        <g>
          <line
            x1="136"
            y1="96"
            x2="136"
            y2="464"
            stroke="#E6EDF8"
            strokeWidth={3}
            opacity={0.65}
          />
          <line
            x1="176"
            y1="80"
            x2="176"
            y2="480"
            stroke="#E6EDF8"
            strokeWidth={3}
            opacity={0.65}
          />
          <line
            x1="216"
            y1="64"
            x2="216"
            y2="496"
            stroke="#F5F7FC"
            strokeWidth={4}
            opacity={0.75}
          />
          <line
            x1="296"
            y1="64"
            x2="296"
            y2="496"
            stroke="#E6EDF8"
            strokeWidth={3}
            opacity={0.65}
          />
          <line
            x1="336"
            y1="80"
            x2="336"
            y2="480"
            stroke="#E6EDF8"
            strokeWidth={3}
            opacity={0.65}
          />
          <line
            x1="376"
            y1="96"
            x2="376"
            y2="464"
            stroke="#E6EDF8"
            strokeWidth={3}
            opacity={0.65}
          />
        </g>

        {/* horizontal grid */}
        <g>
          <line
            x1="96"
            y1="152"
            x2="416"
            y2="152"
            stroke="#E6EDF8"
            strokeWidth={3}
            opacity={0.65}
          />
          <line
            x1="96"
            y1="192"
            x2="416"
            y2="192"
            stroke="#E6EDF8"
            strokeWidth={3}
            opacity={0.65}
          />
          <line
            x1="96"
            y1="232"
            x2="416"
            y2="232"
            stroke="#F5F7FC"
            strokeWidth={4}
            opacity={0.75}
          />
          <line
            x1="96"
            y1="272"
            x2="416"
            y2="272"
            stroke="#E6EDF8"
            strokeWidth={3}
            opacity={0.65}
          />
          <line
            x1="96"
            y1="312"
            x2="416"
            y2="312"
            stroke="#E6EDF8"
            strokeWidth={3}
            opacity={0.65}
          />
          <line
            x1="96"
            y1="352"
            x2="416"
            y2="352"
            stroke="#E6EDF8"
            strokeWidth={3}
            opacity={0.65}
          />
        </g>

        {/* "book spine" */}
        <rect
          x="252"
          y="120"
          width="8"
          height="280"
          rx="4"
          fill="#28369A"
          opacity={0.9}
        />

        {/* Check mark */}
        <path
          d="M176 276 L232 332 L352 206"
          fill="none"
          stroke="#F5F7FC"
          strokeWidth={18}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
