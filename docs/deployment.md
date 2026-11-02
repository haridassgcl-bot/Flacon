# Sellora Deployment Mapping

| Component | Target Service | Domain |
| :--- | :--- | :--- |
| **Website** | Vercel | `sellora.in`, `www.sellora.in` |
| **Admin** | Vercel | `admin.sellora.in` |
| **Backend API** | Render / Railway | `api.sellora.in` |
| **Database** | Supabase PostgreSQL | `db.sellora.in` |
| **Media Storage**| Supabase Storage / S3 | CDN |
| **Mobile Apps** | Google Play & Apple App Store | iOS & Android via EAS |
| **DNS & WAF** | Cloudflare | Anycast DNS |

