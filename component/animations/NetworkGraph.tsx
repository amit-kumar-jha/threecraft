// components/NetworkGraph.tsx
"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

type NodeType = {
  id: number;
  position: [number, number, number];
  connections: number[];
};

const generateGraph = (count = 15): NodeType[] => {
  const nodes: NodeType[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      id: i,
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
      ],
      connections: [],
    });
  }

  // randomly connect nodes
  nodes.forEach((node) => {
    const numConnections = Math.floor(Math.random() * 3) + 1;
    node.connections = Array.from({ length: numConnections }, () =>
      Math.floor(Math.random() * count)
    ).filter((id) => id !== node.id);
  });

  return nodes;
};

const Node = ({ position }: { position: [number, number, number] }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const pulse = useRef(0);

  useFrame(({}) => {
    pulse.current += 0.05;
    mesh.current.scale.setScalar(1 + Math.sin(pulse.current) * 0.1);
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial
        emissive={"#00ffff"}
        emissiveIntensity={1}
        color="#222"
      />
    </mesh>
  );
};

const Network = () => {
  const nodes = useMemo(() => generateGraph(20), []);

  return (
    <>
      {nodes.map((node) => (
        <Node key={node.id} position={node.position} />
      ))}
      {nodes.map((node) =>
        node.connections.map((targetId, i) => {
          const targetNode = nodes.find((n) => n.id === targetId);
          if (!targetNode) return null;
          return (
            <Line
              key={`${node.id}-${targetId}-${i}`}
              points={[node.position, targetNode.position]}
              color="#ffffff"
              lineWidth={1}
              dashed={false}
            />
          );
        })
      )}
    </>
  );
};

const NetworkGraph = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls autoRotate enableZoom={false} />
        <Network />
      </Canvas>
    </div>
  );
};

export default NetworkGraph;
