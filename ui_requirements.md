# Traffic Cams UI Notes

## Interface Goal

The UI should make it easy to scan camera coverage, pick a camera, and read the important details without hunting through a crowded control panel.

## Main Surfaces

### Coverage Surface

- full-screen map area
- selectable camera points
- camera names and source labels visible without opening a separate menu

### Status Header

- plain-language app title
- current feed status
- no internal project branding or dashboard slogans

### Camera Inspector

- selected camera name
- source, direction, coordinates, and last update time
- stable layout whether media is live, delayed, or unavailable

## Demo Requirements

- demo mode should render without private map configuration
- the selected-camera state should be linkable for screenshot capture
- demo copy should explain that the layout is recorded and reproducible
