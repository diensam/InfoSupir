let userLat = null, userLng = null, locationEnabled = false;
let favorites = JSON.parse(localStorage.getItem('supirInfoFavorites') || '[]');
let sortByDistanceTempat = false, sortByDistanceGolf = false, sortByDistanceMall = false;
let currentTempatFilter = 'semua', currentGolfFilter = 'semua', currentMallFilter = 'semua';
let lastTollAsal = '', lastTollTujuan = '';
let currentUnit = localStorage.getItem('supirInfoUnit') || 'km';

function haversine(lat1,lng1,lat2,lng2) { const R=6371; const dLat=(lat2-lat1)*Math.PI/180; const dLng=(lng2-lng1)*Math.PI/180; const a=Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2; return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); }
function getDistanceKm(lat,lng) { if(!locationEnabled||userLat===null) return null; let km = haversine(userLat,userLng,lat,lng); return currentUnit === 'mi' ? km * 0.621371 : km; }
function formatDistance(km) { if(km===null) return null; if(currentUnit==='mi'){ if(km<0.1) return `${Math.round(km*5280)} ft`; return `${km.toFixed(1)} mi`; } if(km<1) return `${Math.round(km*1000)} m`; return `${km.toFixed(1)} km`; }
function getDistanceHtml(lat,lng) { const d=getDistanceKm(lat,lng); if(d===null) return ''; const nearClass=(currentUnit==='mi'? d<6.2 : d<10)?' near':''; return `<span class="distance-badge${nearClass}">📏 ${formatDistance(d)} dari Anda</span>`; }
function isFavorited(name) { return favorites.includes(name); }
function toggleFavorite(name) { const idx=favorites.indexOf(name); if(idx>-1){ favorites.splice(idx,1); showToast('⭐ Dihapus dari favorit','warning'); } else { favorites.push(name); showToast('⭐ Ditambahkan ke favorit!','success'); } localStorage.setItem('supirInfoFavorites',JSON.stringify(favorites)); refreshAllViews(); }
function showToast(msg,type='') { const c=document.getElementById('toastContainer'); const t=document.createElement('div'); t.className=`toast ${type}`; t.textContent=msg; c.appendChild(t); setTimeout(()=>t.remove(),2600); }
function bukaGoogleMaps(lat,lng,name) { const enc=encodeURIComponent(name); let url; if(locationEnabled&&userLat!==null) url=`https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${lat},${lng}&travelmode=driving&destination_name=${enc}`; else url=`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving&destination_name=${enc}`; window.open(url,'_blank'); showToast('🗺️ Membuka Google Maps...','success'); }
function getFavBtn(name) { const fav=isFavorited(name); return `<button class="btn-fav${fav?' favorited':''}" onclick="event.stopPropagation();toggleFavorite('${name.replace(/'/g,"\\'")}')">${fav?'★ Favorit':'☆ Simpan'}</button>`; }
function getPlaceCardHtml(item,extraInfo='') { const distHtml=(item.lat&&item.lng)?getDistanceHtml(item.lat,item.lng):''; const mapsBtn=(item.lat&&item.lng)?`<button class="btn-maps" onclick="event.stopPropagation();bukaGoogleMaps(${item.lat},${item.lng},'${item.name.replace(/'/g,"\\'")}')">🗺️ Buka Maps</button>`:''; const favBtn=getFavBtn(item.name); const tagsHtml=(item.tags||[]).map(tg=>`<span class="place-tag ${tg.includes('⚠️')||tg.includes('Bintang 5')?'highlight':''}">${tg}</span>`).join(''); return `<div class="place-card" onclick="bukaGoogleMaps(${item.lat||0},${item.lng||0},'${(item.name||'').replace(/'/g,"\\'")}')"><div class="place-icon-box">${item.icon||'📍'}</div><div class="place-info"><div class="place-name">${item.name} ${distHtml}</div><div class="place-meta">📍 ${item.area||''}${item.rating?' · ⭐ '+item.rating:''}</div>${item.info?`<div style="font-size:11px;color:var(--text3);margin-bottom:6px">${item.info}</div>`:''}<div class="place-tags">${tagsHtml}</div>${extraInfo}<div class="place-actions">${mapsBtn} ${favBtn}</div></div></div>`; }
function refreshAllViews() { renderTiker(); renderTempat(currentTempatFilter); renderMall(currentMallFilter); renderGolf(currentGolfFilter); renderBandara(); renderSos(); renderTollList(); renderHomeTollUpdates(); updateNearMeBanner(); }

