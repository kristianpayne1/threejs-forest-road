import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Color, MeshPhysicalMaterial } from "three";
import CustomShaderMaterial from "three-custom-shader-material";

// shaders
import vertexShader from "./shaders/water/vertex.glsl";
import fragmentShader from "./shaders/water/fragment.glsl";
import { patchShaders } from "gl-noise/build/glNoise.m";

export default function Water() {
    const thickness = 0.01;
    const material = useRef();

    useFrame((state) => {
        if (material?.current) {
            material.current.uniforms.uTime.value =
                -state.clock.elapsedTime / 5;
        }
    });

    return (
        <mesh
            castShadow
            receiveShadow
            position={[1.55, 0.3, 1.75]}
            rotation-x={-Math.PI / 2}
            rotation-z={Math.PI / 4}
        >
            <boxGeometry args={[7.8, 1.5, thickness, 50, 10, 1]} />
            <CustomShaderMaterial
                ref={material}
                baseMaterial={MeshPhysicalMaterial}
                vertexShader={patchShaders(vertexShader)}
                fragmentShader={fragmentShader}
                color={new Color("#52a7f7")}
                roughness={0.25}
                metalness={0}
                ior
                reflectivity={0.5}
                transparent
                flatShading
                uniforms={{
                    uTime: { value: 0 },
                    waterColor: {
                        value: new Color("#52a7f7").convertLinearToSRGB(),
                    },
                    waterHighlight: {
                        value: new Color("#b3ffff").convertLinearToSRGB(),
                    },
                    uHeight: {
                        value: thickness,
                    },
                }}
            />
        </mesh>
    );
}
