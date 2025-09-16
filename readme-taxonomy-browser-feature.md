# ArtSensei AI Drawing Tutor - Complete Development Suite

**Artwork Repository**: https://github.com/Rob-24-ai/ArtSensei-deployed-/tree/main/frontend/public

## 📋 Table of Contents

1. [Overview](#overview)
2. [Applications](#applications)
   - [Marcel System Prompting](#marcel-system-prompting)
   - [Flash Image Generator](#flash-image-generator)
   - [Evaluation App](#evaluation-app-work-in-progress)
   - [Taxonomy Browser UI](#taxonomy-browser-ui)
   - [Museum Search](#museum-search)
3. [Quick Start Guide](#quick-start-guide)
4. [Development Structure](#development-structure)
5. [Authoring & Validation](#authoring--validation)

## Overview

A comprehensive development suite for the ArtSensei AI drawing tutor ecosystem, featuring modular system prompts, image generation capabilities, and evaluation tools.

## Applications

### Marcel System Prompting

A structured system for managing modular, composable system prompts for the Marcel AI drawing tutor.

**Location:** `prompts/marcel/`

**Key Features:**
- **Drawing Mark Taxonomy:** Structured analysis framework for mark features and functions
- **Figure Work Analysis:** Professional, taxonomic handling of artistic nudity
- **Tacit Consent System:** Figure references only available after user-initiated consent
- **Modular Architecture:** Composition-first design; prompts are constructed from small, reusable modules

**Structure:**
- `prompts/marcel/` — Marcel's complete prompt, assembled from modular components
- `prompts/marcel/assets/` — Image metadata and visual example JSON files
- `templates/` — Reusable content blocks (e.g., guardrails, consent, professional language)
- `schemas/` — JSON Schemas for module metadata and prompt structure validation
- `docs/` — Authoring conventions and review checklists

### Flash Image Generator

A local web application for generating high-quality images using Google's Gemini 2.5 Flash image generation API.

**Location:** `flash-image-gen/`

**Features:**
- 🎨 Generate high-quality images from text prompts
- 📐 Multiple aspect ratios (Square, Landscape, Portrait)
- 💾 Automatic image saving and download
- 🌟 Beautiful, responsive web UI
- ⚡ Fast generation with Google's latest API
- 🔄 Automatic retry logic for consistent results

**Quick Start:**
```bash
cd flash-image-gen
npm install
cp .env.example .env
# Add your Google API key to .env
npm start
# Open http://localhost:3000
```

### Evaluation App (Work in Progress)

An integrated evaluation system for testing and refining AI feedback using the latest system prompt and knowledge base.

**Location:** `eval-app/`

**Current Status:** ⚠️ **Needs Additional Work**
- ✅ Backend integration with system prompting repository
- ✅ Knowledge base loading from deployed ArtSensei
- ✅ API endpoints for prompt and knowledge base serving
- ❌ Frontend UI improvements needed
- ❌ Complete workflow testing required
- ❌ Authentication and deployment configuration

**Features Implemented:**
- Automatic loading of current Marcel system prompt
- Integration with deployed ArtSensei knowledge base
- API endpoints for feedback generation
- Local development environment setup

**Remaining Work:**
- UI/UX improvements for evaluation workflow
- Complete end-to-end testing
- Production deployment configuration
- Enhanced error handling and user feedback

### Taxonomy Browser UI

An interactive educational interface for exploring ArtSensei's Mark and Tone taxonomy system with artist method examples.

**Location:** `feature/taxonomy-browser-ui` branch
**File:** `taxonomy-browser-ui.html`

**Features:**
- 🎨 Interactive 3-column navigation (Categories → Methods → Artist Examples)
- 📚 Complete Mark Features & Functions taxonomy
- 🖼️ Integrated artist method examples with GIFs
- 🔍 Detailed method descriptions, keywords, and reference files
- 📱 Responsive design with resizable columns
- ✨ Clean, educational interface with proper image alignment

**Status:** ⚠️ **Needs Additional Work**
- All Mark and Tone categories populated with real data
- Artist method examples connected to knowledge base
- Image layout optimized (left-aligned, no borders)
- Interactive navigation and highlighting working
- Proper branch organization for feature development

**To-Do:**
- **Fix this whole thing** - Artist-level URL persistence still not working properly
  - URL updates correctly when clicking artists
  - Page refresh fails to restore artist selection and highlighting
  - Navigation state gets lost at the deepest level of the taxonomy
  - Requires systematic debugging of restoration timing and element selection

### Museum Search

A simple web interface for searching museum collections for art reference images.

**Location:** `museum-search/`
**Files:** `index.html`, `script.js`

**Features:**
- 🏛️ Search interface for museum collections
- 🔍 Simple, focused search functionality
- 📱 Basic responsive web interface

**Status:** ⚠️ **Needs Significant Development Work**
- Current implementation is not functional
- Requires complete rebuild of search functionality
- Multi-museum API integration needs implementation

## Quick Start Guide

### Marcel System Prompting
1. Main prompt: `prompts/marcel/prompt.md` (assembles all modules)
2. Core Instructions: `prompts/marcel/1-persona.md`, `2-philosophy.md`, etc.
3. Content & Knowledge: `prompts/marcel/reference/`, `prompts/marcel/case-studies/`
4. Guardrails: `templates/guardrails.md`

### Flash Image Generator
```bash
cd flash-image-gen
npm install
cp .env.example .env
# Add your Google API key to .env
npm start
# Open http://localhost:3000
```

### Evaluation App
```bash
cd eval-app
npm install
npm run build
npm start
# Open http://localhost:3001
```

### Taxonomy Browser UI
```bash
git checkout feature/taxonomy-browser-ui
# Open taxonomy-browser-ui.html in browser
```

### Museum Search
```bash
# Open museum-search/index.html in browser
```

## Development Structure

### Repository Layout
```
├── prompts/marcel/          # Marcel system prompts
├── flash-image-gen/         # Image generation app
├── eval-app/               # Evaluation system (WIP)
├── museum-search/          # Museum collection search interface
├── templates/              # Reusable prompt components
├── schemas/                # JSON validation schemas
├── docs/                   # Documentation and guides
├── scripts/                # Build and utility scripts
├── tools/                  # Tool configurations
└── taxonomy-browser-ui.html # Taxonomy browser (in feature branch)
```

### Branch Organization
- **`main`** - Stable releases and core system prompting
- **`eval-app-integration`** - Evaluation app development
- **`feature/taxonomy-browser-ui`** - Interactive taxonomy browser interface

## Authoring & Validation

### Prompt Development Rules
- Use `{{ include: path/to/file.md }}` directives for prompt composition
- Minimize branching logic; model-specific conditionals only
- Define all subjective or evaluative terms in [`docs/glossary.md`](docs/glossary.md)
- Internal codenames and implementation details are never surfaced to users

### Validation Process
- Run `python3 scripts/validate.py` before deployment to catch broken includes or schema violations
- Use the provided build scripts to export complete prompts and knowledge base

## Troubleshooting

### Taxonomy Browser GIF Display Issues

**Problem**: GIF images are not displaying in the taxonomy browser despite correct file placement and naming.

**Symptoms**:
- GIF files exist in correct directories with proper filenames
- File sizes indicate actual content (not placeholder files)
- Some sections display GIFs correctly while others don't
- Browser refresh doesn't resolve the issue

**Root Causes Identified**:

1. **Architectural Inconsistency**: The taxonomy browser uses two different display systems:
   - Static HTML sections (working): Hardcoded `<img>` tags in HTML content
   - Dynamic JavaScript sections (problematic): `getGifPath()` function with dynamic loading

2. **Browser Caching**: Local file serving may cache old versions or fail to load new files

3. **File Path Issues**: Relative paths may not resolve correctly depending on serving method

**Current Status**:
- Seurat stumping GIF (blending-techniques): ✅ Working (static HTML)
- Hugo wash GIF (wash-techniques): ✅ Working (static HTML) 
- Seurat roses GIF (mood-creation): ❌ Not working (attempted both approaches)

**Attempted Solutions**:
1. Converted mood-creation to static HTML approach (like working sections)
2. Added proper file paths to `getGifPath()` function
3. Verified file existence and proper naming conventions
4. Created proper directory structure for tone-functions

**Recommended Next Steps**:
1. **Standardize Architecture**: Convert all sections to use static HTML with hardcoded image paths
2. **Test Local Server**: Use `python3 -m http.server` instead of file:// protocol
3. **Clear Browser Cache**: Force refresh or use incognito mode for testing
4. **Verify File Permissions**: Ensure all GIF files have proper read permissions
5. **Check Console Errors**: Use browser developer tools to identify specific loading failures

**File Structure for Reference**:
```
prompts/marcel/reference/
├── tone-features/
│   ├── blending-techniques/
│   │   ├── seurat-stumping.md
│   │   └── seurat-stumping.gif ✅ Working
│   └── wash-techniques/
│       ├── hugo-octopus-wash.md
│       └── hugo-octopus-wash.gif ✅ Working
└── tone-functions/
    └── mood-creation/
        ├── seurat-roses-mood.md
        └── seurat-roses-mood.gif ❌ Not displaying
```

**Critical Issue**: This architectural inconsistency will become a major scalability problem as the system grows. A unified, reliable approach to GIF display must be established before adding more content.

### Modular Development Workflow

When modifying Marcel's behavior or knowledge:

1. **Identify the type of change:**
   - **Instructions (How Marcel behaves):**
     - Core prompt files: `prompts/marcel/1-persona-identity.md`, `2-guiding-philosophy.md`, etc.
     - Template files: `templates/guardrails.md`, `professional-language.md`, etc.
   - **Content (What Marcel knows):**
     - Reference materials: `prompts/marcel/reference/`
     - Case studies: `prompts/marcel/case-studies/`
     - Image metadata: `prompts/marcel/assets/images/`

2. **Edit the specific file directly.** Avoid editing the main `prompt.md` unless adding/removing entire sections.

3. **Run validation:** `python3 scripts/validate.py` to ensure system integrity.

> Only the necessary prompt modules for a session are assembled at runtime, ensuring concise and context-appropriate model input.
