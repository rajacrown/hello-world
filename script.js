const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open ? 'true' : 'false');
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');
const testimonialDots = document.querySelector('.testimonial-dots');
let testimonialIndex = 0;
let testimonialTimer;

function updateTestimonials() {
  if (!testimonialTrack || !testimonialSlides.length) return;
  testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
  document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === testimonialIndex);
    dot.setAttribute('aria-selected', index === testimonialIndex ? 'true' : 'false');
  });
}

function goToTestimonial(index) {
  testimonialIndex = (index + testimonialSlides.length) % testimonialSlides.length;
  updateTestimonials();
  restartTestimonialTimer();
}

function restartTestimonialTimer() {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
    updateTestimonials();
  }, 6000);
}

if (testimonialTrack && testimonialSlides.length) {
  testimonialSlides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'testimonial-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Show testimonial ${index + 1}`);
    dot.addEventListener('click', () => goToTestimonial(index));
    testimonialDots?.appendChild(dot);
  });
  testimonialPrev?.addEventListener('click', () => goToTestimonial(testimonialIndex - 1));
  testimonialNext?.addEventListener('click', () => goToTestimonial(testimonialIndex + 1));
  updateTestimonials();
  restartTestimonialTimer();
}

document.getElementById('contact-form')?.addEventListener('submit', function(e){
  e.preventDefault();
  const data = new FormData(this);
  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');
  const subject = encodeURIComponent('EcomAssist UK enquiry from ' + name);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nRequirements:\n${message}`);
  window.location.href = `mailto:hello@ecomassistuk.com?subject=${subject}&body=${body}`;
  document.getElementById('form-note').textContent = 'Your email app should now open with the enquiry prepared.';
});
