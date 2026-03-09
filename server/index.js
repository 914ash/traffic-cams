/**
 * Starts the traffic-cams backend aggregator.
 * Boots the HTTP server, WebSocket server, and polling loop.
 */

require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('ws');
const { startPolling, setWss } = require('./aggregator');

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

const PORT = process.env.PORT || 3001;

// Provide current state to new clients
wss.on('connection', (ws) => {
  console.log('Client connected to traffic-cams backend');
  ws.send(JSON.stringify({ type: 'status', message: 'Connected to live traffic feed' }));
});

// Link WebSocket to aggregator for broadcasting
setWss(wss);

// Start the mission
server.listen(PORT, () => {
  console.log(`traffic-cams backend listening on port ${PORT}`);
  startPolling();
});
