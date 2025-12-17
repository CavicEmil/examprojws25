const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

/* Burger menu toggle */
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

/* Carousel logic */
let currentIndex = 0;
let startX = 0;
let isDragging = false;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

/* Auto slide */
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}, 6000);

/* Touch events */
track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener('touchend', (e) => {
  if (!isDragging) return;

  const endX = e.changedTouches[0].clientX;
  handleSwipe(endX);
});

/* Mouse swipe */
track.addEventListener('mousedown', (e) => {
  startX = e.clientX;
  isDragging = true;
});

track.addEventListener('mouseup', (e) => {
  if (!isDragging) return;

  const endX = e.clientX;
  handleSwipe(endX);
});

function handleSwipe(endX) {
  const diff = startX - endX;

  if (diff > 50 && currentIndex < slides.length - 1) {
    currentIndex++;
  } else if (diff < -50 && currentIndex > 0) {
    currentIndex--;
  }

  updateCarousel();
  isDragging = false;
}

/* Dot click navigation */
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});