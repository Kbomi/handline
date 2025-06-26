import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { palmAnalysisRequestSchema } from "@shared/schema";
import { analyzePalmImage } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Palm analysis endpoint
  app.post("/api/analyze-palm", async (req, res) => {
    try {
      const validatedData = palmAnalysisRequestSchema.parse(req.body);
      
      if (!validatedData.imageData) {
        return res.status(400).json({ 
          message: "이미지 데이터가 필요합니다" 
        });
      }

      // Analyze the palm image using OpenAI
      const analysisResult = await analyzePalmImage(validatedData.imageData);

      // Store the analysis result (optional userId for guest users)
      const palmAnalysis = await storage.createPalmAnalysis({
        userId: null, // Allow guest analysis without user login
        imageData: validatedData.imageData,
        analysisResult: analysisResult,
      });

      res.json({
        id: palmAnalysis.id,
        analysis: analysisResult,
        createdAt: palmAnalysis.createdAt,
      });
    } catch (error) {
      console.error("Palm analysis error:", error);
      res.status(500).json({ 
        message: error.message || "손금 분석 중 오류가 발생했습니다" 
      });
    }
  });

  // Get analysis by ID
  app.get("/api/analysis/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "유효하지 않은 분석 ID입니다" });
      }

      const analysis = await storage.getPalmAnalysis(id);
      if (!analysis) {
        return res.status(404).json({ message: "분석 결과를 찾을 수 없습니다" });
      }

      res.json({
        id: analysis.id,
        analysis: analysis.analysisResult,
        createdAt: analysis.createdAt,
      });
    } catch (error) {
      console.error("Get analysis error:", error);
      res.status(500).json({ 
        message: "분석 결과를 가져오는 중 오류가 발생했습니다" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
