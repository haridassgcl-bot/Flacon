# Flacon Marketplace — Saved Project Checkpoint

**Last Saved:** 2026-11-02  
**Brand Identity:** Flacon (`Flacon — Buy. Sell. Connect.`)  
**Core Brand Color:** `#6ea4bf` (Steel Blue)  
**Primary Region:** Tamil Nadu, India (Dual-language: English & தமிழ்)  
**Workspace Path:** `c:\Users\dell\Desktop\Web devlopement\Falcon`

---

## 💾 Saved Deliverables & Components

### 1. Web Application (`apps/web/`)
- `apps/web/index.html`: Flacon metadata & branding.
- `apps/web/tailwind.config.js`: Custom Flacon `#6ea4bf` palette with complete tints (50-950).
- `apps/web/src/App.tsx`: Full application routing with `AuthProvider` and `AuthModal`.
- `apps/web/src/context/AuthContext.tsx`: Persistent mobile login, favourites list, account deletion.
- `apps/web/src/components/Navbar.tsx`: `#6ea4bf` brand logo, Tamil Nadu location selector, language toggle, saved items counter.
- `apps/web/src/components/Footer.tsx`: Flacon trust badges, category links, legal pages.
- `apps/web/src/components/AuthModal.tsx`: Mobile OTP authentication flow (test code `1234`).
- `apps/web/src/components/AdCard.tsx`: Product preview with favourite heart toggle, condition, and location.
- `apps/web/src/pages/HomePage.tsx`: Midnight slate hero (`#0a141b` $\rightarrow$ `#1a3e52`), trending searches, category grid.
- `apps/web/src/pages/BrowsePage.tsx`: Full facet filtering (District, Category, Price min/max, Condition, Featured).
- `apps/web/src/pages/AdDetailPage.tsx`: Dynamic specifications table, photo gallery, WhatsApp deep link, and call button.
- `apps/web/src/pages/PostAdPage.tsx`: 4-step dynamic category form engine with photo upload and price negotiable check.
- `apps/web/src/pages/PricingPage.tsx`: Freemium packages (Featured ₹99, Premium ₹199, Top Ad ₹299, Business ₹999/mo) and Razorpay checkout modal.
- `apps/web/src/pages/MessagesPage.tsx`: In-app buyer-seller chat threads.
- `apps/web/src/pages/FavouritesPage.tsx`: Saved ads management with quick contact.
- `apps/web/src/pages/AccountPage.tsx`: User profile, language preference, and permanent GDPR account deletion.
- `apps/web/dist/`: Freshly compiled production assets ready for deployment (`index-BFOfO4e_.js`, `index-BzrzcH2Z.css`).

### 2. Admin Control Panel (`apps/admin/`)
- `apps/admin/src/App.tsx`: Flacon Admin sidebar navigation.
- `apps/admin/src/pages/Dashboard.tsx`: KPI metrics, revenue scenario calculations, live audit log.
- `apps/admin/src/pages/ModerationQueue.tsx`: 1-click Approve / Reject moderation actions with reason codes.
- `apps/admin/src/pages/CategoryFieldBuilder.tsx`: No-code dynamic category and custom attribute builder.
- `apps/admin/tailwind.config.js`: Theme configured with `#6ea4bf`.

### 3. Mobile Application (`apps/mobile/`)
- `apps/mobile/app.json`: Configured with scheme `flacon://`, bundle ID `in.flacon.marketplace`.
- `apps/mobile/App.tsx`: React Native / Expo application with Home, Categories, Sell (+), Chats, Account tabs, WhatsApp linking, and `#6ea4bf` styling.

### 4. Backend REST API (`backend/`)
- `backend/src/server.ts`: Express API server with CORS and router mounts.
- `backend/src/routes/auth.ts`: OTP generation and verification, user profile management, account deletion.
- `backend/src/routes/categories.ts`: Category tree and dynamic field endpoints.
- `backend/src/routes/listings.ts`: Ad submission with `pending_moderation` status, search and attribute filters.
- `backend/src/routes/locations.ts`: Tamil Nadu districts and localities query.
- `backend/src/routes/payments.ts`: Razorpay order creation and HMAC SHA256 signature verification.
- `backend/src/routes/moderation.ts`: Admin approval/rejection pipeline with audit logs.

### 5. Shared Packages (`packages/`)
- `packages/translations/`: Bilingual `en.json` and `ta.json` dictionaries.
- `packages/validation/`: Shared Zod validation schemas (`createListingSchema`, `searchFilterSchema`, `moderationActionSchema`).
- `packages/design-tokens/`: Color tokens centered around `#6ea4bf`.
- `packages/shared-types/`: Shared TypeScript interfaces and DTOs.

### 6. Supabase Database (`supabase/`)
- `supabase/migrations/001_initial_schema.sql`: 16 tables with UUID keys and GIN indexes.
- `supabase/migrations/002_user_trigger.sql`: `handle_new_user()` auto-profile trigger.
- `supabase/migrations/003_rls.sql`: Row-Level Security policies.
- `supabase/migrations/004_seed_categories.sql`: 12 Core Categories.
- `supabase/seed.sql`: Complete Tamil Nadu locations and monetization tiers.
- `supabase/config.toml`: Local Supabase configuration.

### 7. Documentation & CI/CD (`docs/` & `.github/`)
- `docs/architecture.md`, `docs/database.md`, `docs/api.md`, `docs/deployment.md`.
- `.github/workflows/ci.yml`: Automated build validation workflow.

