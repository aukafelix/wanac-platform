"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

// Pillar component with marble material + label
function Pillar({ position, title, description }) {
  return (
    <group position={position}>
      {/* Pillar body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 6, 64]} />
        <meshStandardMaterial
          color="#dcdcdc"
          roughness={0.25}
          metalness={0.15}
        />
      </mesh>

      {/* Title text */}
      <Text
        position={[0, 4.2, 0]}
        fontSize={0.5}
        color="#222"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>

      {/* Description text */}
      <Text
        position={[0, -4, 0]}
        fontSize={0.28}
        color="#444"
        anchorX="center"
        anchorY="top"
        maxWidth={6}
        lineHeight={1.3}
      >
        {description}
      </Text>
    </group>
  );
}

export default function CorePillars3D() {
  const pillars = [
    {
      title: "Clarity & Vision",
      description: "Establishing clear personal and professional pathways.",
      pos: [-10, 0, 0],
    },
    {
      title: "Energy & Resilience",
      description: "Optimizing physical, emotional, and mental well-being.",
      pos: [-5, 0, 0],
    },
    {
      title: "Courage & Confidence",
      description: "Building the ability to navigate challenges with strength.",
      pos: [0, 0, 0],
    },
    {
      title: "Productivity & Excellence",
      description: "Empowering individuals to achieve exceptional results.",
      pos: [5, 0, 0],
    },
    {
      title: "Influence & Leadership",
      description: "Enhancing interpersonal skills to inspire and drive change.",
      pos: [10, 0, 0],
    },
  ];

  return (
    <div className="w-screen h-screen bg-gray-100">
      <Canvas shadows camera={{ position: [0, 10, 25], fov: 55 }}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={1}
          castShadow
        />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>

        {/* Render all pillars */}
        {pillars.map((p, i) => (
          <Pillar
            key={i}
            position={p.pos}
            title={p.title}
            description={p.description}
          />
        ))}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
