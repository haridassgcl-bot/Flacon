# Flacon Marketplace (`flacon-marketplace`)

> **Brand**: Flacon  
> **Tagline**: Buy. Sell. Connect.  
> **Market**: Tamil Nadu (English + தமிழ் dual-language support)  
> **Architecture**: Direct buyer-seller peer-to-peer classifieds platform

---

## 🏗 Repository & Monorepo Structure

```
flacon-marketplace/
├── apps/
│   ├── web/                     # React + Vite + TypeScript web application
│   ├── mobile/                  # React Native + Expo cross-platform app
│   └── admin/                   # React + Vite admin control panel
├── backend/                     # Node.js + Express + TypeScript REST API
├── packages/
│   ├── shared-types/            # Shared TypeScript interfaces & DTOs
│   ├── validation/              # Centralized Zod validation schemas
│   ├── translations/            # English (en.json) & Tamil (ta.json)
│   ├── api-client/              # Type-safe API client
│   └── design-tokens/           # Shared brand color palette and styling tokens
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql    # 16 Core database tables
│   │   ├── 002_user_trigger.sql      # Auth user creation trigger
│   │   ├── 003_rls.sql               # Row-Level Security policies
│   │   └── 004_seed_categories.sql  # 12 Initial categories
│   ├── seed.sql                      # Tamil Nadu locations & plans
│   └── config.toml                   # Local Supabase configuration
├── docs/
│   ├── architecture.md          # System architecture breakdown
│   ├── database.md              # Database DDL & relationships
│   ├── api.md                   # REST API specification
│   └── deployment.md            # Vercel, Supabase & Cloudflare deployment
├── .github/
│   └── workflows/ci.yml         # GitHub Actions CI pipeline
├── pnpm-workspace.yaml
└── package.json
```

---

## 🚀 Quick Start Guide

### 1. Database Setup (Supabase)
Run the SQL migrations in order in your Supabase SQL Editor:
1. [`supabase/migrations/001_initial_schema.sql`](./supabase/migrations/001_initial_schema.sql)
2. [`supabase/migrations/002_user_trigger.sql`](./supabase/migrations/002_user_trigger.sql)
3. [`supabase/migrations/003_rls.sql`](./supabase/migrations/003_rls.sql)
4. [`supabase/migrations/004_seed_categories.sql`](./supabase/migrations/004_seed_categories.sql)
5. [`supabase/seed.sql`](./supabase/seed.sql)

### 2. Run Local Development Server
```bash
# Web Application (http://localhost:5173)
npm run dev:web

# Admin Control Center (http://localhost:5174)
npm run dev:admin

# Backend REST API (http://localhost:5000)
npm run dev:api
```

---

## 💎 Core Capabilities
- **Direct P2P Model**: No warehousing, zero custody of buyer purchase money.
- **Dynamic Category Form Engine**: Administrators can configure custom product specifications without modifying source code.
- **Regional Focus**: Native Tamil + English support with district and locality discovery across Tamil Nadu.
- **Freemium & Subscription Revenue**: Featured Ads (₹99), Premium Ads (₹199), Top Ads (₹299), and Business Plans (₹999/mo, ₹9,999/yr) powered by Razorpay.
