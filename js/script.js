
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
// function openTiktok(warna){
//   const link = TIKTOK_LINKS[warna];
//   if(!link){
//     alert("Silahkan pilih warna terlebih dahulu");
//     return;
//   }
//   window.location.href = link; // aman utk TikTok Ads
// }

// function openShopee(warna){
//   const link = SHOPEE_LINKS [warna];
//   if(!link){
//     alert("Silahkan pilih warna terlebih dahulu");
//     return;
//   }
//   window.location.href = link; // aman utk TikTok Ads
// }

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
const customNotif = document.getElementById("customNotif");

const buyers = [
  "Siti - Bandung",
  "Ayu - Bekasi",
  "Nur - Surabaya",
  "Lina - Depok",
  "Rina - Bogor",
  "Adisty - Cirebon",
  "Dhea - Jakarta",
  "Andini - Tasikmalaya"
];

function showCustomNotif(){

  if(!customNotif) return;

  const randomBuyer = buyers[Math.floor(Math.random()*buyers.length)];
  const qty = Math.floor(Math.random()*3)+1;

  customNotif.innerHTML = `
    <div class="notif-avatar">🧕</div>
    <div class="notif-text">
      <b>${randomBuyer}</b><br>
      <span>Baru saja membeli ${qty} pcs</span>
    </div>
    <div class="notif-progress"></div>
  `;

  customNotif.classList.add("show");

  setTimeout(()=>{
    customNotif.classList.remove("show");
  },4000);
}

/* muncul tiap 20 detik */
setInterval(showCustomNotif, 20000);


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

function showNotif(message, type="error"){
  const notif = document.getElementById("customNotif");
  if(!notif) return;

  notif.innerText = message;
  notif.className = "custom-notif show " + type;

  setTimeout(()=>{
    notif.classList.remove("show");
  },2000);
}

function openTiktok(warna){
  const link = TIKTOK_LINKS[warna];

  if(!warna || warna === "Pilih Warna"){
    showNotif("⚠️ Silakan pilih warna terlebih dahulu", "error");
    return;
  }

  if(!link){
    showNotif("Link TikTok belum tersedia", "error");
    return;
  }

  showNotif("Mengarahkan ke TikTok Shop...", "success");

  setTimeout(()=>{
    window.location.href = link;
  },800);
}


function openShopee(warna){
  const link = SHOPEE_LINKS[warna];

  if(!warna || warna === "Pilih Warna"){
    showNotif("⚠️ Silakan pilih warna terlebih dahulu", "error");
    return;
  }

  if(!link){
    showNotif("Link Shopee belum tersedia", "error");
    return;
  }

  showNotif("Mengarahkan ke Shopee...", "success");

  setTimeout(()=>{
    window.location.href = link;
  },800);
}
function orderWA(){
  const warnaSelect = document.getElementById("warna");
  const jumlahInput = document.getElementById("jumlah");

  const warna = warnaSelect.value;
  const jumlah = parseInt(jumlahInput.value) || 1;

  if(!warna || warna === "Pilih Warna"){
    showNotif("⚠️ Silakan pilih warna terlebih dahulu", "error");
    return;
  }

  const total = jumlah * 49500;

  const pesan = `
Assalamu'alaikum 🙏
Saya ingin pesan Mukena Cici Muslimah

Warna : ${warna}
Jumlah : ${jumlah}
Total : Rp ${total.toLocaleString("id-ID")}
`;

  showNotif("💬 Menghubungkan ke WhatsApp...", "success");

  setTimeout(()=>{
    window.location.href =
      "https://wa.me/6281909944999?text=" + encodeURIComponent(pesan);
  },800);
}

function showBubble(text){
  const bubble = document.getElementById("bubbleNotif");

  bubble.innerText = text;
  bubble.classList.add("show");

  setTimeout(()=>{
    bubble.classList.remove("show");
  },4000);
}
