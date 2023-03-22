import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Cube from './components/cube';
import './App.css';

function App() {
  const [cubeWidth, setCubeWidth] = useState(0);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);

      setCubeWidth(data.value);
    };

    return () => {
      socket.close();
    };
  }, []);

  console.log(cubeWidth);
  return (
    <div className="App">
      <Canvas camera={{ position: [0, 0, 10] }} onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#f0f0f0"));
      }} >
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[300, 300, 300]} />
        <Cube value={cubeWidth} />
      </Canvas>
    </div>
  );
}

export default App;
