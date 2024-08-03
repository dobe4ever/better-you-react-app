// src/components/layout/BottomNav.js

import React, { useState } from 'react';
import { RiHome5Line, RiNewspaperLine, RiRobotLine, RiAddLine, RiApps2Line, RiCalendarLine, RiBarChartBoxLine, RiTeamLine, RiGroupLine, RiBookOpenLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import ContextualMenu from '../ui/ContextualMenu';
import IconButton from '../ui/IconButton';

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