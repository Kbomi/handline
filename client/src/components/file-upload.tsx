import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Sparkles } from "lucide-react";

interface FileUploadProps {
  onImageUpload: (imageData: string) => void;
}

export function FileUpload({ onImageUpload }: FileUploadProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = () => {
    if (previewImage) {
      onImageUpload(previewImage);
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:border-yellow-500/50 transition-all">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
            <Upload className="text-2xl text-white" />
          </div>
          <h3 className="text-xl font-semibold">사진 업로드</h3>
          <p className="text-gray-300">갤러리에서 손바닥 사진을 선택하세요</p>
          
          {!previewImage ? (
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="block w-full p-8 border-2 border-dashed border-gray-400 hover:border-yellow-400 rounded-xl cursor-pointer transition-all"
              >
                <div className="space-y-3">
                  <Upload className="text-4xl text-gray-400 mx-auto" />
                  <p className="text-gray-400">클릭하여 사진 선택</p>
                  <p className="text-xs text-gray-500">JPG, PNG 파일 지원 (최대 10MB)</p>
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={previewImage}
                  alt="미리보기"
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              
              <Button
                onClick={handleAnalyze}
                className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                손금 분석 시작
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
