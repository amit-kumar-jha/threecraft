"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function BouncingSphere() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref.current.position.y = Math.abs(Math.sin(clock.getElapsedTime() * 2)) * 2;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default function Sphere() {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight />
      <pointLight position={[5, 5, 5]} />
      <BouncingSphere />
    </Canvas>
  );
}
