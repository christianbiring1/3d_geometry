import React, { useEffect, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Cube from './components/cube';
import './App.css';

const MemoizedCube = React.memo(Cube);

function App() {
  const [cubeWidth, setCubeWidth] = useState(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const handleSocketMessage = useCallback((event: MessageEvent) => {
    const data = JSON.parse(event.data);

    setCubeWidth(data.value);
  }, []);

  const sockeUrl = useMemo(() => `ws://${window.location.hostname}:8080`, []);


  useEffect(() => {
    const socket = new WebSocket(sockeUrl);
    socket.binaryType = 'arraybuffer';

    socket.onmessage = handleSocketMessage;

    socket.onopen = () => {
      console.log('WebSocket connection open');
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setSocket(null);
    };
    // socket.onmessage = (e) => {
    //   const data = JSON.parse(e.data);

    //   setCubeWidth(data.value);
    // };

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, [sockeUrl, handleSocketMessage]);

  const cubeProps = useMemo(() => ({ value: cubeWidth }), [cubeWidth]);

  console.log(cubeWidth);
  return (
    <div className="App">
      <Canvas camera={{ position: [0, 0, 10] }} style={{ width: '80vw', height: '100vh' }} onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#f0f0f0"));
      }} >
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[300, 300, 300]} />
        <MemoizedCube {...cubeProps} />
        {/* <Cube value={cubeWidth} /> */}
      </Canvas>
    </div>
  );
}

export default App;
