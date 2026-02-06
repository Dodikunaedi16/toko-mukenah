
/* ======================================
   KONFIGURASI UTAMA
   ====================================== */
const HARGA_SATUAN = 49500;
const PHONE = "6281909944999";

/* LINK SHOPEE (WAJIB LINK PRODUK / SHORTLINK) */
const SHOPEE_LINKS = {
  "Pink Rose": "https://id.shp.ee/M5WvNXz",
  "Coklat Milo": "https://id.shp.ee/M5WvNXz",
  "Coklat Mocca": "https://id.shp.ee/M5WvNXz",
  "Abu Silver": "https://id.shp.ee/M5WvNXz"
};

/* ======================================
   ELEMENT
   ====================================== */
const warnaEl  = document.getElementById("warna");
const jumlahEl = document.getElementById("jumlah");
const totalEl  = document.getElementById("total");
const timerEl  = document.getElementById("timer");
const notifEl  = document.getElementById("notif-beli");

/* ======================================
   HITUNG TOTAL
   ====================================== */
function hitungTotal(){
  const jml = parseInt(jumlahEl?.value);
  if(!jml || jml < 1){
    totalEl.innerText = "Total: Rp 0";
    return;
  }
  totalEl.innerText =
    `Total: Rp ${(jml * HARGA_SATUAN).toLocaleString("id-ID")}`;
}

/* ======================================
   ORDER WHATSAPP
   ====================================== */
function orderWA(){
  const warna = warnaEl.value;
  const jml = parseInt(jumlahEl.value) || 1;

  if(warna === "Pilih Warna"){
    alert("Silakan pilih warna terlebih dahulu");
    return;
  }

  const pesan =
`Assalamu’alaikum 👋
Saya ingin pesan Mukena BilQis Muslimah

🧕 Bahan: Katun Micro
🎨 Warna: ${warna}
📦 Jumlah: ${jml}
💰 Total: Rp ${(jml * HARGA_SATUAN).toLocaleString("id-ID")}

Mohon info stok 🙏`;

  window.open(
    `https://wa.me/${PHONE}?text=${encodeURIComponent(pesan)}`,
    "_blank"
  );
}

/* ======================================
   ORDER PAKET VIA WHATSAPP
   ====================================== */
function orderPaket(nama, harga){
  const pesan =
`Pesan ${nama}
Mukena BilQis Muslimah
Total: Rp ${harga.toLocaleString("id-ID")}`;

  window.open(
    `https://wa.me/${PHONE}?text=${encodeURIComponent(pesan)}`,
    "_blank"
  );
}

/* ======================================
   OPEN SHOPEE PER WARNA
   ====================================== */
function openShopee(warna){
  const link = SHOPEE_LINKS[warna];
  if(!link){
    alert("Link Shopee belum tersedia");
    return;
  }
  window.location.href = link; // aman utk TikTok Ads
}

/* ======================================
   SHOPEE PAKET
   ====================================== */
function openShopeePaket(paket){
  const links = {
    paket3 : "https://id.shp.ee/M5WvNXz",
    paket5 : "https://id.shp.ee/M5WvNXz",
    paket10: "https://id.shp.ee/M5WvNXz"
  };
  if(!links[paket]){
    alert("Link paket belum tersedia");
    return;
  }
  window.location.href = links[paket];
}

/* ======================================
   SCROLL ANIMATION
   ====================================== */
document.querySelectorAll(".reveal").forEach(el=>{
  new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
      el.classList.add("show");
    }
  },{threshold:0.15}).observe(el);
});

/* ======================================
   COUNTDOWN PROMO 12 JAM (ANTI RESET)
   ====================================== */
let endTime = localStorage.getItem("promoEndTime");
if(!endTime){
  const t = new Date();
  t.setHours(t.getHours() + 12);
  endTime = t.getTime();
  localStorage.setItem("promoEndTime", endTime);
}else{
  endTime = parseInt(endTime);
}

function updateTimer(){
  if(!timerEl) return;

  const diff = endTime - Date.now();
  if(diff <= 0){
    timerEl.innerText = "⛔ PROMO HABIS";
    localStorage.removeItem("promoEndTime");
    return;
  }

  if(diff <= 300000){
    timerEl.innerText = "🔥 PROMO SEGERA HABIS!";
    return;
  }

  const h = Math.floor(diff / 3600000);
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;

  timerEl.innerText =
    `${String(h).padStart(2,"0")} : ${String(m).padStart(2,"0")} : ${String(s).padStart(2,"0")}`;
}

setInterval(updateTimer, 1000);
updateTimer();

/* ======================================
   NOTIFIKASI PEMBELI (FOMO)
   ====================================== */
const pembeli = [
  "Siti - Bandung",
  "Ayu - Bekasi",
  "Nur - Surabaya",
  "Lina - Depok",
  "Rina - Bogor",
  "Dhea - Jakarta"
];

function showNotif(){
  if(!notifEl) return;
  const p = pembeli[Math.floor(Math.random()*pembeli.length)];
  notifEl.innerHTML = `🧕 <b>${p}</b><br>baru checkout`;
  notifEl.style.display = "block";
  setTimeout(()=>notifEl.style.display="none",3000);
}

setInterval(showNotif, 45000);

