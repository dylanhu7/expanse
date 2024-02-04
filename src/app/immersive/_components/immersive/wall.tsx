import type { Wall } from "~/server/db/schema";

export const WallElement = ({ wall }: { wall: Wall }) => {
  const { x1, y1, x2, y2 } = wall;
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1);

  const width = 0.1; // Arbitrary thickness of the wall
  const height = 3; // Height of the wall
  // const myshape = new THREE.Shape();
  // myshape.moveTo(0, 0);
  // myshape.lineTo(0, height);
  // myshape.lineTo(length, height);
  // myshape.lineTo(length, 0);
  // myshape.lineTo(0, 0);

  return (
    <mesh
      receiveShadow
      castShadow
      position={[
        (x1 + x2) / 2, // Center x position
        height / 2, // Center y position, to make the bottom edge at y = 0
        (y1 + y2) / 2, // Center z position
      ]}
      rotation={[0, angle, 0]}
    >
      {/* <extrudeGeometry args={[myshape, { depth: width }]} /> */}
      <boxGeometry args={[length, height, width]} />
      <meshStandardMaterial color="#fffffc" roughness={0.9} metalness={0.4} />
    </mesh>
  );
};
