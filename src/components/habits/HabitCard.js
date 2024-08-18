// src/components/habits/HabitCard.js

import React from 'react';
import { RiStarLine, RiRepeatLine, RiFlag2Line, RiCalendarLine, RiAlarmLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import IconButton from '../ui/IconButton';

import { Check, MoreVertical } from 'lucide-react';

const HabitCard = ({ habit, onToggle, onOpenMenu, onCardClick }) => {

  const handleAction = (e, action) => {
    e.stopPropagation();
    action(habit.id);
  };

  return (
    <motion.div
      className={"p-4 rounded-lg shadow-md mb-4 border-2 bg-white border-app-orange"}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onCardClick(habit.id)}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center my-2">
          <div className="flex items-center">
            <IconButton
              icon={Check}
              onClick={(e) => handleAction(e, onToggle)}
              isActive={habit.isCompleted}
              className={`mr-3 ${habit.isCompleted ? 'bg-app-orange text-white' : 'border-2 border-app-orange'}`}
            />
            <div>
              <h3 className="font-semibold">{habit.name}</h3>
                
              <hr className="my-4 border-app-orange" /> 
                
              <div className="flex justify-start items-center">
                {habit.isHighlighted && <RiStarLine className="text-yellow-500 mr-2 h-6 w-6" />}
                {habit.isRecurring && <RiRepeatLine className="text-blue-500 mr-2 h-6 w-6" />}
                {habit.priority && <RiFlag2Line className="text-red-500 mr-2 h-6 w-6" />}
                {habit.deadline && <RiCalendarLine className="text-purple-500 mr-2 h-6 w-6" />}
                {habit.reminder && <RiAlarmLine className="text-green-500 mr-2 h-6 w-6" />}
              </div>
            </div>
          </div>
          <IconButton 
            icon={MoreVertical}
            onClick={(e) => onOpenMenu(e)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default HabitCard;
