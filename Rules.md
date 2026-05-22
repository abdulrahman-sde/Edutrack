# Frontend Architecture Rules

# Core Principles

1. **Feature-Based Architecture**
2. **Separation of Concerns**
3. **Server-First Approach**
4. **Reusable UI System**
5. **Consistent Naming Conventions**
6. **Centralized Design Tokens**
7. **Minimal Logic Inside Components**

---

# Folder Structure

```txt
src/
├── app/
│   ├── feature/
│   │    ├── page.tsx
│   │    ├── _components/
│   │    └── hooks/
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── lib/
│   ├── api.ts
│   └── utils.ts
│
├── types/
│
└── styles/
    └── globals.css
```

---

# Feature Architecture

Each route owns its local implementation.

```txt
app/**/
 ├── page.tsx
 ├── _components/
 └── hooks/
```

## Local Feature Code

Feature-specific code belongs inside the route folder.

```txt
app/dashboard/
 ├── page.tsx
 ├── _components/
 │    ├── stats-card.tsx
 │    ├── activity-list.tsx
 │    └── dashboard-header.tsx
 └── hooks/
      └── use-dashboard.ts
```

---

## Global Shared Code

Reusable/global code belongs outside `app/`.

```txt
components/
 ├── ui/        # UI library components
 ├── layout/    # navbar/sidebar/footer
 └── shared/    # loaders, empty states, search, etc.
```

---

# Page Rules

`page.tsx` files should only compose sections/components.

## Allowed

- Layout composition
- Section ordering
- High-level structure

## Not Allowed

- Data fetching
- State management
- Large JSX blocks
- Business logic

```tsx
// ❌ BAD
export default function DashboardPage() {
  const data = useDashboard();

  return (
    <div>
      <h1>Dashboard</h1>
      <div>...</div>
    </div>
  );
}
```

```tsx
// ✅ GOOD
import { DashboardHeader } from "./_components/dashboard-header";
import { DashboardStats } from "./_components/dashboard-stats";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader />
      <DashboardStats />
    </div>
  );
}
```

---

# Hooks Rules

All component logic belongs inside hooks.

## Hooks Handle

- State
- Effects
- Fetching
- Mutations
- Derived state
- Event handlers

## Components Handle

- Rendering
- Layout
- Presentation

```tsx
// ✅ hooks/use-items.ts
export function useItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    ...
  }, []);

  return { items };
}
```

```tsx
// ✅ _components/items-list.tsx
export function ItemsList() {
  const { items } = useItems();

  return <div>...</div>;
}
```

---

# Component Rules

## Local Components

Feature-specific components stay inside `_components/`.

## Global Components

Reusable components belong in `components/`.

```txt
components/
 ├── ui/
 ├── layout/
 └── shared/
```

---

# Naming Conventions

## Files

Use kebab-case.

```txt
user-card.tsx
use-auth.ts
dashboard-sidebar.tsx
```

---

## Components

Use PascalCase.

```tsx
UserCard;
DashboardSidebar;
ProfileForm;
```

---

## Hooks

Always prefix hooks with `use`.

```tsx
useAuth;
useDashboard;
useItems;
```

---

## CSS Classes

Prefer semantic utility usage.

```tsx
// ❌ BAD
className = "bg-blue-500 rounded-[12px]";
```

```tsx
// ✅ GOOD
className = "bg-primary rounded-lg";
```

---

# Styling Rules

## Design Tokens

All colors, spacing, and radius values belong in `globals.css`.

```css
@theme {
  --color-primary: ...;
  --color-muted: ...;

  --radius: 0.5rem;
  --radius-lg: 1rem;
}
```

Never hardcode design values inside components.

---

# UI Rules

Use a centralized UI component system.

Examples:

- Button
- Card
- Dialog
- Input
- Dropdown
- Sheet
- Tabs

Avoid rebuilding common UI patterns repeatedly.

---

# Server-First Rules

Prefer server-side work whenever possible.

| Server             | Client          |
| ------------------ | --------------- |
| Data fetching      | UI state        |
| Filtering          | Modals          |
| Sorting            | Tabs            |
| Auth checks        | Animations      |
| Heavy calculations | Temporary state |

---

# Data Fetching Rules

## Never Fetch Directly Inside Components

```tsx
// ❌ BAD
useEffect(() => {
  fetch("/api/items");
}, []);
```

---

## Fetch Through Hooks

```tsx
// ✅ GOOD
const { items } = useItems();
```

---

# Data Flow

```txt
Page
 ↓
Component
 ↓
Hook
 ↓
API / Server
```

Never skip layers.
