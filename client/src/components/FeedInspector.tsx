import React from 'react';
import type { Camera } from '../types';

interface FeedInspectorProps {
  camera: Camera;
  onClose: () => void;
}

const FeedInspector: React.FC<FeedInspectorProps> = ({ camera, onClose }) => {
  if (!camera) return null;
  const hasPreview = Boolean(camera.feedUrl);

  return (
    <div className="feed-inspector">
      <div className="inspector-header">
        <h2>{camera.name}</h2>
        <button onClick={onClose} className="close-btn">&times;</button>
      </div>

      <div className="feed-container">
        {!hasPreview ? (
          <div className="demo-feed-state">
            <strong>Recorded camera metadata</strong>
            <span>Preview media is disabled in demo mode so the layout stays reproducible.</span>
          </div>
        ) : camera.feedType === 'video' ? (
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
          <span>
            {new Date(camera.lastUpdated).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedInspector;
