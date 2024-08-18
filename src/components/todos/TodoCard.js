// src/components/TodoCard.js
import React from 'react';
import { RiCheckLine, RiMoreLine, RiEditLine, RiDeleteBinLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const TodoCard = ({ todo, onToggle, onOpenMenu }) => {
  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-md mb-4 border-2 border-gray-200"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center cursor-pointer
              ${todo.isCompleted ? 'bg-app-orange border-app-orange' : 'border-gray-300'}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(todo.id);
            }}
          >
            {todo.isCompleted && <RiCheckLine className="text-white" />}
          </div>
          <h3 className="font-semibold">{todo.title}</h3>
        </div>
        <div className="flex items-center">
          <RiEditLine 
            className="text-gray-400 cursor-pointer mr-2" 
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit todo');
            }} 
          />
          <RiDeleteBinLine 
            className="text-gray-400 cursor-pointer mr-2" 
            onClick={(e) => {
              e.stopPropagation();
              console.log('Delete todo');
            }} 
          />
          <RiMoreLine 
            className="text-gray-400 cursor-pointer" 
            onClick={(e) => {
              e.stopPropagation();
              onOpenMenu(todo.id);
            }} 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TodoCard;