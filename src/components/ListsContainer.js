// src/components/ListsContainer.js

import React from 'react';
import HabitsList from './habits/HabitsList';
import TodosList from './todos/TodosList';

const ListsContainer = ({ habits, todos, onToggleHabit, onToggleTodo, onUpdateHabit, onDeleteHabit }) => {
  return (
    <div className="md:flex md:space-x-4">
      <div className="md:w-1/2">
        <HabitsList 
          habits={habits} 
          onToggle={onToggleHabit}
          onUpdate={onUpdateHabit}
          onDelete={onDeleteHabit}
        />
      </div>
      <div className="md:w-1/2">
        <TodosList 
          todos={todos} 
          onToggle={onToggleTodo}
        />
      </div>
    </div>
  );
};

export default ListsContainer;