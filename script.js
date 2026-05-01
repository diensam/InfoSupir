let userLat = null, userLng = null, locationEnabled = false;
let favorites = JSON.parse(localStorage.getItem('supirInfoFavorites') || '[]');
let sortByDistanceTempat = false, sortByDistanceGolf = false, sortByDistanceMall = false;
let currentTempatFilter = 'semua', currentGolfFilter = 'semua', currentMallFilter = 'semua';
let lastTollAsal = '', lastTollTujuan = '';
let currentUnit = localStorage.getItem('supirInfoUnit') || 'km';

function haversine(lat1,lng1,lat2,lng2) { const R=6371; const dLat=(lat2-lat1)*Math.PI/180; const dLng=(lng2-lng1)*Math.PI/180; const a=Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2; return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); }
function getDistanceKm(lat,lng) { if(!locationEnabled||userLat===null) return null; let km = haversine(userLat,userLng,lat,lng); return currentUnit === 'mi' ? km * 0.621371 : km; }
function formatDistance(km) { if(km===null) return null; if(currentUnit==='mi'){ return km<0.1 ? `${Math.round(km*5280)} ft` : `${km.toFixed(1)} mi`; } return km<1 ? `${Math.round(km*1000)} m` : `${km.toFixed(1)} km`; }
function getDistanceHtml(lat,lng) { const d=getDistanceKm(lat,lng); if(d===null) return ''; const nearClass=(currentUnit==='mi'? d<6.2 : d<10)?' near':''; return `<span class="distance-badge${nearClass}">📏 ${formatDistance(d)} dari Anda</span>`; }
function isFavorited(name) { return favorites.includes(name); }
function toggleFavorite(name) { const idx=favorites.indexOf(name); if(idx>-1){ favorites.splice(idx,1); showToast('⭐ Dihapus dari favorit','warning'); } else { favorites.push(name); showToast('⭐ Ditambahkan ke favorit!','success'); } localStorage.setItem('supirInfoFavorites',JSON.stringify(favorites)); refreshAllViews(); }
function showToast(msg,type='') { const c=document.getElementById('toastContainer'); const t=document.createElement('div'); t.className=`toast ${type}`; t.textContent=msg; c.appendChild(t); setTimeout(()=>t.remove(),2600); }
function bukaGoogleMaps(lat,lng,name) { const enc=encodeURIComponent(name); let url; if(locationEnabled&&userLat!==null) url=`https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${lat},${lng}&travelmode=driving&destination_name=${enc}`; else url=`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving&destination_name=${enc}`; window.open(url,'_blank'); showToast('🗺️ Membuka Google Maps...','success'); }
function getFavBtn(name) { const fav=isFavorited(name); return `<button class="btn-fav${fav?' favorited':''}" onclick="event.stopPropagation();toggleFavorite('${name.replace(/'/g,"\\'")}')">${fav?'★ Favorit':'☆ Simpan'}</button>`; }
function getPlaceCardHtml(item,extraInfo='') { const distHtml=(item.lat&&item.lng)?getDistanceHtml(item.lat,item.lng):''; const mapsBtn=(item.lat&&item.lng)?`<button class="btn-maps" onclick="event.stopPropagation();bukaGoogleMaps(${item.lat},${item.lng},'${item.name.replace(/'/g,"\\'")}')">🗺️ Buka Maps</button>`:''; const favBtn=getFavBtn(item.name); const tagsHtml=(item.tags||[]).map(tg=>`<span class="place-tag">${tg}</span>`).join(''); return `<div class="place-card" onclick="bukaGoogleMaps(${item.lat||0},${item.lng||0},'${(item.name||'').replace(/'/g,"\\'")}')"><div class="place-icon-box">${item.icon||'📍'}</div><div class="place-info"><div class="place-name">${item.name} ${distHtml}</div><div class="place-meta">📍 ${item.area||''}${item.rating?' · ⭐ '+item.rating:''}</div>${item.info?`<div style="font-size:11px;color:var(--text3);margin-bottom:6px">${item.info}</div>`:''}<div class="place-tags">${tagsHtml}</div>${extraInfo}<div class="place-actions">${mapsBtn} ${favBtn}</div></div></div>`; }
function refreshAllViews() { renderTiker(); renderTempat(currentTempatFilter); renderMall(currentMallFilter); renderGolf(currentGolfFilter); renderBandara(); renderSos(); renderTollList(); renderHomeTollUpdates(); updateNearMeBanner(); }

