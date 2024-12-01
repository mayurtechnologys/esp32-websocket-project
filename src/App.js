import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [ws, setWs] = useState(null);
  const [gpioStatus, setGpioStatus] = useState({});
  const [connectedDevices, setConnectedDevices] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://your-server-url:8080');
    socket.onopen = () => console.log("Connected to WebSocket");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setGpioStatus(data);
    };

    setWs(socket);

    return () => socket.close();
  }, []);

  useEffect(() => {
    // Fetch connected devices status
    fetch('/connected-devices')
      .then(response => response.json())
      .then(data => setConnectedDevices(data.devices));
  }, []);

  const handleGpioChange = (gpio, value) => {
    const message = JSON.stringify({ gpio, value });
    ws.send(message);
  };

  return (
    <div className="App">
      <h1>ESP32 GPIO Control</h1>
      <button onClick={() => handleGpioChange(1, 1)}>Turn On GPIO 1</button>
      <button onClick={() => handleGpioChange(1, 0)}>Turn Off GPIO 1</button>

      <h2>Connected Devices: {connectedDevices.length}</h2>
      <ul>
        {connectedDevices.map(device => (
          <li key={device}>{device}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
