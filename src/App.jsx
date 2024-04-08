import React from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, useGLTF, useTexture } from "@react-three/drei";

function App() {
    return (
        <Canvas flat shadows camera={{ position: [0, 25, 25], fov: 25 }}>
            <color attach="background" args={["#FFBF77"]} />
            <PresentationControls
                global
                config={{ mass: 2, tension: 250 }}
                snap={{ mass: 2, tension: 150 }}
                polar={[-Math.PI / 3, Math.PI / 3]}
                azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
                <Model />
            </PresentationControls>
            {/* <ContactShadows
                position={[0, -1.4, 0]}
                opacity={0.75}
                scale={10}
                blur={3}
                far={4}
            /> */}
        </Canvas>
    );
}

function Model() {
    const {
        nodes: { baked, Road_lines },
    } = useGLTF("./forest-road.glb");

    const bakedTexture = useTexture("./baked.jpg");
    bakedTexture.flipY = false;

    return (
        <group>
            <mesh geometry={baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>
            <mesh
                geometry={Road_lines.geometry}
                position={Road_lines.position}
            />
        </group>
    );
}

export default App;
