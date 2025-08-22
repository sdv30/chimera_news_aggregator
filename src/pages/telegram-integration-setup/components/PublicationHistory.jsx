import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PublicationHistory = () => {
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [dateRange, setDateRange] = useState('7days');
  const [isLoading, setIsLoading] = useState(true);

  // Mock publication data
  const mockPublications = [
    {
      id: 1,
      title: 'Revolutionary AI Technology Transforms Healthcare Industry',
      channel: '@chimera_news',
      status: 'published',
      timestamp: new Date(Date.now() - 3600000),
      messageId: 1234,
      views: 1250,
      reactions: 45,
      forwards: 12,
      error: null
    },
    {
      id: 2,
      title: 'Global Climate Summit Reaches Historic Agreement',
      channel: '@tech_updates',
      status: 'published',
      timestamp: new Date(Date.now() - 7200000),
      messageId: 1235,
      views: 890,
      reactions: 32,
      forwards: 8,
      error: null
    },
    {
      id: 3,
      title: 'Cryptocurrency Market Shows Signs of Recovery',
      channel: '@chimera_news',
      status: 'failed',
      timestamp: new Date(Date.now() - 10800000),
      messageId: null,
      views: 0,
      reactions: 0,
      forwards: 0,
      error: 'Insufficient permissions to post in channel'
    },
    {
      id: 4,
      title: 'Space Exploration Mission Launches Successfully',
      channel: '-1001234567890',
      status: 'published',
      timestamp: new Date(Date.now() - 14400000),
      messageId: 1236,
      views: 567,
      reactions: 28,
      forwards: 5,
      error: null
    },
    {
      id: 5,
      title: 'Tech Giant Announces Major Acquisition Deal',
      channel: '@chimera_news',
      status: 'pending',
      timestamp: new Date(Date.now() - 18000000),
      messageId: null,
      views: 0,
      reactions: 0,
      forwards: 0,
      error: null
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'published', label: 'Published' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' }
  ];

  const channelOptions = [
    { value: 'all', label: 'All Channels' },
    { value: '@chimera_news', label: '@chimera_news' },
    { value: '@tech_updates', label: '@tech_updates' },
    { value: '-1001234567890', label: 'News Discussion Group' }
  ];

  const dateRangeOptions = [
    { value: '24hours', label: 'Last 24 Hours' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: 'all', label: 'All Time' }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPublications(mockPublications);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...publications];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(pub => 
        pub?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        pub?.channel?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered?.filter(pub => pub?.status === statusFilter);
    }

    // Apply channel filter
    if (channelFilter !== 'all') {
      filtered = filtered?.filter(pub => pub?.channel === channelFilter);
    }

    // Apply date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      const cutoff = new Date();
      
      switch (dateRange) {
        case '24hours':
          cutoff?.setHours(now?.getHours() - 24);
          break;
        case '7days':
          cutoff?.setDate(now?.getDate() - 7);
          break;
        case '30days':
          cutoff?.setDate(now?.getDate() - 30);
          break;
      }
      
      filtered = filtered?.filter(pub => pub?.timestamp >= cutoff);
    }

    setFilteredPublications(filtered);
  }, [publications, searchQuery, statusFilter, channelFilter, dateRange]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'pending':
        return { icon: 'Clock', color: 'text-warning' };
      case 'failed':
        return { icon: 'XCircle', color: 'text-error' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      published: 'bg-success/10 text-success',
      pending: 'bg-warning/10 text-warning',
      failed: 'bg-error/10 text-error'
    };
    
    return config?.[status] || 'bg-muted text-muted-foreground';
  };

  const handleRetryPublication = (publicationId) => {
    setPublications(prev => prev?.map(pub => 
      pub?.id === publicationId 
        ? { ...pub, status: 'pending', error: null }
        : pub
    ));
  };

  const handleDeletePublication = (publicationId) => {
    setPublications(prev => prev?.filter(pub => pub?.id !== publicationId));
  };

  const getTotalStats = () => {
    const published = publications?.filter(p => p?.status === 'published');
    const totalViews = published?.reduce((sum, p) => sum + p?.views, 0);
    const totalReactions = published?.reduce((sum, p) => sum + p?.reactions, 0);
    const totalForwards = published?.reduce((sum, p) => sum + p?.forwards, 0);
    
    return { totalViews, totalReactions, totalForwards, publishedCount: published?.length };
  };

  const stats = getTotalStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Icon name="Loader" size={48} className="mx-auto text-primary mb-4 animate-spin" />
          <h3 className="font-heading font-semibold text-foreground mb-2">
            Loading Publication History
          </h3>
          <p className="text-muted-foreground">
            Fetching your recent posts and statistics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Icon name="BarChart3" size={48} className="mx-auto text-primary mb-4" />
        <h3 className="font-heading font-semibold text-foreground mb-2">
          Publication History
        </h3>
        <p className="text-muted-foreground">
          Track your automated news posts and engagement metrics
        </p>
      </div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Icon name="Send" size={24} className="mx-auto text-primary mb-2" />
          <div className="text-2xl font-heading font-semibold text-foreground">
            {stats?.publishedCount}
          </div>
          <div className="text-sm text-muted-foreground">Published</div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Icon name="Eye" size={24} className="mx-auto text-success mb-2" />
          <div className="text-2xl font-heading font-semibold text-foreground">
            {stats?.totalViews?.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total Views</div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Icon name="Heart" size={24} className="mx-auto text-accent mb-2" />
          <div className="text-2xl font-heading font-semibold text-foreground">
            {stats?.totalReactions}
          </div>
          <div className="text-sm text-muted-foreground">Reactions</div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Icon name="Share" size={24} className="mx-auto text-secondary mb-2" />
          <div className="text-2xl font-heading font-semibold text-foreground">
            {stats?.totalForwards}
          </div>
          <div className="text-sm text-muted-foreground">Forwards</div>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Filter Publications</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            placeholder="Search publications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />
          
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
          
          <Select
            options={channelOptions}
            value={channelFilter}
            onChange={setChannelFilter}
            placeholder="Filter by channel"
          />
          
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
            placeholder="Select date range"
          />
        </div>
      </div>
      {/* Publications List */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <h4 className="font-medium text-foreground">
            Recent Publications ({filteredPublications?.length})
          </h4>
        </div>
        
        <div className="divide-y divide-border">
          {filteredPublications?.length === 0 ? (
            <div className="p-8 text-center">
              <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No publications found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your filters or check back later
              </p>
            </div>
          ) : (
            filteredPublications?.map((publication) => {
              const statusConfig = getStatusIcon(publication?.status);
              
              return (
                <div key={publication?.id} className="p-4 hover:bg-muted/50 transition-smooth">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon 
                          name={statusConfig?.icon} 
                          size={16} 
                          className={statusConfig?.color} 
                        />
                        <span className={`
                          px-2 py-0.5 rounded-full text-xs font-medium
                          ${getStatusBadge(publication?.status)}
                        `}>
                          {publication?.status?.charAt(0)?.toUpperCase() + publication?.status?.slice(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {publication?.timestamp?.toLocaleString()}
                        </span>
                      </div>
                      
                      <h5 className="font-medium text-foreground mb-1 truncate">
                        {publication?.title}
                      </h5>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Icon name="Hash" size={12} />
                          <span>{publication?.channel}</span>
                        </span>
                        
                        {publication?.status === 'published' && (
                          <>
                            <span className="flex items-center space-x-1">
                              <Icon name="Eye" size={12} />
                              <span>{publication?.views}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Icon name="Heart" size={12} />
                              <span>{publication?.reactions}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Icon name="Share" size={12} />
                              <span>{publication?.forwards}</span>
                            </span>
                          </>
                        )}
                      </div>
                      
                      {publication?.error && (
                        <div className="mt-2 p-2 bg-error/10 border border-error/20 rounded text-xs text-error">
                          <Icon name="AlertTriangle" size={12} className="inline mr-1" />
                          {publication?.error}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {publication?.status === 'failed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRetryPublication(publication?.id)}
                          iconName="RefreshCw"
                        >
                          Retry
                        </Button>
                      )}
                      
                      {publication?.status === 'published' && publication?.messageId && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(`https://t.me/${publication?.channel?.replace('@', '')}/${publication?.messageId}`, '_blank')}
                          iconName="ExternalLink"
                        >
                          View
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeletePublication(publication?.id)}
                        iconName="Trash2"
                        className="text-error hover:text-error"
                      >
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {/* Export Options */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Export Data</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={() => {/* Handle CSV export */}}
          >
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="FileText"
            onClick={() => {/* Handle JSON export */}}
          >
            Export JSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="BarChart"
            onClick={() => {/* Handle analytics export */}}
          >
            Analytics Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublicationHistory;