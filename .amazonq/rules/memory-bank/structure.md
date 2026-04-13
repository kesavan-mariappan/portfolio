# Project Structure

## Directory Layout
```
portfolio/
├── .amazonq/rules/memory-bank/   # Amazon Q memory bank docs
├── .github/workflows/deploy.yml  # GitHub Actions CI/CD to GitHub Pages
├── public/
│   └── favicon.png               # Site favicon
├── src/
│   ├── assets/                   # Static images (hero, architecture diagrams)
│   ├── App.jsx                   # Root component — all portfolio sections + analytics trigger
│   ├── App.css                   # Component-scoped styles (animations)
│   ├── Analytics.jsx             # Grafana-style analytics dashboard
│   ├── LoginModal.jsx            # Email/password auth modal (Firebase Auth)
│   ├── firebase.js               # Firebase app init, exports db & auth
│   ├── index.css                 # Global Tailwind base styles
│   └── main.jsx                  # React DOM entry point
├── index.html                    # HTML shell, sets page title
├── vite.config.js                # Vite config, base path = /portfolio/
├── tailwind.config.js            # Tailwind content paths
├── eslint.config.js              # ESLint flat config
├── postcss.config.js             # PostCSS (autoprefixer)
├── nginx.conf                    # Nginx SPA routing config for Docker
├── Dockerfile                    # Multi-stage build with Firebase ARG injection
├── preview.sh                    # Local Docker preview (reads .env.local)
├── .env.example                  # Example env file (no values)
└── package.json                  # Dependencies and npm scripts
```

## Core Components & Relationships
```
main.jsx
  └── App.jsx                     # All sections + secret click handler + login modal
        ├── LoginModal.jsx        # Conditionally rendered on 5 KM clicks
        ├── Analytics.jsx         # Shown after successful login
        └── firebase.js           # Shared db & auth exports
```

## Architectural Patterns
- **Single-file component architecture**: All portfolio sections live in `App.jsx`
- **Centralized Firebase module**: `firebase.js` initializes once, exports `db` and `auth`
- **Environment-driven config**: All Firebase credentials from `import.meta.env.VITE_*`
- **Static SPA deployment**: Vite builds to `dist/`, deployed to GitHub Pages under `/portfolio/`
- **No routing**: Single scrollable page; no React Router
- **Secret analytics access**: 5 rapid clicks on KM logo → LoginModal → Analytics dashboard
- **Real-time analytics**: Firestore `onSnapshot` listeners, no polling
