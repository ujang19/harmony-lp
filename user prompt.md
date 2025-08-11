siap. Berikut **prompt siap-tempel** untuk AI coding agent kamu—merangkum gaya visual & aturan brand yang sudah kita pakai dan diambil dari dokumen/asset HID.

# Prompt untuk AI Coding Agent (Style Guide)

Bangun landing page **Harmony in Diversity Award** dengan aturan gaya berikut. Gunakan **HTML + Tailwind (CDN)** atau CSS variables dengan nama token yang sama.

## Brand tone & UX

* Suara: **clear, credible, action-oriented; warm, inclusive, aspirational**.
* CTA utama (konstan): **“Submit Nomination”** (English-only).
* Microcopy penting (hero/CTA area): “*Submissions are accepted in English only and must include an impact write-up with supporting materials.*”
* Navigasi sticky; section anchors; fokus pada scan-ability (headings singkat, bullets).

## Palet warna (tokens)

Gunakan token berikut (nama harus konsisten):

* `brand-blue: #4d91c6` (primary / links / CTA)
* `brand-blueDark: #3d749e` (hover CTA)
* `brand-off: #f5f0e6` (off-white hero / panel lembut)
* `brand-ink: #0f0f0f` (teks utama)
* Aksen (untuk band bermotif & labels):
  `brand-green: #6fbf73`, `brand-sand: #d8ae73`, `brand-orange: #e87d50`, `brand-yellow: #edb332`
* Neutral & utilities buat shadow/lines pakai opasitas (jangan abu-abu lain): gunakan `brand-off` + alpha.

## Tipografi & ukuran

* Sans modern humanist/geometric (contoh: **Inter**, **Manrope**, atau system UI); ukuran target:

  * H1 40–48 / bold; H2 28–32 / bold; H3 18–20 / semibold; body 16–18 / regular; microcopy 12–14.
* Letter-spacing normal; line-height 1.3–1.5 untuk keterbacaan.

## Layout, radius, shadow, spacing

* Grid responsif **max-width 1200px (max-w-7xl)**, gutter 24px+.
* Kartu/komponen: **radius 20px (≈ `rounded-2xl`)**, **shadow** lembut `0 6px 20px rgba(0,0,0,.08)`.
* Section rhythm: **band bermotif berwarna** di header section, lalu **cards/grid overlap** ke area putih dengan margin negatif konsisten (−2rem mobile, −3rem desktop).

## Motif & key visual

* Gunakan **dove + pattern “United as One: From Diversity, We Become Harmony”** sebagai KV.
* **Graphic elements** (SVG/PNG) — pakai sebagai background tone-on-tone di band:

  * Language (biru), Ethnicity (oranye), Social Fabric (kuning), Religion (hijau), Culture (sand).
* Penempatan motif: multi-size, tersebar ringan, opasitas 8–15%; jangan mengganggu teks.

**Assets (relative paths yang harus dipakai di kode):**

* Logo: `sandbox:/mnt/data/HID-LOGO COLOR.png`
* Stage hero image (sementara): `sandbox:/mnt/data/FINAL MOCK UP_STAGE.jpg`
* Pattern configs (pakai untuk background band):

  * `sandbox:/mnt/data/HID-GRAPHIC CONFIGURATION 02-LANGUAGE.png`
  * `sandbox:/mnt/data/HID-GRAPHIC CONFIGURATION 01-ETHNICITY.png`
  * `sandbox:/mnt/data/HID-GRAPHIC CONFIGURATION 03-SOCIAL FABRIC.png`
  * `sandbox:/mnt/data/HID-GRAPHIC CONFIGURATION 04-RELIGON.png`
  * `sandbox:/mnt/data/HID-GRAPHIC CONFIGURATION 05-CULTURE.png`

## Komponen UI (gaya & perilaku)

* **Hero:** bg `brand-off`, H1 kuat, subheading hangat, 3 CTA (primary biru). Tambahkan strip KV biru bermotif + tagline.
* **Key facts ribbon:** 4 kolom tipis dengan border `brand-off/60`.
* **Cards “Eligibility & Submission Standards”:** 4 kartu putih, border `brand-off`, body text 16px.
* **RAISE (accordion):** outline border tipis, ikon chevron rotate; content text 14–15px.
* **How to Participate:** header band **oranye bermotif**, grid 4 langkah (kartu putih); label STEP berwarna (blue/green/orange/yellow).
* **Timeline:** header band **biru bermotif**, 5 kartu kecil (Stage I–V).
* **Award & Recognition:** header band **kuning bermotif**, dua kartu (Monetary & Non-Monetary).
* **Judges & Patron:** kartu off-white; foto/placeholder bulat 64–80px; nama bold + afiliasi singkat.
* **Trophy:** gambar besar kanan, copy naratif singkat + bullet simbolik.
* **Partners:** header band **hijau bermotif**, dua info cards.
* **FAQ:** header band **biru bermotif**, accordion seperti RAISE.
* **Footer:** links tipis; gunakan `brand-blue` untuk hover.

## Interaksi

* Hover CTA: ganti ke `brand-blueDark`; outline focus **2px** `brand-blue` (WCAG).
* Accordion: klik toggle, **aria-expanded** update, transition sederhana.
* Mobile menu: burger → slide/toggle; nav link anchor smooth scroll.

## Aksesibilitas

* Target **WCAG 2.2 AA**: rasio kontras teks vs band bermotif min 4.5:1; fokus terlihat; gambar punya **alt**.
* Bahasa konten **English-only** (sesuai syarat pengajuan).

## Kode yang diharapkan

* **Tailwind via CDN** dengan `tailwind.config` inline yang extend `colors.brand.*` sesuai token di atas.
* Buat utilitas `.kv-banner` (z-index 0), `.overlap-wrap` (z-index 2, margin negatif responsif).
* Background band menggunakan `background-image` berlapis (linear-gradient untuk tone dan URL pattern).
* Gunakan path asset persis seperti daftar di atas; siapkan **SVG placeholder** untuk foto bila belum ada.

> Output akhir harus satu file HTML runnable yang mengikuti style di atas, dengan copy dan struktur landing page HID, CTA “**Submit Nomination**” konsisten, dan pattern band tidak flat.
