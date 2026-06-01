# EduTrack — Next.js Frontend Dashboard

This directory houses the Next.js 16 frontend for **EduTrack**, a comprehensive, role-based dashboard for teachers and school administrators. It is built using the App Router, Tailwind CSS, TypeScript, and Shadcn UI.

For a detailed overview of the entire project modules, technical specifications, and UX design, see the root [PROJECT_DESCRIPTION.md](../PROJECT_DESCRIPTION.md).

---

## 🚀 Getting Started

### 📦 Installation

Ensure you have [Node.js](https://nodejs.org) (v18+ recommended) installed, then run:

```bash
npm install
```

### 💻 Development Server

Start the local development server on port `3000`:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 🏗️ Production Build

Generate an optimized production build of the Next.js application:

```bash
npm run build
```

---

## 🛠️ Design System & Customization

The project styling is centralized in `app/globals.css` with a customized color palette and dark mode tokens.

- **Theme Switching**: Handled client-side via custom CSS variables synced to system preferences or manual selections using the `ThemeToggle` component.
- **Component Primitives**: Integrated with Shadcn UI and Radix UI in the `components/ui/` directory.

---

## 📂 Code Organization & Architecture

EduTrack follows a strict layer structure to ensure scalability and maintainability:

1. **Routing & Pages (`app/`)**: Folders dictate routes. Page components focus solely on layout composition.
2. **Feature Components (`app/[feature]/_components/`)**: Visual modules isolated to the features they serve (e.g., `MarksEditor` inside `/teacher`).
3. **Custom Hooks (`app/[feature]/hooks/`)**: Holds all state machine, validation, and side-effect logic.
4. **Data Access Layer (`dal/`)**: Pure network client routines (e.g., `exams.dal.ts`) that isolate UI files from raw endpoints.
5. **Shared UI (`components/shared/`)**: Generic reusables like loaders, badges, and the theme engine.
