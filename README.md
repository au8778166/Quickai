# QuickAI ✨

QuickAI is a full-stack AI-powered SaaS platform that brings together a suite of AI content and image tools — article writing, blog title generation, AI image generation, background/object removal, and resume review — in a single dashboard, with a public community feed for sharing creations.

**🔗 Live Demo:** [https://quickai-seven-phi.vercel.app/](https://quickai-seven-phi.vercel.app/)

---

## 🚀 Features

- ✍️ **AI Article Writer** – Generate full-length articles from a topic/prompt
- 📝 **Blog Title Generator** – Get catchy, SEO-friendly blog title ideas
- 🎨 **AI Image Generation** – Create images from text prompts
- 🧹 **Background Removal** – Remove backgrounds from uploaded images
- 🪄 **Object Removal** – Remove unwanted objects from images
- 📄 **Resume Review** – Get AI-powered feedback on an uploaded resume (PDF)
- 🌍 **Community Feed** – Browse published creations and like your favorites
- 🔐 **Authentication** – Secure sign up / login powered by **Clerk**
- 📊 **Dashboard** – Track and manage your own generated creations

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router v7](https://reactrouter.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Clerk (React)](https://clerk.com/) – authentication & user management
- [Axios](https://axios-http.com/) – API requests
- [React Markdown](https://github.com/remarkjs/react-markdown) – render AI-generated markdown content
- [React Hot Toast](https://react-hot-toast.com/) – notifications
- [Lucide React](https://lucide.dev/) – icons

### Backend (`/server`)
- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/)
- [Clerk (Express)](https://clerk.com/docs/backend-requests/handling/nodejs) – auth middleware (`clerkMiddleware`, `requireAuth`)
- [Neon Serverless Postgres](https://neon.tech/) – database
- [OpenAI SDK](https://www.npmjs.com/package/openai) – AI content generation
- [Cloudinary](https://cloudinary.com/) – image upload, storage & transformations
- [Multer](https://www.npmjs.com/package/multer) – file uploads
- [pdf-parse](https://www.npmjs.com/package/pdf-parse) / [pdfjs-dist](https://www.npmjs.com/package/pdfjs-dist) – resume/PDF text extraction

---

## 📁 Project Structure

```
Quickai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── WriteArticle.jsx
│   │   │   ├── BlogTitles.jsx
│   │   │   ├── GenerateImages.jsx
│   │   │   ├── RemoveBackground.jsx
│   │   │   ├── RemoveObject.jsx
│   │   │   ├── ReviewResume.jsx
│   │   │   └── Community.jsx
│   │   └── ...
│   └── package.json
│
└── server/                 # Express backend
    ├── config/
    │   ├── db.js            # Neon Postgres connection
    │   ├── cloudinary.js    # Cloudinary connection
    │   └── multer.js        # File upload config
    ├── controllers/
    │   ├── aiController.js  # article, blog title, image, bg/object removal, resume review logic
    │   └── userController.js
    ├── middlewares/
    │   └── auth.js
    ├── routes/
    │   ├── aiRoutes.js
    │   └── userRoutes.js
    └── server.js
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A [Clerk](https://clerk.com/) account (for auth keys)
- A [Neon](https://neon.tech/) Postgres database
- A [Cloudinary](https://cloudinary.com/) account
- An OpenAI-compatible API key

### 1. Clone the repository
```bash
git clone https://github.com/au8778166/Quickai.git
cd Quickai
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file inside `/server`:
```env
PORT=3000
DATABASE_URL=your_neon_postgres_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
OPENAI_API_KEY=your_openai_api_key
FRONTEND_URL=http://localhost:5173
```

Run the server:
```bash
npm run server   # runs with nodemon
# or
npm start
```

### 3. Frontend setup
```bash
cd ../client
npm install
```

Create a `.env` file inside `/client`:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:3000
```

Run the client:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔑 Authentication

QuickAI uses **[Clerk](https://clerk.com/)** for user sign-up, login, and session management on both the frontend (`@clerk/clerk-react`) and backend (`@clerk/express`). All AI and user routes on the server (`/api/ai`, `/api/user`) are protected using Clerk's `requireAuth()` middleware.

---

## 📡 API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/generate-article` | Generate an AI article |
| POST | `/api/ai/generate-blog-title` | Generate blog title suggestions |
| POST | `/api/ai/generate-image` | Generate an AI image |
| POST | `/api/ai/remove-image-background` | Remove background from an image |
| POST | `/api/ai/remove-image-object` | Remove an object from an image |
| POST | `/api/ai/resume-review` | Review an uploaded resume |
| GET | `/api/user/get-user-creations` | Get the logged-in user's creations |
| GET | `/api/user/get-published-creations` | Get all publicly published creations |
| POST | `/api/user/toggle-like-creations` | Like/unlike a creation |

> All endpoints require authentication via Clerk.

---

## 🌐 Deployment

The live app is deployed on **[Vercel](https://vercel.com/)**:
👉 [https://quickai-seven-phi.vercel.app/](https://quickai-seven-phi.vercel.app/)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/au8778166/Quickai/issues).

---

## 📄 License

This project is currently unlicensed. Feel free to add a license of your choice (e.g., MIT).

---

## 👤 Author

**au8778166**
GitHub: [@au8778166](https://github.com/au8778166)
