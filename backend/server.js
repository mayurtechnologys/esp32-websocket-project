const express = require('express');
const WebSocket = require('ws');
const app = express();
const port = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: 8080 });

let connectedDevices = [];

wss.on('connection', ws => {
  const deviceId = generateDeviceId();
  connectedDevices.push(deviceId);
  console.log('Device connected:', deviceId);

  ws.on('message', message => {
    const data = JSON.parse(message);
    console.log('Received:', data);
    // Handle GPIO Control Here (Can be forwarded to all devices)
  });

  ws.on('close', () => {
    connectedDevices = connectedDevices.filter(id => id !== deviceId);
    console.log('Device disconnected:', deviceId);
  });
});

// Endpoint for device monitoring
app.get('/connected-devices', (req, res) => {
  res.json({ devices: connectedDevices });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Helper function to generate unique device ID
function generateDeviceId() {
  return 'device-' + Math.random().toString(36).substring(2, 15);
}
