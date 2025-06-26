# AI 손금술사 🤚

> OpenAI GPT-4o를 활용한 한국 전통 손금술 분석 웹 애플리케이션

## 📋 프로젝트 소개

AI 손금술사는 전통 한국 손금술과 최신 AI 기술을 결합하여 사용자의 손바닥 이미지를 분석하고 상세한 운세 해석을 제공하는 웹 애플리케이션입니다.

### 주요 기능

- 🤳 **실시간 카메라 촬영**: 브라우저 카메라로 손바닥 직접 촬영
- 📷 **이미지 업로드**: 갤러리에서 손바닥 사진 선택 및 업로드
- 🧠 **AI 분석**: OpenAI GPT-4o 모델을 활용한 정확한 손금 분석
- 📊 **상세 해석**: 생명선, 감정선, 지능선, 운명선, 결혼선, 재물선 개별 분석
- 🎯 **운세 점수**: 연애운, 재물운, 사업운, 건강운 100점 만점 점수화
- 🎨 **현대적 UI**: 반응형 디자인과 신비로운 테마

## 🚀 시작하기

### 필수 요구사항

- Node.js 20 이상
- OpenAI API 키

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **환경 변수 설정**
   ```bash
   # .env 파일 생성 후 추가
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

4. **브라우저에서 접속**
   ```
   http://localhost:1004
   ```

## 🛠️ 기술 스택

### Frontend
- **React 18** + TypeScript
- **Vite** - 빠른 개발 환경
- **Tailwind CSS** - 유틸리티 우선 스타일링
- **shadcn/ui** - 모던 UI 컴포넌트
- **TanStack Query** - 서버 상태 관리
- **Wouter** - 경량 라우팅

### Backend
- **Node.js** + Express
- **TypeScript** - 타입 안전성
- **Drizzle ORM** - 타입 안전 데이터베이스 ORM
- **PostgreSQL** - 데이터베이스 (Neon 서버리스)

### AI 서비스
- **OpenAI GPT-4o** - 손바닥 이미지 분석
- **Vision API** - 이미지 인식 및 해석

## 📱 사용 방법

### 1. 손바닥 촬영/업로드
- **실시간 촬영**: 카메라 버튼을 눌러 브라우저 카메라로 손바닥 촬영
- **파일 업로드**: 갤러리에서 기존 손바닥 사진 선택

### 2. 촬영 가이드
- 밝은 곳에서 촬영
- 손바닥을 평평하게 펴기
- 오른손 손바닥 사용 (왼손잡이는 왼손)
- 손목까지 포함하여 전체 손바닥 촬영

### 3. 분석 결과 확인
- **종합 운세**: 전체적인 운명 해석
- **개별 손금선**: 6가지 주요 손금선 상세 분석
- **운세 점수**: 4가지 영역별 점수 (0-100점)

## 📊 분석 항목

### 손금선 분석
- **생명선 (生命線)**: 건강과 생명력
- **감정선 (感情線)**: 사랑과 감정
- **지능선 (知能線)**: 지능과 사고력
- **운명선 (運命線)**: 운명과 성공
- **결혼선 (結婚線)**: 결혼과 연애
- **재물선 (財物線)**: 재물과 경제

### 운세 점수
- **연애운**: 사랑과 인간관계
- **재물운**: 경제적 성공
- **사업운**: 직업과 커리어
- **건강운**: 신체적 건강

## 🗂️ 프로젝트 구조

```
├── client/                 # 프론트엔드
│   ├── src/
│   │   ├── components/     # UI 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── lib/            # 유틸리티 및 API
│   │   └── hooks/          # React 훅
├── server/                 # 백엔드
│   ├── services/           # 비즈니스 로직
│   ├── routes.ts          # API 라우트
│   └── storage.ts         # 데이터 저장소
├── shared/                 # 공유 타입 및 스키마
└── components.json        # shadcn/ui 설정
```

## 🔧 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 타입 체크
npm run type-check

# 데이터베이스 스키마 푸시
npm run db:push
```

## 🌐 배포

### Replit 배포
1. Replit에서 프로젝트 열기
2. 환경 변수 설정 (OPENAI_API_KEY)
3. Deploy 버튼 클릭

### 환경 변수
```bash
OPENAI_API_KEY=sk-...        # OpenAI API 키 (필수)
DATABASE_URL=postgresql://... # PostgreSQL 연결 문자열
NODE_ENV=production          # 환경 모드
```

## 🤝 기여하기

1. Fork 프로젝트
2. Feature 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## ⚠️ 주의사항

- 이 애플리케이션은 엔터테인먼트 목적으로 제작되었습니다
- 손금 분석 결과는 과학적 근거가 없으며 참고용으로만 사용하세요
- 실제 중요한 결정은 전문가와 상담 후 내리시기 바랍니다

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해 주세요.

---

**AI 손금술사** - 전통과 기술의 만남 ✨