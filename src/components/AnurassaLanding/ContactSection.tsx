"use client";

import React, { useState } from "react";
import { LinkedInIcon, EnvelopeIcon } from "./SocialIcons";
import { SegmentedNatureEmblem, SproutEmblem, WheatSprigEmblem } from "./EmblemIcons";

export interface ContactSectionProps {
  onOpenWaitlist?: () => void;
  isWaitlistOpen?: boolean;
}

const ALT_ICONS = [
  SegmentedNatureEmblem,
  SproutEmblem,
  WheatSprigEmblem,
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenWaitlist,
}) => {
  const [swappedIconIdx, setSwappedIconIdx] = useState<number | null>(null);

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSwappedIconIdx((prev) =>
      prev === null ? 0 : (prev + 1) % ALT_ICONS.length
    );
  };

  const SwappedIcon =
    swappedIconIdx !== null ? ALT_ICONS[swappedIconIdx] : null;

  return (
    <div className="anurassa-contact-frame" role="region" aria-label="Contact Information">
      {/* Figma: Get in touch */}
      <h3
        className="anurassa-contact-title"
        onClick={onOpenWaitlist}
        role={onOpenWaitlist ? "button" : undefined}
        tabIndex={onOpenWaitlist ? 0 : undefined}
        aria-label="Get in touch"
      >
        Get in touch
      </h3>

      {/* Figma Frame 910 */}
      <div className="anurassa-contact-list" role="list">
        {/* Figma Frame 909: LinkedIn */}
        <div className="anurassa-contact-row" role="listitem">
          <a
            href="https://linkedin.com/company/anurassa"
            target="_blank"
            rel="noopener noreferrer"
            className="anurassa-contact-link"
            aria-label="LinkedIn: linkedin.com/company/anurassa"
          >
            <span
              className="anurassa-icon-wrapper"
              onClick={handleIconClick}
              title="Click to swap icon"
              aria-hidden="true"
            >
              {SwappedIcon ? (
                <SwappedIcon size={34} color="rgba(83, 96, 68, 1)" />
              ) : (
                <LinkedInIcon size={34} color="rgba(83, 96, 68, 1)" />
              )}
            </span>
            <span className="anurassa-contact-text">
              linkedin.com/company/anurassa
            </span>
          </a>
        </div>

        {/* Figma Frame 908: Email */}
        <div className="anurassa-contact-row" role="listitem">
          <a
            href="mailto:manyadkadiwala@gmail.com"
            className="anurassa-contact-link"
            aria-label="Email: manyadkadiwala@gmail.com"
          >
            <span className="anurassa-icon-wrapper" aria-hidden="true">
              <EnvelopeIcon size={34} color="rgba(83, 96, 68, 1)" />
            </span>
            <span className="anurassa-contact-text">
              manyadkadiwala@gmail.com
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
