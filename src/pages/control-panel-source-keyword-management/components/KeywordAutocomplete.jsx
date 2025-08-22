import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const KeywordAutocomplete = ({ 
  onAddKeyword, 
  existingKeywords = [],
  placeholder = "Add keywords..."
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock suggestions based on categories
  const mockSuggestions = [
    // Technology
    'artificial intelligence', 'machine learning', 'blockchain', 'cryptocurrency',
    'cloud computing', 'cybersecurity', 'data science', 'software development',
    'mobile apps', 'web development', 'IoT', 'automation',
    
    // Business
    'startup', 'investment', 'market analysis', 'economy', 'finance',
    'stock market', 'business strategy', 'entrepreneurship', 'innovation',
    'merger', 'acquisition', 'IPO', 'venture capital',
    
    // Politics
    'election', 'government', 'policy', 'legislation', 'democracy',
    'international relations', 'diplomacy', 'trade war', 'sanctions',
    'parliament', 'congress', 'senate', 'president',
    
    // Science
    'research', 'discovery', 'experiment', 'climate change', 'space',
    'medicine', 'healthcare', 'vaccine', 'treatment', 'study',
    'breakthrough', 'innovation', 'technology advancement'
  ];

  useEffect(() => {
    if (inputValue?.length > 1) {
      const filtered = mockSuggestions?.filter(suggestion => 
          suggestion?.toLowerCase()?.includes(inputValue?.toLowerCase()) &&
          !existingKeywords?.includes(suggestion)
        )?.slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(filtered?.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, existingKeywords]);

  const handleInputChange = (e) => {
    setInputValue(e?.target?.value);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) {
      if (e?.key === 'Enter') {
        e?.preventDefault();
        handleAddKeyword(inputValue);
      }
      return;
    }

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions?.length - 1
        );
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedIndex >= 0) {
          handleAddKeyword(suggestions?.[selectedIndex]);
        } else {
          handleAddKeyword(inputValue);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleAddKeyword = (keyword) => {
    if (keyword?.trim() && !existingKeywords?.includes(keyword?.trim())) {
      onAddKeyword(keyword?.trim());
      setInputValue('');
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleAddKeyword(suggestion);
  };

  const handleClickOutside = (e) => {
    if (
      inputRef?.current && !inputRef?.current?.contains(e?.target) &&
      suggestionsRef?.current && !suggestionsRef?.current?.contains(e?.target)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full px-4 py-2 pr-10 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Icon 
            name="Search" 
            size={16} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
        </div>
        
        <Button
          onClick={() => handleAddKeyword(inputValue)}
          disabled={!inputValue?.trim()}
          iconName="Plus"
          iconPosition="left"
        >
          Add
        </Button>
      </div>
      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevated z-50 max-h-64 overflow-y-auto"
        >
          <div className="p-2">
            <div className="text-xs text-muted-foreground px-2 py-1 mb-1">
              Suggestions
            </div>
            {suggestions?.map((suggestion, index) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`
                  w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                  ${index === selectedIndex 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-muted'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Hash" size={14} className="opacity-60" />
                  <span>{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Quick Add Categories */}
      <div className="mt-3">
        <div className="text-xs text-muted-foreground mb-2">Quick add:</div>
        <div className="flex flex-wrap gap-2">
          {['AI', 'Blockchain', 'Startup', 'Climate', 'Healthcare', 'Space']?.map((category) => (
            <button
              key={category}
              onClick={() => handleAddKeyword(category?.toLowerCase())}
              disabled={existingKeywords?.includes(category?.toLowerCase())}
              className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeywordAutocomplete;