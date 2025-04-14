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
  bot: `"use client";

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
`,
  holoCore: `
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
`,
  neuralNetworkPulse: `"use client";
  
  import { Canvas, useFrame } from "@react-three/fiber";
  import { OrbitControls, Stars, Float, Environment } from "@react-three/drei";
  import * as THREE from "three";
  import { useRef, useMemo, useState } from "react";
  
  const NUM_NEURONS = 60;
  const CONNECTION_RADIUS = 2.8;
  
  const getRandomPosition = () => {
    return new THREE.Vector3(
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6
    );
  };
  
  const Neuron = ({
    position,
    pulse,
  }: {
    position: THREE.Vector3;
    pulse: number;
  }) => {
    const ref = useRef<THREE.Mesh>(null);
  
    useFrame(() => {
      if (ref.current) {
        const scale = 0.15 + Math.sin(pulse + performance.now() * 0.002) * 0.05;
        ref.current.scale.setScalar(scale);
      }
    });
  
    return (
      <Float floatIntensity={1} speed={2}>
        <mesh position={position} ref={ref}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial
            emissive="#00ffff"
            emissiveIntensity={1.4}
            color="#00ffff"
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>
      </Float>
    );
  };
  
  const Connections = ({
    positions,
    scatter,
  }: {
    positions: THREE.Vector3[];
    scatter: boolean;
  }) => {
    const ref = useRef<THREE.LineSegments>(null);
    const geometry = useMemo(() => new THREE.BufferGeometry(), []);
  
    const { lineVertices } = useMemo(() => {
      const verts: number[] = [];
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          if (positions[i].distanceTo(positions[j]) < CONNECTION_RADIUS) {
            verts.push(...positions[i].toArray());
            verts.push(...positions[j].toArray());
          }
        }
      }
      return {
        lineVertices: new Float32Array(verts),
      };
    }, [positions]);
  
    useFrame(() => {
      if (ref.current) {
        const verts = ref.current.geometry.attributes.position
          .array as Float32Array;
        for (let i = 0; i < verts.length; i++) {
          verts[i] += (Math.random() - 0.5) * (scatter ? 0.008 : 0.002);
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
      }
    });
  
    geometry.setAttribute("position", new THREE.BufferAttribute(lineVertices, 3));
  
    return (
      <lineSegments ref={ref} geometry={geometry}>
        <lineBasicMaterial
          color={"#00ffff"}
          transparent
          opacity={0.5}
          linewidth={1}
        />
      </lineSegments>
    );
  };
  
  const BrainCore = () => {
    const ref = useRef<THREE.Mesh>(null);
  
    useFrame(({ clock }) => {
      const t = clock.getElapsedTime();
      if (ref.current) {
        ref.current.rotation.y += 0.003;
        const s = 0.3 + Math.sin(t * 2) * 0.02;
        ref.current.scale.setScalar(s);
      }
    });
  
    return (
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.3, 2]} />
        <meshStandardMaterial
          color="#00ffee"
          emissive="#00ffee"
          emissiveIntensity={2.5}
          metalness={1}
          roughness={0.1}
        />
      </mesh>
    );
  };
  
  const NetworkScene = () => {
    const [scatter, setScatter] = useState(false);
  
    const neuronData = useMemo(() => {
      return Array.from({ length: NUM_NEURONS }, () => ({
        position: getRandomPosition(),
        pulse: Math.random() * 10,
      }));
    }, []);
  
    return (
      <>
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 4]} intensity={1.5} />
        <Environment preset="sunset" />
        <Stars radius={30} depth={60} count={1000} factor={2} fade speed={1} />
        <BrainCore />
        {neuronData.map((neuron, i) => (
          <Neuron key={i} position={neuron.position} pulse={neuron.pulse} />
        ))}
        <Connections
          positions={neuronData.map((n) => n.position)}
          scatter={scatter}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.1}
          onStart={() => setScatter(true)}
          onEnd={() => setScatter(false)}
        />
      </>
    );
  };
  
  const NeuralNetworkPulse = () => {
    return (
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} shadows>
        <NetworkScene />
      </Canvas>
    );
  };
  
  export default NeuralNetworkPulse; 
`,
  timeVortex: `
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
`,
};
