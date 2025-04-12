"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useMemo } from "react";

const Blade = ({ radius, index }: { radius: number; index: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = (index / 8) * Math.PI * 2 + t * 0.4;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    if (ref.current) {
      ref.current.position.set(x, 0, z);
      ref.current.rotation.y = angle;
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.6, 0.2]} />
      <meshStandardMaterial
        color={"#00ffff"}
        emissive={"#00ffff"}
        emissiveIntensity={1.5}
        metalness={0.3}
        roughness={0.1}
      />
    </mesh>
  );
};

const Core = () => {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scale = 1 + Math.sin(t * 3) * 0.1;
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.01;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={coreRef}>
      <sphereGeometry args={[0.3, 34, 64]} />
      <meshStandardMaterial
        color={"#f0f0f0"}
        emissive={"#00f0ff"}
        emissiveIntensity={2}
        roughness={0.2}
        metalness={0.5}
      />
    </mesh>
  );
};

const Particles = () => {
  const ref = useRef<THREE.Points>(null);
  useThree(); // Removed unused 'size' variable

  const particleCount = 400;

  const positions = useMemo(() => {
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 6;
    }
    return posArray;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.2) * 0.5;
      ref.current.rotation.x = Math.cos(t * 0.2) * 0.5;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#00ffff"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
};

const HoloScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += hovered ? 0.005 : 0.002;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Particles />
      <Core />
      {[...Array(8)].map((_, i) => (
        <Blade key={i} radius={1.2} index={i} />
      ))}
    </group>
  );
};

const HoloCore = () => {
  return (
    <Canvas camera={{ position: [0, 1, 4], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 3, 2]} intensity={1.2} />
      <Sparkles count={100} scale={[4, 4, 4]} size={2} speed={1.5} />
      <HoloScene />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate />
    </Canvas>
  );
};

export default HoloCore;
