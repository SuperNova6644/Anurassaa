"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BrandHeader } from "./BrandHeader";
import { HeroSection } from "./HeroSection";
import { ContactSection } from "./ContactSection";
import { WaitlistForm } from "./WaitlistForm";
import { AnurassaLandingProps, WaitlistFormData } from "@/types";

export const AnurassaLanding: React.FC<AnurassaLandingProps> = ({
  brandName = "Anurassaa",
  heroTitle = "Coming Soon",
  tagline = "We’re building a clean-label plant protein ingredient\nthat gives new life to what’s often overlooked.",
  backgroundImageUrl = "/images/anurassa_bg.jpg",
  enableWaitlistModal = true,
  onFormSubmit,
  className = "",
}) => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isWaitlistOpen) {
        setIsWaitlistOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isWaitlistOpen]);

  const handleWaitlistSuccess = (data: WaitlistFormData) => {
    if (onFormSubmit) {
      onFormSubmit(data);
    }
  };

  return (
    <main
      className={`anurassa-landing-wrapper ${className}`}
      role="main"
      aria-label="Anurassaa Landing Page"
    >
      {/* Background Oil Painting (Figma Image 35: 1920x1081px) */}
      <div className="anurassa-background-container" aria-hidden="true">
        <Image
          src={backgroundImageUrl}
          alt="Scenic oil painting landscape"
          fill
          priority
          sizes="100vw"
          className="anurassa-background-image"
          quality={75}
        />
      </div>

      {/* Main Content (Figma Frame 903: 644x589px at 638, 110) */}
      <div className="anurassa-content-canvas">
        <div className="anurassa-content-inner">
          {/* Brand Header: Frame 49 (238x58px) */}
          <BrandHeader brandName={brandName} />

          {/* Hero Section: Frame 58 (644x238px) */}
          <HeroSection
            title={heroTitle}
            tagline={tagline}
          />

          {/* Contact Section: Frame 904 (644x143px) */}
          <ContactSection
            onOpenWaitlist={enableWaitlistModal ? () => setIsWaitlistOpen(true) : undefined}
            isWaitlistOpen={isWaitlistOpen}
          />
        </div>
      </div>

      {/* Accessible Waitlist & Inquiries Modal */}
      {enableWaitlistModal && (
        <WaitlistForm
          isOpen={isWaitlistOpen}
          onClose={() => setIsWaitlistOpen(false)}
          onSubmitSuccess={handleWaitlistSuccess}
        />
      )}
    </main>
  );
};

export default AnurassaLanding;
