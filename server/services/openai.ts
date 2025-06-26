import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

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

export async function analyzePalmImage(base64Image: string): Promise<PalmAnalysisResult> {
  try {
    // Remove data URL prefix if present
    const cleanBase64 = base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `당신은 전문 한국 전통 손금술사입니다. 손바닥 이미지를 분석하여 한국어로 상세한 손금 해석을 제공해주세요.

다음 손금선들을 분석해주세요:
- 생명선 (生命線): 건강과 생명력
- 감정선 (感情線): 사랑과 감정
- 지능선 (知能線): 지능과 사고력  
- 운명선 (運命線): 운명과 성공
- 결혼선 (結婚線): 결혼과 연애
- 재물선 (財物線): 재물과 경제

각 항목에 대해 100-200자 정도의 상세한 해석을 한국어로 제공하고, 연애운, 재물운, 사업운, 건강운을 0-100점으로 점수화해주세요.

응답은 반드시 다음 JSON 형식으로 제공해주세요:
{
  "overall": "종합 운세 해석",
  "lifeLine": "생명선 해석", 
  "heartLine": "감정선 해석",
  "headLine": "지능선 해석",
  "fateLine": "운명선 해석", 
  "marriageLine": "결혼선 해석",
  "moneyLine": "재물선 해석",
  "loveScore": 85,
  "wealthScore": 72,
  "careerScore": 90,
  "healthScore": 78
}`
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "이 손바닥 이미지를 분석하여 전통 한국 손금술에 따라 상세한 운세를 해석해주세요."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${cleanBase64}`
              }
            }
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 2000,
    });

    const analysisText = response.choices[0].message.content;
    if (!analysisText) {
      throw new Error("OpenAI에서 응답을 받을 수 없습니다");
    }

    const analysis = JSON.parse(analysisText);
    
    // Validate the response structure
    const requiredFields = ['overall', 'lifeLine', 'heartLine', 'headLine', 'fateLine', 'marriageLine', 'moneyLine'];
    for (const field of requiredFields) {
      if (!analysis[field]) {
        throw new Error(`분석 결과에 필수 필드가 누락되었습니다: ${field}`);
      }
    }

    // Ensure scores are within valid range
    analysis.loveScore = Math.max(0, Math.min(100, analysis.loveScore || 50));
    analysis.wealthScore = Math.max(0, Math.min(100, analysis.wealthScore || 50));
    analysis.careerScore = Math.max(0, Math.min(100, analysis.careerScore || 50));
    analysis.healthScore = Math.max(0, Math.min(100, analysis.healthScore || 50));

    return analysis as PalmAnalysisResult;
  } catch (error) {
    console.error("Palm analysis error:", error);
    throw new Error(`손금 분석 중 오류가 발생했습니다: ${error.message}`);
  }
}
