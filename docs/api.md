# Sellora REST API Specification

**Base URL**: `https://api.sellora.in/api/v1` (Local: `http://localhost:5000/api/v1`)

## Headers
```
Authorization: Bearer <SUPABASE_ACCESS_TOKEN>
Content-Type: application/json
```

## Core Modules & Endpoints
| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth & Users** | `POST` | `/auth/profile` | Create/update user profile |
| | `GET` | `/users/me` | Current authenticated user |
| | `PATCH` | `/users/me` | Update language / profile |
| **Categories** | `GET` | `/categories` | Fetch all active categories & subcategories |
| | `GET` | `/categories/:slug` | Specific category details & dynamic fields |
| **Locations** | `GET` | `/locations` | Tamil Nadu districts & localities |
| **Listings** | `POST` | `/listings` | Create draft advertisement |
| | `GET` | `/listings` | Browse active advertisements |
| | `GET` | `/listings/:id` | Full listing details |
| | `PATCH` | `/listings/:id` | Update listing |
| | `POST` | `/listings/:id/submit` | Submit for admin moderation |
| | `POST` | `/listings/:id/sold` | Mark listing as sold |
| **Search** | `GET` | `/search` | Full-text trigram & dynamic attribute search |
| **Favourites** | `POST` | `/favourites/:listingId` | Bookmark listing |
| | `DELETE`| `/favourites/:listingId` | Remove bookmark |
| **Chat** | `POST` | `/conversations` | Initiate buyer-seller chat |
| | `GET` | `/conversations` | List user chat threads |
| | `GET` | `/conversations/:id/messages` | Fetch messages |
| | `POST` | `/conversations/:id/messages` | Send message |
| **Monetization** | `GET` | `/plans` | Pricing tiers |
| | `POST` | `/payments/orders` | Create Razorpay order |
| | `POST` | `/payments/verify` | Verify Razorpay HMAC signature |
| | `POST` | `/promotions` | Purchase Featured / Premium / Top Ad |
| **Admin** | `GET` | `/admin/dashboard` | Key platform metrics |
| | `GET` | `/admin/listings` | Moderation queue |
| | `PATCH` | `/admin/listings/:id/moderate` | Approve or reject ad |

