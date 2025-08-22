import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import { useLanguage } from '../../hooks/useLanguage';

const DashboardSubNavigation = ({ 
  onViewChange = () => {},
  onSearchChange = () => {},
  onRefresh = () => {},
  onToggleFilters = () => {},
  onToggleTrends = () => {},
  currentView = 'tiles',
  searchQuery = '',
  isFiltersOpen = false,
  isTrendsOpen = false,
  isRefreshing = false
}) => {
  const location = useLocation();
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const { t } = useLanguage();

  // Only show on dashboard
  if (location?.pathname !== '/news-feed-dashboard') {
    return null;
  }

  const viewOptions = [
    { value: 'tiles', icon: 'Grid3X3', label: t('dashboard.views.tiles') },
    { value: 'strips', icon: 'List', label: t('dashboard.views.strips') },
    { value: 'list', icon: 'AlignLeft', label: t('dashboard.views.list') }
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    onSearchChange(localSearch);
  };

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setLocalSearch(value);
    // Debounced search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      onSearchChange(value);
    }, 300);
  };

  return (
    <div className="sticky top-16 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Left Side - View Controls */}
        <div className="flex items-center space-x-4">
          {/* View Switcher */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            {viewOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => onViewChange(option?.value)}
                className={`
                  flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-smooth
                  ${currentView === option?.value
                    ? 'bg-background text-foreground shadow-subtle'
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
                title={option?.label}
              >
                <Icon name={option?.icon} size={16} />
                <span className="hidden sm:inline">{option?.label}</span>
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2"
          >
            <Icon 
              name="RefreshCw" 
              size={16} 
              className={isRefreshing ? 'animate-spin' : ''} 
            />
            <span className="hidden sm:inline">{t('common.refresh')}</span>
          </Button>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="search"
              placeholder={t('dashboard.searchPlaceholder')}
              value={localSearch}
              onChange={handleSearchChange}
              className="pl-10 pr-4"
            />
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
          </form>
        </div>

        {/* Right Side - Panel Toggles */}
        <div className="flex items-center space-x-2">
          {/* Filters Toggle */}
          <Button
            variant={isFiltersOpen ? "default" : "ghost"}
            size="sm"
            onClick={onToggleFilters}
            className="flex items-center space-x-2"
          >
            <Icon name="Filter" size={16} />
            <span className="hidden md:inline">{t('dashboard.filters')}</span>
            {isFiltersOpen && (
              <Icon name="ChevronUp" size={14} />
            )}
          </Button>

          {/* Trends Toggle */}
          <Button
            variant={isTrendsOpen ? "default" : "ghost"}
            size="sm"
            onClick={onToggleTrends}
            className="flex items-center space-x-2"
          >
            <Icon name="TrendingUp" size={16} />
            <span className="hidden md:inline">{t('dashboard.trends.title')}</span>
            {isTrendsOpen && (
              <Icon name="ChevronUp" size={14} />
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => {
              // Toggle mobile panel menu
            }}
          >
            <Icon name="MoreVertical" size={16} />
          </Button>
        </div>
      </div>
      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Input
            type="search"
            placeholder={t('dashboard.searchPlaceholderMobile')}
            value={localSearch}
            onChange={handleSearchChange}
            className="pl-10 pr-4"
          />
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
        </form>
      </div>
    </div>
  );
};

export default DashboardSubNavigation;