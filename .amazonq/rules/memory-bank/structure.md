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
│   ├── App.jsx                   # Root component — all portfolio sections
│   ├── App.css                   # Component-scoped styles (animations)
│   ├── Analytics.jsx             # Firebase visitor analytics tracker
│   ├── firebase.js               # Firebase app init, exports db & auth
│   ├── LoginModal.jsx            # Admin auth modal (Firebase Auth)
│   ├── index.css                 # Global Tailwind base styles
│   └── main.jsx                  # React DOM entry point
├── index.html                    # HTML shell, sets page title
├── vite.config.js                # Vite config, base path = /portfolio/
├── tailwind.config.js            # Tailwind content paths
├── eslint.config.js              # ESLint flat config
├── postcss.config.js             # PostCSS (autoprefixer)
├── Dockerfile                    # Container build for local preview
├── preview.sh                    # Shell script for Docker preview
└── package.json                  # Dependencies and npm scripts
```

## Core Components & Relationships
```
main.jsx
  └── App.jsx                     # All sections rendered here
        ├── Analytics.jsx         # Passive tracker, no UI output
        ├── LoginModal.jsx        # Conditionally rendered admin modal
        └── firebase.js           # Shared db/auth exports used by App & Analytics
```

## Architectural Patterns
- **Single-file component architecture**: All portfolio sections live in `App.jsx`; no separate section components
- **Centralized Firebase module**: `firebase.js` initializes once and exports `db` and `auth` for use across components
- **Environment-driven config**: All Firebase credentials sourced from `import.meta.env.VITE_*` variables
- **Static SPA deployment**: Vite builds to `dist/`, deployed to GitHub Pages under `/portfolio/` base path
- **No routing**: Single scrollable page; no React Router