function detectLocation() {
  const locLabel=document.getElementById('locLabel'), locBadge=document.getElementById('locBadge'), locDot=document.getElementById('locDot');
  if(!navigator.geolocation){ locLabel.textContent='Tidak didukung'; locBadge.classList.remove('pulsing'); locDot.style.background='var(--text3)'; return; }
  locLabel.textContent='Mendeteksi...'; locBadge.classList.add('pulsing'); locDot.style.background='var(--yellow)';
  navigator.geolocation.getCurrentPosition(pos=>{ userLat=pos.coords.latitude; userLng=pos.coords.longitude; locationEnabled=true; locLabel.textContent='Lokasi Aktif'; locBadge.classList.remove('pulsing'); locDot.style.background='var(--green)'; locBadge.style.borderColor='var(--green)'; showToast('📍 Lokasi berhasil dideteksi!','success'); refreshAllViews(); }, err=>{ console.warn(err); locLabel.textContent='Klik untuk coba'; locBadge.classList.remove('pulsing'); locDot.style.background='var(--red)'; locBadge.style.borderColor='var(--red)'; locationEnabled=false; userLat=null; userLng=null; showToast('⚠️ Tidak dapat mengakses lokasi','warning'); refreshAllViews(); }, {enableHighAccuracy:true,timeout:10000,maximumAge:300000});
}
function refreshLocation() { userLat=null; userLng=null; locationEnabled=false; document.getElementById('locBadge').style.borderColor='var(--accent2)'; document.getElementById('locDot').style.background='var(--accent2)'; detectLocation(); }

function getAllPlaces() { return [...tempatData,...mallData,...golfData,...bandaraStasiunData]; }
function handleMainSearch(query) {
  const resultsDiv=document.getElementById('searchResults');
  if(!query||query.trim().length<1){ resultsDiv.classList.remove('show'); resultsDiv.innerHTML=''; return; }
  const q=query.toLowerCase().trim(); const allPlaces=getAllPlaces(); const matches=allPlaces.filter(p=>p.name.toLowerCase().includes(q)||(p.area||'').toLowerCase().includes(q)||(p.tags||[]).some(t=>t.toLowerCase().includes(q)));
  if(matches.length===0) resultsDiv.innerHTML=`<div class="search-no-result">🔍 Tidak ditemukan hasil untuk "${query}"</div>`;
  else resultsDiv.innerHTML=matches.slice(0,8).map(p=>{ const distHtml=(p.lat&&p.lng)?getDistanceHtml(p.lat,p.lng):''; return `<div class="search-result-item" onclick="bukaGoogleMaps(${p.lat||0},${p.lng||0},'${(p.name||'').replace(/'/g,"\\'")}');document.getElementById('searchResults').classList.remove('show');document.getElementById('mainSearch').value='';"><span style="font-size:18px">${p.icon||'📍'}</span><div style="flex:1"><div style="font-weight:600;font-size:13px">${p.name} ${distHtml}</div><div style="font-size:11px;color:var(--text3)">${p.area||''}</div></div><span style="color:var(--accent2);font-size:18px">→</span></div>`; }).join('');
  resultsDiv.classList.add('show');
}
document.addEventListener('click',e=>{ const s=document.getElementById('mainSearch'),r=document.getElementById('searchResults'); if(!s.contains(e.target)&&!r.contains(e.target)) r.classList.remove('show'); });

function renderTiker() { document.getElementById('tickerContainer').innerHTML=ticketUpdates.map(t=>`<div class="update-ticker"><div class="ticker-dot" style="background:${t.dot}"></div><div class="ticker-text">${t.text}</div><div class="ticker-time">${t.time}</div></div>`).join(''); }
function renderHomeTollUpdates() { document.getElementById('homeTollUpdates').innerHTML=`<div class="section-title">Update Jalur Tol</div>${tollPopularData.slice(0,3).map(t=>`<div class="toll-card" ${t.id?`onclick="showTollDetail('${t.id}')"`:''}><div class="toll-header"><div class="toll-name">${t.name}</div><span class="status-tag ${t.status}">● ${t.status}</span></div><div class="toll-meta"><div class="toll-item">🕐 <span>${t.waktu}</span></div><div class="toll-item">📏 <span class="toll-distance">${t.jarak}</span></div><div class="toll-item">💳 <span>${t.tarif}</span></div></div></div>`).join('')}`; }

