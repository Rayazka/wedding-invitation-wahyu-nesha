AOS.init({
  once: false, // Animasi cuma jalan sekali (biar gak gerak2 terus pas scroll naik turun)
  duration: 1000, // Durasi animasi (1 detik)
});

// --- FITUR URL CUSTOM NAMA TAMU ---
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get('to') || urlParams.get('u'); 
    if (namaTamu) {
        const heroNama = document.getElementById('namaTamu');
        if (heroNama) {
            heroNama.innerText = namaTamu;
        }
        const inputNama = document.getElementById('nama');
        if (inputNama) {
            inputNama.value = namaTamu;
        }
    }
    // Jika tidak ada parameter, biarkan default "Tamu Undangan" (sesuai HTML)
});

// --- SCROLLSPY MODERN (INTERSECTION OBSERVER) ---
document.addEventListener("DOMContentLoaded", function() {
    
    // Ambil semua section yang mau dilacak
    const sections = document.querySelectorAll("section"); 
    const navLinks = document.querySelectorAll(".nav-link");

    // Config: Trigger saat 50% section terlihat di layar
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Ambil ID section yang sedang aktif
                let current = entry.target.getAttribute("id");

                // Mapping Khusus:
                // Kalau user ada di #welcome atau #home, kita anggap dia di menu "Home" (#welcome)
                if (current === "home") {
                    current = "welcome";
                }

                if(current === "gift") {
                    current = "gallery";
                }

                // Update Class Active di Navbar
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    
                    // Cek href tombol navbar
                    if (link.getAttribute("href") === `#${current}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    // Mulai mengamati setiap section
    sections.forEach((section) => {
        observer.observe(section);
    });
    
});

// --- 1. LOGIC PENERIMA TAMU (Auto-Fill Nama) ---
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get('tamu'); 

    if (namaTamu) {
        // Tampilkan di Cover Depan
        document.getElementById('namaTamu').innerText = namaTamu; 
        
        // Auto-fill di Form RSVP
        const inputNama = document.getElementById('nama');
        if(inputNama) inputNama.value = namaTamu;
    }
});

// --- 2. LOGIC BUKA UNDANGAN ---
function bukaUndangan() {
    const hero = document.getElementById('hero');
    const mainContent = document.getElementById('mainContent');
    const btnMusic = document.getElementById('btnMusic');
    
    // Animasi Scroll ke Atas
    hero.style.transition = "all 0.8s ease-in-out";
    hero.style.marginTop = "-100vh"; 
    hero.style.opacity = "0";
    
    // Tampilkan Konten Utama
    mainContent.classList.remove('d-none');
    
    // Munculkan Tombol Musik
    btnMusic.classList.remove('d-none');
    
    // Play Musik Otomatis
    playAudio();

    // Scroll ke paling atas konten utama
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 500);
}

// --- LOGIC MUSIK (FIXED) ---
// Hapus deklarasi global 'const audio = ...' di paling atas agar tidak error null

function playAudio() {
    // Pindahkan pencarian elemen ke dalam fungsi
    var audio = document.getElementById('bgMusic');
    var iconMusic = document.getElementById('iconMusic');
    
    // Cek apakah audio ditemukan
    if (audio) {
        audio.loop = true;
        audio.play()
            .then(() => {
                isPlaying = true;
                iconMusic.classList.add('fa-spin');
                iconMusic.classList.remove('fa-volume-xmark');
                iconMusic.classList.add('fa-compact-disc');
            })
            .catch(error => {
                console.log("Audio play failed:", error);
                isPlaying = false;
                // Reset icon jika gagal
                iconMusic.classList.remove('fa-spin');
                iconMusic.classList.remove('fa-compact-disc');
                iconMusic.classList.add('fa-volume-xmark');
            });
    } else {
        console.error("Elemen Audio tidak ditemukan!");
    }
}

function toggleMusic() {
    // Pindahkan pencarian elemen ke dalam fungsi juga
    var audio = document.getElementById('bgMusic');
    var iconMusic = document.getElementById('iconMusic');

    if (audio) {
        if (isPlaying) {
            audio.pause();
            iconMusic.classList.remove('fa-spin'); 
            iconMusic.classList.remove('fa-compact-disc'); 
            iconMusic.classList.add('fa-volume-xmark'); 
        } else {
            audio.play();
            iconMusic.classList.add('fa-spin'); 
            iconMusic.classList.remove('fa-volume-xmark');
            iconMusic.classList.add('fa-compact-disc'); 
        }
        isPlaying = !isPlaying;
    }
}


// --- 5. LOGIC COUNTDOWN TIMER ---
const weddingDate = new Date("Feb 14, 2026 16:00:00").getTime();

const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const elDay = document.getElementById("day");
    if(elDay) { // Cek elemen ada dulu biar ga error
        document.getElementById("day").innerText = days;
        document.getElementById("hour").innerText = hours;
        document.getElementById("minute").innerText = minutes;
        document.getElementById("second").innerText = seconds;
    }

    if (distance < 0) {
        clearInterval(countdown);
        if(elDay) {
            document.getElementById("day").innerText = "0";
            document.getElementById("hour").innerText = "0";
            document.getElementById("minute").innerText = "0";
            document.getElementById("second").innerText = "0";
        }
    }
}, 1000);

// --- KONFIGURASI ---

// GANTI DENGAN URL APP SCRIPT KAMU YANG BARU

const scriptURL = 'https://script.google.com/macros/s/AKfycbzrNHnwjuM4_1RU7mx42-K6DzTIWopfcI0QFBEsoAmt9b5PxZ8ZCQo4WmNQ2bsUjS1h/exec'; 


// --- LOGIC KIRIM FORM ---
const form = document.getElementById('rsvpForm');
const btnKirim = document.querySelector('.btn-kirim');


if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault(); // MENCEGAH RELOAD HALAMAN (PENTING!)
        // 1. Ubah tombol jadi loading
        btnKirim.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Mengirim...';
        btnKirim.disabled = true;
        // 2. Kirim data ke Google Sheet (Fetch API)
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                // 3. Jika sukses...
                alert("Terima kasih! Ucapan & Konfirmasi Anda berhasil dikirim.");

                // Ambil data inputan user untuk ditampilkan di layar
                const nama = document.getElementById('nama').value;
                const jumlah = document.getElementById('jumlah').value;
                const status = document.getElementById('status').value;
                let pesan = document.getElementById('pesan').value;

                // Kalau pesan kosong, kasih default
                if (!pesan || pesan.trim() === "") {
                    pesan = "";
                }
                // Reset form & tombol
                form.reset();
                btnKirim.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i> Kirim Konfirmasi';
                btnKirim.disabled = false;

            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("Yah, gagal mengirim pesan. Coba lagi ya!");
                btnKirim.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i> Kirim Konfirmasi';
                btnKirim.disabled = false;
            });

    });

}

// --- LOGIC GALLERY MODAL ---
function showModal(element) {
    // 1. Ambil URL gambar dari elemen yang diklik
    const imgElement = element.querySelector('img');
    const src = imgElement.src;

    // 2. Masukkan URL ke elemen gambar di dalam Modal
    const modalImage = document.getElementById('modalImage');
    modalImage.src = src;

    // 3. Tampilkan Modal Bootstrap
    const myModal = new bootstrap.Modal(document.getElementById('galleryModal'));
    myModal.show();
}