import React from 'react';
import { Viewer, Cesium3DTileset, Entity, PointGraphics } from 'resium';
import { Cartesian3, Color, Ion, GoogleMaps } from 'cesium';

interface Camera {
  id: string;
  lat: number;
  lng: number;
  name: string;
  direction: string;
  source: string;
  feedUrl: string;
  feedType: 'image' | 'video';
  lastUpdated: string;
}

interface GlobeViewProps {
  cameras: Camera[];
  onSelectCamera: (camera: Camera) => void;
}

// Set Ion token globally
Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

const GlobeView: React.FC<GlobeViewProps> = ({ cameras, onSelectCamera }) => {
  return (
    <Viewer 
      full 
      style={{ height: "100vh" }}
      onSelectedEntityChange={(entity) => {
        if (entity && entity.id) {
          const cam = cameras.find(c => c.id === entity.id);
          if (cam) onSelectCamera(cam);
        }
      }}
    >
      {/* 
        To use Photorealistic 3D Tiles, we typically use the GoogleMaps.createPhotorealistic3DTileset helper
      */}
      <Cesium3DTileset url={(GoogleMaps as any).createPhotorealistic3DTileset()} />
      
      {cameras.map(cam => (
        <Entity
          key={cam.id}
          id={cam.id}
          name={cam.name}
          description={`Source: ${cam.source}<br/>Direction: ${cam.direction}`}
          position={Cartesian3.fromDegrees(cam.lng, cam.lat)}
        >
          <PointGraphics pixelSize={10} color={Color.LIME} outlineColor={Color.BLACK} outlineWidth={2} />
        </Entity>
      ))}
    </Viewer>
  );
};

export default GlobeView;
