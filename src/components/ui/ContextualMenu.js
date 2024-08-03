import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import theme from '../../styles/theme';

const ContextualMenu = ({ isOpen, onClose, position, items }) => {
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const getMenuPosition = () => {
    switch (position) {
      case 'top-left':
        return { top: 0, left: 0 };
      case 'top-right':
        return { top: 0, right: 0 };
      case 'bottom-left':
        return { bottom: 0, left: 0 };
      case 'bottom-right':
        return { bottom: 0, right: 0 };
      default:
        return {};
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              zIndex: 1000,
              ...getMenuPosition(),
              backgroundColor: theme.colors.white,
              borderRadius: theme.spacing.base,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            className="p-2 w-64"
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-200"
                onClick={() => {
                  item.onClick();
                  onClose();
                }}
                whileHover={{ backgroundColor: theme.colors.hover }}
              >
                {item.icon && (
                  <item.icon
                    size={20}
                    className="mr-4"
                    color={theme.colors.primary}
                  />
                )}
                <span className="text-black">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContextualMenu;