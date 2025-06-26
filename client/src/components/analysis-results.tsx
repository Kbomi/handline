import { Card, CardContent } from "@/components/ui/card";
import { PalmAnalysisResult } from "@/lib/api";
import { Star, Heart, DollarSign, Briefcase, HeartHandshake, Brain, Sparkles, MapPin } from "lucide-react";

interface AnalysisResultsProps {
  analysis: PalmAnalysisResult;
  palmImage?: string;
}

export function AnalysisResults({ analysis, palmImage }: AnalysisResultsProps) {
  const palmLines = [
    {
      name: "생명선",
      icon: HeartHandshake,
      description: analysis.lifeLine,
      color: "red"
    },
    {
      name: "감정선",
      icon: Heart,
      description: analysis.heartLine,
      color: "pink"
    },
    {
      name: "지능선",
      icon: Brain,
      description: analysis.headLine,
      color: "blue"
    },
    {
      name: "운명선",
      icon: Star,
      description: analysis.fateLine,
      color: "purple"
    },
    {
      name: "결혼선",
      icon: HeartHandshake,
      description: analysis.marriageLine,
      color: "rose"
    },
    {
      name: "재물선",
      icon: DollarSign,
      description: analysis.moneyLine,
      color: "yellow"
    }
  ];

  const fortuneScores = [
    { name: "연애운", emoji: "❤️", score: analysis.loveScore, color: "pink" },
    { name: "재물운", emoji: "💰", score: analysis.wealthScore, color: "yellow" },
    { name: "사업운", emoji: "💼", score: analysis.careerScore, color: "blue" },
    { name: "건강운", emoji: "🍀", score: analysis.healthScore, color: "green" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
          손금 분석 결과
        </h2>
        <p className="text-gray-300">AI가 분석한 당신의 손금 해석입니다</p>
      </div>

      {/* Palm Image with Analysis */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              {palmImage && (
                <img 
                  src={palmImage} 
                  alt="분석된 손바닥" 
                  className="rounded-xl w-full"
                />
              )}
              {/* Palm lines overlay markers could be added here */}
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-purple-600/20 to-yellow-500/20 border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Star className="text-yellow-400 mr-2" />
                    종합 운세
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    {analysis.overall}
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                {fortuneScores.map((fortune) => (
                  <Card key={fortune.name} className="bg-white/5 border-white/10">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{fortune.emoji}</div>
                      <div className="text-sm text-gray-300">{fortune.name}</div>
                      <div className={`text-lg font-semibold text-${fortune.color}-400`}>
                        {fortune.score}%
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Line Analysis */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {palmLines.map((line) => {
          const Icon = line.icon;
          return (
            <Card 
              key={line.name}
              className={`bg-white/5 backdrop-blur-lg border-white/10 hover:border-${line.color}-400/50 transition-all`}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-8 h-8 bg-${line.color}-500 rounded-full flex items-center justify-center`}>
                    <Icon className="text-white text-sm" />
                  </div>
                  <h4 className="text-lg font-semibold">{line.name}</h4>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {line.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
