const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const redis = require('redis');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const subscriber = redis.createClient();
subscriber.connect();

subscriber.subscribe('notifications', (message) => {
  console.log('📩 Received from Redis:', message);
  io.emit('notification', message);
});

app.use(express.static(__dirname));

server.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
