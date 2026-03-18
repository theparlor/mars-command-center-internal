/**
 * MARS Shell v0.4 — Navigation shell for all engagement artifacts
 *
 * Design Review Board v0.4 changes:
 *   - REMOVED sibling tab bar (redundant with sidebar — Suki's recommendation)
 *   - REMOVED quick-nav pill bar dependency (Command Center handles its own)
 *   - CONSOLIDATED sidebar from 10 sections → 6 (Vera's taxonomy audit)
 *   - SUBTLER breadcrumb (Elena's H8 — minimalist design)
 *   - Sidebar is the SOLE primary navigation mechanism
 *   - Breadcrumb is supplementary wayfinding only
 *
 * Usage: <script src="mars-ui/mars-shell.js"></script>
 */
(function () {
  'use strict';

  // ── Site map — consolidated per Design Review Board ────────────
  // 6 primary sections (was 10). Vera's rule: if you can't cut one,
  // you have too many. We merged single-item sections into logical groups.
  const SITE_MAP = [
    {
      section: 'Home',
      items: [
        { label: 'Command Center', icon: '🏠', href: 'Subaru_MARS_Command_Center.html' }
      ]
    },
    // ─── SOW LANE: Schedule & Planning ───
    {
      section: 'Schedule & Planning',
      icon: '📅',
      anchor: 'schedule',
      items: [
        { label: 'Engagement Schedule', icon: '📋', href: 'schedule/Subaru_MARS_Reconciled_Schedule.html' },
        { label: 'Gantt Chart', icon: '📊', href: 'schedule/Subaru_MARS_Gantt_Views.html' },
        { label: 'Calendar View', icon: '🗓️', href: 'schedule/Subaru_MARS_Calendar_View.html' },
        { label: 'Two-Week Look Ahead', icon: '👀', href: 'schedule/Subaru_MARS_Two_Week_Look_Ahead.html' },
        { label: 'Activity Cards', icon: '🃏', href: 'schedule/Subaru_MARS_Card_View.html' },
        { label: 'Decision Log', icon: '📝', href: 'schedule/Subaru_MARS_Decision_Log.html' },
        { label: 'Weekly Dashboard', icon: '📈', href: '../status_updates/Subaru_MARS_Weekly_Status.html' },
      ]
    },
    // ─── SOW LANE: Training & Coaching ───
    // Merged Curriculum + Coaching Insights (Vera: "one learning domain, not two")
    {
      section: 'Training & Coaching',
      icon: '🎯',
      anchor: 'training',
      items: [
        { label: 'Course Catalog', icon: '📖', href: 'curriculum/Subaru_MARS_Course_Catalog.html' },
        { label: 'Team Assessment', icon: '🎤', href: 'Subaru_MARS_Interview_Guide.html' },
        { label: 'Session Observation', icon: '🔎', href: 'Subaru_Roadmap_Session_Observation_Guide.html' },
        { label: 'Leadership Altitude', icon: '🏔️', href: 'Leadership_Altitude_Model.html' },
      ]
    },
    // ─── SOW LANE: Jira & Metrics ───
    {
      section: 'Jira & Metrics',
      icon: '⚙️',
      anchor: 'jira',
      items: []
    },
    // ─── SOW LANE: Organization & People ───
    // Merged Organization + OCM (Vera: "both about people and how they work")
    {
      section: 'Organization & Change',
      icon: '👥',
      anchor: 'organization',
      items: [
        { label: 'Org Chart', icon: '🏢', href: 'org/Subaru_MARS_Org_Chart.html' },
        { label: 'Team Explorer', icon: '🔍', href: 'org/Subaru_MARS_Team_Explorer.html' },
        { label: 'Visual Comms System', icon: '📡', href: 'Subaru_Visual_Communication_System.html' },
      ]
    },
    // ─── Reference & Resources ───
    // Merged Frameworks + Brand + Turnberry Team
    // (Declan: "these are reference materials, not daily destinations")
    {
      section: 'Reference',
      icon: '📚',
      anchor: 'reference',
      items: [
        { label: 'SOW Overview', icon: '📜', href: 'SOW_Overview_Diagram.html' },
        { label: 'Design System', icon: '🎯', href: '../design/Design_System.html' },
        { label: 'Co-Branding Strategy', icon: '🤝', href: '../design/brand/Co_Branding_Strategy.html' },
        { label: 'Schedule Email', icon: '✉️', href: 'schedule/Subaru_MARS_Schedule_Email.html' },
        { label: 'Co-Branded Examples', icon: '💎', href: 'examples/Co_Branded_Example.html' },
      ]
    },
  ];

  // ── Path resolution ────────────────────────────────────────────
  function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/schedule/') || path.includes('/org/') ||
        path.includes('/curriculum/') || path.includes('/examples/')) {
      return '../';
    }
    if (path.includes('/status_updates/') || path.includes('/design/brand/')) {
      return '../deliverables/';
    }
    if (path.includes('/design/') && !path.includes('/design/brand/')) {
      return '../deliverables/';
    }
    return '';
  }

  function resolveHref(href) { return getBasePath() + href; }

  function isCurrentPage(href) {
    const resolvedFile = resolveHref(href).split('/').pop();
    const currentFile = window.location.pathname.split('/').pop();
    return resolvedFile === currentFile;
  }

  // ── Current page context ───────────────────────────────────────
  function getCurrentContext() {
    for (const group of SITE_MAP) {
      for (const item of group.items) {
        if (isCurrentPage(item.href)) {
          return {
            section: group.section,
            anchor: group.anchor || '',
            page: item.label,
            isHome: group.section === 'Home'
          };
        }
      }
    }
    return {
      section: '',
      anchor: '',
      page: document.title.replace('Subaru M.A.R.S. — ', ''),
      isHome: false
    };
  }

  // ── Pinned sidebar state ───────────────────────────────────────
  let sidebarPinned = window.innerWidth >= 1280;
  const PINNED_CLASS = 'mars-sidebar-pinned';

  // ── Build navigation drawer ────────────────────────────────────
  function buildNavHTML() {
    let html = `
      <div class="mars-nav-header">
        <h2>M.A.R.S.</h2>
        <div class="nav-subtitle">Subaru Agile Transformation</div>
      </div>
    `;

    for (const group of SITE_MAP) {
      const hasActive = group.items.some(i => isCurrentPage(i.href));

      if (group.items.length === 0) {
        html += `<div class="mars-nav-section">
          <div class="mars-nav-item" style="opacity:0.4;cursor:default;">
            <span class="nav-icon">${group.icon || '📁'}</span>
            <span class="nav-label">${group.section}</span>
            <span class="nav-badge" style="background:transparent;color:var(--text-muted,#9CA3AF);font-style:italic;font-weight:400;font-size:9px;">coming soon</span>
          </div>
        </div>`;
      } else if (group.items.length === 1) {
        const item = group.items[0];
        const active = isCurrentPage(item.href) ? ' active' : '';
        html += `<div class="mars-nav-section">
          <a class="mars-nav-item${active}" href="${resolveHref(item.href)}">
            <span class="nav-icon">${item.icon}</span>
            <span class="nav-label">${item.label}</span>
          </a>
        </div>`;
      } else {
        const expanded = hasActive ? ' expanded' : '';
        html += `<div class="mars-nav-group${expanded}">
          <button class="mars-nav-group-toggle" onclick="this.parentElement.classList.toggle('expanded')">
            <span class="nav-icon">${group.icon || '📁'}</span>
            <span class="nav-label">${group.section}</span>
            <span class="nav-badge">${group.items.length}</span>
            <span class="nav-chevron">▾</span>
          </button>
          <div class="mars-nav-group-children">`;
        for (const item of group.items) {
          const active = isCurrentPage(item.href) ? ' active' : '';
          html += `<a class="mars-nav-item${active}" href="${resolveHref(item.href)}">
            <span class="nav-icon">${item.icon}</span>
            <span class="nav-label">${item.label}</span>
          </a>`;
        }
        html += `</div></div>`;
      }
    }

    html += `<div style="margin-top:auto;padding:16px;border-top:1px solid var(--outline-variant,#E5E7EB);font-size:10px;color:var(--text-muted,#9CA3AF);">
      MARS Command Center v0.4<br>Turnberry Solutions
    </div>`;
    return html;
  }

  // ── Build breadcrumb (subtle — wayfinding only, not navigation) ──
  function buildBreadcrumb(ctx) {
    const homeHref = resolveHref('Subaru_MARS_Command_Center.html');
    if (ctx.isHome) {
      return `<span class="mars-bc-current">Command Center</span>`;
    }
    let crumb = `<a href="${homeHref}" class="mars-bc-link">Home</a>`;
    if (ctx.section) {
      crumb += `<span class="mars-bc-sep">/</span>`;
      crumb += `<span class="mars-bc-current">${ctx.page}</span>`;
    }
    return crumb;
  }

  // ── Inject shell ──────────────────────────────────────────────
  function injectShell() {
    const ctx = getCurrentContext();
    const existingContent = document.body.innerHTML;

    document.body.innerHTML = `
      <div class="mars-topbar" id="mars-topbar">
        <div class="mars-topbar-leading">
          <button class="mars-hamburger" id="mars-hamburger-btn" aria-label="Toggle navigation">${sidebarPinned ? '◁' : '☰'}</button>
          <div class="mars-topbar-breadcrumb">${buildBreadcrumb(ctx)}</div>
        </div>
        <div class="mars-topbar-actions">
          <a href="${resolveHref('Subaru_MARS_Command_Center.html')}" class="mars-home-btn">🏠</a>
        </div>
      </div>

      <div class="mars-accent-bar"></div>

      <div class="mars-nav-scrim" id="mars-nav-scrim"></div>

      <nav class="mars-nav${sidebarPinned ? ' pinned' : ''}" id="mars-nav-drawer">
        ${buildNavHTML()}
      </nav>

      <div class="mars-content-wrapper${sidebarPinned ? ' ' + PINNED_CLASS : ''}" id="mars-content-wrapper">
        <div class="mars-content">
          ${existingContent}
        </div>
      </div>
    `;

    // ── Wire up interactions ─────────────────────────────────────
    const btn = document.getElementById('mars-hamburger-btn');
    const drawer = document.getElementById('mars-nav-drawer');
    const scrim = document.getElementById('mars-nav-scrim');
    const wrapper = document.getElementById('mars-content-wrapper');

    function openNav() {
      drawer.classList.add('open');
      scrim.classList.add('open');
      if (!sidebarPinned) document.body.style.overflow = 'hidden';
    }
    function closeNav() {
      drawer.classList.remove('open');
      scrim.classList.remove('open');
      document.body.style.overflow = '';
    }
    function togglePin() {
      sidebarPinned = !sidebarPinned;
      if (sidebarPinned) {
        drawer.classList.add('pinned');
        drawer.classList.remove('open');
        wrapper.classList.add(PINNED_CLASS);
        scrim.classList.remove('open');
        btn.textContent = '◁';
        document.body.style.overflow = '';
      } else {
        drawer.classList.remove('pinned');
        wrapper.classList.remove(PINNED_CLASS);
        btn.textContent = '☰';
      }
    }

    btn.addEventListener('click', function () {
      if (window.innerWidth >= 1280) {
        togglePin();
      } else {
        drawer.classList.contains('open') ? closeNav() : openNav();
      }
    });

    scrim.addEventListener('click', closeNav);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    // Auto-pin on wide viewports
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1280 && !sidebarPinned) {
        sidebarPinned = true;
        drawer.classList.add('pinned');
        wrapper.classList.add(PINNED_CLASS);
        btn.textContent = '◁';
        scrim.classList.remove('open');
      } else if (window.innerWidth < 1280 && sidebarPinned) {
        sidebarPinned = false;
        drawer.classList.remove('pinned');
        wrapper.classList.remove(PINNED_CLASS);
        btn.textContent = '☰';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectShell);
  } else {
    injectShell();
  }
})();
