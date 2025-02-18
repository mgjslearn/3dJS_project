/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: BazzaTRD (https://sketchfab.com/BazzaTRD)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/study-room-d8d093f97dfb45efb2c632b53a12718f
Title: Study Room
*/

import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import studyScene from '../assets3/3d/study_room.glb'


const StudyRoom = ({isRotating, setIsRotating, setCurrentStage,... props}) => {
const studyRef = useRef();
const {gl, viewport} = useThree();
const { nodes, materials } = useGLTF(studyScene);

const lastX =  useRef(0);
const rotationSpeed = useRef(0);
const dampingFactor = 0.95;


// Handle pointer (mouse or touch) down event
const handlePointerDown = (event) => {
  event.stopPropagation();
  event.preventDefault();
  setIsRotating(true);

  // Calculate the clientX based on whether it's a touch event or a mouse event
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;

  // Store the current clientX position for reference
  lastX.current = clientX;
};
 // Handle pointer (mouse or touch) up event
 const handlePointerUp = (event) => {
  event.stopPropagation();
  event.preventDefault();
  setIsRotating(false);
};

// Handle pointer (mouse or touch) move event
const handlePointerMove = (event) => {
  event.stopPropagation();
  event.preventDefault();
  if (isRotating) {
    // If rotation is enabled, calculate the change in clientX position
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // calculate the change in the horizontal position of the mouse cursor or touch input,
    // relative to the viewport's width
    const delta = (clientX - lastX.current) / viewport.width;

   
    studyRef.current.rotation.y += delta * 0.01 * Math.PI;

    // Update the reference for the last clientX position
    lastX.current = clientX;

    // Update the rotation speed
    rotationSpeed.current = delta * 0.01 * Math.PI;
  }
};
// Handle keydown events
const handleKeyDown = (event) => {
  if (event.key === "ArrowLeft") {
    if (!isRotating) setIsRotating(true);

    islandRef.current.rotation.y += 0.005 * Math.PI;
    rotationSpeed.current = 0.007;
  } else if (event.key === "ArrowRight") {
    if (!isRotating) setIsRotating(true);

    studyRef.current.rotation.y -= 0.005 * Math.PI;
    rotationSpeed.current = -0.007;
  }
};

// Handle keyup events
const handleKeyUp = (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    setIsRotating(false);
  }
};

// Touch events for mobile devices
const handleTouchStart = (e) => {
  e.stopPropagation();
  e.preventDefault();
  setIsRotating(true);

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  lastX.current = clientX;
}

const handleTouchEnd = (e) => {
  e.stopPropagation();
  e.preventDefault();
  setIsRotating(false);
}

const handleTouchMove = (e) => {
  e.stopPropagation();
  e.preventDefault();

  if (isRotating) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = (clientX - lastX.current) / viewport.width;

    studyRef.current.rotation.y += delta * 0.01 * Math.PI;
    lastX.current = clientX;
    rotationSpeed.current = delta * 0.01 * Math.PI;
  }
}

useEffect(() => {
  // Add event listeners for pointer and keyboard events
  const canvas = gl.domElement;
  canvas.addEventListener("pointerdown", handlePointerDown);
  canvas.addEventListener("pointerup", handlePointerUp);
  canvas.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  canvas.addEventListener("touchstart", handleTouchStart);
  canvas.addEventListener("touchend", handleTouchEnd);
  canvas.addEventListener("touchmove", handleTouchMove);



  return() => {
    canvas.removeEventListener("pointerdown", handlePointerDown);
    canvas.removeEventListener("pointerup", handlePointerUp);
    canvas.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
    canvas.removeEventListener("touchstart", handleTouchStart);
    canvas.removeEventListener("touchend", handleTouchEnd);
    canvas.removeEventListener("touchmove", handleTouchMove);
  };

}, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);
  
