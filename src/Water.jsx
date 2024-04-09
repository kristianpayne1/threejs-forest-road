import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Color, DoubleSide, MeshPhongMaterial } from "three";
import CustomShaderMaterial from "three-custom-shader-material";

// shaders
import vertexShader from "./shaders/water/vertex.glsl";
import fragmentShader from "./shaders/water/fragment.glsl";
import { patchShaders } from "gl-noise/build/glNoise.m";

export default function Water() {
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
            position={[1.5, 0.3, 1.7]}
            rotation-x={-Math.PI / 2}
            rotation-z={Math.PI / 4}
        >
            <boxGeometry args={[7.8, 1.5, 0.01, 64, 32, 1]} />
            <CustomShaderMaterial
                ref={material}
                baseMaterial={MeshPhongMaterial}
                vertexShader={patchShaders(vertexShader)}
                fragmentShader={fragmentShader}
                side={DoubleSide}
                color={"blue"}
                shininess={1}
                flatShading={true}
                uniforms={{
                    uTime: { value: 0 },
                    waterColor: {
                        value: new Color("#52a7f7").convertLinearToSRGB(),
                    },
                    waterHighlight: {
                        value: new Color("#b3ffff").convertLinearToSRGB(),
                    },
                }}
            />
        </mesh>
    );
}
