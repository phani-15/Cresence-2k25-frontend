import React from "react";
import CresenceText from "./ParticalSystem";
import Castle from "../assets/Castle";
import { Canvas } from "@react-three/fiber";

export default function EntryScene() {
  return (
    <div className=" w-screen h-screen text-white flex items-center justify-center">
      
        <Canvas camera={{ fov: 45, position: [0, 2, 10] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[1, 8, 5]} intensity={2} />
          {/* <Castle /> */}
          <CresenceText/>
        </Canvas>
    </div>
  );
}
