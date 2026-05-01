const tempatData = [
  { name: "Taman Mini Indonesia Indah (TMII)", area: "Jakarta Timur", icon: "🏛️", cat: ["wisata","pusat"], tags: ["Wisata Keluarga","Parkir Luas"], dist: "15 km dari Sudirman", toll: "Rp 5.000", lat: -6.3024, lng: 106.8954 },
  { name: "Ancol Dreamland", area: "Jakarta Utara", icon: "🎡", cat: ["wisata","pusat"], tags: ["Pantai","Dufan"], dist: "12 km dari Sudirman", toll: "Bebas Tol", lat: -6.1254, lng: 106.8447 },
  { name: "Monas", area: "Jakarta Pusat", icon: "🗽", cat: ["wisata","pusat"], tags: ["Ikon Jakarta","⚠️ Ganjil Genap"], dist: "Pusat Kota", toll: "Bebas Tol", lat: -6.1754, lng: 106.8272 },
  { name: "Kota Tua Jakarta", area: "Jakarta Barat", icon: "🏚️", cat: ["wisata","pusat"], tags: ["Sejarah"], dist: "8 km", toll: "Bebas", lat: -6.1352, lng: 106.8133 },
  { name: "Ragunan", area: "Jakarta Selatan", icon: "🦁", cat: ["wisata","pusat"], tags: ["Keluarga"], dist: "18 km", toll: "Bebas", lat: -6.3124, lng: 106.8198 },
  { name: "Grand Indonesia", area: "Jakarta Pusat", icon: "🏬", cat: ["wisata","pusat"], tags: ["Mall Premium"], dist: "0 km", toll: "Rp 0", lat: -6.1957, lng: 106.8217 },
  { name: "Summarecon Mall Bekasi", area: "Bekasi", icon: "🏬", cat: ["bekasi"], tags: ["Mall Besar"], dist: "32 km", toll: "Rp 12.500", lat: -6.2248, lng: 106.9997 },
  { name: "Kebun Raya Bogor", area: "Bogor", icon: "🌿", cat: ["bogor"], tags: ["Wisata Alam"], dist: "50 km", toll: "Rp 14.000", lat: -6.5979, lng: 106.7996 },
  { name: "Puncak", area: "Bogor", icon: "🏔️", cat: ["bogor"], tags: ["Alam"], dist: "70 km", toll: "Rp 14.000", lat: -6.7040, lng: 106.9940 },
  { name: "Karawang International Industrial City", area: "Karawang", icon: "🏭", cat: ["karawang"], tags: ["Industri"], dist: "85 km", toll: "Rp 35.000", lat: -6.3223, lng: 107.2894 },
  { name: "BSD City", area: "Tangerang", icon: "🏙️", cat: ["tangerang"], tags: ["Kota Mandiri"], dist: "28 km", toll: "Rp 9.000", lat: -6.2823, lng: 106.6689 },
  { name: "PIK", area: "Jakarta Utara", icon: "🌴", cat: ["wisata","pusat"], tags: ["Pantai","Kuliner"], dist: "25 km", toll: "Rp 15.500", lat: -6.1052, lng: 106.7465 }
];

const mallData = [
  { name: "Grand Indonesia", area: "Jakarta Pusat", icon: "🏬", type: "mall", cat: ["mall","jakarta"], tags: ["Premium"], info: "Jl. MH Thamrin", parkir: "Basement", lat: -6.1957, lng: 106.8217 },
  { name: "Plaza Indonesia", area: "Jakarta Pusat", icon: "🏬", type: "mall", cat: ["mall","jakarta"], tags: ["Luxury"], info: "Jl. MH Thamrin", parkir: "Basement", lat: -6.1938, lng: 106.8223 },
  { name: "Summarecon Mall Bekasi", area: "Bekasi", icon: "🏬", type: "mall", cat: ["mall","bekasi"], tags: ["Besar"], info: "Jl. Bulevar Ahmad Yani", parkir: "Luas", lat: -6.2248, lng: 106.9997 },
  { name: "Botani Square", area: "Bogor", icon: "🏬", type: "mall", cat: ["mall","bogor"], tags: ["Bioskop"], info: "Jl. Raya Pajajaran", parkir: "Luas", lat: -6.6001, lng: 106.7990 },
  { name: "Tangcity Mall", area: "Tangerang", icon: "🏬", type: "mall", cat: ["mall","tangerang"], tags: ["Dekat Stasiun"], info: "Jl. Jend. Sudirman", parkir: "Ada", lat: -6.1783, lng: 106.6405 },
  { name: "Hotel Mulia", area: "Jakarta Selatan", icon: "🏨", type: "hotel", cat: ["hotel","jakarta"], tags: ["Bintang 5"], info: "Jl. Asia Afrika", parkir: "Valet", lat: -6.2235, lng: 106.8080 },
  { name: "Grand Hyatt Jakarta", area: "Jakarta Pusat", icon: "🏨", type: "hotel", cat: ["hotel","jakarta"], tags: ["Bintang 5"], info: "Jl. MH Thamrin", parkir: "Basement", lat: -6.1945, lng: 106.8220 },
  { name: "Aston Karawang", area: "Karawang", icon: "🏨", type: "hotel", cat: ["hotel","karawang"], tags: ["Bintang 4"], info: "Jl. Tuparev", parkir: "Luas", lat: -6.3100, lng: 107.2950 }
];

const golfData = [
  { name: "Pondok Indah Golf", area: "Jakarta Selatan", icon: "⛳", cat: ["jakarta"], tags: ["27 Hole"], rating: "4.7", lat: -6.2650, lng: 106.7850 },
  { name: "Jabotabek Golf", area: "Cikarang", icon: "⛳", cat: ["bekasi"], tags: ["Parkir Teduh"], rating: "4.6", lat: -6.2600, lng: 107.1150 },
  { name: "Sentul Highlands", area: "Bogor", icon: "⛳", cat: ["bogor"], tags: ["18 Hole"], rating: "4.8", lat: -6.5500, lng: 106.8650 },
  { name: "BSD Golf", area: "Tangerang", icon: "⛳", cat: ["tangerang"], tags: ["18 Hole"], rating: "4.5", lat: -6.2900, lng: 106.6750 },
  { name: "Karawang Golf", area: "Karawang", icon: "⛳", cat: ["karawang"], tags: ["18 Hole"], rating: "4.4", lat: -6.3500, lng: 107.3200 }
];

const bandaraStasiunData = [
  { name: "Bandara Soekarno-Hatta (CGK)", area: "Cengkareng", icon: "✈️", type: "bandara", tags: ["Terminal 1,2,3"], info: "Tol Rp 18.500", lat: -6.1256, lng: 106.6558 },
  { name: "Bandara Halim Perdanakusuma", area: "Jakarta Timur", icon: "✈️", type: "bandara", tags: ["Domestik"], info: "Bebas tol", lat: -6.2665, lng: 106.8905 },
  { name: "Stasiun Gambir", area: "Jakarta Pusat", icon: "🚆", type: "stasiun", tags: ["KA Jarak Jauh"], info: "⚠️ Ganjil Genap", lat: -6.1765, lng: 106.8300 },
  { name: "Stasiun Bekasi", area: "Bekasi", icon: "🚆", type: "stasiun", tags: ["KRL"], info: "32 km", lat: -6.2360, lng: 106.9985 },
  { name: "Stasiun Bogor", area: "Bogor", icon: "🚆", type: "stasiun", tags: ["KRL"], info: "50 km", lat: -6.5940, lng: 106.7910 }
];

const sosData = [
  { name: "Jasa Marga", number: "14080", desc: "Info tol", icon: "🚨" },
  { name: "Ambulans", number: "119", desc: "Darurat medis", icon: "🚑" },
  { name: "Polisi", number: "110", desc: "Keamanan", icon: "🚔" },
  { name: "Pemadam", number: "113", desc: "Kebakaran", icon: "🚒" },
  { name: "Derek Tol Gratis", number: "14080", desc: "Dalam tol Jasa Marga", icon: "🛣️" }
];

const tollPopularData = [
  { name: "Jakarta ↔ Cikampek", tarif: "Rp 20.000", jarak: "73 km", waktu: "~60 menit", status: "padat", id: "jakarta-cikampek" },
  { name: "Jakarta ↔ Bogor", tarif: "Rp 14.000", jarak: "50 km", waktu: "~45 menit", status: "lancar", id: "jakarta-bogor" },
  { name: "Jakarta ↔ Tangerang", tarif: "Rp 9.000", jarak: "28 km", waktu: "~30 menit", status: "lancar" },
  { name: "Bandara Soekarno-Hatta", tarif: "Rp 18.500", jarak: "22 km", waktu: "~35 menit", status: "lancar" }
];

const tollRates = {
  'cikampek-tomang': { tarif: 20000, jarak: 73, waktu: 60, lat: -6.3500, lng: 107.1800 },
  'bekasi_barat-tomang': { tarif: 12500, jarak: 32, waktu: 40, lat: -6.2450, lng: 106.9950 },
  'bogor-tomang': { tarif: 14000, jarak: 50, waktu: 55, lat: -6.5950, lng: 106.7950 },
  'cengkareng-semanggi': { tarif: 18500, jarak: 22, waktu: 35, lat: -6.1256, lng: 106.6558 },
  'tangerang-tomang': { tarif: 9000, jarak: 22, waktu: 28, lat: -6.1780, lng: 106.6350 },
  'karawang-tomang': { tarif: 35000, jarak: 85, waktu: 75, lat: -6.3100, lng: 107.2950 }
};
const golMultiplier = { 1: 1, 2: 1.5, 3: 2, 4: 2.5, 5: 3 };

const ggRuasData = [
  { ruas: "Jl. Sudirman", detail: "Bundaran Senayan–Ridwan Rais", jam: ["06:00–10:00","16:00–21:00"] },
  { ruas: "Jl. MH Thamrin", detail: "Bundaran HI–Medan Merdeka Barat", jam: ["06:00–10:00","16:00–21:00"] },
  { ruas: "Jl. Gatot Subroto", detail: "Slipi–Semanggi", jam: ["06:00–10:00","16:00–21:00"] },
  { ruas: "Tol Dalam Kota", detail: "Slipi–Cawang–Tanjung Priok", jam: ["06:00–10:00","16:00–21:00"] },
  { ruas: "Tol Jakarta–Cikampek", detail: "Halim–Bekasi Barat (Km 0–47)", jam: ["06:00–10:00","16:00–21:00"] }
];

const ticketUpdates = [
  { dot: "var(--green)", text: "Tol JKT–Ciampek (Cikarang): <strong>LANCAR</strong>", time: "14m lalu" },
  { dot: "var(--yellow)", text: "Tol JKT–Ciampek (Gempong): <strong>PADAT</strong>", time: "15m lalu" }
];