function detectLocation() {
  const locLabel=document.getElementById('locLabel'), locBadge=document.getElementById('locBadge'), locDot=document.getElementById('locDot');
  if(!navigator.geolocation){ locLabel.textContent='Tidak didukung'; return; }
  locLabel.textContent='Mendeteksi...'; locBadge.classList.add('pulsing'); locDot.style.background='var(--yellow)';
  navigator.geolocation.getCurrentPosition(pos=>{ userLat=pos.coords.latitude; userLng=pos.coords.longitude; locationEnabled=true; locLabel.textContent='Lokasi Aktif'; locBadge.classList.remove('pulsing'); locDot.style.background='var(--green)'; showToast('📍 Lokasi berhasil dideteksi!','success'); refreshAllViews(); }, err=>{ locLabel.textContent='Klik untuk coba'; locBadge.classList.remove('pulsing'); locDot.style.background='var(--red)'; locationEnabled=false; userLat=null; userLng=null; refreshAllViews(); }, {enableHighAccuracy:true,timeout:10000});
}
function refreshLocation() { userLat=null; userLng=null; locationEnabled=false; detectLocation(); }

function getAllPlaces() { return [...tempatData,...mallData,...golfData,...bandaraStasiunData]; }
function handleMainSearch(query) {
  const resultsDiv=document.getElementById('searchResults');
  if(!query||query.trim().length<1){ resultsDiv.classList.remove('show'); return; }
  const q=query.toLowerCase().trim(); const matches=getAllPlaces().filter(p=>p.name.toLowerCase().includes(q)||(p.area||'').toLowerCase().includes(q));
  if(matches.length===0) resultsDiv.innerHTML=`<div class="search-no-result">🔍 Tidak ditemukan</div>`;
  else resultsDiv.innerHTML=matches.slice(0,8).map(p=>{ const distHtml=(p.lat&&p.lng)?getDistanceHtml(p.lat,p.lng):''; return `<div class="search-result-item" onclick="bukaGoogleMaps(${p.lat||0},${p.lng||0},'${p.name.replace(/'/g,"\\'")}');document.getElementById('searchResults').classList.remove('show');"><span>${p.icon||'📍'}</span><div style="flex:1"><div style="font-weight:600">${p.name} ${distHtml}</div><div style="font-size:11px;color:var(--text3)">${p.area||''}</div></div></div>`; }).join('');
  resultsDiv.classList.add('show');
}
document.addEventListener('click',e=>{ const s=document.getElementById('mainSearch'),r=document.getElementById('searchResults'); if(!s.contains(e.target)&&!r.contains(e.target)) r.classList.remove('show'); });

function renderTiker() { document.getElementById('tickerContainer').innerHTML=ticketUpdates.map(t=>`<div class="update-ticker"><div class="ticker-dot" style="background:${t.dot}"></div><div class="ticker-text">${t.text}</div><div class="ticker-time">${t.time}</div></div>`).join(''); }
function renderHomeTollUpdates() { document.getElementById('homeTollUpdates').innerHTML=`<div class="section-title">Update Jalur Tol</div>${tollPopularData.slice(0,3).map(t=>`<div class="toll-card" ${t.id?`onclick="showTollDetail('${t.id}')"`:''}><div class="toll-header"><div class="toll-name">${t.name}</div><span class="status-tag ${t.status}">● ${t.status}</span></div><div class="toll-meta"><div class="toll-item">🕐 ${t.waktu}</div><div class="toll-item">📏 ${t.jarak}</div><div class="toll-item">💳 ${t.tarif}</div></div></div>`).join('')}`; }

