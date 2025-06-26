import { pgTable, text, serial, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const palmAnalyses = pgTable("palm_analyses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  imageData: text("image_data").notNull(), // base64 encoded image
  analysisResult: jsonb("analysis_result").notNull(), // JSON analysis from OpenAI
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPalmAnalysisSchema = createInsertSchema(palmAnalyses).pick({
  userId: true,
  imageData: true,
  analysisResult: true,
}).extend({
  userId: z.number().optional().nullable(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPalmAnalysis = z.infer<typeof insertPalmAnalysisSchema>;
export type PalmAnalysis = typeof palmAnalyses.$inferSelect;

export const palmAnalysisRequestSchema = z.object({
  imageData: z.string().min(1, "이미지 데이터가 필요합니다"),
});

export type PalmAnalysisRequest = z.infer<typeof palmAnalysisRequestSchema>;
