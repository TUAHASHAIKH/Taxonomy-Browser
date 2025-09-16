# pointObjectInImage Tool Configuration

## Tool Overview
**Name:** pointObjectInImage  
**Purpose:** Analyzes drawing images and returns precise pixel coordinates of specific drawing elements

## Configuration

### Description
```
Analyzes drawing images currently visible on the billboard and returns precise pixel coordinates of specific drawing elements. Use this tool when you need to point to specific areas, lines, forms, or techniques in user-submitted artwork to provide detailed feedback. Works on uploaded images, paused camera frames, and stable billboard images. Do NOT use on animated GIFs from knowledge base (rotating views make coordinates meaningless). Always complete systematic observation protocol before using this tool.
```

### Settings
- **Wait for response:** ✓ Enabled
- **Disable interruptions:** ✓ Enabled  
- **Pre-tool speech:** Auto
- **Response timeout:** 1 second (default)

## Parameters

### query (Required)
- **Data type:** String
- **Value Type:** LLM Prompt
- **Required:** ✓ Yes

**Description:**
```
The specific drawing element to locate precisely in the artwork on the billboard. Be extremely specific - instead of "the fabric," use "the fabric fold on the upper sleeve" or "the crosshatching in the lower right corner." Focus on exact drawing techniques, marks, forms, or compositional elements (e.g., "the gesture line of the torso," "the darkest shadow under the chin," "the contour line on the left edge"). Format: "[subject/technique] + [location/context]". Avoid vague terms like "this line" or "that area."
```

## Pointer Tool Accuracy Protocol
**CRITICAL: Follow this 3-step sequence before using the pointer tool:**

1. **Visual Location**: Identify a specific, distinct feature that can be described unambiguously (e.g., "the foot", "the bent knee", "where arm meets knee")

2. **Precise Description Formation**: Formulate exact location and distinctive characteristics using relational descriptions ("where it meets the ground", "where it creates a clear angle")

3. **Tool Execution**: Only then use the pointer tool with the well-defined description from steps 1-2

## Usage Guidelines

### When to Use
- User-uploaded images from phone library
- Photos taken through app's camera
- Stable billboard images showing user artwork
- Paused camera frames

### When NOT to Use
- Animated GIFs from knowledge base
- Rotating/moving image views
- Before completing systematic observation protocol
- Before completing feedback analysis

### Integration Requirements
- Must follow systematic observation protocol first
- Requires contextual specificity (subject matter identification)
- Should reference specific drawing techniques or elements
- Timing: Use only after completing feedback analysis

## Moondream Testing Data Collection

### Test Results Log
**Color Grid Tests:**
- ✅ "point to the orange color block that is directly below the brown square" 
  - *Result: Accurate pointing*
- ❌ "point to the center of the orange square in the lower left quadrant"
  - *Result: Pointed to wrong location*
- ❌ "point to where orange touches light blue"
  - *Result: Pointed to wrong intersection*

**Portrait/Drawing Tests:**
- ❌ "line across right cheek"
  - *Result: Pointed to same location as left cheek test*
- ❌ "line across left cheek" 
  - *Result: Pointed to identical location as right cheek test*
  - *Issue: Moondream appears to ignore left/right directional references*

### Testing Protocol
1. Test different image types (geometric, organic, sketches, complex compositions)
2. Test various prompt structures for each image type
3. Document exact prompt text and pointing accuracy
4. Note response times and any patterns in failures
5. Build comprehensive dataset before drawing conclusions
