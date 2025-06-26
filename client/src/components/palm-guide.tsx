import { Card, CardContent } from "@/components/ui/card";
import { Book, Lightbulb, CheckCircle } from "lucide-react";

export function PalmGuide() {
  const palmLines = [
    {
      name: "생명선 (生命線)",
      description: "엄지손가락 주변을 둘러싸는 선으로 건강과 생명력을 나타냅니다.",
      color: "red"
    },
    {
      name: "감정선 (感情線)",
      description: "새끼손가락 아래에서 시작되어 검지 방향으로 향하는 선입니다.",
      color: "pink"
    },
    {
      name: "지능선 (知能線)",
      description: "엄지와 검지 사이에서 시작되어 새끼손가락 방향으로 향합니다.",
      color: "blue"
    },
    {
      name: "운명선 (運命線)",
      description: "손목에서 중지 방향으로 수직으로 올라가는 선입니다.",
      color: "purple"
    }
  ];

  const photographyTips = [
    "밝은 곳에서 촬영하여 손금선이 선명하게 보이도록 하세요.",
    "손바닥을 평평하게 펴고 카메라와 수직이 되도록 하세요.",
    "오른손 손바닥을 촬영해주세요 (왼손잡이는 왼손).",
    "손목까지 포함하여 전체 손바닥이 나오도록 촬영하세요."
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          손금술 가이드
        </h2>
        <p className="text-gray-300">전통 손금술의 기본 지식을 알아보세요</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Book className="text-yellow-400 mr-3" />
              주요 손금선 설명
            </h3>
            <div className="space-y-4">
              {palmLines.map((line) => (
                <div key={line.name} className="flex items-start space-x-3">
                  <div className={`w-3 h-3 bg-${line.color}-500 rounded-full mt-2 flex-shrink-0`}></div>
                  <div>
                    <h4 className={`font-medium text-${line.color}-400`}>{line.name}</h4>
                    <p className="text-sm text-gray-300">{line.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Lightbulb className="text-yellow-400 mr-3" />
              촬영 팁
            </h3>
            <div className="space-y-4">
              {photographyTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={16} />
                  <p className="text-sm text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
