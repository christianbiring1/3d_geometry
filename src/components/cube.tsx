import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Box } from '@react-three/drei';

const Cube: React.FC = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box>
        <meshStandardMaterial attach="material" />
      </Box>
    </Canvas>
  );
};

export default Cube;