export type Wall = { x1: number; y1: number; x2: number; y2: number };

export const WallElement = ({ wall }: { wall: Wall }) => {
  const { x1, y1, x2, y2 } = wall;
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1);

  const width = 0.1; // Arbitrary thickness of the wall
  const height = 3; // Height of the wall

  return (
    <mesh
      position={[
        (x1 + x2) / 2, // Center x position
        height / 2, // Center y position, to make the bottom edge at y = 0
        (y1 + y2) / 2, // Center z position
      ]}
      rotation={[0, angle, 0]}
    >
      <boxGeometry
        args={[length, height, width]} // [width (length of the wall), height, depth (thickness)]
        // Rotate around the y-axis to align with the start and end points
      />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};
