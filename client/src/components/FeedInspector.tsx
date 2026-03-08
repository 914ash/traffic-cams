import React from 'react';

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

interface FeedInspectorProps {
  camera: Camera;
  onClose: () => void;
}

const FeedInspector: React.FC<FeedInspectorProps> = ({ camera, onClose }) => {
  if (!camera) return null;

  return (
    <div className="feed-inspector">
      <div className="inspector-header">
        <h2>{camera.name}</h2>
        <button onClick={onClose} className="close-btn">&times;</button>
      </div>

      <div className="feed-container">
        {camera.feedType === 'video' ? (
          <video 
            src={camera.feedUrl} 
            controls 
            autoPlay 
            muted 
            className="live-video"
          />
        ) : (
          <img 
            src={camera.feedUrl} 
            alt={camera.name} 
            className="live-image"
            // Simple refresh logic for static images if needed could be added here
          />
        )}
      </div>

      <div className="metadata-panel">
        <div className="meta-item">
          <label>SOURCE</label>
          <span>{camera.source}</span>
        </div>
        <div className="meta-item">
          <label>DIRECTION</label>
          <span>{camera.direction}</span>
        </div>
        <div className="meta-item">
          <label>COORDINATES</label>
          <span>{camera.lat.toFixed(4)}, {camera.lng.toFixed(4)}</span>
        </div>
        <div className="meta-item">
          <label>LAST UPDATE</label>
          <span>{new Date(camera.lastUpdated).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedInspector;
