// src/components/habits/HabitsList.js

import React, { useState, useCallback } from 'react';
import List from '../ui/List';
import HabitCard from './HabitCard';
import HabitCardBack from './HabitCardBack';
import ContextualMenu from '../ui/ContextualMenu';
import { RiStarLine, RiRepeatLine, RiFlag2Line, RiCalendarLine, RiEditLine, RiLockLine, RiPaletteLine, RiAlarmLine, RiDeleteBinLine } from 'react-icons/ri';

const HabitsList = ({ habits, onToggle, onUpdate, onDelete }) => {
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedHabitId, setSelectedHabitId] = useState(null);

  const handleCardClick = useCallback((habitId) => {
    const habit = habits.find(h => h.id === habitId);
    setSelectedHabit(habit);
  }, [habits]);

  const handleOpenMenu = useCallback((event, habitId) => {
    event.stopPropagation();
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      x: rect.right,
      y: rect.bottom
    });

    setSelectedHabitId(habitId);
    setMenuOpen(true);
  }, [habits]);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
    setSelectedHabitId(null);
  }, []);

  const handleMenuItemClick = useCallback((action) => {
    const habit = habits.find(h => h.id === selectedHabitId);
    if (!habit) return;

    let updatedHabit;
    switch (action) {
      case 'Highlight':
        updatedHabit = { ...habit, isHighlighted: !habit.isHighlighted };
        break;
      case 'Recurring':
        updatedHabit = { ...habit, isRecurring: !habit.isRecurring };
        break;
      case 'Priority':
        updatedHabit = { ...habit, priority: !habit.priority };
        break;
      case 'Set Deadline':
        updatedHabit = { ...habit, deadline: new Date().toISOString() };
        break;
      case 'Set Reminder':
        updatedHabit = { ...habit, reminder: new Date().toISOString() };
        break;
      case 'Delete':
        onDelete(selectedHabitId);
        break;
      default:
        console.log(`Action ${action} not implemented`);
        return;
    }

    if (updatedHabit) {
      onUpdate(updatedHabit);
    }

    handleCloseMenu();
  }, [selectedHabitId, habits, onUpdate, onDelete, handleCloseMenu]);

  const menuItems = [
    { icon: RiStarLine, label: 'Highlight', onClick: () => handleMenuItemClick('Highlight') },
    { icon: RiRepeatLine, label: 'Recurring', onClick: () => handleMenuItemClick('Recurring') },
    { icon: RiFlag2Line, label: 'Priority', onClick: () => handleMenuItemClick('Priority') },
    { icon: RiCalendarLine, label: 'Set Deadline', onClick: () => handleMenuItemClick('Set Deadline') },
    { icon: RiEditLine, label: 'Edit', onClick: () => handleMenuItemClick('Edit') },
    { icon: RiLockLine, label: 'Private/Public', onClick: () => handleMenuItemClick('Private/Public') },
    { icon: RiPaletteLine, label: 'Color', onClick: () => handleMenuItemClick('Color') },
    { icon: RiAlarmLine, label: 'Set Reminder', onClick: () => handleMenuItemClick('Set Reminder') },
    { icon: RiDeleteBinLine, label: 'Delete', onClick: () => handleMenuItemClick('Delete') },
  ];

  return (
    <>
      <List
        title="Habits"
        items={habits}
        renderItem={(habit) => (
          <div id={`habit-${habit.id}`} key={habit.id}>
            <HabitCard
              habit={habit}
              onToggle={onToggle}
              onOpenMenu={(event) => handleOpenMenu(event, habit.id)}
              onCardClick={handleCardClick}
            />
          </div>
        )}
      />
      {selectedHabit && (
        <HabitCardBack
          habit={selectedHabit}
          onClose={() => setSelectedHabit(null)}
        />
      )}
      <ContextualMenu
        isOpen={menuOpen}
        onClose={handleCloseMenu}
        position={menuPosition}
        items={menuItems}
      />
    </>
  );
};

export default HabitsList;
