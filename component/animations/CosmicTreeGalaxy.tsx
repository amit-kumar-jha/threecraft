"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function Branch({
  position,
  rotation,
  scale,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current.rotation, {
        y: "+=0.5",
        x: "+=0.2",
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });
    }
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      const emissiveIntensity = Math.sin(time * 4) * 0.5 + 1;
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        hovered ? 2 : emissiveIntensity;
    }
  });

  return (
    <mesh
      ref={ref}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <cylinderGeometry args={[0.02, 0.05, 1, 8]} />
      <meshStandardMaterial
        color="#00ffcc"
        emissive="#00ffaa"
        emissiveIntensity={1}
        roughness={0.2}
        metalness={0.7}
      />
    </mesh>
  );
}

function CosmicTreeModel() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.fromTo(
        groupRef.current.scale,
        { x: 0, y: 0, z: 0 },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.5,
          ease: "back.out(1.7)",
          delay: 0.2,
        }
      );
    }
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001; // slow rotation
    }
  });

  const branches = [];

  const layers = 12;
  const perLayer = 10;

  for (let i = 0; i < layers; i++) {
    for (let j = 0; j < perLayer; j++) {
      const angle = (Math.PI * 2 * j) / perLayer + i * 0.1;
      const radius = 0.5 + i * 0.05;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = i * 0.4;

      branches.push(
        <Branch
          key={`branch-${i}-${j}`}
          position={[x, y, z]}
          rotation={[angle, angle * 0.3, angle * 0.2]}
          scale={1 - i * 0.05}
        />
      );
    }
  }

  // 👑 Micro-branches at top
  for (let i = 0; i < 20; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.3 + Math.random() * 0.2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = layers * 0.4 + Math.random() * 0.5;

    branches.push(
      <Branch
        key={`crown-${i}`}
        position={[x, y, z]}
        rotation={[
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ]}
        scale={0.2 + Math.random() * 0.3}
      />
    );
  }

  return (
    <group ref={groupRef} position={[0, -2, 0]} scale={[1, 1, 1]}>
      {/* Trunk */}
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 3, 12]} />
        <meshStandardMaterial
          color="#00ffaa"
          emissive="#008888"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Branches */}
      {branches}
    </group>
  );
}

function GalaxyParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 800;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0005;
      ref.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#99ffff"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.4}
      />
    </points>
  );
}

export default function CosmicTreeGalaxy() {
  return (
    <div className="w-full h-[600px] bg-black">
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 4, 5]} intensity={1.2} />
        <GalaxyParticles />
        <CosmicTreeModel />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
