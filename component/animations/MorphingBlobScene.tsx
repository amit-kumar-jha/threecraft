"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const vertexShader = `
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
`;

const fragmentShader = `
  varying vec2 vUv;

  void main() {
    vec3 color = vec3(0.3 + 0.7 * vUv.x, 0.2 + 0.8 * vUv.y, 1.0);
    gl_FragColor = vec4(color, 1.0);
  }
`;

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
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Blob />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
