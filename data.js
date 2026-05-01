const tempatData = [
  { name: "Taman Mini Indonesia Indah (TMII)", area: "Jakarta Timur", icon: "🏛️", cat: ["wisata","pusat"], tags: ["Wisata Keluarga","Parkir Luas","Drop-off Mudah"], dist: "15 km dari Sudirman", toll: "Rp 5.000 (Tol Cawang)", lat: -6.3024, lng: 106.8954 },
  { name: "Ancol Dreamland", area: "Jakarta Utara", icon: "🎡", cat: ["wisata","pusat"], tags: ["Pantai","Dufan","Parkir Besar"], dist: "12 km dari Sudirman", toll: "Bebas Tol", lat: -6.1254, lng: 106.8447 },
  { name: "Monas (Monumen Nasional)", area: "Jakarta Pusat", icon: "🗽", cat: ["wisata","pusat"], tags: ["Ikon Jakarta","⚠️ Ganjil Genap"], dist: "Pusat Kota", toll: "Bebas Tol", lat: -6.1754, lng: 106.8272 },
  { name: "Kota Tua Jakarta", area: "Jakarta Barat", icon: "🏚️", cat: ["wisata","pusat"], tags: ["Wisata Sejarah","Pejalan Kaki"], dist: "8 km dari Sudirman", toll: "Bebas Tol", lat: -6.1352, lng: 106.8133 },
  { name: "Kebun Binatang Ragunan", area: "Jakarta Selatan", icon: "🦁", cat: ["wisata","pusat"], tags: ["Keluarga","Parkir Besar"], dist: "18 km dari Sudirman", toll: "Bebas Tol", lat: -6.3124, lng: 106.8198 },
  { name: "Grand Indonesia", area: "Jakarta Pusat", icon: "🏬", cat: ["wisata","pusat"], tags: ["Mall Premium","⚠️ Ganjil Genap","Valet"], dist: "0 km (Sudirman)", toll: "Rp 0", lat: -6.1957, lng: 106.8217 },
  { name: "Summarecon Mall Bekasi", area: "Bekasi", icon: "🏬", cat: ["wisata","bekasi"], tags: ["Mall Besar","Bioskop","Parkir Luas"], dist: "32 km dari Jakarta", toll: "Rp 12.500", lat: -6.2248, lng: 106.9997 },
  { name: "Grand Metropolitan Mall", area: "Bekasi", icon: "🏬", cat: ["bekasi"], tags: ["Mall","Parkir Luas"], dist: "30 km dari Jakarta", toll: "Rp 12.500", lat: -6.2350, lng: 106.9915 },
  { name: "Transpark Juanda Bekasi", area: "Bekasi", icon: "🏬", cat: ["bekasi"], tags: ["Mall Baru","Transit-Oriented"], dist: "30 km dari Jakarta", toll: "Rp 12.500", lat: -6.2325, lng: 106.9950 },
  { name: "Kebun Raya Bogor", area: "Bogor Kota", icon: "🌿", cat: ["wisata","bogor"], tags: ["Wisata Alam","Kelas Dunia"], dist: "50 km dari Jakarta", toll: "Rp 14.000", lat: -6.5979, lng: 106.7996 },
  { name: "Puncak / Cisarua", area: "Bogor", icon: "🏔️", cat: ["wisata","bogor"], tags: ["Wisata Alam","Akhir Pekan Padat"], dist: "70 km dari Jakarta", toll: "Rp 14.000", lat: -6.7040, lng: 106.9940 },
  { name: "Botani Square Mall", area: "Bogor", icon: "🏬", cat: ["bogor"], tags: ["Mall","Bioskop","Parkir Luas"], dist: "50 km dari Jakarta", toll: "Rp 14.000", lat: -6.6001, lng: 106.7990 },
  { name: "Karawang International Industrial City", area: "Karawang", icon: "🏭", cat: ["karawang"], tags: ["Kawasan Industri","Sering Dituju"], dist: "85 km dari Jakarta", toll: "Rp 35.000", lat: -6.3223, lng: 107.2894 },
  { name: "Galuh Mas Karawang", area: "Karawang", icon: "🏬", cat: ["karawang"], tags: ["Mall","Pusat Kota Karawang"], dist: "85 km dari Jakarta", toll: "Rp 35.000", lat: -6.3078, lng: 107.2990 },
  { name: "Bumi Serpong Damai (BSD City)", area: "Tangerang Selatan", icon: "🏙️", cat: ["tangerang"], tags: ["Kota Mandiri","Mall","Golf"], dist: "28 km dari Jakarta", toll: "Rp 9.000", lat: -6.2823, lng: 106.6689 },
  { name: "Pantai Indah Kapuk (PIK)", area: "Jakarta Utara", icon: "🌴", cat: ["wisata","pusat"], tags: ["Wisata","Kuliner","Pantai"], dist: "25 km dari Sudirman", toll: "Rp 15.500 (JORR)", lat: -6.1052, lng: 106.7465 },
  { name: "Tangerang City Mall", area: "Tangerang", icon: "🏬", cat: ["tangerang"], tags: ["Mall","Dekat Stasiun"], dist: "28 km dari Jakarta", toll: "Rp 9.000", lat: -6.1783, lng: 106.6405 }
];

