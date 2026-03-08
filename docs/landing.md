# Traffic Cams Landing

![Traffic Cams cover](../assets/covers/cover.svg)

## What This Is

Traffic Cams is a geospatial monitoring prototype that turns public traffic-camera feeds into a realtime, operator-facing globe interface.

## Who It Is For

This repo is for reviewers who want to evaluate geospatial UI design, public-feed normalization, and command-center style interface thinking in one project.

## Why This Exists

The portfolio value of this repo is not just the map. It is the full path from multi-source feed ingestion to a readable operator surface: source adapters, backend normalization, websocket updates, and a client that treats location and feed state as first-class UI concerns.

## Screenshot Walkthrough

![Traffic globe preview](../assets/screenshots/globe-ops-preview.svg)
The globe view frames camera monitoring as a situational-awareness problem rather than a list-management problem.

![Traffic inspector preview](../assets/screenshots/feed-inspector-preview.svg)
The feed inspector preview shows the decision surface: location context, camera state, and rapid selection flow.

## Quick Evaluation

1. Read the top-level [README.md](../README.md) for quickstart and stack.
2. Review [docs/architecture.md](architecture.md) for the ingest-to-client flow.
3. Inspect `server/` for source normalization and `client/` for the Cesium/React surface.

## Repo Signals

- explicit public-data framing
- secrets moved to ignored env files
- concise setup path
- mission-control presentation instead of a generic demo map
