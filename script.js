(() => {
  "use strict";
  const birthday = new Date("2026-11-13T00:00:00+05:30");
  const $ = (id) => document.getElementById(id);


  // Background music. Browsers may block audible autoplay until the visitor
  // interacts with the page; retry silently in the background on first interaction.
 const backgroundMusic = document.getElementById("background-music");

if (backgroundMusic) {
    backgroundMusic.volume = 0.5;

    const startBackgroundMusic = async () => {
        try {
            await backgroundMusic.play();
            console.log("Background music started!");
        } catch (error) {
            console.log("Music playback error:", error);
        }
    };

    document.addEventListener("click", startBackgroundMusic, { once: true });
    document.addEventListener("touchstart", startBackgroundMusic, { once: true });

    startBackgroundMusic();
}

  // Countdown: uses India Standard Time for the birthday date.
  function updateCountdown() {
    const remaining = birthday.getTime() - Date.now();
    if (remaining <= 0) {
      ["days", "hours", "minutes", "seconds"].forEach(id => $(id).textContent = "00");
      $("countdown-note").textContent = "The day we've been waiting for is finally here. Happy Birthday! ♡";
      const banner = $("birthday-banner");
      if (banner.hidden) {
        banner.hidden = false;
        banner.scrollIntoView({ behavior: "smooth", block: "center" });
        celebrate();
      }
      return;
    }
    const seconds = Math.floor(remaining / 1000);
    $("days").textContent = String(Math.floor(seconds / 86400)).padStart(2, "0");
    $("hours").textContent = String(Math.floor((seconds % 86400) / 3600)).padStart(2, "0");
    $("minutes").textContent = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    $("seconds").textContent = String(seconds % 60).padStart(2, "0");
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Gentle floating hearts.
  const heartField = $("heart-field");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function addHeart() {
    if (reducedMotion || document.hidden) return;
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = ["♥", "♡", "✧"][Math.floor(Math.random() * 3)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (10 + Math.random() * 17) + "px";
    heart.style.animationDuration = (9 + Math.random() * 8) + "s";
    heartField.appendChild(heart);
    setTimeout(() => heart.remove(), 18000);
  }
  if (!reducedMotion) { for (let i = 0; i < 10; i++) setTimeout(addHeart, i * 500); setInterval(addHeart, 1100); }

  // Reveal sections as they enter the viewport.
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // Two-page love letter.
  let currentPage = 1;
  function showPage(page) {
    currentPage = page;
    $("letter-page-1").classList.toggle("active", page === 1);
    $("letter-page-2").classList.toggle("active", page === 2);
    $("page-indicator").textContent = `0${page} / 02`;
    $("prev-page").disabled = page === 1;
    $("next-page").textContent = page === 2 ? "Back to first page ↺" : "Next page →";
    document.querySelectorAll(".page-dots i").forEach((dot, index) => dot.classList.toggle("active", index + 1 === page));
  }
  $("prev-page").addEventListener("click", () => showPage(1));
  $("next-page").addEventListener("click", () => showPage(currentPage === 1 ? 2 : 1));

  // Gallery lightbox with keyboard and touch-friendly controls.
  const photoCards = [...document.querySelectorAll(".photo-card")];
  const photos = photoCards.map(card => ({ src: card.querySelector("img").getAttribute("src"), caption: card.querySelector(".photo-caption").textContent }));
  let activePhoto = 0;
  function openPhoto(index) {
    activePhoto = (index + photos.length) % photos.length;
    $("lightbox-image").src = photos[activePhoto].src;
    $("lightbox-caption").textContent = photos[activePhoto].caption;
    $("lightbox").classList.add("open");
    $("lightbox").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $("lightbox-close").focus();
  }
  function closePhoto() {
    $("lightbox").classList.remove("open");
    $("lightbox").setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  photoCards.forEach((card, index) => card.addEventListener("click", () => openPhoto(index)));
  $("lightbox-close").addEventListener("click", closePhoto);
  $("lightbox-prev").addEventListener("click", () => openPhoto(activePhoto - 1));
  $("lightbox-next").addEventListener("click", () => openPhoto(activePhoto + 1));
  $("lightbox").addEventListener("click", event => { if (event.target === $("lightbox")) closePhoto(); });
  document.addEventListener("keydown", event => {
    if (!$("lightbox").classList.contains("open")) return;
    if (event.key === "Escape") closePhoto();
    if (event.key === "ArrowLeft") openPhoto(activePhoto - 1);
    if (event.key === "ArrowRight") openPhoto(activePhoto + 1);
  });

  // Celebration confetti.
  function celebrate() {
    if (reducedMotion) return;
    const layer = $("confetti-layer");
    const colors = ["#ff75b5", "#ffc2df", "#b99aff", "#fff0a8", "#ffffff"];
    for (let i = 0; i < 105; i++) {
      const piece = document.createElement("i");
      piece.className = "confetti";
      piece.style.left = Math.random() * 100 + "%";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 1.2 + "s";
      piece.style.animationDuration = (2.5 + Math.random() * 2) + "s";
      piece.style.setProperty("--drift", (Math.random() * 180 - 90) + "px");
      layer.appendChild(piece);
      setTimeout(() => piece.remove(), 5500);
    }
    for (let i = 0; i < 20; i++) setTimeout(addHeart, i * 90);
  }
  $("wish-button").addEventListener("click", () => {
    $("wish-message").textContent = "May every beautiful wish in your heart find its way to you. You are so loved! 💗";
    celebrate();
    $("wish-button").textContent = "Wish sent with love 💖";
  });


})();