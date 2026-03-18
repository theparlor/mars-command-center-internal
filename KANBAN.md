# MARS Web — Kanban Board

> Internal work tracking for the MARS Command Center web application.
> Updated by Claude at the end of each work session.
> Read this first when resuming after an interruption.

**Last Updated:** 2026-03-18 (session 1)
**Current Version:** v0.2 (tagged in both repos)
**Next Version:** v0.3 (shell redesign)

---

## 🔴 BLOCKED

*(nothing currently blocked)*

---

## 🟡 IN PROGRESS

| Task | Context | Started |
|------|---------|---------|
| **v0.3 Shell Architecture** | Design doc created (`MARS_WEB_ARCHITECTURE.md`). Need to implement: sibling nav, pinned sidebar, width modes, breadcrumb fix, remove per-page hero headers. | 2026-03-18 |

---

## 🟢 READY (prioritized — do next)

| Task | Priority | Dependencies |
|------|----------|--------------|
| **Build v0.3 mars-shell.js** — sibling nav, pinned sidebar, full breadcrumb | P0 | Design doc decisions |
| **Build v0.3 mars-ui.css** — add .mars-sibling-nav, .mars-page-full, update .mars-page to left-align | P0 | Design doc decisions |
| **Strip per-page hero headers** from all 20 pages | P1 | v0.3 shell working |
| **Rename "Interactive Gantt"** → "Gantt Chart", remove scroll wrapper | P1 | — |
| **Add Turnberry Team section** to nav + Command Center | P1 | — |
| **Build deploy.sh** — deterministic sync/sanitize/push pipeline | P1 | — |
| **Regenerate Observation Guide** on MARS UI Kit (still STALE) | P2 | v0.3 shell |
| **Regenerate remaining pages** not yet on UI kit (Gantt, Calendar, Two-Week, Schedule Email, Weekly Status, Visual Comms, SOW Overview, Leadership Altitude, examples) | P2 | v0.3 shell |
| **Remove :root overrides from Command Center** | P2 | v0.3 shell |
| **Set up local git tracking** for Workspaces deliverables | P3 | — |

---

## ✅ DONE (this session)

| Task | Completed |
|------|-----------|
| Created MARS UI Kit (mars-ui.css + mars-shell.js) | 2026-03-18 |
| Built Command Center hub page | 2026-03-18 |
| Set up GitHub repos (private + public + Pages) | 2026-03-18 |
| Tagged v0.1 | 2026-03-18 |
| Normalized CSS tokens across 17 files | 2026-03-18 |
| Wired mars-ui + mars-shell into 20 pages | 2026-03-18 |
| Restructured nav to SOW lanes | 2026-03-18 |
| Regenerated Interview Guide (first pipeline proof) | 2026-03-18 |
| Created ASSET_REGISTRY.yaml | 2026-03-18 |
| Created canonical markdown sources (interview-guide, observation-guide, course-catalog) | 2026-03-18 |
| Regenerated schedule views (Reconciled, Decision Log, Card View) | 2026-03-18 |
| Regenerated Org Chart + Team Explorer | 2026-03-18 |
| Updated engagement-style.yaml with web generation spec | 2026-03-18 |
| Created MARS_WEB_ARCHITECTURE.md (design doc) | 2026-03-18 |
| Created KANBAN.md (this file) | 2026-03-18 |

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
