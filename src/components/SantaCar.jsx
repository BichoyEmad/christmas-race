import React from 'react';

const SantaCar = ({ color, name, isMoving }) => {
    return (
        <div style={{
            position: 'relative',
            width: '80px',
            height: '60px',
            transition: 'transform 0.5s ease-in-out',
            transform: isMoving ? 'translateX(20px)' : 'translateX(0)',
        }}>
            {/* Simple CCS Santa Car Representation */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: '30px',
                backgroundColor: color,
                borderRadius: '10px 10px 0 0',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
            }}>
                {name}
            </div>
            {/* Santa Hat */}
            <div style={{
                position: 'absolute',
                top: '-15px',
                left: '20px',
                width: '0',
                height: '0',
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderBottom: '25px solid #D42426'
            }}></div>
            <div style={{
                position: 'absolute',
                top: '-15px',
                left: '32px',
                width: '10px',
                height: '10px',
                backgroundColor: 'white',
                borderRadius: '50%'
            }}></div>
            {/* Wheels */}
            <div style={{
                position: 'absolute',
                bottom: '-10px',
                left: '10px',
                width: '20px',
                height: '20px',
                backgroundColor: '#333',
                borderRadius: '50%',
                border: '2px solid white'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '-10px',
                right: '10px',
                width: '20px',
                height: '20px',
                backgroundColor: '#333',
                borderRadius: '50%',
                border: '2px solid white'
            }}></div>
        </div>
    );
};

export default SantaCar;
