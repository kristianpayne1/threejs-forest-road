import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
    Bounds,
    ContactShadows,
    PresentationControls,
    useGLTF,
    useTexture,
} from "@react-three/drei";
import Water from "./Water";
import useCustomBounds from "./useCustomBounds";
import { Vector3 } from "three";

function App() {
    return (
        <Canvas
            flat
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 45, 60], fov: 10 }}
        >
            <ambientLight intensity={0.8} />
            <color attach="background" args={["#FFBF77"]} />
            <PresentationControls
                global
                zoom={0.8}
                snap
                polar={[-Math.PI / 4.5, Math.PI / 4.5]}
                azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
                <Bounds fit clip margin={1}>
                    <Model />
                    <Water />
                </Bounds>
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
    const ref = useRef();

    const {
        nodes: { baked, Road_lines },
    } = useGLTF("./forest-road.glb");

    const bakedTexture = useTexture("./baked.jpg");
    bakedTexture.flipY = false;

    useCustomBounds({
        ref,
        translate: new Vector3(0, -1.5, 0),
    });

    return (
        <group rotation={[0, -Math.PI / 4, 0]}>
            <mesh ref={ref} geometry={baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>
            <mesh geometry={Road_lines.geometry} position={Road_lines.position}>
                <meshBasicMaterial color={"#E7DC00"} />
            </mesh>
        </group>
    );
}

export default App;
