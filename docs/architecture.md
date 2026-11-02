# Sellora Architecture & System Specification

## 1. Overview
Sellora is a high-performance, multi-category peer-to-peer (P2P) classifieds marketplace platform designed primarily for Tamil Nadu, supporting bilingual navigation (English and Tamil).

```
sellora-marketplace/
├── apps/
│   ├── web/          # React + Vite responsive web application
│   ├── mobile/       # React Native + Expo shared cross-platform mobile app
│   └── admin/        # React + Vite admin control panel
├── backend/          # Node.js + Express + TypeScript REST API
├── packages/
│   ├── shared-types/ # Shared TypeScript DTOs and database models
│   ├── validation/   # Zod schemas shared between client and server
│   ├── translations/ # English (en.json) & Tamil (ta.json) dictionaries
│   └── design-tokens/# Shared color palettes and typography tokens
├── supabase/         # Migrations (001, 002, 003, 004), seed.sql, config.toml
└── docs/             # Technical specifications & runbooks
```

## 2. Key Architectural Decisions
- **Direct Buyer-Seller Model**: Sellora never holds escrow funds or manages fulfillment/warehousing.
- **Dynamic Category Field Engine**: Fields (e.g. car mileage vs flat BHK) are defined dynamically in `category_fields` and saved in `listings.attributes (JSONB)` with GIN indexes.
- **Freemium Monetization**: Razorpay handles listing upgrades (Featured ₹99, Premium ₹199, Top Ad ₹299) and dealer subscriptions (₹999/mo, ₹9,999/yr).

