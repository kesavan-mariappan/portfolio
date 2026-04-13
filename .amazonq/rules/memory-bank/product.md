# Product Overview

## Project Purpose
Personal portfolio website for Kesavan Mariappan, a Senior Associate Consultant / DevOps Engineer. Showcases professional experience, skills, projects, and provides a contact channel for potential employers and collaborators.

## Value Proposition
- Single-page application with smooth animations and modern dark UI
- Demonstrates technical expertise through the portfolio itself (React, DevOps, cloud)
- Integrated Firebase backend for real-time visitor analytics
- Grafana-style analytics dashboard protected behind secret 5-click trigger + email/password login
- Auto-deployed via GitHub Actions to GitHub Pages

## Key Features
- Animated hero section with DevOps infinity loop background
- Skills, experience, and projects showcase sections
- Real-time analytics tracking (Firebase Firestore)
- Protected admin analytics dashboard (Firebase Email/Password Auth)
- Fully responsive across all device sizes

## Analytics Tracked
- Page views (every visit)
- Nav clicks (per section)
- Scroll views (IntersectionObserver, once per section per visit)
- Resume clicks
- LinkedIn clicks (hero)
- Contact link clicks (Email, LinkedIn, Instagram, GitHub, GitHub DevOps, Medium)
- Phone clicks (hero)

## Analytics Access
- Click **KM logo 5 times** rapidly (within 3 seconds) → login modal appears
- Login with Firebase Email/Password credentials
- Grafana-style dashboard with KPI boxes, bar panels, real-time updates via onSnapshot
- Click Back → signs out + returns to portfolio

## Target Users
- Recruiters and hiring managers evaluating DevOps/cloud candidates
- Collaborators seeking cloud/infrastructure expertise
- Professional network connections

## Live URL
Deployed at: `https://kesavan-mariappan.github.io/portfolio/`
