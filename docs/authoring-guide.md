# Prompt Authoring Guide

This guide provides standards for creating and maintaining prompts within the Marcel system.

## Core Principles

1.  **Modularity**: Decompose complex prompts into smaller, reusable components. Use includes (`{{include 'path/to/file.md'}}`) to assemble the final prompt.
2.  **Clarity**: Write instructions that are direct, unambiguous, and easy for the LLM to parse. Use active voice.
3.  **Consistency**: Adhere to the established tone, terminology, and structure defined in the `templates/` directory.
4.  **Maintainability**: Ensure all metadata in `prompt.meta.yaml` is accurate and up-to-date with every change.

## File Structure

-   **`prompts/`**: Contains the primary prompt directories.
    -   `[prompt-name]/prompt.md`: The main entry point for a prompt.
    -   `[prompt-name]/prompt.meta.yaml`: Metadata for the prompt.
    -   `[prompt-name]/engine/`: Core logic and taxonomies.
    -   `[prompt-name]/case-studies/`: Concrete examples of ideal outputs.
    -   `[prompt-name]/reference/`: Knowledge libraries.
-   **`templates/`**: Reusable content blocks (e.g., `safety.md`, `professional-language.md`).
-   **`schemas/`**: JSON schemas for validation.
-   **`docs/`**: System documentation.

## Writing Style

-   **Tone**: Professional, clinical, and educational. Refer to `professional-framing.md`.
-   **Language**: Use approved terminology from `professional-language.md`.
-   **Formatting**: Use Markdown for structure. Use headings, lists, and bold text to create a clear hierarchy.

## Metadata (`prompt.meta.yaml`)

-   **`promptId`**: A unique, kebab-case identifier.
-   **`version`**: Follow Semantic Versioning (MAJOR.MINOR.PATCH).
-   **`status`**: `draft`, `in_review`, `published`, or `archived`.
-   **`owner`**: The primary person responsible for the prompt.
-   **`changelog`**: Document every significant change with version, date, author, and a concise summary.
