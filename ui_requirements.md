# UI Requirements: Realtime 3D Traffic Camera Visualization

ABOUTME: Define the user interface and functional requirements for a 3D global map overlaying realtime traffic feeds using Google Maps Photorealistic 3D Tiles.
ABOUTME: This document outlines the core specifications for the frontend application.

## 1. Executive Summary

This application will provide a highly immersive, interactive 3D global map using Google Maps Photorealistic 3D Tiles. The core functionality is to overlay realtime traffic camera feeds and traffic data onto the 3D map, allowing users to fly through cities, inspect traffic conditions visually, and interact with specific camera nodes.

## 2. Core Technologies & Architecture

*   **Mapping Engine:** CesiumJS or Deck.gl (integrated tightly with Google Maps Photorealistic 3D Tiles API).
*   **Data Feeds:** WebSocket or polling mechanisms pulling live traffic camera image URLs, video streams (HLS/WebRTC), and congestion data (GeoJSON format).
*   **UI Framework:** React (Next.js/Vite) with a modern styling system.
*   **3D Overlays:** WebGL-based custom layers to render points of interest (the cameras) inside the 3D space.

## 3. High-Level User Experience (UX)

The user should feel like a "god's-eye" traffic controller. The interface must be sleek, minimal, and unobtrusive, letting the 3D map and live data take center stage. The color palette should lean dark (Dark Mode by default) to make the live camera feeds and colorful traffic flow lines pop.

## 4. UI Components & Layout

### 4.1. Main Viewport (The 3D Map)
*   **Full-screen 3D Map:** The map takes up 100% of the screen.
*   **Camera Controls:** 
    *   Left-click drag: Pan position.
    *   Right-click drag: Rotate/Tilt camera (yaw and pitch).
    *   Scroll: Zoom in/out.
*   **Dynamic LOD (Level of Detail):** As the user zooms in, the camera nodes should transition from clustered dots to specific icons, and finally to floating mini-previews of the live feed in 3D space.

### 4.2. Heads-Up Display (HUD) - Top Left
*   **Global Search Hub:** A sleek search bar for entering cities, intersections, or coordinates.
*   **System Status Indicator:** A pulsing green dot indicating WebSocket connection status to the traffic feed aggregators, showing latency and last update timestamp.

### 4.3. Navigation & Layer Controls - Bottom Left
*   **Filter Panel:** Small, toggleable icons to show/hide:
    *   Traffic Congestion Lines (Red/Yellow/Green overlay on roads).
    *   Live Video Cameras.
    *   Static Image Cameras.
    *   Incident Markers (Accidents, Roadworks).

### 4.4. The Feed Inspector (Side Drawer / Floating Pane) - Right Side
*   **Activation:** Occurs when a user clicks on a specific camera node in the 3D world.
*   **Content:**
    *   **Live Feed Player:** A high-quality container for the live stream or refreshing static image.
    *   **Metadata Information:** 
        *   Location name (e.g., "I-90 at Mercer St").
        *   Coordinates.
        *   Direction of travel (Northbound, Southbound, etc.).
        *   Timestamp of the feed.
    *   **Contextual Data:** Mini-graphs showing historical traffic flow at this node for the last hour.
*   **Behavior:** The drawer should blur the underlying map slightly (glassmorphism effect) to ensure readability.

### 4.5. The "Fly-To" Timeline - Bottom Right
*   **Saved Locations:** Quick access chips to fly the camera immediately to key cities (e.g., "New York", "London", "Tokyo").
*   **Auto-Tour Mode:** A toggle button that initiates an automated cinematic camera flight path over high-congestion areas that have live camera feeds available.

## 5. Interaction Design & Micro-Animations

*   **Node Hover State:** Hovering over a camera node in 3D space should smoothly expand it and show a tooltip with the location name and a tiny thumbnail preview (if bandwidth permits).
*   **Selection Transition:** Clicking a node should execute a smooth, eased camera flight to frame the 3D map around the selected node while simultaneously sliding in the Feed Inspector from the right.
*   **Loading States:** Feeds that are buffering should show a subtle, customized pulse animation rather than a generic spinner. Failed feeds should revert to a stylish "Signal Lost" graphic.

## 6. Performance & Constraints

*   **Clustering:** Massive amounts of cameras (e.g., 50,000+ globally) must be clustered at high altitudes to maintain 60FPS.
*   **Frustum Culling:** Only camera nodes within the user's field of view should request feed updates or thumbnails to save bandwidth and API costs.
*   **Memory Management:** The browser must proactively dispose of WebGL textures from off-screen live streams to prevent memory leaks and crashes on lower-end hardware.

## 7. Accessibility

*   All interactive UI elements overlaying the map must have adequate contrast against the 3D map background.
*   Keyboard navigation shortcuts for panning (WASD or Arrow keys) and zooming (+ / -).
*   Screen reader compatibility for the Feed Inspector metadata.
