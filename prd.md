# 📄 Product Requirement Document (PRD)

**Nama Produk:** KampusThrift  
**Versi:** 1.0.0 (MVP Phase)  
**Tipe Platform:** Web Application (Mobile-First Responsive PWA)  
**Target Pengguna:** Mahasiswa & Masyarakat Sekitar Kampus  
**Tujuan Proyek:** Menyediakan platform e-commerce hyperlocal preloved berbasis radius lokasi untuk memfasilitasi transaksi barang bekas yang aman, hemat (ongkir Rp0), dan terpercaya di ekosistem kampus.

---

## 1. System Architecture & Tech Stack Recommendation

* **Frontend:** React.js / Next.js / HTML5 + Tailwind CSS (Emerald Green Theme: `#10B981`).
* **Backend & Database:** Firebase (Firestore, Firebase Auth, Firebase Storage) atau Supabase.
* **Hosting:** Vercel / Netlify.
* **External Integration:** WhatsApp Business API / Deep Linking (`https://wa.me/`).

---

## 2. User Personas & Roles

1. **GUEST / UNAUTHENTICATED USER**
   * Hanya bisa melihat katalog, melakukan pencarian, dan memfilter lokasi/kategori.
   * Diarahkan untuk login ketika ingin melihat detail kontak seller atau mengunggah barang.

2. **GENERAL USER (Penjual/Pembeli Umum)**
   * Mendaftar dengan email non-kampus (Gmail/Yahoo).
   * Dapat menjual & membeli barang, memberikan rating, dan melakukan chat WhatsApp.

3. **VERIFIED STUDENT USER (Penjual/Pembeli Mahasiswa)**
   * Mendaftar atau memverifikasi akun menggunakan email institusi kampus (`.ac.id`).
   * Berhak mendapatkan **"Verified Student Badge"** pada profil & seluruh lapak produknya untuk meningkatkan trust score.

---

## 3. Detailed Data Models (Database Schema)

### A. Users Collection (`users`)
```json
{
  "user_id": "STRING (PK)",
  "full_name": "STRING",
  "email": "STRING",
  "is_student": "BOOLEAN",
  "campus_name": "STRING (e.g., UNNES)",
  "badge_verified": "BOOLEAN",
  "phone_number_wa": "STRING (Format: 628xxx)",
  "rating_honesty": "FLOAT (Default: 5.0)",
  "total_reviews": "INTEGER",
  "created_at": "TIMESTAMP"
}