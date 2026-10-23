/* Motor Prime Automóveis - Scripts principais */
// ============ MENU MOBILE ============
const burgerBtn = document.getElementById('burgerBtn');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
burgerBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ============ CONTADORES DO HERO (odômetro) ============
const counters = document.querySelectorAll('[data-count]');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const isDecimal = target % 1 !== 0;
    let current = 0;
    const step = target / 60;
    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = isDecimal ? target.toFixed(1) : Math.round(target).toLocaleString('pt-BR');
        return;
      }
      el.textContent = isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString('pt-BR');
      requestAnimationFrame(tick);
    };
    tick();
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => counterIO.observe(el));

// ============ COUNTDOWN PERSISTENTE (localStorage) ============
(function initCountdown(){
  const KEY = 'motorprime_promo_deadline';
  let deadline = localStorage.getItem(KEY);
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  if (!deadline || new Date(deadline).getTime() < Date.now()) {
    deadline = new Date(Date.now() + SEVEN_DAYS).toISOString();
    localStorage.setItem(KEY, deadline);
  }
  const dEl = document.getElementById('cd-dias');
  const hEl = document.getElementById('cd-horas');
  const mEl = document.getElementById('cd-min');
  const sEl = document.getElementById('cd-seg');
  function pad(n){ return String(n).padStart(2,'0'); }
  function update(){
    const diff = new Date(deadline).getTime() - Date.now();
    if (diff <= 0) {
      dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00';
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
    const secs = Math.floor((diff % (1000*60)) / 1000);
    dEl.textContent = pad(days);
    hEl.textContent = pad(hours);
    mEl.textContent = pad(mins);
    sEl.textContent = pad(secs);
  }
  update();
  setInterval(update, 1000);
})();

// ============ HEADER: SOMBRA AO ROLAR ============
const headerEl = document.querySelector('header');
window.addEventListener('scroll', () => {
  headerEl.style.boxShadow = window.scrollY > 40 ? '0 8px 24px rgba(0,0,0,0.35)' : 'none';
});
