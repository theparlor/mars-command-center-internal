# MARS Web Architecture — Design Document

> Foundational reference for the MARS Command Center web application.
> This document is the session recovery checkpoint — any new Claude session
> reads this first to understand what exists, what's decided, and what's next.

**Version:** 0.3-draft
**Last Updated:** 2026-03-18
**Author:** Brien + Claude
**Status:** Active — decisions are binding, architecture is under construction

---

## 1. Purpose & Context

### What is this?

A web application that serves as the interactive command center for the Subaru M.A.R.S. Agile Transformation engagement. It provides a unified navigation experience across ~25 HTML artifacts — schedules, org charts, coaching tools, training catalogs, status dashboards, and design references.

### Who uses it?

- **Brien** — primary author, uses daily for engagement management
- **Turnberry team peers** — Jason, Dean, Louise — view-only consumers of schedule, status, and coaching tools
- **Eventually: Subaru stakeholders** — limited views embedded in SharePoint

### Where does it run?

- **Local:** Brien opens HTML files directly from his filesystem
- **GitHub Pages (public, sanitized):** https://theparlor.github.io/mars-command-center/
- **GitHub (private, real data):** https://github.com/theparlor/mars-command-center-internal
- **Future: Azure Static Web Apps** with AAD auth for real data
- **Future: SharePoint embed** via iframe or SPFx web part

### Key Constraint

All artifacts must work as standalone HTML files opened from the local filesystem. No build step, no server, no Node.js dependency. The UI kit (CSS + JS) loads via relative paths.

---

## 2. File Architecture

```
deliverables/
├── Subaru_MARS_Command_Center.html    # Hub page (archetype: hub)
├── Subaru_MARS_Interview_Guide.html   # Coaching tool (archetype: detail)
├── Subaru_Roadmap_Session_Observation_Guide.html
├── Leadership_Altitude_Model.html
├── SOW_Overview_Diagram.html
├── Subaru_Visual_Communication_System.html
│
├── mars-ui/                           # ← THE UI KIT
│   ├── mars-ui.css                    # Tokens + components (canonical)
│   └── mars-shell.js                  # Navigation shell (auto-injected)
│
├── schedule/                          # Schedule & Timeline lane
│   ├── Subaru_MARS_Reconciled_Schedule.html
│   ├── Subaru_MARS_Gantt_Views.html
│   ├── Subaru_MARS_Calendar_View.html
│   ├── Subaru_MARS_Two_Week_Look_Ahead.html
│   ├── Subaru_MARS_Card_View.html
│   ├── Subaru_MARS_Decision_Log.html
│   └── Subaru_MARS_Schedule_Email.html
│
├── org/                               # Organization
│   ├── Subaru_MARS_Org_Chart.html
│   └── Subaru_MARS_Team_Explorer.html
│
├── curriculum/                        # Curriculum & Training lane
│   └── Subaru_MARS_Course_Catalog.html
│
├── examples/                          # Brand examples
│   ├── Co_Branded_Email.html
│   ├── Co_Branded_Example.html
│   └── Co_Branding_Miro_Planogram.html
│
├── sources/                           # Canonical markdown sources
│   ├── README.md
│   ├── interview-guide.md
│   ├── observation-guide.md
│   └── course-catalog.md
│
├── ASSET_REGISTRY.yaml                # Build manifest (source → format tracking)
└── MARS_WEB_ARCHITECTURE.md           # ← THIS DOCUMENT
```

### Related directories (outside deliverables/)

```
design/
├── Design_System.html                 # Visual reference
├── engagement-style.yaml              # Canonical design tokens (YAML)
└── brand/
    ├── Co_Branding_Strategy.html
    └── *.png                          # Logo files

status_updates/
└── Subaru_MARS_Weekly_Status.html     # Dashboard (archetype: dashboard)
```

---

## 3. Navigation Architecture

### 3.1 Primary Taxonomy — SOW Lanes

Navigation sections align to the Statement of Work's engagement lanes (Gantt swim lanes). This ensures the navigation mental model matches how the team thinks about the work.