function renderTempat(cat) {
  currentTempatFilter=cat; let filtered;
  if(cat==='favorit'){ filtered=tempatData.filter(t=>isFavorited(t.name)); if(filtered.length===0){ document.getElementById('tempatList').innerHTML='<div class="section-title">⭐ Tempat Favorit</div><div style="text-align:center;padding:20px;color:var(--text3)">Belum ada tempat favorit.</div>'; return; } }
  else filtered=cat==='semua'?tempatData:tempatData.filter(t=>t.cat.includes(cat));
  if(sortByDistanceTempat&&locationEnabled&&userLat!==null) filtered=[...filtered].sort((a,b)=>{ const da=getDistanceKm(a.lat||0,a.lng||0),db=getDistanceKm(b.lat||0,b.lng||0); if(da===null&&db===null) return 0; if(da===null) return 1; if(db===null) return -1; return da-db; });
  const title=cat==='favorit'?'⭐ Tempat Favorit':'Tempat Populer '+(cat==='semua'?'':'— '+cat.charAt(0).toUpperCase()+cat.slice(1));
  document.getElementById('tempatList').innerHTML=`<div class="section-title">${title} <span style="font-size:10px;color:var(--text3);font-weight:400;text-transform:none;letter-spacing:0">(${filtered.length})</span></div>`+filtered.map(t=>{ const extraInfo=t.dist?`<div style="margin-top:6px;font-size:11px;color:var(--text3)">📏 ${t.dist} · 💳 ${t.toll}</div>`:''; return getPlaceCardHtml(t,extraInfo); }).join('');
}
function renderMall(cat) {
  currentMallFilter=cat; let filtered;
  if(cat==='favorit'){ filtered=mallData.filter(m=>isFavorited(m.name)); if(filtered.length===0){ document.getElementById('mallList').innerHTML='<div class="section-title">⭐ Mall & Hotel Favorit</div><div style="text-align:center;padding:20px;color:var(--text3)">Belum ada favorit.</div>'; return; } }
  else filtered=cat==='semua'?mallData:mallData.filter(m=>m.cat.includes(cat));
  if(sortByDistanceMall&&locationEnabled&&userLat!==null) filtered=[...filtered].sort((a,b)=>{ const da=getDistanceKm(a.lat||0,a.lng||0),db=getDistanceKm(b.lat||0,b.lng||0); if(da===null&&db===null) return 0; if(da===null) return 1; if(db===null) return -1; return da-db; });
  const title=cat==='favorit'?'⭐ Mall & Hotel Favorit':'Mall & Hotel '+(cat==='semua'?'':'— '+cat.charAt(0).toUpperCase()+cat.slice(1));
  document.getElementById('mallList').innerHTML=`<div class="section-title">${title} <span style="font-size:10px;color:var(--text3);font-weight:400;text-transform:none;letter-spacing:0">(${filtered.length})</span></div>`+filtered.map(m=>{ const extraInfo=`<div style="margin-top:6px;font-size:11px;color:var(--text2)">🅿️ ${m.parkir}</div>`; return getPlaceCardHtml(m,extraInfo); }).join('');
}
function renderGolf(cat) {
  currentGolfFilter=cat; let filtered;
  if(cat==='favorit'){ filtered=golfData.filter(g=>isFavorited(g.name)); if(filtered.length===0){ document.getElementById('golfList').innerHTML='<div class="section-title">⛳ Golf Favorit</div><div style="text-align:center;padding:20px;color:var(--text3)">Belum ada favorit.</div>'; return; } }
  else filtered=cat==='semua'?golfData:golfData.filter(g=>g.cat.includes(cat));
  if(sortByDistanceGolf&&locationEnabled&&userLat!==null) filtered=[...filtered].sort((a,b)=>{ const da=getDistanceKm(a.lat||0,a.lng||0),db=getDistanceKm(b.lat||0,b.lng||0); if(da===null&&db===null) return 0; if(da===null) return 1; if(db===null) return -1; return da-db; });
  const title=cat==='favorit'?'⛳ Golf Course Favorit':'Golf Course Jabodetabek–Karawang';
  document.getElementById('golfList').innerHTML=`<div class="section-title">${title} <span style="font-size:10px;color:var(--text3);font-weight:400;text-transform:none;letter-spacing:0">(${filtered.length})</span></div>`+filtered.map(g=>getPlaceCardHtml(g)).join('');
}
function renderBandara() { document.getElementById('bandaraList').innerHTML=`<div class="section-title">Bandara & Stasiun <span style="font-size:10px;color:var(--text3);font-weight:400;text-transform:none;letter-spacing:0">(${bandaraStasiunData.length})</span></div>${bandaraStasiunData.map(b=>getPlaceCardHtml(b)).join('')}`; }
function renderSos() { document.getElementById('sosList').innerHTML=`<div class="section-title">Kontak Darurat & Penting</div>${sosData.map(s=>`<div class="sos-card"><div class="sos-icon">${s.icon}</div><div class="sos-info"><div class="sos-name">${s.name}</div><div class="sos-number">${s.number}</div><div class="sos-desc">${s.desc}</div></div>${s.noCall?'':`<button class="sos-call" onclick="telp('${s.number}')">TELP</button>`}</div>`).join('')}`; }
function renderTollList() { document.getElementById('tollListSection').innerHTML=`<div class="section-title">Tarif Populer (Gol I)</div>${tollPopularData.map(t=>`<div class="toll-card" ${t.id?`onclick="showTollDetail('${t.id}')"`:''}><div class="toll-header"><div class="toll-name">${t.name}</div><div class="toll-tarif">${t.tarif}</div></div><div class="toll-meta"><div class="toll-item">📏 <span class="toll-distance">${t.jarak}</span></div><div class="toll-item">🕐 <span>${t.waktu}</span></div><div class="toll-item"><span class="status-tag ${t.status}">● ${t.status}</span></div></div></div>`).join('')}`; }
function renderGGTable() { document.getElementById('ggTableContainer').innerHTML=`<table class="gg-table"><thead><tr><th>Ruas Jalan</th><th>Jam</th><th>Hari</th></tr></thead><tbody>${ggRuasData.map(r=>`<tr><td><div class="ruas">${r.ruas}</div><div style="font-size:11px;color:var(--text3)">${r.detail}</div></td><td>${r.jam.map(j=>`<div class="jam">${j}</div>`).join('')}</td><td><span class="gg-badge ge">${r.hari}</span></td></tr>`).join('')}</tbody></table>`; }
function renderTollCalculator() {
  const asalOpts=[...new Set(Object.keys(tollRates).map(k=>k.split('-')[0]))].map(g=>`<option value="${g}">${g.replace(/_/g,' ').replace(/\b\w/g,l=>l.toUpperCase())}</option>`).join('');
  const tujuanOpts=[...new Set(Object.keys(tollRates).map(k=>k.split('-')[1]))].map(g=>`<option value="${g}">${g.replace(/_/g,' ').replace(/\b\w/g,l=>l.toUpperCase())}</option>`).join('');
  document.getElementById('tollCalculator').innerHTML=`<div class="calc-card"><div class="calc-label">Hitung Tarif Tol</div><select class="calc-select" id="tollAsal"><option value="">-- Pilih Gerbang Asal --</option>${asalOpts}</select><select class="calc-select" id="tollTujuan"><option value="">-- Pilih Gerbang Tujuan --</option>${tujuanOpts}</select><select class="calc-select" id="tollGol"><option value="1">Golongan I (Sedan/SUV)</option><option value="2">Golongan II</option><option value="3">Golongan III</option><option value="4">Golongan IV</option><option value="5">Golongan V</option></select><button class="calc-btn" onclick="hitungToll()">HITUNG TARIF</button><div class="result-box" id="tollResult"><div class="result-title">Estimasi Perjalanan</div><div class="result-main" id="tollResultTarif">—</div><div class="result-sub" id="tollResultInfo">—</div><button class="btn-maps" style="margin-top:10px;width:100%;justify-content:center;" id="tollMapsBtn" onclick="bukaMapsToll()" hidden>🗺️ Buka Rute di Google Maps</button></div></div>`;
}
function renderAllFilters() {
  const tempatCats=['semua','wisata','pusat','bekasi','bogor','karawang','tangerang'];
  document.getElementById('tempatFilter').innerHTML=tempatCats.map(c=>`<div class="filter-tab${c==='semua'?' active':''}" onclick="filterTempat('${c}',this)">${c==='semua'?'Semua':c.charAt(0).toUpperCase()+c.slice(1)}</div>`).join('')+`<div class="filter-tab" onclick="filterTempat('favorit',this)" style="color:var(--yellow)">⭐ Favorit</div><button class="sort-btn" id="sortTempatBtn" onclick="toggleSortTempat()">📏 Urutkan Jarak</button>`;
  const golfCats=['semua','jakarta','bekasi','karawang','bogor','tangerang'];
  document.getElementById('golfFilter').innerHTML=golfCats.map(c=>`<div class="filter-tab${c==='semua'?' active':''}" onclick="filterGolf('${c}',this)">${c==='semua'?'Semua':c.charAt(0).toUpperCase()+c.slice(1)}</div>`).join('')+`<div class="filter-tab" onclick="filterGolf('favorit',this)" style="color:var(--yellow)">⭐ Favorit</div><button class="sort-btn" id="sortGolfBtn" onclick="toggleSortGolf()">📏 Urutkan Jarak</button>`;
  const mallCats=['semua','mall','hotel','jakarta','bekasi','bogor','karawang','tangerang'];
  document.getElementById('mallFilter').innerHTML=mallCats.map(c=>`<div class="filter-tab${c==='semua'?' active':''}" onclick="filterMall('${c}',this)">${c==='semua'?'Semua':c.charAt(0).toUpperCase()+c.slice(1)}</div>`).join('')+`<div class="filter-tab" onclick="filterMall('favorit',this)" style="color:var(--yellow)">⭐ Favorit</div><button class="sort-btn" id="sortMallBtn" onclick="toggleSortMall()">📏 Urutkan Jarak</button>`;
}
function updateNearMeBanner() { const sub=document.getElementById('nearMeSub'); if(locationEnabled&&userLat!==null) sub.textContent='📍 Lokasi terdeteksi — lihat tempat terdekat'; else if(!locationEnabled&&userLat===null) sub.textContent='Izinkan lokasi untuk melihat jarak'; else sub.textContent='Menunggu deteksi lokasi...'; }

