import React from 'react';
import { motion } from 'framer-motion';
import IconButton from '../ui/IconButton';
import { Check, MoreVertical, AlarmClock, Star, Repeat, Flag, Calendar } from 'lucide-react';

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
    <motion.div
      className="p-4 rounded-lg shadow-md mb-4 border-0 bg-white border-orange-main"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onCardClick(habit.id)}
    >
      <div className="flex items-center mb-3">
        <IconButton
          icon={Check}
          onClick={(e) => handleAction(e, onToggle)}
          isActive={habit.isCompleted}
          className={`mr-4 ${habit.isCompleted ? 'bg-orange-main text-white' : 'bg-orange-100 text-white'}`}
        />
        <h3 className="text-style-bastText flex-grow">{habit.name}</h3>
        <IconButton 
          icon={MoreVertical}
          onClick={(e) => onOpenMenu(e)}
        />
      </div>

      <div className="flex items-center mb-2">
        <div className="flex-grow mr-4">
          {/* Progress line with progressively larger fire emoji milestones */}
          <div className="relative w-full h-2 bg-gray-200 rounded-full">
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
        {/* Refined streak counter */}
        <div className="flex flex-col items-center justify-center ml-2 min-w-[60px]">
          <span className="text-2xl font-bold text-orange-500">{consecutiveDays}</span>
          <span className="text-xs font-medium text-gray-600">
            {consecutiveDays === 1 ? 'day' : 'days'}
          </span>
        </div>
      </div>

      <div className="flex mt-2 mr-4">
        {habit.isHighlighted && <Star className="text-yellow-700 mr-2 h-5 w-5" />}
        {habit.isRecurring && <Repeat className="text-blue-700 mr-2 h-5 w-5" />}
        {habit.priority && <Flag className="text-red-700 mr-2 h-5 w-5" />}
        {habit.deadline && <Calendar className="text-green-700 mr-2 h-5 w-5" />}
        {habit.reminder && <AlarmClock className="text-orange-600 mr-2 h-5 w-5" />}
      </div>
    </motion.div>
  );
};

export default HabitCard;