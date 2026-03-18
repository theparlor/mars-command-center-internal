# Canonical Markdown Sources

> Every deliverable asset has a markdown source file in this directory.
> Markdown is the **source of truth**. HTML, PDF, PPTX, DOCX are generated outputs.

## Architecture

```
sources/*.md  ──→  [generation pipeline]  ──→  deliverables/*.(html|pdf|pptx|docx)
     ↑                                                ↑
  Edit here                                    Don't edit these directly
  (content + structure)                        (regenerate from source)
```

## Workflow

1. **Edit the markdown** when content changes
2. **Bump source_version** in `ASSET_REGISTRY.yaml`
3. **Ask Claude to regenerate** the format you need right now
4. Claude delivers your requested format, then background-regenerates other stale formats
5. Registry auto-updates with new `built_from` versions

## Markdown Conventions

- **Front matter** (YAML between `---` fences): Asset metadata, generation hints
- **Content sections**: Map 1:1 to HTML sections, slide sequences, or PDF chapters
- **Data blocks** (fenced JSON/YAML): Structured data that feeds interactive components
  (e.g., team rosters, question banks, schedule activities)
- **Generation hints** (`<!-- gen: ... -->`): Instructions for format-specific rendering

## Version Scheme

- `MAJOR.MINOR.PATCH`
- MAJOR: Structural change (new sections, reorganized content)
- MINOR: Content change (updated data, revised text)
- PATCH: Cosmetic fix (typo, formatting)

## Engagement Portability

To create a new engagement:
1. Copy this `sources/` directory
2. Replace content with new engagement data
3. Update `ASSET_REGISTRY.yaml` with new asset list
4. Regenerate all formats from the new markdown sources
