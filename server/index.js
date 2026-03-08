/**
 * ABOUTME: Entry point for the Stitch UI backend aggregator.
 * ABOUTME: Starts the Express server, WebSocket server, and polling loop.
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
  console.log('Client connected to Stitch UI Aggregator');
  ws.send(JSON.stringify({ type: 'status', message: 'Connected to realtime traffic stream' }));
});

// Link WebSocket to aggregator for broadcasting
setWss(wss);

// Start the mission
server.listen(PORT, () => {
  console.log(`Stitch UI Backend listening on port ${PORT}`);
  startPolling();
});
