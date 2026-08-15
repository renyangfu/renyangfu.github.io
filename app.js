(() => {
  'use strict';

  const DATA = window.SITE_DATA;
  if (!DATA) {
    console.error('SITE_DATA 未加载，请检查 data.js。');
    return;
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const sectionById = Object.fromEntries(DATA.sections.map(section => [section.id, section]));

  const icons = {
    arrow: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M14 7l5 5-5 5"/></svg>`,
    external: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-9 9M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>`,
    course: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 5.5h10.5A2.5 2.5 0 0 1 18 8v10.5H7.5A2.5 2.5 0 0 0 5 21V5.5Zm0 0V21m3-11h7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
  };

  function sectionChrome(section, bodyHtml, extraClass = '') {
    return `
      <section class="section-block ${extraClass}" id="${section.id}" aria-labelledby="${section.id}-title">
        <div class="section-grid">
          <div class="section-marker reveal">
            <span class="section-number">${section.number}</span>
          </div>
          <div class="section-main">
            <div class="section-heading-row reveal">
              <h2 class="section-title" id="${section.id}-title">${section.title}</h2>
              <span class="section-title-en">${section.en}</span>
            </div>
            ${bodyHtml}
          </div>
        </div>
      </section>`;
  }

  function renderHero() {
    const p = DATA.profile;
    $('#hero').innerHTML = `
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="hero-eyebrow">Academic Homepage · Qinghai University</p>
          <h1 class="hero-name-cn">${escapeHtml(p.name)}</h1>
          <p class="hero-name-en">Yangfu Ren</p>
          <div class="hero-rule"></div>
          <p class="hero-role">${escapeHtml(p.title)}</p>
          <a class="hero-institute" href="${p.institute.url}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(p.institute.name)} ${icons.external}
          </a>
          <p class="hero-focus">${p.researchFocus.map(escapeHtml).join(' · ')}</p>
          <p class="hero-keywords">${p.keywords.map(escapeHtml).join(' / ')}</p>
          <div class="hero-actions">
            <a class="button button-primary magnetic" href="#publications">查看学术成果 ${icons.arrow}</a>
            <a class="button button-secondary magnetic" href="#contact">联系我 ${icons.arrow}</a>
          </div>
        </div>

        <div class="hero-visual" aria-label="虚实空间与重定向行走抽象示意">
          <div class="spatial-stage" id="spatialStage">
            ${spatialSvg()}
          </div>
        </div>
      </div>
      <div class="hero-scroll-cue" aria-hidden="true">Scroll<span></span></div>`;

    requestAnimationFrame(() => {
      $$('.spatial-path-virtual, .spatial-path-real').forEach(path => {
        try { path.style.setProperty('--path-length', `${Math.ceil(path.getTotalLength())}`); } catch (_) {}
      });
    });
  }

  function spatialSvg() {
    const gridX = Array.from({length: 10}, (_, i) => {
      const x1 = 118 + i * 48;
      return `<line x1="${x1}" y1="372" x2="${x1 + 150}" y2="205"/>`;
    }).join('');
    const gridY = Array.from({length: 8}, (_, i) => {
      const y = 232 + i * 24;
      return `<line x1="168" y1="${y}" x2="594" y2="${y}" transform="skewX(-39)"/>`;
    }).join('');

    return `
      <svg class="spatial-svg" viewBox="0 0 720 540" role="img" aria-labelledby="spatialTitle spatialDesc">
        <title id="spatialTitle">虚拟空间与物理空间行走路径示意</title>
        <desc id="spatialDesc">以抽象网格、物理空间、虚拟空间和弯曲路径表达虚拟现实与重定向行走研究。</desc>
        <g class="spatial-grid">${gridX}${gridY}</g>
        <path class="spatial-axis" d="M166 405 L564 405"/>
        <path class="spatial-axis" d="M166 405 L318 236"/>
        <path class="spatial-axis" d="M564 405 L638 322"/>

        <path class="spatial-volume" d="M330 130 L550 160 L625 273 L405 244 Z"/>
        <path class="spatial-volume-dash" d="M330 130 L330 256 M550 160 L550 286 M625 273 L625 393 M405 244 L405 365"/>
        <path class="spatial-volume" d="M330 256 L550 286 L625 393 L405 365 Z"/>

        <path class="spatial-path-glow" d="M190 407 C250 390, 290 403, 340 370 C392 336, 364 304, 421 278 C468 256, 479 226, 448 210 C415 193, 430 177, 489 174"/>
        <path class="spatial-path-virtual" d="M190 407 C250 390, 290 403, 340 370 C392 336, 364 304, 421 278 C468 256, 479 226, 448 210 C415 193, 430 177, 489 174"/>
        <path class="spatial-path-real" d="M190 407 C265 426, 334 405, 376 367 C421 327, 461 325, 507 341 C551 356, 584 332, 602 298"/>

        <circle class="spatial-node-gold" cx="190" cy="407" r="5"/>
        <circle class="spatial-node" cx="340" cy="370" r="5"/>
        <circle class="spatial-node" cx="421" cy="278" r="5"/>
        <circle class="spatial-node" cx="489" cy="174" r="5"/>
        <circle class="spatial-node-gold" cx="602" cy="298" r="5"/>

        <g class="spatial-person" transform="translate(407 286)">
          <circle cx="0" cy="-22" r="7"/>
          <path d="M-7 -12 Q0 -18 7 -12 L10 17 Q3 22 0 15 Q-3 22 -10 17Z"/>
          <path d="M-5 15 L-9 43 M5 15 L9 43" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
        </g>

        <text class="spatial-label" x="504" y="126">Virtual Space</text>
        <text class="spatial-label" x="128" y="444">Physical Space</text>
        <text class="spatial-label-small" x="511" y="457">redirected walking / spatial interaction</text>
      </svg>`;
  }

  function renderAbout() {
    const p = DATA.profile;
    const s = sectionById.bio;
    const body = `
      <div class="about-layout">
        <figure class="portrait-frame reveal"><img src="${p.avatar}" alt="${escapeHtml(p.name)}个人形象" loading="lazy" /></figure>
        <div class="about-copy reveal">
          <p class="about-intro">${p.intro}</p>
          <div class="about-meta reveal-stagger">
            <div class="meta-row"><span class="meta-label">Research</span><span class="meta-value">${p.researchFocus.map(escapeHtml).join(' · ')}</span></div>
            <div class="meta-row"><span class="meta-label">Affiliation</span><span class="meta-value">${escapeHtml(p.affiliation)}</span></div>
            <div class="meta-row"><span class="meta-label">Academic Service</span><span class="meta-value">${p.academicIdentity}</span></div>
            <div class="meta-row"><span class="meta-label">Institute</span><span class="meta-value"><a href="${p.institute.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.institute.name)} <span class="inline-arrow">↗</span></a></span></div>
            <div class="meta-row"><span class="meta-label">Talent Program</span><span class="meta-value">${p.talent}</span></div>
            <div class="meta-row"><span class="meta-label">Email</span><span class="meta-value"><a href="mailto:${p.emails[0]}">${p.emails[0]}</a></span></div>
          </div>
        </div>
      </div>`;
    return sectionChrome(s, body);
  }

  function timelineHtml(items) {
    return `<ol class="timeline-list reveal-stagger">${items.map(item => `
      <li class="timeline-item">
        <div class="timeline-when">${escapeHtml(item.when)}</div>
        <div class="timeline-track"><span class="timeline-dot"></span></div>
        <div class="timeline-what">${escapeHtml(item.what)}</div>
      </li>`).join('')}</ol>`;
  }

  function renderTimelineSection(id, items) {
    return sectionChrome(sectionById[id], timelineHtml(items));
  }

  function roleFromText(text) {
    if (/主持/.test(text)) return '主持';
    if (/参与/.test(text)) return '参与';
    return '';
  }

  function editorialList(items, mode) {
    return `<ol class="editorial-list reveal-stagger">${items.map((item, i) => {
      let title = '', detail = '', tag = '';
      if (mode === 'research') {
        title = item.label;
        detail = item.text;
        tag = roleFromText(item.text);
      } else if (mode === 'teaching') {
        title = item.text;
        detail = item.date;
        tag = item.date.slice(0, 4);
      } else if (mode === 'awards') {
        title = item.text;
        detail = item.year;
        tag = item.year;
      }
      return `<li class="editorial-item">
        <span class="editorial-index">${String(i + 1).padStart(2,'0')}</span>
        <span class="editorial-body"><span class="editorial-title">${title}</span><span class="editorial-detail">${detail}</span></span>
        ${tag ? `<span class="editorial-tag">${escapeHtml(tag)}</span>` : ''}
      </li>`;
    }).join('')}</ol>`;
  }

  function renderResearchProjects() {
    return sectionChrome(sectionById.projects, editorialList(DATA.researchProjects, 'research'));
  }

  function renderTeachingProjects() {
    return sectionChrome(sectionById.teaching_projects, editorialList(DATA.teachingProjects, 'teaching'));
  }

  function publicationYears() {
    return [...new Set(DATA.publications.map(pub => pub.year))].sort((a,b) => Number(b) - Number(a));
  }

  function publicationItem(pub, idx) {
    const doi = pub.doiText ? `<span class="pub-doi">DOI: ${pub.doiUrl ? `<a href="${pub.doiUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(pub.doiText)}</a>` : escapeHtml(pub.doiText)}</span>` : '';
    return `<li class="pub-item" data-number="${String(idx + 1).padStart(2,'0')}">
      <span class="pub-authors">${pub.authorsHtml}</span>
      <span class="pub-title">${escapeHtml(pub.title)}</span>
      <span class="pub-info">${pub.venueHtml}</span>
      ${doi}
    </li>`;
  }

  function renderPublications() {
    const years = publicationYears();
    const toolbar = `<div class="publication-toolbar reveal" role="group" aria-label="按年份筛选论文">
      <button class="year-filter is-active" type="button" data-year="all">全部</button>
      ${years.map(year => `<button class="year-filter" type="button" data-year="${year}">${year}</button>`).join('')}
    </div>`;
    const groups = years.map(year => {
      const pubs = DATA.publications.filter(pub => pub.year === year);
      return `<div class="publication-year reveal" data-publication-year="${year}">
        <div class="publication-year-label">${year}</div>
        <ol class="pub-list">${pubs.map(publicationItem).join('')}</ol>
      </div>`;
    }).join('');
    return sectionChrome(sectionById.publications, toolbar + groups);
  }

  function renderCourses() {
    const body = `<ol class="course-list reveal-stagger">${DATA.courses.map(course => `
      <li class="course-item"><span class="course-name">${escapeHtml(course)}</span><span class="course-icon">${icons.course}</span></li>`).join('')}</ol>`;
    return sectionChrome(sectionById.courses, body);
  }

  function renderAwards() {
    return sectionChrome(sectionById.awards, editorialList(DATA.awards, 'awards'));
  }

  function renderContact() {
    const p = DATA.profile;
    const body = `
      <div class="contact-panel reveal" id="contactPanel">
        <span class="contact-kicker">Academic Contact</span>
        <h3 class="contact-title">${escapeHtml(p.emails[0])}</h3>
        <div class="contact-links">
          ${p.emails.map(email => `<a class="contact-link" href="mailto:${email}">${escapeHtml(email)} <span class="inline-arrow">↗</span></a>`).join('')}
          <button class="copy-email" type="button" data-copy="${p.emails[0]}">复制邮箱</button>
          <a class="contact-link" href="${p.institute.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.institute.name)} <span class="inline-arrow">↗</span></a>
        </div>
        <p class="contact-note">${p.contactNote}</p>
      </div>
      <div class="footer-mark reveal">
        <img class="footer-logo" src="${p.universityLogo}" alt="青海大学 Qinghai University" loading="lazy" />
        <a class="footer-institute" href="${p.institute.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.institute.name)} ↗</a>
        <span>© ${new Date().getFullYear()} ${escapeHtml(p.name)}</span>
      </div>`;
    return sectionChrome(sectionById.contact, body);
  }

  function renderContent() {
    $('#contentShell').innerHTML = [
      renderAbout(),
      renderTimelineSection('education', DATA.education),
      renderTimelineSection('experience', DATA.experience),
      renderResearchProjects(),
      renderTeachingProjects(),
      renderPublications(),
      renderCourses(),
      renderAwards(),
      renderContact()
    ].join('');
  }

  function renderNavigation() {
    $('#navLinks').innerHTML = DATA.sections.map(section => `<a class="nav-link" href="#${section.id}">${escapeHtml(section.title)}</a>`).join('');
    $('#sectionRail').innerHTML = DATA.sections.map(section => `<a class="rail-link" href="#${section.id}" aria-label="${escapeHtml(section.title)}"><span>${section.number} · ${escapeHtml(section.title)}</span></a>`).join('');
  }

  function smoothNavigate(target) {
    if (!target) return;
    const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) + 18;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({top, behavior: prefersReducedMotion ? 'auto' : 'smooth'});
  }

  function setupNavigation() {
    const navToggle = $('#navToggle');
    const navLinks = $('#navLinks');

    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', event => {
        const id = link.getAttribute('href');
        if (!id || id === '#') return;
        const target = $(id);
        if (!target) return;
        event.preventDefault();
        smoothNavigate(target);
        try { history.replaceState(null, '', id); } catch (_) {}
        navLinks?.classList.remove('is-open');
        navToggle?.setAttribute('aria-expanded', 'false');
      });
    });

    navToggle?.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navLinks.classList.toggle('is-open', !open);
    });

    document.addEventListener('click', event => {
      if (navLinks?.classList.contains('is-open') && !event.target.closest('.primary-nav')) {
        navLinks.classList.remove('is-open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function setupActiveSection() {
    const sections = $$('.section-block');
    const navAnchors = $$('.nav-link');
    const railAnchors = $$('.rail-link');

    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const current = `#${visible.target.id}`;
      [...navAnchors, ...railAnchors].forEach(anchor => {
        anchor.getAttribute('href') === current ? anchor.setAttribute('aria-current','page') : anchor.removeAttribute('aria-current');
      });
    }, {rootMargin: '-20% 0px -63% 0px', threshold: [0, .1, .25, .5]});

    sections.forEach(section => observer.observe(section));
  }

  function setupReveal() {
    const items = $$('.reveal, .reveal-stagger');
    if (prefersReducedMotion) {
      items.forEach(item => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: .12, rootMargin: '0px 0px -6% 0px'});
    items.forEach(item => observer.observe(item));
  }

  function setupHeaderAndProgress() {
    const header = $('#siteHeader');
    const progress = $('#scrollProgress span');
    const toTop = $('#toTopBtn');
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, y / max)) : 0})`;
      header.classList.toggle('is-scrolled', y > 18);
      toTop.classList.toggle('show', y > 650);
      if (y > 420 && y > lastY + 8) header.classList.add('is-hidden');
      if (y < lastY - 5 || y < 180) header.classList.remove('is-hidden');
      lastY = y;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, {passive:true});
    window.addEventListener('resize', update);
    update();

    toTop.addEventListener('click', () => window.scrollTo({top:0, behavior: prefersReducedMotion ? 'auto' : 'smooth'}));
  }

  function setupTheme() {
    const button = $('#themeToggle');
    let stored = null;
    try { stored = localStorage.getItem('academic-theme'); } catch (_) {}
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (systemDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = initial;

    button.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('academic-theme', next); } catch (_) {}
      button.animate?.([
        {transform:'scale(1) rotate(0deg)'},
        {transform:'scale(.88) rotate(-10deg)'},
        {transform:'scale(1) rotate(0deg)'}
      ], {duration: 260, easing:'cubic-bezier(.22,1,.36,1)'});
    });
  }

  function setupCopyEmail() {
    const toast = $('#toast');
    $$('.copy-email').forEach(button => {
      button.addEventListener('click', async () => {
        const text = button.dataset.copy || DATA.profile.emails[0];
        try {
          await navigator.clipboard.writeText(text);
          toast.textContent = `邮箱已复制：${text}`;
        } catch (_) {
          toast.textContent = `邮箱：${text}`;
        }
        toast.classList.add('show');
        clearTimeout(window.__toastTimer);
        window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
      });
    });
  }

  function setupPublicationFilter() {
    $$('.year-filter').forEach(button => {
      button.addEventListener('click', () => {
        const year = button.dataset.year;
        $$('.year-filter').forEach(btn => btn.classList.toggle('is-active', btn === button));
        $$('[data-publication-year]').forEach(group => {
          group.classList.toggle('is-filtered-out', year !== 'all' && group.dataset.publicationYear !== year);
        });
      });
    });
  }

  function setupSpatialParallax() {
    if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const stage = $('#spatialStage');
    const visual = $('.hero-visual');
    if (!stage || !visual) return;

    visual.addEventListener('pointermove', event => {
      const rect = visual.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - .5;
      const ny = (event.clientY - rect.top) / rect.height - .5;
      stage.style.setProperty('--ry', `${nx * 3.8}deg`);
      stage.style.setProperty('--rx', `${-ny * 3.0}deg`);
      stage.style.setProperty('--tx', `${nx * 7}px`);
      stage.style.setProperty('--ty', `${ny * 5}px`);
    });
    visual.addEventListener('pointerleave', () => {
      stage.style.setProperty('--ry','0deg');
      stage.style.setProperty('--rx','0deg');
      stage.style.setProperty('--tx','0px');
      stage.style.setProperty('--ty','0px');
    });
  }

  function setupMagneticButtons() {
    if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    $$('.magnetic').forEach(button => {
      button.addEventListener('pointermove', event => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width/2) / rect.width;
        const y = (event.clientY - rect.top - rect.height/2) / rect.height;
        button.style.setProperty('--mx', `${x * 5}px`);
        button.style.setProperty('--my', `${y * 3}px`);
      });
      button.addEventListener('pointerleave', () => {
        button.style.setProperty('--mx','0px');
        button.style.setProperty('--my','0px');
      });
    });
  }

  function setupContactDepth() {
    if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const panel = $('#contactPanel');
    if (!panel) return;
    panel.addEventListener('pointermove', event => {
      const rect = panel.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      panel.style.transform = `perspective(1200px) rotateX(${-y * 1.5}deg) rotateY(${x * 1.8}deg) translateY(-2px)`;
      panel.style.boxShadow = 'var(--shadow-float)';
    });
    panel.addEventListener('pointerleave', () => {
      panel.style.transform = '';
      panel.style.boxShadow = '';
    });
  }

  function handleInitialHash() {
    if (!location.hash) return;
    const target = $(location.hash);
    if (target) setTimeout(() => smoothNavigate(target), 80);
  }

  function init() {
    renderHero();
    renderNavigation();
    renderContent();
    setupTheme();
    setupNavigation();
    setupActiveSection();
    setupReveal();
    setupHeaderAndProgress();
    setupCopyEmail();
    setupPublicationFilter();
    setupSpatialParallax();
    setupMagneticButtons();
    setupContactDepth();
    handleInitialHash();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
