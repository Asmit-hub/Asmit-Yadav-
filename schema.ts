import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, real, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Donation schema - food donors
export const donations = pgTable("donations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  foodType: text("food_type").notNull(),
  quantity: text("quantity").notNull(),
  pickupTime: text("pickup_time").notNull(),
  address: text("address").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  contactNumber: text("contact_number").notNull(),
  contactName: text("contact_name").notNull(),
  status: text("status").notNull().default("pending"), // pending, assigned, completed
  matchedRequestId: varchar("matched_request_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Request schema - NGOs and shelters
export const requests = pgTable("requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationName: text("organization_name").notNull(),
  requirementType: text("requirement_type").notNull(),
  quantityRequired: text("quantity_required").notNull(),
  address: text("address").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  contactNumber: text("contact_number").notNull(),
  status: text("status").notNull().default("active"), // active, fulfilled, inactive
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas with validation
export const insertDonationSchema = createInsertSchema(donations, {
  foodType: z.string().min(1, "Food type is required"),
  quantity: z.string().min(1, "Quantity is required"),
  pickupTime: z.string().min(1, "Pickup time is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  contactNumber: z.string().min(10, "Valid contact number required"),
  contactName: z.string().min(2, "Contact name required"),
}).omit({ id: true, createdAt: true, status: true, matchedRequestId: true });

export const insertRequestSchema = createInsertSchema(requests, {
  organizationName: z.string().min(2, "Organization name is required"),
  requirementType: z.string().min(1, "Requirement type is required"),
  quantityRequired: z.string().min(1, "Quantity required is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  contactNumber: z.string().min(10, "Valid contact number required"),
}).omit({ id: true, createdAt: true, status: true });

// Type exports
export type Donation = typeof donations.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Request = typeof requests.$inferSelect;
export type InsertRequest = z.infer<typeof insertRequestSchema>;

// Match result type for geolocation matching
export type MatchResult = {
  request: Request;
  distance: number; // in kilometers
  eta: string; // estimated time
};
