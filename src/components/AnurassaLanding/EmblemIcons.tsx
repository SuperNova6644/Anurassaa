import React from "react";

export interface EmblemProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  color?: string;
}

/**
 * Segmented Green Nature Emblem 1 matching Figma 40x40 node
 * A thin circular frame containing a delicate organic botanical twig with leaves.
 */
export const SegmentedNatureEmblem: React.FC<EmblemProps> = ({
  size = 40,
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    {/* Outer circle */}
    <circle
      cx="20"
      cy="20"
      r="17.5"
      stroke={color}
      strokeWidth="1.15"
      opacity="0.9"
    />
    {/* Central diagonal branch */}
    <path
      d="M13.5 26.5C16.5 23 21 17.5 26.5 13.5"
      stroke={color}
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    {/* Leaf pair 1 (top right) */}
    <path
      d="M23 16C24.2 13.8 26.8 13.5 27.2 15.2C27.5 16.8 25.2 17.5 23 16Z"
      stroke={color}
      strokeWidth="0.95"
      fill="none"
    />
    {/* Leaf pair 2 (middle left) */}
    <path
      d="M19.5 19.5C17.5 18 16.8 15.5 18.5 15C20.2 14.5 20.8 17.2 19.5 19.5Z"
      stroke={color}
      strokeWidth="0.95"
      fill="none"
    />
    {/* Leaf pair 3 (middle right) */}
    <path
      d="M20.5 21C22.5 22.5 24.5 22 24.2 20.2C23.8 18.8 21.8 19.5 20.5 21Z"
      stroke={color}
      strokeWidth="0.95"
      fill="none"
    />
    {/* Leaf pair 4 (bottom left) */}
    <path
      d="M16 23.5C14 24.8 13.5 26.8 15 27.2C16.5 27.5 17.2 25.5 16 23.5Z"
      stroke={color}
      strokeWidth="0.95"
      fill="none"
    />
  </svg>
);

export const SproutEmblem: React.FC<EmblemProps> = ({
  size = 40,
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <circle cx="20" cy="20" r="17.5" stroke={color} strokeWidth="1.15" opacity="0.9" />
    <path
      d="M20 29V15"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M20 21C15 20 12 15 13 12C17 11 20 16 20 21Z"
      stroke={color}
      strokeWidth="1.1"
      fill="none"
    />
    <path
      d="M20 18C25 16 28 12 27 9C23 9 20 13 20 18Z"
      stroke={color}
      strokeWidth="1.1"
      fill="none"
    />
  </svg>
);

export const WheatSprigEmblem: React.FC<EmblemProps> = ({
  size = 40,
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <circle cx="20" cy="20" r="17.5" stroke={color} strokeWidth="1.15" opacity="0.9" />
    <path d="M20 9V31" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
    <ellipse cx="16.5" cy="15" rx="3" ry="1.8" transform="rotate(-30 16.5 15)" stroke={color} strokeWidth="1" />
    <ellipse cx="23.5" cy="15" rx="3" ry="1.8" transform="rotate(30 23.5 15)" stroke={color} strokeWidth="1" />
    <ellipse cx="16.5" cy="20" rx="3" ry="1.8" transform="rotate(-30 16.5 20)" stroke={color} strokeWidth="1" />
    <ellipse cx="23.5" cy="20" rx="3" ry="1.8" transform="rotate(30 23.5 20)" stroke={color} strokeWidth="1" />
    <ellipse cx="16.5" cy="25" rx="3" ry="1.8" transform="rotate(-30 16.5 25)" stroke={color} strokeWidth="1" />
    <ellipse cx="23.5" cy="25" rx="3" ry="1.8" transform="rotate(30 23.5 25)" stroke={color} strokeWidth="1" />
  </svg>
);

export const EMBLEMS_REGISTRY = [
  { id: "segmented-nature", name: "Segmented Nature Emblem", Component: SegmentedNatureEmblem },
  { id: "sprout", name: "Botanical Sprout Emblem", Component: SproutEmblem },
  { id: "wheat-sprig", name: "Clean Protein Grain Emblem", Component: WheatSprigEmblem },
];
