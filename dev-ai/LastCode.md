`src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
```

`src/index.js`
```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`src/App.js`
```js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import UserProfile from './components/UserProfile';
import ListsContainer from './components/ListsContainer';
import LoginSignupForm from './components/LoginSignupForm';
import { habits as initialHabits, todos as initialTodos } from './data/dummyData';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [habits, setHabits] = useState(initialHabits);
  const [todos, setTodos] = useState(initialTodos);

  const toggleHabit = (id) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit
    ));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  if (!isLoggedIn) {
    return <LoginSignupForm onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="pt-16 pb-20">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Routes>
              <Route path="/" element={
                <>
                  <UserProfile />
                  <ListsContainer
                    habits={habits}
                    todos={todos}
                    onToggleHabit={toggleHabit}
                    onToggleTodo={toggleTodo}
                  />
                </>
              } />
              <Route path="/news" element={<div>News Section</div>} />
              <Route path="/add" element={<div>Add Section</div>} />
              <Route path="/coach" element={<div>AI Coach Section</div>} />
              <Route path="/more" element={<div>More Section</div>} />
            </Routes>
          </div>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
```

`src/components/LoginSignupForm.js`
```js
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const LoginSignupForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(); // Call the onLogin function passed as a prop
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login / Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full bg-app-orange hover:bg-orange-700 text-white">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginSignupForm;
```

`src/components/Card.js`
```js
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
```

`src/components/UserProfile.js`
```js
import React from 'react';

const UserProfile = () => {
  // Example progress value (13 out of 20)
  const progress = (13 / 20) * 100;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="bg-app-orange text-white p-4 flex flex-col items-center">
        <div className="w-24 h-24 bg-white rounded-full mb-2 overflow-hidden">
          {/* Replace with actual user avatar */}
          <img 
            src="https://via.placeholder.com/150" 
            alt="User Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold">John Doe</h2>
      </div>
      <div className="p-4">
        <div className="mb-2 text-center text-gray-600">13 out of 20 Today</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-app-orange h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
```

`src/components/ListsContainer.js`
```js
import React, { useState } from 'react';
import HabitsList from './habits/HabitsList';
import TodosList from './todos/TodosList';
import { habits as initialHabits, todos as initialTodos } from '../data/dummyData';


const ListsContainer = () => {
  const [habits, setHabits] = useState(initialHabits);
  const [todos, setTodos] = useState(initialTodos);

  const onToggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit
    ));
  };

  const onToggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const onHighlightHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, isHighlighted: !habit.isHighlighted } : habit
    ));
  };

  const onSetRecurringHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, isRecurring: !habit.isRecurring } : habit
    ));
  };

  const onDeleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  return (
    <div className="md:flex md:space-x-4">
      <div className="md:w-1/2">
        <HabitsList 
          habits={habits} 
          onToggle={onToggleHabit}
          onHighlight={onHighlightHabit}
          onSetRecurring={onSetRecurringHabit}
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
```

`src/components/common/IconButton.js`
```js
import React from 'react';
import { motion } from 'framer-motion';

const IconButton = ({ icon: Icon, onClick, className, isActive }) => {
  return (
    <motion.button
      className={`p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 ${
        isActive ? 'text-app-orange' : 'text-gray-600'
      } ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon size={24} />
    </motion.button>
  );
};

export default IconButton;
```

`src/components/common/List.js`
```js
import React, { useState } from 'react';

const List = ({ title, items, renderItem }) => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const filteredItems = hideCompleted ? items.filter(item => !item.isCompleted) : items;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">{title}</h2>
        <button 
          className="text-sm text-gray-600"
          onClick={() => setHideCompleted(!hideCompleted)}
        >
          {hideCompleted ? 'Show Completed' : 'Hide Completed'}
        </button>
      </div>
      <div>
        {filteredItems.map((item) => (
          <div key={item.id}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
```

`src/components/common/ContextualMenu.js`
```js
// src/components/common/ContextualMenu.js

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IconButton from './IconButton';

const ContextualMenu = ({ isOpen, onClose, position, items }) => {
  const menuRef = useRef();
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

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

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top, left;

      if (typeof position === 'string') {
        // Handle predefined positions
        switch (position) {
          case 'top-left':
            top = 0;
            left = 0;
            break;
          case 'top-right':
            top = 0;
            left = viewportWidth - menuRect.width;
            break;
          case 'bottom-left':
            top = viewportHeight - menuRect.height;
            left = 0;
            break;
          case 'bottom-right':
            top = viewportHeight - menuRect.height;
            left = viewportWidth - menuRect.width;
            break;
          default:
            top = 0;
            left = 0;
        }
      } else {
        // Handle exact coordinates
        top = position.y;
        left = position.x;

        // Adjust if menu would be off-screen
        if (left + menuRect.width > viewportWidth) {
          left = viewportWidth - menuRect.width - 10;
        }
        if (left < 10) {
          left = 10;
        }
        if (top + menuRect.height > viewportHeight) {
          top = viewportHeight - menuRect.height - 10;
        }
        if (top < 10) {
          top = 10;
        }
      }

      setMenuPosition({ top, left });
    }
  }, [isOpen, position]);

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              zIndex: 1000,
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
            className="bg-white rounded-lg shadow-xl p-2 w-64 z-50"
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-200"
                onClick={() => item.onClick()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon && (
                  <IconButton
                    icon={item.icon}
                    className="mr-4 text-app-orange"
                  />
                )}
                <span className="text-gray-800">{item.label}</span>
                {item.options && (
                  <select className="ml-auto bg-transparent border-none">
                    {item.options.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContextualMenu;
```

`src/components/layout/Header.js`
```js
// src/components/layout/Header.js

import React, { useState } from 'react';
import { RiMenu2Line, RiNotification3Line, RiUser3Line, RiHome5Line, RiSettings4Line, RiInformationLine, RiEditLine, RiFileListLine, RiLogoutBoxRLine } from 'react-icons/ri';
import ContextualMenu from '../common/ContextualMenu';
import IconButton from '../common/IconButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const menuItems = [
    { icon: RiHome5Line, label: 'Home', onClick: () => console.log('Home clicked') },
    { icon: RiSettings4Line, label: 'Settings', onClick: () => console.log('Settings clicked') },
    { icon: RiInformationLine, label: 'About', onClick: () => console.log('About clicked') },
  ];

  const profileMenuItems = [
    { icon: RiEditLine, label: 'Edit Profile', onClick: () => console.log('Edit Profile clicked') },
    { icon: RiFileListLine, label: 'My Progress', onClick: () => console.log('My Progress clicked') },
    { icon: RiSettings4Line, label: 'Preferences', onClick: () => console.log('Preferences clicked') },
    { icon: RiLogoutBoxRLine, label: 'Logout', onClick: () => console.log('Logout clicked') },
  ];

  const notificationItems = [
    { label: 'New achievement unlocked!', onClick: () => console.log('Notification 1 clicked') },
    { label: 'John commented on your progress', onClick: () => console.log('Notification 2 clicked') },
    { label: 'You have a new message', onClick: () => console.log('Notification 3 clicked') },
  ];

  const handleNotificationClick = () => {
    setIsNotificationMenuOpen(true);
    setNotificationCount(0);
  };

  return (
    <>
      <header className="bg-app-orange text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center">
          <IconButton icon={RiMenu2Line} onClick={() => setIsMenuOpen(true)} className="mr-3" />
          <h1 className="text-xl font-bold">BetterYou</h1>
        </div>
        <div className="flex items-center">
          <div className="relative mr-4">
            <IconButton icon={RiNotification3Line} onClick={handleNotificationClick} />
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </div>
          <IconButton icon={RiUser3Line} onClick={() => setIsProfileMenuOpen(true)} />
        </div>
      </header>
      <ContextualMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        items={menuItems}
        position="top-left"
      />
      <ContextualMenu
        isOpen={isProfileMenuOpen}
        onClose={() => setIsProfileMenuOpen(false)}
        items={profileMenuItems}
        position="top-right"
      />
      <ContextualMenu
        isOpen={isNotificationMenuOpen}
        onClose={() => setIsNotificationMenuOpen(false)}
        items={notificationItems}
        position="top-right"
      />
    </>
  );
};

export default Header;
```

`src/components/layout/BottomNav.js`
```js
// src/components/layout/BottomNav.js

import React, { useState } from 'react';
import { RiHome5Line, RiNewspaperLine, RiRobotLine, RiAddLine, RiApps2Line, RiCalendarLine, RiBarChartBoxLine, RiTeamLine, RiGroupLine, RiBookOpenLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import ContextualMenu from '../common/ContextualMenu';
import IconButton from '../common/IconButton';

const BottomNav = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const navItems = [
    { icon: RiHome5Line, label: 'Home', path: '/' },
    { icon: RiNewspaperLine, label: 'News', path: '/news' },
    { icon: RiAddLine, label: '', path: '/add', isSpecial: true },
    { icon: RiRobotLine, label: 'AI Coach', path: '/coach' },
    { icon: RiApps2Line, label: 'More', action: () => setShowMenu(true) },
  ];

  const moreMenuItems = [
    { icon: RiCalendarLine, label: 'Calendar', onClick: () => console.log('Calendar clicked') },
    { icon: RiBarChartBoxLine, label: 'Stats', onClick: () => console.log('Stats clicked') },
    { icon: RiTeamLine, label: 'Community', onClick: () => console.log('Community clicked') },
    { icon: RiGroupLine, label: 'Collaboration', onClick: () => console.log('Collaboration clicked') },
    { icon: RiBookOpenLine, label: 'Courses', onClick: () => console.log('Courses clicked') },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-app-orange shadow-lg flex justify-around items-center h-16 px-2">
        {navItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center h-full py-1"
            onClick={item.action || (() => navigate(item.path))}
          >
            {item.isSpecial ? (
              <div className="bg-white rounded-full p-3 hover:bg-gray-100 transition-colors duration-200">
                <IconButton icon={item.icon} className="text-app-orange" />
              </div>
            ) : (
              <>
                <IconButton icon={item.icon} className="text-white" />
                <span className="text-xs text-white mt-1">{item.label}</span>
              </>
            )}
          </div>
        ))}
      </div>
      <ContextualMenu
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        items={moreMenuItems}
        position="bottom-right"
      />
    </>
  );
};

export default BottomNav;
```

`src/components/todos/TodoCard.js`
```js
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
              ${todo.isCompleted ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}
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
```

`src/components/todos/TodosList.js`
```js
import React, { useState, useCallback } from 'react';
import List from '../common/List';
import TodoCard from './TodoCard';
import ContextualMenu from '../common/ContextualMenu';

const TodosList = ({ todos, onToggle, onOpenMenu }) => {
  return (
    <List
      title="To-Dos"
      items={todos}
      renderItem={(todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onOpenMenu={() => onOpenMenu(todo.id)}
        />
      )}
    />
  );
};

export default TodosList;
```

`src/components/habits/HabitCardBack.js`
```js
// src/components/HabitCardBack.js
import React from 'react';
import { motion } from 'framer-motion';
import { RiCloseLine } from 'react-icons/ri';

const HabitCardBack = ({ habit, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{habit.name}</h2>
          <RiCloseLine className="text-2xl cursor-pointer" onClick={onClose} />
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Description</h3>
          <p>{habit.description}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Benefits</h3>
          <ul className="list-disc pl-5">
            {habit.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Tips</h3>
          <ul className="list-disc pl-5">
            {habit.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Related Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habit.relatedProducts.map((product, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>
        
        {habit.videoContent && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{habit.videoContent.title}</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={habit.videoContent.embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HabitCardBack;
```

`src/components/habits/HabitCard.js`
```js
// src/components/habits/HabitCard.js

import React from 'react';
import { RiCheckLine, RiMoreLine, RiStarLine, RiRepeatLine, RiDeleteBinLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import IconButton from '../common/IconButton';

const HabitCard = ({ habit, onToggle, onOpenMenu, onCardClick, onHighlight, onSetRecurring, onDelete }) => {
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
      <div className="flex justify-between items-center">
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
        <div className="flex items-center">
          <IconButton 
            icon={RiStarLine}
            onClick={(e) => handleAction(e, onHighlight)}
            isActive={habit.isHighlighted}
          />
          <IconButton 
            icon={RiRepeatLine}
            onClick={(e) => handleAction(e, onSetRecurring)}
            isActive={habit.isRecurring}
          />
          <IconButton 
            icon={RiDeleteBinLine}
            onClick={(e) => handleAction(e, onDelete)}
          />
          <IconButton 
            icon={RiMoreLine}
            onClick={(e) => onOpenMenu(e)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default HabitCard;
```

`src/components/habits/HabitsList.js`
```js
// src/components/habits/HabitsList.js

import React, { useState, useCallback } from 'react';
import List from '../common/List';
import HabitCard from './HabitCard';
import HabitCardBack from './HabitCardBack';
import ContextualMenu from '../common/ContextualMenu';
import { RiFlag2Line, RiCalendarLine, RiEditLine, RiLockLine, RiPaletteLine, RiAlarmLine } from 'react-icons/ri';

const HabitsList = ({ habits, onToggle, onHighlight, onSetRecurring, onDelete }) => {
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
    // Implement actions for menu items
    console.log(`Action ${action} for habit ${selectedHabitId}`);
    handleCloseMenu();
  }, [selectedHabitId, handleCloseMenu]);

  const menuItems = [
    { icon: RiFlag2Line, label: 'Priority', onClick: () => handleMenuItemClick('Priority') },
    { icon: RiCalendarLine, label: 'Set Deadline', onClick: () => handleMenuItemClick('Set Deadline') },
    { icon: RiEditLine, label: 'Edit', onClick: () => handleMenuItemClick('Edit') },
    { icon: RiLockLine, label: 'Private/Public', onClick: () => handleMenuItemClick('Private/Public') },
    { icon: RiPaletteLine, label: 'Color', onClick: () => handleMenuItemClick('Color') },
    { icon: RiAlarmLine, label: 'Set Reminder', onClick: () => handleMenuItemClick('Set Reminder') },
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
              onHighlight={onHighlight}
              onSetRecurring={onSetRecurring}
              onDelete={onDelete}
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
```

`src/components/ui/button.jsx`
```jsx
import * as React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
      className
    )}
    {...props}
  />
));
Button.displayName = "Button";

export { Button };
```

`src/components/ui/card.jsx`
```jsx
import * as React from "react";
import { cn } from "../../lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardContent };
```

`src/components/ui/input.jsx`
```jsx
import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
```

`src/lib/utils.js`
```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

`src/data/dummyData.js`
```js
// src/data/dummyData.js

export const habits = [
  {
    id: 'h1',
    name: 'Read for 30 minutes',
    category: 'personal',
    isCompleted: false,
    isHighlighted: false,
    isRecurring: true,
    color: 'blue',
    description: 'Develop a daily reading habit to expand your knowledge and improve focus.',
    benefits: [
      'Improves vocabulary and language skills',
      'Reduces stress and promotes relaxation',
      'Enhances creativity and imagination'
    ],
    tips: [
      'Choose a specific time each day for reading',
      'Start with books or articles that interest you',
      'Set realistic goals and gradually increase reading time'
    ],
    relatedProducts: [
      {
        name: 'Kindle Paperwhite',
        description: 'Waterproof e-reader with a glare-free display',
        affiliateLink: 'https://example.com/kindle-paperwhite'
      },
      {
        name: 'Book Light',
        description: 'Rechargeable LED reading light',
        affiliateLink: 'https://example.com/book-light'
      }
    ],
    videoContent: {
      title: 'The Benefits of Reading',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  },
  {
    id: 'h2',
    name: 'Meditate for 10 minutes',
    category: 'health',
    isCompleted: false,
    isHighlighted: true,
    isRecurring: false,
    color: 'green',
    description: 'Practice mindfulness meditation to reduce stress and improve focus.',
    benefits: [
      'Reduces stress and anxiety',
      'Improves focus and concentration',
      'Enhances emotional well-being'
    ],
    tips: [
      'Start with guided meditations',
      'Find a quiet, comfortable space',
      'Be consistent with your practice'
    ],
    relatedProducts: [
      {
        name: 'Meditation Cushion',
        description: 'Comfortable cushion for meditation practice',
        affiliateLink: 'https://example.com/meditation-cushion'
      },
      {
        name: 'Meditation App Subscription',
        description: 'Access to guided meditations and mindfulness exercises',
        affiliateLink: 'https://example.com/meditation-app'
      }
    ],
    videoContent: {
      title: 'Introduction to Mindfulness Meditation',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  },
  {
    id: 'h3',
    name: 'Exercise for 30 minutes',
    category: 'health',
    isCompleted: false,
    isHighlighted: false,
    isRecurring: true,
    color: 'red',
    description: 'Engage in physical activity to improve overall health and fitness.',
    benefits: [
      'Improves cardiovascular health',
      'Boosts mood and reduces stress',
      'Helps maintain a healthy weight'
    ],
    tips: [
      'Choose activities you enjoy',
      'Start with shorter sessions and gradually increase',
      'Mix cardio and strength training exercises'
    ],
    relatedProducts: [
      {
        name: 'Fitness Tracker',
        description: 'Monitor your activity and heart rate',
        affiliateLink: 'https://example.com/fitness-tracker'
      },
      {
        name: 'Resistance Bands Set',
        description: 'Versatile equipment for home workouts',
        affiliateLink: 'https://example.com/resistance-bands'
      }
    ],
    videoContent: {
      title: 'Full Body 30-Minute Workout',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  }
];

export const todos = [
  { id: 't1', title: "Buy groceries", isCompleted: false },
  { id: 't2', title: "Call mom", isCompleted: true },
  { id: 't3', title: "Finish project report", isCompleted: false },
  { id: 't4', title: "Schedule dentist appointment", isCompleted: false },
];
```

`public/index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="BetterUeveryday App" />
    <title>BetterUeveryday</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

`postcss.config.js`
```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

`tailwind.config.js`
```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-orange': '#FF5722',
      },
    },
  },
  plugins: [],
}
```