"use client";

import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";

interface XRCanvasProps {
  data: string;
}

export function XRCanvas(props: XRCanvasProps) {
  return (
    <>
      <VRButton />
      <ARButton />
      <Canvas>
        <XR>
          <Controllers />
          <Hands />
          <mesh>
            <boxGeometry />
            <meshBasicMaterial color="blue" />
          </mesh>
        </XR>
      </Canvas>
    </>
  );
}
