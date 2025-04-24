"use client";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import { useEffect, useRef, useState } from "react";

const GalaxyGenerator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Ensure canvasRef is available before proceeding
    if (!canvasRef.current) return;

    // Set initial dimensions
    setDimensions({
      width: canvasRef.current?.parentElement?.offsetWidth || 0,
      height: canvasRef.current?.parentElement?.offsetHeight || 0,
    });

    // Resize event listener
    const handleResize = () => {
      if (canvasRef.current?.parentElement) {
        setDimensions({
          width: canvasRef.current?.parentElement?.offsetWidth || 0,
          height: canvasRef.current?.parentElement?.offsetHeight || 0,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0)
      return;

    const gui = new dat.GUI({ width: 400 });

    const scene = new THREE.Scene();

    const params = {
      count: 700000,
      size: 0.01,
      radius: 6,
      branches: 3,
      spin: 2,
      randomness: 0.2,
      randomnessPower: 3,
      inColor: "#ff6030",
      outColor: "#1b3984",
    };

    let geometry: THREE.BufferGeometry | null;
    let material: THREE.PointsMaterial | null;
    let points: THREE.Points | null;

    const generateGalaxy = () => {
      if (points !== null) {
        geometry?.dispose();
        material?.dispose();
        scene.remove(points);
      }

      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(params.count * 3);
      const colors = new Float32Array(params.count * 3);

      const inColor = new THREE.Color(params.inColor);
      const outColor = new THREE.Color(params.outColor);

      for (let i = 0; i < params.count; i++) {
        const i3 = i * 3;
        const radius = Math.random() * params.radius;
        const spinAngle = radius * params.spin;
        const branchAngle =
          ((i % params.branches) / params.branches) * Math.PI * 2;

        const randomX =
          Math.pow(Math.random(), params.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1);
        const randomY =
          Math.pow(Math.random(), params.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1);
        const randomZ =
          Math.pow(Math.random(), params.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1);

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] =
          Math.sin(branchAngle + spinAngle) * radius + randomZ;

        const mixedColor = inColor.clone();
        mixedColor.lerp(outColor, radius / params.radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      material = new THREE.PointsMaterial({
        size: params.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);
    };

    generateGalaxy();

    gui.add(params, "count", 100, 1000000, 100).onFinishChange(generateGalaxy);
    gui.add(params, "size", 0.001, 0.1, 0.001).onFinishChange(generateGalaxy);
    gui.add(params, "radius", 0.01, 20, 0.01).onFinishChange(generateGalaxy);
    gui.add(params, "branches", 2, 20, 1).onFinishChange(generateGalaxy);
    gui.add(params, "spin", -5, 5, 0.001).onFinishChange(generateGalaxy);
    gui.add(params, "randomness", 0, 2, 0.001).onFinishChange(generateGalaxy);
    gui
      .add(params, "randomnessPower", 1, 10, 0.001)
      .onFinishChange(generateGalaxy);
    gui.addColor(params, "inColor").onFinishChange(generateGalaxy);
    gui.addColor(params, "outColor").onFinishChange(generateGalaxy);

    const camera = new THREE.PerspectiveCamera(
      75,
      dimensions.width / dimensions.height,
      0.1,
      100
    );
    camera.position.set(3, 3, 3);
    scene.add(camera);

    const canvas = canvasRef.current!;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    window.addEventListener("resize", () => {
      if (!canvasRef.current) return;

      setDimensions({
        width: canvasRef.current?.parentElement?.offsetWidth || 0,
        height: canvasRef.current?.parentElement?.offsetHeight || 0,
      });

      camera.aspect = dimensions.width / dimensions.height;
      camera.updateProjectionMatrix();

      renderer.setSize(dimensions.width, dimensions.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      gui.destroy();
      renderer.dispose();
      canvasRef.current = null;
    };
  }, [dimensions]);

  return (
    <canvas
      className="webgl"
      ref={canvasRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default GalaxyGenerator;
