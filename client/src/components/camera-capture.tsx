import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Power, CameraOff } from "lucide-react";

interface CameraCaptureProps {
  onImageCapture: (imageData: string) => void;
}

export function CameraCapture({ onImageCapture }: CameraCaptureProps) {
  const [isActive, setIsActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        }
      });
      
      setStream(mediaStream);
      setIsActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("카메라 접근 오류:", error);
      alert("카메라에 접근할 수 없습니다. 브라우저 설정을 확인해주세요.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsActive(false);
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL("image/jpeg", 0.8);
    onImageCapture(imageData);
    stopCamera();
  }, [onImageCapture, stopCamera]);

  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:border-purple-500/50 transition-all">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Camera className="text-2xl text-white" />
          </div>
          <h3 className="text-xl font-semibold">실시간 촬영</h3>
          <p className="text-gray-300">카메라로 직접 손바닥을 촬영하세요</p>
          
          <div className="relative bg-black/30 rounded-xl overflow-hidden aspect-square">
            {isActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <CameraOff className="text-4xl text-gray-400 mx-auto" />
                  <p className="text-gray-400">카메라 미리보기</p>
                </div>
              </div>
            )}
            
            {/* Palm positioning guide overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-64 border-2 border-yellow-400 border-dashed rounded-full opacity-70">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-yellow-400">
                  손바닥을 여기에 맞춰주세요
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {!isActive ? (
              <Button
                onClick={startCamera}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
              >
                <Power className="mr-2 h-4 w-4" />
                카메라 시작
              </Button>
            ) : (
              <Button
                onClick={capturePhoto}
                className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
              >
                <Camera className="mr-2 h-4 w-4" />
                사진 촬영
              </Button>
            )}
          </div>
        </div>
        
        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  );
}
