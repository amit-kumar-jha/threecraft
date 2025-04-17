"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useRef, useState, useMemo, JSX } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

function NavNode({
  position,
  label,
  onClick,
  isActive,
}: {
  position: [number, number, number];
  label: string;
  onClick: () => void;
  isActive: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      gsap.to(meshRef.current.scale, {
        x: hovered || isActive ? 1.3 : 1,
        y: hovered || isActive ? 1.3 : 1,
        z: hovered || isActive ? 1.3 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial
        color={hovered || isActive ? "#00ffff" : "#ffffff"}
        emissive={hovered || isActive ? "#00ffff" : "#000000"}
        emissiveIntensity={1}
        metalness={0.5}
        roughness={0.2}
      />
      <Html distanceFactor={10}>
        <div
          style={{
            color: hovered || isActive ? "#00ffff" : "#ffffff",
            fontWeight: "bold",
            fontSize: "14px",
            textAlign: "center",
            transform: "translateY(-30px)",
            textShadow: "0 0 6px rgba(0,255,255,0.8)",
            pointerEvents: "none",
          }}
        >
          {label}
        </div>
      </Html>
    </mesh>
  );
}

const menuItems = [
  { label: "Home", position: [-2.5, 2.6, 0] },
  { label: "About", position: [-1, 4.1, 0] },
  { label: "Projects", position: [1, 4.1, 0] },
  { label: "Blog", position: [2.5, 2.6, 0] },
  { label: "Contact", position: [0, 0.8, 0] },
];

const sectionContent: Record<string, JSX.Element> = {
  Home: (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white">🏠 Welcome Home</h1>
      <p className="text-gray-300 mt-2">
        This is your futuristic starting point.
      </p>
    </div>
  ),
  About: (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white">👨‍🚀 About Me</h1>
      <p className="text-gray-300 mt-2">
        Frontend dev with a passion for 3D and animation.
      </p>
    </div>
  ),
  Projects: (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white">🚀 Projects</h1>
      <p className="text-gray-300 mt-2">
        Exploring the galaxy of code and creativity.
      </p>
    </div>
  ),
  Blog: (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white">✍️ Blog</h1>
      <p className="text-gray-300 mt-2">
        Thoughts, tutorials, and experiments.
      </p>
    </div>
  ),
  Contact: (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white">📬 Contact Me</h1>
      <p className="text-gray-300 mt-2">
        Let’s build something amazing together.
      </p>
    </div>
  ),
};

const bgColors: Record<string, string> = {
  Home: "#0a0f1f",
  About: "#1c1f4a",
  Projects: "#16283c",
  Blog: "#0d263b",
  Contact: "#1a1a1a",
};

export default function Interactive3DNav() {
  const [activeItem, setActiveItem] = useState("Home");
  const bgColor = useMemo(
    () => bgColors[activeItem] || "#000000",
    [activeItem]
  );

  return (
    <motion.div
      className="w-full h-150 relative overflow-hidden transition-colors duration-1000"
      animate={{ backgroundColor: bgColor }}
    >
      {/* Section Content */}
      <div className="absolute top-50 left-0 z-10 w-full h-full flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="px-6"
          >
            {sectionContent[activeItem]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 8], fov: 70 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <group>
          {menuItems.map((item) => (
            <NavNode
              key={item.label}
              position={item.position as [number, number, number]}
              label={item.label}
              onClick={() => setActiveItem(item.label)}
              isActive={activeItem === item.label}
            />
          ))}
        </group>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </motion.div>
  );
}
