# Prompt Review Checklist

Use this checklist to ensure all prompt changes meet quality and safety standards before merging.

## 1. Metadata Validation

-   [ ] **Schema Compliance**: Does `prompt.meta.yaml` validate against `schemas/prompt.schema.json`?
-   [ ] **Version Bump**: Has the version number been correctly incremented?
-   [ ] **Changelog Entry**: Is there a new, clear entry in the changelog?
-   [ ] **Status Update**: Is the `status` field accurate (e.g., `in_review`)?

## 2. Content and Structure

-   [ ] **Clarity**: Is the prompt logic clear and unambiguous?
-   [ ] **Modularity**: Are new concepts broken down into logical, included files?
-   [ ] **Consistency**: Does the prompt adhere to the `authoring-guide.md`?
-   [ ] **Includes**: Are all `{{include}}` paths correct and necessary?

## 3. Language and Tone

-   [ ] **Professionalism**: Does the language align with `professional-language.md` and `professional-framing.md`?
-   [ ] **Terminology**: Are all technical terms used correctly as defined in the glossaries?

## 4. Safety and Policy

-   [ ] **Safety Guardrails**: Does the prompt incorporate `templates/safety.md`?
-   [ ] **Content Policy**: Does the prompt align with the `policy-strategy.md`?
-   [ ] **Risk Assessment**: Is the `riskProfile` in the metadata accurate?
-   [ ] **Consent**: If applicable, does the prompt follow the `tacit-consent.md` flow correctly?

## 5. Testing (Manual)

-   [ ] **Case Studies**: Does the prompt handle the relevant case studies correctly?
-   [ ] **Edge Cases**: Have potential failure modes or ambiguous inputs been considered?
