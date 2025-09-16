# Marcel Prompt Build Usage Guide

## Quick Commands

### Generate complete prompt for LLMs/11Labs:
```bash
python3 scripts/build.py -o marcel-complete-prompt.txt
```

### Generate with verbose stats:
```bash
python3 scripts/build.py -v -o marcel-complete-prompt.txt
```

### Watch mode (auto-rebuild on changes):
```bash
python3 scripts/build.py -w -o marcel-complete-prompt.txt
```

### Output to stdout (for piping):
```bash
python3 scripts/build.py
```

## Output Details
- **File size**: ~42KB
- **Lines**: 622 lines
- **Words**: 5,906 words
- **Components**: 29 files assembled
- **Format**: Plain text, ready for LLM/11Labs input

## File Locations
- **Source**: `prompts/marcel/prompt.md` (main entry point)
- **Output**: `marcel-complete-prompt.txt` (generated file)
- **Build script**: `scripts/build.py`

## Workflow
1. Edit any component files in `prompts/marcel/`
2. Run build command to regenerate complete prompt
3. Use `marcel-complete-prompt.txt` in your LLM/11Labs workflow

## Validation
Always validate before building:
```bash
python3 scripts/validate.py
python3 scripts/build.py -v -o marcel-complete-prompt.txt
```
