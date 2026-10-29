import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  color?: string;
}

/**
 * Figma Frame 909 Vector 33.33x33.33 in 40x40 box:
 * LinkedIn filled rounded emblem with 'in' cutout matching the design
 */
export const LinkedInIcon: React.FC<IconProps> = ({
  size = 34,
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <rect width="34" height="34" rx="5" fill={color} />
    <circle cx="8.5" cy="8.5" r="2.2" fill="#FAF6EE" />
    <rect x="6.5" y="13" width="4" height="13.5" rx="0.5" fill="#FAF6EE" />
    <path
      d="M14.5 13H18.2V15C19 13.8 20.6 12.8 22.8 12.8C26.5 12.8 27.5 15.2 27.5 19.2V26.5H23.5V19.8C23.5 17.8 22.8 16.5 21 16.5C19.2 16.5 18.2 17.8 18.2 19.8V26.5H14.5V13Z"
      fill="#FAF6EE"
    />
  </svg>
);

/**
 * Figma Frame 908 Vector 34x23.16 in 34x34 box:
 * Closed envelope symbol matching the design
 */
export const EnvelopeIcon: React.FC<IconProps> = ({
  size = 34,
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={Math.round((size * 23.2) / 34)}
    viewBox="0 0 34 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <rect
      x="1"
      y="1.5"
      width="32"
      height="21"
      rx="3"
      stroke={color}
      strokeWidth="2.4"
      fill="none"
    />
    <path
      d="M2 3L17 14L32 3"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({
  size = 18,
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({
  size = 18,
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const SparkleIcon: React.FC<IconProps> = ({
  size = 16,
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
  </svg>
);
