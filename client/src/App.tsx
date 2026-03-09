import { useEffect, useState } from 'react';
import GlobeView from './components/GlobeView';
import FeedInspector from './components/FeedInspector';
import { demoCameras } from './demo/demoCameras';
import { readRuntimeConfig } from './lib/runtimeConfig';
import type { RuntimeEnv } from './lib/runtimeConfig';
import type { Camera } from './types';
import './App.css';

function App() {
  const [runtimeConfig] = useState(() =>
    readRuntimeConfig(window.location.search, import.meta.env as RuntimeEnv),
  );
  const [cameras, setCameras] = useState<Camera[]>(runtimeConfig.demoMode ? demoCameras : []);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(() => {
    const selectedId = new URLSearchParams(window.location.search).get('selected');
    return demoCameras.find((camera) => camera.id === selectedId) ?? null;
  });
  const [status, setStatus] = useState(
    runtimeConfig.demoMode ? 'Recorded demo feed ready' : 'Connecting to traffic feed…',
  );

  useEffect(() => {
    if (runtimeConfig.demoMode) {
      return;
    }

    const ws = new WebSocket(runtimeConfig.wsUrl);

    ws.onopen = () => {
      setStatus('Live feed connected');
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'cameras') {
        setCameras(prev => {
          const newMap = new Map<string, Camera>(prev.map(c => [c.id, c]));
          msg.data.forEach((c: Camera) => newMap.set(c.id, c));
          return Array.from(newMap.values());
        });
      } else if (msg.type === 'status') {
        setStatus(msg.message);
      }
    };

    ws.onclose = () => {
      setStatus('Live feed reconnecting…');
    };

    return () => ws.close();
  }, [runtimeConfig.demoMode, runtimeConfig.wsUrl]);

  return (
    <div className="traffic-monitor">
      <header className="hud-top-left">
        <p className="eyebrow">Traffic camera operations</p>
        <h1>Review camera coverage across multiple public networks.</h1>
        <div className={`status-indicator ${status.includes('connected') || status.includes('ready') ? 'online' : 'reconnecting'}`}>
          {status}
        </div>
      </header>

      <main className="viewport">
        <GlobeView
          cameras={cameras}
          mapMode={runtimeConfig.mapMode}
          selectedCameraId={selectedCamera?.id ?? null}
          onSelectCamera={setSelectedCamera}
        />
      </main>

      {selectedCamera && (
        <FeedInspector 
          camera={selectedCamera} 
          onClose={() => setSelectedCamera(null)} 
        />
      )}

      <div className="hud-bottom-right">
        <div className="camera-count">Active cameras: {cameras.length}</div>
      </div>
    </div>
  );
}

export default App;