function switchPage(page) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.bottom-nav-item').forEach(n=>n.classList.remove('active'));
  const pageEl=document.getElementById('page-'+page); if(pageEl) pageEl.classList.add('active');
  const navEl=document.getElementById('nav-'+page); if(navEl) navEl.classList.add('active');
  document.getElementById('searchResults').classList.remove('show'); document.getElementById('mainSearch').value='';
  window.scrollTo({top:0,behavior:'smooth'});
  if(page==='settings') { document.getElementById('themeToggle').checked = document.body.classList.contains('light-theme'); document.getElementById('unitSelect').value = currentUnit; }
}
function cekPlat() { /* ... sama seperti sebelumnya ... */ }
function hitungToll() { /* ... */ }
function bukaMapsToll() { /* ... */ }
function showTollDetail(id) { /* ... */ }
function closeModal(e) { if(e.target===document.getElementById('modalOverlay')) closeModalBtn(); }
function closeModalBtn() { document.getElementById('modalOverlay').classList.remove('show'); }
function telp(num) { window.location.href='tel:'+num; }

function toggleSortTempat() { sortByDistanceTempat=!sortByDistanceTempat; const btn=document.getElementById('sortTempatBtn'); if(sortByDistanceTempat){ if(!locationEnabled||userLat===null){ showToast('📍 Izinkan akses lokasi dulu','warning'); sortByDistanceTempat=false; return; } btn.classList.add('active'); btn.textContent='📏 Urutkan Default'; } else { btn.classList.remove('active'); btn.textContent='📏 Urutkan Jarak'; } renderTempat(currentTempatFilter); }
function toggleSortGolf() { sortByDistanceGolf=!sortByDistanceGolf; const btn=document.getElementById('sortGolfBtn'); if(sortByDistanceGolf){ if(!locationEnabled||userLat===null){ showToast('📍 Izinkan akses lokasi dulu','warning'); sortByDistanceGolf=false; return; } btn.classList.add('active'); btn.textContent='📏 Urutkan Default'; } else { btn.classList.remove('active'); btn.textContent='📏 Urutkan Jarak'; } renderGolf(currentGolfFilter); }
function toggleSortMall() { sortByDistanceMall=!sortByDistanceMall; const btn=document.getElementById('sortMallBtn'); if(sortByDistanceMall){ if(!locationEnabled||userLat===null){ showToast('📍 Izinkan akses lokasi dulu','warning'); sortByDistanceMall=false; return; } btn.classList.add('active'); btn.textContent='📏 Urutkan Default'; } else { btn.classList.remove('active'); btn.textContent='📏 Urutkan Jarak'; } renderMall(currentMallFilter); }
function filterTempat(cat,el) { document.querySelectorAll('#tempatFilter .filter-tab').forEach(t=>t.classList.remove('active')); if(el) el.classList.add('active'); sortByDistanceTempat=false; document.getElementById('sortTempatBtn').classList.remove('active'); renderTempat(cat); }
function filterGolf(cat,el) { document.querySelectorAll('#golfFilter .filter-tab').forEach(t=>t.classList.remove('active')); if(el) el.classList.add('active'); sortByDistanceGolf=false; document.getElementById('sortGolfBtn').classList.remove('active'); renderGolf(cat); }
function filterMall(cat,el) { document.querySelectorAll('#mallFilter .filter-tab').forEach(t=>t.classList.remove('active')); if(el) el.classList.add('active'); sortByDistanceMall=false; document.getElementById('sortMallBtn').classList.remove('active'); renderMall(cat); }
function showNearMe() { /* ... */ }

