# Nusa vCard — Portofolio Pribadi

Website portofolio responsif (HTML + CSS + JavaScript murni, tanpa build, tanpa npm).
Tata letaknya terinspirasi dari [vCard](https://github.com/codewithsadee/vcard-personal-portfolio)
(sidebar profil + halaman bertab), tetapi seluruh kode, desain, dan aset ditulis ulang
dengan sejumlah peningkatan.

## Cara menjalankan (sekali jalan)

**Paling mudah:** klik dua kali `index.html`. Selesai.

**Atau lewat server lokal** (lebih mirip kondisi online):

- Windows: klik dua kali `start.bat`
- macOS / Linux: jalankan `./start.sh` (jika perlu: `chmod +x start.sh`)
- Manual: `python -m http.server 8080` lalu buka http://localhost:8080

Tidak ada yang perlu diinstal. Font Google dimuat dari internet jika tersedia;
bila offline, otomatis memakai font sistem.

## Mengganti isi website

Semua konten ada di **`js/data.js`**: nama, foto, kontak, layanan, testimoni,
resume, keahlian, proyek, dan artikel blog. Teks ditulis dua bahasa:

```js
title: { id: "Judul Indonesia", en: "English title" }
```

| Yang ingin diganti        | Lokasi                                              |
| ------------------------- | --------------------------------------------------- |
| Nama, email, sosial media | `js/data.js` → `profile`                            |
| Foto profil               | ganti `assets/img/avatar.png` (atau `.jpg`, lalu ubah `profile.avatar`) |
| Proyek                    | `js/data.js` → `projects` (gambar di `assets/img/`) |
| Artikel                   | `js/data.js` → `posts`                              |
| Teks tombol/label         | `js/i18n.js`                                        |
| Warna dasar & aksen       | bagian atas `css/style.css`                         |

### Formulir kontak
Secara bawaan formulir membuka aplikasi email dengan pesan siap kirim (`mailto:`).
Agar terkirim langsung dari website, daftar di layanan formulir seperti Formspree
lalu isi `contact.endpoint` di `js/data.js` dengan URL-nya.

## Apa yang diubah dibanding vCard asli

- Tema **terang/gelap** (mengikuti sistem, ingatan pilihan) dan **4 warna aksen**
- **Dua bahasa** Indonesia/Inggris dengan satu klik
- Konten **terpusat di `data.js`**, tidak perlu menyunting HTML
- Efek mengetik pada peran, penghitung statistik, dan bar keahlian beranimasi
- Portofolio dengan **filter + pencarian** dan jendela detail proyek
- Blog dengan **filter topik + pencarian** dan pembaca artikel
- Testimoni yang bisa dibuka penuh, daftar teknologi, dan layanan
- Formulir kontak dengan **validasi**, tombol salin email, dan tautan WhatsApp
- Tombol **Cetak / simpan PDF** untuk resume (tata letak khusus cetak)
- Aksesibilitas: tautan lewati-konten, fokus keyboard terlihat, ARIA, `prefers-reduced-motion`
- Tanpa dependensi: semua gambar berupa file **PNG/JPG** lokal, bisa jalan offline
- Routing lewat hash, jadi `index.html#portfolio` bisa dibagikan langsung

## Struktur

```
nusa-vcard/
├─ index.html
├─ css/style.css
├─ js/
│  ├─ data.js     ← konten (edit di sini)
│  ├─ i18n.js     ← teks antarmuka
│  └─ app.js      ← logika
├─ assets/
│  ├─ favicon.png, apple-touch-icon.png
│  └─ img/        ← avatar.png, project-*.jpg, blog-*.jpg
├─ start.bat / start.sh
└─ LICENSE
```

## Ukuran gambar yang disarankan

| Gambar          | Ukuran           | Format     |
| --------------- | ---------------- | ---------- |
| Foto profil     | 800 × 800 px     | PNG / JPG  |
| Cover proyek    | 1600 × 1000 px   | JPG        |
| Cover blog      | 1600 × 900 px    | JPG        |
| Favicon         | 256 × 256 px     | PNG        |

Gambar contoh sudah dibuat dua kali lipat dari ukuran tampil agar tetap tajam di layar retina.
Gambar akan dipotong otomatis (`object-fit: cover`), jadi rasio yang berbeda tetap aman.

## Catatan
Nama, kontak, proyek, dan artikel adalah **contoh fiktif**. Ganti sebelum dipublikasikan.
Untuk hosting gratis, unggah seluruh folder ke GitHub Pages, Netlify, atau Cloudflare Pages.
