import React, { useState, useEffect, useCallback } from 'react';
import NewsCard from './NewsCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NewsFeed = ({ 
  viewMode = 'tiles',
  searchQuery = '',
  filters = {},
  onArticleAnalyze = () => {},
  onArticleSave = () => {},
  onArticleShare = () => {}
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [newArticlesCount, setNewArticlesCount] = useState(0);

  // Mock articles data
  const mockArticles = [
    {
      id: '1',
      title: 'Revolutionary AI Breakthrough Transforms Healthcare Diagnostics',
      summary: {
        short: 'New AI system achieves 99% accuracy in early cancer detection.',
        medium: 'New AI system achieves 99% accuracy in early cancer detection, potentially saving millions of lives through faster diagnosis and treatment.',
        long: 'New AI system achieves 99% accuracy in early cancer detection, potentially saving millions of lives through faster diagnosis and treatment.\n\nThe breakthrough technology combines machine learning with advanced imaging techniques to identify cancerous cells at their earliest stages, when treatment is most effective.'
      },
      source: 'Medical Journal Today',
      author: 'Dr. Sarah Chen',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      category: 'Healthcare',
      sentiment: 'positive',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
      tags: ['AI', 'Healthcare', 'Cancer', 'Diagnostics'],
      engagement: { views: 2847, shares: 156, comments: 89 }
    },
    {
      id: '2',
      title: 'Climate Change Summit Reaches Historic Agreement on Carbon Emissions',
      summary: {
        short: '195 countries commit to 50% emission reduction by 2030.',
        medium: '195 countries commit to 50% emission reduction by 2030, marking the most ambitious climate action plan in history.',
        long: '195 countries commit to 50% emission reduction by 2030, marking the most ambitious climate action plan in history.\n\nThe agreement includes binding targets for renewable energy adoption and establishes a $100 billion fund for developing nations to transition to clean energy.'
      },
      source: 'Global News Network',
      author: 'Maria Rodriguez',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      category: 'Environment',
      sentiment: 'positive',
      image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&h=400&fit=crop',
      tags: ['Climate', 'Environment', 'Policy', 'Global'],
      engagement: { views: 1923, shares: 234, comments: 67 }
    },
    {
      id: '3',
      title: 'Cryptocurrency Market Faces Major Volatility Amid Regulatory Concerns',
      summary: {
        short: 'Bitcoin drops 15% as governments consider stricter regulations.',
        medium: 'Bitcoin drops 15% as governments consider stricter regulations, causing widespread concern among investors.',
        long: 'Bitcoin drops 15% as governments consider stricter regulations, causing widespread concern among investors.\n\nThe decline follows announcements from several major economies about potential restrictions on cryptocurrency trading and mining operations.'
      },
      source: 'Financial Times',
      author: 'James Wilson',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      category: 'Finance',
      sentiment: 'negative',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop',
      tags: ['Cryptocurrency', 'Bitcoin', 'Finance', 'Regulation'],
      engagement: { views: 3456, shares: 89, comments: 234 }
    },
    {
      id: '4',
      title: 'Space Exploration Milestone: First Human Mission to Mars Approved',
      summary: {
        short: 'NASA announces 2028 launch date for crewed Mars mission.',
        medium: 'NASA announces 2028 launch date for crewed Mars mission, marking humanity\'s next giant leap in space exploration.',
        long: 'NASA announces 2028 launch date for crewed Mars mission, marking humanity\'s next giant leap in space exploration.\n\nThe mission will involve a crew of six astronauts on an 18-month journey to establish the first human settlement on the Red Planet.'
      },
      source: 'Space Today',
      author: 'Dr. Michael Thompson',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      category: 'Science',
      sentiment: 'positive',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=400&fit=crop',
      tags: ['Space', 'Mars', 'NASA', 'Exploration'],
      engagement: { views: 4567, shares: 345, comments: 123 }
    },
    {
      id: '5',
      title: 'Tech Giants Face Antitrust Investigation Over Market Dominance',
      summary: {
        short: 'EU launches probe into major technology companies\' practices.',
        medium: 'EU launches probe into major technology companies\' practices, focusing on potential monopolistic behavior.',
        long: 'EU launches probe into major technology companies\' practices, focusing on potential monopolistic behavior.\n\nThe investigation will examine how these companies use their market position to stifle competition and whether they engage in unfair business practices.'
      },
      source: 'Tech Business Weekly',
      author: 'Lisa Anderson',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      category: 'Technology',
      sentiment: 'neutral',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
      tags: ['Technology', 'Antitrust', 'EU', 'Business'],
      engagement: { views: 2134, shares: 167, comments: 78 }
    },
    {
      id: '6',
      title: 'Renewable Energy Breakthrough: Solar Efficiency Reaches 40%',
      summary: {
        short: 'New solar panel technology doubles energy conversion rates.',
        medium: 'New solar panel technology doubles energy conversion rates, making renewable energy more cost-effective than ever.',
        long: 'New solar panel technology doubles energy conversion rates, making renewable energy more cost-effective than ever.\n\nThe breakthrough uses perovskite-silicon tandem cells to achieve unprecedented efficiency levels, potentially revolutionizing the solar industry.'
      },
      source: 'Energy Innovation',
      author: 'Dr. Robert Kim',
      publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
      category: 'Energy',
      sentiment: 'positive',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop',
      tags: ['Solar', 'Renewable', 'Energy', 'Innovation'],
      engagement: { views: 1876, shares: 234, comments: 56 }
    }
  ];

  // Filter articles based on search and filters
  const filterArticles = useCallback((articleList) => {
    let filtered = [...articleList];

    // Search filter
    if (searchQuery) {
      filtered = filtered?.filter(article =>
        article?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        article?.summary?.short?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        article?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Source filter
    if (filters?.sources && filters?.sources?.length > 0) {
      filtered = filtered?.filter(article =>
        filters?.sources?.some(source => 
          article?.source?.toLowerCase()?.includes(source?.toLowerCase())
        )
      );
    }

    // Keyword filter
    if (filters?.keywords && filters?.keywords?.length > 0) {
      filtered = filtered?.filter(article =>
        filters?.keywords?.some(keyword =>
          article?.title?.toLowerCase()?.includes(keyword?.toLowerCase()) ||
          article?.tags?.some(tag => tag?.toLowerCase()?.includes(keyword?.toLowerCase()))
        )
      );
    }

    // Sentiment filter
    if (filters?.sentiment && filters?.sentiment !== 'all') {
      filtered = filtered?.filter(article => article?.sentiment === filters?.sentiment);
    }

    return filtered;
  }, [searchQuery, filters]);

  // Load initial articles
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = filterArticles(mockArticles);
      setArticles(filtered);
      setLoading(false);
    }, 500);
  }, [filterArticles]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNewArticlesCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Load more articles
  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const moreArticles = mockArticles?.map(article => ({
        ...article,
        id: `${article?.id}-${page}`,
        publishedAt: new Date(Date.now() - (page * 24 * 60 * 60 * 1000))
      }));
      let filtered = filterArticles(moreArticles);
      setArticles(prev => [...prev, ...filtered]);
      setPage(prev => prev + 1);
      setLoading(false);
      
      if (page >= 3) {
        setHasMore(false);
      }
    }, 1000);
  };

  // Load new articles
  const loadNewArticles = () => {
    const newArticles = mockArticles?.slice(0, newArticlesCount)?.map(article => ({
      ...article,
      id: `new-${article?.id}-${Date.now()}`,
      publishedAt: new Date()
    }));
    
    setArticles(prev => [...newArticles, ...prev]);
    setNewArticlesCount(0);
  };

  const getGridClasses = () => {
    switch (viewMode) {
      case 'tiles':
        return 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6';
      case 'strips':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-4';
      case 'list':
        return 'space-y-4';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6';
    }
  };

  if (loading && articles?.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="text-center">
          <Icon name="Loader" size={48} className="mx-auto text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading your personalized news feed...</p>
        </div>
      </div>
    );
  }

  if (articles?.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="font-heading font-semibold text-foreground mb-2">No articles found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search terms to find more articles.
          </p>
          <Button
            variant="outline"
            onClick={() => window.location?.reload()}
          >
            Refresh Feed
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      {/* New Articles Notification */}
      {newArticlesCount > 0 && (
        <div className="sticky top-0 z-10 bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={18} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                {newArticlesCount} new article{newArticlesCount > 1 ? 's' : ''} available
              </span>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={loadNewArticles}
            >
              Load New Articles
            </Button>
          </div>
        </div>
      )}
      {/* Articles Grid */}
      <div className={getGridClasses()}>
        {articles?.map((article) => (
          <NewsCard
            key={article?.id}
            article={article}
            viewMode={viewMode}
            onSave={onArticleSave}
            onAnalyze={onArticleAnalyze}
            onShare={onArticleShare}
          />
        ))}
      </div>
      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center py-8">
          <Button
            variant="outline"
            onClick={loadMore}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            {loading ? (
              <>
                <Icon name="Loader" size={16} className="animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Icon name="ChevronDown" size={16} />
                <span>Load More Articles</span>
              </>
            )}
          </Button>
        </div>
      )}
      {/* End of Feed */}
      {!hasMore && articles?.length > 0 && (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={24} className="mx-auto text-success mb-2" />
          <p className="text-sm text-muted-foreground">
            You've reached the end of your feed
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;