/* TEMA & PENGATURAN */
function applyTheme(theme) {
  if(theme==='light') document.body.classList.add('light-theme');
  else document.body.classList.remove('light-theme');
  localStorage.setItem('supirInfoTheme', theme);
}
function toggleTheme() {
  const isLight = document.body.classList.contains('light-theme');
  applyTheme(isLight ? 'dark' : 'light');
  document.getElementById('themeToggle').checked = !isLight;
}
function changeUnit() {
  currentUnit = document.getElementById('unitSelect').value;
  localStorage.setItem('supirInfoUnit', currentUnit);
  refreshAllViews();
  showToast(`Satuan jarak diubah ke ${currentUnit==='km'?'Kilometer':'Mil'}`,'success');
}
function resetFavorites() {
  if(confirm('Hapus semua tempat favorit?')) {
    favorites = [];
    localStorage.setItem('supirInfoFavorites', JSON.stringify(favorites));
    refreshAllViews();
    showToast('Favorit berhasil direset','warning');
  }
}
function initTheme() {
  const saved = localStorage.getItem('supirInfoTheme');
  if(saved) applyTheme(saved);
  else if(window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme('light');
  else applyTheme('dark');
}

function updateClock() { const now=new Date(); document.getElementById('ggClock').textContent=`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`; const hour=now.getHours(), isActive=(hour>=6&&hour<10)||(hour>=16&&hour<21); const el=document.getElementById('ggActiveNow'); el.textContent=isActive?'🔴 Sedang berlaku':'🟢 Tidak berlaku'; el.style.color=isActive?'var(--red)':'var(--green)'; }
function updateDate() { const now=new Date(); const days=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'], months=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']; document.getElementById('headerDate').textContent=`${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`; const day=now.getDay(), date=now.getDate(), isWeekend=day===0||day===6; const ggEl=document.getElementById('ggStatus'), ggDetail=document.getElementById('ggDetail'); if(isWeekend){ ggEl.textContent='BEBAS'; ggEl.className='gg-status'; ggEl.style.color='var(--green)'; ggDetail.textContent='Tidak berlaku di akhir pekan'; } else { const isGanjil=date%2!==0; ggEl.textContent=isGanjil?'GANJIL':'GENAP'; ggEl.className=`gg-status ${isGanjil?'ganjil':'genap'}`; ggDetail.textContent=`Plat ${isGanjil?'GANJIL':'GENAP'} dilarang 06:00–10:00 & 16:00–21:00`; } }

document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ closeModalBtn(); document.getElementById('searchResults').classList.remove('show'); document.getElementById('mainSearch').value=''; } if(e.ctrlKey||e.metaKey){ switch(e.key){ case '1': e.preventDefault(); switchPage('beranda'); break; case '2': e.preventDefault(); switchPage('toll'); break; case '3': e.preventDefault(); switchPage('tempat'); break; case '4': e.preventDefault(); switchPage('sos'); break; } } });

function init() {
  initTheme();
  updateClock(); setInterval(updateClock,1000);
  updateDate(); setInterval(updateDate,60000);
  renderAllFilters();
  renderGGTable();
  renderTollCalculator();
  refreshAllViews();
  detectLocation();
  document.getElementById('unitSelect').value = currentUnit;
}
document.addEventListener('DOMContentLoaded', init);
