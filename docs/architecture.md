# Architecture

## Overview

`traffic-cams` has two runtime surfaces:

- `server/` polls public traffic-camera sources, normalizes the payloads, and broadcasts updates over WebSockets
- `client/` renders the normalized camera set on a Cesium-based 3D globe and opens a feed inspector for selected nodes

## Data Flow

1. The backend polls each configured source on its own interval.
2. Raw source payloads are normalized into a shared camera shape.
3. The backend emits `status` and `cameras` events to connected clients.
4. The frontend merges incoming camera updates into local state and renders them as entities on the globe.
5. Selecting a camera opens an operator-facing inspector with feed and metadata details.

## Relevance

The implementation is intentionally framed as a public-infrastructure prototype, but the pattern is applicable to defense and operations contexts:

- sensor-source normalization
- realtime operator interfaces
- geospatial awareness
- multi-feed triage
