"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Float, Stars } from "@react-three/drei";
// import { EffectComposer, Bloom, SSAO } from "@react-three/postprocessing";
import * as THREE from "three";
import { animated, useSpring } from "@react-spring/three";
// import { useControls } from "leva";

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

  const { rotation } = useSpring({
    rotation: flipped ? Math.PI : 0,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const { scale } = useSpring({
    scale: hovered ? 1.1 : 1,
    config: { mass: 1, tension: 170, friction: 12 },
  });

  const handleClick = () => {
    setFlipped(!flipped);
    if (link && !flipped) window.open(link, "_blank");
  };

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y =
        Math.sin(Date.now() * 0.001 + position[0]) * 0.2 + position[1];
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <animated.mesh
        ref={meshRef}
        position={position}
        scale={scale}
        rotation-y={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        cursor="pointer"
      >
        <boxGeometry args={[1, 1, 0.2]} />
        <meshPhysicalMaterial
          //   color={hovered ? "#2ecc71" : "#3498db"}
          roughness={0}
          transmission={1}
          thickness={0.4}
          clearcoat={1}
          metalness={0.2}
        />

        {/* Glowing edges */}
        <mesh>
          <boxGeometry args={[2.55, 2.55, 0.41]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe
            opacity={0.3}
            transparent
          />
        </mesh>

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
      </animated.mesh>
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
      {/* <PostEffects /> */}
      <FloatingCard
        position={[-3, 0, 0]}
        title="Portfolio"
        description="Click to see more"
        backText="React + Three.js + Fiber"
        //   link="https://portfolio.com"
      />
      <FloatingCard
        position={[0, 0, 0]}
        title="Resume Builder"
        description="AI + PDF Export"
        backText="Next.js + GPT + Tailwind"
        //   link="https://resumeapp.com"
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
