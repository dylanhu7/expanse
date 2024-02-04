"use client";

import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Controllers, Hands, VRButton, XR } from "@react-three/xr";
import * as THREE from "three";
import { WallElement } from "~/app/immersive/_components/immersive/wall";
import type { Space, SpaceAssetJoined, Wall } from "~/server/db/schema";

interface XRCanvasProps {
  space: Space;
  walls: Wall[];
  assets: SpaceAssetJoined[];
}

const inBrowser = "true";

export function XRCanvas({ space, walls }: XRCanvasProps) {
  return (
    <>
      <VRButton />
      <Canvas shadows>
        <Scene space={space} walls={walls} />
      </Canvas>
    </>
  );
}

function Scene({ space, walls }: { space: Space; walls: Wall[] }) {
  const AABB = (walls: Wall[]) => {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const wall of walls) {
      minX = Math.min(minX, wall.x1, wall.x2);
      maxX = Math.max(maxX, wall.x1, wall.x2);
      minY = Math.min(minY, wall.y1, wall.y2);
      maxY = Math.max(maxY, wall.y1, wall.y2);
    }
    return { minX, maxX, minY, maxY };
  };

  // generate point lights uniformly in AABB, spaced 4 meters apart in a grid
  const { minX, maxX, minY, maxY } = AABB(exampleWalls);
  const pointLights: [number, number, number][] = [];
  for (let x = minX; x < maxX; x += 4) {
    for (let y = minY; y < maxY; y += 4) {
      pointLights.push([x + 2.5, 3 - 0.01, y + 2.5]);
    }
  }
  const { camera } = useThree();
  camera.position.set(3, 1.7, 3);

  let isVR = false;
  if (navigator.xr) {
    navigator.xr
      .isSessionSupported("immersive-vr")
      .then((supported) => {
        isVR = supported;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const floorMap = useTexture("/floor.jpg");
  floorMap.wrapS = THREE.RepeatWrapping;
  floorMap.wrapT = THREE.RepeatWrapping;
  floorMap.repeat.set(10, 10);
  console.log(isVR);

  return (
    <>
      {!isVR && (
        <>
          <OrbitControls
            enableDamping
            enablePan
            target={[0, 0, 0]}
            makeDefault
          />
          <GizmoHelper alignment="bottom-right">
            <GizmoViewport
              axisColors={["red", "green", "blue"]}
              labelColor="white"
            />
          </GizmoHelper>
        </>
      )}

      <XR>
        {/* <mesh position={[1, 0, 0]}>
          <primitive object={camera} />
        </mesh> */}
        <Controllers />
        <Hands />
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
        </mesh>
        <mesh position={[1, 0, 0]}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshBasicMaterial color="red" />
        </mesh>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshBasicMaterial color="green" />
        </mesh>
        <mesh position={[0, 0, 1]}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshBasicMaterial color="blue" />
        </mesh>
        {exampleWalls.map((wall, index) => (
          <WallElement key={index} wall={wall} />
        ))}
        {/* generate point lights uniformly in AABB */}
        <ambientLight intensity={1} color="#fffffc" />
        {pointLights.map((position, index) => (
          <pointLight
            key={index}
            color="#fed"
            intensity={1}
            position={position}
            castShadow
          />
        ))}
        {/* point light geometry */}
        {pointLights.map((position, index) => (
          <mesh key={index} position={position} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.1, 32]} />
            <meshStandardMaterial
              color="white"
              emissive="white"
              emissiveIntensity={1}
            />
          </mesh>
        ))}
        {pointLights.map((position, index) => (
          <mesh
            key={index}
            position={[position[0], position[1] + 0.001, position[2]]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <circleGeometry args={[0.13, 32]} />
            <meshStandardMaterial color="silver" />
          </mesh>
        ))}
        {/* floor geometry */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
          {/* polished concrete */}
          <meshStandardMaterial
            color="white"
            emissive="black"
            // emissiveIntensity={1}
            roughness={0}
            metalness={0.6}
            map={floorMap}
          />
          <planeGeometry args={[100, 100]} />
        </mesh>
        {/* ceiling geometry */}
        <mesh
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 3, 0]}
          receiveShadow
          castShadow
        >
          {/* polished concrete */}
          <meshStandardMaterial
            color="white"
            emissive="#fffffc"
            emissiveIntensity={0.3}
            roughness={1}
            metalness={0.6}
          />
          <planeGeometry args={[100, 100]} />
        </mesh>
        {/* <Environment preset="warehouse" background /> */}
      </XR>
    </>
  );
}

const exampleWallBuilder = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): Wall => {
  return {
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    spaceId: "1",
    x1,
    y1,
    x2,
    y2,
  };
};

const exampleWalls = [
  exampleWallBuilder(0, 0, 0, 4),
  exampleWallBuilder(0, 4, 2, 4),
  exampleWallBuilder(2, 2, 4, 0),
  exampleWallBuilder(2, 0, 0, 0),
  exampleWallBuilder(2, 4, 2, 8),
  exampleWallBuilder(4, 2, 7, 2),
  exampleWallBuilder(7, 2, 7, 12),
  exampleWallBuilder(7, 11, 0, 12),
];
