# Architecture

## Overview

`traffic-cams` has two runtime surfaces:

- `server/` polls public traffic-camera sources, normalizes them into a shared camera schema, and broadcasts updates over WebSockets
- `client/` renders the camera set in the browser and opens a detail panel for the selected camera

## Data Flow

1. The backend polls each configured source on its own interval.
2. Each payload is mapped into the shared camera shape: `id`, `lat`, `lng`, `name`, `direction`, `feedUrl`, `feedType`, `source`, `lastUpdated`.
3. The backend emits `status` and `cameras` events to connected clients.
4. The frontend merges incoming updates into local state and renders the current camera set.
5. Selecting a camera opens the inspector with source metadata and feed status.

## Demo Path

The frontend also supports a recorded demo path:

- demo mode loads a fixed camera set instead of waiting for a live backend stream
- fallback map mode renders a reviewable coverage surface when map tiles are unavailable
- the README screenshots were captured from that reproducible path
