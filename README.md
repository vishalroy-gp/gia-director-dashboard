# Gia Director Dashboard

Enterprise landing page for the Gia AI Director, showcasing three AI Manager tools. Designed for iPad display at the NADA auto show booth.

## Features

- **AI Marketing Manager** - Lead capture and conversion (Instaleads.ai)
- **AI Business Dev Manager** - AI receptionist and booking (Gia)
- **AI Customer Service Manager** - Review management (FreshReview)

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS with Carbon Design System tokens
- IBM Plex Sans typography
- Lucide React icons

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Display Optimization

Optimized for iPad viewports:
- Standard iPad: 1024x768
- iPad Pro: 1366x1024

Dark theme by default for booth impact.

## Customization

### Replace Logo

Replace [src/assets/gia-logo.svg](src/assets/gia-logo.svg) with your actual Gia logo file. Update [src/components/Header.tsx](src/components/Header.tsx:7-9) to use the SVG:

```tsx
<img src="/src/assets/gia-logo.svg" alt="Gia" className="w-10 h-10" />
```

### Update Metrics

Edit [src/data/managers.ts](src/data/managers.ts) to update the metric values, labels, and trends.

## Project Structure

```
src/
├── components/
│   ├── ui/           # Design system components
│   ├── Header.tsx    # Top navigation
│   ├── ManagerCard.tsx
│   └── MetricItem.tsx
├── data/
│   └── managers.ts   # AI manager configurations
├── styles/
│   └── globals.css   # Global styles
└── App.tsx           # Main layout
```

## Deployment

Deploy to Vercel, Netlify, or any static hosting:

```bash
npm run build
# Upload dist/ folder
```

## License

Copyright 2026 GaragePlug
