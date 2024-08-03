import React from 'react';
import { motion } from 'framer-motion';
import theme from '../../styles/theme';

const IconButton = ({ icon: Icon, onClick, className, color = 'orange', label }) => {
  const iconColor = color === 'orange' ? theme.colors.primary : theme.colors.white;

  return (
    <motion.button
      className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors duration-200 ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.1, backgroundColor: theme.colors.hover }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon size={24} color={iconColor} />
      {label && (
        <span className={`mt-1 text-xs`} style={{ color: iconColor }}>
          {label}
        </span>
      )}
    </motion.button>
  );
};

export default IconButton;