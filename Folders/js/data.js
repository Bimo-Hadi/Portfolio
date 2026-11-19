/* ==========================================================================
   data.js  —  SEMUA KONTEN WEBSITE ADA DI SINI
   Edit file ini untuk mengganti nama, foto, proyek, artikel, dll.
   Teks dua bahasa ditulis sebagai { id: "...", en: "..." }.
   ========================================================================== */

window.SITE = {
  profile: {
    name: "Bimo Hadi Permana",
    avatar: "Folders/assets/img/avatar.png",
    roles: {
      id: ["Bioinformatika", "AI/ML Engineer", "Genomik"],
      en: ["Bioinformatics", "AI/ML Engineer", "Genomic"]
    },
    status: {
      id: "Terbuka untuk proyek freelance dan lab molekular-sel",
      en: "Open for freelance projects and cell-molecular lab"
    },
    email: "bihape123@gmail.com",
    phone: "+62 895-3834-72512",
    whatsapp: "62895383472512",           // nomor WhatsApp tanpa tanda + atau spasi
    birthday: "Prefer not to say",              // format YYYY-MM-DD
    location: { id: "Kota Bekasi, Indonesia", en: "Bekasi City, Indonesia" },
    social: [
      { icon: "github",    label: "GitHub",    url: "https://github.com/bimo-hadii" },
      { icon: "linkedin",  label: "LinkedIn",  url: "https://www.linkedin.com/bimo-hadi-permana" },
      { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/bimo.hadii" },
      { icon: "globe",     label: "Website",   url: "https://share.google/KoyrnBjFjfMcEQUvH" }
    ]
  },

  seo: {
    title:       { id: "Bimo Hadi Permana — Bioinformatika dan AI/ML engineer",
                   en: "Bimo Hadi Permana — Bioinformatics and AI/ML engineer" },
    description: { id: "Portofolio Bimo Hadi Permana: proyek web, aplikasi mobile, AI/ML, dan tulisan seputar pengembangan perangkat lunak.",
                   en: "Portfolio of Bimo Hadi Permana: web projects, mobile apps, AI/ML, and writing about software development." }
  },

  about: {
    paragraphs: [
      { id: "Saya Bimo, pengembang full-stack yang suka membuat produk digital yang cepat, mudah dipakai, dan enak dilihat. Lima tahun terakhir saya membangun aplikasi web dan mobile untuk UMKM, startup, dan lembaga pendidikan di Indonesia.",
        en: "I'm Bimo, a full-stack developer who builds digital products that are fast, easy to use, and pleasant to look at. For the past five years I've been shipping web and mobile apps for small businesses, startups, and schools in Indonesia." },
      { id: "Saya mengerjakan semuanya, mulai dari riset pengguna dan prototipe di Figma sampai kode front-end, API, dan deployment. Saya percaya antarmuka yang baik dimulai dari pemahaman yang jelas tentang orang yang memakainya.",
        en: "I handle the whole path: user research and Figma prototypes, front-end code, APIs, and deployment. I believe a good interface starts with a clear understanding of the people who use it." },
      { id: "Di luar pekerjaan, saya menulis artikel teknis, mengisi workshop komunitas, dan mencoba seduh kopi dari daerah yang berbeda setiap minggu.",
        en: "Outside of work I write technical articles, run community workshops, and try a coffee from a different region every week." }
    ],
    stats: [
      { value: 5,    suffix: "+", label: { id: "Tahun pengalaman",   en: "Years of experience" } },
      { value: 38,   suffix: "",  label: { id: "Proyek selesai",     en: "Projects delivered" } },
      { value: 21,   suffix: "",  label: { id: "Klien puas",         en: "Happy clients" } },
      { value: 1200, suffix: "",  label: { id: "Cangkir kopi",       en: "Cups of coffee" } }
    ]
  },

  services: [
    { icon: "code",       title: { id: "Pengembangan Web",    en: "Web Development" },
      text: { id: "Situs dan aplikasi web yang cepat, responsif, dan mudah dirawat.",
              en: "Fast, responsive, maintainable websites and web apps." } },
    { icon: "smartphone", title: { id: "Aplikasi Mobile",     en: "Mobile Apps" },
      text: { id: "Aplikasi Android dan iOS dengan React Native dan PWA.",
              en: "Android and iOS apps built with React Native and PWA." } },
    { icon: "layers",     title: { id: "Desain UI/UX",        en: "UI/UX Design" },
      text: { id: "Riset, wireframe, dan prototipe yang sudah diuji ke pengguna.",
              en: "Research, wireframes, and prototypes tested with real users." } },
    { icon: "server",     title: { id: "API & Backend",       en: "API & Backend" },
      text: { id: "REST API, basis data, dan deployment yang aman dan terdokumentasi.",
              en: "Secure, documented REST APIs, databases, and deployment." } }
  ],

  testimonials: [
    { name: "Dimas Anggara", role: { id: "Pemilik Warung Pintar", en: "Owner, Warung Pintar" }, initials: "DA",
      text: { id: "Bimo mengubah kebutuhan kami yang berantakan menjadi aplikasi kasir yang rapi. Pegawai baru pun bisa memakainya dalam satu hari. Komunikasinya jelas dan hasilnya selalu tepat waktu.",
              en: "Bimo turned our messy requirements into a tidy point-of-sale app. New staff can use it within a day. Communication was clear and delivery was always on time." } },
    { name: "Rina Maharani", role: { id: "Product Manager, Rute Kita", en: "Product Manager, Rute Kita" }, initials: "RM",
      text: { id: "Jarang menemukan developer yang peduli pada detail desain sekaligus performa. Waktu muat aplikasi kami turun lebih dari separuh setelah Bimo turun tangan.",
              en: "It's rare to find a developer who cares about design detail and performance alike. Our app's load time dropped by more than half after Bimo stepped in." } },
    { name: "Bima Prasetyo", role: { id: "Dosen, Institut Teknologi", en: "Lecturer, Institute of Technology" }, initials: "BP",
      text: { id: "Workshop yang dibawakan Bimo mudah diikuti dan penuh contoh nyata. Mahasiswa saya langsung bisa mempraktikkannya di proyek akhir mereka.",
              en: "Bimo's workshop was easy to follow and full of real examples. My students could apply it to their final projects right away." } }
  ],

  stack: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Node.js", "Laravel", "R Programming"
          "PostgreSQL", "MongoDB", "Docker", "Git", "Figma", "Tailwind CSS", "React Native", "Linux"],

  education: [
    { period: "2017 – 2021",
      title: { id: "S1 Biologi", en: "B.Sc. in Biology" },
      org: "University of Indonesia",
      text: { id: "IPK 3.60/4.00. Skripsi tentang Efektivitas CAR-NK pada Heparcarcinoma di tikus.",
              en: "GPA 3.60/4.00. Thesis on effectivity CAR-NK in HCC mice." } },
    { period: "2023",
      title: { id: "Sertifikasi UX Design", en: "UX Design Certification" },
      org: "Program daring",
      text: { id: "Riset pengguna, wireframing, dan pengujian kegunaan dari awal sampai akhir.",
              en: "User research, wireframing, and usability testing end to end." } },
    { period: "2014 – 2017",
      title: { id: "SMA Negeri 103 Jakarta, Jurusan IPA", en: "Public High School 103 Jakarta, Science Track" },
      org: "Jakarta"}
  ],

  experience: [
    { period: { id: "2023 – Sekarang", en: "2023 – Present" },
      title: { id: "Senior Full-stack Developer", en: "Senior Full-stack Developer" },
      org: "Studio Nusa Digital",
      text: { id: "Memimpin tim kecil berisi empat orang, menetapkan standar kode, dan mengirim produk untuk klien e-commerce serta pendidikan.",
              en: "Leading a team of four, setting code standards, and shipping products for e-commerce and education clients." } },
    { period: "2021 – 2023",
      title: { id: "Front-end Developer", en: "Front-end Developer" },
      org: "PT Teknologi Cahaya",
      text: { id: "Membangun sistem desain dan dasbor internal. Menurunkan waktu muat halaman utama sebesar 54%.",
              en: "Built a design system and internal dashboards. Cut main page load time by 54%." } },
    { period: "2019 – 2021",
      title: { id: "Web Developer Freelance", en: "Freelance Web Developer" },
      org: { id: "Mandiri", en: "Self-employed" },
      text: { id: "Mengerjakan lebih dari 15 situs untuk UMKM lokal sambil kuliah.",
              en: "Delivered over 15 websites for local small businesses while studying." } }
  ],

  skills: [
    { name: "HTML & CSS",                level: 95 },
    { name: "JavaScript / TypeScript",   level: 90 },
    { name: "React & Next.js",           level: 88 },
    { name: "TensorFlow",                level: 85 },
    { name: "UI/UX (Figma)",             level: 80 },
    { name: "PostgreSQL & MongoDB",      level: 78 },
    { name: "Docker & CI/CD",            level: 65 }
  ],

  /* category: web | mobile | design | api */
  projects: [
    { id: "warung-pintar", category: "web", year: 2025, cover: "Folders/assets/img/project-1.jpg",
      title: { id: "Warung Pintar", en: "Warung Pintar" },
      summary: { id: "Aplikasi kasir dan stok barang untuk warung dan toko kelontong.",
                 en: "Point-of-sale and inventory app for small grocery shops." },
      description: { id: "Warung Pintar membantu pemilik toko mencatat penjualan, memantau stok, dan melihat laporan harian dari satu layar. Aplikasi tetap berjalan saat internet putus dan menyinkronkan data begitu tersambung lagi. Saat ini dipakai oleh lebih dari 120 toko.",
                      en: "Warung Pintar lets shop owners record sales, track stock, and read daily reports from a single screen. It keeps working offline and syncs once the connection returns. More than 120 shops use it today." },
      tech: ["React", "Node.js", "PostgreSQL", "PWA"],
      links: { demo: "https://example.com/", repo: "https://github.com/" } },

    { id: "rute-kita", category: "mobile", year: 2025, cover: "Folders/assets/img/project-2.jpg",
      title: { id: "Rute Kita", en: "Rute Kita" },
      summary: { id: "Perencana perjalanan komuter dengan estimasi waktu tempuh nyata.",
                 en: "Commuter route planner with realistic travel-time estimates." },
      description: { id: "Rute Kita menggabungkan jadwal kereta, bus, dan angkutan daring untuk menyusun perjalanan harian. Notifikasi memberi tahu pengguna kalau ada gangguan di rute langganan mereka.",
                      en: "Rute Kita combines train, bus, and ride-hailing schedules into daily commutes. Notifications warn users about disruptions on their regular routes." },
      tech: ["React Native", "TypeScript", "Firebase"],
      links: { demo: "https://example.com/", repo: "" } },

    { id: "kopi-senja", category: "design", year: 2024, cover: "Folders/assets/img/project-3.jpg",
      title: { id: "Kopi Senja", en: "Kopi Senja" },
      summary: { id: "Identitas merek dan toko daring untuk roastery lokal.",
                 en: "Brand identity and online shop for a local coffee roastery." },
      description: { id: "Proyek ini mencakup logo, palet warna, tipografi, kemasan, dan halaman toko daring. Penjualan daring naik 2,3 kali lipat dalam tiga bulan setelah peluncuran.",
                      en: "The project covers logo, colour palette, typography, packaging, and an online shop. Online sales grew 2.3x within three months of launch." },
      tech: ["Figma", "Branding", "Shopify"],
      links: { demo: "https://example.com/", repo: "" } },

    { id: "sigap-api", category: "api", year: 2024, cover: "Folders/assets/img/project-4.jpg",
      title: { id: "Sigap API", en: "Sigap API" },
      summary: { id: "API peringatan dini banjir dan cuaca ekstrem untuk aplikasi pihak ketiga.",
                 en: "Early-warning API for floods and extreme weather, built for third-party apps." },
      description: { id: "Sigap API mengolah data sensor dan prakiraan cuaca menjadi peringatan yang bisa dipakai aplikasi lain lewat REST dan webhook. Dokumentasinya lengkap dengan contoh kode dan sandbox gratis.",
                      en: "Sigap API turns sensor and forecast data into alerts other apps can consume via REST and webhooks. It ships with full docs, code samples, and a free sandbox." },
      tech: ["Node.js", "PostgreSQL", "Docker", "OpenAPI"],
      links: { demo: "https://example.com/", repo: "https://github.com/" } },

    { id: "belajar-yuk", category: "web", year: 2023, cover: "Folders/assets/img/project-5.jpg",
      title: { id: "Belajar Yuk", en: "Belajar Yuk" },
      summary: { id: "Dasbor belajar daring dengan kuis, progres, dan forum diskusi.",
                 en: "Online learning dashboard with quizzes, progress tracking, and discussion forums." },
      description: { id: "Platform belajar untuk SMA dengan kuis adaptif, pelacak progres, dan forum tanya jawab. Dirancang agar ringan di ponsel dengan kuota terbatas.",
                      en: "A learning platform for high schools with adaptive quizzes, progress tracking, and a Q&A forum. Designed to stay light on phones with limited data." },
      tech: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
      links: { demo: "https://example.com/", repo: "https://github.com/" } },

    { id: "jajan-lokal", category: "mobile", year: 2023, cover: "Folders/assets/img/project-6.jpg",
      title: { id: "Jajan Lokal", en: "Jajan Lokal" },
      summary: { id: "Aplikasi pesan makanan dari pedagang kaki lima sekitar.",
                 en: "Food ordering app for nearby street vendors." },
      description: { id: "Jajan Lokal mempertemukan pedagang kaki lima dengan pembeli di sekitarnya. Pedagang bisa membuka toko dalam lima menit tanpa perangkat tambahan.",
                      en: "Jajan Lokal connects street vendors with buyers nearby. Vendors can open a shop in five minutes with no extra hardware." },
      tech: ["Flutter", "Firebase", "Maps API"],
      links: { demo: "https://example.com/", repo: "" } }
  ],

  /* category: frontend | backend | career */
  posts: [
    { id: "css-modern", category: "frontend", date: "2026-09-20", minutes: 4, cover: "Folders/assets/img/blog-1.jpg",
      title: { id: "Kenapa Saya Kembali ke CSS Modern", en: "Why I Went Back to Modern CSS" },
      excerpt: { id: "Grid, container query, dan color-mix membuat banyak library UI tidak lagi diperlukan.",
                 en: "Grid, container queries, and color-mix make many UI libraries unnecessary." },
      content: {
        id: ["Beberapa tahun lalu, setiap proyek baru saya dimulai dengan memasang framework CSS. Sekarang, saya mulai dari file CSS kosong. CSS Grid menyelesaikan tata letak yang dulu butuh banyak kelas bantu, dan container query membuat komponen menyesuaikan diri dengan wadahnya, bukan dengan layar.",
             "Fitur seperti color-mix() dan variabel CSS membuat tema terang dan gelap bisa dibuat dengan belasan baris saja. Tidak perlu lagi pra-prosesor untuk hal-hal dasar, dan ukuran berkas turun cukup jauh.",
             "Bukan berarti framework tidak berguna. Untuk tim besar, konvensi bersama tetap berharga. Tapi untuk proyek kecil sampai menengah, CSS modern sering sudah cukup, dan hasilnya lebih ringan serta lebih mudah dipahami orang baru."],
        en: ["A few years ago every new project started with installing a CSS framework. Now I start with an empty CSS file. Grid handles layouts that once needed piles of helper classes, and container queries let components adapt to their container instead of the screen.",
             "Features like color-mix() and custom properties make light and dark themes possible in a dozen lines. Basic tasks no longer need a preprocessor, and file sizes drop noticeably.",
             "That doesn't make frameworks useless. For large teams, shared conventions still matter. But for small to mid-size projects, modern CSS is often enough, and the result is lighter and easier for newcomers to read."] } },

    { id: "aksesibilitas", category: "frontend", date: "2026-08-02", minutes: 5, cover: "Folders/assets/img/blog-2.jpg",
      title: { id: "Aksesibilitas untuk Pemula: Lima Langkah Pertama", en: "Accessibility for Beginners: Five First Steps" },
      excerpt: { id: "Mulai dari HTML semantik, kontras warna, dan fokus keyboard. Tidak perlu alat mahal.",
                 en: "Start with semantic HTML, colour contrast, and keyboard focus. No expensive tools needed." },
      content: {
        id: ["Aksesibilitas sering terdengar rumit, padahal langkah pertamanya sederhana. Pakai elemen HTML yang sesuai: tombol untuk aksi, tautan untuk berpindah halaman, dan judul yang berurutan. Pembaca layar sangat bergantung pada struktur ini.",
             "Langkah berikutnya adalah kontras. Teks abu-abu muda di atas latar putih mungkin terlihat elegan, tetapi sulit dibaca di bawah matahari. Periksa rasio kontras minimal 4,5 banding 1 untuk teks biasa.",
             "Terakhir, coba pakai situs Anda hanya dengan keyboard. Pastikan setiap elemen interaktif bisa dijangkau dengan Tab, punya indikator fokus yang jelas, dan tidak ada jebakan fokus. Sepuluh menit pengujian seperti ini sering menemukan masalah terbesar."],
        en: ["Accessibility sounds complicated, but the first steps are simple. Use the right HTML element: buttons for actions, links for navigation, and headings in order. Screen readers rely heavily on this structure.",
             "Next is contrast. Light grey text on white may look elegant, but it's hard to read in sunlight. Check for a contrast ratio of at least 4.5 to 1 for body text.",
             "Finally, try using your site with only a keyboard. Every interactive element should be reachable with Tab, show a clear focus indicator, and never trap focus. Ten minutes of this kind of testing often uncovers the biggest problems."] } },

    { id: "kesalahan-junior", category: "career", date: "2026-06-11", minutes: 6, cover: "Folders/assets/img/blog-3.jpg",
      title: { id: "Lima Kesalahan Saya sebagai Developer Junior", en: "Five Mistakes I Made as a Junior Developer" },
      excerpt: { id: "Dari terlalu lama bertahan pada satu bug sampai takut bertanya. Semoga kamu bisa melewatinya lebih cepat.",
                 en: "From sticking with one bug too long to being afraid to ask. Hopefully you can get past them faster." },
      content: {
        id: ["Kesalahan pertama saya adalah menyimpan masalah sendirian terlalu lama. Dulu saya bisa menghabiskan sehari penuh pada satu bug karena malu bertanya. Sekarang saya pakai aturan sederhana: kalau buntu lebih dari 45 menit, saya minta bantuan.",
             "Kesalahan lain adalah menulis kode tanpa memikirkan orang yang akan membacanya enam bulan kemudian, yaitu diri saya sendiri. Nama variabel yang jelas dan komentar singkat tentang alasan, bukan cara, menghemat banyak waktu.",
             "Saya juga terlalu sering mengejar teknologi terbaru. Pada akhirnya, dasar yang kuat tentang HTTP, basis data, dan struktur data lebih bermanfaat daripada hafal sepuluh framework."],
        en: ["My first mistake was keeping problems to myself for too long. I once spent a whole day on a single bug because I was too shy to ask. Now I use a simple rule: if I'm stuck for more than 45 minutes, I ask for help.",
             "Another mistake was writing code without thinking about the person who'd read it six months later, which was me. Clear variable names and short comments about why, not how, save a lot of time.",
             "I also chased the newest technology too often. In the end, a solid grasp of HTTP, databases, and data structures is worth more than memorising ten frameworks."] } },

    { id: "api-ramah", category: "backend", date: "2026-04-25", minutes: 5, cover: "Folders/assets/img/blog-4.jpg",
      title: { id: "Merancang API yang Ramah Developer", en: "Designing a Developer-friendly API" },
      excerpt: { id: "Penamaan konsisten, pesan galat yang jelas, dan dokumentasi yang bisa dicoba langsung.",
                 en: "Consistent naming, clear error messages, and documentation you can try right away." },
      content: {
        id: ["API yang baik terasa dapat ditebak. Kalau satu endpoint memakai created_at, jangan ada endpoint lain yang memakai createdAt. Pilih satu konvensi untuk penamaan, penomoran halaman, dan format tanggal, lalu patuhi di mana-mana.",
             "Pesan galat adalah bagian dari antarmuka. Kode status yang tepat, pesan yang menjelaskan apa yang salah, dan petunjuk cara memperbaikinya membuat developer lain tidak perlu menebak-nebak.",
             "Terakhir, dokumentasi yang bisa dicoba langsung. Spesifikasi OpenAPI dengan sandbox publik membuat orang bisa mencoba dalam hitungan menit, dan itu sering menjadi alasan sebuah API dipilih dibanding yang lain."],
        en: ["A good API feels predictable. If one endpoint uses created_at, no other endpoint should use createdAt. Pick one convention for naming, pagination, and date formats, and follow it everywhere.",
             "Error messages are part of the interface. The right status code, a message that explains what went wrong, and a hint on how to fix it save other developers from guessing.",
             "Finally, documentation you can try immediately. An OpenAPI spec with a public sandbox lets people experiment in minutes, and that is often why one API gets chosen over another."] } }
  ],

  contact: {
    /* Opsional: isi dengan URL endpoint (mis. Formspree) agar formulir mengirim langsung
       tanpa membuka aplikasi email. Kosongkan untuk memakai mailto. */
    endpoint: "",
    replyTime: { id: "Biasanya membalas dalam 1×24 jam pada hari kerja.",
                 en: "Usually replies within one working day." }
  }
};
