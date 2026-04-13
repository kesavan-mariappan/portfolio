# Development Guidelines

## Code Quality Standards

### ESLint Configuration
- Flat config format (`eslint.config.js`) with `defineConfig` + `globalIgnores`
- Extends: `js.configs.recommended`, `reactHooks.configs.flat.recommended`, `reactRefresh.configs.vite`
- Rule: `no-unused-vars` errors, but ignores `^[A-Z_]` pattern (PascalCase components are safe to define without explicit use in the same file)
- Target: `**/*.{js,jsx}`, `ecmaVersion: 2020`, `sourceType: 'module'`

### Naming Conventions
- Components: PascalCase (`AnimatedCard`, `StatCard`, `ExperienceCard`, `TechCard`)
- Hooks/state: camelCase (`activeSection`, `mobileMenuOpen`, `showAnalytics`)
- Constants/lookup maps: SCREAMING_SNAKE_CASE (`SECTION_LABELS`, `NAV_SECTIONS`, `CONTACT_SECTIONS`)
- Firebase exports: lowercase named exports (`db`, `auth`)
- Files: camelCase for utilities (`firebase.js`), PascalCase for components (`App.jsx`, `Analytics.jsx`)

### Import Order (observed pattern across all files)
1. React core (`import React, { ... } from 'react'`)
2. Third-party libraries (framer-motion, firebase, react-icons)
3. Local assets (`./assets/...`)
4. Local components (`./Analytics`, `./LoginModal`)
5. Local utilities/config (`./firebase`)
6. Named Firebase SDK imports (`from 'firebase/firestore'`)

---

## Component Patterns

### Sub-component Architecture
All reusable UI pieces are defined as named functions at the bottom of `App.jsx` — not in separate files. Pattern:
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
All portfolio sections use the `Section` component:
```jsx
<Section id="sectionId" title="Section Title" dark?>
  {/* content */}
</Section>
```
- `dark` prop adds `bg-gradient-to-b from-black to-gray-900`
- Section headings: `text-5xl md:text-7xl font-bold` with cyan-to-blue gradient text

### AnimatedCard Wrapper
Wrap content blocks that need scroll-triggered fade-in:
```jsx
<AnimatedCard delay={0.2}>
  {/* content */}
</AnimatedCard>
```
Uses `whileInView` with `viewport={{ once: true, amount: 0.1 }}`.

---

## Framer Motion Patterns

### Scroll-triggered animations (most common — used in every component)
```jsx
initial={{ opacity: 0, y: 50 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: false, amount: 0.3 }}
transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
```
- `once: false` = re-animates on scroll back (used in sub-components)
- `once: true` = animates only first time (used in Section wrapper and footer)

### useInView + animate pattern (for components needing imperative control)
```jsx
const ref = useRef(null);
const isInView = useInView(ref, { once: false, amount: 0.3 });
<motion.div
  ref={ref}
  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
  transition={{ duration: 0.8, delay }}
/>
```

### Hover interactions (consistent across all interactive elements)
```jsx
whileHover={{ scale: 1.05, y: -5 }}
whileTap={{ scale: 0.95 }}
```

### Entrance animation easing
Custom spring-like ease used throughout: `ease: [0.16, 1, 0.3, 1]`

### Infinite animations
```jsx
animate={{ y: [0, -10, 0] }}
transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
```

---

## Firebase Usage Patterns

### Firestore write (fire-and-forget analytics)
```js
setDoc(doc(db, 'analytics', 'docName'), { field: increment(1) }, { merge: true });
```
- Always use `{ merge: true }` to avoid overwriting other fields
- Always use `increment(1)` from `firebase/firestore` for counters
- No `await` — analytics writes are non-blocking

### Firestore real-time read (Analytics dashboard)
```js
const unsub = onSnapshot(doc(db, 'analytics', 'docName'), (snap) => {
  setState(snap.data()?.field || defaultValue);
});
return () => unsub(); // cleanup in useEffect return
```

### Auth pattern
```js
await signInWithEmailAndPassword(auth, email, password);
signOut(auth);
```
- Auth errors caught with generic message: `'Invalid credentials'`
- Loading state managed with `useState(false)` + try/finally

### Firebase module (`firebase.js`)
- Single `initializeApp` call, exports `db` and `auth`
- All config from `import.meta.env.VITE_FIREBASE_*`
- Never import `app` directly — only use `db` and `auth` exports

---

## Styling Conventions (TailwindCSS)

### Color palette
- Primary accent: `cyan-400` / `cyan-500` (`#22d3ee` / `#06b6d4`)
- Background: `black`, `gray-900`, `gray-950`
- Text: `white`, `gray-300`, `gray-400`, `gray-500`
- Borders: `border-cyan-500/20` (default), `border-cyan-400/50` (hover)

### Glassmorphism / card style
```
bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-2xl (or rounded-3xl)
hover:border-cyan-400/50 transition-all relative overflow-hidden
```

### Gradient text
```
bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent
```

### Layout
- Max width: `max-w-7xl mx-auto px-6`
- Section padding: `py-20 px-6`
- Responsive grid: `grid md:grid-cols-2 gap-12` / `grid md:grid-cols-3 gap-8`

### Tech/skill badge style
```
px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400
```

### Fixed background elements
Use `fixed inset-0 pointer-events-none z-0` for decorative backgrounds; content uses `relative z-10`.

---

## State Management Patterns

- All state is local `useState` — no global state library
- Conditional rendering for full-page swaps: `if (showAnalytics) return <Analytics ... />`
- Modal visibility: `useState(false)` toggled by event handlers
- Secret admin access: 5-click counter with 3s reset timer using `useRef` for the timer

---

## Analytics Tracking Convention
Every user interaction that should be tracked calls:
```js
setDoc(doc(db, 'analytics', 'sectionClicks'), { [key]: increment(1) }, { merge: true })
```
Track keys follow the pattern: `contact_<platform>`, `<sectionId>`, `resumeViewed`, `linkedinViewed`.
