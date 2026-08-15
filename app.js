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
    const visual = DATA.researchVisual || { stages: [] };
    const firstStage = visual.stages?.[0] || { key: 'understand', en: 'UNDERSTAND', label: '空间理解', detail: '' };
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

        <div class="hero-visual" id="researchVisual" aria-label="高原生态旅游沉浸漫游与智能重定向行走交互式研究可视化">
          <div class="research-visual-heading" aria-hidden="true">
            <span>RESEARCH VISUALIZATION</span>
            <strong>Human · Space · Intelligence</strong>
          </div>
          <div class="spatial-stage" id="spatialStage" data-stage="${escapeHtml(firstStage.key)}">
            ${spatialSvg()}
          </div>
          <div class="research-visual-caption" id="researchVisualCaption" aria-live="polite">
            <span class="visual-step" id="visualStep">01 · ${escapeHtml(firstStage.en)}</span>
            <strong id="visualStageTitle">${escapeHtml(firstStage.label)}</strong>
            <span id="visualStageDetail">${escapeHtml(firstStage.detail)}</span>
          </div>
          <div class="research-stage-nav" aria-label="研究可视化阶段">
            ${(visual.stages || []).map((stage, index) => `
              <button type="button" class="research-stage-button${index === 0 ? ' is-active' : ''}" data-stage-control="${escapeHtml(stage.key)}">
                <span>${String(index + 1).padStart(2,'0')}</span>${escapeHtml(stage.en)}
              </button>`).join('')}
          </div>
          <div class="research-visual-hint" id="researchVisualHint">${escapeHtml(visual.hint || '移动鼠标探索 · Hover to explore')}</div>
        </div>
      </div>
      <div class="hero-scroll-cue" aria-hidden="true">Scroll<span></span></div>`;

    requestAnimationFrame(() => {
      $$('.path-draw', $('#spatialStage')).forEach(path => {
        try { path.style.setProperty('--path-length', `${Math.ceil(path.getTotalLength())}`); } catch (_) {}
      });
    });
  }

  function spatialSvg() {
    const contourPaths = [
      'M352 92 C420 52 530 62 620 101 C691 132 718 184 688 224 C654 269 579 276 503 249 C428 223 362 176 352 92Z',
      'M383 111 C440 77 530 82 602 113 C657 137 681 176 657 207 C630 242 571 247 511 226 C450 205 397 169 383 111Z',
      'M416 130 C462 105 529 107 583 130 C624 148 641 176 624 198 C604 222 561 224 517 209 C472 194 432 166 416 130Z',
      'M449 148 C482 131 530 132 566 147 C592 158 605 176 595 189 C581 206 552 207 522 197 C493 187 464 169 449 148Z'
    ];
    const contours = contourPaths.map((d, i) => `<path class="terrain-contour contour-${i + 1}" d="${d}"/>`).join('');

    return `
      <svg class="spatial-svg" id="spatialSvg" viewBox="0 0 760 560" role="img" aria-labelledby="spatialTitle spatialDesc">
        <title id="spatialTitle">高原生态旅游沉浸漫游与智能重定向行走研究可视化</title>
        <desc id="spatialDesc">交互式展示虚拟旅游空间、有限物理空间、多用户运动预测、虚拟导览智能体与重定向行走之间的关系。</desc>

        <defs>
          <radialGradient id="riskGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0" stop-color="currentColor" stop-opacity=".18"/>
            <stop offset="1" stop-color="currentColor" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="routeGradient" x1="0" x2="1">
            <stop offset="0" stop-color="var(--blue-2)" stop-opacity=".45"/>
            <stop offset="1" stop-color="var(--blue-2)" stop-opacity="1"/>
          </linearGradient>
          <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <g class="research-layer layer-space" data-layer="space" tabindex="0" role="button" aria-label="空间理解：虚拟旅游空间、真实物理空间与动态用户状态">
          <g class="plateau-terrain">
            <path class="plateau-ridge" d="M318 218 C356 192 378 174 408 182 C438 190 458 148 493 155 C526 162 543 124 579 135 C609 143 627 116 657 133 C680 146 701 165 716 190"/>
            ${contours}
            <path class="virtual-trail" d="M372 246 C410 226 448 225 480 205 C511 186 542 166 581 170 C617 174 641 155 675 142"/>
            <text class="spatial-label label-virtual" x="362" y="74">Virtual Plateau Environment</text>
            <text class="spatial-label-tiny" x="363" y="91">route · viewpoint · ecological / cultural POI</text>
          </g>

          <g class="poi poi-viewpoint" data-poi="viewpoint" data-x="675" data-y="142" data-label="Viewpoint" tabindex="0" role="button" aria-label="观景节点 Viewpoint">
            <circle class="poi-hit" cx="675" cy="142" r="18"/><circle class="poi-dot" cx="675" cy="142" r="5"/>
            <path class="poi-mark" d="M668 134 L675 123 L682 134"/><text x="687" y="138">Viewpoint</text>
          </g>
          <g class="poi poi-eco" data-poi="eco" data-x="581" data-y="170" data-label="Eco POI" tabindex="0" role="button" aria-label="生态兴趣点 Eco POI">
            <circle class="poi-hit" cx="581" cy="170" r="18"/><circle class="poi-dot" cx="581" cy="170" r="5"/>
            <text x="593" y="166">Eco POI</text>
          </g>
          <g class="poi poi-culture" data-poi="culture" data-x="480" data-y="205" data-label="Cultural Node" tabindex="0" role="button" aria-label="生态文化展示节点 Cultural Node">
            <circle class="poi-hit" cx="480" cy="205" r="18"/><circle class="poi-dot" cx="480" cy="205" r="5"/>
            <text x="492" y="201">Cultural Node</text>
          </g>
        </g>

        <g class="research-layer layer-redirect" data-layer="redirect" tabindex="0" role="button" aria-label="协同重定向：虚拟路径与真实物理路径的动态映射">
          <path class="virtual-route-glow" d="M381 259 C425 240 462 224 497 204 C535 182 571 171 609 165 C632 161 653 151 675 142"/>
          <path class="virtual-route path-draw" id="virtualRoute" d="M381 259 C425 240 462 224 497 204 C535 182 571 171 609 165 C632 161 653 151 675 142"/>
          <path class="interactive-route" id="interactiveRoute" d="M381 259 C445 235 519 190 675 142"/>
          <text class="path-label path-label-virtual" x="530" y="225">virtual trajectory</text>
        </g>

        <g class="research-layer layer-agent" data-layer="agent" tabindex="0" role="button" aria-label="智能引导：虚拟导览智能体通过位置、朝向和运动方向进行自然引导">
          <path class="guide-link" id="guideLink" d="M625 116 Q600 145 570 181"/>
          <g class="agent-marker" id="agentMarker" transform="translate(625 116)">
            <circle class="agent-orbit" r="16"/><circle class="agent-core" r="6"/><path class="agent-heading" d="M8 -8 L20 -15"/>
          </g>
          <text class="spatial-label-small agent-label" x="643" y="111">Guide Agent</text>
        </g>

        <g class="research-layer layer-space physical-space" data-layer="space">
          <path class="physical-floor" d="M112 338 L388 322 L468 493 L162 516 Z"/>
          <path class="physical-boundary" d="M112 338 L388 322 L468 493 L162 516 Z Z"/>
          <path class="physical-grid" d="M152 384 L423 370 M174 432 L447 418 M205 337 L244 506 M269 329 L314 502 M331 326 L383 497"/>
          <text class="spatial-label label-physical" x="116" y="326">Physical Shared Space</text>
          <text class="spatial-label-tiny" x="116" y="541">finite room · boundary · multi-user occupancy</text>
        </g>

        <g class="research-layer layer-redirect" data-layer="redirect">
          <path class="physical-route-glow" id="physicalRouteGlow" d="M180 470 C196 414 242 391 288 375 C334 359 353 330 402 354"/>
          <path class="physical-route path-draw" id="physicalRoute" d="M180 470 C196 414 242 391 288 375 C334 359 353 330 402 354"/>
          <path class="physical-route-secondary" id="physicalRouteB" d="M421 456 C397 419 371 399 342 390 C310 380 296 359 278 340"/>
          <text class="path-label path-label-physical" x="205" y="451">physical trajectory</text>
        </g>

        <g class="research-layer layer-prediction" data-layer="prediction" tabindex="0" role="button" aria-label="风险预测：用户短时运动趋势、未来空间占用与潜在冲突">
          <g class="prediction prediction-a" id="predictionA">
            <ellipse rx="46" ry="24"/><path d="M0 0 L58 -18"/><path d="M52 -23 L61 -18 L54 -12"/>
          </g>
          <g class="prediction prediction-b" id="predictionB">
            <ellipse rx="42" ry="22"/><path d="M0 0 L-52 -14"/><path d="M-46 -20 L-56 -14 L-48 -8"/>
          </g>
          <g class="risk-zone" id="riskZone">
            <circle class="risk-halo" r="42"/><circle class="risk-dot" r="5"/><text x="12" y="-8">Potential conflict</text>
          </g>
        </g>

        <g class="research-layer layer-users" data-layer="users" tabindex="0" role="button" aria-label="动态用户：实时位置、朝向、速度与多人空间占用">
          <g class="physical-user physical-user-a" id="physicalUserA">
            <circle class="user-ring" r="12"/><circle class="user-core" r="5"/><path class="user-heading" d="M8 0 L22 -8"/>
            <text x="14" y="20">A</text>
          </g>
          <g class="physical-user physical-user-b" id="physicalUserB">
            <circle class="user-ring" r="12"/><circle class="user-core user-core-b" r="5"/><path class="user-heading" d="M-8 0 L-22 -7"/>
            <text x="14" y="20">B</text>
          </g>
          <g class="virtual-user" id="virtualUser">
            <circle class="virtual-user-ring" r="11"/><circle class="virtual-user-core" r="4.5"/>
          </g>
          <path class="space-correspondence" id="spaceCorrespondence" d="M381 259 C350 288 330 313 300 360"/>
        </g>

        <g class="avoid-region" id="avoidRegion" aria-hidden="true">
          <circle r="28"/><circle r="6"/>
          <text x="34" y="4">dynamic constraint</text>
        </g>

        <g class="research-legend" aria-hidden="true">
          <line x1="503" y1="509" x2="533" y2="509" class="legend-virtual"/><text x="540" y="513">Virtual</text>
          <line x1="605" y1="509" x2="635" y2="509" class="legend-physical"/><text x="642" y="513">Physical</text>
        </g>
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

  function setupResearchVisualization() {
    const visual = $('#researchVisual');
    const stage = $('#spatialStage');
    const svg = $('#spatialSvg');
    if (!visual || !stage || !svg) return;

    const stages = DATA.researchVisual?.stages || [];
    const stageTitle = $('#visualStageTitle');
    const stageDetail = $('#visualStageDetail');
    const stageStep = $('#visualStep');
    const hint = $('#researchVisualHint');
    const stageButtons = $$('.research-stage-button', visual);

    const virtualRoute = $('#virtualRoute');
    const physicalRoute = $('#physicalRoute');
    const physicalRouteGlow = $('#physicalRouteGlow');
    const physicalRouteB = $('#physicalRouteB');
    const interactiveRoute = $('#interactiveRoute');
    const virtualUser = $('#virtualUser');
    const physicalUserA = $('#physicalUserA');
    const physicalUserB = $('#physicalUserB');
    const predictionA = $('#predictionA');
    const predictionB = $('#predictionB');
    const riskZone = $('#riskZone');
    const correspondence = $('#spaceCorrespondence');
    const avoidRegion = $('#avoidRegion');

    let stageIndex = 0;
    let stageLockedUntil = 0;
    let rafId = 0;
    let running = !prefersReducedMotion;
    let heroVisible = true;
    let lastTime = performance.now();
    let progress = .04;
    let hintTimer = 0;
    const basePhysicalPath = 'M180 470 C196 414 242 391 288 375 C334 359 353 330 402 354';

    function setCaption(index) {
      const item = stages[index];
      if (!item) return;
      stage.dataset.stage = item.key;
      stageTitle.textContent = item.label;
      stageDetail.textContent = item.detail;
      stageStep.textContent = `${String(index + 1).padStart(2,'0')} · ${item.en}`;
      stageButtons.forEach((button, i) => button.classList.toggle('is-active', i === index));
    }

    function setStageByKey(key, lock = false) {
      const index = stages.findIndex(item => item.key === key);
      if (index < 0) return;
      stageIndex = index;
      setCaption(index);
      if (lock) stageLockedUntil = performance.now() + 5200;
    }

    function resetFocus() {
      delete stage.dataset.focus;
      if (performance.now() > stageLockedUntil) setCaption(stageIndex);
    }

    const layerCopy = {
      space: ['空间理解', '高原生态旅游虚拟空间、有限共享物理空间与动态用户状态'],
      prediction: ['风险预测', '短时运动趋势 → 未来空间占用 → 边界与多人冲突风险'],
      agent: ['智能引导', '虚拟导览智能体利用位置、运动方向与朝向进行自然空间引导'],
      redirect: ['协同重定向', 'Virtual Path 与 Physical Path 采用不同映射，让有限空间支持持续漫游'],
      users: ['多人动态状态', '用户位置、方向与空间占用持续更新，并参与风险判断']
    };

    $$('.research-layer[data-layer]', svg).forEach(layer => {
      const key = layer.dataset.layer;
      const activate = () => {
        stage.dataset.focus = key;
        const copy = layerCopy[key];
        if (copy) {
          stageTitle.textContent = copy[0];
          stageDetail.textContent = copy[1];
          stageStep.textContent = 'EXPLORE';
        }
      };
      layer.addEventListener('pointerenter', activate);
      layer.addEventListener('focus', activate);
      layer.addEventListener('pointerleave', resetFocus);
      layer.addEventListener('blur', resetFocus);
    });

    stageButtons.forEach(button => {
      button.addEventListener('pointerenter', () => setStageByKey(button.dataset.stageControl, true));
      button.addEventListener('focus', () => setStageByKey(button.dataset.stageControl, true));
      button.addEventListener('click', () => setStageByKey(button.dataset.stageControl, true));
    });

    const poiMap = {
      viewpoint: {x:675, y:142, label:'Viewpoint'},
      eco: {x:581, y:170, label:'Eco POI'},
      culture: {x:480, y:205, label:'Cultural Node'}
    };
    $$('.poi[data-poi]', svg).forEach(poi => {
      const activate = () => {
        const target = poiMap[poi.dataset.poi];
        if (!target) return;
        stage.dataset.focus = 'space';
        stage.classList.add('is-poi-hover');
        const start = virtualRoute.getPointAtLength(virtualRoute.getTotalLength() * progress);
        const cx = (start.x + target.x) / 2;
        const cy = Math.min(start.y, target.y) - 24;
        interactiveRoute.setAttribute('d', `M${start.x.toFixed(1)} ${start.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${target.x} ${target.y}`);
        stageTitle.textContent = target.label;
        stageDetail.textContent = '游览目标改变后，虚拟路径、运动趋势与重定向决策同步更新';
        stageStep.textContent = 'TARGET';
      };
      const deactivate = () => {
        stage.classList.remove('is-poi-hover');
        resetFocus();
      };
      poi.addEventListener('pointerover', activate);
      poi.addEventListener('focus', activate);
      poi.addEventListener('pointerleave', deactivate);
      poi.addEventListener('blur', deactivate);
    });

    function svgPointFromEvent(event) {
      const point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      const matrix = svg.getScreenCTM();
      return matrix ? point.matrixTransform(matrix.inverse()) : null;
    }

    function updatePointerConstraint(event) {
      if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
      const rect = visual.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - .5;
      const ny = (event.clientY - rect.top) / rect.height - .5;
      stage.style.setProperty('--ry', `${nx * 2.8}deg`);
      stage.style.setProperty('--rx', `${-ny * 2.1}deg`);
      stage.style.setProperty('--tx', `${nx * 5}px`);
      stage.style.setProperty('--ty', `${ny * 4}px`);

      const p = svgPointFromEvent(event);
      if (!p) return;
      const inPhysicalSpace = p.x > 110 && p.x < 470 && p.y > 315 && p.y < 520;
      if (inPhysicalSpace) {
        stage.classList.add('has-dynamic-constraint');
        avoidRegion.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
        const dx = (p.x - 290) / 180;
        const dy = (p.y - 410) / 120;
        const c1x = 202 - dx * 18;
        const c1y = 414 - dy * 12;
        const c2x = 276 - dx * 24;
        const c2y = 384 - dy * 18;
        const c3x = 340 - dx * 20;
        const c3y = 346 - dy * 12;
        const d = `M180 470 C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} 288 375 C${c3x.toFixed(1)} ${c3y.toFixed(1)} 365 329 402 354`;
        physicalRoute.setAttribute('d', d);
        physicalRouteGlow.setAttribute('d', d);
        stageTitle.textContent = '动态空间约束';
        stageDetail.textContent = '鼠标位置作为临时空间扰动，观察真实行走轨迹如何平滑避让';
        stageStep.textContent = 'INTERACT';
      } else {
        stage.classList.remove('has-dynamic-constraint');
        physicalRoute.setAttribute('d', basePhysicalPath);
        physicalRouteGlow.setAttribute('d', basePhysicalPath);
      }
    }

    visual.addEventListener('pointermove', updatePointerConstraint);
    visual.addEventListener('pointerenter', () => {
      hint.classList.add('is-hidden');
      clearTimeout(hintTimer);
    });
    visual.addEventListener('pointerleave', () => {
      stage.style.setProperty('--ry','0deg');
      stage.style.setProperty('--rx','0deg');
      stage.style.setProperty('--tx','0px');
      stage.style.setProperty('--ty','0px');
      stage.classList.remove('has-dynamic-constraint', 'is-poi-hover');
      physicalRoute.setAttribute('d', basePhysicalPath);
      physicalRouteGlow.setAttribute('d', basePhysicalPath);
      resetFocus();
    });

    function placeAlong(path, element, t) {
      if (!path || !element) return null;
      const len = path.getTotalLength();
      const point = path.getPointAtLength(((t % 1) + 1) % 1 * len);
      element.setAttribute('transform', `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
      return point;
    }

    function tick(now) {
      if (!running || !heroVisible || document.hidden) {
        lastTime = now;
        rafId = requestAnimationFrame(tick);
        return;
      }
      const dt = Math.min(40, now - lastTime);
      lastTime = now;
      progress = (progress + dt * 0.000022) % 1;

      const pa = placeAlong(physicalRoute, physicalUserA, progress);
      const pb = placeAlong(physicalRouteB, physicalUserB, (progress * .92 + .37) % 1);
      const pv = placeAlong(virtualRoute, virtualUser, progress);

      if (pa) predictionA.setAttribute('transform', `translate(${pa.x.toFixed(1)} ${pa.y.toFixed(1)}) rotate(-18)`);
      if (pb) predictionB.setAttribute('transform', `translate(${pb.x.toFixed(1)} ${pb.y.toFixed(1)}) rotate(20)`);
      if (pa && pv) correspondence.setAttribute('d', `M${pv.x.toFixed(1)} ${pv.y.toFixed(1)} C${(pv.x-30).toFixed(1)} ${(pv.y+42).toFixed(1)} ${(pa.x+42).toFixed(1)} ${(pa.y-48).toFixed(1)} ${pa.x.toFixed(1)} ${pa.y.toFixed(1)}`);

      if (pa && pb) {
        const dx = pa.x - pb.x;
        const dy = pa.y - pb.y;
        const distance = Math.hypot(dx, dy);
        const mx = (pa.x + pb.x) / 2;
        const my = (pa.y + pb.y) / 2;
        riskZone.setAttribute('transform', `translate(${mx.toFixed(1)} ${my.toFixed(1)})`);
        riskZone.style.setProperty('--risk', String(Math.max(0, Math.min(1, (118 - distance) / 65))));
      }

      if (now > stageLockedUntil && !stage.dataset.focus) {
        const cycle = Math.floor(now / 3300) % Math.max(stages.length, 1);
        if (cycle !== stageIndex) {
          stageIndex = cycle;
          setCaption(stageIndex);
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    if (prefersReducedMotion) {
      setCaption(0);
      stage.classList.add('reduced-motion');
      placeAlong(physicalRoute, physicalUserA, .36);
      placeAlong(physicalRouteB, physicalUserB, .54);
      placeAlong(virtualRoute, virtualUser, .36);
      predictionA.setAttribute('transform', 'translate(285 382) rotate(-18)');
      predictionB.setAttribute('transform', 'translate(350 391) rotate(20)');
      riskZone.setAttribute('transform', 'translate(319 387)');
      riskZone.style.setProperty('--risk', '.55');
    } else {
      rafId = requestAnimationFrame(tick);
    }

    const heroObserver = new IntersectionObserver(entries => {
      heroVisible = entries.some(entry => entry.isIntersecting);
    }, {threshold: .08});
    heroObserver.observe(visual);

    document.addEventListener('visibilitychange', () => {
      lastTime = performance.now();
    });

    hintTimer = window.setTimeout(() => hint.classList.add('is-muted'), 5200);
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
    setupResearchVisualization();
    setupMagneticButtons();
    setupContactDepth();
    handleInitialHash();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
