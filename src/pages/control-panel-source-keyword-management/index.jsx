import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Header from '../../components/ui/Header';
import SourceCard from './components/SourceCard';
import KeywordChip from './components/KeywordChip';
import ScheduleTimeline from './components/ScheduleTimeline';
import IntegrationCard from './components/IntegrationCard';
import SourceModal from './components/SourceModal';
import KeywordAutocomplete from './components/KeywordAutocomplete';

const ControlPanelSourceKeywordManagement = () => {
  const [activeTab, setActiveTab] = useState('sources');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSources, setSelectedSources] = useState([]);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [sourceModalMode, setSourceModalMode] = useState('add');
  const [selectedSource, setSelectedSource] = useState(null);
  const [draggedKeyword, setDraggedKeyword] = useState(null);

  // Mock data
  const [sources, setSources] = useState([
    {
      id: 1,
      name: "TechCrunch",
      url: "https://techcrunch.com/feed/",
      type: "rss",
      status: "active",
      articleCount: 1247,
      lastUpdate: "2 hours ago",
      description: "The latest technology news and startup information",
      tags: ["technology", "startup", "innovation"],
      category: "technology",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "BBC News",
      url: "https://feeds.bbci.co.uk/news/rss.xml",
      type: "rss",
      status: "active",
      articleCount: 2156,
      lastUpdate: "1 hour ago",
      description: "Breaking news, sport, TV, radio and a whole lot more",
      tags: ["news", "world", "politics"],
      category: "general",
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      name: "Reuters Business",
      url: "https://reuters.com/business/feed",
      type: "rss",
      status: "error",
      articleCount: 892,
      lastUpdate: "6 hours ago",
      description: "Business and financial news from around the world",
      tags: ["business", "finance", "economy"],
      category: "business",
      error: "Feed temporarily unavailable",
      createdAt: "2024-01-20"
    },
    {
      id: 4,
      name: "The Verge",
      url: "https://theverge.com/rss/index.xml",
      type: "rss",
      status: "inactive",
      articleCount: 756,
      lastUpdate: "1 day ago",
      description: "Technology, science, art, and culture news",
      tags: ["technology", "science", "culture"],
      category: "technology",
      createdAt: "2024-01-25"
    }
  ]);

  const [keywords, setKeywords] = useState([
    { id: 1, text: "artificial intelligence", category: "technology", relevanceScore: 95 },
    { id: 2, text: "machine learning", category: "technology", relevanceScore: 88 },
    { id: 3, text: "blockchain", category: "technology", relevanceScore: 76 },
    { id: 4, text: "cryptocurrency", category: "business", relevanceScore: 82 },
    { id: 5, text: "climate change", category: "science", relevanceScore: 91 },
    { id: 6, text: "renewable energy", category: "science", relevanceScore: 73 },
    { id: 7, text: "startup funding", category: "business", relevanceScore: 67 },
    { id: 8, text: "space exploration", category: "science", relevanceScore: 84 }
  ]);

  const [schedule, setSchedule] = useState({
    frequency: 'custom',
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    times: ['09:00', '13:00', '17:00']
  });

  const [integrations, setIntegrations] = useState([
    {
      id: 'telegram',
      name: 'Telegram Bot',
      description: 'Automated news delivery to Telegram channels',
      icon: 'MessageSquare',
      status: 'connected',
      features: ['Auto-posting', 'Custom formatting', 'Schedule control'],
      details: {
        channel: '@mynewschannel',
        lastPost: '2 hours ago',
        postsCount: 156,
        schedule: 'Every 4 hours'
      }
    },
    {
      id: 'webhook',
      name: 'Webhook Integration',
      description: 'Send news data to external services via webhooks',
      icon: 'Webhook',
      status: 'disconnected',
      features: ['Real-time delivery', 'Custom payloads', 'Retry logic']
    },
    {
      id: 'email',
      name: 'Email Digest',
      description: 'Daily or weekly email summaries of curated news',
      icon: 'Mail',
      status: 'error',
      features: ['HTML templates', 'Personalization', 'Scheduling'],
      error: 'SMTP configuration invalid'
    }
  ]);

  const tabs = [
    { id: 'sources', label: 'Sources', icon: 'Rss', count: sources?.length },
    { id: 'keywords', label: 'Keywords', icon: 'Hash', count: keywords?.length },
    { id: 'schedule', label: 'Schedule', icon: 'Clock' },
    { id: 'integrations', label: 'Integrations', icon: 'Zap', count: integrations?.filter(i => i?.status === 'connected')?.length }
  ];

  // Filter sources based on search
  const filteredSources = sources?.filter(source =>
    source?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    source?.url?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    source?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
  );

  // Filter keywords based on search
  const filteredKeywords = keywords?.filter(keyword =>
    keyword?.text?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    keyword?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  // Group keywords by category
  const keywordsByCategory = filteredKeywords?.reduce((acc, keyword) => {
    const category = keyword?.category || 'general';
    if (!acc?.[category]) acc[category] = [];
    acc?.[category]?.push(keyword);
    return acc;
  }, {});

  const handleSourceToggle = (sourceId) => {
    setSources(prev => prev?.map(source =>
      source?.id === sourceId
        ? { ...source, status: source?.status === 'active' ? 'inactive' : 'active' }
        : source
    ));
  };

  const handleSourceEdit = (source) => {
    setSelectedSource(source);
    setSourceModalMode('edit');
    setIsSourceModalOpen(true);
  };

  const handleSourcePreview = (source) => {
    setSelectedSource(source);
    setSourceModalMode('preview');
    setIsSourceModalOpen(true);
  };

  const handleSourceDelete = (sourceId) => {
    if (window.confirm('Are you sure you want to delete this source?')) {
      setSources(prev => prev?.filter(source => source?.id !== sourceId));
    }
  };

  const handleSourceSave = (sourceData) => {
    if (sourceModalMode === 'add') {
      const newSource = {
        ...sourceData,
        id: Date.now(),
        status: 'inactive',
        articleCount: 0,
        lastUpdate: 'Never',
        createdAt: new Date()?.toISOString()?.split('T')?.[0]
      };
      setSources(prev => [...prev, newSource]);
    } else {
      setSources(prev => prev?.map(source =>
        source?.id === selectedSource?.id
          ? { ...source, ...sourceData }
          : source
      ));
    }
    setIsSourceModalOpen(false);
    setSelectedSource(null);
  };

  const handleAddKeyword = (keywordText) => {
    const newKeyword = {
      id: Date.now(),
      text: keywordText,
      category: 'general',
      relevanceScore: Math.floor(Math.random() * 40) + 60
    };
    setKeywords(prev => [...prev, newKeyword]);
  };

  const handleRemoveKeyword = (keywordId) => {
    setKeywords(prev => prev?.filter(keyword => keyword?.id !== keywordId));
  };

  const handleEditKeyword = (keyword) => {
    const newText = prompt('Edit keyword:', keyword?.text);
    if (newText && newText?.trim()) {
      setKeywords(prev => prev?.map(k =>
        k?.id === keyword?.id
          ? { ...k, text: newText?.trim() }
          : k
      ));
    }
  };

  const handleIntegrationConnect = async (integrationId) => {
    // Simulate connection process
    setIntegrations(prev => prev?.map(integration =>
      integration?.id === integrationId
        ? { ...integration, status: 'connecting' }
        : integration
    ));

    setTimeout(() => {
      setIntegrations(prev => prev?.map(integration =>
        integration?.id === integrationId
          ? { 
              ...integration, 
              status: 'connected',
              details: {
                channel: '@testchannel',
                lastPost: 'Just now',
                postsCount: 1,
                schedule: 'Manual'
              }
            }
          : integration
      ));
    }, 2000);
  };

  const handleIntegrationDisconnect = (integrationId) => {
    setIntegrations(prev => prev?.map(integration =>
      integration?.id === integrationId
        ? { ...integration, status: 'disconnected', details: null }
        : integration
    ));
  };

  const handleIntegrationTest = async (integrationId) => {
    // Simulate test
    await new Promise(resolve => setTimeout(resolve, 1500));
    return Math.random() > 0.3; // 70% success rate
  };

  const handleIntegrationConfigure = (integrationId) => {
    // Navigate to integration setup or open configuration modal
    console.log('Configure integration:', integrationId);
  };

  const handleBulkSourceAction = (action) => {
    if (selectedSources?.length === 0) return;

    switch (action) {
      case 'activate':
        setSources(prev => prev?.map(source =>
          selectedSources?.includes(source?.id)
            ? { ...source, status: 'active' }
            : source
        ));
        break;
      case 'deactivate':
        setSources(prev => prev?.map(source =>
          selectedSources?.includes(source?.id)
            ? { ...source, status: 'inactive' }
            : source
        ));
        break;
      case 'delete':
        if (window.confirm(`Delete ${selectedSources?.length} selected sources?`)) {
          setSources(prev => prev?.filter(source => !selectedSources?.includes(source?.id)));
        }
        break;
    }
    setSelectedSources([]);
  };

  const handleExportData = (type) => {
    const data = type === 'sources' ? sources : keywords;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Control Panel - Source & Keyword Management | Chimera News</title>
        <meta name="description" content="Manage your news sources, keywords, monitoring schedule, and integrations in the Chimera News control panel." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="pt-16">
          {/* Page Header */}
          <div className="bg-card border-b border-border">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Control Panel
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your news sources, keywords, and monitoring configuration
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    iconName="Download"
                    iconPosition="left"
                    onClick={() => handleExportData(activeTab)}
                  >
                    Export {activeTab}
                  </Button>
                  
                  {activeTab === 'sources' && (
                    <Button
                      iconName="Plus"
                      iconPosition="left"
                      onClick={() => {
                        setSelectedSource(null);
                        setSourceModalMode('add');
                        setIsSourceModalOpen(true);
                      }}
                    >
                      Add Source
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-card border-b border-border">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                      ${activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      }
                    `}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                    {tab?.count !== undefined && (
                      <span className={`
                        px-2 py-0.5 rounded-full text-xs
                        ${activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                        }
                      `}>
                        {tab?.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
            {/* Search and Filters */}
            {(activeTab === 'sources' || activeTab === 'keywords') && (
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                  <Input
                    type="search"
                    placeholder={`Search ${activeTab}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                  />
                </div>
                
                {activeTab === 'sources' && selectedSources?.length > 0 && (
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="text-sm text-muted-foreground">
                      {selectedSources?.length} selected
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkSourceAction('activate')}
                      iconName="Play"
                    >
                      Activate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkSourceAction('deactivate')}
                      iconName="Pause"
                    >
                      Deactivate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkSourceAction('delete')}
                      iconName="Trash2"
                      className="text-error hover:text-error"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Sources Tab */}
            {activeTab === 'sources' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredSources?.map((source) => (
                  <SourceCard
                    key={source?.id}
                    source={source}
                    onToggle={handleSourceToggle}
                    onEdit={handleSourceEdit}
                    onDelete={handleSourceDelete}
                    onPreview={handleSourcePreview}
                  />
                ))}
                
                {filteredSources?.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <Icon name="Rss" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-heading font-medium text-foreground mb-2">
                      No sources found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery ? 'Try adjusting your search terms' : 'Get started by adding your first news source'}
                    </p>
                    <Button
                      iconName="Plus"
                      iconPosition="left"
                      onClick={() => {
                        setSelectedSource(null);
                        setSourceModalMode('add');
                        setIsSourceModalOpen(true);
                      }}
                    >
                      Add Source
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Keywords Tab */}
            {activeTab === 'keywords' && (
              <div className="space-y-6">
                <KeywordAutocomplete
                  onAddKeyword={handleAddKeyword}
                  existingKeywords={keywords?.map(k => k?.text)}
                />
                
                {Object.keys(keywordsByCategory)?.length > 0 ? (
                  <div className="space-y-6">
                    {Object.entries(keywordsByCategory)?.map(([category, categoryKeywords]) => (
                      <div key={category} className="bg-card border border-border rounded-lg p-6">
                        <h3 className="font-heading font-medium text-foreground mb-4 capitalize">
                          {category} ({categoryKeywords?.length})
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {categoryKeywords?.map((keyword) => (
                            <KeywordChip
                              key={keyword?.id}
                              keyword={keyword}
                              onRemove={handleRemoveKeyword}
                              onEdit={handleEditKeyword}
                              relevanceScore={keyword?.relevanceScore}
                              category={keyword?.category}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Hash" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-heading font-medium text-foreground mb-2">
                      No keywords found
                    </h3>
                    <p className="text-muted-foreground">
                      {searchQuery ? 'Try adjusting your search terms' : 'Add keywords to start filtering news content'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <ScheduleTimeline
                schedule={schedule}
                onScheduleChange={setSchedule}
                timezone="UTC+3"
              />
            )}

            {/* Integrations Tab */}
            {activeTab === 'integrations' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {integrations?.map((integration) => (
                  <IntegrationCard
                    key={integration?.id}
                    integration={integration}
                    onConnect={handleIntegrationConnect}
                    onDisconnect={handleIntegrationDisconnect}
                    onTest={handleIntegrationTest}
                    onConfigure={handleIntegrationConfigure}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Source Modal */}
        <SourceModal
          isOpen={isSourceModalOpen}
          onClose={() => setIsSourceModalOpen(false)}
          onSave={handleSourceSave}
          source={selectedSource}
          mode={sourceModalMode}
        />
      </div>
    </>
  );
};

export default ControlPanelSourceKeywordManagement;