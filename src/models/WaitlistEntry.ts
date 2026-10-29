import mongoose, { Schema, Model } from "mongoose";

export interface IWaitlistEntry {
  fullName: string;
  email: string;
  interest: "food-brand" | "rd-formulation" | "investor" | "sustainability" | "general";
  message?: string;
  source: string;
  status: "pending" | "verified" | "contacted";
  ipAddress?: string;
  userAgent?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const WaitlistEntrySchema = new Schema<IWaitlistEntry>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [EmailRegex, "Please provide a valid email address"],
      index: true,
    },
    interest: {
      type: String,
      enum: {
        values: ["food-brand", "rd-formulation", "investor", "sustainability", "general"],
        message: "{VALUE} is not a valid interest category",
      },
      default: "general",
      required: [true, "Interest area is required"],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
      default: "",
    },
    source: {
      type: String,
      default: "anurassa-coming-soon-v1",
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "verified", "contacted"],
      default: "pending",
    },
    ipAddress: {
      type: String,
      default: undefined,
    },
    userAgent: {
      type: String,
      default: undefined,
    },
  },
  {
    timestamps: true,
    collection: "waitlist_entries",
  }
);

// Compound index for status and createdAt sorting
WaitlistEntrySchema.index({ status: 1, createdAt: -1 });

// Export singleton model to prevent duplicate model compilation in Next.js hot-reload
export const WaitlistEntry: Model<IWaitlistEntry> =
  (mongoose.models.WaitlistEntry as Model<IWaitlistEntry>) ||
  mongoose.model<IWaitlistEntry>("WaitlistEntry", WaitlistEntrySchema);

export default WaitlistEntry;
