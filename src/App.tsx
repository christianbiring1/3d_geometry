import React, { useEffect, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Cube from './components/cube';
import Cylinder from './components/cylinder';
import Sphere from './components/sphere';
import './App.css';

const App: React.FC = () => {
  const [cubeWidth, setCubeWidth] = useState(0);
  const [cylinderHeight, setCylinderHeight] = useState(0);
  const [sphereRadius, setSphereRadius] = useState(0);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setCubeWidth(data.value);
      setCylinderHeight(data.value);
      setSphereRadius(data.value);
      console.log(data.value)
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <Canvas camera={{ position: [0, 0, 10] }} style={{ width:"100vw", height:"100vh"}} onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#f0f0f0"));
      }}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[300, 300, 400]} />
        <Cube value={cubeWidth} />
        <Cylinder value={cylinderHeight} />
        <Sphere value={sphereRadius} />
      </Canvas>
    </div>
  );
};

export default App;
