# File Organization Plan

## Current Structure Issues
- Multiple loose files in root directory
- Mixed content types (docs, tools, templates, assets)
- Inconsistent naming conventions
- Large binary files in root

## Proposed Reorganization

### Root Directory (Clean)
```
/
├── README.md
├── requirements.txt
├── taxonomy-browser-ui.html (main UI)
├── docs/
├── src/
├── assets/
├── reference/
└── .git/
```

### Reorganized Structure
```
docs/
├── authoring-guide.md
├── review-checklist.md
├── BUILD-USAGE.md (move from root)
├── policy-strategy.md (move from root)
├── professional-framing.md (move from root)
├── tone-value.md (move from root)
├── image-sources.md (move from root)
└── file-organization-plan.md

src/
├── scripts/
│   ├── build-knowledge-base.py
│   ├── build-prompt.py
│   ├── build.py
│   ├── serve.py
│   └── validate.py
├── schemas/
│   └── prompt.schema.json
└── templates/
    ├── guardrails.md
    └── professional-language.md

assets/
├── images/
│   └── watson-garrick-stippling.gif (move from root)
└── generated/
    ├── marcel-complete-prompt.txt (move from root)
    └── marcel-complete.md (move from root)

reference/
├── prompts/marcel/... (existing structure)
└── TODO-reference-files.md (move from root)

apps/
├── taxonomy-browser/ (future: move UI components here)
├── eval-app/
├── flash-image-gen/
├── museum-search/
└── viewer/

tools/
├── pointObjectInImage.md
├── showImageOnScreen.md
└── toolreadme.md
```

## Migration Steps
1. Create new directory structure
2. Move files to appropriate locations
3. Update import paths in scripts
4. Update documentation references
5. Test all functionality
6. Clean up empty directories

## Benefits
- Clear separation of concerns
- Easier navigation
- Better maintainability
- Consistent structure
- Reduced root clutter
