import os
import re
import json
import yaml
from jsonschema import validate, exceptions

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROMPTS_DIR = os.path.join(ROOT_DIR, 'prompts')
SCHEMA_PATH = os.path.join(ROOT_DIR, 'schemas', 'prompt.schema.json')

def load_schema():
    """Loads the master JSON schema."""
    with open(SCHEMA_PATH, 'r') as f:
        return json.load(f)

def validate_meta(file_path, schema):
    """Validates a single prompt.meta.yaml file against the schema."""
    print(f"Validating metadata for {os.path.dirname(file_path).split('/')[-1]}...")
    try:
        with open(file_path, 'r') as f:
            meta = yaml.safe_load(f)
        validate(instance=meta, schema=schema)
        print("  \033[92mSUCCESS: Metadata is valid.\033[0m")
        return True
    except yaml.YAMLError as e:
        print(f"  \033[91mERROR: Could not parse YAML: {e}\033[0m")
    except exceptions.ValidationError as e:
        print(f"  \033[91mERROR: Metadata validation failed: {e.message}\033[0m")
    return False

def validate_includes(file_path):
    """Validates all {{include}} paths in a Markdown file."""
    print(f"Validating includes for {os.path.relpath(file_path, ROOT_DIR)}...")
    success = True
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Regex to find {{ include: path/to/file.md }}
    matches = re.findall(r"{{ *include: *([^}]+) *}}", content)
    
    if not matches:
        print("  No includes found.")
        return True

    for raw_include_path in matches:
        include_path = raw_include_path.strip()
        # Resolve path relative to the file containing the include
        file_dir = os.path.dirname(file_path)
        abs_path = os.path.normpath(os.path.join(file_dir, include_path))

        if not os.path.exists(abs_path):
            print(f"  \033[91mERROR: Include path not found: {include_path}\033[0m")
            success = False
        else:
            print(f"  \033[92mSUCCESS: Found include: {include_path}\033[0m")
    return success

def main():
    """Main validation function."""
    print("--- Running Prompt System Validation ---")
    schema = load_schema()
    all_valid = True

    for root, _, files in os.walk(PROMPTS_DIR):
        # Validate metadata
        if 'prompt.meta.yaml' in files:
            meta_path = os.path.join(root, 'prompt.meta.yaml')
            if not validate_meta(meta_path, schema):
                all_valid = False

        # Validate includes in all markdown files
        for file in files:
            if file.endswith('.md'):
                md_path = os.path.join(root, file)
                if not validate_includes(md_path):
                    all_valid = False

    print("\n--- Validation Summary ---")
    if all_valid:
        print("\033[92mAll checks passed! The prompt system is valid.\033[0m")
    else:
        print("\033[91mValidation failed. Please fix the errors listed above.\033[0m")
        exit(1)

if __name__ == "__main__":
    main()
