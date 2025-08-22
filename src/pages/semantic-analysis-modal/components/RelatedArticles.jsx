import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedArticles = ({ currentArticle, relatedArticles }) => {
  const [sortBy, setSortBy] = useState('similarity');

  const mockRelatedArticles = relatedArticles || [
    {
      id: 1,
      title: 'Tesla Cybertruck Production Ramp-Up Faces New Challenges',
      source: 'TechCrunch',
      publishedAt: '2025-08-19T10:30:00Z',
      similarity: 0.89,
      readTime: 4,
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=200&fit=crop',
      summary: 'Manufacturing complexities and supply chain issues may impact initial Cybertruck delivery timeline.',
      tags: ['Tesla', 'Cybertruck', 'Manufacturing'],
      sentiment: 'neutral'
    },
    {
      id: 2,
      title: 'Electric Vehicle Market Share Reaches Historic High',
      source: 'Reuters',
      publishedAt: '2025-08-19T08:15:00Z',
      similarity: 0.82,
      readTime: 3,
      image: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=200&fit=crop',
      summary: 'Global EV adoption accelerates with Tesla leading market penetration across key regions.',
      tags: ['Electric Vehicles', 'Market Analysis', 'Tesla'],
      sentiment: 'positive'
    },
    {
      id: 3,
      title: 'Battery Technology Breakthrough Could Transform EV Industry',
      source: 'MIT Technology Review',
      publishedAt: '2025-08-18T16:45:00Z',
      similarity: 0.78,
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
      summary: 'New solid-state battery technology promises longer range and faster charging capabilities.',
      tags: ['Battery Technology', 'Innovation', 'Research'],
      sentiment: 'positive'
    },
    {
      id: 4,
      title: 'Automotive Industry Faces Supply Chain Disruptions',
      source: 'Wall Street Journal',
      publishedAt: '2025-08-18T14:20:00Z',
      similarity: 0.71,
      readTime: 5,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?w=400&h=200&fit=crop',
      summary: 'Semiconductor shortages continue to impact vehicle production across major manufacturers.',
      tags: ['Supply Chain', 'Automotive', 'Manufacturing'],
      sentiment: 'negative'
    },
    {
      id: 5,
      title: 'Sustainable Transportation Policies Drive EV Adoption',
      source: 'Bloomberg',
      publishedAt: '2025-08-17T11:30:00Z',
      similarity: 0.68,
      readTime: 4,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop',
      summary: 'Government incentives and environmental regulations accelerate electric vehicle market growth.',
      tags: ['Policy', 'Environment', 'Government'],
      sentiment: 'positive'
    },
    {
      id: 6,
      title: 'Tesla Stock Analysis: Q4 Earnings Impact on Valuation',
      source: 'Financial Times',
      publishedAt: '2025-08-17T09:00:00Z',
      similarity: 0.85,
      readTime: 7,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop',
      summary: 'Financial experts analyze Tesla\'s market performance following strong Q4 delivery numbers.',
      tags: ['Tesla', 'Stock Market', 'Financial Analysis'],
      sentiment: 'positive'
    }
  ];

  const sortOptions = [
    { value: 'similarity', label: 'Similarity', icon: 'Target' },
    { value: 'date', label: 'Date', icon: 'Calendar' },
    { value: 'relevance', label: 'Relevance', icon: 'Star' }
  ];

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return { icon: 'TrendingUp', color: 'text-success' };
      case 'negative': return { icon: 'TrendingDown', color: 'text-error' };
      case 'neutral': return { icon: 'Minus', color: 'text-muted-foreground' };
      default: return { icon: 'HelpCircle', color: 'text-muted-foreground' };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    }
  };

  const sortedArticles = [...mockRelatedArticles]?.sort((a, b) => {
    switch (sortBy) {
      case 'similarity':
        return b?.similarity - a?.similarity;
      case 'date':
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      case 'relevance':
        return b?.similarity - a?.similarity; // Using similarity as relevance proxy
      default:
        return 0;
    }
  });

  const handleArticleClick = (article) => {
    // Navigate to article or open in new tab
    window.open(`/article/${article?.id}`, '_blank');
  };

  const handleAnalyzeArticle = (article) => {
    // Open semantic analysis for this article
  };

  return (
    <div className="space-y-6">
      {/* Header with Sort Options */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-medium text-foreground">Related Articles</h3>
          <p className="text-sm text-muted-foreground">
            Found {mockRelatedArticles?.length} semantically similar articles
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {sortOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setSortBy(option?.value)}
              className={`
                flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth
                ${sortBy === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                }
              `}
            >
              <Icon name={option?.icon} size={14} />
              <span className="hidden sm:inline">{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sortedArticles?.map((article) => {
          const sentimentConfig = getSentimentIcon(article?.sentiment);
          
          return (
            <div 
              key={article?.id}
              className="bg-muted rounded-lg overflow-hidden hover:bg-muted/80 transition-smooth cursor-pointer group"
              onClick={() => handleArticleClick(article)}
            >
              {/* Article Image */}
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={article?.image}
                  alt={article?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                    {Math.round(article?.similarity * 100)}% match
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <div className={`p-1 bg-black/70 rounded-full ${sentimentConfig?.color}`}>
                    <Icon name={sentimentConfig?.icon} size={12} />
                  </div>
                </div>
              </div>
              {/* Article Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span className="font-medium">{article?.source}</span>
                    <span>•</span>
                    <span>{formatDate(article?.publishedAt)}</span>
                    <span>•</span>
                    <span>{article?.readTime} min read</span>
                  </div>
                </div>

                <h4 className="font-heading font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {article?.title}
                </h4>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {article?.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {article?.tags?.slice(0, 3)?.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {article?.tags?.length > 3 && (
                    <span className="px-2 py-0.5 bg-muted-foreground/10 text-muted-foreground text-xs rounded-full">
                      +{article?.tags?.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Icon name="Target" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {Math.round(article?.similarity * 100)}% similarity
                    </span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        handleAnalyzeArticle(article);
                      }}
                      className="w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Analyze article"
                    >
                      <Icon name="Brain" size={12} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Save article
                      }}
                      className="w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Save article"
                    >
                      <Icon name="Bookmark" size={12} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        window.open(article?.url, '_blank');
                      }}
                      className="w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Open original"
                    >
                      <Icon name="ExternalLink" size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Load More */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => {
            // Load more related articles
          }}
          iconName="Plus"
          iconPosition="left"
        >
          Load More Articles
        </Button>
      </div>
    </div>
  );
};

export default RelatedArticles;