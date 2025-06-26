import { users, palmAnalyses, type User, type InsertUser, type PalmAnalysis, type InsertPalmAnalysis } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPalmAnalysis(analysis: InsertPalmAnalysis): Promise<PalmAnalysis>;
  getPalmAnalysis(id: number): Promise<PalmAnalysis | undefined>;
  getUserPalmAnalyses(userId: number): Promise<PalmAnalysis[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private palmAnalyses: Map<number, PalmAnalysis>;
  private currentUserId: number;
  private currentAnalysisId: number;

  constructor() {
    this.users = new Map();
    this.palmAnalyses = new Map();
    this.currentUserId = 1;
    this.currentAnalysisId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPalmAnalysis(insertAnalysis: InsertPalmAnalysis): Promise<PalmAnalysis> {
    const id = this.currentAnalysisId++;
    const analysis: PalmAnalysis = {
      id,
      userId: insertAnalysis.userId ?? null,
      imageData: insertAnalysis.imageData,
      analysisResult: insertAnalysis.analysisResult,
      createdAt: new Date(),
    };
    this.palmAnalyses.set(id, analysis);
    return analysis;
  }

  async getPalmAnalysis(id: number): Promise<PalmAnalysis | undefined> {
    return this.palmAnalyses.get(id);
  }

  async getUserPalmAnalyses(userId: number): Promise<PalmAnalysis[]> {
    return Array.from(this.palmAnalyses.values()).filter(
      (analysis) => analysis.userId === userId,
    );
  }
}

export const storage = new MemStorage();
