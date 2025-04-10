"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const OrbitingSpheres = () => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;

    if (groupRef.current) {
      const group = groupRef.current;
      const numSpheres = group.children.length;

      for (let i = 0; i < numSpheres; i++) {
        const sphere = group.children[i] as THREE.Mesh;
        const angle = (i / numSpheres) * Math.PI * 2 + timeRef.current * 0.6;
        const baseRadius = 2.2;
        const pulsate = Math.sin(timeRef.current * 2 + i) * 0.3;
        const radius = baseRadius + pulsate;

        sphere.position.x = Math.cos(angle) * radius;
        sphere.position.y = Math.sin(angle * 0.8) * pulsate;
        sphere.position.z = Math.sin(angle) * radius;

        // Pulsing effect
        const scale = 1 + Math.sin(timeRef.current * 3 + i) * 0.2;
        sphere.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(12)].map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial
            color={`hsl(${i * 30}, 100%, 60%)`}
            emissive={`hsl(${i * 30}, 100%, 40%)`}
            emissiveIntensity={1}
          />
        </mesh>
      ))}
    </group>
  );
};

const CoreSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.35, 64, 64]} />
      <meshStandardMaterial
        color="#f1c40f"
        emissive="#ff8c00"
        emissiveIntensity={2}
        roughness={0.1}
        metalness={0.5}
      />
    </mesh>
  );
};

const OrbitPulse = () => {
  const cameraGroup = useRef<THREE.Group>(null);

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
      <group ref={cameraGroup}>
        <ambientLight intensity={1.2} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
        <CoreSphere />
        <OrbitingSpheres />
        <OrbitControls enableZoom={false} enablePan={false} />
      </group>
    </Canvas>
  );
};

export default OrbitPulse;
