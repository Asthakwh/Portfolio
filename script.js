/* ════════════════════════════════════════════════════════
   script.js  —  All dynamic behaviour for the portfolio.
   Depends on: data.js (must be loaded before this file)
   ════════════════════════════════════════════════════════ */

/* ══ 1. RENDER SKILL CARDS ═══════════════════════════════
   Reads SKILLS array from data.js and builds cards into
   #skillsGrid. Each card has an icon, name, level label,
   and a progress bar that animates when scrolled into view.
   ════════════════════════════════════════════════════════ */
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  SKILLS.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'skill-card reveal';
    card.style.transitionDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="skill-icon">${s.icon}</div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-level">${s.level}</div>
      <div class="skill-bar-wrap">
        <div class="skill-bar" data-pct="${s.pct}"></div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ══ 2. RENDER PROJECT CARDS ═════════════════════════════
   Reads PROJECTS array from data.js and builds cards into
   #projectsGrid. Each card shows icon, title, description,
   and technology badge chips.
   ════════════════════════════════════════════════════════ */
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  PROJECTS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.style.transitionDelay = `${i * 0.1}s`;
    const badges = p.badges.map(b => `<span class="badge">${b}</span>`).join('');
    card.innerHTML = `
      <div class="project-icon">${p.icon}</div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="project-badges">${badges}</div>
    `;
    grid.appendChild(card);
  });
}

/* ══ 3. CAROUSEL (Articles) ══════════════════════════════
   Reads ARTICLES array from data.js, builds slides and
   dot indicators. Auto-advances every 5 seconds.
   ════════════════════════════════════════════════════════ */
let slideIdx = 0;

function renderCarousel() {
  const slidesEl = document.getElementById('carouselSlides');
  const dotsEl   = document.getElementById('carouselDots');

  ARTICLES.forEach((a, i) => {
    // Slide
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
      <p class="slide-meta">${a.meta}</p>
      <h3>${a.title}</h3>
      <p>${a.desc}</p>
      <a class="slide-link" href="${a.link}">Read more →</a>
    `;
    slidesEl.appendChild(slide);

    // Dot indicator
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goSlide(i));
    dotsEl.appendChild(dot);
  });
}

function goSlide(n) {
  slideIdx = (n + ARTICLES.length) % ARTICLES.length;
  document.getElementById('carouselSlides').style.transform =
    `translateX(-${slideIdx * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) =>
    d.classList.toggle('active', i === slideIdx)
  );
}

// Called by the prev/next buttons in index.html
function moveSlide(step) {
  goSlide(slideIdx + step);
}

// Auto-advance carousel
setInterval(() => moveSlide(1), 5000);

/* ══ 4. RENDER SOCIAL LINKS ══════════════════════════════
   Reads SOCIALS array from data.js and builds links into
   #socialLinks.
   ════════════════════════════════════════════════════════ */
function renderSocials() {
  const container = document.getElementById('socialLinks');
  SOCIALS.forEach(s => {
    const a = document.createElement('a');
    a.href   = s.url;
    a.target = '_blank';
    a.className = 'social-link';
    a.innerHTML = `
      <span class="social-icon">${s.icon}</span>
      <div class="social-info">
        <strong>${s.label}</strong>
        <small>${s.sub}</small>
      </div>
    `;
    container.appendChild(a);
  });
}

/* ══ 5. COUNTER ANIMATION ════════════════════════════════
   Animates the stat numbers in the hero section from 0
   up to their data-target values.
   ════════════════════════════════════════════════════════ */
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target  = parseFloat(el.dataset.target);
    const isFloat = String(target).includes('.');
    let current   = 0;
    const step    = target / 60;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 25);
  });
}

/* ══ 6. SCROLL REVEAL + SKILL BAR TRIGGER ════════════════
   Uses IntersectionObserver to:
   - Fade in .reveal elements as they enter the viewport
   - Trigger counter animation when the hero is first seen
   - Trigger skill bar fill when the skills section appears
   ════════════════════════════════════════════════════════ */
