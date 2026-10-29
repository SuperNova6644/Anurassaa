import React from "react";

export interface HeroSectionProps {
  title?: string;
  tagline?: string;
  subtitleClassName?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Coming Soon",
  tagline = "We’re building a clean-label plant protein ingredient\nthat gives new life to what’s often overlooked.",
  subtitleClassName = "",
}) => {
  return (
    <section className="anurassa-hero-section" aria-labelledby="hero-heading">
      <h2 id="hero-heading" className="anurassa-hero-title">
        {title}
      </h2>

      <div className="anurassa-divider-container" aria-hidden="true">
        <div className="anurassa-divider-line" />
      </div>

      <p className={`anurassa-hero-tagline ${subtitleClassName}`}>
        {tagline.split("\n").map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx < tagline.split("\n").length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </section>
  );
};

export default HeroSection;