const mallData = [
  { name: "Grand Indonesia", area: "Jakarta Pusat", icon: "🏬", type: "mall", cat: ["mall","jakarta"], tags: ["Premium","Valet","⚠️ GG"], info: "Jl. MH Thamrin No.1", parkir: "Basement 5 lantai", lat: -6.1957, lng: 106.8217 },
  { name: "Plaza Indonesia", area: "Jakarta Pusat", icon: "🏬", type: "mall", cat: ["mall","jakarta"], tags: ["Luxury","⚠️ GG"], info: "Jl. MH Thamrin", parkir: "Basement", lat: -6.1938, lng: 106.8223 },
  { name: "Pacific Place", area: "Jakarta Selatan (SCBD)", icon: "🏬", type: "mall", cat: ["mall","jakarta"], tags: ["Premium","SCBD"], info: "Jl. Jend. Sudirman Kav. 52-53", parkir: "Besar", lat: -6.2250, lng: 106.8100 },
  { name: "Plaza Semanggi", area: "Jakarta Selatan", icon: "🏬", type: "mall", cat: ["mall","jakarta"], tags: ["⚠️ GG","Kuliner"], info: "Jl. Jend. Sudirman", parkir: "Ada", lat: -6.2180, lng: 106.8130 },
  { name: "Mal Kelapa Gading", area: "Jakarta Utara", icon: "🏬", type: "mall", cat: ["mall","jakarta"], tags: ["Besar","Keluarga"], info: "Jl. Bulevar Kelapa Gading", parkir: "Luas", lat: -6.1550, lng: 106.9050 },
  { name: "Ciputra World", area: "Jakarta Selatan", icon: "🏬", type: "mall", cat: ["mall","jakarta"], tags: ["Hotel Integrated","Bioskop"], info: "Jl. Prof. Dr. Satrio", parkir: "Ada", lat: -6.2230, lng: 106.8050 },
  { name: "Summarecon Mall Bekasi", area: "Bekasi", icon: "🏬", type: "mall", cat: ["mall","bekasi"], tags: ["Besar","Bioskop"], info: "Jl. Bulevar Ahmad Yani", parkir: "Luas", lat: -6.2248, lng: 106.9997 },
  { name: "Grand Metropolitan", area: "Bekasi", icon: "🏬", type: "mall", cat: ["mall","bekasi"], tags: ["Keluarga","Foodcourt"], info: "Jl. KH Noer Ali", parkir: "Luas", lat: -6.2350, lng: 106.9915 },
  { name: "Lippo Mall Kemang", area: "Jakarta Selatan", icon: "🏬", type: "mall", cat: ["mall","jakarta"], tags: ["Expat Area","Kuliner"], info: "Jl. Kemang Raya", parkir: "Ada", lat: -6.2600, lng: 106.8100 },
  { name: "Botani Square", area: "Bogor", icon: "🏬", type: "mall", cat: ["mall","bogor"], tags: ["Bioskop","Parkir Luas"], info: "Jl. Raya Pajajaran", parkir: "Luas", lat: -6.6001, lng: 106.7990 },
  { name: "Tangcity Mall", area: "Tangerang", icon: "🏬", type: "mall", cat: ["mall","tangerang"], tags: ["Dekat Stasiun"], info: "Jl. Jend. Sudirman", parkir: "Ada", lat: -6.1783, lng: 106.6405 },
  { name: "Galuh Mas Karawang", area: "Karawang", icon: "🏬", type: "mall", cat: ["mall","karawang"], tags: ["Pusat Kota"], info: "Jl. Ahmad Yani, Karawang", parkir: "Luas", lat: -6.3078, lng: 107.2990 },
  { name: "Hotel Mulia Jakarta", area: "Jakarta Selatan", icon: "🏨", type: "hotel", cat: ["hotel","jakarta"], tags: ["Bintang 5","Valet","GG Area"], info: "Jl. Asia Afrika", parkir: "Valet & Umum", lat: -6.2235, lng: 106.8080 },
  { name: "Grand Hyatt Jakarta", area: "Jakarta Pusat", icon: "🏨", type: "hotel", cat: ["hotel","jakarta"], tags: ["Bintang 5","⚠️ GG"], info: "Jl. MH Thamrin", parkir: "Basement", lat: -6.1945, lng: 106.8220 },
  { name: "The Ritz-Carlton Pacific Place", area: "Jakarta Selatan", icon: "🏨", type: "hotel", cat: ["hotel","jakarta"], tags: ["Bintang 5","Valet"], info: "SCBD, Jl. Jend. Sudirman", parkir: "Valet", lat: -6.2250, lng: 106.8100 },
  { name: "JW Marriott Jakarta", area: "Jakarta Selatan", icon: "🏨", type: "hotel", cat: ["hotel","jakarta"], tags: ["Bintang 5","Mega Kuningan"], info: "Jl. DR Ide Anak Agung Gde Agung", parkir: "Luas", lat: -6.2270, lng: 106.8260 },
  { name: "Hotel Santika Premiere Bekasi", area: "Bekasi", icon: "🏨", type: "hotel", cat: ["hotel","bekasi"], tags: ["Bintang 4","Bisnis"], info: "Jl. M. Hasibuan", parkir: "Ada", lat: -6.2400, lng: 106.9950 },
  { name: "Aston Karawang", area: "Karawang", icon: "🏨", type: "hotel", cat: ["hotel","karawang"], tags: ["Bintang 4","Bisnis"], info: "Jl. Tuparev", parkir: "Luas", lat: -6.3100, lng: 107.2950 },
  { name: "Hotel Salak Heritage Bogor", area: "Bogor", icon: "🏨", type: "hotel", cat: ["hotel","bogor"], tags: ["Bintang 4","Heritage"], info: "Jl. Ir. H. Juanda", parkir: "Ada", lat: -6.5950, lng: 106.7930 },
  { name: "Novotel Tangerang", area: "Tangerang", icon: "🏨", type: "hotel", cat: ["hotel","tangerang"], tags: ["Bintang 4","Bisnis"], info: "Jl. Jend. Sudirman", parkir: "Ada", lat: -6.1780, lng: 106.6350 }
];

