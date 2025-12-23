import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Cloud, Environment as DreEnvironment, Sparkles } from '@react-three/drei';

const Environment = () => {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <directionalLight position={[-10, 20, 5]} intensity={1.5} color="#b1d8b7" castShadow />

            {/* Decorations */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Cloud position={[-4, -2, -25]} speed={0.2} opacity={0.5} />
            <Cloud position={[4, 2, -15]} speed={0.2} opacity={0.5} />

            {/* Snow Effect - using Sparkles as heavy snow */}
            <Sparkles count={2000} scale={[25, 25, 25]} size={2} speed={0.4} opacity={0.8} color="#FFF" />

            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#f0f8ff" roughness={0.8} metalness={0.1} />
            </mesh>

            {/* Background Environment map for reflections */}
            <DreEnvironment preset="park" blur={0.8} background={false} />

            {/* Fog for depth */}
            <fog attach="fog" args={['#F0F8FF', 5, 30]} />
        </>
    );
};

export default Environment;
