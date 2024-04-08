import React from "react";
import { Canvas } from "@react-three/fiber";
import {
    ContactShadows,
    PresentationControls,
    useGLTF,
    useTexture,
} from "@react-three/drei";

function App() {
    return (
        <Canvas
            flat
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 55, 65], fov: 10 }}
        >
            <color attach="background" args={["#FFBF77"]} />
            <PresentationControls
                global
                config={{ mass: 2, tension: 250 }}
                snap={{ mass: 2, tension: 150 }}
                polar={[-Math.PI / 4.5, Math.PI / 4.5]}
                azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
                <Model />
            </PresentationControls>
            <ContactShadows
                position={[0, -3.25, 0]}
                scale={20}
                blur={3}
                far={4}
            />
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
        <group rotation={[0, -Math.PI / 4, 0]}>
            <mesh geometry={baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>
            <mesh geometry={Road_lines.geometry} position={Road_lines.position}>
                <meshBasicMaterial color={"#E7DC00"} />
            </mesh>
        </group>
    );
}

export default App;
