/* ===== Vitality Chiropractic & Rehab - Main JS ===== */

document.addEventListener('DOMContentLoaded', function() {

  // --- Hero Slider ---
  const slides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let heroInterval;

  function showSlide(index) {
    slides.forEach(function(s) { s.classList.remove('active'); });
    heroDots.forEach(function(d) { d.classList.remove('active'); });
    if (slides[index]) slides[index].classList.add('active');
    if (heroDots[index]) heroDots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    var next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function startHeroSlider() {
    heroInterval = setInterval(nextSlide, 5000);
  }

  if (slides.length > 1) {
    startHeroSlider();
    heroDots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        clearInterval(heroInterval);
        showSlide(parseInt(this.dataset.slide));
        startHeroSlider();
      });
    });
  }

  // --- Testimonials Slider ---
  var track = document.querySelector('.testimonials-track');
  var tCards = document.querySelectorAll('.testimonial-card');
  var tDots = document.querySelectorAll('.t-dot');
  var tCurrentPage = 0;

  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function updateTestimonialSlider() {
    if (!track || tCards.length === 0) return;
    var perView = getCardsPerView();
    var cardWidth = tCards[0].offsetWidth + 24; // gap
    var offset = tCurrentPage * perView * cardWidth;
    track.style.transform = 'translateX(-' + offset + 'px)';
    tDots.forEach(function(d) { d.classList.remove('active'); });
    if (tDots[tCurrentPage]) tDots[tCurrentPage].classList.add('active');
  }

  tDots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      tCurrentPage = parseInt(this.dataset.slide);
      updateTestimonialSlider();
    });
  });

  // Auto-cycle testimonials
  var tAutoInterval = setInterval(function() {
    if (!track || tCards.length === 0) return;
    var perView = getCardsPerView();
    var maxPages = Math.ceil(tCards.length / perView) - 1;
    tCurrentPage = (tCurrentPage + 1) > maxPages ? 0 : tCurrentPage + 1;
    updateTestimonialSlider();
  }, 6000);

  window.addEventListener('resize', function() {
    tCurrentPage = 0;
    updateTestimonialSlider();
  });

  // --- Mobile Navigation ---
  var hamburger = document.getElementById('hamburgerBtn');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      // Toggle hamburger animation
      var spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // --- Dropdown toggle on mobile ---
  var dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(function(dd) {
    var toggle = dd.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dd.classList.toggle('open');
        }
      });
    }
  });

  // --- Contact Form ---
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will connect with you shortly.');
      form.reset();
    });
  }

  // --- Scroll header shadow ---
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      }
    });
  }

});
