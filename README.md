# Aragon Studio — functional AI headshot rebuild

An independent, product-grade reconstruction of the core Aragon.ai experience: a warm editorial landing site plus a real AI portrait studio that accepts the user's photos, applies selected art direction, generates a new professional headshot, and saves the result to a private browser gallery.

## What is included

- `/` — conversion-focused landing page
- `/studio` — multi-image upload, art-direction controls, consent gate, real generation, loading/error/success states, download, favorite, and regeneration
- `/gallery` — seeded examples plus persistent generated history in IndexedDB
- `/sign-up` and `/sign-in` — working local demo-account flow
- `/pricing` — individual packages and product FAQ
- `/teams` — team workspace concept, workflow, and business case
- `/security` — implementation-specific privacy and credential handling
- `/api/generate` — server-only OpenAI Images API integration

## Run locally

Requirements: Node.js 20.9 or newer and an OpenAI API key with image-generation access.

```bash
cd app
cp .env.example .env.local
```

Open `.env.local` and set:

```bash
OPENAI_API_KEY=your-real-key
OPENAI_IMAGE_MODEL=gpt-image-1.5
```

Then run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The API key is read only by the server route. It is never included in browser JavaScript or sent to localStorage/IndexedDB.

## Main flow

1. Open **AI Headshots**.
2. Choose profession, backdrop, wardrobe, and expression.
3. Upload one to four recent JPG, PNG, or WebP photos.
4. Confirm image rights and that the subject is an adult.
5. Press **Generate headshot**.
6. The browser optimizes the references before upload; the server sends them with a high-fidelity portrait prompt to the image-edit endpoint.
7. Download the 1024 × 1536 PNG, generate another variation, or open the gallery.

Multiple references are sent together when more than one image is uploaded. The first image functions as the identity anchor; additional angles help the model resolve identity more consistently.

## Deploy to Vercel

1. Push the `app` directory to a GitHub repository.
2. Import that repository in Vercel.
3. Add these Environment Variables in **Project Settings → Environment Variables**:
   - `OPENAI_API_KEY`
   - `OPENAI_IMAGE_MODEL` = `gpt-image-1.5`
4. Deploy.

No client-side secret is required. The route exports a 120-second maximum duration for high-quality image generation.

## Design direction

**Warm editorial portrait studio.** The dominant canvas is warm cream with inky typography; orange, coral, and amber are used as sharp conversion accents. Instrument Serif gives the display moments a photographic/editorial character, while DM Sans keeps the product controls precise. The system includes reusable color, spacing, radius, shadow, and motion tokens in `app/globals.css`.

## State and persistence

- Upload previews use temporary object URLs and are cleaned up on removal/unmount.
- Generated images and metadata are stored locally in IndexedDB, capped at 20 records.
- localStorage is used only as a best-effort fallback and for the demo session object.
- Seeded gallery entries keep the empty state visually useful; generated records are clearly distinguishable.

## Production hardening before a commercial launch

The core generation is real, but the bundled account system is intentionally a local demo. A production service should add managed authentication, database-backed users and billing, object storage with signed uploads, explicit data-retention controls, rate limits, abuse prevention, observability, deletion/export controls, and legal review of identity and biometric-data obligations. Replace the illustrative seed portraits with fully licensed brand assets.

## Model compatibility

The default is `gpt-image-1.5` with `input_fidelity=high`, `quality=high`, and a vertical 1024 × 1536 output. The model is environment-configurable; set `OPENAI_IMAGE_MODEL=gpt-image-1` if that is the image model enabled for your project.

## Validation performed

- Syntactic parsing passed for all 20 TypeScript/TSX files.
- Desktop QA viewport: 1440 × 1000.
- Mobile QA viewport: 390 × 844.
- Landing and studio layouts were checked at both sizes with no horizontal overflow.
- A dependency-free rendering mirror was used for screenshot QA because the execution environment could not reach the npm registry. Run `npm install && npm run build` in a network-enabled environment before production deployment.

This is an independent reconstruction for demonstration and is not the official Aragon AI service.