function renderTempat(cat) {
  currentTempatFilter=cat; let filtered=cat==='favorit'?tempatData.filter(t=>isFavorited(t.name)):cat==='semua'?tempatData:tempatData.filter(t=>t.cat.includes(cat));
  if(sortByDistanceTempat&&locationEnabled) filtered=[...filtered].sort((a,b)=>(getDistanceKm(a.lat,a.lng)||999)-(getDistanceKm(b.lat,b.lng)||999));
  document.getElementById('tempatList').innerHTML=`<div class="section-title">${cat==='favorit'?'⭐ Favorit':'Tempat'} (${filtered.length})</div>`+filtered.map(t=>getPlaceCardHtml(t,`<div style="font-size:11px;color:var(--text3);margin-top:4px">📏 ${t.dist} · 💳 ${t.toll}</div>`)).join('');
}
function renderMall(cat) {
  currentMallFilter=cat; let filtered=cat==='favorit'?mallData.filter(m=>isFavorited(m.name)):cat==='semua'?mallData:mallData.filter(m=>m.cat.includes(cat));
  if(sortByDistanceMall&&locationEnabled) filtered=[...filtered].sort((a,b)=>(getDistanceKm(a.lat,a.lng)||999)-(getDistanceKm(b.lat,b.lng)||999));
  document.getElementById('mallList').innerHTML=`<div class="section-title">Mall & Hotel (${filtered.length})</div>`+filtered.map(m=>getPlaceCardHtml(m,`<div style="font-size:11px;color:var(--text2);margin-top:4px">🅿️ ${m.parkir}</div>`)).join('');
}
function renderGolf(cat) {
  currentGolfFilter=cat; let filtered=cat==='favorit'?golfData.filter(g=>isFavorited(g.name)):cat==='semua'?golfData:golfData.filter(g=>g.cat.includes(cat));
  if(sortByDistanceGolf&&locationEnabled) filtered=[...filtered].sort((a,b)=>(getDistanceKm(a.lat,a.lng)||999)-(getDistanceKm(b.lat,b.lng)||999));
  document.getElementById('golfList').innerHTML=`<div class="section-title">Golf (${filtered.length})</div>`+filtered.map(g=>getPlaceCardHtml(g)).join('');
}
function renderBandara() { document.getElementById('bandaraList').innerHTML=`<div class="section-title">Bandara & Stasiun</div>`+bandaraStasiunData.map(b=>getPlaceCardHtml(b)).join(''); }
function renderSos() { document.getElementById('sosList').innerHTML=`<div class="section-title">Kontak Darurat</div>${sosData.map(s=>`<div class="sos-card"><div class="sos-icon">${s.icon}</div><div class="sos-info"><div class="sos-name">${s.name}</div><div class="sos-number">${s.number}</div><div class="sos-desc">${s.desc}</div></div>${s.noCall?'':`<button class="sos-call" onclick="telp('${s.number}')">TELP</button>`}</div>`).join('')}`; }
function renderTollList() { document.getElementById('tollListSection').innerHTML=`<div class="section-title">Tarif Populer (Gol I)</div>${tollPopularData.map(t=>`<div class="toll-card" ${t.id?`onclick="showTollDetail('${t.id}')"`:''}><div class="toll-header"><div class="toll-name">${t.name}</div><div class="toll-tarif">${t.tarif}</div></div><div class="toll-meta"><div class="toll-item">📏 ${t.jarak}</div><div class="toll-item">🕐 ${t.waktu}</div><div class="toll-item"><span class="status-tag ${t.status}">● ${t.status}</span></div></div></div>`).join('')}`; }
function renderGGTable() { document.getElementById('ggTableContainer').innerHTML=`<table class="gg-table"><thead><tr><th>Ruas Jalan</th><th>Jam</th></tr></thead><tbody>${ggRuasData.map(r=>`<tr><td><div class="ruas">${r.ruas}</div><div style="font-size:11px;color:var(--text3)">${r.detail}</div></td><td>${r.jam.map(j=>`<div class="jam">${j}</div>`).join('')}</td></tr>`).join('')}</tbody></table>`; }
function renderTollCalculator() {
  document.getElementById('tollCalculator').innerHTML=`
    <div class="calc-card">
      <div class="calc-label">Hitung Tarif Tol</div>
      <select class="calc-select" id="tollAsal"><option value="">-- Gerbang Asal --</option>${Object.keys(tollRates).map(k=>k.split('-')[0]).filter((v,i,a)=>a.indexOf(v)===i).map(g=>`<option value="${g}">${g.replace(/_/g,' ')}</option>`).join('')}</select>
      <select class="calc-select" id="tollTujuan"><option value="">-- Gerbang Tujuan --</option>${Object.keys(tollRates).map(k=>k.split('-')[1]).filter((v,i,a)=>a.indexOf(v)===i).map(g=>`<option value="${g}">${g.replace(/_/g,' ')}</option>`).join('')}</select>
      <select class="calc-select" id="tollGol"><option value="1">Gol I (Sedan)</option><option value="2">Gol II</option><option value="3">Gol III</option><option value="4">Gol IV</option><option value="5">Gol V</option></select>
      <button class="calc-btn" onclick="hitungToll()">HITUNG TARIF</button>
      <div class="result-box" id="tollResult"><div class="result-title">Estimasi</div><div class="result-main" id="tollResultTarif">—</div><div class="result-sub" id="tollResultInfo">—</div><button class="btn-maps" style="margin-top:10px;width:100%;justify-content:center;" id="tollMapsBtn" onclick="bukaMapsToll()" hidden>🗺️ Buka Rute di Google Maps</button></div>
    </div>`;
}
function hitungToll() {
  const asal=document.getElementById('tollAsal').value, tujuan=document.getElementById('tollTujuan').value, gol=parseInt(document.getElementById('tollGol').value);
  if(!asal||!tujuan){ showToast('Pilih gerbang asal dan tujuan','warning'); return; }
  const key=`${asal}-${tujuan}`, keyRev=`${tujuan}-${asal}`, data=tollRates[key]||tollRates[keyRev];
  const result=document.getElementById('tollResult'), mapsBtn=document.getElementById('tollMapsBtn');
  result.classList.add('show');
  if(data){
    const tarif=Math.round(data.tarif*(golMultiplier[gol]||1)/500)*500;
    document.getElementById('tollResultTarif').textContent=`Rp ${tarif.toLocaleString('id')}`;
    document.getElementById('tollResultInfo').textContent=`Jarak ±${data.jarak} km · Estimasi ${data.waktu} menit · Gol ${gol}`;
    mapsBtn.hidden=false;
    lastTollAsal=asal; lastTollTujuan=tujuan;
  } else {
    document.getElementById('tollResultTarif').textContent='~Rp 10.000–50.000';
    document.getElementById('tollResultInfo').textContent='Rute tidak ditemukan.';
    mapsBtn.hidden=true;
  }
}
function bukaMapsToll() {
  if(!lastTollAsal||!lastTollTujuan) return;
  const key=`${lastTollAsal}-${lastTollTujuan}`, keyRev=`${lastTollTujuan}-${lastTollAsal}`, data=tollRates[key]||tollRates[keyRev];
  if(data) bukaGoogleMaps(data.lat,data.lng,`${lastTollAsal} → ${lastTollTujuan}`);
}
function showTollDetail(id) {
  const details={
    'jakarta-cikampek':{title:'Jakarta–Cikampek',sub:'Km 0–73',rows:[{label:'Tarif Gol I',val:'Rp 20.000',cls:'accent'},{label:'Jarak',val:'73 km'},{label:'Rest Area Km 19',val:'SPBU, Makan'}],lat:-6.3,lng:107.1},
    'jakarta-bogor':{title:'Jakarta–Bogor',sub:'Jagorawi',rows:[{label:'Tarif Gol I',val:'Rp 14.000',cls:'accent'},{label:'Jarak',val:'50 km'}],lat:-6.595,lng:106.795}
  };
  const d=details[id]; if(!d) return;
  document.getElementById('modalTitle').textContent=d.title;
  document.getElementById('modalSub').textContent=d.sub;
  document.getElementById('modalBody').innerHTML=d.rows.map(r=>`<div class="detail-row"><span>${r.label}</span><span class="detail-value ${r.cls||''}">${r.val}</span></div>`).join('')+`<button class="btn-maps" style="margin-top:12px;width:100%;" onclick="bukaGoogleMaps(${d.lat},${d.lng},'${d.title}')">🗺️ Buka Rute</button>`;
  document.getElementById('modalOverlay').classList.add('show');
}
function showNearMe() {
  if(!locationEnabled||userLat===null){ refreshLocation(); return; }
  const all=getAllPlaces().filter(p=>p.lat).map(p=>({...p,distance:getDistanceKm(p.lat,p.lng)})).filter(p=>p.distance!==null).sort((a,b)=>a.distance-b.distance).slice(0,5);
  document.getElementById('modalTitle').textContent='📍 Tempat Terdekat';
  document.getElementById('modalSub').textContent='5 tempat paling dekat';
  document.getElementById('modalBody').innerHTML=all.map((p,i)=>`<div class="place-card" onclick="bukaGoogleMaps(${p.lat},${p.lng},'${p.name}')"><div class="place-icon-box">${['🥇','🥈','🥉','4️⃣','5️⃣'][i]}</div><div class="place-info"><div class="place-name">${p.name} <span class="distance-badge near">${formatDistance(p.distance)}</span></div><div class="place-meta">📍 ${p.area||''}</div></div></div>`).join('');
  document.getElementById('modalOverlay').classList.add('show');
}
function closeModal(e) { if(e.target===document.getElementById('modalOverlay')) closeModalBtn(); }
function closeModalBtn() { document.getElementById('modalOverlay').classList.remove('show'); }
function telp(num) { window.location.href='tel:'+num; }

