# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🎙️ Speech-To-Text Frontend

This is the frontend of the Speech-to-Text web application. It allows users to register, sign in, record or upload audio, and view transcribed text in real-time.

---

## 🚀 Tech Stack

- **React** (with SWC for fast builds)
- **Vite** (Frontend bundler)
- **Tailwind CSS** (Utility-first CSS)
- **React Router** (Client-side routing)
- **Axios** (API requests)
- **Toast Notifications** (via `react-hot-toast`)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/SnehaNagpure/Speech_ToText_FrontEnd.git
cd Speech_ToText_FrontEnd
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a .env file in the project root based on .env.example, with contents like:
  ```ini
  VITE_API_URL 
  ```

### 4. Development
Run Local Dev Server
```bash
npm run dev
```
Visit: http://localhost:5173


### 5. Build for Production

```bash
npm run build
```
The final files will be in the dist/ directory.

### 6. Deployment (Vercel)

Connect the GitHub repo to Vercel

Set the following environment variable in Vercel dashboard:
  ```
  CLIENT_ORIGIN=https://speech-to-text-front-end.vercel.app
  Framework: Vite
  Output Directory: dist
  ```
**❗ Common Issues**
Tailwind CSS errors? Ensure you have the correct PostCSS plugins installed

**📞 API Reference**
The frontend uses the following endpoints from the backend:
  ```
  1.POST /api/users/register
  2.POST /api/users/login
  3.GET /api/audios
  4.POST /api/audios/upload
```
All API calls are proxied to the backend running at: http://localhost:5000 Or your deployed backend on Render.

