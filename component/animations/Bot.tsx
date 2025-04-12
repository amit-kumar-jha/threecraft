"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import { motion } from "framer-motion";

// Floating greeting text
const GreetingText = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <Html center position={[1, 3, 0]}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
        className="text-white text-center text-base font-medium bg-black bg-opacity-50 px-3 py-1 rounded-lg"
      >
        Hello, Human 👋
      </motion.div>
    </Html>
  );
};

// Typing terminal text on chest
const TypingText = () => {
  const [index, setIndex] = useState(0);
  const text = "Accessing Data Stream...";

  useFrame(({ clock }) => {
    const time = Math.floor(clock.elapsedTime * 5);
    setIndex(time % (text.length + 1));
  });

  return (
    <Html center position={[0, 1, 0.3]}>
      <div className="text-lime-400 text-xs font-mono bg-black bg-opacity-60 px-2 py-1 rounded">
        {text.substring(0, index)}
        <span className="blinking-cursor">|</span>
      </div>
    </Html>
  );
};

// Core reactor
const CoreReactor = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const scale = 1 + Math.sin(clock.elapsedTime * 3) * 0.1;
    if (ref.current) {
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={ref} position={[0, 1.2, 0]}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial emissive="#00ffff" color="#00ffff" />
    </mesh>
  );
};

// Head (circular & realistic)
const CircularHead = () => (
  <mesh position={[0, 2.3, 0]}>
    <sphereGeometry args={[0.45, 32, 32]} />
    <meshStandardMaterial metalness={1} roughness={0.4} color="#555" />
    {/* Eyes */}
    <mesh position={[-0.15, 0.05, 0.42]}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial emissive="cyan" color="aqua" />
    </mesh>
    <mesh position={[0.15, 0.05, 0.42]}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial emissive="cyan" color="aqua" />
    </mesh>
  </mesh>
);

// Segmented Arms with movement
const SegmentedArms = () => {
  const leftRef = useRef<THREE.Group>(null);
  const rightRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (leftRef.current && rightRef.current) {
      leftRef.current.rotation.z = Math.sin(t) * 0.2;
      rightRef.current.rotation.z = -Math.sin(t) * 0.2;
    }
  });

  return (
    <>
      <group ref={leftRef} position={[-0.8, 1.5, 0]}>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 1, 16]} />
          <meshStandardMaterial metalness={0.8} roughness={0.3} color="#888" />
        </mesh>
        <mesh position={[0, -1.1, 0]}>
          <boxGeometry args={[0.15, 0.2, 0.15]} />
          <meshStandardMaterial color="#aaa" />
        </mesh>
      </group>
      <group ref={rightRef} position={[0.8, 1.5, 0]}>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 1, 16]} />
          <meshStandardMaterial metalness={0.8} roughness={0.3} color="#888" />
        </mesh>
        <mesh position={[0, -1.1, 0]}>
          <boxGeometry args={[0.15, 0.2, 0.15]} />
          <meshStandardMaterial color="#aaa" />
        </mesh>
      </group>
    </>
  );
};

// Holographic Rings
const HoloRings = () => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotate at a controlled speed (e.g., 0.5 radians/sec)
      ref.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={ref}>
      {[1.2, 1.5].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.01, r + 0.01, 64]} />
          <meshBasicMaterial
            color="black"
            side={THREE.DoubleSide}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// Halo Light
const Halo = () => (
  <mesh position={[0, 2.6, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
    <ringGeometry args={[0.5, 0.6, 32]} />
    <meshBasicMaterial
      color="#00ffff"
      side={THREE.DoubleSide}
      transparent
      opacity={0.4}
    />
  </mesh>
);

// Mechanical Pistons on back
const Pistons = () => {
  return (
    <>
      <mesh position={[-0.4, 1.6, -0.3]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        <meshStandardMaterial color="#666" metalness={0.9} />
      </mesh>
      <mesh position={[0.4, 1.6, -0.3]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        <meshStandardMaterial color="#666" metalness={0.9} />
      </mesh>
    </>
  );
};

// Main Scene
const FuturisticBot = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue via-gray-400 to-gray-450">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <OrbitControls enablePan={false} enableZoom={false} />
        <group
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <CircularHead />
          <SegmentedArms />
          <CoreReactor />
          <HoloRings />
          <Pistons />
          <Halo />
          <TypingText />
          <GreetingText isHovered={hovered} />
        </group>
      </Canvas>
    </div>
  );
};

export default FuturisticBot;
