import React from 'react';
import { motion } from 'framer-motion';
import SantaCar2D from './SantaCar2D';
import { GAME_CONSTANTS } from '../utils/gameLogic';
import './RefinedTrackStyles.css';
import raceBackground from '../assets/race-background.png';

const RaceTrack2D = ({ positions, teamA, teamB, onAdjustPosition }) => {
    const steps = GAME_CONSTANTS.TOTAL_STEPS;

    // Calculate percentage for progress
    const progressA = (positions.teamA / steps) * 100;
    const progressB = (positions.teamB / steps) * 100;

    // Shared transition for perfect sync
    const moveTransition = { duration: 1.5, ease: "easeInOut" };

    const ControlButtons = ({ team, teamKey }) => (
        <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginLeft: '0.5rem',
            pointerEvents: 'auto'
        }}>
            <button
                onClick={(e) => { e.stopPropagation(); onAdjustPosition(teamKey, -1); }}
                style={{
                    width: '30px', height: '30px',
                    borderRadius: '50%', border: 'none',
                    background: 'rgba(255,255,255,0.9)', color: '#333',
                    fontSize: '1.2rem', fontWeight: 'bold',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
                title="Decrease 1 step"
            >
                -
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onAdjustPosition(teamKey, 1); }}
                style={{
                    width: '30px', height: '30px',
                    borderRadius: '50%', border: 'none',
                    background: 'rgba(255,255,255,0.9)', color: '#333',
                    fontSize: '1.2rem', fontWeight: 'bold',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
                title="Increase 1 step"
            >
                +
            </button>
        </div>
    );

    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            backgroundImage: `url(${raceBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>

            <div style={{
                position: 'absolute',
                top: '55%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%', // Reduced width slightly to give breathing room
                maxWidth: '1200px',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '8rem'
            }}>

                {/* Lane A */}
                <div style={{ position: 'relative' }}>
                    {/* Badge Container */}
                    <div style={{
                        position: 'absolute', top: '-45px', left: '0',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        zIndex: 20
                    }}>
                        <div style={{
                            background: '#D42426', color: 'white', padding: '0.5rem 1.5rem',
                            borderRadius: '20px', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                        }}>
                            {teamA.name}
                        </div>
                        <ControlButtons team={teamA} teamKey="teamA" />
                    </div>

                    {/* Road Surface (clipped) */}
                    <div className="track-road">
                        {/* Colored Progress Trail - Synced with Car */}
                        <motion.div
                            className="progress-trail"
                            style={{
                                background: `linear-gradient(90deg, transparent 0%, rgba(212, 36, 38, 0.4) 30%, rgba(212, 36, 38, 0.9) 100%)`,
                                opacity: 1
                            }}
                            initial={{ width: '7%' }}
                            animate={{ width: `${7 + (progressA * 0.86)}%` }}
                            transition={moveTransition}
                        />

                        <div className="road-marking"></div>
                        <div className="finish-line"></div>
                    </div>

                    {/* Car Layer */}
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                        <motion.div
                            initial={{ left: '7%' }}
                            animate={{ left: `${7 + (progressA * 0.86)}%` }}
                            transition={moveTransition}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translate(-50%, -65%)',
                                height: '100%',
                                zIndex: 30
                            }}
                        >
                            <div style={{ transform: 'scale(1.3)' }}>
                                <SantaCar2D color="#D42426" name={teamA.name} />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Lane B */}
                <div style={{ position: 'relative' }}>
                    {/* Badge Container */}
                    <div style={{
                        position: 'absolute', top: '-45px', left: '0',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        zIndex: 20
                    }}>
                        <div style={{
                            background: '#2F5233', color: 'white', padding: '0.5rem 1.5rem',
                            borderRadius: '20px', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                        }}>
                            {teamB.name}
                        </div>
                        <ControlButtons team={teamB} teamKey="teamB" />
                    </div>

                    {/* Road Surface */}
                    <div className="track-road">
                        <motion.div
                            className="progress-trail"
                            style={{
                                background: `linear-gradient(90deg, transparent 0%, rgba(47, 82, 51, 0.4) 30%, rgba(47, 82, 51, 0.9) 100%)`,
                                opacity: 1
                            }}
                            initial={{ width: '7%' }}
                            animate={{ width: `${7 + (progressB * 0.86)}%` }}
                            transition={moveTransition}
                        />

                        <div className="road-marking"></div>
                        <div className="finish-line"></div>
                    </div>

                    {/* Car Layer */}
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                        <motion.div
                            initial={{ left: '7%' }}
                            animate={{ left: `${7 + (progressB * 0.86)}%` }}
                            transition={moveTransition}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translate(-50%, -65%)',
                                height: '100%',
                                zIndex: 30
                            }}
                        >
                            <div style={{ transform: 'scale(1.3)' }}>
                                <SantaCar2D color="#2F5233" name={teamB.name} />
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RaceTrack2D;
