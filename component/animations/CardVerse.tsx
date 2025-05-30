"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

interface CardProps {
  position: [number, number, number];
  title: string;
  description: string;
  backText: string;
  link?: string;
}

const FloatingCard: React.FC<CardProps> = ({
  position,
  title,
  description,
  backText,
  link,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Handle flipping with GSAP
  const handleClick = () => {
    setFlipped((prev) => !prev);
    gsap.to(meshRef.current.rotation, {
      y: flipped ? 0 : Math.PI,
      duration: 1,
      ease: "power2.inOut",
    });

    if (link && !flipped) window.open(link, "_blank");
  };

  // Handle hover scaling with GSAP
  useEffect(() => {
    if (!meshRef.current) return;

    gsap.to(meshRef.current.scale, {
      x: hovered ? 1.1 : 1,
      y: hovered ? 1.1 : 1,
      z: hovered ? 1.1 : 1,
      duration: 0.4,
      ease: "power1.out",
    });
  }, [hovered]);

  // Floating animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y =
        Math.sin(Date.now() * 0.001 + position[0]) * 0.2 + position[1];
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        // cursor="pointer"
      >
        <boxGeometry args={[1, 1, 0.2]} />
        <meshPhysicalMaterial
          roughness={0}
          transmission={1}
          thickness={0.4}
          clearcoat={1}
          metalness={0.2}
        />

        {/* Glowing wireframe box */}
        <mesh>
          <boxGeometry args={[2.55, 2.55, 0.41]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe
            opacity={0.3}
            transparent
          />
        </mesh>

        {/* HTML overlay */}
        <Html center>
          {!flipped ? (
            <div
              style={{
                color: "white",
                fontFamily: "sans-serif",
                textAlign: "center",
                width: "120px",
                pointerEvents: "none",
              }}
            >
              <h2 style={{ margin: "0.2em 0", fontSize: "0.85rem" }}>
                {title}
              </h2>
              <p style={{ fontSize: "0.48rem" }}>{description}</p>
            </div>
          ) : (
            <div
              style={{
                color: "white",
                fontFamily: "monospace",
                textAlign: "center",
                width: "100px",
                pointerEvents: "none",
              }}
            >
              <p style={{ fontSize: "0.5rem" }}>{backText}</p>
            </div>
          )}
        </Html>
      </mesh>
    </Float>
  );
};

const CardVerse = () => {
  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
      <color attach="background" args={["#000"]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 5, 5]} intensity={1.2} />
      <OrbitControls enableZoom={false} />
      <Stars radius={100} depth={50} count={3000} factor={3} fade />

      <FloatingCard
        position={[-3, 0, 0]}
        title="Portfolio"
        description="Click to see more"
        backText="React + Three.js + Fiber"
      />
      <FloatingCard
        position={[0, 0, 0]}
        title="Resume Builder"
        description="AI + PDF Export"
        backText="Next.js + GPT + Tailwind"
      />
      <FloatingCard
        position={[3, 0, 0]}
        title="Dashboard"
        description="Admin Tools"
        backText="Charts + API + UX"
      />
    </Canvas>
  );
};

export default CardVerse;