useFrame(() => {
  if (!isRotating) {
    rotationSpeed.current *= dampingFactor;
    if(Math.abs(rotationSpeed.current) < 0.001) {
      rotationSpeed.current = 0;
    }
    studyRef.current.rotation.y += rotationSpeed.current;
  } else {
    const rotation = studyRef.current.rotation.y;
         /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
         const normalizedRotation =
         ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
 
       // Set the current stage based on the island's orientation
       switch (true) {
         case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
           setCurrentStage(4);
           break;
         case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
           setCurrentStage(3);
           break;
         case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
           setCurrentStage(2);
           break;
         case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
           setCurrentStage(1);
           break;
         default:
           setCurrentStage(null);
       }
     }
   });

  return (
    
     <a.group ref = {studyRef} {...props} >
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.696}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group scale={2}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials.room}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_5.geometry}
              material={materials.room2}
            />
          </group>
          <group
            position={[1.291, 0.564, -0.855]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.262, 1.102, 0.525]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_11.geometry}
              material={materials.cupboard}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_12.geometry}
              material={materials.metalic}
            />
          </group>
          <group position={[-1.706, 1.602, -1.181]} scale={[0.193, 0.406, 0.451]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_42.geometry}
              material={materials['case']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_43.geometry}
              material={materials.mesh_back}
            />
          </group>
          <group
            position={[-1.669, 1.602, -0.73]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.156, 0.156, 0.402]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_45.geometry}
              material={materials.wire_mesh}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_46.geometry}
              material={materials.wire_mesh}
            />
          </group>
          <group position={[-1.811, 3.12, -1.7]} scale={[0.03, 0.175, 0.175]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_62.geometry}
              material={materials.book1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_63.geometry}
              material={materials.book2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_64.geometry}
              material={materials.book3}
            />
          </group>
          <group position={[-1.09, 3.11, -1.7]} scale={[0.03, 0.175, 0.175]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_66.geometry}
              material={materials.book2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_67.geometry}
              material={materials.book3}
            />
          </group>
          <group position={[-1.811, 3.503, -1.7]} scale={[0.03, 0.166, 0.175]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_69.geometry}
              material={materials.book1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_70.geometry}
              material={materials.book2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_71.geometry}
              material={materials.book3}
            />
          </group>
          <group position={[-1.811, 2.752, -1.7]} scale={[0.03, 0.175, 0.175]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_73.geometry}
              material={materials.book3}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_74.geometry}
              material={materials.book1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_75.geometry}
              material={materials.book2}
            />
          </group>
          <group position={[-1.075, 2.739, -1.7]} scale={[0.03, 0.175, 0.175]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_79.geometry}
              material={materials.book2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_80.geometry}
              material={materials.book1}
            />
          </group>
          <group position={[-0.606, 3.12, -1.7]} scale={[0.03, 0.175, 0.175]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_82.geometry}
              material={materials.book2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_83.geometry}
              material={materials.book1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_84.geometry}
              material={materials.book3}
            />
          </group>
          <group position={[0.12, 3.1, -1.7]} scale={[0.03, 0.175, 0.175]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_86.geometry}
              material={materials.book1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_87.geometry}
              material={materials.book3}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_88.geometry}
              material={materials.book2}
            />
          </group>
          <group
            position={[-1.143, 1.227, -0.692]}
            rotation={[0, -0.491, -Math.PI / 2]}
            scale={[0.03, 0.166, 0.175]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_96.geometry}
              material={materials.book3}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_97.geometry}
              material={materials.pages}
            />
          </group>
          <group position={[0.072, 1.627, -1.792]} scale={[0.506, 0.288, 0.007]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_105.geometry}
              material={materials['monitor.001']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_106.geometry}
              material={materials['league.001']}
            />
          </group>
          <group
            position={[-1.024, 1.627, -1.355]}
            rotation={[0, 0.802, 0]}
            scale={[0.506, 0.288, 0.007]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_108.geometry}
              material={materials['monitor.001']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_109.geometry}
              material={materials['Material.002']}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_7.geometry}
            material={materials.table}
            position={[-1, 1.2, -1.303]}
            scale={[1, 1, 0.7]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_9.geometry}
            material={materials.table}
            position={[1.291, 0.58, -1.445]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[0.561, 0.533, 0.276]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_14.geometry}
            material={materials.table}
            position={[-1.546, 0.58, 0.375]}
            scale={[0.46, 0.533, 0.57]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_16.geometry}
            material={materials.cupboard}
            position={[-1.063, 0.562, 0.375]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={[0.547, 0.902, 0.525]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_18.geometry}
            material={materials.metalic}
            position={[-1.063, 1.025, 0.393]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            scale={[0.022, 0.033, 0.018]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_20.geometry}
            material={materials.metalic}
            position={[1.539, 0.67, -0.716]}
            scale={[0.01, 0.02, 0.221]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_22.geometry}
            material={materials.tray}
            position={[-1.526, 1.207, 0.43]}
            rotation={[0, 0.111, 0]}
            scale={[0.315, 0.231, 0.608]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_24.geometry}
            material={materials['case']}
            position={[-0.2, 1.221, -1.101]}
            rotation={[-Math.PI, -0.137, -Math.PI]}
            scale={[-0.41, 0.021, 0.161]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_26.geometry}
            material={materials.cupboard}
            position={[-0.581, 1.241, -1.136]}
            rotation={[-3.088, -0.137, -3.134]}
            scale={[-0.353, 0.01, 0.129]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_28.geometry}
            material={materials.monitor}
            position={[0.072, 1.217, -1.731]}
            scale={[0.437, 0.017, 0.152]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_30.geometry}
            material={materials.monitor}
            position={[-0.98, 1.217, -1.313]}
            rotation={[0, 0.802, 0]}
            scale={[0.437, 0.017, 0.152]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_32.geometry}
            material={materials['Material.004']}
            position={[0.476, 0.006, 0.57]}
            scale={[1.374, 0.01, 1.193]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_34.geometry}
            material={materials.folder}
            position={[-1.523, 1.207, 0.731]}
            scale={0.23}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_36.geometry}
            material={materials.paper}
            position={[-1.643, 1.207, 0.128]}
            rotation={[0, 0.029, 0]}
            scale={[0.175, 0.281, 0.28]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_38.geometry}
            material={materials.paper}
            position={[1.212, 1.207, -1.206]}
            rotation={[0, 0.444, 0]}
            scale={[0.175, 0.281, 0.28]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_40.geometry}
            material={materials.folder}
            position={[1.321, 0.556, -0.756]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={0.171}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_48.geometry}
            material={materials.mesh_back}
            position={[-1.669, 1.602, -0.731]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.156, 0.156, 0.405]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_50.geometry}
            material={materials.material_0}
            position={[-1.843, 1.913, -0.751]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.014, 0.008, 0.008]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_52.geometry}
            material={materials.material_0}
            position={[-1.843, 1.769, -0.756]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.004, 0.017, 0.004]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_54.geometry}
            material={materials.table}
            position={[-0.144, 3.12, -1.7]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[-0.339, 0.604, 1.885]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_56.geometry}
            material={materials.mesh_back}
            position={[0.562, 1.202, -1.141]}
            rotation={[0, -0.145, 0]}
            scale={0.258}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_58.geometry}
            material={materials.mesh_back}
            position={[0.562, 1.202, -1.141]}
            rotation={[0, -0.145, 0]}
            scale={0.258}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_60.geometry}
            material={materials.Material}
            position={[0.492, 1.202, -1.148]}
            rotation={[0, 0.501, 0]}
            scale={[0.049, 0.049, 0.072]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_77.geometry}
            material={materials.book3}
            position={[-0.038, 2.606, -1.7]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.03, 0.166, 0.175]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_90.geometry}
            material={materials.book2}
            position={[-0.038, 2.664, -1.725]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.03, 0.166, 0.175]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_92.geometry}
            material={materials.book3}
            position={[1.154, 2.965, -1.7]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.03, 0.166, 0.175]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_94.geometry}
            material={materials.book1}
            position={[1.154, 3.023, -1.725]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.03, 0.166, 0.175]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_99.geometry}
            material={materials.chair_stand}
            position={[-0.083, 0.322, -0.341]}
            scale={[0.045, 0.149, 0.045]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_101.geometry}
            material={materials.metalic}
            position={[-0.083, 0.198, -0.341]}
            scale={[0.062, 0.019, 0.062]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_103.geometry}
            material={materials.chair}
            position={[0.025, 0.706, -0.507]}
            rotation={[0, -0.549, 0]}
            scale={[0.323, 0.342, 0.342]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_111.geometry}
            material={materials['Material.006']}
            position={[-0.237, 1.214, -2.182]}
            rotation={[0.015, Math.PI / 2, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_113.geometry}
            material={materials['Material.006']}
            position={[0.484, 1.214, -2.161]}
            rotation={[0.015, Math.PI / 2, 0]}
          />
        </group>
      </group>
    </a.group>
  )
}

export default StudyRoom
