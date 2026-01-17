# Project Requirements

## System Requirements
- **Node.js**: v18.17.0 or later (Recommended: v20 LTS)
- **Package Manager**: npm (v9+) or yarn/pnpm equivalent
- **Operating System**: Windows, macOS, or Linux

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utils**: clsx, tailwind-merge, date-fns

## External Services & APIs

### 1. YouTube Data API v3
Required for fetching channel statistics and latest videos.
- **Cost**: Free tier available (Google Cloud Platform)
- **Quota**: 10,000 units/day (default)
- **Required Credentials**:
  - `API Key`
  - `Channel ID`

### 2. Supabase (PostgreSQL)
Required for the "Programs" page data.
- **Cost**: Free tier available
- **Required Credentials**:
  - `Project URL`
  - `Anon Key`

## Environment Variables
The following environment variables must be defined in `.env.local` (for local dev) and in the Vercel Project Settings (for production).

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_YOUTUBE_API_KEY` | Google Cloud API Key with YouTube Data API v3 enabled |
| `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` | The ID of the YouTube channel (e.g., `UC...`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anonymous Public Key |

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
