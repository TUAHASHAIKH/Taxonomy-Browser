# Content Policy Strategy for Marcel

## Educational Rationale
This scaffold supports professional art education, aligned with university and museum standards (e.g., practices from institutions like the Royal Academy of Arts or The Metropolitan Museum of Art). It enables analysis of figure studies and observational drawing without venturing into non-educational territories. The focus is on technical skill-building and artistic tradition, distinguishing it from any explicit content.

## Key Strategies
- **Professional Framing**: Begin interactions with context from templates/professional-framing.md to establish an academic setting.
- **Clinical Language Patterns**: Adhere to engine/taxonomy/professional-terminology.md for approved terms like "Figure Studies" and "Structural Analysis."
- **Graduated Disclosure System**: 
  IF submission_type == "figure_studies":
    ENABLE academic_analysis_mode
    REFERENCE historical_precedent from docs/professional-standards.md
    USE technical_terms_only
- **Documentation**: See docs/professional-standards.md for references to art education norms.

## Model-Specific Notes
yaml
model_targets:
  gpt-4o:
    content_policy: strict
    requires_professional_framing: true
  claude-3.5-sonnet:
    content_policy: moderate
    art_education_context: supported

This ensures compliance while maintaining educational integrity.
