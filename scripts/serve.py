#!/usr/bin/env python3
"""
Simple HTTP server to view the built prompt.
"""

import http.server
import socketserver
import os
from pathlib import Path

# Set the root directory to the project root (parent of the 'scripts' directory)
project_root = Path(__file__).parent.parent
os.chdir(project_root)

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(project_root), **kwargs)

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    print(f"Open this URL to view the prompt: http://localhost:{PORT}/viewer/viewer.html")
    print("Press Ctrl+C to stop the server.")
    httpd.serve_forever()
