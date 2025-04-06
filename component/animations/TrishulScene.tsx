// components/TrishulScene.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MeshWobbleMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Trishul() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    ref.current.rotation.y += 0.003;
  });

  return (
    <mesh ref={ref}>
      <cylinderGeometry args={[0.1, 0.1, 2, 32]} />
      <MeshWobbleMaterial color="#ff4500" factor={0.5} speed={1} />
    </mesh>
  );
}

export default function TrishulScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={1.5} />
      <Trishul />
      <OrbitControls />
    </Canvas>
  );
}
