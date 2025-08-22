import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import DashboardSubNavigation from '../../components/ui/DashboardSubNavigation';
import StatusIndicator, { WebSocketStatus } from '../../components/ui/StatusIndicator';
import { SemanticAnalysisModal } from '../../components/ui/ModalController';
import FilterPanel from './components/FilterPanel';
import TrendsPanel from './components/TrendsPanel';
import NewsFeed from './components/NewsFeed';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useLanguage } from '../../hooks/useLanguage';

const NewsFeedDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // UI State
  const [currentView, setCurrentView] = useState('tiles');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isTrendsOpen, setIsTrendsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Modal State
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // Filter State
  const [filters, setFilters] = useState({
    sources: [],
    keywords: [],
    dateRange: 'today',
    sentiment: 'all'
  });
  
  // Connection State
  const [connectionState, setConnectionState] = useState('connected');
  const [processingCount, setProcessingCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingCount(Math.floor(Math.random() * 5));
      setLastUpdate(new Date());
      
      // Simulate connection changes
      const states = ['connected', 'connecting', 'error'];
      const randomState = states?.[Math.floor(Math.random() * states?.length)];
      if (Math.random() < 0.1) { // 10% chance to change state
        setConnectionState(randomState);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Handle view changes
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // Handle search
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdate(new Date());
    }, 2000);
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle panel toggles
  const handleToggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
    // Close trends if opening filters on mobile
    if (!isFiltersOpen && window.innerWidth < 1024) {
      setIsTrendsOpen(false);
    }
  };

  const handleToggleTrends = () => {
    setIsTrendsOpen(!isTrendsOpen);
    // Close filters if opening trends on mobile
    if (!isTrendsOpen && window.innerWidth < 1024) {
      setIsFiltersOpen(false);
    }
  };

  // Handle article actions
  const handleArticleAnalyze = (article) => {
    setSelectedArticle(article);
    setIsAnalysisModalOpen(true);
  };

  const handleArticleSave = (articleId, saved) => {
    console.log(`Article ${articleId} ${saved ? 'saved' : 'unsaved'}`);
    // Here you would typically update the article's saved state in your data store
  };

  const handleArticleShare = (article, platform) => {
    console.log(`Sharing article ${article?.id} to ${platform}`);
    // Here you would implement sharing logic
    if (platform === 'telegram') {
      // Navigate to Telegram setup if not configured
      navigate('/telegram-integration-setup');
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        switch (e?.key) {
          case 'f':
            e?.preventDefault();
            handleToggleFilters();
            break;
          case 't':
            e?.preventDefault();
            handleToggleTrends();
            break;
          case 'r':
            e?.preventDefault();
            handleRefresh();
            break;
          default:
            break;
        }
      }
      
      if (e?.key === 'Escape') {
        setIsFiltersOpen(false);
        setIsTrendsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Desktop: can have both panels open
        return;
      } else {
        // Mobile: close panels when resizing
        if (isFiltersOpen && isTrendsOpen) {
          setIsTrendsOpen(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFiltersOpen, isTrendsOpen]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Sub Navigation */}
      <DashboardSubNavigation
        onViewChange={handleViewChange}
        onSearchChange={handleSearchChange}
        onRefresh={handleRefresh}
        onToggleFilters={handleToggleFilters}
        onToggleTrends={handleToggleTrends}
        currentView={currentView}
        searchQuery={searchQuery}
        isFiltersOpen={isFiltersOpen}
        isTrendsOpen={isTrendsOpen}
        isRefreshing={isRefreshing}
      />

      {/* Main Content */}
      <div className="flex pt-16 lg:pt-32">
        {/* Filter Panel */}
        <FilterPanel
          isOpen={isFiltersOpen}
          onClose={() => setIsFiltersOpen(false)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />

        {/* Main Feed Area */}
        <main className={`
          flex-1 min-w-0 transition-all duration-300
          ${isFiltersOpen ? 'lg:ml-80' : ''}
          ${isTrendsOpen ? 'lg:mr-80' : ''}
        `}>
          <div className="p-4 lg:p-6">
            {/* Status Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <StatusIndicator
                  isConnected={connectionState === 'connected'}
                  processingCount={processingCount}
                  lastUpdate={lastUpdate}
                />
                
                {/* Quick Stats */}
                <div className="hidden lg:flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{t('dashboard.todayArticles', { count: 156 })}</span>
                  <span>•</span>
                  <span>{t('dashboard.saved', { count: 23 })}</span>
                  <span>•</span>
                  <span>{t('dashboard.sources', { count: 12 })}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/control-panel-source-keyword-management')}
                  className="hidden lg:flex items-center space-x-1"
                >
                  <Icon name="Settings" size={14} />
                  <span>{t('dashboard.manageSources')}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/archive-system')}
                  className="hidden lg:flex items-center space-x-1"
                >
                  <Icon name="Archive" size={14} />
                  <span>{t('dashboard.archive')}</span>
                </Button>
              </div>
            </div>

            {/* News Feed */}
            <NewsFeed
              viewMode={currentView}
              searchQuery={searchQuery}
              filters={filters}
              onArticleAnalyze={handleArticleAnalyze}
              onArticleSave={handleArticleSave}
              onArticleShare={handleArticleShare}
            />
          </div>
        </main>

        {/* Trends Panel */}
        <TrendsPanel
          isOpen={isTrendsOpen}
          onClose={() => setIsTrendsOpen(false)}
        />
      </div>

      {/* Modals */}
      <SemanticAnalysisModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        articleData={selectedArticle}
      />

      {/* WebSocket Status */}
      <WebSocketStatus
        connectionState={connectionState}
        messageCount={processingCount}
      />

      {/* Mobile Panel Backdrop */}
      {(isFiltersOpen || isTrendsOpen) && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => {
            setIsFiltersOpen(false);
            setIsTrendsOpen(false);
          }}
        />
      )}

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 left-4 z-30 hidden lg:block">
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <div className="text-xs text-muted-foreground space-y-1">
            <div><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+F</kbd> {t('dashboard.shortcuts.toggleFilters')}</div>
            <div><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+T</kbd> {t('dashboard.shortcuts.toggleTrends')}</div>
            <div><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+R</kbd> {t('common.refresh')}</div>
            <div><kbd className="px-1 py-0.5 bg-muted rounded text-xs">Esc</kbd> {t('dashboard.shortcuts.closePanels')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFeedDashboard;