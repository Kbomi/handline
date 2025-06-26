import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { CameraCapture } from "@/components/camera-capture";
import { FileUpload } from "@/components/file-upload";
import { AnalysisProgress } from "@/components/analysis-progress";
import { AnalysisResults } from "@/components/analysis-results";
import { PalmGuide } from "@/components/palm-guide";
import { analyzePalm, PalmAnalysisResult } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Hand, Menu, RefreshCw, Save } from "lucide-react";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<PalmAnalysisResult | null>(null);
  const [palmImage, setPalmImage] = useState<string | null>(null);
  const { toast } = useToast();

  const analysisMutation = useMutation({
    mutationFn: analyzePalm,
    onSuccess: (data) => {
      setAnalysisResult(data.analysis);
      toast({
        title: "분석 완료",
        description: "손금 분석이 완료되었습니다.",
      });
    },
    onError: (error) => {
      toast({
        title: "분석 실패",
        description: error.message || "손금 분석 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const handleImageCapture = (imageData: string) => {
    setPalmImage(imageData);
    analysisMutation.mutate(imageData);
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setPalmImage(null);
  };

  const handleSaveResult = () => {
    if (analysisResult) {
      // TODO: Implement save functionality
      toast({
        title: "저장 완료",
        description: "분석 결과가 저장되었습니다.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-yellow-500/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-full flex items-center justify-center animate-glow">
                <Hand className="text-xl text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                  AI 손금술사
                </h1>
                <p className="text-sm text-gray-300">전통 손금술의 현대적 해석</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="animate-float">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                당신의 손금을 읽어드립니다
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              AI 기술과 전통 손금술의 만남으로 당신의 운명을 탐험해보세요
            </p>
          </div>
          
          {/* Floating mystical elements */}
          <div className="relative">
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute top-10 right-1/3 w-1 h-1 bg-pink-500 rounded-full animate-ping"></div>
            <div className="absolute bottom-0 left-1/3 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </section>

        {/* Analysis Progress */}
        {analysisMutation.isPending && <AnalysisProgress />}

        {/* Analysis Results */}
        {analysisResult && !analysisMutation.isPending && (
          <AnalysisResults analysis={analysisResult} palmImage={palmImage || undefined} />
        )}

        {/* Upload Interface - only show when not analyzing and no results */}
        {!analysisMutation.isPending && !analysisResult && (
          <section className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <CameraCapture onImageCapture={handleImageCapture} />
              <FileUpload onImageUpload={handleImageCapture} />
            </div>
          </section>
        )}

        {/* Action Buttons - show after analysis */}
        {analysisResult && !analysisMutation.isPending && (
          <section className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button
                onClick={handleSaveResult}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
              >
                <Save className="mr-2 h-4 w-4" />
                결과 저장
              </Button>
              <Button
                onClick={handleNewAnalysis}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                새로 분석
              </Button>
            </div>
          </section>
        )}

        {/* Palm Reading Guide */}
        <PalmGuide />
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-full flex items-center justify-center">
                <Hand className="text-sm text-white" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                AI 손금술사
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              AI 기술과 전통 손금술의 결합으로 더욱 정확하고 현대적인 운세 해석을 제공합니다.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-yellow-400 transition-colors">이용약관</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">고객지원</a>
            </div>
            <div className="text-xs text-gray-500">
              © 2024 AI 손금술사. 모든 권리 보유.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
