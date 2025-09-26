"use client";

import * as THREE from "three";
import { easing } from "maath";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sky, Bvh, useGLTF, useEnvironment } from "@react-three/drei";
import {
  EffectComposer,
  Selection,
  Outline,
  N8AO,
  TiltShift2,
  ToneMapping,
} from "@react-three/postprocessing";
import { Suspense } from "react";
import { useControls } from "leva";

// Preload the GLB model for better performance
useGLTF.preload("/models/kitchen-transformed.glb");

// Lighting Controls Component - Only call once at the top level
function useLightingControls() {
  const {
    ambientIntensity,
    sunX,
    sunY,
    sunZ,
    inclination,
    azimuth,
    envPreset,
    envIntensity,
  } = useControls("Lighting", {
    ambientIntensity: {
      value: 1.5 * Math.PI,
      min: 0,
      max: 20,
      step: 0.1,
    },
    sunX: {
      value: 0,
      min: -5,
      max: 5,
      step: 0.1,
    },
    sunY: {
      value: 1,
      min: 0.1,
      max: 5,
      step: 0.1,
    },
    sunZ: {
      value: 0,
      min: -5,
      max: 5,
      step: 0.1,
    },
    inclination: {
      value: 0.49,
      min: 0,
      max: Math.PI,
      step: 0.01,
    },
    azimuth: {
      value: 0.25,
      min: 0,
      max: 2 * Math.PI,
      step: 0.01,
    },
    envPreset: {
      value: "city",
      options: [
        "apartment",
        "city",
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
    envIntensity: {
      value: 0.5,
      min: 0,
      max: 3,
      step: 0.1,
    },
  });

  return {
    ambientIntensity,
    sunPosition: [sunX, sunY, sunZ] as [number, number, number],
    inclination,
    azimuth,
    envPreset,
    envIntensity,
  };
}

// Scene Component (exactly like your example)
function Scene(props: any & { env: any; envIntensity: number }) {
  // Load model
  const { nodes, materials } = useGLTF("/models/kitchen-transformed.glb");

  return (
    <>
      <group {...props}>
        {/* Render all meshes from the GLB */}
        {Object.entries(nodes).map(([name, node]) => {
          if (node instanceof THREE.Mesh && node.geometry && node.material) {
            // Find the corresponding material
            const material = materials[node.material.name] || node.material;

            // Apply environment map to specific materials for reflections (like chairs, table, sink)
            const needsEnvMap =
              name.toLowerCase().includes("chair") ||
              name.toLowerCase().includes("table") ||
              name.toLowerCase().includes("sink") ||
              name.toLowerCase().includes("chrome") ||
              name.toLowerCase().includes("metal");

            // Ensure proper color space for materials
            if ("map" in material && material.map) {
              (material.map as THREE.Texture).colorSpace = THREE.SRGBColorSpace;
            }

            return (
              <mesh
                key={name}
                geometry={node.geometry}
                material={material}
                material-envMap={needsEnvMap ? props.env : undefined}
                material-envMapIntensity={
                  needsEnvMap ? props.envIntensity : undefined
                }
              />
            );
          }
          return null;
        })}
      </group>
    </>
  );
}

// Effects Component with Leva controls
function Effects() {
  const { size } = useThree();

  const { aoIntensity, aoRadius, outlineStrength, tiltBlur } = useControls(
    "Post-Processing",
    {
      aoIntensity: { value: 1, min: 0, max: 3, step: 0.1 },
      aoRadius: { value: 0.4, min: 0.1, max: 1, step: 0.01 },
      outlineStrength: { value: 10, min: 0, max: 20, step: 0.5 },
      tiltBlur: { value: 0.1, min: 0, max: 0.5, step: 0.01 },
    },
  );

  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        state.pointer.x,
        1 + state.pointer.y / 2,
        8 + Math.atan(state.pointer.x * 2),
      ],
      0.3,
      delta,
    );
    state.camera.lookAt(state.camera.position.x * 0.9, 0, -4);
  });

  return (
    <EffectComposer
      stencilBuffer
      enableNormalPass={false}
      autoClear={false}
      multisampling={4}
    >
      <N8AO
        halfRes
        aoSamples={5}
        aoRadius={aoRadius}
        distanceFalloff={0.75}
        intensity={aoIntensity}
      />
      <Outline
        visibleEdgeColor={0xffffff}
        hiddenEdgeColor={0xffffff}
        blur
        width={size.width * 1.25}
        edgeStrength={outlineStrength}
      />
      <TiltShift2 samples={5} blur={tiltBlur} />
    </EffectComposer>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
    </div>
  );
}

// Main App Component (exactly like your example)
export default function GLBHeroCanvas() {
  // Get lighting controls - only call once here
  const {
    ambientIntensity,
    sunPosition,
    inclination,
    azimuth,
    envPreset,
    envIntensity,
  } = useLightingControls();

  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        flat
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        camera={{ position: [0, 1, 6], fov: 25, near: 1, far: 20 }}
      >
        <ambientLight intensity={ambientIntensity} />
        <Sky
          sunPosition={sunPosition}
          inclination={inclination}
          azimuth={azimuth}
        />
        <Bvh firstHitOnly>
          <Selection>
            <Effects />
            <SceneWithEnvironment
              rotation={[0, Math.PI / 2, 0]}
              position={[0, -1, -0.85]}
              envPreset={envPreset}
              envIntensity={envIntensity}
            />
          </Selection>
        </Bvh>
      </Canvas>

      {/* Loading fallback outside Canvas */}
      <Suspense fallback={<LoadingFallback />}>
        <div className="pointer-events-none absolute inset-0" />
      </Suspense>
    </div>
  );
}

// Scene with Environment Component
function SceneWithEnvironment(
  props: any & { envPreset: string; envIntensity: number },
) {
  // Load environment at the Canvas level
  const env = useEnvironment({ preset: props.envPreset as any });

  return <Scene {...props} env={env} envIntensity={props.envIntensity} />;
}
