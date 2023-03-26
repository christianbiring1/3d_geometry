interface ShapeProps {
  value: number
}

const Sphere: React.FC<ShapeProps> = ({ value }) => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[value / 2, 32, 32]} />
      <meshNormalMaterial />
    </mesh>
  );
};

export default Sphere