# MARS Web — Kanban Board

> Internal work tracking for the MARS Command Center web application.
> Updated by Claude at the end of each work session.
> Read this first when resuming after an interruption.

**Last Updated:** 2026-03-18 (session 1, late evening)
**Current Version:** v0.3.1 (deployed, CDN cache busted)
**Next Version:** v0.4 (deeper pages, content refresh, Turnberry Team section)

---

## 🔴 BLOCKED

*(nothing currently blocked)*

---

## 🟡 IN PROGRESS

*(nothing currently in progress)*

---

## 🟢 READY (prioritized — do next)

| Task | Priority | Dependencies |
|------|----------|--------------|
| **Clean up residual text** on Gantt page ("DRIVE" / subtitle leaking outside .header class) | P1 | — |
| **Fix deploy.sh step 6b** — sed quoting issue causes script exit; needs bash escaping fix | P1 | — |
| **Rename "Interactive Gantt"** to "Gantt Chart" in Command Center card title | P2 | — |
| **Set up local git tracking** for Workspaces deliverables | P3 | — |

---

## ✅ DONE (this session)

| Task | Completed |
|------|-----------|
| Created MARS UI Kit v0.2 (mars-ui.css + mars-shell.js) | 2026-03-18 |
| Built Command Center hub page | 2026-03-18 |
| Set up GitHub repos (private + public + Pages) | 2026-03-18 |
| Tagged v0.1, v0.2, v0.2-final | 2026-03-18 |
| Normalized CSS tokens across 17 files | 2026-03-18 |
| Wired mars-ui + mars-shell into 20 pages | 2026-03-18 |
| Restructured nav to SOW lanes (Training, Coaching, Jira, OCM) | 2026-03-18 |
| Regenerated Interview Guide (first pipeline proof) | 2026-03-18 |
| Created ASSET_REGISTRY.yaml | 2026-03-18 |
| Created canonical markdown sources (interview-guide, observation-guide, course-catalog) | 2026-03-18 |
| Regenerated schedule views (Reconciled, Decision Log, Card View) | 2026-03-18 |
| Regenerated Org Chart + Team Explorer | 2026-03-18 |
| Updated engagement-style.yaml with full web generation spec | 2026-03-18 |
| Created MARS_WEB_ARCHITECTURE.md (design doc) | 2026-03-18 |
| Created KANBAN.md (this file) | 2026-03-18 |
| **Built v0.3 mars-shell.js** — sibling nav, pinned sidebar, full breadcrumbs | 2026-03-18 |
| **Built v0.3 mars-ui.css** — sibling nav styles, width modes, left-align | 2026-03-18 |
| **Removed Command Center :root overrides** — all tokens from mars-ui.css | 2026-03-18 |
| **Built deploy.sh** — deterministic 9-step pipeline | 2026-03-18 |
| **Deployed v0.3** to both repos, tagged | 2026-03-18 |
| **Fixed sanitization leaks** in 9 files (two passes) | 2026-03-18 |
| **Renamed "Interactive Gantt"** → "Gantt Chart" in nav SITE_MAP | 2026-03-18 |
| **Added Turnberry Team** section to nav (placeholder) | 2026-03-18 |
| **Regenerated 7 more pages** on UI kit (Gantt, Calendar, TwoWeek, VisComms, SOW, Leadership, Weekly Status) | 2026-03-18 |
| **Fixed hero header suppression** — CSS rule hides .header, .top-bar, .header-bar, .accent-bar inside shell | 2026-03-18 |
| **Fixed CDN cache** — force-busted GitHub Pages cache for CSS rule deployment | 2026-03-18 |
| **Visual QA passed** — Card View, Gantt Chart, Interview Guide all rendering clean | 2026-03-18 |

---

## 📋 BACKLOG (future sessions)

| Task | Notes |
|------|-------|
| PDF generation with TOC matching HTML navigation | Brien wants snapshot PDFs that mirror the web structure |
| SharePoint embed investigation | How to iframe HTML artifacts into SPO |
| Azure Static Web Apps deployment | AAD-authenticated hosting for real data |
| SOW-to-HTML generation pipeline | Auto-generate schedule/curriculum/milestones from proposal text |
| New engagement test: F&G proposal | Port the system to a second engagement to prove portability |
| CI/CD with GitHub Actions | Auto-sanitize and deploy on push to private repo |

---

## 🔑 Session Recovery Checklist

When starting a new session after interruption:

1. **Read** `deliverables/MARS_WEB_ARCHITECTURE.md` — the full design doc
2. **Read** `deliverables/KANBAN.md` — this file (current state of work)
3. **Read** `design/engagement-style.yaml` — design tokens and generation rules
4. **Check** `deliverables/ASSET_REGISTRY.yaml` — which assets are stale
5. **Check** git status in both repos — any uncommitted work?
6. **Pick up** the top item in the READY column above

---

*Path: `deliverables/KANBAN.md`*
