/**
 * ABOUTME: Database integration for Stitch UI.
 * ABOUTME: Handles LanceDB for spatial indexing and InfluxDB for time-series metrics.
 */

const lancedb = require('@lancedb/lancedb');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const path = require('path');

// --- LanceDB Setup (Spatial Indexing) ---
let db;
async function initLanceDB() {
  const dbPath = path.join(__dirname, '..', 'data', 'stitch_nodes.lance');
  db = await lancedb.connect(dbPath);
  return db;
}

async function getNodesTable() {
  if (!db) await initLanceDB();
  const tables = await db.tableNames();
  if (tables.includes('cameras')) {
    return await db.openTable('cameras');
  }
  // Initialize with empty schema if not exists
  return await db.createTable('cameras', [{
    id: 'placeholder',
    lat: 0.0,
    lng: 0.0,
    name: 'Placeholder',
    direction: 'None',
    feedUrl: '',
    feedType: 'image',
    source: 'None',
    lastUpdated: new Date().toISOString()
  }]);
}

async function upsertCameras(cameras) {
  const table = await getNodesTable();
  // Simplified upsert: delete existing and add new for current source
  // In a real app we'd use a more granular merge
  await table.add(cameras);
}

// --- InfluxDB Setup (Metrics) ---
const influxToken = process.env.INFLUX_TOKEN;
const influxUrl = process.env.INFLUX_URL || 'http://localhost:8086';
const influxOrg = process.env.INFLUX_ORG || 'stitch';
const influxBucket = process.env.INFLUX_BUCKET || 'traffic';

const influxClient = influxToken ? new InfluxDB({ url: influxUrl, token: influxToken }) : null;

function logMetric(measurement, tags, fields) {
  if (!influxClient) return;
  const writeApi = influxClient.getWriteApi(influxOrg, influxBucket);
  const point = new Point(measurement);
  
  Object.entries(tags).forEach(([k, v]) => point.tag(k, v));
  Object.entries(fields).forEach(([k, v]) => point.floatField(k, v));
  
  writeApi.writePoint(point);
  writeApi.close().catch(e => console.error('Error writing to InfluxDB', e));
}

module.exports = {
  upsertCameras,
  logMetric
};
