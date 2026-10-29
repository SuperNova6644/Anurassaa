/**
 * MongoDB Database Collection Schema & Validation Script for Anurassaa Waitlist / Inquiries
 * 
 * Execution instructions:
 * 1. Open mongosh (MongoDB Shell) or MongoDB Compass "Aggregations / Schema" tab.
 * 2. Select or create your database: `use anurassaa_db;`
 * 3. Run this script to generate the collection with strict JSON Schema validation.
 */

// Drop existing collection if recreating (optional - comment out if preserving data)
// db.waitlist_entries.drop();

db.createCollection("waitlist_entries", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["fullName", "email", "interest", "status", "createdAt", "updatedAt"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Unique auto-generated document identifier",
        },
        fullName: {
          bsonType: "string",
          minLength: 2,
          maxLength: 100,
          description: "Full name of the contact - required string between 2 and 100 chars",
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Valid RFC-compliant email address - required string",
        },
        interest: {
          enum: ["food-brand", "rd-formulation", "investor", "sustainability", "general"],
          description: "Primary area of interest - must match one of the predefined categories",
        },
        message: {
          bsonType: "string",
          maxLength: 1000,
          description: "Optional inquiry message or notes up to 1000 characters",
        },
        source: {
          bsonType: "string",
          description: "Campaign or page identifier from where the lead originated",
        },
        status: {
          enum: ["pending", "verified", "contacted"],
          description: "Triage workflow status of the entry",
        },
        ipAddress: {
          bsonType: ["string", "null"],
          description: "Client IP address recorded for security & spam defense",
        },
        userAgent: {
          bsonType: ["string", "null"],
          description: "Browser client user agent string",
        },
        createdAt: {
          bsonType: "date",
          description: "Timestamp when the record was inserted",
        },
        updatedAt: {
          bsonType: "date",
          description: "Timestamp when the record was last modified",
        },
      },
    },
  },
  validationLevel: "moderate",
  validationAction: "error",
});

// Create Unique Index on Email to ensure idempotency and prevent duplicates
db.waitlist_entries.createIndex(
  { email: 1 },
  {
    unique: true,
    name: "idx_unique_email",
    collation: { locale: "en", strength: 2 }, // Case-insensitive unique indexing
  }
);

// Create compound index for sorting by date and filtering by interest
db.waitlist_entries.createIndex(
  { interest: 1, createdAt: -1 },
  { name: "idx_interest_createdAt" }
);

// Create status index for fast CRM filtering
db.waitlist_entries.createIndex(
  { status: 1 },
  { name: "idx_status" }
);

print("MongoDB schema for 'waitlist_entries' successfully created with validation and indexes.");
