"use client";

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
