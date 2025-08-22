import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  isOpen = false, 
  onClose = () => {},
  filters = {},
  onFiltersChange = () => {}
}) => {
  const [localFilters, setLocalFilters] = useState({
    sources: [],
    keywords: [],
    dateRange: 'today',
    sentiment: 'all',
    ...filters
  });

  const [keywordInput, setKeywordInput] = useState('');

  const mockSources = [
    { id: 'bbc', name: 'BBC News', count: 45, active: true },
    { id: 'cnn', name: 'CNN', count: 32, active: true },
    { id: 'reuters', name: 'Reuters', count: 28, active: false },
    { id: 'ap', name: 'Associated Press', count: 19, active: true },
    { id: 'guardian', name: 'The Guardian', count: 23, active: true },
    { id: 'nyt', name: 'New York Times', count: 15, active: false },
    { id: 'wsj', name: 'Wall Street Journal', count: 12, active: true },
    { id: 'techcrunch', name: 'TechCrunch', count: 8, active: true }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const sentimentOptions = [
    { value: 'all', label: 'All Sentiments', emoji: '📰' },
    { value: 'positive', label: 'Positive', emoji: '😊' },
    { value: 'neutral', label: 'Neutral', emoji: '😐' },
    { value: 'negative', label: 'Negative', emoji: '😔' }
  ];

  useEffect(() => {
    setLocalFilters(prev => ({ ...prev, ...filters }));
  }, [filters]);

  const handleSourceToggle = (sourceId) => {
    const updatedSources = localFilters?.sources?.includes(sourceId)
      ? localFilters?.sources?.filter(id => id !== sourceId)
      : [...localFilters?.sources, sourceId];
    
    const newFilters = { ...localFilters, sources: updatedSources };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleKeywordAdd = (e) => {
    e?.preventDefault();
    if (keywordInput?.trim() && !localFilters?.keywords?.includes(keywordInput?.trim())) {
      const newKeywords = [...localFilters?.keywords, keywordInput?.trim()];
      const newFilters = { ...localFilters, keywords: newKeywords };
      setLocalFilters(newFilters);
      onFiltersChange(newFilters);
      setKeywordInput('');
    }
  };

  const handleKeywordRemove = (keyword) => {
    const newKeywords = localFilters?.keywords?.filter(k => k !== keyword);
    const newFilters = { ...localFilters, keywords: newKeywords };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDateRangeChange = (range) => {
    const newFilters = { ...localFilters, dateRange: range };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSentimentChange = (sentiment) => {
    const newFilters = { ...localFilters, sentiment };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      sources: [],
      keywords: [],
      dateRange: 'today',
      sentiment: 'all'
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    return localFilters?.sources?.length + 
           localFilters?.keywords?.length + 
           (localFilters?.dateRange !== 'today' ? 1 : 0) +
           (localFilters?.sentiment !== 'all' ? 1 : 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-80 bg-card border-r border-border shadow-elevated overflow-hidden flex flex-col lg:relative lg:z-auto lg:shadow-none">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="flex items-center justify-center w-5 h-5 text-xs bg-primary text-primary-foreground rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Sources */}
        <div>
          <h4 className="font-heading font-medium text-foreground mb-3">Sources</h4>
          <div className="space-y-2">
            {mockSources?.map((source) => (
              <div key={source?.id} className="flex items-center justify-between">
                <Checkbox
                  label={source?.name}
                  checked={localFilters?.sources?.includes(source?.id)}
                  onChange={() => handleSourceToggle(source?.id)}
                  className="flex-1"
                />
                <div className="flex items-center space-x-2 ml-2">
                  <span className="text-xs text-muted-foreground">{source?.count}</span>
                  <div className={`w-2 h-2 rounded-full ${source?.active ? 'bg-success' : 'bg-muted-foreground'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div>
          <h4 className="font-heading font-medium text-foreground mb-3">Keywords</h4>
          <form onSubmit={handleKeywordAdd} className="mb-3">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Add keyword..."
                value={keywordInput}
                onChange={(e) => setKeywordInput(e?.target?.value)}
                className="flex-1"
              />
              <Button type="submit" size="sm" disabled={!keywordInput?.trim()}>
                <Icon name="Plus" size={14} />
              </Button>
            </div>
          </form>
          <div className="flex flex-wrap gap-2">
            {localFilters?.keywords?.map((keyword) => (
              <div
                key={keyword}
                className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                <span>{keyword}</span>
                <button
                  onClick={() => handleKeywordRemove(keyword)}
                  className="hover:text-primary/70"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <h4 className="font-heading font-medium text-foreground mb-3">Date Range</h4>
          <div className="space-y-2">
            {dateRangeOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => handleDateRangeChange(option?.value)}
                className={`
                  flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-smooth
                  ${localFilters?.dateRange === option?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                  }
                `}
              >
                <span>{option?.label}</span>
                {localFilters?.dateRange === option?.value && (
                  <Icon name="Check" size={14} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sentiment */}
        <div>
          <h4 className="font-heading font-medium text-foreground mb-3">Sentiment</h4>
          <div className="space-y-2">
            {sentimentOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => handleSentimentChange(option?.value)}
                className={`
                  flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-smooth
                  ${localFilters?.sentiment === option?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <span>{option?.emoji}</span>
                  <span>{option?.label}</span>
                </div>
                {localFilters?.sentiment === option?.value && (
                  <Icon name="Check" size={14} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          onClick={() => {
            // Apply filters and close on mobile
            onClose();
          }}
          className="lg:hidden"
        >
          Apply Filters ({getActiveFiltersCount()})
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;