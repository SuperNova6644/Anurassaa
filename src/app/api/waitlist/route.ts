import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { WaitlistEntry } from "@/models/WaitlistEntry";

const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validInterests = ["food-brand", "rd-formulation", "investor", "sustainability", "general"];

// In-memory fallback storage for when MongoDB URI is not configured yet
interface StoredEntry {
  id: string;
  fullName: string;
  email: string;
  interest: string;
  message?: string;
  createdAt: string;
}

const memoryStore: StoredEntry[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, interest, message } = body;

    // Field validations
    const errors: Record<string, string> = {};

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name (at least 2 characters).";
    } else if (fullName.length > 100) {
      errors.fullName = "Name cannot exceed 100 characters.";
    }

    if (!email || typeof email !== "string" || !EmailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!interest || !validInterests.includes(interest)) {
      errors.interest = "Please select a valid area of interest.";
    }

    if (message && typeof message === "string" && message.length > 1000) {
      errors.message = "Message cannot exceed 1000 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors, message: "Validation failed" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();
    const cleanMessage = message ? message.trim() : "";

    // Connect to MongoDB
    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      // Check for existing subscriber
      const existing = await WaitlistEntry.findOne({ email: cleanEmail }).exec();
      if (existing) {
        return NextResponse.json(
          {
            success: false,
            errors: { email: "This email address is already registered on our waitlist." },
            message: "Email already registered",
          },
          { status: 409 }
        );
      }

      // Extract client info
      const ip =
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        undefined;
      const userAgent = request.headers.get("user-agent") || undefined;

      const doc = new WaitlistEntry({
        fullName: cleanName,
        email: cleanEmail,
        interest,
        message: cleanMessage,
        ipAddress: ip,
        userAgent: userAgent,
        source: "anurassa-coming-soon-v1",
      });

      const savedEntry = await doc.save();

      return NextResponse.json(
        {
          success: true,
          message: "Thank you for connecting with Anurassaa. We will be in touch soon!",
          entry: { id: String(savedEntry._id), email: savedEntry.email },
          storage: "mongodb",
        },
        { status: 201 }
      );
    } else {
      // In-memory fallback
      const exists = memoryStore.some((e) => e.email === cleanEmail);
      if (exists) {
        return NextResponse.json(
          {
            success: false,
            errors: { email: "This email address is already registered on our waitlist." },
            message: "Email already registered",
          },
          { status: 409 }
        );
      }

      const newRecord: StoredEntry = {
        id: `mock_${Date.now()}`,
        fullName: cleanName,
        email: cleanEmail,
        interest,
        message: cleanMessage,
        createdAt: new Date().toISOString(),
      };
      memoryStore.push(newRecord);

      return NextResponse.json(
        {
          success: true,
          message:
            "Thank you for connecting with Anurassaa! (Captured in preview mode - configure MONGODB_URI for live database persistence)",
          entry: newRecord,
          storage: "memory_preview",
        },
        { status: 201 }
      );
    }
  } catch (error: unknown) {
    console.error("Error processing waitlist subscription:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Safe status endpoint
  const mongooseConn = await connectToDatabase();
  return NextResponse.json({
    status: "ok",
    database: mongooseConn ? "connected" : "in-memory-fallback",
    recordsInPreviewStore: memoryStore.length,
    timestamp: new Date().toISOString(),
  });
}
