"use client";

import React, { useState } from "react";
import { WaitlistFormData, FormValidationErrors } from "@/types";
import { CheckIcon, CloseIcon, SparkleIcon } from "./SocialIcons";

export interface WaitlistFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (data: WaitlistFormData) => void;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const WaitlistForm: React.FC<WaitlistFormProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<WaitlistFormData>({
    fullName: "",
    email: "",
    interest: "general",
    message: "",
    acceptedPrivacy: true,
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  if (!isOpen) return null;

  const validateField = (field: keyof WaitlistFormData, value: unknown): string => {
    switch (field) {
      case "fullName": {
        const val = typeof value === "string" ? value.trim() : "";
        if (!val) return "Please enter your full name.";
        if (val.length < 2) return "Name must be at least 2 characters.";
        if (val.length > 100) return "Name cannot exceed 100 characters.";
        return "";
      }
      case "email": {
        const val = typeof value === "string" ? value.trim() : "";
        if (!val) return "Please enter your email address.";
        if (!EMAIL_REGEX.test(val)) return "Please enter a valid email address (e.g., name@domain.com).";
        return "";
      }
      case "interest": {
        if (!value) return "Please choose your primary interest.";
        return "";
      }
      case "acceptedPrivacy": {
        if (!value) return "Please agree to receive updates from Anurassaa.";
        return "";
      }
      default:
        return "";
    }
  };

  const handleBlur = (field: keyof WaitlistFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg || undefined }));
  };

  const handleChange = (
    field: keyof WaitlistFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg || undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormValidationErrors = {};
    const nameErr = validateField("fullName", formData.fullName);
    const emailErr = validateField("email", formData.email);
    const interestErr = validateField("interest", formData.interest);
    const privacyErr = validateField("acceptedPrivacy", formData.acceptedPrivacy);

    if (nameErr) newErrors.fullName = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (interestErr) newErrors.interest = interestErr;
    if (privacyErr) newErrors.acceptedPrivacy = privacyErr;

    setTouched({
      fullName: true,
      email: true,
      interest: true,
      acceptedPrivacy: true,
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setStatusMessage(result.message || "Thank you! You have been added to our early access list.");
        if (onSubmitSuccess) {
          onSubmitSuccess(formData);
        }
      } else {
        setSubmitStatus("error");
        if (result.errors) {
          setErrors(result.errors);
        }
        setStatusMessage(result.message || "Unable to submit. Please check the fields and try again.");
      }
    } catch {
      setSubmitStatus("error");
      setStatusMessage("Network error. Please try again in a few moments.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="anurassa-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="anurassa-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-modal-title"
        aria-describedby="waitlist-modal-description"
      >
        <div className="anurassa-modal-header">
          <div className="anurassa-modal-badge">
            <SparkleIcon size={14} />
            <span>Early Access & Inquiries</span>
          </div>
          <button
            type="button"
            className="anurassa-modal-close-btn"
            onClick={onClose}
            aria-label="Close early access inquiry form"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <h3 id="waitlist-modal-title" className="anurassa-modal-title">
          Connect with Anurassaa
        </h3>
        <p id="waitlist-modal-description" className="anurassa-modal-description">
          Be first to receive formulation samples, commercial updates, and partner opportunities for our clean-label plant protein ingredient.
        </p>

        {submitStatus === "success" ? (
          <div className="anurassa-success-box" role="status" aria-live="polite">
            <div className="anurassa-success-icon-wrap">
              <CheckIcon size={28} />
            </div>
            <h4 className="anurassa-success-title">Message Received!</h4>
            <p className="anurassa-success-text">{statusMessage}</p>
            <button
              type="button"
              className="anurassa-primary-button"
              onClick={onClose}
            >
              Back to Landing
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="anurassa-form"
            noValidate
            role="form"
            aria-label="Early access registration form"
          >
            {submitStatus === "error" && statusMessage && (
              <div className="anurassa-form-alert" role="alert">
                {statusMessage}
              </div>
            )}

            {/* Full Name */}
            <div className="anurassa-form-group">
              <label htmlFor="field-fullname" className="anurassa-form-label">
                Full Name <span className="anurassa-required">*</span>
              </label>
              <input
                id="field-fullname"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                onBlur={() => handleBlur("fullName")}
                placeholder="e.g. Eleanor Vance"
                className={`anurassa-form-input ${errors.fullName ? "anurassa-input-invalid" : ""}`}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "fullname-error" : undefined}
                required
              />
              {errors.fullName && (
                <span id="fullname-error" className="anurassa-field-error" role="alert">
                  {errors.fullName}
                </span>
              )}
            </div>

            {/* Email Address */}
            <div className="anurassa-form-group">
              <label htmlFor="field-email" className="anurassa-form-label">
                Email Address <span className="anurassa-required">*</span>
              </label>
              <input
                id="field-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="name@company.com"
                className={`anurassa-form-input ${errors.email ? "anurassa-input-invalid" : ""}`}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                required
              />
              {errors.email && (
                <span id="email-error" className="anurassa-field-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Sector / Interest */}
            <div className="anurassa-form-group">
              <label htmlFor="field-interest" className="anurassa-form-label">
                I Am Interested In <span className="anurassa-required">*</span>
              </label>
              <select
                id="field-interest"
                value={formData.interest}
                onChange={(e) => handleChange("interest", e.target.value as WaitlistFormData["interest"])}
                className="anurassa-form-select"
                aria-invalid={Boolean(errors.interest)}
              >
                <option value="food-brand">Food & Beverage Brand / Manufacturer</option>
                <option value="rd-formulation">R&D / Food Science / Formulation Testing</option>
                <option value="investor">Strategic Investor / AgTech Partner</option>
                <option value="sustainability">Upcycling & Sustainable Sourcing</option>
                <option value="general">General Inquiry & Press</option>
              </select>
            </div>

            {/* Optional Message */}
            <div className="anurassa-form-group">
              <label htmlFor="field-message" className="anurassa-form-label">
                Inquiry / Note <span className="anurassa-optional">(Optional)</span>
              </label>
              <textarea
                id="field-message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Tell us about your application, ingredient requirements, or timeline..."
                className="anurassa-form-textarea"
                rows={3}
                maxLength={1000}
              />
            </div>

            {/* Privacy Checkbox */}
            <div className="anurassa-form-checkbox-row">
              <input
                id="field-privacy"
                type="checkbox"
                checked={formData.acceptedPrivacy}
                onChange={(e) => handleChange("acceptedPrivacy", e.target.checked)}
                className="anurassa-form-checkbox"
                required
              />
              <label htmlFor="field-privacy" className="anurassa-form-checkbox-label">
                I agree to be contacted by Anurassaa regarding protein ingredient updates.
              </label>
            </div>
            {errors.acceptedPrivacy && (
              <span className="anurassa-field-error" role="alert">
                {errors.acceptedPrivacy}
              </span>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`anurassa-primary-button ${isSubmitting ? "anurassa-button-loading" : ""}`}
            >
              {isSubmitting ? (
                <span className="anurassa-spinner-wrap">
                  <span className="anurassa-spinner" aria-hidden="true" />
                  <span>Submitting...</span>
                </span>
              ) : (
                "Request Early Access & Updates"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default WaitlistForm;
