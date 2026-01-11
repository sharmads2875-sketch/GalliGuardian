# Stray Animal Emergency Response Platform

An AI-powered decision-support system for assessing stray animal threat levels and providing emergency response recommendations. **This is a decision-support tool, not a diagnostic tool. Always prioritize human safety.**

## Project Structure

```
.
├── frontend/          # React + Vite frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── backend/           # FastAPI backend
│   ├── main.py
│   └── requirements.txt
└── README.md
```

## Prerequisites

- **Node.js** (v16 or higher) and npm
- **Python** (v3.8 or higher) and pip

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

   The backend will be available at `http://localhost:8000`
   - API docs: `http://localhost:8000/docs`
   - Alternative docs: `http://localhost:8000/redoc`

### Frontend Setup

1. Navigate to the frontend directory (in a new terminal):
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `uvicorn main:app --reload` - Run development server with auto-reload
- `uvicorn main:app --host 0.0.0.0 --port 8000` - Run on specific host/port

## Features

- 📷 **Image Upload**: Upload photos of stray animals for analysis
- 🤖 **AI Threat Classification**: Classify threat level as Low, Medium, or High (mocked AI logic)
- 🛡️ **Safety-First Actions**: Get prioritized action recommendations based on threat level
- ⚠️ **Human Safety Priority**: System emphasizes human safety in all recommendations
- 📋 **Decision Support**: Provides actionable guidance for emergency response

## API Endpoints

- `GET /` - Welcome message
- `POST /api/classify` - Upload an image and get threat level classification
- `GET /api/health` - Health check

## Development Tips

- The frontend is configured to proxy API requests to `http://localhost:8000`
- CORS is configured on the backend to allow requests from `http://localhost:3000`
- Both servers support hot-reload during development
