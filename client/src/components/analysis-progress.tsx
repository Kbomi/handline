import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

export function AnalysisProgress() {
  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10 max-w-2xl mx-auto">
      <CardContent className="p-8 text-center">
        <div className="space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto animate-spin">
            <Eye className="text-3xl text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">AI가 손금을 분석하고 있습니다</h3>
            <p className="text-gray-300">잠시만 기다려주세요...</p>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-yellow-500 h-2 rounded-full animate-pulse transition-all duration-300"
              style={{ width: "75%" }}
            />
          </div>
          <p className="text-sm text-gray-400">손금선 분석 중...</p>
        </div>
      </CardContent>
    </Card>
  );
}
