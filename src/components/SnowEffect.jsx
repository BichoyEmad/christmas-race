import React, { useEffect, useState } from 'react';

const SnowEffect = () => {
    const [snowflakes, setSnowflakes] = useState([]);

    useEffect(() => {
        // Create snowflakes
        const flakes = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDuration: Math.random() * 3 + 2,
            animationDelay: Math.random() * 5,
            size: Math.random() * 5 + 5
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0
        }}>
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    style={{
                        position: 'absolute',
                        top: '-10px',
                        left: `${flake.left}%`,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        background: 'white',
                        borderRadius: '50%',
                        opacity: 0.8,
                        animation: `fall ${flake.animationDuration}s linear infinite`,
                        animationDelay: `${flake.animationDelay}s`
                    }}
                />
            ))}
            <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh); }
          100% { transform: translateY(110vh); }
        }
      `}</style>
        </div>
    );
};

export default SnowEffect;
