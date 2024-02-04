"use client";

import { GizmoHelper, GizmoViewport, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Controllers, Hands, VRButton, XR } from "@react-three/xr";
import { WallElement } from "~/app/immersive/_components/immersive/wall";
import type { Space, SpaceAssetJoined, Wall } from "~/server/db/schema";

interface XRCanvasProps {
  space: Space;
  walls: Wall[];
  assets: SpaceAssetJoined[];
}

const inBrowser = "false";

export function XRCanvas(props: XRCanvasProps) {
  return (
    <>
      <VRButton />
      <Canvas shadows>
        {inBrowser && (
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
          <ambientLight intensity={3} />
          <pointLight position={[1, 3, 2]} castShadow />
          <pointLight position={[2, 3, 1]} castShadow />
          <pointLight position={[3, 3, 2]} castShadow />
          {/* floor geometry */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
            {/* polished concrete */}
            <meshStandardMaterial
              color="white"
              emissive={"black"}
              // emissiveIntensity={1}
              roughness={0}
              metalness={0.2}
            />
            <planeGeometry args={[100, 100]} />
          </mesh>
          {/* <Environment preset="warehouse" background /> */}
        </XR>
      </Canvas>
    </>
  );
}

const w = {
  id: "1",
  spaceId: "1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const exampleWalls: Wall[] = [
  { ...w, x1: 0, y1: 0, x2: 4, y2: 0 },
  { ...w, x1: 0, y1: 0, x2: 0, y2: 4 },
  { ...w, x1: 4, y1: 0, x2: 4, y2: 4 },
  { ...w, x1: 0, y1: 4, x2: 4, y2: 4 },
];
