# Kesavan Mariappan - Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-cyan?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=flat-square&logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-11-FFCA28?style=flat-square&logo=firebase)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer)

**Senior Associate Consultant | DevOps Engineer | Cloud Infrastructure Specialist**

[🌐 Live Demo](https://kesavan-mariappan.github.io/portfolio/) • [💼 LinkedIn](https://linkedin.com/in/kesavan-mariappan) • [📧 Contact](mailto:mkesavan170@gmail.com)

</div>

---

## 👨💻 About

A modern, responsive portfolio website showcasing my expertise in DevOps, cloud architecture, and infrastructure automation. Built with React 19 and featuring smooth animations powered by Framer Motion, with a Firebase backend for analytics and admin access.

## ✨ Features

- 🎨 **Modern UI/UX** - Sleek dark theme with cyan accents and glassmorphism effects
- 🔄 **Smooth Animations** - Powered by Framer Motion for engaging user experience
- ♾️ **Animated Background** - DevOps infinity loop animation
- 📱 **Fully Responsive** - Optimized for all device sizes
- ⚡ **Fast Performance** - Built with rolldown-vite for lightning-fast load times
- 🔥 **Firebase Backend** - Firestore analytics tracking + Firebase Auth admin login
- 📊 **Live Analytics Dashboard** - Real-time visitor and section engagement metrics
- 🚀 **Auto-Deploy** - GitHub Actions workflow for seamless deployment to GitHub Pages

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | React 19, Framer Motion 12 |
| Styling | TailwindCSS 3 |
| Build | rolldown-vite 7 |
| Backend | Firebase 11 (Firestore, Auth) |
| Deployment | GitHub Pages via GitHub Actions |
| Icons | react-icons 5 |

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/kesavan-mariappan/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Fill in your VITE_FIREBASE_* values

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔑 Environment Variables

Create a `.env.local` file with the following Firebase config:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## 📁 Project Structure

```
portfolio/
├── .amazonq/rules/memory-bank/   # Amazon Q memory bank docs
├── .github/workflows/
│   └── deploy.yml                # GitHub Actions CI/CD
├── public/
│   └── favicon.png               # Custom favicon
├── src/
│   ├── assets/                   # Images and static assets
│   ├── App.jsx                   # Main component — all portfolio sections
│   ├── App.css                   # Component-scoped animation styles
│   ├── Analytics.jsx             # Firebase analytics dashboard
│   ├── LoginModal.jsx            # Admin auth modal
│   ├── firebase.js               # Firebase init (exports db & auth)
│   ├── index.css                 # Global Tailwind styles
│   └── main.jsx                  # React DOM entry point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── Dockerfile                    # Local Docker preview
```

## 📞 Contact

- **Email:** mkesavan170@gmail.com
- **LinkedIn:** [kesavan-mariappan](https://linkedin.com/in/kesavan-mariappan)
- **GitHub:** [kesavan-mariappan](https://github.com/kesavan-mariappan)
- **GitHub (DevOps):** [kesavan-mariappan-devops](https://github.com/kesavan-mariappan-devops)
- **Medium:** [@mkesavan170](https://medium.com/@mkesavan170)
- **Phone:** +91 9566856628

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by Kesavan Mariappan

</div>
