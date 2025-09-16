#!/usr/bin/env python3
"""
Build script for Marcel AI Drawing Tutor system prompt.
Resolves {{ include: path }} directives to generate complete prompt for ElevenLabs.
"""

import os
import re
import sys
import argparse
import time
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class PromptBuilder:
    def __init__(self, base_dir=None):
        self.base_dir = Path(base_dir) if base_dir else Path(__file__).parent.parent
        self.included_files = set()
        self.include_pattern = re.compile(r'{{\s*include:\s*([^}]+)\s*}}')
        
    def resolve_includes(self, file_path, current_dir=None):
        """Recursively resolve all include directives in a file."""
        if current_dir is None:
            current_dir = file_path.parent
            
        # Prevent circular includes
        abs_path = file_path.resolve()
        if abs_path in self.included_files:
            raise ValueError(f"Circular include detected: {file_path}")
        self.included_files.add(abs_path)
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except FileNotFoundError:
            raise FileNotFoundError(f"Include file not found: {file_path}")
        
        # Find and replace all include directives
        def replace_include(match):
            include_path = match.group(1).strip()
            # Resolve relative to current file's directory
            resolved_path = (current_dir / include_path).resolve()
            
            if not resolved_path.exists():
                raise FileNotFoundError(f"Include file not found: {resolved_path}")
                
            # Recursively process the included file
            return self.resolve_includes(resolved_path, resolved_path.parent)
        
        return self.include_pattern.sub(replace_include, content)
    
    def build_prompt(self, prompt_file):
        """Build complete prompt from main prompt file."""
        self.included_files.clear()
        prompt_path = self.base_dir / prompt_file
        
        if not prompt_path.exists():
            raise FileNotFoundError(f"Prompt file not found: {prompt_path}")
            
        return self.resolve_includes(prompt_path)
    
    def get_stats(self, content):
        """Get build statistics."""
        lines = content.count('\n') + 1
        chars = len(content)
        words = len(content.split())
        files = len(self.included_files)
        
        return {
            'files': files,
            'lines': lines,
            'characters': chars,
            'words': words
        }

class PromptWatcher(FileSystemEventHandler):
    def __init__(self, builder, prompt_file, output_file=None, verbose=False):
        self.builder = builder
        self.prompt_file = prompt_file
        self.output_file = output_file
        self.verbose = verbose
        self.last_build = 0
        
    def on_modified(self, event):
        if event.is_directory:
            return
            
        # Only rebuild for .md files
        if not event.src_path.endswith('.md'):
            return
            
        # Debounce rapid file changes
        now = time.time()
        if now - self.last_build < 1:
            return
        self.last_build = now
        
        if self.verbose:
            print(f"File changed: {event.src_path}")
            
        try:
            self.build_and_output()
        except Exception as e:
            print(f"Build error: {e}", file=sys.stderr)
    
    def build_and_output(self):
        """Build prompt and output to file or stdout."""
        content = self.builder.build_prompt(self.prompt_file)
        stats = self.builder.get_stats(content)
        
        if self.output_file:
            with open(self.output_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Built prompt: {stats['files']} files, {stats['lines']} lines, {stats['words']} words -> {self.output_file}")
        else:
            print(content)
            if self.verbose:
                print(f"# Build stats: {stats['files']} files, {stats['lines']} lines, {stats['words']} words", file=sys.stderr)

def main():
    parser = argparse.ArgumentParser(description='Build Marcel AI Drawing Tutor system prompt')
    parser.add_argument('prompt_file', nargs='?', default='prompts/marcel/prompt.md',
                       help='Path to main prompt file (default: prompts/marcel/prompt.md)')
    parser.add_argument('-o', '--output', default='marcel-complete.md', help='Output file (default: marcel-complete.md)')
    parser.add_argument('-w', '--watch', action='store_true', 
                       help='Watch for file changes and rebuild automatically')
    parser.add_argument('-v', '--verbose', action='store_true',
                       help='Verbose output with build statistics')
    
    args = parser.parse_args()
    
    builder = PromptBuilder()
    
    try:
        if args.watch:
            watcher = PromptWatcher(builder, args.prompt_file, args.output, args.verbose)
            
            # Initial build
            watcher.build_and_output()
            
            # Set up file watching
            observer = Observer()
            observer.schedule(watcher, str(builder.base_dir), recursive=True)
            observer.start()
            
            print(f"Watching for changes... (Ctrl+C to stop)")
            try:
                while True:
                    time.sleep(1)
            except KeyboardInterrupt:
                observer.stop()
            observer.join()
            
        else:
            # Single build
            content = builder.build_prompt(args.prompt_file)
            stats = builder.get_stats(content)
            
            if args.output:
                with open(args.output, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Built prompt: {stats['files']} files, {stats['lines']} lines, {stats['words']} words -> {args.output}")
            else:
                print(content)
                if args.verbose:
                    print(f"# Build stats: {stats['files']} files, {stats['lines']} lines, {stats['words']} words", file=sys.stderr)
                    
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
