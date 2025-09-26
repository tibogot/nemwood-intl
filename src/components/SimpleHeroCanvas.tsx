"use client";

import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Simple rotating cube for testing
function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
  );
}

// Simple scene
function SimpleScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RotatingCube />
    </>
  );
}

// Main canvas component
export default function SimpleHeroCanvas() {
  return (
    <div className="absolute inset-0 h-full w-full bg-gray-900">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
        }}
      >
        <SimpleScene />
      </Canvas>
    </div>
  );
}


