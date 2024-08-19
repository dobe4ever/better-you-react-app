// src/components/habits/HabitCard.js

import React from 'react';
import { motion } from 'framer-motion';
import IconButton from '../ui/IconButton';
import { Check, MoreVertical, AlarmClock, Star, Repeat, Flag, Calendar } from 'lucide-react';

const HabitCard = ({ habit, onToggle, onOpenMenu, onCardClick }) => {

  const handleAction = (e, action) => {
    e.stopPropagation();
    action(habit.id);
  };

  return (
    <motion.div
      className={"p-2 rounded-full shadow-md mb-4 border-2 bg-white border-orange-main"}
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
              className={`mr-4 ml-3 ${habit.isCompleted ? 'bg-orange-main text-white' : 'bg-white text-orange-200 border-2 border-orange-100'}`}
            />
            <div>
              <h3 className="text-style-bastText">{habit.name}</h3>
                
              <hr className="mb-2 border-1 border-orange-main" /> 
                
              <div className="flex justify-start items-center">
                {habit.isHighlighted && <Star className="text-yellow-700 mr-2 h-5 w-5" />}
                {habit.isRecurring && <Repeat className="text-blue-700 mr-2 h-5 w-5" />}
                {habit.priority && <Flag className="text-red-700 mr-2 h-5 w-5" />}
                {habit.deadline && <Calendar className="text-green-700 mr-2 h-5 w-5" />}
                {habit.reminder && <AlarmClock className="text-orange-600 mr-2 h-5 w-5" />}
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