| Section | Lane Color | Artifacts | Status |
|---------|-----------|-----------|--------|
| **Schedule & Timeline** | Training blue `--lane-training` | 7 pages | Active |
| **Curriculum & Training** | Training blue `--lane-training` | 1 page | Active |
| **Coaching Insights** | Coaching purple `--lane-coaching` | 3 pages | Active |
| **Jira & Metrics** | Jira teal `--lane-jira` | 0 pages | Placeholder |
| **OCM & Comms** | OCM orange `--lane-ocm` | 2 pages | Active |
| **Organization** | Coaching purple `--lane-coaching` | 2 pages | Active |
| **Status & Reporting** | Green `--status-ontrack` | 1 page | Active |
| **Frameworks & Models** | Milestone red `--lane-milestones` | 1 page | Active |
| **Brand & Design** | Admin gray `--lane-admin` | 3 pages | Active |
| **Turnberry Team** | *(TBD)* | TBD | **NEW — not yet built** |

### 3.2 Navigation Components

The shell provides three navigation layers:

#### Layer 1: Top Bar (persistent, fixed)
- Left: Hamburger button → opens nav drawer
- Center: Breadcrumb path: `Command Center › Section › Page` (each segment clickable)
- Right: Home button (always visible)
- Height: 56px, background: `--subaru-blue`

#### Layer 2: Navigation Drawer (modal, slides from left)
- Width: 280px
- Sections: expandable groups matching the SOW lanes
- Active page highlighted, current section auto-expanded
- Empty sections show "coming soon" placeholder
- Close on: scrim click, Escape key, any navigation
- Version footer at bottom

#### Layer 3: Sibling Navigation (**v0.3 — NEW**)
- Appears below the top bar on pages that have siblings in the same section
- Horizontal pill/tab bar showing all pages in the current section
- Current page highlighted
- Example: On the Calendar View, shows: `Schedule | Gantt | Calendar | Look Ahead | Cards | Decisions`
- Does NOT appear on the Command Center (hub pages use the quick-nav pill bar instead)

### 3.3 Breadcrumb Specification

Every page shows a full breadcrumb path in the top bar:

```
☰  Command Center › Coaching Insights › Team Assessment Guide     🏠 Home
```

- **Command Center** always present as root, links to `Subaru_MARS_Command_Center.html`
- **Section name** links to Command Center section anchor (e.g., `#coaching`)
- **Page name** is the current page (not clickable, bold)
- On the Command Center itself: `☰  Home › Command Center`

---

## 4. Layout Architecture

### 4.1 Width Modes

**DECISION:** Pages operate in one of two width modes. The mode is determined by the page's content type, not by the shell.

| Mode | Max Width | Alignment | Use When |
|------|-----------|-----------|----------|
| **Contained** | 1200px | Left-aligned | Hub pages, text-heavy pages, card grids |
| **Full-width** | 100% viewport | Edge-to-edge | Gantt charts, org charts, data tables, calendars |

**Why left-aligned, not centered?** Left alignment creates a stable content anchor that doesn't shift when the sidebar opens. It also feels more like an application (Jira, Confluence, SharePoint) and less like a marketing landing page.

### 4.2 Sidebar Pinning (**v0.3 — NEW**)

On viewports ≥1280px, the navigation drawer can be **pinned open** as a persistent left sidebar. This converts the modal drawer into a standard navigation pattern:

| Viewport | Drawer Behavior | Content Offset |
|----------|----------------|----------------|
| < 1280px | Modal (overlay + scrim) | No offset |
| ≥ 1280px | Pinned by default, toggleable | Content shifts right 280px |

When pinned:
- Hamburger icon becomes a "close sidebar" icon (←)
- Content area starts at left: 280px
- Sidebar is always visible, no scrim needed
- User can collapse it (returns to modal mode)

### 4.3 Page Structure (no per-page hero headers)

**DECISION:** Pages do NOT have their own hero/header bands. The shell's top bar IS the header. This eliminates the "whiteout" collision bug where page headers sat under the fixed top bar.

