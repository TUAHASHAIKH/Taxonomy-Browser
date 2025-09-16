#!/usr/bin/env python3
"""
Build complete system prompt from components for evaluation app integration.
"""

import os
import json
from pathlib import Path

def build_complete_prompt():
    """Build the complete system prompt from all components."""
    
    # Base directory
    base_dir = Path(__file__).parent.parent
    
    # Read the main complete prompt
    marcel_complete_path = base_dir / "marcel-complete.md"
    if not marcel_complete_path.exists():
        raise FileNotFoundError(f"Main prompt file not found: {marcel_complete_path}")
    
    with open(marcel_complete_path, 'r', encoding='utf-8') as f:
        main_prompt = f.read()
    
    # Read tool configurations
    tools_dir = base_dir / "tools"
    tools_content = {}
    
    if tools_dir.exists():
        for tool_file in tools_dir.glob("*.md"):
            with open(tool_file, 'r', encoding='utf-8') as f:
                tools_content[tool_file.stem] = f.read()
    
    # Read additional components
    components = {
        'image_sources': base_dir / "image-sources.md",
        'policy_strategy': base_dir / "policy-strategy.md",
        'professional_framing': base_dir / "professional-framing.md",
        'tone_value': base_dir / "tone-value.md"
    }
    
    additional_content = {}
    for name, path in components.items():
        if path.exists():
            with open(path, 'r', encoding='utf-8') as f:
                additional_content[name] = f.read()
    
    # Build complete prompt structure
    complete_prompt = {
        'main_prompt': main_prompt,
        'tools': tools_content,
        'components': additional_content,
        'metadata': {
            'build_timestamp': None,  # Will be set by calling script
            'version': 'latest',
            'source': 'system-prompting-repo'
        }
    }
    
    return complete_prompt

def export_for_eval_app():
    """Export prompt in format suitable for eval app."""
    
    prompt_data = build_complete_prompt()
    
    # Add timestamp
    from datetime import datetime
    prompt_data['metadata']['build_timestamp'] = datetime.now().isoformat()
    
    # Export to eval app directory
    eval_app_dir = Path(__file__).parent.parent / "eval-app"
    output_file = eval_app_dir / "current-prompt.json"
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(prompt_data, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Exported complete prompt to: {output_file}")
    print(f"📊 Components included:")
    print(f"   - Main prompt: {len(prompt_data['main_prompt'])} chars")
    print(f"   - Tools: {len(prompt_data['tools'])} files")
    print(f"   - Additional components: {len(prompt_data['components'])} files")
    
    return output_file

if __name__ == "__main__":
    export_for_eval_app()
