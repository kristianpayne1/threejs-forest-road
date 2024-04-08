import React from "react";
import { Canvas } from "@react-three/fiber";
import {
    Box,
    PresentationControls,
    ContactShadows,
    Environment,
} from "@react-three/drei";

function App() {
    return (
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }}>
            <color attach="background" args={["#FFBF77"]} />
            <ambientLight intensity={0.5} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                shadow-mapSize={2048}
                castShadow
            />
            <PresentationControls
                global
                config={{ mass: 2, tension: 250 }}
                snap={{ mass: 2, tension: 150 }}
                polar={[-Math.PI / 3, Math.PI / 3]}
                azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
                <Box />
            </PresentationControls>
            {/* <ContactShadows
                position={[0, -1.4, 0]}
                opacity={0.75}
                scale={10}
                blur={3}
                far={4}
            /> */}
            <Environment preset="sunset" />
        </Canvas>
    );
}

export default App;
