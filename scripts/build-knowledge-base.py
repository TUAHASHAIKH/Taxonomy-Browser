#!/usr/bin/env python3
"""
Build Knowledge Base JSON from deployed ArtSensei knowledge_base.py
Exports the knowledge base content for use in the eval app
"""

import json
import sys
import os
from pathlib import Path

# Add the deployed repo to Python path
deployed_repo_path = Path(__file__).parent.parent / "ArtSensei-deployed"
sys.path.insert(0, str(deployed_repo_path))

try:
    from knowledge_base import ArtKnowledgeBase
except ImportError as e:
    print(f"Error importing knowledge_base: {e}")
    print(f"Make sure ArtSensei-deployed repo is cloned at: {deployed_repo_path}")
    sys.exit(1)

def build_knowledge_base_json():
    """Build knowledge base JSON from the deployed ArtSensei knowledge base"""
    
    # Initialize the knowledge base
    kb = ArtKnowledgeBase()
    
    # Extract all the content
    knowledge_data = {
        "artwork_data": kb.artwork_data,
        "core_principles": kb.core_principles,
        "metadata": {
            "total_artworks": len(kb.artwork_data),
            "total_principles": len(kb.core_principles),
            "cache_ttl": kb._cache_ttl,
            "max_cache_size": kb._max_cache_size
        }
    }
    
    # Format as a comprehensive knowledge base string for the eval app
    knowledge_base_content = "# ART SENSEI KNOWLEDGE BASE\n\n"
    
    # Add artwork analysis
    knowledge_base_content += "## ARTWORK ANALYSIS REFERENCE\n\n"
    for artwork_key, artwork_info in kb.artwork_data.items():
        knowledge_base_content += f"### {artwork_key.upper()}\n"
        knowledge_base_content += f"**Keywords:** {', '.join(artwork_info['keywords'])}\n\n"
        knowledge_base_content += artwork_info['content'] + "\n\n"
    
    # Add core principles
    knowledge_base_content += "## CORE DRAWING PRINCIPLES\n\n"
    for principle_key, principle_desc in kb.core_principles.items():
        principle_title = principle_key.replace('_', ' ').title()
        knowledge_base_content += f"**{principle_title}:** {principle_desc}\n\n"
    
    # Add metadata
    knowledge_base_content += f"## KNOWLEDGE BASE METADATA\n\n"
    knowledge_base_content += f"- Total Artworks: {len(kb.artwork_data)}\n"
    knowledge_base_content += f"- Total Principles: {len(kb.core_principles)}\n"
    knowledge_base_content += f"- Cache TTL: {kb._cache_ttl} seconds\n"
    knowledge_base_content += f"- Max Cache Size: {kb._max_cache_size} conversations\n"
    
    return {
        "structured_data": knowledge_data,
        "formatted_content": knowledge_base_content
    }

def main():
    """Main function to build and save knowledge base JSON"""
    try:
        print("Building knowledge base from deployed ArtSensei...")
        
        # Build the knowledge base
        kb_export = build_knowledge_base_json()
        
        # Save structured data
        output_dir = Path(__file__).parent.parent / "eval-app"
        structured_output = output_dir / "knowledge-base-data.json"
        
        with open(structured_output, 'w', encoding='utf-8') as f:
            json.dump(kb_export["structured_data"], f, indent=2, ensure_ascii=False)
        
        # Save formatted content for eval app
        formatted_output = output_dir / "knowledge-base-content.json"
        
        with open(formatted_output, 'w', encoding='utf-8') as f:
            json.dump({
                "content": kb_export["formatted_content"],
                "length": len(kb_export["formatted_content"]),
                "timestamp": "auto-generated"
            }, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Knowledge base exported successfully!")
        print(f"   - Structured data: {structured_output}")
        print(f"   - Formatted content: {formatted_output}")
        print(f"   - Total content length: {len(kb_export['formatted_content']):,} characters")
        print(f"   - Artworks: {len(kb_export['structured_data']['artwork_data'])}")
        print(f"   - Principles: {len(kb_export['structured_data']['core_principles'])}")
        
    except Exception as e:
        print(f"❌ Error building knowledge base: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
