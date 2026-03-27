# Traffic Cams

Traffic Cams is a map-first review tool for public traffic-camera networks. It normalizes camera metadata from multiple sources and gives a reviewer one surface for coverage scan, camera selection, and feed inspection.

- **Status:** Active prototype
- **Stack:** Node.js, React, TypeScript, WebSockets
- **Problem:** Public traffic-camera portals are fragmented and slow to review when the real question is "which camera actually covers this area?"

## Why It Matters

- It combines feed normalization and operator-facing UI work in the same repo.
- It keeps public review practical with a demo mode that does not depend on live keys or feed availability.
- It shows the difference between a map demo and a usable inspection workflow.

## Repository Layout

- `server/`: source polling, payload normalization, and event broadcast
- `client/`: browser UI, globe view, and selected-camera inspector
- `docs/`: walkthrough, architecture notes, and privacy/data notes

## Run Locally

1. Install backend dependencies in `server/` with `npm install`.
2. Install frontend dependencies in `client/` with `npm install`.
3. Copy `.env.example` to `.env` if you want live map tiles.
4. Start the backend with `npm start` from `server/`.
5. Start the frontend with `npm run dev` from `client/`.

## Demo Mode

Use demo mode when you want a stable review path without live feeds or map keys.

1. Run `npm run dev:demo` from `client/`.
2. Open `http://127.0.0.1:4173/?demo=1`.
3. Open `http://127.0.0.1:4173/?demo=1&selected=london-01` to load the inspector state used in the screenshots.

## Verification

- Backend tests: `cd server && npm test`
- Frontend tests: `cd client && npm test`
- Frontend build: `cd client && npm run build`

## What To Read Next

- `docs/landing.md` for the short walkthrough
- `server/aggregator.js` for source normalization
- `client/src/App.tsx` and `client/src/components/GlobeView.tsx` for the main review flow

## Data Notes

This repo is built around public or public-facing traffic feeds. Feed formats and availability can change without notice, which is why the demo path exists and why the screenshots are tied to recorded data rather than live network conditions.