function switchPage(page) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.bottom-nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  const nav=document.getElementById('nav-'+page); if(nav) nav.classList.add('active');
  window.scrollTo(0,0);
  if(page==='settings'){ document.getElementById('themeToggle').checked=document.body.classList.contains('light-theme'); document.getElementById('unitSelect').value=currentUnit; }
}

function applyTheme(theme) {
  if(theme==='light') document.body.classList.add('light-theme');
  else document.body.classList.remove('light-theme');
  localStorage.setItem('supirInfoTheme', theme);
}
function toggleTheme() { applyTheme(document.body.classList.contains('light-theme')?'dark':'light'); }
function changeUnit() { currentUnit=document.getElementById('unitSelect').value; localStorage.setItem('supirInfoUnit',currentUnit); refreshAllViews(); }
function resetFavorites() { if(confirm('Hapus semua favorit?')){ favorites=[]; localStorage.setItem('supirInfoFavorites',JSON.stringify(favorites)); refreshAllViews(); } }

function initTheme() {
  const saved=localStorage.getItem('supirInfoTheme');
  if(saved) applyTheme(saved);
  else if(window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme('light');
}

function updateClock() { const n=new Date(); document.getElementById('ggClock').textContent=`${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}:${String(n.getSeconds()).padStart(2,'0')}`; const h=n.getHours(), act=(h>=6&&h<10)||(h>=16&&h<21); document.getElementById('ggActiveNow').textContent=act?'🔴 Sedang berlaku':'🟢 Tidak berlaku'; document.getElementById('ggActiveNow').style.color=act?'var(--red)':'var(--green)'; }
function updateDate() { const n=new Date(); document.getElementById('headerDate').textContent=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'][n.getDay()]+', '+n.getDate()+' '+(['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'][n.getMonth()])+' '+n.getFullYear(); const d=n.getDate(), we=n.getDay()===0||n.getDay()===6; document.getElementById('ggStatus').textContent=we?'BEBAS':(d%2!==0?'GANJIL':'GENAP'); document.getElementById('ggDetail').textContent=we?'Tidak berlaku akhir pekan':`Plat ${d%2!==0?'GANJIL':'GENAP'} dilarang 06-10 & 16-21`; }

function init() {
  initTheme();
  updateClock(); setInterval(updateClock,1000);
  updateDate(); setInterval(updateDate,60000);
  renderGGTable();
  renderTollCalculator();
  refreshAllViews();
  detectLocation();
  ['tempat','golf','mall'].forEach(type=>{
    document.getElementById(`${type}Filter`).innerHTML= ['semua',...new Set(eval(type+'Data').flatMap(d=>d.cat))].map(c=>`<div class="filter-tab${c==='semua'?' active':''}" onclick="filter${type.charAt(0).toUpperCase()+type.slice(1)}('${c}',this)">${c}</div>`).join('')+`<div class="filter-tab" onclick="filter${type.charAt(0).toUpperCase()+type.slice(1)}('favorit',this)" style="color:var(--yellow)">⭐ Favorit</div><button class="sort-btn" id="sort${type.charAt(0).toUpperCase()+type.slice(1)}Btn" onclick="toggleSort${type.charAt(0).toUpperCase()+type.slice(1)}()">📏 Urutkan Jarak</button>`;
  });
}
document.addEventListener('DOMContentLoaded', init);

function filterTempat(cat,el){ document.querySelectorAll('#tempatFilter .filter-tab').forEach(t=>t.classList.remove('active')); el.classList.add('active'); sortByDistanceTempat=false; renderTempat(cat); }
function filterGolf(cat,el){ document.querySelectorAll('#golfFilter .filter-tab').forEach(t=>t.classList.remove('active')); el.classList.add('active'); sortByDistanceGolf=false; renderGolf(cat); }
function filterMall(cat,el){ document.querySelectorAll('#mallFilter .filter-tab').forEach(t=>t.classList.remove('active')); el.classList.add('active'); sortByDistanceMall=false; renderMall(cat); }
function toggleSortTempat(){ sortByDistanceTempat=!sortByDistanceTempat; if(sortByDistanceTempat&&!locationEnabled){ showToast('📍 Izinkan lokasi','warning'); sortByDistanceTempat=false; return; } renderTempat(currentTempatFilter); }
function toggleSortGolf(){ sortByDistanceGolf=!sortByDistanceGolf; if(sortByDistanceGolf&&!locationEnabled){ showToast('📍 Izinkan lokasi','warning'); sortByDistanceGolf=false; return; } renderGolf(currentGolfFilter); }
function toggleSortMall(){ sortByDistanceMall=!sortByDistanceMall; if(sortByDistanceMall&&!locationEnabled){ showToast('📍 Izinkan lokasi','warning'); sortByDistanceMall=false; return; } renderMall(currentMallFilter); }

