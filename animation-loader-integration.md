# Advanced Animation Loader Integration Guide

## 1. Project Setup & Dependencies

### Check if you have shadcn/ui setup
If you don't have shadcn/ui configured, run:
```bash
npx shadcn-ui@latest init
```

### Install required dependencies
```bash
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install -D @types/react @types/react-dom
```

### Ensure Tailwind CSS is configured
Your `tailwind.config.js` should include:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Your theme extensions
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

## 2. Create Directory Structure

Create the following directories if they don't exist:
```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   └── loaders/      # Custom loader components
├── hooks/            # Custom hooks
├── context/          # React contexts
└── types/            # TypeScript types
```

**Important**: The `/components/ui` folder is crucial for shadcn/ui compatibility and component organization.

## 3. Component Files

### A. Main Animation Component
Save as `src/components/ui/set-of-animations-4.tsx`

### B. Loader Context
Save as `src/context/LoaderContext.tsx`

### C. Random Loader Hook
Save as `src/hooks/useRandomLoader.ts`

### D. Page Loader Component
Save as `src/components/loaders/PageLoader.tsx`

### E. Global Loader Provider
Save as `src/components/providers/LoaderProvider.tsx`

## 4. Implementation Steps

### Step 1: Copy the Animation Component
Place the provided `set-of-animations-4.tsx` in `src/components/ui/`

### Step 2: Create Supporting Files
Create all the supporting context, hooks, and wrapper components.

### Step 3: Wrap Your App
Wrap your main App component with the LoaderProvider.

### Step 4: Add to Pages
Add the PageLoader component to all your pages or create a layout wrapper.

## 5. Usage Examples

### In Next.js App Router:
```tsx
// app/layout.tsx
import { LoaderProvider } from '@/components/providers/LoaderProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LoaderProvider>
          {children}
        </LoaderProvider>
      </body>
    </html>
  )
}

// app/page.tsx
import { PageLoader } from '@/components/loaders/PageLoader'

export default function HomePage() {
  return (
    <PageLoader>
      <div>Your page content here</div>
    </PageLoader>
  )
}
```

### In Next.js Pages Router:
```tsx
// pages/_app.tsx
import { LoaderProvider } from '@/components/providers/LoaderProvider'

export default function App({ Component, pageProps }) {
  return (
    <LoaderProvider>
      <Component {...pageProps} />
    </LoaderProvider>
  )
}

// pages/index.tsx
import { PageLoader } from '@/components/loaders/PageLoader'

export default function HomePage() {
  return (
    <PageLoader>
      <div>Your page content here</div>
    </PageLoader>
  )
}
```

### In React App:
```tsx
// src/App.tsx
import { LoaderProvider } from './components/providers/LoaderProvider'
import { PageLoader } from './components/loaders/PageLoader'

function App() {
  return (
    <LoaderProvider>
      <PageLoader>
        <div>Your app content here</div>
      </PageLoader>
    </LoaderProvider>
  )
}
```

## 6. Customization Options

### Adjust Animation Duration
Modify the `LOADING_DURATION` in `PageLoader.tsx`:
```tsx
const LOADING_DURATION = 3000; // 3 seconds
```

### Add Page-Specific Animations
```tsx
<PageLoader preferredAnimation="sphere-scan">
  <YourPageContent />
</PageLoader>
```

### Disable for Specific Pages
```tsx
<PageLoader disabled>
  <YourPageContent />
</PageLoader>
```

## 7. TypeScript Configuration

Ensure your `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 8. Troubleshooting

### Common Issues:
1. **Import errors**: Check that all files are in the correct directories
2. **Animation not showing**: Verify the LoaderProvider is wrapping your app
3. **TypeScript errors**: Ensure all types are properly imported
4. **Canvas not rendering**: Check that the component is client-side only

### Debug Mode:
Add this to see which animation is selected:
```tsx
console.log('Selected animation:', selectedAnimation);
```

## 9. Performance Considerations

- Animations are optimized with `requestAnimationFrame`
- Canvas cleanup prevents memory leaks
- Random selection uses crypto API for better randomness
- Components are lazy-loaded to reduce initial bundle size

## 10. Cursor IDE Instructions

To tell Cursor to implement this across all pages:

**Prompt for Cursor:**
```
Please implement the PageLoader component on all existing pages in this project. 

Requirements:
1. Import PageLoader from '@/components/loaders/PageLoader'
2. Wrap the main content of each page with <PageLoader>
3. Ensure LoaderProvider is in the root layout/app component
4. Each page should show a random animation from the 9 available
5. Animation should play for 2-3 seconds before showing page content
6. Maintain existing page functionality and styling
7. Add proper TypeScript types where needed

Please update all page files automatically and show me the changes.
```