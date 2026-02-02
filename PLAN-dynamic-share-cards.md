# Dynamic OG Share Cards - Implementation Plan

## Overview
Generate personalized social share cards that display the user's assessment results (avatar image, title, identity statement) with a branded background. When shared on LinkedIn/X, the link preview shows their unique result.

## Architecture

```
User completes assessment
        ↓
Avatar image generated (Gemini) → Upload to Cloudinary → Get public URL
        ↓
Share button clicked → Build share URL with params
        ↓
Social platform fetches /share?id=xxx
        ↓
Share page has OG meta pointing to /api/share-image?id=xxx
        ↓
Image generator returns personalized PNG
```

## Components

### 1. Image Storage (Cloudinary)
- **Why**: Need persistent URLs for generated avatar images
- **When**: After Gemini generates the avatar image
- **How**:
  - Add Cloudinary SDK to frontend or create upload function
  - Upload base64 image, get back public URL
  - Store URL in state and Airtable record

```javascript
// After avatar image generated
const cloudinaryUrl = await uploadToCloudinary(imageBase64);
state.avatarOutput.avatar.imageUrl = cloudinaryUrl;
```

### 2. Share Page (`/share.html`)
- Static HTML page with dynamic OG meta tags
- Reads URL params to set meta content
- Displays result summary + CTA to take assessment

```html
<!-- OG tags populated by JS or serverless -->
<meta property="og:image" content="https://ai-amplifier-assessment.netlify.app/api/share-image?id=xxx">
```

**URL structure options:**
- Option A: `/share?title=...&identity=...&imageUrl=...` (long but stateless)
- Option B: `/share?id=abc123` (short, requires lookup from Airtable)

Recommend Option B - cleaner URLs, all data already in Airtable.

### 3. Image Generator Function (`/api/share-image`)
- Netlify function that generates PNG from params
- Uses `satori` + `resvg-js` (works on Netlify, no binary deps)
- Returns `image/png` with proper headers

```javascript
// netlify/functions/share-image.js
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export async function handler(event) {
  const { id } = event.queryStringParameters;

  // Fetch record from Airtable
  const record = await getAirtableRecord(id);

  // Generate SVG with satori
  const svg = await satori(
    <ShareCard
      title={record.avatarTitle}
      identity={record.avatarIdentity}
      imageUrl={record.avatarImageUrl}
    />,
    { width: 1200, height: 630, fonts: [...] }
  );

  // Convert to PNG
  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'image/png' },
    body: png.toString('base64'),
    isBase64Encoded: true
  };
}
```

### 4. Share Card Design
- **Size**: 1200x630px (OG standard)
- **Background**: Green gradient (brand colors)
- **Content**:
  - Avatar image (top, centered or left)
  - Title: "The [Element] [Persona] [Archetype]"
  - Identity statement (2-3 lines)
  - Branding: "AI Amplifier Assessment" + URL

### 5. Update Share Buttons
- Build personalized share URL instead of base URL
- Include Airtable record ID in URL

```javascript
document.getElementById('shareLinkedIn').addEventListener('click', () => {
  const shareUrl = `https://ai-amplifier-assessment.netlify.app/share?id=${state.airtableRecordId}`;
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
});
```

## Dependencies to Add

```json
{
  "satori": "^0.10.x",
  "@resvg/resvg-js": "^2.x",
  "cloudinary": "^1.x"
}
```

## Environment Variables

```
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

## Implementation Order

1. **Set up Cloudinary account** (free tier works)
2. **Create upload function** - upload generated images after assessment
3. **Update Airtable schema** - add `Avatar Image URL` field
4. **Create share-image function** - image generator with satori
5. **Create share.html** - landing page for shared links
6. **Update share buttons** - use personalized URLs
7. **Test on LinkedIn/X** - verify previews work

## Estimated Time
- Cloudinary setup + upload: 1 hour
- Share image function: 2 hours
- Share page + buttons: 1 hour
- Testing + polish: 1 hour
- **Total: 4-5 hours**

## Future Enhancements
- Cache generated images (avoid regenerating same card)
- Add QR code to share card
- Animated share cards for X
- "Compare with friends" feature
