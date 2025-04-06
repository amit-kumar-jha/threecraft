"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function DeskSetup() {
  const monitorRef = useRef<THREE.Mesh>(null!);
  const [typedText, setTypedText] = useState("");
  const codeLines = `const dev = true;
function build() {
  console.log("Building 3D Workspace");
}
build();`;

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (typedText.length < codeLines.length) {
      const nextCharIndex = Math.floor(time * 10);
      setTypedText(codeLines.slice(0, nextCharIndex));
    }
    monitorRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
  });

  return (
    <Float floatIntensity={1} rotationIntensity={0.4}>
      {/* Desk */}
      <mesh position={[0, -1.1, 0]}>
        <boxGeometry args={[4, 0.2, 2]} />
        <meshStandardMaterial color="grey" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Monitor */}
      <mesh ref={monitorRef} position={[0, 0, -0.8]}>
        <boxGeometry args={[2, 1.2, 0.1]} />
        <meshStandardMaterial color="white" />
        <Html
          transform
          position={[0, 0, 0.06]}
          occlude
          style={{
            width: "80px",
            height: "50px",
            background: "#0f0",
            color: "#000",
            fontFamily: "monospace",
            padding: "4px",
            fontSize: "3px",
            lineHeight: "1.4",
            overflow: "hidden",
          }}
        >
          <pre>{typedText}_</pre>
        </Html>
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, -0.9, 0.4]}>
        <boxGeometry args={[1.8, 0.1, 0.6]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </Float>
  );
}

export default function DeveloperWorkspaceScene() {
  return (
    <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }}>
      <ambientLight intensity={1.5} />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <DeskSetup />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
    </Canvas>
  );
}