let countersTriggered = false;
let barsTriggered     = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Fade in
    entry.target.classList.add('visible');

    // Hero counters (fire once)
    if (!countersTriggered && entry.target.closest('#home')) {
      countersTriggered = true;
      setTimeout(animateCounters, 800);
    }

    // Skill bars (fire once)
    if (!barsTriggered && entry.target.closest('#skills')) {
      barsTriggered = true;
      setTimeout(() => {
        document.querySelectorAll('.skill-bar').forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });
      }, 300);
    }
  });
}, { threshold: 0.12 });

// Observe all .reveal elements (including dynamically added ones)
function observeRevealElements() {
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  observer.observe(document.querySelector('#home')); // for counters
}

/* ══ 7. COMMENT SYSTEM ═══════════════════════════════════
   Lets visitors type a comment and add it to a live list.
   ════════════════════════════════════════════════════════ */
function submitComment() {
  const input = document.getElementById('commentInput');
  const text  = input.value.trim();
  if (!text) return;

  const list = document.getElementById('comment-list');
  const item = document.createElement('div');
  item.className   = 'comment-item';
  item.textContent = '💬 ' + text;
  list.prepend(item);
  input.value = '';
}

/* ══ 8. REGISTER FORM ════════════════════════════════════
   Basic client-side validation with friendly messages.
   ════════════════════════════════════════════════════════ */
// ── GOOGLE FORM CONFIG ────────────────────────────────
// Paste your Google Form action URL here:
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScA_hgSnSDJn2Rh_djjmExpmBdxkLbPB76WRlYBTBtlya13Gw/viewform?usp=sharing&ouid=108456678473674333646';

// Paste your entry IDs here (from Step 2):
const FORM_ENTRIES = {
  username: 'entry.907910789',
  profession: 'entry.524257717',
  country:  'entry.497393617',
  suggestion: 'entry.215290902',
};

function submitForm() {
  const name       = document.getElementById('regName').value.trim();
  const profession = document.getElementById('regProfession').value.trim();
  const country    = document.getElementById('regCountry').value;
  const suggestion = document.getElementById('regSuggestion').value.trim();
  const msg        = document.getElementById('formMsg');

  // Validation — only username is required
  if (!name) {
    msg.textContent  = '⚠️  Please enter your username.';
    msg.style.color  = 'var(--accent3)';
    msg.style.display = 'block';
    return;
  }

  // Build form data matching Google Form entry IDs
  const body = new URLSearchParams();
  body.append(FORM_ENTRIES.username,   name);
  body.append(FORM_ENTRIES.profession, profession);
  body.append(FORM_ENTRIES.country,    country);
  body.append(FORM_ENTRIES.suggestion, suggestion);

  fetch(GOOGLE_FORM_URL, {
    method: 'POST',
    mode:   'no-cors',
    body:   body,
  })
  .then(() => {
    msg.textContent   = `✅  Submitted! Thanks, ${name}!`;
    msg.style.color   = 'var(--accent2)';
    msg.style.display = 'block';
    resetForm();
  })
  .catch(() => {
    msg.textContent   = '❌  Submission failed. Please try again.';
    msg.style.color   = 'var(--accent3)';
    msg.style.display = 'block';
  });
}

function resetForm() {
  ['regName', 'regProfession', 'regSuggestion'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('regCountry').value = '';
  document.getElementById('formMsg').style.display = 'none';
}

/* ══ 9. ACTIVE NAV HIGHLIGHT ═════════════════════════════
   Highlights the nav link that matches the currently
   visible section as the user scrolls.
   ════════════════════════════════════════════════════════ */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--accent)'
        : '';
    });
  });
}

/* ══ INIT ════════════════════════════════════════════════
   Run everything once the DOM is ready.
   ════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  renderProjects();
  renderCarousel();
  renderSocials();
  observeRevealElements();
  initNavHighlight();
});
