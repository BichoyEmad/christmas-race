import React from 'react';
import SantaCar from './SantaCar';
import { GAME_CONSTANTS } from '../utils/gameLogic';

const RaceTrack = ({ positions, teamA, teamB }) => {
    const steps = Array.from({ length: GAME_CONSTANTS.TOTAL_STEPS + 1 });

    return (
        <div style={{
            width: '100%',
            maxWidth: '1000px',
            padding: '2rem',
            position: 'relative',
        }}>
            {/* Track for Team A */}
            <div style={{ marginBottom: '2rem', position: 'relative' }}>
                <div style={{
                    height: '10px',
                    background: '#ddd',
                    borderRadius: '5px',
                    position: 'relative',
                    top: '30px',
                    width: '100%'
                }}>
                    {/* Finish Line */}
                    <div style={{
                        position: 'absolute',
                        right: 0,
                        top: '-10px',
                        height: '30px',
                        width: '5px',
                        background: 'repeating-linear-gradient(45deg, #000, #000 5px, #fff 5px, #fff 10px)'
                    }}></div>
                </div>

                {/* Player A */}
                <div style={{
                    transform: `translateX(${(positions.teamA / GAME_CONSTANTS.TOTAL_STEPS) * 90}%)`,
                    transition: 'transform 1s ease-in-out'
                }}>
                    <SantaCar color="#D42426" name={teamA.name} isMoving={false} />
                </div>
            </div>

            {/* Track for Team B */}
            <div style={{ marginTop: '4rem', position: 'relative' }}>
                <div style={{
                    height: '10px',
                    background: '#ddd',
                    borderRadius: '5px',
                    position: 'relative',
                    top: '30px',
                    width: '100%'
                }}>
                    <div style={{
                        position: 'absolute',
                        right: 0,
                        top: '-10px',
                        height: '30px',
                        width: '5px',
                        background: 'repeating-linear-gradient(45deg, #000, #000 5px, #fff 5px, #fff 10px)'
                    }}></div>
                </div>

                {/* Player B */}
                <div style={{
                    transform: `translateX(${(positions.teamB / GAME_CONSTANTS.TOTAL_STEPS) * 90}%)`,
                    transition: 'transform 1s ease-in-out'
                }}>
                    <SantaCar color="#2F5233" name={teamB.name} isMoving={false} />
                </div>
            </div>

            {/* Step Markers (Optional, maybe just simple ticks) */}
            <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 40px', // Offset for car width approx
                pointerEvents: 'none',
                opacity: 0.5
            }}>
                {steps.map((_, i) => (
                    <div key={i} style={{ width: '2px', height: '10px', background: '#ccc' }}></div>
                ))}
            </div>
        </div>
    );
};

export default RaceTrack;
