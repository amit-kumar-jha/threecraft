"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const planets = [
  { size: 0.2, color: "#4fc3f7", distance: 1.5, speed: 1.2 },
  { size: 0.3, color: "#81c784", distance: 2.3, speed: 0.9 },
  { size: 0.25, color: "#ffb74d", distance: 3.1, speed: 0.7 },
  { size: 0.4, color: "#ba68c8", distance: 4.0, speed: 0.5 },
];

interface PlanetProps {
  size: number;
  color: string;
  distance: number;
  speed: number;
  index: number;
}

const Planet = ({ size, color, distance, speed, index }: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    const x = Math.cos(t + index) * distance;
    const z = Math.sin(t + index) * distance;

    if (meshRef.current) {
      meshRef.current.position.set(x, 0, z);
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.01, distance + 0.01, 64]} />
        <meshBasicMaterial
          color="#888"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

const Sun = () => {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[0.6, 64, 64]} />
      <meshStandardMaterial
        color="#FFD700"
        emissive="#FFA500"
        emissiveIntensity={2}
        roughness={0.1}
        metalness={0.4}
      />
    </mesh>
  );
};

const ResponsiveCameraControls = () => {
  const { size } = useThree();
  const isMobile = size.width < 768;

  return <OrbitControls enableZoom={!isMobile} enablePan={false} />;
};

const SolarSystem = () => {
  return (
    <div className="w-full h-[100dvh] sm:h-screen bg-black">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2} />
        <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
        <Sun />
        {planets.map((planet, i) => (
          <Planet key={i} {...planet} index={i} />
        ))}
        <ResponsiveCameraControls />
      </Canvas>
    </div>
  );
};

export default SolarSystem;
