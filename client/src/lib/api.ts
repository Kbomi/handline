import { apiRequest } from "./queryClient";

export interface PalmAnalysisResult {
  overall: string;
  lifeLine: string;
  heartLine: string;
  headLine: string;
  fateLine: string;
  marriageLine: string;
  moneyLine: string;
  loveScore: number;
  wealthScore: number;
  careerScore: number;
  healthScore: number;
}

export interface PalmAnalysisResponse {
  id: number;
  analysis: PalmAnalysisResult;
  createdAt: string;
}

export async function analyzePalm(imageData: string): Promise<PalmAnalysisResponse> {
  const response = await apiRequest("POST", "/api/analyze-palm", {
    imageData
  });
  
  return response.json();
}

export async function getAnalysis(id: number): Promise<PalmAnalysisResponse> {
  const response = await apiRequest("GET", `/api/analysis/${id}`);
  return response.json();
}
