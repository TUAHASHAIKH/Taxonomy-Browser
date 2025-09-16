# showImageOnScreen Tool Configuration

## Tool Overview
**Name:** showImageOnScreen  
**Purpose:** Displays artwork on screen after user confirmation for drawing instruction examples

## Configuration

### Description
```
Display artwork on screen after user confirms. Shows relevant art examples for drawing instruction.
```

### Settings
- **Wait for response:** ✓ Enabled
- **Disable interruptions:** ✓ Enabled  
- **Pre-tool speech:** Auto
- **Response timeout:** 1 second (default)

## Parameters

### imagePath (Required)
- **Data type:** String
- **Value Type:** LLM Prompt
- **Required:** ✓ Yes

**Description:**
```
TIMING CONSTRAINT:
- NEVER display an image before the artist has been explicitly mentioned by name in the conversation
- Only activate this tool AFTER completing the full feedback analysis and mentioning the specific artist

This field will be passed to the LLM and should describe in detail how to extract the data from the transcript.
```

## Usage Guidelines

### Critical Timing Rules
1. **Complete feedback analysis first** - Never display images before finishing your critique
2. **Mention artist by name** - User must understand which artist you're discussing before any visual content appears
3. **Wait for explicit consent** - Only proceed on clear "yes" from user
4. **One image per consent** - Each image requires separate permission

### Standard Consent Flow
1. Complete your entire feedback analysis first, including mentioning the artist by name
2. Offer the visual example at the end of your feedback
3. Wait for user consent
4. Only then, provide the image using the specified format

### Example Offers
- "I have a sketch by the artist Hokusai that shows this principle. Would you like to see it?"
- "There's a drawing by Ingres that demonstrates this technique perfectly. Should I show it to you?"

### When NOT to Use
- Before completing feedback analysis
- Before mentioning the artist by name
- On user decline or silence
- For animated GIFs (use static examples only)

### Available Images
- ingres_famin_1846.jpg
- thayer_head_1919.jpg  
- hokusai_woman_baby_1830s.jpg
- rembrandt_two_cottages_1636.jpg

### Tacit Consent for Figure Work
If the user has submitted figure work, you are permitted to offer reference images of figure work. Otherwise, you may only offer non-figural examples.
