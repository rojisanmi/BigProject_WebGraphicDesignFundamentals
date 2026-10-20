import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Bookmark, Share2, Clock, Eye, Zap, TrendingUp, Globe, Flame, Trophy, Utensils, FlaskConical, Heart, HeartPulse, DollarSign, Plane, Car, Sparkles } from 'lucide-react';
import { cn } from '@/utils';
import { Header, Footer } from '@/components/layout';
import { NewsCard, NewsGrid, NewsCarousel } from '@/components/news';
import { ArticleHero, ArticleMeta, RelatedArticles } from '@/components/news/ArticleBody';
import { Button, Badge, Card, CardContent, Skeleton } from '@/components/ui';
import { OptimizedImage } from '@/components/ui/Image';
import { getCategoryColor, formatRelativeTime, calculateReadTime, formatDate } from '@/utils';
import { categories, getActiveCategories } from '@/data/categories';
import type { NewsArticle, Category } from '@/types';

// Realistic Indonesian news data with current dates
const mockArticles: NewsArticle[] = [
  {
    id: '1',
    slug: 'jokowi-resmikan-irt-jawabarat-komprehensif-2025',
    title: 'Jokowi Resmikan IRT Jawa Barat Komprehensif, Targetkan 100 Ribu Unit Per Tahun',
    excerpt: 'Presiden Joko Widodo meresmikan program Ibu Rumah Tangga (IRT) Jawa Barat Komprehensif yang bertujuan memberdayakan ekonomi keluarga melalui koperasi dan UMKM.',
    content: `<p><strong>Bandung</strong> - Presiden Joko Widodo meresmikan program Ibu Rumah Tangga (IRT) Jawa Barat Komprehensif di Gedung Sate, Bandung, Rabu (15/1/2025). Program ini bertargetkan menciptakan 100 ribu unit usaha IRT per tahun.</p><p>"Kita ingin ibu-ibu rumah tangga tidak hanya mengurus rumah tangga, tapi juga bisa mandiri secara ekonomi," ucap Jokowi dalam sambutannya.</p><p>Gubernur Jawa Barat Dedi Mulyadi menambahkan, program ini akan disupport oleh dana revolving sebesar Rp 1 triliun dari APBD dan kerja sama dengan BRI serta Bank Jabar.</p><p>Sebanyak 5.000 ibu IRT sudah terdaftar dalam tahap pertama dan akan mendapat pelatihan kewirausahaan serta akses pasar melalui platform digital.</p>`,
    featuredImage: { url: '/images/headline (1).jpg', alt: 'Jokowi meresmikan program IRT Jawa Barat', width: 1200, height: 675, credit: 'BPMI Setpres' },
    category: categories[0], // hot
    tags: ['jokowi', 'irt', 'jawa barat', 'umkm', 'pemberdayaan perempuan'],
    author: { id: '1', name: 'Tim Nasional', avatar: '/images/avatar-1.jpg', bio: 'Tim liputan nasional Briking Nyus' },
    source: { id: '1', name: 'Briking Nyus', url: 'https://brikingnyus.com', logo: '/images/logo.gif' },
    publishedAt: '2025-01-15T10:30:00+07:00',
    updatedAt: '2025-01-15T10:30:00+07:00',
    readTime: 3,
    viewCount: 45230,
    isBreaking: true,
    isFeatured: true,
    seo: { metaTitle: 'Jokowi Resmikan IRT Jawa Barat Komprehensif', metaDescription: 'Presiden Jokowi meresmikan program IRT Jawa Barat bertarget 100 ribu unit per tahun dengan dana Rp 1 triliun.' },
  },
  {
    id: '2',
    slug: 'bank-indonesia-naikkan-bi-rate-6-persen-januari-2025',
    title: 'Bank Indonesia Naikkan BI Rate Jadi 6,00%, Keputusan Shock Pasar Modal',
    excerpt: 'Dewan Gubernur BI secara tak terduga menaikkan suku acuan 25 bps untuk mengantisipasi tekanan inflasi impor dan kekuatan dolar AS.',
    content: `<p><strong>Jakarta</strong> - Bank Indonesia (BI) menggelar rapat kebijakan moneter darurat dan memutuskan menaikkan BI 7-Day Reverse Repo Rate sebesar 25 basis points (bps) menjadi 6,00% efektif hari ini.</p><p>Gubernur BI Perry Warjiyo menyatakan keputusan ini bersifat preemptif, forward looking, untuk memastikan inflasi terkendali di target 3±1% tahun 2025.</p><p>"Tekanan inflasi impor meningkat seiring pelemahan rupiah dan kenaikan harga komoditas global," kata Perry.</p><p>Pasar modal bereaksi negatif, IHSG turun 1,2% ke level 7.150, dan rupiah melemah ke Rp 15.850 per dolar AS.</p>`,
    featuredImage: { url: '/images/headline (2).jpg', alt: 'Gubernur BI Perry Warjiyo', width: 1200, height: 675, credit: 'Bank Indonesia' },
    category: categories[0], // hot
    tags: ['bank indonesia', 'bi rate', 'suku bunga', 'inflasi', 'rupiah', 'ekonomi'],
    author: { id: '2', name: 'Ahmad Fauzi', avatar: '/images/avatar-2.jpg', bio: 'Editor Ekonomi & Bisnis' },
    source: { id: '1', name: 'Briking Nyus', url: 'https://brikingnyus.com' },
    publishedAt: '2025-01-15T09:15:00+07:00',
    updatedAt: '2025-01-15T09:15:00+07:00',
    readTime: 4,
    viewCount: 38910,
    isBreaking: true,
    isFeatured: true,
    seo: { metaTitle: 'BI Naikkan BI Rate ke 6,00%', metaDescription: 'Bank Indonesia menaikkan suku acuan 25 bps ke 6,00% untuk mengantisipasi inflasi impor.' },
  },
  {
    id: '3',
    slug: 'banjir-bandung-raya-rendam-ribuan-rumah-warga-die-vakuasi',
    title: 'Banjir Bandung Raya Rendam Ribuan Rumah, 2.300 Warga Dievakuasi ke Titik Aman',
    excerpt: 'Curah hujan ekstrem 150 mm/hari melanda Bandung Raya sejak semalam, menyebabkan 5 kecamatan tereendam banjir setinggi 1,5 meter.',
    content: `<p><strong>Bandung</strong> - Banjir bandang melanda Bandung Raya sejak Selasa malam (14/1) hingga Rabu pagi (15/1) setelah curah hujan mencapai 150 mm/hari.</p><p>Berdasarkan data BPBD Kota Bandung, 5 kecamatan terdampak parah: Bojongloa Kaler, Cicendo, Coblong, Sukajadi, dan Astanaanyar. Total 3.450 rumah tereendam dan 2.300 jiwa dievakuasi ke 12 titik pengungsian.</p><p>Walikota Bandung Muhammad Farhan sudah mengatur status darurat bencana alam selama 14 hari. TNI, Polri, Basarnas, dan relawan turut membantu evakuasi serta distribusi logistik.</p><p>BMKG memperkirakan hujan lebat berpotensial terus berlanjut hingga Jumat (17/1). Warga diminta waspada banjir bandang dan tanah longsor.</p>`,
    featuredImage: { url: '/images/terkini (1).jpg', alt: 'Banjir di Bandung Raya', width: 800, height: 450, credit: 'BPBD Bandung' },
    category: categories[0], // hot
    tags: ['banjir', 'bandung', 'bencana alam', 'evakuasi', 'bmkg', 'hujan lebat'],
    author: { id: '3', name: 'Siti Rahayu', avatar: '/images/avatar-3.jpg', bio: 'Jurnalis Liputan Daerah' },
    source: { id: '1', name: 'Briking Nyus', url: 'https://brikingnyus.com' },
    publishedAt: '2025-01-15T08:45:00+07:00',
    updatedAt: '2025-01-15T08:45:00+07:00',
    readTime: 3,
    viewCount: 52180,
    isBreaking: true,
    isFeatured: false,
    seo: { metaTitle: 'Banjir Bandung Raya Rendam Ribuan Rumah', metaDescription: 'Banjir bandang melanda 5 kecamatan di Bandung, 2.300 warga dievakuasi ke titik pengungsian aman.' },
  },
  {
    id: '4',
    slug: 'indonesia-juara-piala-aff-mitsubishi-electric-cup-2024',
    title: 'Indonesia Juara Piala AFF Mitsubishi Electric Cup 2024, Lukakan Thailand 3-2 di Final Leg 2',
    excerpt: 'Timnas Indonesia meraih gelar juara AFF ke-2 dalam sejarah setelah mengalahkan Thailand 3-2 di leg 2 final di Stadion Rajamangala, Bangkok.',
    content: `<p><strong>Bangkok</strong> - Timnas Indonesia membuat sejarah dengan meraih gelar juara Piala AFF Mitsubishi Electric Cup 2024 setelah mengalahkan Thailand 3-2 di leg 2 final di Stadion Rajamangala, Bangkok, Minggu (12/1/2025).</p><p>Gol-gol Indonesia dicetak oleh Rafael Struick (menit 45+2), Thom Haye (menit 67), dan Ramadhan Sananta (menit 89). Sementara Thailand balas melalui Supachok Sarachat (menit 58) dan Peeradol Chamrasamee (menit 72).</p><p>Agres agregat 4-3 menguntungkan Indonesia setelah leg 1 di Jakarta berakhir imbang 2-2. Ini gelar ke-2 untuk Indonesia setelah juara 2018.</p><p>Pelatih Shin Tae-yong berterima kasih kepada seluruh warga Indonesia. "Ini bukan kemenangan saya, ini kemenangan kita semua," ucapnya sambil mengibarkan bendera merah putih.</p>`,
    featuredImage: { url: '/images/sport (1).jpg', alt: 'Timnas Indonesia juara AFF Cup', width: 1200, height: 675, credit: 'PSSI' },
    category: categories[1], // sport
    tags: ['timnas indonesia', 'aff cup', 'shin tae-yong', 'thailand', 'juara', 'sepak bola'],
    author: { id: '4', name: 'Budi Santoso', avatar: '/images/avatar-4.jpg', bio: 'Editor Olahraga' },
    source: { id: '1', name: 'Briking Nyus', url: 'https://brikingnyus.com' },
    publishedAt: '2025-01-13T00:30:00+07:00',
    updatedAt: '2025-01-13T00:30:00+07:00',
    readTime: 5,
    viewCount: 125430,
    isBreaking: false,
    isFeatured: true,
    seo: { metaTitle: 'Indonesia Juara AFF Cup 2024', metaDescription: 'Timnas Indonesia mengalahkan Thailand 3-2 di final leg 2, meraih gelar juara AFF ke-2 sejarah.' },
  },
  {
    id: '5',
    slug: 'golkar-pdkb-bahas-koalisi-pemilu-2029-mulai-sekarang',
    title: 'Golkar & PDIP Bahas Koalisi Pemilu 2029 Mulai Sekarang, "Bukan Soal Jabatan tapi Indonesia"',
    excerpt: 'Ketua Umum Golkar Bahlil Lahadalia dan Ketua Umum PDIP Megawati Soekarnoputri sepakat memulai dialog koalisi dini untuk menjaga stabilitas politik.',
    content: `<p><strong>Jakarta</strong> - Partai Golkar dan PDIP resmi memulai dialog koalisi untuk Pemilu 2029 dalam pertemuan tertutup di Jakarta, Selasa (14/1).</p><p>Bahlil Lahadalia menegaskan, "Ini bukan soal jabatan, tapi soal Indonesia. Kita ingin stabilitas politik terjaga jauh-jauh hari."</p><p>Megawati menambahkan, dialog dini ini penting agar tidak terjadi polarisasi seperti pemilu sebelumnya. Kedua partai besar ini mengontrol 35% kursi DPR.</p><p>Analis politik UGM, Prof. Ahmad Khoirudin, menilai langkah ini positif untuk matangnya demokrasi namun peringatkan soal dominasi partai besar.</p>`,
    featuredImage: { url: '/images/headline (3).jpg', alt: 'Bahlil Lahadalia dan Megawati', width: 800, height: 450, credit: 'Istimewa' },
    category: categories[0], // hot
    tags: ['golkar', 'pdip', 'koalisi', 'pemilu 2029', 'bahlil', 'megawati', 'politik'],
    author: { id: '5', name: 'Dewi Sartika', avatar: '/images/avatar-5.jpg', bio: 'Editor Politik' },
    source: { id: '1', name: 'Briking Nyus', url: 'https://brikingnyus.com' },
    publishedAt: '2025-01-14T16:20:00+07:00',
    updatedAt: '2025-01-14T16:20:00+07:00',
    readTime: 4,
    viewCount: 28750,
    isBreaking: false,
    isFeatured: true,
    seo: { metaTitle: 'Golkar PDIP Bahas Koalisi 2029', metaDescription: 'Kedua partai besar memulai dialog koalisi dini untuk Pemilu 2029 demi stabilitas politik.' },
  },
  {
    id: '6',
    slug: 'ai-indonesia-luncurkan-bahasa-nusantara-llm-open-source',
    title: 'AI Indonesia Luncurkan "Bahasa Nusantara" LLM Open Source, Mendukung 700+ Bahasa Daerah',
    excerpt: 'Kolaborasi BRIN, UI, ITB, dan startup lokal menghasilkan model bahasa besar pertama Indonesia yang gratis dan open source untuk pelestarian bahasa daerah.',
    content: `<p><strong>Jakarta</strong> - Konsorsium Riset AI Indonesia meluncurkan "Bahasa Nusantara", model bahasa besar (LLM) open source pertama buatan anak bangsa yang mendukung 700+ bahasa daerah.</p><p>Proyek ini dikembangkan sejak 2022 oleh BRIN, Universitas Indonesia, Institut Teknologi Bandung, dan startup AI lokal dengan dana matching fund Kementerian Komunikasi dan Informatika.</p><p>Model ini memiliki 7 miliar parameter, dilatih pada korpus 500 GB teks berbahasa Indonesia dan bahasa daerah. Performa mendekati GPT-3.5 untuk tugas bahasa Indonesia.</p><p>"Kami ingin AI melayani kebutuhan lokal, bukan hanya meniru model barat," kata Ketua BRIN Laksana Tri Handoko.</p><p>Model tersedia gratis di Hugging Face dengan lisensi Apache 2.0 untuk pengembangan komersial maupun non-komersial.</p>`,
    featuredImage: { url: '/images/science (4).jpg', alt: 'Luncuran Bahasa Nusantara LLM', width: 1200, height: 675, credit: 'BRIN' },
    category: categories[4], // science
    tags: ['ai', 'llm', 'bahasa nusantara', 'open source', 'brin', 'bahasa daerah', 'teknologi'],
    author: { id: '6', name: 'Rudi Hartono', avatar: '/images/avatar-6.jpg', bio: 'Editor Teknologi & AI' },
    source: { id: '1', name: 'Briking Nyus', url: 'https://brikingnyus.com' },
    publishedAt: '2025-01-14T11:00:00+07:00',
    updatedAt: '2025-01-14T11:00:00+07:00',
    readTime: 6,
    viewCount: 34560,
    isBreaking: false,
    isFeatured: true,
    seo: { metaTitle: 'Indonesia Luncurkan LLM Bahasa Nusantara', metaDescription: 'Model AI open source pertama Indonesia mendukung 700+ bahasa daerah, dikembangkan BRIN dan universitas terkemuka.' },
  },
  {
    id: '7',
    slug: 'resep-nasi-gandul-khas-pati-rasa-gurih-legendaris',
    title: 'Resep Nasi Gandul Khas Pati, Gurih Legendaris Bikin Nagih Siapapun Mencicipi',
    excerpt: 'Nasi gandul khas Pati, Jawa Tengah, terkenal dengan kuah santan kental berempah dan topping ayam suwir yang bikin ketagihan.',
    content: `<p><strong>Pati</strong> - Nasi gandul adalah kuliner khas Pati, Jawa Tengah, yang sudah legendaris sejak puluhan tahun lalu. Berbeda dengan nasi uduk atau nasi liwet, nasi gandul memiliki ciri khas kuah santan kental berempah pekat.</p><p><strong>Bahan-bahan:</strong></p><ul><li>2 cup beras, cuci bersih</li><li>500 ml santan kental</li><li>300 ml air</li><li>2 lembar daun salam</li><li>2 lembar daun jeruk</li><li>1 batang sereh, memarkan</li><li>1 ruas lengkuas, memarkan</li><li>1 sdt garam</li><li>1/2 sdt kaldu bubuk</li></ul><p><strong>Bumbu halus:</strong> 6 siung bawang merah, 4 siung bawang putih, 3 butir kemiri, 1 sdt ketumbar, 1/2 sdt merica, 1 ruas kunyit, 1 ruas jahe.</p><p><strong>Topping:</strong> Ayam suwir, telur rebus, kerupuk rambak, bawang goreng, sambal terasi.</p><p><strong>Cara membuat:</strong> Tumis bumbu halus hingga harum, masukkan daun salam, daun jeruk, sereh, lengkuas. Tuang santan dan air, aduk rata. Masukkan beras, masak hingga air menyusut. Pindah ke kukusan, kukus 30 menit. Sajikan dengan topping lengkap.</p>`,
    featuredImage: { url: '/images/food (3).jpg', alt: 'Nasi Gandul Khas Pati', width: 800, height: 450, credit: 'Dok. Pribadi' },
    category: categories[2], // food
    tags: ['resep', 'nasi gandul', 'pati', 'jawa tengah', 'kuliner', 'santan', 'ayam suwir'],
    author: { id: '7', name: 'Maya Indah', avatar: '/images/avatar-7.jpg', bio: 'Penulis Rubrik Kuliner' },
    source: { id: '1', name: 'Briking Nyus', url: 'https://brikingnyus.com' },
    publishedAt: '2025-01-13T07:00:00+07:00',
    updatedAt: '2025-01-13T07:00:00+07:00',
    readTime: 4,
    viewCount: 18920,
    isBreaking: false,
    isFeatured: false,
    seo: { metaTitle: 'Resep Nasi Gandul Khas Pati', metaDescription: 'Resep lengkap nasi gandul khas Pati dengan kuah santan kental berempah dan ayam suwir.' },
  },
  {
    id: '8',
    slug: 'wisata-baru-labuan-bajo-tambah-akses-penerbangan-langsung-dari-singapura',
    title: 'Labuan Bajo Tambah Penerbangan Langsung dari Singapura, Target 2 Juta Wisatawan 2025',
    excerpt: 'Garuda Indonesia dan Scoot buka rute Singapura-Labuan Bajo 4x seminggu mulai Februari 2025. Pemerintah targetkan devisa pariwisata USD 500 juta.',
    content: `<p><strong>Labuan Bajo</strong> - Pemerintah melalui Kemenparekraf menambah frekuensi penerbangan internasional ke Labuan Bajo, NTT. Garuda Indonesia dan Scoot (anakusahaan Singapore Airlines) akan mengoperasikan rute Singapura-Labuan Bajo 4 kali seminggu mulai 1 Februari 2025.</p><p>Menteri Pariwisata dan Ekonomi Kreatif Sandiaga Uno menyatakan, rute ini strategis karena Singapura adalah pasar sumber wisatawan ke-3 terbesar untuk Indonesia.</p><p>"Target 2 juta kunjungan wisatawan asing ke Labuan Bajo tahun 2025, dengan kontribusi devisa USD 500 juta," ucap Sandiaga.</p><p>Bandara Komodo Labuan Bajo sudah diperluas kapasitasnya jadi 2 juta penumpang per tahun. Infrastruktur pendukung seperti hotel bintang 5, marina, dan jalur wisata kelautan juga sudah siap.</p>`,
    featuredImage: { url: '/images/global (1).jpg', alt: 'Pulau Komodo Labuan Bajo', width: 1200, height: 675, credit: 'Kemenparekraf' },
    category: categories[8], // travel
    tags: ['labuan bajo', 'singapura', 'penerbangan', 'garuda indonesia', 'wisata', 'komodo', 'ntt'],
    author: { id: '8', name: 'Dedi Kurniawan', avatar: '/images/avatar-8.jpg', bio: 'Editor Travel & Pariwisata' },
    source: { id: '1', name: 'Briking Nyus', url: 'https://brikingnyus.com' },
    publishedAt: '2025-01-14T14:30:00+07:00',
    updatedAt: '2025-01-14T14:30:00+07:00',
    readTime: 4,
    viewCount: 22340,
    isBreaking: false,
    isFeatured: false,
    seo: { metaTitle: 'Labuan Bajo Buka Rute Penerbangan Singapura', metaDescription: 'Garuda Indonesia dan Scoot buka rute Singapura-Labuan Bajo 4x seminggu, target 2 juta wisatawan 2025.' },
  },
  {
    id: '9',
    slug: 'hyundai-ioniq-5-produksi-lokal-mulai-februari-harga-mulai-rp-700-juta',
    title: 'Hyundai Ioniq 5 Produksi Lokal Mulai Februari, Harga Mulai Rp 700 Juta An',
    excerpt: 'Hyundai Motor Manufacturing Indonesia (HMMI) mulai memproduksi Ioniq 5 secara massal di Cikarang. Target penjualan 5.000 unit tahun 2025.',
    content: `<p><strong>Cikarang</strong> - PT Hyundai Motor Manufacturing Indonesia (HMMI) resmi memulai produksi massal Hyundai Ioniq 5 di pabrik Cikarang, Jawa Barat, mulai Februari 2025.</p><p>Direktur Utama HMMI Jun Hak Kim mengumumkan, Ioniq 5 versi produksi lokal (CKD) akan dijual mulai Rp 700 jutaan, lebih murah sekitar Rp 100 juta dari versi impor CBU.</p><p>"Kami targetkan 5.000 unit terjual tahun 2025. TKDN (Tingkat Komponen Dalam Negeri) capai 40% dan akan ditingkatkan bertahap," ucap Jun.</p><p>Ioniq 5 lokal memiliki baterai 58 kWh (Standard) dan 72.6 kWh (Long Range), jangkau hingga 481 km (WLTP). Pabrik Cikarang kapasitas 250.000 unit/tahun.</p><p>Pemerintah memberikan insentif PPnBM 0% dan PPn 1% untuk kendaraan listrik produksi dalam negeri.</p>`,
    featuredImage: { url: '/images/sport (1).png', alt: 'Hyundai Ioniq 5 Produksi Lokal', width: 800, height: 450, credit: 'HMMI' },
    category: categories[9], // oto
    tags: ['hyundai', 'ioniq 5', 'mobil listrik', 'produksi lokal', 'hmmi', 'cikarang', 'ev indonesia'],
    author: { id: '9', name: 'Anton Wijaya', avatar: '/images/avatar-9.jpg', bio: 'Editor Otomotif' },
    source: { id: '1', name: 'Briking Nyus', url: 'https://brikingnyus.com' },
    publishedAt: '2025-01-14T10:00:00+07:00',
    updatedAt: '2025-01-14T10:00:00+07:00',
    readTime: 3,
    viewCount: 31250,
    isBreaking: false,
    isFeatured: false,
    seo: { metaTitle: 'Hyundai Ioniq 5 Produksi Lokal Rp 700 Jutaan', metaDescription: 'HMMI mulai produksi massal Ioniq 5 di Cikarang Februari 2025, harga mulai Rp 700 jutaan.' },
  },
  {
    id: '10',
    slug: 'newjeans-debut-di-indonesia-konser-bunnies-camp-2025-jakarta',
    title: 'NewJeans Debut di Indonesia, Konser "Bunnies Camp 2025" Gelar 2 Hari di Jakarta',
    excerpt: 'Girl group K-Pop fenomenal NewJeans akan menggelar konser pertama di Indonesia pada 8-9 Maret 2025 di Indonesia Arena, BSD. Tiket mulai dijual 20 Januari.',
    content: `<p><strong>Jakarta</strong> - ADOR dan Hybe Labels resmi mengumumkan NewJeans akan menggelar konser "Bunnies Camp 2025" di Indonesia Arena, BSD City, pada 8-9 Maret 2025.</p><p>Ini akan menjadi konser pertama NewJeans di Asia Tenggara. Grup beranggotakan Minji, Hanni, Danielle, Haerin, dan Hyein ini debut 2022 dengan hit "Attention" dan "Hype Boy".</p><p>Promoter lokal Dyandra Entertainment memastikan kapasitas 16.000 penumpang per hari. Harga tiket bervariasi Rp 1,5 juta - Rp 5,5 juta.</p><p>Presale untuk member Bunnies (fandom resmi) dibuka 20 Januari 2025 pukul 12.00 WIB via platform resmi. General sale 22 Januari.</p>`,
    featuredImage: { url: '/images/hype (2).jpg', alt: 'NewJeans Konser Indonesia', width: 1200, height: 675, credit: 'ADOR/Hybe' },
    category: categories[10], // hype
    tags: ['newjeans', 'k-pop', 'konser', 'jakarta', 'bunnies camp', 'hybe', 'girl group'],
    author: { id: '10', name: 'Rina Marlina', avatar: '/images/avatar-10.jpg', bio: 'Editor Hiburan & K-Pop' },
    source: { id: '1', name: 'Briking Nyus', url: 'https://brikingnyus.com' },
    publishedAt: '2025-01-15T12:00:00+07:00',
    updatedAt: '2025-01-15T12:00:00+07:00',
    readTime: 3,
    viewCount: 67890,
    isBreaking: false,
    isFeatured: false,
    seo: { metaTitle: 'NewJeans Konser Pertama di Indonesia', metaDescription: 'NewJeans gelar Bunnies Camp 2025 di Jakarta 8-9 Maret, tiket dijual 20 Januari.' },
  },
];

const mockBreakingNews = mockArticles.filter(a => a.isBreaking).slice(0, 3);
const mockFeaturedNews = mockArticles.filter(a => a.isFeatured).slice(0, 5);
const mockLatestNews = mockArticles.slice(0, 8);

const categoryIcons: Record<string, React.ReactNode> = {
  hot: <Flame className="h-4 w-4" />,
  sport: <Trophy className="h-4 w-4" />,
  food: <Utensils className="h-4 w-4" />,
  global: <Globe className="h-4 w-4" />,
  science: <FlaskConical className="h-4 w-4" />,
  lifestyle: <Heart className="h-4 w-4" />,
  health: <HeartPulse className="h-4 w-4" />,
  finance: <DollarSign className="h-4 w-4" />,
  travel: <Plane className="h-4 w-4" />,
  oto: <Car className="h-4 w-4" />,
  hype: <Sparkles className="h-4 w-4" />,
};

function HeroSection() {
  const featured = mockFeaturedNews[0];
  const others = mockFeaturedNews.slice(1, 4);

  return (
    <section className="relative min-h-[650px] flex items-end overflow-hidden" aria-label="Featured news">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={featured.featuredImage.url}
          alt={featured.featuredImage.alt}
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      <div className="container-custom relative z-10 pb-12">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="category" color={getCategoryColor(featured.category.slug)} className="gap-1.5">
                {categoryIcons[featured.category.slug]}
                <span>{featured.category.name}</span>
              </Badge>
              {featured.isBreaking && (
                <Badge variant="category" color="#DC3545" className="gap-1.5 animate-pulse">
                  <Zap className="h-3.5 w-3.5" />
                  <span>Breaking</span>
                </Badge>
              )}
            </div>
            <Link to={`/article/${featured.slug}`} className="block group">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight group-hover:text-accent transition-colors mb-4 text-balance">
                {featured.title}
              </h1>
            </Link>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mb-6 line-clamp-3">
              {featured.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {formatRelativeTime(featured.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {calculateReadTime(featured.content)} min baca
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" aria-hidden="true" />
                {featured.viewCount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 grid gap-4">
            {others.map((article, index) => (
              <Link key={article.id} to={`/article/${article.slug}`} className="group relative aspect-video overflow-hidden rounded-xl">
                <OptimizedImage
                  src={article.featuredImage.url}
                  alt={article.featuredImage.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
                  <Badge variant="category" color={getCategoryColor(article.category.slug)} className="mb-2 self-start gap-1">
                    {categoryIcons[article.category.slug]}
                    <span>{article.category.name}</span>
                  </Badge>
                  <h3 className="font-heading font-semibold text-white line-clamp-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BreakingNewsSection() {
  if (mockBreakingNews.length === 0) return null;

  return (
    <section className="bg-red-600 py-3" aria-label="Breaking news" role="region" aria-live="polite">
      <div className="container-custom">
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap pb-2" style={{ scrollbarWidth: 'none' }}>
          <span className="flex-shrink-0 px-3 py-1 bg-white/20 rounded-full font-bold text-sm text-white flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 animate-pulse" aria-hidden="true" />
            BREAKING
          </span>
          {mockBreakingNews.flatMap((article, i) => [
            <Link key={`${i}-link`} to={`/article/${article.slug}`} className="flex-shrink-0 font-medium text-white hover:text-yellow-200 transition-colors pr-8">
              {article.title}
            </Link>,
            <span key={`${i}-sep`} className="flex-shrink-0 text-white/50">•</span>,
          ])}
        </div>
      </div>
    </section>
  );
}

function CategorySection({ category, articles }: { category: Category; articles: NewsArticle[] }) {
  if (articles.length === 0) return null;

  return (
    <section id={category.slug} className="section" aria-labelledby={`${category.slug}-heading`}>
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Badge variant="category" color={category.color} className="text-sm gap-1.5">
              {categoryIcons[category.slug]}
              <span>{category.name}</span>
            </Badge>
            <h2 id={`${category.slug}-heading`} className="section-title">{category.name}</h2>
          </div>
          <Link to={`/category/${category.slug}`} className="text-sm font-medium text-accent hover:text-accent-hover flex items-center gap-1">
            Lihat semua
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <NewsGrid
          articles={articles}
          variant="default"
          columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
          showCategory={false}
        />
      </div>
    </section>
  );
}

function LatestNewsSection() {
  return (
    <section className="section bg-gray-50 dark:bg-gray-950" aria-labelledby="latest-heading">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <h2 id="latest-heading" className="section-title">Terbaru</h2>
          <Link to="/latest" className="text-sm font-medium text-accent hover:text-accent-hover flex items-center gap-1">
            Lihat semua
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <NewsGrid
          articles={mockLatestNews}
          variant="list"
          columns={{ base: 1, sm: 1, md: 1, lg: 1, xl: 1 }}
          showCategory={true}
          showAuthor={true}
          showStats={true}
        />
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="section bg-gradient-to-br from-primary via-primary/90 to-primary-light relative overflow-hidden" aria-label="Newsletter signup">
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/30 mb-4">
            <Mail className="h-5 w-5" aria-hidden="true" />
            <span className="font-medium">Newsletter Harian</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            Jangan Lewatkan Berita Terkini
          </h2>
          <p className="text-white/80 mb-6 text-lg">
            Dapatkan ringkasan berita terpilih langsung ke email Anda setiap pagi. Gratis, tanpa spam, batalkan kapan saja.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="input flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-accent focus:ring-accent/30"
              aria-label="Email for newsletter"
              required
            />
            <Button type="submit" className="whitespace-nowrap bg-accent hover:bg-accent-hover">
              Berlangganan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </form>
          <p className="mt-3 text-xs text-white/60">
            Dengan berlangganan, Anda menyetujui <Link to="/privacy" className="underline hover:text-white">Kebijakan Privasi</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}

import { Mail } from 'lucide-react';

export function Home() {
  const activeCategories = getActiveCategories();

  return (
    <div className="min-h-screen">
      <HeroSection />
      <BreakingNewsSection />

      {activeCategories.map((category) => {
        const categoryArticles = mockArticles.filter(a => a.category.slug === category.slug).slice(0, 4);
        if (categoryArticles.length === 0) return null;
        return <CategorySection key={category.id} category={category} articles={categoryArticles} />;
      })}

      <LatestNewsSection />
      <NewsletterSection />
    </div>
  );
}