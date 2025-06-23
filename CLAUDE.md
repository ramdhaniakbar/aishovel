# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (default: http://localhost:3000)
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check for linting errors

## Architecture

This is a Next.js 15 application using the App Router architecture with TypeScript and Tailwind CSS v4.

### Project Structure
- `src/app/` - App Router pages and layouts
- `src/app/layout.tsx` - Root layout with Geist fonts configuration
- `src/app/page.tsx` - Homepage component
- `src/app/globals.css` - Global styles and Tailwind CSS imports
- `src/lib/` - Utility functions and configurations
- `src/lib/supabase.ts` - Supabase client configuration
- `public/` - Static assets (SVG icons and images)

### Key Technologies
- **Next.js 15** with App Router
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** with PostCSS
- **Geist fonts** (sans and mono) via next/font/google
- **Turbopack** for fast development builds
- **Supabase** for database and file storage

### TypeScript Configuration
- Uses path mapping with `@/*` pointing to `./src/*`
- Strict mode enabled
- Target: ES2017
- Bundler module resolution

### Styling
- Tailwind CSS v4 with custom CSS variables for fonts
- Dark mode support with automatic color scheme detection
- Geist font family variables: `--font-geist-sans` and `--font-geist-mono`

### Database & Storage
- **Supabase client** configured in `src/lib/supabase.ts`
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Import client with: `import { supabase } from '@/lib/supabase'`