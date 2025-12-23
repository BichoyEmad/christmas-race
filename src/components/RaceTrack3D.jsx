import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import SantaCar3D from './SantaCar3D';
import Environment from './Environment';
import { GAME_CONSTANTS } from '../utils/gameLogic';
import * as THREE from 'three';

const RaceTrack3D = ({ positions, teamA, teamB }) => {

    // Calculate Z position based on game constants
    // Track length = 20 steps. Let's say one step is 2 units.
    // Start Z = 20, End Z = -20

    const TRACK_LENGTH = 40;
    const START_Z = TRACK_LENGTH / 2;
    const STEP_SIZE = TRACK_LENGTH / GAME_CONSTANTS.TOTAL_STEPS;

    const getZPosition = (steps) => {
        return START_Z - (steps * STEP_SIZE);
    };

    return (
        <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
            <Canvas shadows camera={{ position: [0, 8, 35], fov: 60 }}>
                <Environment />

                {/* Spot Light Following Center */}
                <spotLight position={[0, 20, 20]} angle={0.5} penumbra={1} intensity={1} castShadow />

                {/* Track Markings */}
                {Array.from({ length: GAME_CONSTANTS.TOTAL_STEPS + 1 }).map((_, i) => (
                    <mesh key={i} position={[0, -0.9, START_Z - (i * STEP_SIZE)]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                        <planeGeometry args={[10, 0.2]} />
                        <meshStandardMaterial color={i === GAME_CONSTANTS.TOTAL_STEPS ? "#D42426" : "rgba(200,200,200,0.5)"} transparent />
                    </mesh>
                ))}

                {/* Team A Car */}
                <SantaCar3D
                    color="#D42426"
                    position={[-2, 0, getZPosition(positions.teamA)]}
                />
                <Text
                    position={[-2, 2.5, getZPosition(positions.teamA)]}
                    fontSize={0.5}
                    color="#D42426"
                    anchorX="center"
                    anchorY="middle"
                >
                    {teamA.name}
                </Text>

                {/* Team B Car */}
                <SantaCar3D
                    color="#2F5233"
                    position={[2, 0, getZPosition(positions.teamB)]}
                />
                <Text
                    position={[2, 2.5, getZPosition(positions.teamB)]}
                    fontSize={0.5}
                    color="#2F5233"
                    anchorX="center"
                    anchorY="middle"
                >
                    {teamB.name}
                </Text>

                {/* Finish Line Arch */}
                <group position={[0, 0, getZPosition(GAME_CONSTANTS.TOTAL_STEPS)]}>
                    <mesh position={[-4, 2, 0]}>
                        <boxGeometry args={[0.5, 4, 0.5]} />
                        <meshStandardMaterial color="#8B4513" />
                    </mesh>
                    <mesh position={[4, 2, 0]}>
                        <boxGeometry args={[0.5, 4, 0.5]} />
                        <meshStandardMaterial color="#8B4513" />
                    </mesh>
                    <mesh position={[0, 4, 0]}>
                        <boxGeometry args={[8.5, 0.5, 0.5]} />
                        <meshStandardMaterial color="#D42426" />
                    </mesh>
                    <Text position={[0, 4.5, 0]} fontSize={1} color="#FFF" anchorX="center" anchorY="middle">
                        FINISH
                    </Text>
                </group>

                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2 - 0.1} minPolarAngle={0.5} />
            </Canvas>
        </div>
    );
};

export default RaceTrack3D;
