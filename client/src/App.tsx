import { useEffect, useState } from 'react';
import GlobeView from './components/GlobeView';
import FeedInspector from './components/FeedInspector';
import './App.css';

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

function App() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [status, setStatus] = useState('Connecting to aggregator...');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      setStatus('System Linked');
      console.log('Linked to Stitch UI Aggregator');
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
      setStatus('Link Lost - Retrying...');
    };

    return () => ws.close();
  }, []);

  return (
    <div className="stitch-ui">
      <header className="hud-top-left">
        <h1>STITCH UI // MISSION CONTROL</h1>
        <div className={`status-indicator ${status.includes('Linked') ? 'online' : 'reconnecting'}`}>
          {status}
        </div>
      </header>

      <main className="viewport">
        <GlobeView cameras={cameras} onSelectCamera={setSelectedCamera} />
      </main>

      {selectedCamera && (
        <FeedInspector 
          camera={selectedCamera} 
          onClose={() => setSelectedCamera(null)} 
        />
      )}

      <div className="hud-bottom-right">
        <div className="camera-count">ACTIVE NODES: {cameras.length}</div>
      </div>
    </div>
  );
}

export default App;
