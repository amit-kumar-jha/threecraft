"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import { OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function WebRing({ radius = 3, points = 20, color = "#88ccff", delay = 0 }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.fromTo(
        groupRef.current.rotation,
        { y: -Math.PI },
        {
          y: 0,
          duration: 3,
          delay,
          ease: "power2.out",
        }
      );
    }
  }, [delay]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(points)].map((_, i) => {
        const angle = (i / points) * Math.PI * 2;
        const r = radius + Math.sin(i) * 0.2;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;

        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([0, 0, 0, x, y, 0]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color={color} linewidth={1} />
          </line>
        );
      })}
    </group>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1500;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.02}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function EnergyCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const pulse = Math.sin(clock.elapsedTime * 3) * 0.25 + 1;
      meshRef.current.scale.set(pulse, pulse, pulse);
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.3, 64, 64]} />
      <meshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={2.5}
        roughness={0.1}
        metalness={1}
      />
    </mesh>
  );
}

function ThreadConnections() {
  const groupRef = useRef<THREE.Group>(null);
  const threadCount = 12;
  const radius = 2.5;

  const threads = useMemo(() => {
    return [...Array(threadCount)].map((_, i) => {
      const angle = (i / threadCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return new Float32Array([0, 0, 0, x, y, 0]);
    });
  }, []);

  return (
    <group ref={groupRef}>
      {threads.map((line, idx) => (
        <line key={idx}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[line, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#77eeff" />
        </line>
      ))}
    </group>
  );
}

export default function DreamCatcherNebula() {
  return (
    <div className="w-full h-[600px] bg-black">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={1.4} />
        <EnergyCore />
        <WebRing radius={2.5} points={20} color="#44f5ff" delay={0.1} />
        <WebRing radius={3} points={24} color="#4466ff" delay={0.3} />
        <ThreadConnections />
        <FloatingParticles />
        <Sparkles count={100} speed={0.5} size={1} color="#88faff" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
