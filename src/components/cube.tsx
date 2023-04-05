import React from 'react';
// import * as THREE from 'three';
// import { Canvas, useFrame } from 'react-three-fiber';
// import { OrbitControls, Stars } from '@react-three/drei';
// import { Box } from '@react-three/drei';

interface ShapeProps {
  value: number;
}

const Cube: React.FC<ShapeProps> = ({ value }) => {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[value, value, value]} />
      <meshNormalMaterial />
    </mesh>
  );
};

export default Cube;