Page structure:
```
[Top Bar — fixed, 56px]
[Accent Bar — 4px]
[Sibling Nav — if applicable, ~44px]
[Page Content — starts here]
  └── For contained pages: .mars-page wrapper (max-width, left-aligned)
  └── For full-width pages: no wrapper, content fills viewport
[Footer]
```

---

## 5. Component Inventory

### 5.1 From mars-ui.css (existing)

| Component | Class | Status |
|-----------|-------|--------|
| Top Bar | `.mars-topbar` | ✅ Working |
| Nav Drawer | `.mars-nav` | ✅ Working |
| Hero Banner | `.mars-hero` | ✅ Working (hub pages only) |
| Cards | `.mars-card`, `.mars-card-elevated` | ✅ Working |
| Card Grid | `.mars-card-grid`, `.mars-card-grid.wide` | ✅ Working |
| Chips | `.mars-chip.lane-*`, `.mars-chip.status-*` | ✅ Working |
| Tables | `.mars-table` | ✅ Working |
| Breadcrumbs | `.mars-breadcrumb` | ✅ Working |
| Section Headers | `.mars-section-header` | ✅ Working |
| Footer | `.mars-footer` | ✅ Working |
| Stat Chips | `.mars-stat` | ✅ Working |
| Format Badge | `.mars-format-badge` | ✅ Working |
| Accent Bar | `.mars-accent-bar` | ✅ Working |

### 5.2 New for v0.3

| Component | Class | Purpose |
|-----------|-------|---------|
| Sibling Nav | `.mars-sibling-nav` | Tab bar for same-section pages |
| Pinned Sidebar | `.mars-nav.pinned` | Persistent left nav on wide viewports |
| Full-width wrapper | `.mars-page-full` | No max-width, edge-to-edge |
| Contained wrapper | `.mars-page` (updated) | Left-aligned, max-width: 1200px |

---

## 6. Design Token System

### 6.1 Token Hierarchy

```
engagement-style.yaml          ← Canonical source of truth (YAML)
    ↓
mars-ui/mars-ui.css :root {}   ← CSS implementation (consumed by pages)
    ↓
Page-specific <style> blocks   ← ONLY layout, NEVER token overrides
```

### 6.2 Naming Convention

All CSS custom properties follow this taxonomy:

| Prefix | Purpose | Example |
|--------|---------|---------|
| `--subaru-*` | Client brand colors | `--subaru-blue` |
| `--star-cluster` | Client secondary | |
| `--bright-blue` | Client accent | |
| `--lane-*` | Work type / swim lane | `--lane-training` |
| `--tint-*` | Lane background (10% tint) | `--tint-coaching` |
| `--text-*` (lane) | Dark text on tint | `--text-jira` |
| `--status-*` | Health indicators | `--status-ontrack` |
| `--surface*` | Background surfaces | `--surface-dim` |
| `--border-*` / `--outline*` | Lines and borders | `--border-soft` |
| `--text-primary/secondary/muted` | Text hierarchy | |
| `--elevation-*` | Box shadows (MD3) | `--elevation-2` |
| `--shape-*` | Border radius (MD3) | `--shape-md` |
| `--motion-*` | Animation curves | `--motion-standard` |
| `--duration-*` | Animation timing | `--duration-medium` |

### 6.3 Rules

1. **NEVER** use hardcoded hex colors in page CSS — always `var(--token-name)`
2. **NEVER** define `:root` overrides in page `<style>` blocks — tokens come from mars-ui.css only
3. Page-specific CSS defines **layout and component structure only**
4. Lane colors are **engagement-neutral** — they don't change between clients
5. Brand colors (`--subaru-*`, `--star-cluster`, `--bright-blue`) are **engagement-specific** — these change when porting to a new client

---

## 7. Content Pipeline

### 7.1 Canonical Source Architecture

```
sources/*.md (markdown)  ──→  generation  ──→  *.html, *.pdf, *.pptx, *.docx
         ↑                                              ↑
    Edit content here                           Generated outputs
    Bump version in ASSET_REGISTRY.yaml         Don't edit directly
```

