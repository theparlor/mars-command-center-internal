---
id: subaru-mars-interview-guide
name: Subaru M.A.R.S. Interview Guide
version: 1.0
archetype: assessment_tool
category: organizational_assessment
formats:
  - markdown (source)
  - html (interactive web app)
---

# Subaru M.A.R.S. Team Behavior Assessment

## Purpose

The Subaru M.A.R.S. Interview Guide is a structured behavioral assessment tool designed to evaluate team health, agile maturity, and organizational alignment across six engineering teams at Subaru of America. The guide uses 11 assessment categories and 49 behavioral questions to surface team practices, bottlenecks, decision patterns, and cultural health indicators.

The tool is designed for live use during team interviews with the Scrum Lead, Engineering Lead, Product Owner, and other stakeholders. It captures:

- **Answers** per question per team (single-select from predefined options)
- **Notes** per question per team (unstructured observations from interviewer)
- **Overall observations** per team (strengths, gaps, risks, team self-assessment, interviewer assessment)

The interactive HTML version persists all data to browser localStorage and supports:
- Multi-team navigation with per-team state isolation
- Real-time progress tracking
- Category-level navigation with answered question badges
- JSON export of all assessment data
- Clear team data (reset assessment)

## Teams Assessed

```json teams
[
  {"id": "retailer", "name": "Retailer Solutions", "manager": "Natalie Miller", "headcount": 13},
  {"id": "M.A.R.S.", "name": "M.A.R.S. Platforms", "manager": "Gino Guarnere", "headcount": 15},
  {"id": "subarucom", "name": "Subaru.com (AEM/FE)", "manager": "Kevin McCracken", "headcount": 73},
  {"id": "techshare", "name": "TechShare", "manager": "Kadeem Williams", "headcount": 16},
  {"id": "dealer_digital", "name": "Subaru.net", "manager": "Marc Rullo", "headcount": 25},
  {"id": "shared_svcs", "name": "Shared Services", "manager": "Greg Giuffrida (direct)", "headcount": 8}
]
```

## Assessment Categories (11 categories, 49 total questions)

The full CATEGORIES JSON (with complete question text, options, and notes_prompt) is embedded in the interactive HTML. A summary of category structure:

### 1. Intake & Prioritization (5 questions)
- Work intake source, mechanism, prioritization method
- Priority visibility, unplanned work handling

### 2. Events & Cadence (6 questions)
- Sprint cadence, standup format, refinement practice
- Sprint planning, retro practice, demo/review

### 3. Estimation & Capacity (4 questions)
- Estimation method, capacity planning, commitment accuracy, WIP management

### 4. Quality & QA (5 questions)
- QA structure, testing approach, Definition of Ready, Definition of Done, defect handling

### 5. Jira & Tooling (5 questions)
- Jira project structure, hierarchy, workflow, hygiene, reporting

### 6. Backlog & Work Management (3 questions)
- Backlog depth, work types, technical debt management

### 7. Cross-Team & Dependencies (3 questions)
- Dependency discovery, frequency, shared services access

### 8. Release & Deployment (4 questions)
- Release frequency, CI/CD maturity, code review, environment management

### 9. Communication & Decisions (4 questions)
- Decision authority, communication channels, documentation practice, stakeholder engagement

### 10. Team Roles & Accountability (6 questions)
- Scrum Lead, Engineering Lead, Product Lead, Design Lead, other leads, business partners

### 11. Team Health & Culture (4 questions)
- Team stability, contractor integration, improvement culture, pain points

## Observation Prompts

For each team, the interviewer captures observations across six dimensions:

- **Top 3 strengths observed** — Specific team capabilities and patterns observed
- **Top 3 improvement opportunities** — Process or practice gaps
- **Unique practices worth sharing** — Reusable patterns or innovations
- **Biggest risk or concern** — Single highest-impact issue
- **Team self-assessment (1-5)** — How the team rates its own agile maturity
- **Interviewer assessment (1-5)** — Interviewer's independent rating

## Interactive Behavior

The HTML version implements the following features:

### State Management
- Per-team answer isolation (each team has its own state)
- Per-question notes (unstructured interviewer observations)
- Per-team observations (6 free-form fields)
- localStorage persistence (auto-saves all data)
- Per-team progress counter (answered questions out of total)

### Navigation
- Team selector (horizontal scroll, shows answered count per team)
- Team info display (name, manager, headcount)
- Category navigator (horizontal scroll, shows answered count per category)
- Smooth category scroll-to with active highlight

### Answer Interaction
- Single-select per question (radio-like behavior)
- Toggle: clicking selected option again deselects it
- Visual feedback: selected option highlights with Subaru blue border and light blue background
- Question card highlights answered state (green left border)

### Data Export
- Export all team assessments to JSON (timestamped filename)
- Clear team data (reset single team's answers with confirmation)

## Visual Design

The interface uses the **mars-ui** design system (Subaru's internal UI kit):

- **Header**: White background, Subaru blue text, sticky top bar with progress counter
- **Team selector**: Rounded pill buttons, orange active state (lane-ocm)
- **Team info**: Subaru blue text, manager and headcount metadata
- **Category nav**: Horizontal scroll, blue active state with badge count
- **Category headers**: Orange background (lane-ocm), white uppercase text
- **Question cards**: White background, blue left border, hover shadow
- **Options**: Gray bordered buttons, blue selected state with light blue background
- **Notes section**: Optional text area with orange prompt label
- **Observations section**: Dark background, white text, 6 labeled text areas
- **Mobile responsive**: Full-width option buttons on small screens

