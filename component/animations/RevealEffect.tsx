"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Power1, TweenMax } from "gsap";
import { motion } from "framer-motion";

const RevealEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const objectsRef = useRef<THREE.Mesh[]>([]);
  const geometryRef = useRef<THREE.BoxGeometry | null>(null);
  const conf = useRef({
    color: 0xffffff,
    objectWidth: 4,
    objectThickness: 3,
    ambientColor: 0xffffff,
    light1Color: 0xffffff,
    shadow: false,
    perspective: 75,
    cameraZ: 75,
  });

  const TMath = THREE.MathUtils;
  let animationFrameId: number;

  const init = () => {
    const canvas = canvasRef.current!;
    const container = containerRef.current!;
    const rect = container.getBoundingClientRect();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(rect.width, rect.height);
    rendererRef.current = renderer;

    const camera = new THREE.PerspectiveCamera(
      conf.current.perspective,
      rect.width / rect.height,
      0.1,
      1000
    );
    camera.position.z = conf.current.cameraZ;
    cameraRef.current = camera;

    geometryRef.current = new THREE.BoxGeometry(
      conf.current.objectWidth,
      conf.current.objectWidth,
      conf.current.objectThickness
    );

    sceneRef.current = new THREE.Scene();

    initScene();
    animate();
    window.addEventListener("resize", onResize);
  };

  const initScene = () => {
    onResize();
    sceneRef.current = new THREE.Scene();
    initLights();
    initObjects();
  };

  const initLights = () => {
    const scene = sceneRef.current!;
    scene.add(new THREE.AmbientLight(conf.current.ambientColor));
    const light = new THREE.PointLight(conf.current.light1Color);
    light.position.z = 100;
    scene.add(light);
  };

  const initObjects = () => {
    const scene = sceneRef.current!;
    const geometry = geometryRef.current!;

    const wWidth = getRendererSize()[0];
    const wHeight = getRendererSize()[1];

    const nx = Math.round(wWidth / conf.current.objectWidth) + 1;
    const ny = Math.round(wHeight / conf.current.objectWidth) + 1;

    objectsRef.current = [];

    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        const material = new THREE.MeshLambertMaterial({
          color: conf.current.color,
          transparent: true,
          opacity: 1,
        });

        const mesh = new THREE.Mesh(geometry, material);
        const x = -wWidth / 2 + i * conf.current.objectWidth;
        const y = -wHeight / 2 + j * conf.current.objectWidth;
        mesh.position.set(x, y, 0);
        scene.add(mesh);
        objectsRef.current.push(mesh);
      }
    }

    startAnim();
  };

  const startAnim = () => {
    objectsRef.current.forEach((mesh) => {
      mesh.rotation.set(0, 0, 0);
      if (mesh.material instanceof THREE.Material) {
        mesh.material.opacity = 1;
      }
      mesh.position.z = 0;

      const delay = TMath.randFloat(1, 2);
      const rx = TMath.randFloatSpread(2 * Math.PI);
      const ry = TMath.randFloatSpread(2 * Math.PI);
      const rz = TMath.randFloatSpread(2 * Math.PI);

      TweenMax.to(mesh.rotation, 2, { x: rx, y: ry, z: rz, delay });
      TweenMax.to(mesh.position, 2, {
        z: 80,
        delay: delay + 0.5,
        ease: Power1.easeOut,
      });
      TweenMax.to(mesh.material, 2, { opacity: 0, delay: delay + 0.5 });
    });

    setTimeout(() => {
      setShowContent(true);
    }, 3000);
  };

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  const onResize = () => {
    const container = containerRef.current!;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const renderer = rendererRef.current!;
    const camera = cameraRef.current!;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  const getRendererSize = (): [number, number] => {
    const camera = cameraRef.current!;
    const vFOV = (camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFOV / 2) * Math.abs(conf.current.cameraZ);
    const width = height * camera.aspect;
    return [width, height];
  };

  useEffect(() => {
    init();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-150 rounded overflow-hidden bg-black"
    >
      {!showContent && (
        <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />
      )}

      {showContent && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-white text-3xl font-bold">Revealed Content</h2>
          <a
            href="revealEffect"
            className="bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200 transition"
          >
            Replay Animation
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default RevealEffect;
