"use client";

import { Canvas } from "@react-three/fiber";
import { ARButton, Controllers, Hands, VRButton, XR } from "@react-three/xr";

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
