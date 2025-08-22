import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigationItems = [
    { 
      label: 'Feed', 
      path: '/news-feed-dashboard', 
      icon: 'Newspaper',
      description: 'Latest news and updates'
    },
    { 
      label: 'Control Panel', 
      path: '/control-panel-source-keyword-management', 
      icon: 'Settings',
      description: 'Manage sources and keywords'
    },
    { 
      label: 'Archive', 
      path: '/archive-system', 
      icon: 'Archive',
      description: 'Saved articles and history'
    }
  ];

  const secondaryItems = [
    { 
      label: 'Telegram Setup', 
      path: '/telegram-integration-setup', 
      icon: 'MessageSquare'
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/authentication-login-register');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Simulate real-time processing status
  useEffect(() => {
    const interval = setInterval(() => {
      setIsProcessing(prev => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Don't render header on landing page and auth pages
  if (location?.pathname === '/landing-page' || location?.pathname === '/authentication-login-register') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Zap" size={20} color="white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-heading font-semibold text-foreground">
              Chimera News
            </h1>
            <p className="text-xs text-muted-foreground -mt-1">
              Aggregator
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth
                ${isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-subtle'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
              {item?.path === '/news-feed-dashboard' && notifications > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-xs bg-accent text-accent-foreground rounded-full">
                  {notifications}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-3">
          {/* Processing Status */}
          {isProcessing && (
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-muted rounded-full">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Processing</span>
            </div>
          )}

          {/* Language Selector */}
          <LanguageSelector className="hidden sm:block" />

          {/* Search Button - Desktop */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={() => {/* Handle search */}}
          >
            <Icon name="Search" size={18} />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => {/* Handle notifications */}}
          >
            <Icon name="Bell" size={18} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 text-xs bg-accent text-accent-foreground rounded-full flex items-center justify-center">
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="relative"
            >
              <Icon name="User" size={18} />
            </Button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevated z-1100">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
                
                <div className="p-1">
                  {secondaryItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                  
                  <div className="border-t border-border my-1"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-destructive hover:bg-muted rounded-md transition-smooth"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMenu}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={18} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="p-4 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-smooth
                  ${isActiveRoute(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={item?.icon} size={18} />
                <div className="flex-1 text-left">
                  <div>{item?.label}</div>
                  <div className="text-xs opacity-70">{item?.description}</div>
                </div>
                {item?.path === '/news-feed-dashboard' && notifications > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 text-xs bg-accent text-accent-foreground rounded-full">
                    {notifications}
                  </span>
                )}
              </button>
            ))}
            
            <div className="border-t border-border pt-2 mt-4">
              <button
                onClick={() => handleNavigation('/telegram-integration-setup')}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-smooth"
              >
                <Icon name="MessageSquare" size={18} />
                <span>Telegram Setup</span>
              </button>
            </div>
          </nav>
        </div>
      )}
      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-1000 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;