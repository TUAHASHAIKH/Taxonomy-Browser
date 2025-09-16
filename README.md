# Marcel Learning System - Development Ecosystem

**What started as:** Modular system prompt management for Marcel AI  
**What it became:** Complete development ecosystem for AI drawing education

## Project Evolution

This repository began as a focused system for managing Marcel AI's modular prompts but has organically evolved into a comprehensive development ecosystem. Each component serves a distinct purpose while building on shared artistic knowledge.

## Architecture: Three-Part System

### ⚙️ System Prompt (The Engine)
**Location:** `prompts/marcel/`

Modular, composable system prompts that power Marcel AI's behavior and reasoning.

- **Modular Architecture:** Small, reusable prompt components that compose into complete instructions  
- **Professional Standards:** Handles figure work and artistic content with appropriate taxonomic framing
- **Reasoning Framework:** How Marcel analyzes and responds to drawing questions
- **Integration Logic:** How Marcel accesses and applies knowledge base content

### 📚 Knowledge Base (The Content)
**Locations:** `taxonomy-browser-ui.html`, `prompts/marcel/reference/`, `prompts/marcel/assets/`

Comprehensive artistic knowledge system with multiple access points.

- **Taxonomy Structure:** Systematic classification of drawing marks, techniques, and functions
- **Reference Files:** Detailed analysis of specific artists and methods
- **Museum Collections:** Curated examples from AIC, MET, and other public domain sources
- **Interactive Browser:** Visual navigation tool for exploring classifications and cross-references
- **Asset Management:** Images, metadata, and structured examples

*Note: The taxonomy browser is the visualization interface for this knowledge base*

### 🔧 Eval App (System Maintenance)
**Location:** `eval-app/`

Quality assurance and optimization through systematic testing.

- **Prompt Testing:** Validation of system prompt changes and their effects
- **Knowledge Verification:** Ensures Marcel correctly applies knowledge base content
- **Performance Metrics:** Feedback loops to measure response quality and consistency
- **System Optimization:** Identifies areas for improvement across system prompt and knowledge base

## The Three Components

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│ System Prompt   │   │ Knowledge Base  │   │ Eval App        │
│ (The Engine)    │   │ (The Content)   │   │ (Maintenance)   │
└─────────────────┘   └─────────────────┘   └─────────────────┘
```

That's it. We don't need flow.

All of them go back and forth and relate to each other.

## Supporting Infrastructure

### Reference Management
- **Museum Integration:** AIC, MET, and other public domain collections
- **File Organization:** Structured markdown files with metadata
- **Image Assets:** Curated visual examples with proper attribution

### Development Tools
- **Build Scripts:** Automated prompt assembly and validation
- **Schema Validation:** JSON schemas for consistent metadata
- **Documentation:** Authoring guides and review checklists
 
### Tooling Status
- **`museum-search/`:** Needs significant development work (current implementation is minimal and not production-ready)

## Quick Start

### System Prompt (The Engine)
```bash
# Main assembled prompt
prompts/marcel/prompt.md

# Core instruction modules  
prompts/marcel/1-persona-identity.md
prompts/marcel/2-guiding-philosophy.md
# ... etc
```

### Knowledge Base
```bash
# Interactive browser (visualization)
open taxonomy-browser-ui.html

# Reference files (detailed analysis)
prompts/marcel/reference/mark-features/
prompts/marcel/reference/tone-functions/

# Navigate: MARK → Line Weight & Pressure → [Artist Examples]
# Navigate: TONE → Atmospheric Depth → [Artist Examples]  
```

### Eval App (System Maintenance)
```bash
# Development in progress
cd eval-app/
# Tests system prompt + knowledge base integration
```

## Development Workflow

- **Knowledge Base Expansion:** Add artists, techniques, and classifications
- **System Prompt Integration:** Update prompts to reference new knowledge
- **Eval App Testing:** Validate integration and performance
- **System Optimization:** Refine based on evaluation feedback

*The taxonomy browser serves as both a development tool for organizing knowledge and a reference interface for understanding the system's capabilities.*

## Repository Structure

```
├── prompts/marcel/          # Marcel AI system prompts
├── taxonomy-browser-ui.html # Interactive knowledge visualization  
├── eval-app/               # Evaluation and testing tools
├── docs/                   # Documentation and guides
├── scripts/                # Build and validation tools
├── templates/              # Reusable prompt components
└── tools/                  # Development utilities
```

## Branch Structure & Maintenance

### Active Branches
- **`main`** - Stable Marcel system prompting (original focus)
- **`feature/taxonomy-browser-ui`** - Knowledge base development and taxonomy browser

### Branch-Specific Content
- **Main branch**: `README.md` focuses on Marcel system prompting
- **Feature branch**: `readme-taxonomy-browser-feature.md` documents full ecosystem

### Maintenance Strategy
- **Knowledge Base**: Continuously expanded with new artists, techniques, and classifications
- **System Prompt**: Updated to integrate new knowledge base content
- **Eval App**: Developed to test integration between system prompt and knowledge base

*Components are maintained across branches as the ecosystem evolves.*

## Contributing

This ecosystem supports iterative development of AI drawing education. Each component builds on shared artistic knowledge while serving distinct purposes in the development pipeline.

See `docs/authoring-guide.md` for detailed contribution guidelines.