### 7.2 ASSET_REGISTRY.yaml

Tracks every asset's source version and each format's build-from version. When `source_version > format.built_from`, the format is **STALE**.

### 7.3 Markdown Structure

```yaml
---
id: interview-guide
name: "Team Behavior Assessment"
version: "1.1.0"
archetype: detail
category: coaching
formats: [html]
---

# Narrative content here

## Data Blocks (fenced JSON/YAML for structured content)

## Generation Notes (hints for format-specific rendering)
```

### 7.4 Generation Workflow

1. Edit markdown source
2. Bump version in ASSET_REGISTRY.yaml
3. Request specific format generation (e.g., "regenerate the Interview Guide HTML")
4. Claude generates the requested format immediately
5. Claude background-generates other stale formats
6. Registry updated with new `built_from` versions

---

## 8. Deployment Architecture

### 8.1 Repositories

| Repo | Visibility | Content | URL |
|------|-----------|---------|-----|
| `mars-command-center-internal` | Private | Real data, Subaru names | github.com/theparlor/... |
| `mars-command-center` | Public | Sanitized (Apex/DRIVE) | theparlor.github.io/... |

### 8.2 Sanitization Map

| Real | Sanitized |
|------|-----------|
| Subaru of America | Apex Motors |
| M.A.R.S. | DRIVE |
| Turnberry Solutions | Meridian Consulting |
| Camden, NJ | Metro City, ST |
| All personal names | Generic replacements |
| subaru-logo-* | apex-logo-* |

### 8.3 Deploy Workflow (needs automation — see Kanban)

Currently manual:
1. Edit files in local Workspaces
2. Sync to private repo staging → commit → push
3. Copy private → public staging → run sanitization → rename files → commit → push
4. GitHub Pages auto-deploys ~30 seconds after push

**Known bug:** The manual sync has caused nested directory issues (`mars-ui/mars-ui/`). Needs a deterministic `deploy.sh` script.

### 8.4 Version Tagging

| Tag | Description | Date |
|-----|-------------|------|
| v0.1 | Initial Command Center, 17 standalone HTML files | 2026-03-18 |
| v0.2 | MARS UI Kit + Navigation shell added | 2026-03-18 |
| v0.3 | (planned) Shell redesign, sibling nav, pinned sidebar, width modes | — |

---

## 9. Decision Logs

### 9.1 Architectural Decisions

| ID | Decision | Rationale | Date |
|----|----------|-----------|------|
| AD-01 | **Custom MARS UI Kit** over Materialize/MDL/@material/web | No actively maintained Material CSS library fits our constraints (static HTML, no build, works in SharePoint). Custom kit gives us zero dependencies and full control. | 2026-03-18 |
| AD-02 | **Markdown as canonical source** with YAML front matter + fenced data blocks | Markdown is human-readable, git-diffable, and doesn't require a build toolchain. Structured data embeds as fenced JSON/YAML blocks. | 2026-03-18 |
| AD-03 | **ASSET_REGISTRY.yaml** for version tracking | Tracks source→format lineage. Enables "what's stale?" queries and async regeneration. | 2026-03-18 |
| AD-04 | **mars-shell.js auto-injection** — shell wraps page content dynamically | Avoids copy-pasting navigation HTML into every file. One JS file, consistent shell across all pages. | 2026-03-18 |
| AD-05 | **Two GitHub repos** — private (real) + public (sanitized) | Separates real client data from shareable demo. Public repo enables GitHub Pages without exposing sensitive content. | 2026-03-18 |
| AD-06 | **No per-page hero headers** — shell top bar IS the header | Eliminates collision between fixed top bar and page-level headers (the "whiteout" bug). | 2026-03-18 |
| AD-07 | **Left-aligned contained content** (not centered) | Feels like an application, creates stable content anchor when sidebar opens, matches enterprise tools (Jira, Confluence). | 2026-03-18 |

### 9.2 Design Decisions

