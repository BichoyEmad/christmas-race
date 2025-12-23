import React from 'react';
import { motion } from 'framer-motion';

const SantaCar2D = ({ color, name }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            >
                <img
                    src="/santa_sleigh.png"
                    alt="Santa Sleigh"
                    style={{
                        width: '180px',
                        height: 'auto',
                        filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.2))'
                    }}
                />
            </motion.div>
        </div>
    );
};

export default SantaCar2D;