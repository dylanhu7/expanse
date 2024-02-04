import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { WallJoined } from "~/server/db/schema";
export const WallElement = ({ wall }: { wall: WallJoined }) => {
  const { x1, y1, x2, y2, spaceAssets } = wall;
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

  const bumpMap = useTexture("/floor.jpg");

  console.log(new THREE.Vector3(x2 - x1, 0, y2 - y1));

  const images = useTexture(spaceAssets.map((saj) => saj.asset.imageUrl ?? ""));
  console.log(images);

  const total = spaceAssets.length;
  const data = spaceAssets.map((saj, index) => {
    const id = saj.asset.id;
    const x = saj.spaceAsset.x;
    const y = saj.spaceAsset.y;
    console.log(x, y);
    const image = images[index];
    const title = saj.asset.title;
    const description = saj.asset.description;
    const year = saj.asset.year;
    const scale = saj.spaceAsset.scale;
    const onCanonicalWall = saj.spaceAsset.onCanonicalWall;
    const sign = onCanonicalWall ? -1 : 1;
    const position = new THREE.Vector3(
      0 + (index / total) * length,
      0,
      0.053 * sign,
    );
    let angle = 0;
    console.log(onCanonicalWall);
    if (onCanonicalWall) {
      angle = Math.PI;
    }

    return {
      id,
      x,
      y,
      image,
      title,
      description,
      year,
      scale,
      onCanonicalWall,
      position,
      angle,
    };
  });

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
      <boxGeometry args={[length, height, width]} />
      <meshPhysicalMaterial
        color="#fffffc"
        // emissive={"#ffc"}
        // emissiveIntensity={0.2}
        bumpMap={bumpMap}
      />
      {data.map((d) => (
        <mesh key={d.id} position={d.position} rotation={[0, d.angle, 0]}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial map={d.image} />
        </mesh>
      ))}
    </mesh>
  );
};
