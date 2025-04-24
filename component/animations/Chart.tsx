"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const NUM_BARS = 10;
const MAX_HEIGHT = 8;
const BAR_WIDTH = 0.2;
const BAR_SPACING = 0.3;

const getRandomHeight = () => Math.random() * MAX_HEIGHT;

// const BarChart = () => {
//   const bars = useMemo(
//     () =>
//       Array.from({ length: NUM_BARS }, (_, i) => ({
//         position: new THREE.Vector3(
//           i * (BAR_WIDTH + BAR_SPACING) -
//             (NUM_BARS * (BAR_WIDTH + BAR_SPACING)) / 2,
//           0,
//           0
//         ),
//         height: getRandomHeight(),
//       })),
//     []
//   );

//   return (
//     <>
//       {bars.map((bar, i) => (
//         <mesh position={bar.position} key={i}>
//           <boxGeometry args={[BAR_WIDTH, bar.height, BAR_WIDTH]} />
//           <meshStandardMaterial
//             color={`hsl(${(i / NUM_BARS) * 360}, 100%, 50%)`}
//             emissive={`hsl(${(i / NUM_BARS) * 360}, 100%, 50%)`}
//             emissiveIntensity={0.7}
//           />
//         </mesh>
//       ))}
//     </>
//   );
// };

// Constants
const ANIMATION_SPEED = 0.1; // Speed of the animation

const BarChart = () => {
  const bars = useMemo(
    () =>
      Array.from({ length: NUM_BARS }, (_, i) => ({
        position: new THREE.Vector3(
          i * (BAR_WIDTH + BAR_SPACING) -
            (NUM_BARS * (BAR_WIDTH + BAR_SPACING)) / 2,
          0,
          0
        ),
        targetHeight: getRandomHeight(),
        currentHeight: 0,
        isAnimating: false,
      })),
    []
  );

  // Animation Logic
  useFrame(() => {
    bars.forEach((bar) => {
      if (bar.isAnimating) {
        bar.currentHeight +=
          (bar.targetHeight - bar.currentHeight) * ANIMATION_SPEED * 0.02;
        if (Math.abs(bar.currentHeight - bar.targetHeight) < 0.01) {
          bar.isAnimating = false; // Stop animating once the target is reached
        }
      }
    });
  });

  return (
    <>
      {bars.map((bar, i) => (
        <Bar
          key={i}
          position={bar.position}
          height={bar.currentHeight}
          onClick={() => {
            bar.targetHeight = getRandomHeight(); // Click to regenerate the bar height
            bar.isAnimating = true; // Trigger the animation
          }}
        />
      ))}
    </>
  );
};

// Bar component with gradient material and shadow
const Bar = ({
  position,
  height,
  onClick,
}: {
  position: THREE.Vector3;
  height: number;
  onClick: () => void;
}) => {
  const ref = useRef<THREE.Mesh>(null);

  // Gradient Texture
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, "#1e90ff");
    gradient.addColorStop(1, "#00bfff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Adding shadows and animation to the bar
  return (
    <mesh
      position={position}
      ref={ref}
      onClick={onClick}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[BAR_WIDTH, height, BAR_WIDTH]} />
      <meshStandardMaterial
        map={texture}
        emissive="#00bfff"
        emissiveIntensity={0.5}
        roughness={0.3}
        metalness={0.7}
      />
      {/* Add shadow to the base */}
      <mesh position={[0, -height / 2, 0]} receiveShadow>
        <cylinderGeometry args={[BAR_WIDTH, BAR_WIDTH, 0.05, 32]} />
        <meshStandardMaterial color="#000000" opacity={0.3} transparent />
      </mesh>
    </mesh>
  );
};
const Coin = ({ position }: { position: THREE.Vector3 }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
      ref.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh position={position} ref={ref}>
      <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
      <meshStandardMaterial
        color="#ffd700"
        emissive="#ffd700"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
};

const BackgroundParticles = () => {
  const particles = useMemo(() => {
    const particlePositions = [];
    for (let i = 0; i < 300; i++) {
      particlePositions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        )
      );
    }
    return particlePositions;
  }, []);

  return (
    <>
      {particles.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="white"
            emissive="white"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </>
  );
};

const Chart = () => {
  //   const [showChart, setShowChart] = useState(false);
  //   const [showCoins, setShowCoins] = useState(false);

  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 8], fov: 70 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />

        {/* Abstract Background */}
        <BackgroundParticles />
        <Environment preset="city" />

        {/* 3D Coin Animation */}
        {/* {showCoins && ( */}
        <>
          <Coin position={new THREE.Vector3(-3, 2, 0)} />
          <Coin position={new THREE.Vector3(3, 2, 0)} />
        </>
        {/* )} */}

        {/* Financial Chart */}
        <BarChart />

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableDamping
          dampingFactor={0.1}
          //   onStart={() => {
          //     setShowChart(true);
          //     setShowCoins(true);
          //   }}
          //   onEnd={() => {
          //     setShowChart(false);
          //     setShowCoins(false);
          //   }}
        />
      </Canvas>
    </div>
  );
};

export default Chart;
