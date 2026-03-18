/**
 * MARS Shell — Navigation drawer + Top bar for all engagement artifacts
 * Version: 0.2.0
 *
 * Injects a persistent app shell (top bar + hamburger nav drawer) into
 * any HTML page. Auto-detects current page location and highlights the
 * active nav item.
 *
 * Usage: <script src="mars-ui/mars-shell.js"></script>
 *        (adjust path based on file depth)
 *
 * The shell wraps existing page content inside .mars-content automatically.
 */
(function () {
  'use strict';

  // ── Site map (defines navigation structure) ──────────────────────
  // Primary sections align to SOW engagement lanes (Gantt swim lanes).
  // Cross-cutting sections (Status, Frameworks, Brand) support the lanes.
  // Paths are relative to the deliverables/ root.
  const SITE_MAP = [
    {
      section: 'Home',
      items: [
        { label: 'Command Center', icon: '🏠', href: 'Subaru_MARS_Command_Center.html' }
      ]
    },
    // ─── SOW LANE: Schedule & Timeline ───
    {
      section: 'Schedule & Timeline',
      icon: '📅',
      anchor: 'schedule',
      items: [
        { label: 'Engagement Schedule', icon: '📋', href: 'schedule/Subaru_MARS_Reconciled_Schedule.html', primary: true },
        { label: 'Interactive Gantt', icon: '📊', href: 'schedule/Subaru_MARS_Gantt_Views.html' },
        { label: 'Calendar View', icon: '🗓️', href: 'schedule/Subaru_MARS_Calendar_View.html' },
        { label: 'Two-Week Look Ahead', icon: '👀', href: 'schedule/Subaru_MARS_Two_Week_Look_Ahead.html' },
        { label: 'Activity Cards', icon: '🃏', href: 'schedule/Subaru_MARS_Card_View.html' },
        { label: 'Decision Log', icon: '📝', href: 'schedule/Subaru_MARS_Decision_Log.html' },
        { label: 'Schedule Email', icon: '✉️', href: 'schedule/Subaru_MARS_Schedule_Email.html' },
      ]
    },
    // ─── SOW LANE: Curriculum & Training ───
    {
      section: 'Curriculum & Training',
      icon: '📚',
      anchor: 'curriculum',
      items: [
        { label: 'Course Catalog', icon: '📖', href: 'curriculum/Subaru_MARS_Course_Catalog.html', primary: true },
      ]
    },
    // ─── SOW LANE: Coaching Insights ───
    {
      section: 'Coaching Insights',
      icon: '🎯',
      anchor: 'coaching',
      items: [
        { label: 'Team Assessment Guide', icon: '🎤', href: 'Subaru_MARS_Interview_Guide.html', primary: true },
        { label: 'Session Observation Guide', icon: '🔎', href: 'Subaru_Roadmap_Session_Observation_Guide.html' },
        { label: 'Leadership Altitude Model', icon: '🏔️', href: 'Leadership_Altitude_Model.html' },
      ]
    },
    // ─── SOW LANE: Jira & Metrics ───
    {
      section: 'Jira & Metrics',
      icon: '⚙️',
      anchor: 'jira',
      items: [
        // Placeholder — Jira config and metrics artifacts will land here
      ]
    },
    // ─── SOW LANE: OCM & Comms ───
    {
      section: 'OCM & Comms',
      icon: '📣',
      anchor: 'ocm',
      items: [
        { label: 'Communication System', icon: '📡', href: 'Subaru_Visual_Communication_System.html' },
      ]
    },
    // ─── CROSS-CUTTING: Organization ───
    {
      section: 'Organization',
      icon: '👥',
      anchor: 'organization',
      items: [
        { label: 'Org Chart', icon: '🏢', href: 'org/Subaru_MARS_Org_Chart.html', primary: true },
        { label: 'Team Explorer', icon: '🔍', href: 'org/Subaru_MARS_Team_Explorer.html' },
      ]
    },
    // ─── CROSS-CUTTING: Status & Reporting ───
    {
      section: 'Status & Reporting',
      icon: '📊',
      anchor: 'status',
      items: [
        { label: 'Weekly Dashboard', icon: '📈', href: '../status_updates/Subaru_MARS_Weekly_Status.html', primary: true },
      ]
    },
    // ─── CROSS-CUTTING: Frameworks & Models ───
    {
      section: 'Frameworks & Models',
      icon: '🏗️',
      anchor: 'frameworks',
      items: [
        { label: 'SOW Overview', icon: '📜', href: 'SOW_Overview_Diagram.html' },
      ]
    },
    // ─── CROSS-CUTTING: Brand & Design ───
    {
      section: 'Brand & Design',
      icon: '🎨',
      anchor: 'brand',
      items: [
        { label: 'Design System', icon: '🎯', href: '../design/Design_System.html' },
        { label: 'Co-Branding Strategy', icon: '🤝', href: '../design/brand/Co_Branding_Strategy.html' },
        { label: 'Co-Branded Examples', icon: '💎', href: 'examples/Co_Branded_Example.html' },
      ]
    },
  ];

  // ── Determine base path from current page to deliverables/ root ──
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

  // ── Resolve a sitemap href to the current page's relative position ──
  function resolveHref(href) {
    const base = getBasePath();
    return base + href;
  }

  // ── Check if a nav item matches the current page ──
  function isCurrentPage(href) {
    const resolved = resolveHref(href);
    const current = window.location.pathname;
    // Normalize: get just the filename for comparison
    const resolvedFile = resolved.split('/').pop();
    const currentFile = current.split('/').pop();
    return resolvedFile === currentFile;
  }

  // ── Find current section for topbar subtitle ──
  function getCurrentSection() {
    for (const group of SITE_MAP) {
      for (const item of group.items) {
        if (isCurrentPage(item.href)) {
          return {
            section: group.section,
            anchor: group.anchor || '',
            page: item.label
          };
        }
      }
    }
    return { section: '', anchor: '', page: document.title.replace('Subaru M.A.R.S. — ', '') };
  }

  // ── Build navigation drawer HTML ──
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
        // Empty section — show as disabled placeholder
        html += `<div class="mars-nav-section">
          <div class="mars-nav-item" style="opacity:0.45;cursor:default;">
            <span class="nav-icon">${group.icon || '📁'}</span>
            <span class="nav-label">${group.section}</span>
            <span class="nav-badge" style="background:transparent;color:var(--text-muted);font-style:italic;font-weight:400;font-size:9px;">coming soon</span>
          </div>
        </div>`;
      } else if (group.items.length === 1) {
        // Single item — render as standalone nav item
        const item = group.items[0];
        const active = isCurrentPage(item.href) ? ' active' : '';
        html += `<div class="mars-nav-section">
          <a class="mars-nav-item${active}" href="${resolveHref(item.href)}">
            <span class="nav-icon">${item.icon}</span>
            <span class="nav-label">${item.label}</span>
          </a>
        </div>`;
      } else {
        // Group with children — render as expandable
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

    // Version footer
    html += `<div style="margin-top:auto;padding:16px;border-top:1px solid var(--outline-variant,#E5E7EB);font-size:10px;color:var(--text-muted,#9CA3AF);">
      MARS Command Center v0.2<br>
      Turnberry Solutions
    </div>`;

    return html;
  }

  // ── Inject the shell ──
  function injectShell() {
    const current = getCurrentSection();

    // Wrap existing body content in mars-content
    const existingContent = document.body.innerHTML;

    // Build shell
    document.body.innerHTML = `
      <!-- Top Bar -->
      <div class="mars-topbar">
        <div class="mars-topbar-leading">
          <button class="mars-hamburger" id="mars-hamburger-btn" aria-label="Open navigation">☰</button>
          ${current.section ? `
            <a href="${resolveHref('Subaru_MARS_Command_Center.html')}${current.anchor ? '#' + current.anchor : ''}"
               style="color:rgba(255,255,255,0.7);text-decoration:none;font-size:13px;font-weight:500;white-space:nowrap;"
               onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.7)'"
            >${current.section}</a>
            <span style="color:rgba(255,255,255,0.35);font-size:14px;margin:0 2px;">›</span>
          ` : ''}
          <span class="mars-topbar-title">${current.page}</span>
        </div>
        <div class="mars-topbar-actions">
          <a href="${resolveHref('Subaru_MARS_Command_Center.html')}"
             style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:12px;font-weight:600;padding:6px 12px;border-radius:20px;border:1px solid rgba(255,255,255,0.2);">
            🏠 Home
          </a>
        </div>
      </div>

      <!-- Accent Bar -->
      <div class="mars-accent-bar"></div>

      <!-- Navigation Scrim -->
      <div class="mars-nav-scrim" id="mars-nav-scrim"></div>

      <!-- Navigation Drawer -->
      <nav class="mars-nav" id="mars-nav-drawer">
        ${buildNavHTML()}
      </nav>

      <!-- Content -->
      <div class="mars-content">
        ${existingContent}
      </div>
    `;

    // Wire up hamburger toggle
    const btn = document.getElementById('mars-hamburger-btn');
    const drawer = document.getElementById('mars-nav-drawer');
    const scrim = document.getElementById('mars-nav-scrim');

    function openNav() {
      drawer.classList.add('open');
      scrim.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeNav() {
      drawer.classList.remove('open');
      scrim.classList.remove('open');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', function () {
      if (drawer.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    scrim.addEventListener('click', closeNav);

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  // ── Initialize ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectShell);
  } else {
    injectShell();
  }
})();
