import React, { useState } from 'react';
import Icon from '../AppIcon';
import { useLanguage } from '../../hooks/useLanguage';

const LanguageSelector = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { languages, currentLanguage, changeLanguage, getCurrentLanguage } = useLanguage();

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  const currentLang = getCurrentLanguage();

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
      >
        <span className="text-base">{currentLang?.flag}</span>
        <span className="hidden sm:inline">{currentLang?.name}</span>
        <Icon name="ChevronDown" size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-elevated z-50">
            <div className="p-1">
              {languages?.map((language) => (
                <button
                  key={language?.code}
                  onClick={() => handleLanguageChange(language?.code)}
                  className={`
                    flex items-center space-x-3 w-full px-3 py-2 text-sm rounded-md transition-colors
                    ${currentLanguage === language?.code 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <span className="text-base">{language?.flag}</span>
                  <span>{language?.name}</span>
                  {currentLanguage === language?.code && (
                    <Icon name="Check" size={14} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;