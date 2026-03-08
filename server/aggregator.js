const axios = require('axios');
const { upsertCameras, logMetric } = require('./database');

/**
 * ABOUTME: Core aggregator logic for Stitch UI.
 * ABOUTME: Responsible for polling international traffic cam sources and normalizing data.
 */

const SOURCES = [
  {
    name: 'Austin DOT',
    url: 'https://data.austintexas.gov/resource/886j-v9hz.json',
    interval: 60000 // 1 minute
  },
  {
    name: 'Sydney TfNSW',
    url: 'https://vms.transport.nsw.gov.au/traffic/camera/Sydney.json',
    interval: 120000 // 2 minutes
  },
  {
    name: 'London TfL',
    url: 'https://api.tfl.gov.uk/Place/Type/JamCam',
    interval: 180000 // 3 minutes
  }
];

let wss = null;

function setWss(wsServer) {
  wss = wsServer;
}

async function pollSource(source) {
  try {
    const startTime = Date.now();
    const response = await axios.get(source.url);
    const rawData = response.data;
    
    // London API returns an array, Austin returns an array, Sydney returns an array
    const normalized = rawData.slice(0, 50).map(item => normalizeStationData(item, source.name)).filter(Boolean);
    
    await upsertCameras(normalized);
    
    const duration = Date.now() - startTime;
    logMetric('polling_success', { source: source.name }, { latency: duration, count: normalized.length });
    
    if (wss) {
      wss.clients.forEach(client => {
        if (client.readyState === 1) { // OPEN
          client.send(JSON.stringify({ type: 'cameras', source: source.name, data: normalized }));
        }
      });
    }
    
    console.log(`Aggregated ${normalized.length} cameras from ${source.name} in ${duration}ms`);
  } catch (err) {
    console.error(`Error polling ${source.name}:`, err.message);
    logMetric('polling_error', { source: source.name }, { error: 1 });
  }
}

function startPolling() {
  SOURCES.forEach(source => {
    pollSource(source);
    setInterval(() => pollSource(source), source.interval);
  });
}

function normalizeStationData(raw, source) {
  if (source === 'London TfL') {
    // TfL JamCam payloads appear in both flat and additionalProperties-based shapes.
    const lat = raw.lat;
    const lon = raw.lon;
    const name = raw.commonName;
    const additional = raw.additionalProperties || [];
    const videoUrl = raw.videoUrl || additional.find(p => p.key === 'videoUrl')?.value || '';
    const view = raw.view || additional.find(p => p.key === 'view')?.value || 'Unknown';

    return {
      id: raw.id,
      lat: lat,
      lng: lon,
      name: name,
      direction: view,
      feedUrl: videoUrl,
      feedType: 'video',
      source: source,
      lastUpdated: new Date().toISOString()
    };
  }

  if (source === 'Sydney TfNSW') {
    return {
      id: raw.id,
      lat: raw.latitude,
      lng: raw.longitude,
      name: raw.description,
      direction: raw.direction,
      feedUrl: raw.href,
      feedType: 'image',
      source: source,
      lastUpdated: new Date().toISOString()
    };
  }

  if (source === 'Austin DOT') {
    return {
      id: raw.camera_id,
      lat: parseFloat(raw.location?.latitude || 0),
      lng: parseFloat(raw.location?.longitude || 0),
      name: raw.location_name,
      direction: 'Unknown',
      feedUrl: raw.screenshot_address,
      feedType: 'image',
      source: source,
      lastUpdated: new Date().toISOString()
    };
  }
  
  return null;
}

module.exports = {
  normalizeStationData,
  startPolling,
  setWss
};