const golfData = [
  { name: "Pondok Indah Golf", area: "Jakarta Selatan", icon: "⛳", cat: ["jakarta"], tags: ["Drop-off Mudah","Ruang Tunggu","Parkir Luas","27 Hole"], rating: "4.7", lat: -6.2650, lng: 106.7850 },
  { name: "Jabotabek Golf & Country Club", area: "Cikarang", icon: "⛳", cat: ["bekasi"], tags: ["Drop-off Mudah","Ruang Tunggu Supir","Parkir Teduh"], rating: "4.6", lat: -6.2600, lng: 107.1150 },
  { name: "Royale Jakarta Golf Club", area: "Jakarta Timur", icon: "⛳", cat: ["jakarta"], tags: ["Akses Drop-off Mudah","Ada Ruang Tunggu Supir","Parkir Teduh"], rating: "4.5", lat: -6.3025, lng: 106.8950 },
  { name: "Sentul Highlands Golf Club", area: "Sentul, Bogor", icon: "⛳", cat: ["bogor"], tags: ["Akses Drop-off Mudah","Ruang Tunggu Supir","Parkir Teduh","18 Hole"], rating: "4.8", lat: -6.5500, lng: 106.8650 },
  { name: "Karawang Golf & Country Club", area: "Karawang", icon: "⛳", cat: ["karawang"], tags: ["Drop-off Mudah","Parkir Luas","18 Hole"], rating: "4.4", lat: -6.3500, lng: 107.3200 },
  { name: "BSD Golf & Country Club", area: "BSD, Tangerang", icon: "⛳", cat: ["tangerang"], tags: ["Drop-off Mudah","Ruang Tunggu","18 Hole"], rating: "4.5", lat: -6.2900, lng: 106.6750 },
  { name: "Damai Indah Golf", area: "PIK, Jakarta Utara", icon: "⛳", cat: ["jakarta"], tags: ["Drop-off Mudah","Parkir Luas","2 Lapangan"], rating: "4.3", lat: -6.0950, lng: 106.7400 },
  { name: "Bukit Darmo Golf", area: "Legok, Tangerang", icon: "⛳", cat: ["tangerang"], tags: ["Drop-off Mudah","Ruang Supir","18 Hole"], rating: "4.5", lat: -6.3200, lng: 106.6300 }
];

