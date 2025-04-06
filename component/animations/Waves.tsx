"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function WavePlane() {
  const mesh = useRef<THREE.Mesh>(null!);
  const geometryRef = useRef<THREE.PlaneGeometry>(null!);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const posAttr = geometryRef.current.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = Math.sin(x * 2 + time) * 0.3 + Math.cos(y * 2 + time) * 0.3;
      posAttr.setZ(i, z);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry ref={geometryRef} args={[10, 10, 64, 64]} />
      <meshStandardMaterial color="dodgerblue" wireframe />
    </mesh>
  );
}

export default function Waves() {
  return (
    <Canvas camera={{ position: [0, 3, 5], fov: 50 }}>
      <ambientLight />
      <WavePlane />
    </Canvas>
  );
}
