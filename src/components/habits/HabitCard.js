import React from 'react';
import { motion } from 'framer-motion';
import IconButton from '../ui/IconButton';
import { Trash, Palette, Lock, Check, MoreHorizontal, AlarmClock, Star, Repeat, Flag, Calendar } from 'lucide-react';

const HabitCard = ({ habit, onToggle, onOpenMenu, onCardClick }) => {
  // Dummy value for consecutive days (0-28+)
  const consecutiveDays = 14; 

  const handleAction = (e, action) => {
    e.stopPropagation();
    action(habit.id);
  };

  const milestones = [
    { day: 7, size: 'text-lg' },
    { day: 14, size: 'text-xl' },
    { day: 21, size: 'text-2xl' },
    { day: 28, size: 'text-3xl' },
  ];

  return (
    // Start main container with flexbox
    <motion.div
      className="flex rounded-lg shadow-md mb-4 h-36 overflow-hidden"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onCardClick(habit.id)}
    >
      
      {/* Start white section (left side of the card) */}
      <div className="flex-grow bg-white pt-2 pl-4 pr-8">
        
        {/* Top row: Habit title */}
        <h3 className="text-style-subheading text-left mb-3">{habit.name}</h3>

        {/* Middle row: */}
        <div className="mb-1 flex justify-between items-center">
          {/* Check button */}
          <IconButton
            icon={Check}
            onClick={(e) => handleAction(e, onToggle)}
            isActive={habit.isCompleted}
            className={`mr-4 ${habit.isCompleted ? 'bg-orange-main text-white' : 'bg-orange-100 text-white'}`}
          />
          {/* Progress bar */}
          <div className="relative w-full h-0.5 bg-orange-100 rounded-full">
            <div 
              className="absolute top-0 left-0 h-full bg-orange-main rounded-full"
              style={{ width: `${Math.min(consecutiveDays / 28, 1) * 100}%` }}
            ></div>
            {milestones.map(({ day, size }) => (
              <div 
                key={day}
                className="absolute transform -translate-y-1/2 flex items-center justify-center"
                style={{ 
                  left: `calc(${(day / 28) * 100}% - 12px)`, 
                  top: size === 'text-3xl' ? '40%' : '50%' 
                }}
              >
                <span className={`${size} ${consecutiveDays >= day ? 'opacity-100' : 'opacity-30'}`}>
                  🔥
                </span>
              </div>
            ))}
          </div>
          </div>

          {/* Bottom row: front card icons and More button */} 
          <div className="flex justify-between items-center">
            <div className="flex">
              {habit.isHighlighted && <Star className="text-gray-200 mr-2 h-5 w-5" />}
              {habit.isRecurring && <Repeat className="text-gray-200 mr-2 h-5 w-5" />}
              {habit.priority && <Flag className="text-gray-200 mr-2 h-5 w-5" />}
              {habit.deadline && <Calendar className="text-gray-200 mr-2 h-5 w-5" />}
              {habit.reminder && <AlarmClock className="text-gray-200 mr-2 h-5 w-5" />}
              {habit.priority && <Lock className="text-gray-200 mr-2 h-5 w-5" />}
              {habit.deadline && <Palette className="text-gray-200 mr-2 h-5 w-5" />}
              {habit.reminder && <Trash className="text-gray-200 mr-2 h-5 w-5" />}
            </div>
            <IconButton 
              icon={MoreHorizontal}
              onClick={(e) => onOpenMenu(e)}
            />
          </div>
        </div>
        {/* End white section (left side of the card) */}
      
      {/* Start orange section (right side of the card) */}
      <div className="bg-orange-main w-20 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{consecutiveDays}</span>
        <span className="text-xs font-medium text-white">
          {consecutiveDays === 1 ? 'day' : 'days'}
        </span>
      </div>
      {/* End orange section (right side of the card) */}
      
    </motion.div>
    // End main container with flexbox
    
  );
};

export default HabitCard;
