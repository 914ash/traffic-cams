import type { Camera } from '../types';

interface CoverageMapProps {
  cameras: Camera[];
  selectedCameraId: string | null;
  onSelectCamera: (camera: Camera) => void;
}

function projectPoint(camera: Camera, cameras: Camera[]) {
  const latitudes = cameras.map((entry) => entry.lat);
  const longitudes = cameras.map((entry) => entry.lng);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);
  const left = ((camera.lng - minLng) / Math.max(maxLng - minLng, 1)) * 64 + 18;
  const top = (1 - (camera.lat - minLat) / Math.max(maxLat - minLat, 1)) * 48 + 18;

  return {
    left: `${left}%`,
    top: `${top}%`,
  };
}

export function CoverageMap({
  cameras,
  selectedCameraId,
  onSelectCamera,
}: CoverageMapProps) {
  return (
    <section className="coverage-map" aria-label="Traffic camera coverage map">
      <div className="coverage-map__frame">
        <div className="coverage-map__eyebrow">Fallback coverage map</div>
        <h2>Recorded camera coverage</h2>
        <p>
          Demo mode keeps the UI reviewable even when live map tiles or camera feeds are not
          available.
        </p>
        <div className="coverage-map__surface">
          <div className="coverage-map__grid" aria-hidden="true" />
          {cameras.map((camera) => (
            <button
              key={camera.id}
              type="button"
              className="coverage-map__pin"
              style={projectPoint(camera, cameras)}
              aria-label={camera.name}
              aria-pressed={selectedCameraId === camera.id}
              onClick={() => onSelectCamera(camera)}
            >
              <span className="coverage-map__pin-dot" />
              <span className="coverage-map__pin-card">
                <strong>{camera.name}</strong>
                <span>{camera.source}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
