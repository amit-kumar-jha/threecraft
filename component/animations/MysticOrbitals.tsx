import React, { useRef } from "react";
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
    <div className="w-full h-180 -mt-12">
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
