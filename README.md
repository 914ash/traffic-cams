# Traffic Cams

Traffic Cams is a web app for reviewing public traffic-camera networks on a shared map surface.
It is built for the moment when an operator needs to go from "which cameras cover this area?" to "show me the useful one" without digging through raw agency portals.


## What It Does

- pulls camera metadata from multiple public traffic networks into one camera shape
- streams updates from the backend to the frontend over WebSockets
- shows camera coverage on a shared map surface
- opens a side panel with source, direction, coordinates, and feed status for the selected camera
- includes a demo mode so the UI can be reviewed without live keys or external feeds

## How It Works

- `server/` polls each source, normalizes the payload, and broadcasts camera updates
- `client/` renders the camera set in the browser and opens the inspector for the active selection
- the demo path uses a recorded camera set and a fallback map surface so screenshots stay reproducible

## Run Locally

1. Install backend dependencies in [`server/`](server/) with `npm install`
2. Install frontend dependencies in [`client/`](client/) with `npm install`
3. Copy [`.env.example`](.env.example) to `.env` if you want to use live map tiles
4. Start the backend with `npm start` from [`server/`](server/)
5. Start the frontend with `npm run dev` from [`client/`](client/)

## Demo Mode

Use the demo path when you want a stable UI review without live feeds or map keys.

1. Run `npm run dev:demo` from [`client/`](client/)
2. Open `http://127.0.0.1:4173/?demo=1`
3. Open `http://127.0.0.1:4173/?demo=1&selected=london-01` to load the inspector state used for the README screenshots

## What To Look At First

1. Read [docs/landing.md](docs/landing.md) for the short walkthrough
2. Inspect [`server/aggregator.js`](server/aggregator.js) for source normalization
3. Inspect [`client/src/App.tsx`](client/src/App.tsx) and [`client/src/components/GlobeView.tsx`](client/src/components/GlobeView.tsx) for the app surface and demo path

## Verification

- backend tests: `cd server && npm test`
- frontend tests: `cd client && npm test`
- frontend build: `cd client && npm run build`

## Data Notes

This repo is built around public or public-facing traffic feeds. Feed availability and formats can change without notice, so the demo mode exists to keep the UI reviewable even when the live sources do not cooperate.

See [docs/landing.md](docs/landing.md), [docs/architecture.md](docs/architecture.md), and [docs/privacy-and-data.md](docs/privacy-and-data.md).
