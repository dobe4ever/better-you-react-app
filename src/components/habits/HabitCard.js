// src/components/habits/HabitCard.js

import React from 'react';
import { RiCheckLine, RiMoreLine, RiStarLine, RiRepeatLine, RiFlag2Line, RiCalendarLine, RiAlarmLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import IconButton from '../ui/IconButton';

const HabitCard = ({ habit, onToggle, onOpenMenu, onCardClick }) => {
  const categoryColors = {
    personal: 'bg-blue-100 border-blue-300',
    health: 'bg-green-100 border-green-300',
    financial: 'bg-yellow-100 border-yellow-300',
  };

  const handleAction = (e, action) => {
    e.stopPropagation();
    action(habit.id);
  };

  return (
    <motion.div
      className={`p-4 rounded-lg shadow-md mb-4 border-2 ${categoryColors[habit.category]} ${habit.color ? `border-l-4 border-l-${habit.color}-500` : ''}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onCardClick(habit.id)}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <IconButton
              icon={RiCheckLine}
              onClick={(e) => handleAction(e, onToggle)}
              isActive={habit.isCompleted}
              className={`mr-3 ${habit.isCompleted ? 'bg-green-500 text-white' : 'border-2 border-gray-300'}`}
            />
            <div>
              <h3 className="font-semibold">{habit.name}</h3>
              <p className="text-sm text-gray-500">{habit.category}</p>
            </div>
          </div>
          <IconButton 
            icon={RiMoreLine}
            onClick={(e) => onOpenMenu(e)}
          />
        </div>
        <div className="flex justify-start items-center mt-auto">
          {habit.isHighlighted && <RiStarLine className="text-yellow-500 mr-2" />}
          {habit.isRecurring && <RiRepeatLine className="text-blue-500 mr-2" />}
          {habit.priority && <RiFlag2Line className="text-red-500 mr-2" />}
          {habit.deadline && <RiCalendarLine className="text-purple-500 mr-2" />}
          {habit.reminder && <RiAlarmLine className="text-green-500 mr-2" />}
        </div>
      </div>
    </motion.div>
  );
};

export default HabitCard;
