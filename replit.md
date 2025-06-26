# Palm Reading AI Application

## Overview

This is a full-stack web application that provides AI-powered palm reading analysis using OpenAI's GPT-4o model. The application allows users to capture or upload images of their palms and receive detailed traditional Korean palmistry interpretations in Korean language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom mystical theme variables
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **AI Integration**: OpenAI GPT-4o for palm image analysis
- **Session Management**: In-memory storage with optional PostgreSQL sessions

### Development Environment
- **Platform**: Replit with Node.js 20, Web, and PostgreSQL 16 modules
- **Development Server**: Vite dev server with HMR
- **Build Process**: Vite for frontend, esbuild for backend bundling

## Key Components

### Database Schema
- **Users Table**: Basic user authentication (username, password)
- **Palm Analyses Table**: Stores palm images (base64), AI analysis results (JSON), and timestamps
- **Guest Support**: Analyses can be created without user authentication

### AI Analysis Service
- **Model**: OpenAI GPT-4o (latest available model)
- **Input**: Base64 encoded palm images
- **Output**: Structured Korean palmistry analysis including:
  - Overall fortune interpretation
  - Individual palm line analyses (life, heart, head, fate, marriage, money lines)
  - Numerical scores for love, wealth, career, and health (0-100)

### Image Handling
- **Camera Capture**: Browser getUserMedia API for real-time palm photography
- **File Upload**: Drag-and-drop or click-to-upload interface
- **Image Processing**: Client-side canvas manipulation for capture
- **Storage**: Base64 encoding for database storage

### UI/UX Features
- **Responsive Design**: Mobile-first approach with touch-friendly interfaces
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Loading States**: Animated progress indicators during AI analysis
- **Toast Notifications**: User feedback for actions and errors
- **Mystical Theme**: Purple and gold gradient color scheme

## Data Flow

1. **Image Capture/Upload**: User captures palm image via camera or uploads file
2. **Client Validation**: Image format and size validation on frontend
3. **API Request**: Base64 image data sent to `/api/analyze-palm` endpoint
4. **AI Processing**: OpenAI GPT-4o analyzes image and returns structured JSON
5. **Database Storage**: Analysis results and image data stored in PostgreSQL
6. **Response Delivery**: Formatted analysis results returned to client
7. **UI Rendering**: Results displayed with themed components and animations

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **openai**: Official OpenAI API client for GPT-4o integration
- **drizzle-orm**: Type-safe database ORM with PostgreSQL support
- **@tanstack/react-query**: Server state management and caching
- **zod**: Runtime type validation and schema definition

### UI Dependencies
- **@radix-ui/***: Comprehensive accessible component primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Modern icon library
- **class-variance-authority**: Type-safe CSS class composition

### Development Dependencies
- **vite**: Fast build tool and development server
- **typescript**: Type safety and enhanced developer experience
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Replit Configuration
- **Auto-scaling**: Configured for autoscale deployment target
- **Port Mapping**: Internal port 5000 mapped to external port 80
- **Build Process**: `npm run build` for production assets
- **Start Command**: `npm run start` for production server

### Environment Variables
- **DATABASE_URL**: PostgreSQL connection string (required)
- **OPENAI_API_KEY**: OpenAI API authentication (required)
- **NODE_ENV**: Environment mode (development/production)

### Build Output
- **Frontend**: Static assets built to `dist/public/`
- **Backend**: Bundled server code in `dist/index.js`
- **Assets**: Served via Express static middleware in production

### Production Considerations
- Database migrations via `npm run db:push`
- Error handling with structured JSON responses
- Request logging for API endpoints
- CORS and security headers for production deployment

## Changelog

```
Changelog:
- June 26, 2025. Initial setup
- June 26, 2025. Added comprehensive README.md documentation
- June 26, 2025. Fixed TypeScript errors in schema and routes for proper nullable userId support
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```