# MockMate

**AI-Powered Mock Interview Platform**

MockMate is an AI-driven platform designed to help job seekers prepare for interviews by simulating real-world scenarios.<br>It offers tailored interview questions, real-time feedback, and performance analytics to enhance your interview skills.

---

## 🚀 Features

- 🎯 **Personalized Interview Sessions** — Generate questions based on your selected job role and experience level.
- 💬 **Real-Time Feedback** — Receive instant insights on your responses to improve.
- 📊 **Performance Analytics** — Track your growth over time with detailed metrics.
- 🖥️ **User-Friendly Interface** — Built with a clean and responsive UI.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with TypeScript)
- **UI**: React, Tailwind CSS
- **Authentication**: Firebase Auth
- **Database/Storage**: Firebase (Firestore or Realtime DB)
- **Deployment**: Vercel
- **Other Tools**: Gemini AI API (for interview generation & feedback)

---

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/AashishKr27/MockMate.git
cd MockMate
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Add environment variables**

Create a `.env.local` file and add:

```env
FIREBASE_PROJECT_ID = your_firebase_prject_id
FIREBASE_PRIVATE_KEY = your_firebase_private_key
FIREBASE_CLIENT_EMAIL = your_firebase_client_email
GOOGLE_GENERATIVE_AI_API_KEY = your_google_ai_api_key
NEXT_PUBLIC_VAPI_WEB_TOKEN = your_vapi_web_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID = your_vapi_workflow_id
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Go to: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```bash
MockMate/
├── app/                 # Main application pages
├── components/          # Reusable UI components
├── constants/           # App-wide constants
├── firebase/            # Firebase setup
├── lib/                 # Utilities & helpers
├── public/              # Static files
├── types/               # TypeScript types
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🌐 Live Demo

Check it out live: [https://mock-mate-five.vercel.app](https://mock-mate-five.vercel.app)

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```
3. Commit your changes:
```bash
git commit -m "Add your feature"
```
4. Push the branch:
```bash
git push origin feature/your-feature-name
```
5. Open a Pull Request 🚀

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

### ✨ Built with passion by [@AashishKr27](https://github.com/AashishKr27)
