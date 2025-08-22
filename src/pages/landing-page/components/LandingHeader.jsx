import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import LanguageSelector from '../../../components/ui/LanguageSelector';
import { useLanguage } from '../../../hooks/useLanguage';

const LandingHeader = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: t('navigation.features'), href: '#features' },
    { label: t('navigation.demo'), href: '#demo-section' },
    { label: t('navigation.pricing'), href: '#pricing' },
    { label: t('navigation.testimonials'), href: '#testimonials' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href) => {
    if (href?.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/authentication-login-register');
  };

  const handleRegister = () => {
    navigate('/authentication-login-register', { 
      state: { mode: 'register' } 
    });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-1000 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-sm border-b border-border shadow-subtle' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 gradient-bg rounded-lg">
              <Icon name="Zap" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">
                Chimera News
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                {t('landing.footer.tagline')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <button
                key={item?.label}
                onClick={() => handleNavigation(item?.href)}
                className="micro-interaction text-muted-foreground hover:text-foreground font-medium"
              >
                {item?.label}
              </button>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSelector />

            {/* Auth Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={handleLogin}
                className="micro-interaction"
              >
                {t('navigation.signIn')}
              </Button>
              <Button
                onClick={handleRegister}
                className="micro-interaction gradient-bg text-white hover:opacity-90"
                iconName="ArrowRight"
                iconPosition="right"
              >
                {t('navigation.register')}
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden micro-interaction"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border shadow-elevated">
            <nav className="px-4 py-6 space-y-4">
              {navigationItems?.map((item) => (
                <button
                  key={item?.label}
                  onClick={() => handleNavigation(item?.href)}
                  className="micro-interaction block w-full text-left py-2 text-foreground hover:text-primary font-medium"
                >
                  {item?.label}
                </button>
              ))}
              
              <div className="border-t border-border pt-4 space-y-3">
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={handleLogin}
                  className="micro-interaction"
                >
                  {t('navigation.signIn')}
                </Button>
                <Button
                  fullWidth
                  onClick={handleRegister}
                  className="micro-interaction gradient-bg text-white"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  {t('navigation.register')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-999 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default LandingHeader;