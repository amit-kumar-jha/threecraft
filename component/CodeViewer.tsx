"use client";

import { usePathname } from "next/navigation";
// import { useState } from "react";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

const codeMap: Record<string, string> = {
  cube: `
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

const RotatingCube = () => (
  <mesh rotation={[0.4, 0.2, 0]}>
    <boxGeometry args={[2, 2, 2]} />
    <meshStandardMaterial color="skyblue" />
  </mesh>
);

export default function Cube() {
  return (
    <Canvas camera={{ position: [4, 4, 4] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <RotatingCube />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
`,
  galaxy: `
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Particles() {
  const mesh = useRef<THREE.Points>(null!);
  const count = 1000;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  useFrame(() => {
    mesh.current.rotation.y += 0.001;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="white" />
    </points>
  );
}

export default function Galaxy() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight />
      <Particles />
    </Canvas>
  );
}
`,
  waves: `
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function WavePlane() {
  const mesh = useRef<THREE.Mesh>(null!);
  const geometryRef = useRef<THREE.PlaneGeometry>(null!);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const posAttr = geometryRef.current.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = Math.sin(x * 2 + time) * 0.3 + Math.cos(y * 2 + time) * 0.3;
      posAttr.setZ(i, z);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry ref={geometryRef} args={[10, 10, 64, 64]} />
      <meshStandardMaterial color="dodgerblue" wireframe />
    </mesh>
  );
}

export default function Waves() {
  return (
    <Canvas camera={{ position: [0, 3, 5], fov: 50 }}>
      <ambientLight />
      <WavePlane />
    </Canvas>
  );
}

`,
  sphere: `
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function BouncingSphere() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref.current.position.y = Math.abs(Math.sin(clock.getElapsedTime() * 2)) * 2;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default function Sphere() {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight />
      <pointLight position={[5, 5, 5]} />
      <BouncingSphere />
    </Canvas>
  );
}

`,
  morphingBlobScene: `
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const vertexShader = 
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vUv = uv;

    vec3 pos = position;
    float freq = 2.0;
    float amp = 0.2;

    pos.x += sin(pos.y * freq + uTime) * amp;
    pos.y += sin(pos.z * freq + uTime) * amp;
    pos.z += sin(pos.x * freq + uTime) * amp;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
;

const fragmentShader = 
  varying vec2 vUv;

  void main() {
    vec3 color = vec3(0.3 + 0.7 * vUv.x, 0.2 + 0.8 * vUv.y, 1.0);
    gl_FragColor = vec4(color, 1.0);
  }
;

const Blob = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useRef({
    uTime: { value: 0 },
  });

  useFrame((state) => {
    uniforms.current.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 40]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        wireframe={false}
      />
    </mesh>
  );
};

export default function MorphingBlobScene() {
  return (
    <div className="h-[500px] w-full bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-xl">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Blob />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

`,
  developerWorkspace: `
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function DeskSetup() {
  const monitorRef = useRef<THREE.Mesh>(null!);
  const [typedText, setTypedText] = useState("");
  const codeLines = const dev = true;
function build() {
  console.log("Building 3D Workspace");
}
build();;

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
`,
  mysticOrbitals: `import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  PresentationControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

const Scene: React.FC = () => {
  const cubeRef = useRef<THREE.Mesh>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);
  const torusRef = useRef<THREE.Mesh>(null!);
  const coneRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    cubeRef.current.rotation.y += 0.01;
    cubeRef.current.rotation.x += 0.005;

    sphereRef.current.rotation.y += 0.01;
    torusRef.current.rotation.z += 0.015;
    coneRef.current.rotation.x += 0.008;
    coneRef.current.rotation.y += 0.01;
  });

  return (
    <group position={[0, 1.5, 0]}>
      {/* Smaller Cube */}
      <Float floatIntensity={1.2} rotationIntensity={0.5}>
        <mesh ref={cubeRef} position={[-3, 0, 0]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#8e44ad" />
        </mesh>
      </Float>

      {/* Smaller Sphere */}
      <Float floatIntensity={1.4} rotationIntensity={0.6}>
        <mesh ref={sphereRef} position={[-1, 0, 0]} castShadow>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color="#27ae60" />
        </mesh>
      </Float>

      {/* Smaller Torus */}
      <Float floatIntensity={1.6} rotationIntensity={0.7}>
        <mesh ref={torusRef} position={[1.2, 0, 0]} castShadow>
          <torusGeometry args={[0.5, 0.2, 16, 100]} />
          <meshStandardMaterial color="#f39c12" />
        </mesh>
      </Float>

      {/* Smaller Cone */}
      <Float floatIntensity={1.5} rotationIntensity={0.6}>
        <mesh ref={coneRef} position={[3, 0, 0]} castShadow>
          <coneGeometry args={[0.6, 1.2, 32]} />
          <meshStandardMaterial color="#3498db" />
        </mesh>
      </Float>

      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const MysticOrbitals: React.FC = () => {
  return (
    <div className="w-full h-screen -mt-12">
      <Canvas shadows camera={{ position: [0, 4, 6], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={1.2}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={20}
        />

        <PresentationControls
          global
          damping={0.5}
          snap={false}
          rotation={[0, 0.3, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-1, 1]}
        >
          <Scene />
        </PresentationControls>

        <ContactShadows
          position={[0, -1.9, 0]}
          opacity={0.4}
          scale={15}
          blur={1.5}
          far={4}
        />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default MysticOrbitals;
`,
};

export const CodeViewer = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "";
  const code = codeMap[slug] || "// No code available for this animation";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch {
      toast.error("Failed to copy!");
    }
  };

  return (
    <div className="relative h-full max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900 rounded-lg bg-zinc-800 text-white p-4 text-sm whitespace-pre-wrap">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-zinc-300 hover:text-white bg-zinc-700 hover:bg-zinc-600 rounded-md p-2 transition"
        aria-label="Copy code"
      >
        <FiCopy />
      </button>

      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};
