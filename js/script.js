
/* ======================================
   KONFIGURASI UTAMA
   ====================================== */
const HARGA_SATUAN = 49500;
const PHONE = "6281909944999";

/* LINK SHOPEE (WAJIB LINK PRODUK / SHORTLINK) */
const TIKTOK_LINKS = {
  "Pink Rose": "https://vt.tokopedia.com/t/ZS9JPCcUFhpbb-yOHON/",
  "Coklat Milo": "https://vt.tokopedia.com/t/ZS9JPCcUFhpbb-yOHON/",
  "Coklat Mocca": "https://vt.tokopedia.com/t/ZS9JPCcUFhpbb-yOHON/",
  "Abu Silver": "https://vt.tokopedia.com/t/ZS9JPCcUFhpbb-yOHON/"
};

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
   OPEN Tik tok PER WARNA
   ====================================== */
function openTiktok(warna){
  const link = TIKTOK_LINKS[warna];
  if(!link){
    alert("Silahkan pilih warna terlebih dahulu");
    return;
  }
  window.location.href = link; // aman utk TikTok Ads
}

function openShopee(warna){
  const link = SHOPEE_LINKS [warna];
  if(!link){
    alert("Silahkan pilih warna terlebih dahulu");
    return;
  }
  window.location.href = link; // aman utk TikTok Ads
}

/* ======================================
   SHOPEE PAKET
   ====================================== */
function openShopeePaket(paket){
  const links = {
    paket3 : "https://vt.tokopedia.com/t/ZS9JPHJPsv2FA-nrXfM/",
    paket5 : "https://vt.tokopedia.com/t/ZS9JPH82rUuvj-uhIHR/",
    paket10: "https://vt.tokopedia.com/t/ZS9JPH22GYDPt-fk6MX/"
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

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth > 768) return;

  const wrapper = document.querySelector(".paket-wrapper");
  const cards = document.querySelectorAll(".paket");
  const bestCard = document.querySelector(".paket.best");

  let index = 0;
  let autoSlide;
  let isTouched = false;

  // === AUTO FOKUS KE PAKET THR ===
  if (bestCard) {
    setTimeout(() => {
      wrapper.scrollTo({
        left: bestCard.offsetLeft - 16,
        behavior: "smooth"
      });
      index = [...cards].indexOf(bestCard);
    }, 600);
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      if (isTouched) return;

      index++;
      if (index >= cards.length) index = 0;

      wrapper.scrollTo({
        left: cards[index].offsetLeft - 16,
        behavior: "smooth"
      });
    }, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  // === PAUSE SAAT DISENTUH ===
  wrapper.addEventListener("touchstart", () => {
    isTouched = true;
    stopAutoSlide();
  });

  wrapper.addEventListener("touchend", () => {
    isTouched = false;
    startAutoSlide();
  });

  // === SUPPORT MOUSE (DESKTOP KECIL) ===
  wrapper.addEventListener("mouseenter", stopAutoSlide);
  wrapper.addEventListener("mouseleave", startAutoSlide);

  startAutoSlide();
});

/* =========================
   AUTO SLIDE VIDEO MOBILE
   ========================= */

const videoGrid = document.querySelector('.video-grid');

if(videoGrid){

  let index = 0;
  const slides = videoGrid.children;
  const totalSlides = slides.length;

  function autoSlide(){

    // hanya jalan di mobile
    if(window.innerWidth > 768) return;

    index++;

    if(index >= totalSlides){
      index = 0;
    }

    const slideWidth = slides[0].offsetWidth + 18; // + gap
    videoGrid.scrollTo({
      left: slideWidth * index,
      behavior: "smooth"
    });

  }

  setInterval(autoSlide, 4000); // 4 detik

}

