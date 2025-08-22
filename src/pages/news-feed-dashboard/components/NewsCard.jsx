import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const NewsCard = ({ 
  article = {},
  viewMode = 'tiles',
  onSave = () => {},
  onAnalyze = () => {},
  onShare = () => {}
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [summaryLength, setSummaryLength] = useState('short');
  const [isSaved, setIsSaved] = useState(article?.saved || false);

  const mockArticle = {
    id: article?.id || '1',
    title: article?.title || `Breaking: Major Breakthrough in AI Technology Promises Revolutionary Changes Across Industries`,
    summary: {
      short: article?.summary?.short || `Scientists announce groundbreaking AI advancement with potential to transform healthcare and education sectors.`,
      medium: article?.summary?.medium || `Scientists announce groundbreaking AI advancement with potential to transform healthcare and education sectors. The new technology demonstrates unprecedented accuracy in medical diagnosis and personalized learning applications, marking a significant milestone in artificial intelligence development.`,
      long: article?.summary?.long || `Scientists announce groundbreaking AI advancement with potential to transform healthcare and education sectors. The new technology demonstrates unprecedented accuracy in medical diagnosis and personalized learning applications, marking a significant milestone in artificial intelligence development.\n\nResearchers from leading institutions collaborated on this project for over three years, combining machine learning algorithms with advanced neural networks. The breakthrough addresses previous limitations in AI reliability and opens new possibilities for real-world applications across multiple industries.`
    },
    source: article?.source || 'TechNews Today',
    author: article?.author || 'Dr. Sarah Johnson',
    publishedAt: article?.publishedAt || new Date(Date.now() - 2 * 60 * 60 * 1000),
    readTime: article?.readTime || '3 min read',
    category: article?.category || 'Technology',
    sentiment: article?.sentiment || 'positive',
    image: article?.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    tags: article?.tags || ['AI', 'Technology', 'Healthcare', 'Innovation'],
    engagement: article?.engagement || { views: 1247, shares: 89, comments: 23 },
    saved: isSaved,
    ...article
  };

  const getSentimentEmoji = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😔';
      case 'neutral': return '😐';
      default: return '📰';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      case 'neutral': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(mockArticle?.id, !isSaved);
  };

  const handleShare = (platform) => {
    onShare(mockArticle, platform);
  };

  const summaryLengthOptions = [
    { value: 'short', label: '2-3 sentences', icon: 'Minus' },
    { value: 'medium', label: '5-7 sentences', icon: 'Equal' },
    { value: 'long', label: 'Full paragraph', icon: 'Plus' }
  ];

  if (viewMode === 'list') {
    return (
      <div className="flex items-start space-x-4 p-4 bg-card border border-border rounded-lg hover:shadow-moderate transition-smooth">
        <div className="flex-shrink-0 w-24 h-16 bg-muted rounded-lg overflow-hidden">
          <Image
            src={mockArticle?.image}
            alt={mockArticle?.title}
            className="w-full h-full object-cover"
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-heading font-semibold text-foreground line-clamp-2 mb-1">
                {mockArticle?.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {mockArticle?.summary?.[summaryLength]}
              </p>
              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                <span>{mockArticle?.source}</span>
                <span>•</span>
                <span>{formatTimeAgo(mockArticle?.publishedAt)}</span>
                <span>•</span>
                <span className={getSentimentColor(mockArticle?.sentiment)}>
                  {getSentimentEmoji(mockArticle?.sentiment)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSave}
                className="w-8 h-8"
              >
                <Icon 
                  name={isSaved ? "Bookmark" : "BookmarkPlus"} 
                  size={14} 
                  className={isSaved ? "text-primary" : ""} 
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onAnalyze(mockArticle)}
                className="w-8 h-8"
              >
                <Icon name="Brain" size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'strips') {
    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-moderate transition-smooth">
        <div className="flex">
          <div className="flex-shrink-0 w-32 h-24 bg-muted overflow-hidden">
            <Image
              src={mockArticle?.image}
              alt={mockArticle?.title}
              className="w-full h-full object-cover"
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
          
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-heading font-semibold text-foreground line-clamp-2 flex-1">
                {mockArticle?.title}
              </h3>
              <div className="flex items-center space-x-1 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSave}
                  className="w-8 h-8"
                >
                  <Icon 
                    name={isSaved ? "Bookmark" : "BookmarkPlus"} 
                    size={14} 
                    className={isSaved ? "text-primary" : ""} 
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onAnalyze(mockArticle)}
                  className="w-8 h-8"
                >
                  <Icon name="Brain" size={14} />
                </Button>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {mockArticle?.summary?.[summaryLength]}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                <span>{mockArticle?.source}</span>
                <span>•</span>
                <span>{formatTimeAgo(mockArticle?.publishedAt)}</span>
                <span>•</span>
                <span className={getSentimentColor(mockArticle?.sentiment)}>
                  {getSentimentEmoji(mockArticle?.sentiment)}
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                {summaryLengthOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => setSummaryLength(option?.value)}
                    className={`
                      p-1 rounded transition-smooth
                      ${summaryLength === option?.value
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                    `}
                    title={option?.label}
                  >
                    <Icon name={option?.icon} size={12} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default tiles view
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-moderate transition-smooth group">
      {/* Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <Image
          src={mockArticle?.image}
          alt={mockArticle?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className="w-8 h-8 bg-black/20 backdrop-blur-sm hover:bg-black/40"
          >
            <Icon 
              name={isSaved ? "Bookmark" : "BookmarkPlus"} 
              size={14} 
              color="white"
              className={isSaved ? "text-primary" : ""} 
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onAnalyze(mockArticle)}
            className="w-8 h-8 bg-black/20 backdrop-blur-sm hover:bg-black/40"
          >
            <Icon name="Brain" size={14} color="white" />
          </Button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
            {mockArticle?.category}
          </span>
        </div>

        {/* Sentiment Indicator */}
        <div className="absolute bottom-3 left-3">
          <div className={`flex items-center space-x-1 px-2 py-1 bg-black/20 backdrop-blur-sm rounded-full ${getSentimentColor(mockArticle?.sentiment)}`}>
            <span className="text-sm">{getSentimentEmoji(mockArticle?.sentiment)}</span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-base font-heading font-semibold text-foreground line-clamp-2 mb-2">
              {mockArticle?.title}
            </h3>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
              <span>{mockArticle?.source}</span>
              <span>•</span>
              <span>{mockArticle?.author}</span>
              <span>•</span>
              <span>{formatTimeAgo(mockArticle?.publishedAt)}</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {mockArticle?.summary?.[summaryLength]}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {mockArticle?.tags?.slice(0, 3)?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Summary Length Controls */}
          <div className="flex items-center space-x-1">
            {summaryLengthOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => setSummaryLength(option?.value)}
                className={`
                  p-1.5 rounded transition-smooth
                  ${summaryLength === option?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
                title={option?.label}
              >
                <Icon name={option?.icon} size={12} />
              </button>
            ))}
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={12} />
              <span>{mockArticle?.engagement?.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Share2" size={12} />
              <span>{mockArticle?.engagement?.shares}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={12} />
              <span>{mockArticle?.engagement?.comments}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAnalyze(mockArticle)}
              className="flex items-center space-x-1"
            >
              <Icon name="Brain" size={14} />
              <span>Analyze</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('telegram')}
              className="flex items-center space-x-1"
            >
              <Icon name="Send" size={14} />
              <span>Share</span>
            </Button>
          </div>
          
          <span className="text-xs text-muted-foreground">
            {mockArticle?.readTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;