const bandaraStasiunData = [
  { name: "Bandara Soekarno-Hatta (CGK)", area: "Cengkareng, Tangerang", icon: "✈️", type: "bandara", tags: ["Terminal 1, 2, 3","Tol Sedyatmo","~35 menit dari Jakarta"], info: "💳 Tol: Rp 18.500 (Gol I) | 📏 22 km dari Jakarta Pusat", lat: -6.1256, lng: 106.6558 },
  { name: "Bandara Halim Perdanakusuma (HLP)", area: "Jakarta Timur", icon: "✈️", type: "bandara", tags: ["Penerbangan Domestik","Akses Tol Dalam Kota"], info: "💳 Tanpa tol (bisa via Cawang) | 📏 12 km dari Sudirman", lat: -6.2665, lng: 106.8905 },
  { name: "Stasiun Gambir", area: "Jakarta Pusat (Pusat Kota)", icon: "🚆", type: "stasiun", tags: ["KA Jarak Jauh","Drop-off: Samping Barat"], info: "⚠️ Area Ganjil Genap · Akses via Jl. Medan Merdeka Timur", lat: -6.1765, lng: 106.8300 },
  { name: "Stasiun Pasar Senen", area: "Jakarta Pusat", icon: "🚆", type: "stasiun", tags: ["KA Ekonomi","Drop-off: Jl. Senen Raya"], info: "", lat: -6.1740, lng: 106.8445 },
  { name: "Stasiun Bekasi", area: "Bekasi Kota", icon: "🚆", type: "stasiun", tags: ["KRL + KA","Drop-off: Jl. Ir. Juanda"], info: "📏 ~32 km dari Jakarta | Akses via Tol JKT–Cikampek", lat: -6.2360, lng: 106.9985 },
  { name: "Stasiun Bogor", area: "Kota Bogor", icon: "🚆", type: "stasiun", tags: ["KRL Terminus","Drop-off: Jl. Kapten Muslihat"], info: "📏 ~50 km dari Jakarta | 💳 Tol: Rp 14.000", lat: -6.5940, lng: 106.7910 },
  { name: "Stasiun Karawang", area: "Karawang Kota", icon: "🚆", type: "stasiun", tags: ["KA Jarak Jauh","Parkir Luas"], info: "📏 ~85 km dari Jakarta | 💳 Tol: Rp 35.000", lat: -6.3050, lng: 107.3000 },
  { name: "Stasiun Tangerang", area: "Kota Tangerang", icon: "🚆", type: "stasiun", tags: ["KRL","Drop-off: Area Stasiun"], info: "📏 ~28 km dari Jakarta | 💳 Tol: Rp 9.000", lat: -6.1770, lng: 106.6330 }
];

