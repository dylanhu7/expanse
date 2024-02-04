"use client";

import { Canvas } from "@react-three/fiber";
import { Controllers, Hands, VRButton, XR } from "@react-three/xr";

import { GizmoHelper, GizmoViewport, OrbitControls } from "@react-three/drei";
import {
  WallElement,
  type Wall,
} from "~/app/immersive/_components/immersive/wall";

interface XRCanvasProps {
  data: string;
}

export function XRCanvas(props: XRCanvasProps) {
  return (
    <>
      <VRButton />
      <Canvas shadows>
        <OrbitControls enableDamping enablePan target={[0, 0, 0]} makeDefault />
        <GizmoHelper alignment="bottom-right">
          <GizmoViewport
            axisColors={["red", "green", "blue"]}
            labelColor="white"
          />
        </GizmoHelper>
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
          <ambientLight intensity={0.5} />
          <pointLight position={[1, 1, 1]} />
          {/* floor geometry */}
          {/* <mesh> */}
          {/* polished concrete */}
          {/* <meshStandardMaterial
              color="white"
              roughness={0.1}
              metalness={0.1}
            />
            <Plane
              rotation={[-Math.PI / 2, 0, 0]}
              args={[100, 100]}
              receiveShadow
            /> */}
          {/* </mesh> */}
          {/* <Environment preset="warehouse" background /> */}
        </XR>
      </Canvas>
    </>
  );
}

const exampleWalls: Wall[] = [
  { x1: 0, y1: 0, x2: 4, y2: 0 },
  { x1: 0, y1: 0, x2: 0, y2: 4 },
  { x1: 4, y1: 0, x2: 4, y2: 4 },
  { x1: 0, y1: 4, x2: 4, y2: 4 },
];
