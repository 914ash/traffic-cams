# Traffic Cams Product Notes

## Product Goal

Turn scattered public traffic-camera directories into a single interface where a reviewer can answer two questions quickly:

1. Which cameras cover this area?
2. Which camera should I open next?

## Target User

The primary user is an operator, analyst, or reviewer who needs geographic context and fast camera selection, not a consumer browsing one city website at a time.

## Core Product Requirements

- ingest multiple public camera sources and normalize them into one shared schema
- show the camera set on a single map surface
- let the user select a camera and inspect its metadata immediately
- keep the app usable when live feeds or map keys are unavailable
- preserve a reproducible demo path for screenshots and public review

## Current Scope

- public traffic-camera feeds from multiple agencies
- backend polling and normalization
- WebSocket updates to the browser
- coverage map and camera inspector
- demo mode with recorded camera metadata

## Non-Goals For This Public Repo

- global source coverage
- full traffic analytics
- private operator accounts
- long-term storage or audit workflows
