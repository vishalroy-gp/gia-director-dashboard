# CarbonCN Design System Export

This export contains 92 components from the CarbonCN Design System.

## Accent Color

This export is configured with **blue** as the primary accent color.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Fonts

```bash
npm install @fontsource/ibm-plex-sans @fontsource/ibm-plex-mono
```

Then import in your main entry file:

```tsx
import '@fontsource/ibm-plex-sans/300.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-mono/400.css'
```

### 3. Copy Files

- Copy `components/ui/` to `src/components/ui/`
- Copy `lib/utils.ts` to `src/lib/utils.ts`
- Merge `styles/globals.css` with your global CSS
- Merge `tailwind.config.js` with your Tailwind config

### 4. Configure Path Alias

Add to your `tsconfig.json`:

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

## Usage

```tsx
import { Button } from "@/components/ui/button"

function App() {
  return <Button>Click me</Button>
}
```

## LLM Integration

See `PROMPT.md` for comprehensive documentation that can be used with AI assistants to understand and extend this design system.

## More Information

For the latest components and updates, visit: https://github.com/GaragePlug-AI/carboncn-design-system
