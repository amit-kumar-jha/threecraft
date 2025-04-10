export const codeMap: Record<string, string> = {
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
  orbitPulse: `
    "use client";
    
    import { Canvas, useFrame } from "@react-three/fiber";
    import { OrbitControls, Stars } from "@react-three/drei";
    import { useRef } from "react";
    import * as THREE from "three";
    
    const OrbitingSpheres = () => {
      const groupRef = useRef<THREE.Group>(null);
      const timeRef = useRef(0);
    
      useFrame((_, delta) => {
        timeRef.current += delta;
    
        if (groupRef.current) {
          const group = groupRef.current;
          const numSpheres = group.children.length;
    
          for (let i = 0; i < numSpheres; i++) {
            const sphere = group.children[i] as THREE.Mesh;
            const angle = (i / numSpheres) * Math.PI * 2 + timeRef.current * 0.6;
            const baseRadius = 2.2;
            const pulsate = Math.sin(timeRef.current * 2 + i) * 0.3;
            const radius = baseRadius + pulsate;
    
            sphere.position.x = Math.cos(angle) * radius;
            sphere.position.y = Math.sin(angle * 0.8) * pulsate;
            sphere.position.z = Math.sin(angle) * radius;
    
            // Pulsing effect
            const scale = 1 + Math.sin(timeRef.current * 3 + i) * 0.2;
            sphere.scale.set(scale, scale, scale);
          }
        }
      });
    
      return (
        <group ref={groupRef}>
          {[...Array(12)].map((_, i) => (
            <mesh key={i}>
              <sphereGeometry args={[0.12, 32, 32]} />
              <meshStandardMaterial
                color={hsl("$i * 30}", 100%, 60%)}
                emissive={hsl($i * 30}, 100%, 40%)}
                emissiveIntensity={1}
              />
            </mesh>
          ))}
        </group>
      );
    };
    
    const CoreSphere = () => {
      const meshRef = useRef<THREE.Mesh>(null);
    
      useFrame((_, delta) => {
        if (meshRef.current) {
          meshRef.current.rotation.y += delta * 0.5;
        }
      });
    
      return (
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.35, 64, 64]} />
          <meshStandardMaterial
            color="#f1c40f"
            emissive="#ff8c00"
            emissiveIntensity={2}
            roughness={0.1}
            metalness={0.5}
          />
        </mesh>
      );
    };
    
    const OrbitPulse = () => {
      const cameraGroup = useRef<THREE.Group>(null);
    
      return (
        <div className="w-full h-130 flex items-center justify-center bg-black">
          <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
            <group ref={cameraGroup}>
              <ambientLight intensity={1.2} />
              <pointLight position={[5, 5, 5]} intensity={1.5} />
              <Stars
                radius={100}
                depth={50}
                count={1000}
                factor={4}
                fade
                speed={1}
              />
              <CoreSphere />
              <OrbitingSpheres />
              <OrbitControls enableZoom={false} enablePan={false} />
            </group>
          </Canvas>
        </div>
      );
    };
    
    export default OrbitPulse;
    `,
  cardVerse: `"use client";

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
`,
};