const sosData = [
  { name: "Jasa Marga Call Center", number: "14080", desc: "Info tol, gangguan, kecelakaan di jalan tol", icon: "🚨" },
  { name: "Ambulans / Darurat Medis", number: "119", desc: "Layanan gawat darurat medis nasional", icon: "🚑" },
  { name: "Polisi / Keamanan", number: "110", desc: "Laporan kejahatan dan keamanan", icon: "🚔" },
  { name: "Pemadam Kebakaran", number: "113", desc: "Darurat kebakaran", icon: "🚒" },
  { name: "Derek Tol Gratis", number: "14080", desc: "Layanan derek gratis di dalam tol Jasa Marga", icon: "🛣️" },
  { name: "Waze / Google Maps Traffic", number: "Info Real-time", desc: "Cek kondisi jalan terkini", icon: "📞", noCall: true }
];

const tollPopularData = [
  { name: "Jakarta ↔ Cikampek", tarif: "Rp 20.000", jarak: "73 km", waktu: "~60 menit", status: "padat", id: "jakarta-cikampek" },
  { name: "Jakarta ↔ Bogor (Jagorawi)", tarif: "Rp 14.000", jarak: "50 km", waktu: "~45 menit", status: "lancar", id: "jakarta-bogor" },
  { name: "Jakarta ↔ Tangerang (JORR)", tarif: "Rp 9.000", jarak: "28 km", waktu: "~30 menit", status: "lancar", id: null },
  { name: "Jakarta ↔ Bekasi", tarif: "Rp 12.500", jarak: "32 km", waktu: "~40 menit", status: "padat", id: null },
  { name: "Jakarta ↔ Karawang", tarif: "Rp 35.000", jarak: "85 km", waktu: "~75 menit", status: "lancar", id: null },
  { name: "Bandara Soekarno-Hatta", tarif: "Rp 18.500", jarak: "22 km", waktu: "~35 menit", status: "lancar", id: null },
  { name: "JORR (Lingkar Luar)", tarif: "Rp 15.500", jarak: "45 km", waktu: "~50 menit", status: "lancar", id: null },
  { name: "Depok–Antasari (Desari)", tarif: "Rp 11.500", jarak: "21 km", waktu: "~25 menit", status: "lancar", id: null }
];

