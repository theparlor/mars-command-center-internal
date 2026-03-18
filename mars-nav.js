/**
 * MARS Navigation Bar — Injected into all engagement HTML artifacts
 * Drop this script tag into any artifact to get a back-to-hub breadcrumb bar.
 *
 * Usage: <script src="mars-nav.js"></script>  (or adjust relative path)
 *
 * The script auto-detects its location relative to the Command Center
 * and builds the correct relative link.
 */
(function() {
  'use strict';

  // Determine relative path to Command Center based on current page location
  const path = window.location.pathname;
  let hubPath = 'Subaru_MARS_Command_Center.html';
  let crumbs = [];

  // Build breadcrumbs based on directory depth
  if (path.includes('/schedule/')) {
    hubPath = '../Subaru_MARS_Command_Center.html';
    crumbs = [
      { label: 'Command Center', href: hubPath },
      { label: 'Schedule & Timeline', href: hubPath + '#schedule' }
    ];
  } else if (path.includes('/org/')) {
    hubPath = '../Subaru_MARS_Command_Center.html';
    crumbs = [
      { label: 'Command Center', href: hubPath },
      { label: 'Organization', href: hubPath + '#organization' }
    ];
  } else if (path.includes('/curriculum/')) {
    hubPath = '../Subaru_MARS_Command_Center.html';
    crumbs = [
      { label: 'Command Center', href: hubPath },
      { label: 'Curriculum & Training', href: hubPath + '#curriculum' }
    ];
  } else if (path.includes('/examples/')) {
    hubPath = '../Subaru_MARS_Command_Center.html';
    crumbs = [
      { label: 'Command Center', href: hubPath },
      { label: 'Brand & Design', href: hubPath + '#brand' }
    ];
  } else if (path.includes('/status_updates/')) {
    hubPath = '../deliverables/Subaru_MARS_Command_Center.html';
    crumbs = [
      { label: 'Command Center', href: hubPath },
      { label: 'Status & Reporting', href: hubPath + '#status' }
    ];
  } else if (path.includes('/design/')) {
    hubPath = '../deliverables/Subaru_MARS_Command_Center.html';
    crumbs = [
      { label: 'Command Center', href: hubPath },
      { label: 'Brand & Design', href: hubPath + '#brand' }
    ];
  } else {
    // Same directory as Command Center (deliverables root)
    crumbs = [
      { label: 'Command Center', href: hubPath }
    ];
  }

  // Get current page title
  const pageTitle = document.title.replace('Subaru M.A.R.S. — ', '').replace('Subaru M.A.R.S. ', '');

  // Build nav bar HTML
  const nav = document.createElement('div');
  nav.id = 'mars-nav';
  nav.innerHTML = `
    <style>
      #mars-nav {
        background: #FFFFFF;
        border-bottom: 1px solid #E5E7EB;
        padding: 8px 24px;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 6px;
        position: sticky;
        top: 0;
        z-index: 9999;
        box-shadow: 0 1px 2px rgba(0,0,0,0.04);
      }
      #mars-nav a {
        color: #1D4F91;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.15s;
      }
      #mars-nav a:hover {
        color: #00205B;
        text-decoration: underline;
      }
      #mars-nav .sep {
        color: #D1D5DB;
        margin: 0 2px;
      }
      #mars-nav .current {
        color: #6B7280;
        font-weight: 500;
      }
      #mars-nav .home-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        background: #00205B;
        color: white;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 800;
        margin-right: 6px;
        text-decoration: none;
      }
      #mars-nav .home-icon:hover {
        background: #1D4F91;
      }
    </style>
    <a class="home-icon" href="${hubPath}" title="Back to Command Center">◁</a>
    ${crumbs.map(c => `<a href="${c.href}">${c.label}</a><span class="sep">›</span>`).join('')}
    <span class="current">${pageTitle}</span>
  `;

  // Insert at the very top of body, before everything else
  if (document.body.firstChild) {
    document.body.insertBefore(nav, document.body.firstChild);
  } else {
    document.body.appendChild(nav);
  }
})();
