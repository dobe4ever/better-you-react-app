import React, { useState } from 'react';
import { RiMenu2Line, RiNotification3Line, RiUser3Line, RiHome5Line, RiSettings4Line, RiInformationLine, RiEditLine, RiFileListLine, RiLogoutBoxRLine } from 'react-icons/ri';
import ContextualMenu from '../ui/ContextualMenu';
import IconButton from '../ui/IconButton';

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
          <IconButton icon={RiMenu2Line} onClick={() => setIsMenuOpen(true)} color="white" className="mr-3" />
          <h1 className="text-xl font-bold">BetterYou</h1>
        </div>
        <div className="flex items-center">
          <div className="relative mr-4">
            <IconButton icon={RiNotification3Line} onClick={handleNotificationClick} color="white" />
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </div>
          <IconButton icon={RiUser3Line} onClick={() => setIsProfileMenuOpen(true)} color="white" />
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