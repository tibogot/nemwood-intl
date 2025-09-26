"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Animated wooden plank component
function WoodenPlank({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      // Subtle rotation
      meshRef.current.rotation.y =
        rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[4, 0.2, 0.8]} />
      <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.1} />
    </mesh>
  );
}

// Wooden table component
function WoodenTable() {
  const tableRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (tableRef.current) {
      // Subtle breathing animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
      tableRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={tableRef}>
      {/* Table top */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 0.3, 3]} />
        <meshStandardMaterial
          color="#D2691E"
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* Table legs */}
      {[
        [-2.5, -1.5, -1],
        [2.5, -1.5, -1],
        [-2.5, -1.5, 1],
        [2.5, -1.5, 1],
      ].map((pos, index) => (
        <mesh key={index} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 3]} />
          <meshStandardMaterial
            color="#8B4513"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating particles representing wood shavings
function WoodShavings() {
  const pointsRef = useRef<THREE.Points>(null);

  // Create random positions for wood shavings
  const positions = new Float32Array(100 * 3);
  for (let i = 0; i < 100; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = Math.random() * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;

      // Animate positions for floating effect
      const positions = pointsRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={100}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#8B4513" size={0.05} transparent opacity={0.6} />
    </points>
  );
}

// Scene content
function Scene() {
  return (
    <>
      {/* Basic lighting without environment for now */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.8} color="#FFA500" />
      <spotLight
        position={[0, 10, 0]}
        intensity={0.5}
        angle={Math.PI / 6}
        penumbra={0.5}
        castShadow
      />

      {/* Wooden furniture */}
      <WoodenTable />

      {/* Floating planks */}
      <WoodenPlank position={[-3, 2, 1]} rotation={[0.1, 0.3, 0]} />
      <WoodenPlank position={[4, 3, -1]} rotation={[-0.1, -0.2, 0]} />
      <WoodenPlank position={[0, 4, 2]} rotation={[0.2, 0.5, 0]} />

      {/* Wood shavings */}
      <WoodShavings />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#654321" roughness={0.9} metalness={0.1} />
      </mesh>
    </>
  );
}

// Main canvas component
export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        shadows
        camera={{
          position: [5, 5, 8],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          outputColorSpace: "srgb",
        }}
        dpr={[1, 2]}
        style={{ background: "linear-gradient(to bottom, #1a1a1a, #2d2d2d)" }}
      >
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
