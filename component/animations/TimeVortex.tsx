"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import { motion } from "framer-motion";

const NUM_PARTICLES = 200;

const getSpiralPosition = (i: number, total: number) => {
  const angle = i * 0.2;
  const radius = i * 0.02;
  return new THREE.Vector3(
    Math.cos(angle) * radius,
    (i - total / 2) * 0.02,
    Math.sin(angle) * radius
  );
};

const Shard = ({
  position,
  index,
}: {
  position: THREE.Vector3;
  index: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() + index;
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.005;
      ref.current.position.x += Math.sin(t * 0.1) * 0.001;
      ref.current.position.y += Math.cos(t * 0.1) * 0.001;
    }
  });

  return (
    <mesh position={position} ref={ref}>
      <tetrahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

const VortexCore = () => {
  const ref = useRef<THREE.Mesh>(null);
  //   const distortion = useRef(0);

  useFrame(({ clock }) => {
    if (ref.current) {
      const scale = 0.6 + Math.sin(clock.getElapsedTime() * 3) * 0.05;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial
        color="#00f0ff"
        emissive="#00f0ff"
        emissiveIntensity={3}
      />
    </mesh>
  );
};

const CameraParallax = () => {
  const { camera } = useThree();
  useFrame(({ mouse }) => {
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

const TimeVortexScene = () => {
  const particles = useMemo(() => {
    return Array.from({ length: NUM_PARTICLES }, (_, i) =>
      getSpiralPosition(i, NUM_PARTICLES)
    );
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 3, 4]} intensity={1.5} />
      <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
      <VortexCore />
      {particles.map((pos, i) => (
        <Shard key={i} position={pos} index={i} />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </group>
  );
};

const TimeVortex = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className=" h-[600px]"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <CameraParallax />
        <TimeVortexScene />
      </Canvas>
    </motion.div>
  );
};

export default TimeVortex;
