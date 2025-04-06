"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Laptop() {
  const screenRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    (
      screenRef.current.material as THREE.MeshStandardMaterial
    ).emissiveIntensity = 0.5 + Math.sin(clock.elapsedTime * 2) * 0.5;
  });

  return (
    <Float floatIntensity={1.5} rotationIntensity={1}>
      <mesh position={[0, 0, 0]}>
        {/* Laptop base */}
        <boxGeometry args={[2, 0.1, 1.4]} />
        <meshStandardMaterial color="#1f1f1f" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh
        ref={screenRef}
        position={[0, 1, -0.7]}
        rotation={[-Math.PI / 2.8, 0, 0]}
      >
        {/* Screen */}
        <planeGeometry args={[2, 1.2]} />
        <meshStandardMaterial color="#0f0" emissive="#0f0" />
      </mesh>
    </Float>
  );
}

function FloatingLogos() {
  const icons: {
    name: string;
    position: [number, number, number];
    color: string;
  }[] = [
    { name: "React", position: [2, 1, -1], color: "#61DBFB" },
    { name: "Next.js", position: [-2, 1, 1], color: "#fff" },
    { name: "Tailwind", position: [1.5, -1, 1], color: "#38bdf8" },
  ];

  return (
    <>
      {icons.map((icon, i) => (
        <Float key={i} floatIntensity={1.2} speed={1.2 + i}>
          <Text
            position={icon.position}
            fontSize={0.4}
            color={icon.color}
            anchorX="center"
            anchorY="middle"
          >
            {icon.name}
          </Text>
        </Float>
      ))}
    </>
  );
}

function Sparkles() {
  return (
    <Stars radius={10} depth={20} count={300} factor={3} saturation={0} fade />
  );
}

export default function FloatingLaptopScene() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
      <ambientLight intensity={1.2} />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <Laptop />
      <FloatingLogos />
      <Sparkles />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
    </Canvas>
  );
}
