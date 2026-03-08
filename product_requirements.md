# Stitch UI — Product Requirements

ABOUTME: Product requirements for the Stitch UI application, a realtime 3D traffic camera viewer
ABOUTME: built on Google Maps Photorealistic 3D Tiles with CesiumJS.

---

## 1. Product Vision

**Stitch UI** is a highly immersive, **virtual reality-grade** interface (accessible via computer) that renders a realtime, interactive 3D globe using Google Maps Photorealistic 3D Tiles. The goal is to create a seamless, cinematic experience where users don't just "view" data but are "transported" into 3D cityscapes overlayed with live traffic feeds.

The experience should feel like a **mission-control dashboard** — dark, premium, and data-dense — where the 3D world is the primary interface. The "virtual" exploration of the globe is as important as the data itself.

---

## 2. Target User

Traffic analysts, urban planners, operations centers, or anyone who needs a real-time situational awareness view of traffic conditions across multiple regions simultaneously.

---

## 3. Core Requirements

### 3.1. The 3D Globe (Primary Interface)

| Requirement | Detail |
|---|---|
| **Mapping Engine** | CesiumJS rendering Google Maps Photorealistic 3D Tiles |
| **Coverage** | **Global** — Full international support from Day 1 |
| **Camera Controls** | Pan (left-drag), Rotate/Tilt (right-drag), Zoom (scroll) |
| **Keyboard Nav** | WASD or Arrow keys for pan, +/- for zoom |
| **Performance Target** | 60 FPS with very **low latency** and reliable streaming |

### 3.2. Traffic Camera Data Layer (International Day 1)

| Category | Initial Sources |
|---|---|
| **USA** | 511NY, DC Traffic API, Georgia DOT, Austin Open Data, Atlanta (GDOT), etc. |
| **International** | London (TfL Unified API / JamCams), Sydney (TfNSW Open Data), Paris (Open Data Paris) |
| **Aggression** | Aggressively poll and cache to ensure minimal latency for the user |
| **Normalization** | Unified schema: `{ id, lat, lng, name, direction, feedUrl, feedType, source, lastUpdated }` |

### 3.3. Camera Node Rendering (Level of Detail)

| Zoom Level | Rendering |
|---|---|
| **High Altitude** | Clustered dots with count badges |
| **Mid Altitude** | Individual icons with status (green = live, red = offline) |
| **Street Level** | Floating mini-preview cards showing the latest frame in 3D space |

---

## 4. Technology Stack & Data Architecture

### 4.1. Stack
- **3D Rendering:** CesiumJS (v1.91+) + Google Maps 3D Tiles
- **Frontend:** React (Vite)
- **Database:** **InfluxDB** (for high-velocity time-series traffic stats) and **LanceDB** (for efficient vector-based spatial indexing of camera nodes)
- **Backend:** Node.js (aggregator service)
- **Data Transport:** WebSockets for realtime feed updates

### 4.2. Data Flow
1. **Aggregator** polls global DOT APIs and ArcGIS FeatureServers.
2. **Database (InfluxDB/LanceDB)** processes and stores metadata/stats.
3. **Stitch UI** streams low-latency updates via WebSockets.

---

## 5. Performance & Constraints

- **Low Latency:** High-speed WebSocket streaming for camera status and metadata.
- **Reliable Streaming:** Reconnection logic and intelligent buffering for HLS/WebRTC streams.
- **Clustering/Culling:** Aggressive frustum culling and texture disposal to maintain 60FPS.

---

## 6. HUD & Auto-Tour

- **Search Bar:** Geocode search for any global location.
- **Auto-Tour:** Cinematic flight path between presets.
- **Presets:** **Austin** and **Atlanta** (primary presets for V1 launch).

---

## 7. Provisioning & Setup

- **Automated Provisioning:** Gemini will handle or provide scripts for autonomous sign-up/provisioning of Google Maps Platform and Cesium Ion keys where possible.
- **System Status:** Realtime HUD indicator for API health and latency.

---

## 8. Development Roadmap

1. **Discovery:** Finalize international source list and database schema.
2. **Planning:** Approve implementation plan (including DB setup).
3. **Execution:** Build backend aggregator and frontend Cesium view.
4. **Validation:** End-to-end testing of low-latency streams.
4. **Traffic congestion lines:** The layer toggle references congestion data — should V1 include this, or is it a future feature? (It would require integrating the Google Routes API or a separate traffic flow data source.)
5. **Auto-Tour cities:** Any specific list of cities you want preset, or should I just pick major US metros with known camera coverage?
