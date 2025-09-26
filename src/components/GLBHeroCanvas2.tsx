"use client";

import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Sky,
  useEnvironment,
  Environment,
  OrbitControls,
  Bvh,
} from "@react-three/drei";
import {
  EffectComposer,
  N8AO,
  TiltShift2,
  ToneMapping,
  Selection,
  Outline,
} from "@react-three/postprocessing";
import { Suspense } from "react";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useControls } from "leva";
import * as THREE from "three";

// Preload the GLB model for better performance
useGLTF.preload("/models/kitchen-transformed.glb");

// Camera Controller Component
function CameraController() {
  const { camera } = useThree();
  const cameraControls = useControls("Camera", {
    positionX: { value: 0, step: 0.1, min: -20, max: 20 },
    positionY: { value: 0.6, step: 0.1, min: 0, max: 20 },
    positionZ: { value: 8, step: 0.1, min: 0, max: 20 },
    rotationX: { value: 0, step: 0.1, min: -Math.PI, max: Math.PI },
    rotationY: { value: 0, step: 0.1, min: -Math.PI, max: Math.PI },
    rotationZ: { value: 0, step: 0.1, min: -Math.PI, max: Math.PI },
    fov: { value: 25, min: 10, max: 100, step: 1 },
  });

  useFrame(() => {
    // Only update if values actually changed to prevent conflicts
    if (
      Math.abs(camera.position.x - cameraControls.positionX) > 0.001 ||
      Math.abs(camera.position.y - cameraControls.positionY) > 0.001 ||
      Math.abs(camera.position.z - cameraControls.positionZ) > 0.001
    ) {
      camera.position.set(
        cameraControls.positionX,
        cameraControls.positionY,
        cameraControls.positionZ,
      );
    }

    // Update camera rotation
    if (
      Math.abs(camera.rotation.x - cameraControls.rotationX) > 0.001 ||
      Math.abs(camera.rotation.y - cameraControls.rotationY) > 0.001 ||
      Math.abs(camera.rotation.z - cameraControls.rotationZ) > 0.001
    ) {
      camera.rotation.set(
        cameraControls.rotationX,
        cameraControls.rotationY,
        cameraControls.rotationZ,
      );
    }

    if ("fov" in camera && Math.abs(camera.fov - cameraControls.fov) > 0.001) {
      camera.fov = cameraControls.fov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

// Kitchen Scene following the professional pattern
function KitchenScene() {
  // Load model with nodes and materials
  const { nodes, materials } = useGLTF("/models/kitchen-transformed.glb");
  const modelRef = useRef<THREE.Group>(null);

  // Leva controls for object positioning
  const objectControls = useControls("Kitchen Object", {
    positionX: { value: 0, step: 0.1, min: -10, max: 10 },
    positionY: { value: -1, step: 0.1, min: -5, max: 5 },
    positionZ: { value: -0.85, step: 0.1, min: -10, max: 10 },
    rotationY: { value: Math.PI / 2, step: 0.1, min: -Math.PI, max: Math.PI },
    scale: { value: 1.5, step: 0.1, min: 0.1, max: 3 },
  });

  useFrame((state) => {
    if (modelRef.current) {
      // Apply Leva controls
      const currentPos = modelRef.current.position;
      const currentRot = modelRef.current.rotation;
      const currentScale = modelRef.current.scale;

      // Only update if values changed to prevent conflicts
      if (
        Math.abs(currentPos.x - objectControls.positionX) > 0.001 ||
        Math.abs(currentPos.y - objectControls.positionY) > 0.001 ||
        Math.abs(currentPos.z - objectControls.positionZ) > 0.001
      ) {
        modelRef.current.position.set(
          objectControls.positionX,
          objectControls.positionY,
          objectControls.positionZ,
        );
      }

      if (Math.abs(currentRot.y - objectControls.rotationY) > 0.001) {
        modelRef.current.rotation.set(0, objectControls.rotationY, 0);
      }

      // Apply scale with subtle breathing animation
      const breathingScale =
        objectControls.scale *
        (1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.005);
      if (Math.abs(currentScale.x - breathingScale) > 0.001) {
        modelRef.current.scale.setScalar(breathingScale);
      }
    }
  });

  return (
    <group ref={modelRef}>
      {/* Render individual meshes following the example pattern */}
      {Object.entries(nodes).map(([name, node]) => {
        if (node instanceof THREE.Mesh && node.geometry && node.material) {
          // Find the corresponding material
          const material = materials[node.material.name] || node.material;

          // Apply environment map to specific materials for reflections (like the example)
          const needsEnvMap =
            name.toLowerCase().includes("chrome") ||
            name.toLowerCase().includes("metal") ||
            name.toLowerCase().includes("glass") ||
            name.toLowerCase().includes("sink") ||
            name.toLowerCase().includes("chair") ||
            name.toLowerCase().includes("table");

          return (
            <mesh
              key={name}
              geometry={node.geometry}
              material={material}
              material-envMapIntensity={1.0}
              castShadow
              receiveShadow
            />
          );
        }
        return null;
      })}
    </group>
  );
}

// Professional lighting setup following the example
function ProfessionalLighting() {
  const lightingControls = useControls("Lighting", {
    envPreset: {
      value: "studio" as const,
      options: [
        "city",
        "apartment",
        "dawn",
        "forest",
        "lobby",
        "night",
        "park",
        "studio",
        "sunset",
        "warehouse",
      ] as const,
    },
    envIntensity: { value: 2.0, step: 0.1, min: 0, max: 5 },
    ambientIntensity: { value: 0.2, step: 0.1, min: 0, max: 2 },
    directionalIntensity: { value: 3.0, step: 0.1, min: 0, max: 8 },
    directionalPositionX: { value: 10, step: 0.1, min: -20, max: 20 },
    directionalPositionY: { value: 10, step: 0.1, min: 0, max: 20 },
    directionalPositionZ: { value: 5, step: 0.1, min: -20, max: 20 },
  });

  return (
    <>
      {/* Environment map for realistic lighting and reflections */}
      <Environment
        preset={lightingControls.envPreset as any}
        environmentIntensity={lightingControls.envIntensity}
        background={false}
      />

      {/* Subtle ambient light */}
      <ambientLight intensity={lightingControls.ambientIntensity} />

      {/* Strong directional light like in the example */}
      <directionalLight
        position={[
          lightingControls.directionalPositionX,
          lightingControls.directionalPositionY,
          lightingControls.directionalPositionZ,
        ]}
        intensity={lightingControls.directionalIntensity}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
    </>
  );
}

// Post-processing effects for professional look
function Effects() {
  return (
    <EffectComposer
      stencilBuffer
      enableNormalPass={false}
      autoClear={false}
      multisampling={4}
    >
      {/* Ambient Occlusion for realistic depth */}
      <N8AO
        halfRes
        aoSamples={5}
        aoRadius={0.4}
        distanceFalloff={0.75}
        intensity={1}
      />
    </EffectComposer>
  );
}

// Professional scene setup
function Scene() {
  return (
    <Bvh firstHitOnly>
      <Selection>
        {/* Kitchen Scene with professional rendering */}
        <KitchenScene />

        {/* Post-processing effects */}
        <Effects />
      </Selection>
    </Bvh>
  );
}

// Loading component
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="text-center">
        <div className="mb-2 text-2xl text-amber-800">
          Chargement de la scène...
        </div>
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent"></div>
      </div>
    </div>
  );
}

// Main canvas component
export default function GLBHeroCanvas() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        flat
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        shadows
        camera={{
          position: [0, 4, 8],
          fov: 25,
          near: 1,
          far: 20,
        }}
        style={{
          background: "linear-gradient(to bottom, #f8f4f0, #e8dcc6)",
        }}
      >
        <Suspense fallback={null}>
          <CameraController />
          <ProfessionalLighting />
          <Scene />
          <OrbitControls enabled={false} />
        </Suspense>
      </Canvas>

      {/* Loading fallback outside Canvas */}
      <Suspense fallback={<LoadingFallback />}>
        <div className="pointer-events-none absolute inset-0" />
      </Suspense>
    </div>
  );
}
