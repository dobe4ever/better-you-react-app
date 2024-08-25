import React from 'react';
import { RiCheckLine, RiMoreLine } from 'react-icons/ri';

const Card = ({ title, isCompleted, icon, onToggle, onOpenMenu }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm mb-2">
      <div className="flex items-center">
        <div 
          className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center cursor-pointer
            ${isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
          onClick={onToggle}
        >
          {isCompleted && <RiCheckLine className="text-white" />}
        </div>
        {icon && <span className="mr-2">{icon}</span>}
        <span className={`font-medium ${isCompleted ? 'line-through text-gray-400' : ''}`}>{title}</span>
      </div>
      <RiMoreLine className="text-gray-400 cursor-pointer" onClick={onOpenMenu} />
    </div>
  );
};

export default Card;