const tollRates = {
  'cikampek-tomang': { tarif: 20000, jarak: 73, waktu: 60, lat: -6.3500, lng: 107.1800 },
  'cikampek-semanggi': { tarif: 20000, jarak: 70, waktu: 55, lat: -6.3500, lng: 107.1800 },
  'cikampek-cawang': { tarif: 18000, jarak: 65, waktu: 50, lat: -6.3500, lng: 107.1800 },
  'bekasi_barat-tomang': { tarif: 12500, jarak: 32, waktu: 40, lat: -6.2450, lng: 106.9950 },
  'bekasi_barat-semanggi': { tarif: 12500, jarak: 30, waktu: 35, lat: -6.2450, lng: 106.9950 },
  'bekasi_barat-cawang': { tarif: 10000, jarak: 25, waktu: 30, lat: -6.2450, lng: 106.9950 },
  'cikarang-tomang': { tarif: 15500, jarak: 45, waktu: 45, lat: -6.2800, lng: 107.1200 },
  'cikarang-semanggi': { tarif: 15000, jarak: 42, waktu: 42, lat: -6.2800, lng: 107.1200 },
  'halim-tomang': { tarif: 8500, jarak: 18, waktu: 25, lat: -6.2550, lng: 106.8850 },
  'bogor-tomang': { tarif: 14000, jarak: 50, waktu: 55, lat: -6.5950, lng: 106.7950 },
  'bogor-cawang': { tarif: 14000, jarak: 55, waktu: 60, lat: -6.5950, lng: 106.7950 },
  'cengkareng-semanggi': { tarif: 18500, jarak: 22, waktu: 35, lat: -6.1256, lng: 106.6558 },
  'cengkareng-tomang': { tarif: 15000, jarak: 18, waktu: 30, lat: -6.1256, lng: 106.6558 },
  'serpong-tomang': { tarif: 11000, jarak: 28, waktu: 35, lat: -6.2850, lng: 106.6700 },
  'serpong-semanggi': { tarif: 12500, jarak: 30, waktu: 38, lat: -6.2850, lng: 106.6700 },
  'tangerang-tomang': { tarif: 9000, jarak: 22, waktu: 28, lat: -6.1780, lng: 106.6350 },
  'karawang-tomang': { tarif: 35000, jarak: 85, waktu: 75, lat: -6.3100, lng: 107.2950 },
  'karawang-semanggi': { tarif: 35000, jarak: 83, waktu: 72, lat: -6.3100, lng: 107.2950 }
};

const golMultiplier = { 1: 1, 2: 1.5, 3: 2, 4: 2.5, 5: 3 };

const ggRuasData = [
  { ruas: "Jl. Sudirman", detail: "Bundaran Senayan–Jl. Ridwan Rais", jam: ["06:00–10:00","16:00–21:00"], hari: "Sen–Jum" },
  { ruas: "Jl. MH Thamrin", detail: "Bundaran HI–Jl. Medan Merdeka Barat", jam: ["06:00–10:00","16:00–21:00"], hari: "Sen–Jum" },
  { ruas: "Jl. Gatot Subroto", detail: "Bundaran Slipi–Semanggi", jam: ["06:00–10:00","16:00–21:00"], hari: "Sen–Jum" },
  { ruas: "Jl. HR Rasuna Said", detail: "Kuningan–Semanggi", jam: ["06:00–10:00","16:00–21:00"], hari: "Sen–Jum" },
  { ruas: "Jl. Merdeka Barat/Utara", detail: "Gambir area", jam: ["06:00–10:00","16:00–21:00"], hari: "Sen–Jum" },
  { ruas: "Jl. Sisingamangaraja", detail: "Blok M area", jam: ["06:00–10:00","16:00–21:00"], hari: "Sen–Jum" },
  { ruas: "Jl. Tentara Pelajar", detail: "Petamburan–Slipi", jam: ["06:00–10:00","16:00–21:00"], hari: "Sen–Jum" },
  { ruas: "Jl. Fatmawati", detail: "Cilandak–Pondok Indah", jam: ["06:00–10:00","16:00–21:00"], hari: "Sen–Jum" },
  { ruas: "Tol Dalam Kota", detail: "Slipi–Cawang–Tanjung Priok", jam: ["06:00–10:00","16:00–21:00"], hari: "Sen–Jum" },
  { ruas: "Tol Jakarta–Cikampek", detail: "Halim–Bekasi Barat (Km 0–47)", jam: ["06:00–10:00","16:00–21:00"], hari: "Sen–Jum" }
];

const ticketUpdates = [
  { dot: "var(--green)", text: "Tol JKT–Ciampek (Cikarang): <strong>LANCAR</strong>", time: "14m lalu" },
  { dot: "var(--yellow)", text: "Tol JKT–Ciampek (Gempong): <strong>PADAT</strong>", time: "15m lalu" }
];
