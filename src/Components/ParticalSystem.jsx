import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function TextModel() {
  const { scene } = useGLTF("models/CRESENCE.glb");

  // Optional: scale based on screen size
  const scaleFactor = Math.min(
    window.innerWidth / 30,
    window.innerHeight / 30
  );
  scene.scale.set(scaleFactor, scaleFactor, scaleFactor);

  // Optional: apply a single material to all meshes
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: "#AFAFAF",
        roughness: 0.6,
        metalness: 0.1,
      });
    }
  });

  return <primitive object={scene} position={[0, 2, 0]} />;
}

export default function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 2, 5]} intensity={2} />

      {/* Model */}
      <TextModel />

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />

    </>
  );
}
