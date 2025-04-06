"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

const RotatingCube = () => (
  <mesh rotation={[0.4, 0.2, 0]}>
    <boxGeometry args={[2, 2, 2]} />
    <meshStandardMaterial color="skyblue" />
  </mesh>
);

export default function Cube() {
  return (
    <Canvas camera={{ position: [4, 4, 4] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <RotatingCube />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
