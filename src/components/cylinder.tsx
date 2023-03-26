
interface ShapeProps {
  value: number
}
const Cylinder: React.FC<ShapeProps> = ({ value }) => {
  return (
    <mesh position={[0, value / 2, 0]}>
      <cylinderGeometry args={[value / 2, value / 2, value, 32]} />
      <meshNormalMaterial />
    </mesh>
  );
};

export default Cylinder