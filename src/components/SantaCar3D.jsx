import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

const SantaCar3D = ({ color, position, isMoving }) => {
    const group = useRef();
    const innerGroup = useRef();

    // Animate the car slightly bobbing
    useFrame((state) => {
        if (innerGroup.current) {
            const t = state.clock.getElapsedTime();
            innerGroup.current.position.y = Math.sin(t * 10) * 0.05; // Bobbing relative to main group
        }
    });

    return (
        <group ref={group} position={position}>
            <group ref={innerGroup} position={[0, 0.5, 0]}> {/* Lift up slightly so wheels are on ground */}
                {/* Car Chassis */}
                <mesh position={[0, 0.3, 0]} castShadow>
                    <boxGeometry args={[1.2, 0.6, 2.2]} />
                    <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
                </mesh>

                {/* Gold Trim */}
                <mesh position={[0, 0.3, 1.11]} castShadow>
                    <boxGeometry args={[1.25, 0.4, 0.1]} />
                    <meshStandardMaterial color="#FFD700" metalness={0.8} />
                </mesh>

                {/* Seat/Cabin Area */}
                <mesh position={[0, 0.8, -0.2]} castShadow>
                    <boxGeometry args={[0.9, 0.6, 1.2]} />
                    <meshStandardMaterial color="#5D4037" /> {/* Leather brown */}
                </mesh>

                {/* Wheels */}
                <mesh position={[-0.8, 0.25, 0.7]} rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[0.8, 0.25, 0.7]} rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[-0.8, 0.25, -0.7]} rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[0.8, 0.25, -0.7]} rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
                    <meshStandardMaterial color="#111" />
                </mesh>

                {/* Santa Head */}
                <mesh position={[0, 1.4, -0.2]} castShadow>
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshStandardMaterial color="#FFCCB0" /> {/* Skin tone */}
                </mesh>

                {/* Beard */}
                <mesh position={[0, 1.3, -0.05]} castShadow>
                    <sphereGeometry args={[0.25, 32, 32]} />
                    <meshStandardMaterial color="white" />
                </mesh>

                {/* Santa Hat */}
                <mesh position={[0, 1.6, -0.2]} rotation={[-0.2, 0, 0]} castShadow>
                    <coneGeometry args={[0.3, 0.7, 32]} />
                    <meshStandardMaterial color="#D42426" />
                </mesh>
                <mesh position={[0, 1.95, -0.25]} castShadow>
                    <sphereGeometry args={[0.08]} />
                    <meshStandardMaterial color="white" />
                </mesh>
            </group>
        </group>
    );
};

export default SantaCar3D;
