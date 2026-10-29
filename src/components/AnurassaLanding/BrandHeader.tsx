"use client";

import React, { useState } from "react";
import { EMBLEMS_REGISTRY } from "./EmblemIcons";

export interface BrandHeaderProps {
  brandName?: string;
  initialEmblemIndex?: number;
  onEmblemChange?: (emblemId: string) => void;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  brandName = "Anurassaa",
  initialEmblemIndex = 0,
  onEmblemChange,
}) => {
  const [emblemIndex, setEmblemIndex] = useState(initialEmblemIndex);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentEmblem = EMBLEMS_REGISTRY[emblemIndex] || EMBLEMS_REGISTRY[0];
  const CurrentIconComponent = currentEmblem.Component;

  const handleCycleEmblem = () => {
    setIsAnimating(true);
    const nextIndex = (emblemIndex + 1) % EMBLEMS_REGISTRY.length;
    setEmblemIndex(nextIndex);
    if (onEmblemChange) {
      onEmblemChange(EMBLEMS_REGISTRY[nextIndex].id);
    }
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <header className="anurassa-brand-header" role="banner">
      <div className="anurassa-brand-container">
        <button
          type="button"
          onClick={handleCycleEmblem}
          className={`anurassa-emblem-trigger ${isAnimating ? "anurassa-emblem-spin" : ""}`}
          aria-label={`Current emblem: ${currentEmblem.name}. Click to swap nature emblem`}
          title={`Click to swap nature emblem (${currentEmblem.name})`}
        >
          <CurrentIconComponent size={40} className="anurassa-emblem-svg" />
        </button>

        <h1 className="anurassa-brand-title">
          {brandName}
        </h1>
      </div>
    </header>
  );
};

export default BrandHeader;
