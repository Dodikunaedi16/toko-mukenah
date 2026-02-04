
/* =========================
   KONFIGURASI UTAMA
   ========================= */
const harga = 49500;
const phone = "6281909944999";

const shopeeLinks = {
  "Pink Rose": "https://id.shp.ee/M5WvNXz",
  "Coklat Milo": "https://id.shp.ee/M5WvNXz",
  "Coklat Mocca": "https://id.shp.ee/M5WvNXz",
  "Abu Silver": "https://id.shp.ee/M5WvNXz"
};

const warna = document.getElementById('warna');
const jumlah = document.getElementById('jumlah');
const total = document.getElementById('total');

/* =========================
   HITUNG TOTAL
   ========================= */
function hitungTotal(){
  const jml = parseInt(jumlah.value) || 0;
  total.innerText = `Total: Rp ${(jml * harga).toLocaleString('id-ID')}`;
}

/* =========================
   ORDER WHATSAPP
   ========================= */
function orderWA(){
  const jml = parseInt(jumlah.value) || 1;
  const pesan = `
Pesan Mukena BilQis Muslimah
Bahan: Katun Micro
Warna: ${warna.value}
Jumlah: ${jml}
Total: Rp ${(jml * harga).toLocaleString('id-ID')}
`;
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(pesan)}`,
    '_blank'
  );
}

/* =========================
   ORDER PAKET
   ========================= */
function orderPaket(paket, hargaPaket){
  const pesan = `
${paket}
Total: Rp ${hargaPaket.toLocaleString('id-ID')}
`;
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(pesan)}`,
    '_blank'
  );
}

/* =========================
   OPEN SHOPEE PER WARNA
   ========================= */
function openShopee(w){
  if(shopeeLinks[w]){
    window.open(shopeeLinks[w], '_blank');
  }
}

/* =========================
   SCROLL ANIMATION
   ========================= */
document.querySelectorAll('.reveal').forEach(el=>{
  new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
      el.classList.add('show');
    }
  },{threshold:0.15}).observe(el);
});

/* =========================
   COUNTDOWN PROMO 12 JAM
   ========================= */
let endTime = localStorage.getItem('promoEndTime');

if(!endTime){
  const t = new Date();
  t.setHours(t.getHours() + 12);
  endTime = t.getTime();
  localStorage.setItem('promoEndTime', endTime);
}else{
  endTime = parseInt(endTime);
}

const timerEl = document.getElementById('timer');

function updateTimer(){
  if(!timerEl) return;

  const now = Date.now();
  const diff = endTime - now;

  if(diff <= 0){
    timerEl.innerText = "HABIS";
    localStorage.removeItem('promoEndTime');
    return;
  }

  // FOMO MENIT TERAKHIR
  if(diff <= 300000){
    timerEl.innerText = "⏰ PROMO SEGERA HABIS!";
    return;
  }

  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor(diff / (1000 * 60)) % 60;
  const s = Math.floor(diff / 1000) % 60;

  timerEl.innerText =
    `${String(h).padStart(2,'0')} : ${String(m).padStart(2,'0')} : ${String(s).padStart(2,'0')}`;
}

updateTimer();
setInterval(updateTimer, 1000);


/* =========================
   NOTIFIKASI PEMBELI
   ========================= */
const notif = document.getElementById('notif-beli');
const pembeli = [
  "Siti - Bandung",
  "Ayu - Bekasi",
  "Nur - Surabaya",
  "Lina - Depok",
  "Rina - Bogor",
  "adisty - Cirebon",
  "Dhea - Jakarta",
  "andini - tasikmalaya"
];

function showNotif(){
  if(!notif) return;
  const p = pembeli[Math.floor(Math.random() * pembeli.length)];
  notif.innerHTML = `🧕 <b>${p}</b><br>baru pesan Mukena`;
  notif.style.display = "block";
  setTimeout(()=>notif.style.display="none", 3000);
}

setInterval(showNotif, 50000);


function openShopeePaket(paket){
  const links = {
    paket3: "https://id.shp.ee/M5WvNXz",
    paket5: "https://id.shp.ee/M5WvNXz",
    paket10:"https://id.shp.ee/M5WvNXz"
  };

  if(!links[paket]){
    alert("Link Shopee belum tersedia");
    return;
  }

  window.location.href = links[paket]; // lebih aman utk TikTok Ads
}

