# Development Guidelines

## Code Quality Standards

### ESLint Configuration
- Flat config format (`eslint.config.js`) with `defineConfig` + `globalIgnores`
- Extends: `js.configs.recommended`, `reactHooks.configs.flat.recommended`, `reactRefresh.configs.vite`
- Rule: `no-unused-vars` errors, but ignores `^[A-Z_]` pattern
- Target: `**/*.{js,jsx}`, `ecmaVersion: 2020`, `sourceType: 'module'`

### Naming Conventions
- Components: PascalCase (`AnimatedCard`, `StatCard`, `LoginModal`, `Analytics`)
- Hooks/state: camelCase (`activeSection`, `mobileMenuOpen`, `showAnalytics`, `showLogin`)
- Constants/lookup maps: SCREAMING_SNAKE_CASE (`SECTION_LABELS`, `NAV_SECTIONS`, `CONTACT_SECTIONS`)
- Firebase exports: lowercase named exports (`db`, `auth`)
- Files: camelCase for utilities (`firebase.js`), PascalCase for components (`App.jsx`, `Analytics.jsx`)

### Import Order
1. React core (`import React, { ... } from 'react'`)
2. Third-party libraries (framer-motion, firebase, react-icons)
3. Local assets (`./assets/...`)
4. Local components (`./Analytics`, `./LoginModal`)
5. Local utilities/config (`./firebase`)
6. Named Firebase SDK imports (`from 'firebase/firestore'`)

---

## Component Patterns

### Sub-component Architecture
All reusable UI pieces defined as named functions at the bottom of `App.jsx`:
```jsx
const ComponentName = ({ prop1, prop2, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  return (
    <motion.div ref={ref} initial={...} animate={isInView ? ... : ...} transition={...}>
      ...
    </motion.div>
  );
};
```

### Section Wrapper Pattern
```jsx
<Section id="sectionId" title="Section Title" dark?>
  {/* content */}
</Section>
```

### Secret Analytics Access Pattern
```js
// 5 clicks on KM logo within 3 seconds → opens LoginModal
const handleSecretClick = () => {
  setSecretClicks((prev) => {
    const next = prev + 1;
    if (next >= 5) { setShowLogin(true); return 0; }
    clearTimeout(secretTimerRef.current);
    secretTimerRef.current = setTimeout(() => setSecretClicks(0), 3000);
    if (next === 1) scrollToSection('hero');
    return next;
  });
};
```

---

## Firebase Usage Patterns

### Firestore write (fire-and-forget analytics)
```js
setDoc(doc(db, 'analytics', 'docName'), { field: increment(1) }, { merge: true });
```
- Always use `{ merge: true }` to avoid overwriting other fields
- Always use `increment(1)` from `firebase/firestore`
- No `await` — analytics writes are non-blocking

### Firestore real-time read (Analytics dashboard)
```js
const unsub = onSnapshot(doc(db, 'analytics', 'docName'), (snap) => {
  setState(snap.data()?.field || defaultValue);
});
return () => unsub();
```

### Auth pattern (Email/Password)
```js
await signInWithEmailAndPassword(auth, email, password);
signOut(auth);
```
- Auth errors caught with generic message: `'Invalid credentials'`
- Loading state managed with `useState(false)` + try/finally

### Firestore Documents
| Document | Fields |
|---|---|
| `analytics/pageViews` | `count` |
| `analytics/sectionClicks` | `hero`, `about`, `experience`, `personal-projects`, `projects`, `awards`, `tech`, `contact`, `resumeViewed`, `linkedinViewed`, `contact_email`, `contact_linkedin`, `contact_instagram`, `contact_github`, `contact_github_devops`, `contact_medium`, `contact_phone` |
| `analytics/sectionViews` | `hero`, `about`, `experience`, `personal-projects`, `projects`, `awards`, `tech`, `contact` |

---

## Styling Conventions (TailwindCSS)

### Color palette
- Primary accent: `cyan-400` / `cyan-500`
- Background: `black`, `gray-900`, `gray-950`
- Text: `white`, `gray-300`, `gray-400`, `gray-500`
- Borders: `border-cyan-500/20` (default), `border-cyan-400/50` (hover)

### Glassmorphism / card style
```
bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-2xl
hover:border-cyan-400/50 transition-all relative overflow-hidden
```

### Layout
- Max width: `max-w-7xl mx-auto px-6`
- Section padding: `py-20 px-6`
- Responsive grid: `grid md:grid-cols-2 gap-12` / `grid md:grid-cols-3 gap-8`

---

## Analytics Tracking Convention
```js
// Nav clicks & special actions → sectionClicks document
setDoc(doc(db, 'analytics', 'sectionClicks'), { [key]: increment(1) }, { merge: true })

// Scroll views → sectionViews document (IntersectionObserver, once per session)
setDoc(doc(db, 'analytics', 'sectionViews'), { [id]: increment(1) }, { merge: true })

// Page views → pageViews document
setDoc(doc(db, 'analytics', 'pageViews'), { count: increment(1) }, { merge: true })
```
