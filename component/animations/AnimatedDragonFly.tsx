"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useAnimations,
  useGLTF,
  Stars,
  Sky,
  //   Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import Loader from "../layout/Loader";

const DragonFly = () => {
  const group = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF("/dragon/scene.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions["Dragon Flying Idle"]) {
      actions["Dragon Flying Idle"].play();
    }
  }, [actions]);

  return (
    <>
      {/* 🐉 Dragon Model */}
      <group ref={group} position={[0, 0, 0]} dispose={null}>
        <primitive object={scene} scale={2} rotation={[0, Math.PI, 0]} />
      </group>
    </>
  );
};

const Dragon = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        fov: 85,
        near: 0.9,
        far: 1000,
        position: [50, 20, 20],
      }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<Loader />}>
        {/* 🌅 Realistic sky gradient */}
        <Sky
          distance={450000}
          sunPosition={[5, 1, -5]}
          inclination={0.48}
          azimuth={0.24}
        />

        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <OrbitControls enableZoom enablePan={false} />
        <Stars radius={200} depth={50} count={1000} factor={4} fade />

        <DragonFly />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default Dragon;
