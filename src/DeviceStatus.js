import React, { useEffect, useState } from 'react';

const DeviceStatus = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetch('/connected-devices')
      .then(response => response.json())
      .then(data => setDevices(data.devices));
  }, []);

  return (
    <div>
      <h3>Connected Devices: {devices.length}</h3>
      <ul>
        {devices.map(device => (
          <li key={device}>{device}</li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceStatus;
