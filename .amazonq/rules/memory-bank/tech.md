# Technology Stack

## Languages & Runtimes
- JavaScript (ES Modules, `"type": "module"`)
- JSX (React components)
- Node.js (build tooling only)

## Core Dependencies
| Package | Version | Purpose |
|---|---|---|
| react | ^19.2.0 | UI framework |
| react-dom | ^19.2.0 | DOM renderer |
| framer-motion | ^12.23.25 | Animations |
| firebase | ^11.10.0 | Firestore, Auth, Analytics |
| react-icons | ^5.6.0 | Icon library |

## Dev Dependencies
| Package | Version | Purpose |
|---|---|---|
| vite (rolldown-vite) | 7.2.5 | Build tool (rolldown variant) |
| @vitejs/plugin-react | ^5.1.1 | React fast refresh |
| tailwindcss | ^3.4.1 | Utility CSS |
| postcss + autoprefixer | latest | CSS processing |
| eslint | ^9.39.1 | Linting (flat config) |
| eslint-plugin-react-hooks | ^7.0.1 | Hooks rules |
| eslint-plugin-react-refresh | ^0.4.24 | HMR safety |

## Build & Deployment
- **Build tool**: rolldown-vite (drop-in Vite replacement using Rolldown bundler)
- **Base path**: `/portfolio/` (set in `vite.config.js`)
- **Deployment**: GitHub Actions → GitHub Pages (`gh-pages` branch)
- **Container**: Dockerfile available for local Docker preview (`preview.sh`)

## Environment Variables (`.env.local`)
All prefixed with `VITE_FIREBASE_`:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Development Commands
```bash
npm run dev       # Start dev server (HMR)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
bash preview.sh   # Docker-based preview
```