| ID | Decision | Rationale | Date |
|----|----------|-----------|------|
| DD-01 | **SOW lanes as primary nav taxonomy** | Navigation should mirror how the team thinks about the work. Gantt swim lanes = engagement operating system. | 2026-03-18 |
| DD-02 | **Coaching Insights** section for Interview Guide, Observation Guide, Leadership Model | These are coaching tools, not curriculum. Curriculum = what we teach. Coaching = how we observe and assess. | 2026-03-18 |
| DD-03 | **Sibling tab navigation** below top bar | When a section has 5+ pages (Schedule), users need to hop between siblings without opening the hamburger. | 2026-03-18 |
| DD-04 | **Gantt renamed from "Interactive Gantt"** to just "Gantt Chart" | It's not interactive — it's a static Gantt in a scroll container. Overpromising the label undermines trust. | 2026-03-18 |
| DD-05 | **Full-width for data pages, contained for text pages** | Gantt, org chart, calendars need viewport width. Hub pages, guides, catalogs benefit from constrained reading width. | 2026-03-18 |
| DD-06 | **Pinned sidebar on ≥1280px viewports** | Wide screens have the real estate. Persistent sidebar eliminates the "where am I?" problem on larger monitors. | 2026-03-18 |

### 9.3 Business Decisions

| ID | Decision | Rationale | Date |
|----|----------|-----------|------|
| BD-01 | **Engagement-portable architecture** | Every structural choice (UI kit, tokens, nav shell, registry) is designed to be copied to a new engagement with only brand tokens swapped. Brien's IP, not a one-off. | 2026-03-18 |
| BD-02 | **SOW-to-HTML generation spec** in engagement-style.yaml | Given a proposal/SOW, the system should generate schedule, curriculum, milestones, org chart, and command center automatically. This is the consulting accelerator play. | 2026-03-18 |
| BD-03 | **Turnberry Team section** added to navigation | Team needs an internal space for working materials, meeting notes, and Turnberry-specific resources. | 2026-03-18 |
| BD-04 | **Public demo as capability showcase** | The sanitized GitHub Pages site demonstrates the system to prospects without exposing client data. This is marketing collateral that doubles as a technical proof of concept. | 2026-03-18 |

---

## 10. Known Issues & Technical Debt

| ID | Issue | Severity | Status |
|----|-------|----------|--------|
| BUG-01 | **Whiteout headers** — pages with own hero bands collide with shell top bar | High | **Fix in v0.3** (remove per-page heroes) |
| BUG-02 | **Nested directory bug** — manual sync creates `mars-ui/mars-ui/` | Medium | Needs deploy.sh automation |
| BUG-03 | **Gantt horizontal scroll** — leftover from SharePoint embed prep | Low | Remove scroll wrapper, let it breathe full-width |
| BUG-04 | **Command Center still has :root overrides** | Medium | Should inherit from mars-ui.css only |
| BUG-05 | **Some pages not yet regenerated** on UI kit | Medium | See Kanban below |
| DEBT-01 | **No deploy.sh script** — deployment is manual multi-step bash | High | Build deterministic deploy pipeline |
| DEBT-02 | **No local ↔ GitHub sync** — files exist in Workspaces but aren't git-tracked locally | Medium | Need git init in Workspaces or symlink strategy |
| DEBT-03 | **Observation Guide still STALE** in registry | Low | Regenerate on next pass |

---

## 11. Engagement Portability Spec

To spin up the MARS system for a new engagement (e.g., F&G proposal):

1. **Copy** `mars-ui/` directory
2. **Update** `:root` variables in mars-ui.css:
   - `--subaru-blue` → new client primary
   - `--star-cluster` → new client secondary
   - `--bright-blue` → new client accent
3. **Update** `mars-shell.js` SITE_MAP with new navigation structure
4. **Update** page titles and attribution text
5. **Replace** logo files in `design/brand/`
6. **Generate** pages from SOW using the `sow_to_html_generation` spec in engagement-style.yaml

Lane colors, status colors, surface system, MD3 tokens, and component vocabulary are **engagement-neutral** and should NOT change.

---

*This document is the session recovery checkpoint. Read it first in any new session.*
*Path: `deliverables/MARS_WEB_ARCHITECTURE.md`*
