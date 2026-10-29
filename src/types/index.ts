export interface ContactItem {
  id: string;
  label: string;
  value: string;
  href: string;
  type: "linkedin" | "email" | "custom";
  iconName?: string;
  ariaLabel: string;
}

export interface NatureEmblemOption {
  id: string;
  name: string;
  title: string;
  pathData: string;
  secondaryPathData?: string;
  viewBox?: string;
}

export interface WaitlistFormData {
  fullName: string;
  email: string;
  interest: "food-brand" | "rd-formulation" | "investor" | "sustainability" | "general";
  message?: string;
  acceptedPrivacy: boolean;
}

export interface FormValidationErrors {
  fullName?: string;
  email?: string;
  interest?: string;
  acceptedPrivacy?: string;
  general?: string;
}

export interface AnurassaLandingProps {
  brandName?: string;
  heroTitle?: string;
  tagline?: string;
  contacts?: ContactItem[];
  enableWaitlistModal?: boolean;
  backgroundImageUrl?: string;
  onFormSubmit?: (data: WaitlistFormData) => Promise<{ success: boolean; message?: string }>;
  className?: string;
}
