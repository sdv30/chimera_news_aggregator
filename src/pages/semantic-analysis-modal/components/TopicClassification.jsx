import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TopicClassification = ({ topics }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const mockTopics = topics || [
    {
      id: 1,
      name: 'Electric Vehicles',
      confidence: 0.92,
      relevance: 0.88,
      category: 'Technology',
      keywords: ['electric', 'vehicle', 'EV', 'battery', 'charging'],
      relatedTopics: ['Sustainable Transportation', 'Clean Energy', 'Automotive Industry'],
      trend: 'rising',
      articles: 1247,
      description: 'Discussion about electric vehicle technology, market trends, and adoption'
    },
    {
      id: 2,
      name: 'Sustainable Transportation',
      confidence: 0.85,
      relevance: 0.79,
      category: 'Environment',
      keywords: ['sustainable', 'green', 'eco-friendly', 'carbon', 'emissions'],
      relatedTopics: ['Electric Vehicles', 'Climate Change', 'Green Technology'],
      trend: 'stable',
      articles: 892,
      description: 'Environmental impact and sustainability in transportation sector'
    },
    {
      id: 3,
      name: 'Automotive Industry',
      confidence: 0.78,
      relevance: 0.72,
      category: 'Business',
      keywords: ['automotive', 'manufacturing', 'production', 'market', 'sales'],
      relatedTopics: ['Electric Vehicles', 'Technology Innovation', 'Supply Chain'],
      trend: 'declining',
      articles: 634,
      description: 'Business developments and market analysis in automotive sector'
    },
    {
      id: 4,
      name: 'Technology Innovation',
      confidence: 0.81,
      relevance: 0.75,
      category: 'Technology',
      keywords: ['innovation', 'technology', 'advancement', 'breakthrough', 'development'],
      relatedTopics: ['Artificial Intelligence', 'Electric Vehicles', 'Research'],
      trend: 'rising',
      articles: 1089,
      description: 'Latest technological innovations and breakthrough developments'
    },
    {
      id: 5,
      name: 'Financial Markets',
      confidence: 0.73,
      relevance: 0.68,
      category: 'Finance',
      keywords: ['stock', 'market', 'investment', 'financial', 'trading'],
      relatedTopics: ['Corporate Finance', 'Market Analysis', 'Investment Strategy'],
      trend: 'stable',
      articles: 756,
      description: 'Stock market movements and financial market analysis'
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'rising': return { icon: 'TrendingUp', color: 'text-success' };
      case 'declining': return { icon: 'TrendingDown', color: 'text-error' };
      case 'stable': return { icon: 'Minus', color: 'text-muted-foreground' };
      default: return { icon: 'HelpCircle', color: 'text-muted-foreground' };
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'technology': return 'text-blue-600 bg-blue-50';
      case 'business': return 'text-green-600 bg-green-50';
      case 'environment': return 'text-emerald-600 bg-emerald-50';
      case 'finance': return 'text-purple-600 bg-purple-50';
      case 'politics': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const sortedTopics = [...mockTopics]?.sort((a, b) => b?.confidence - a?.confidence);

  return (
    <div className="space-y-6">
      {/* Topic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Tag" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Primary Topic</span>
          </div>
          <div className="text-lg font-heading font-semibold text-foreground">
            {sortedTopics?.[0]?.name || 'Electric Vehicles'}
          </div>
          <div className="text-sm text-muted-foreground">
            {Math.round((sortedTopics?.[0]?.confidence || 0.92) * 100)}% confidence
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="BarChart3" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Topics Found</span>
          </div>
          <div className="text-lg font-heading font-semibold text-foreground">
            {sortedTopics?.length}
          </div>
          <div className="text-sm text-muted-foreground">
            Across {new Set(sortedTopics.map(t => t.category))?.size} categories
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Trending</span>
          </div>
          <div className="text-lg font-heading font-semibold text-foreground">
            {sortedTopics?.filter(t => t?.trend === 'rising')?.length}
          </div>
          <div className="text-sm text-muted-foreground">
            Rising topics
          </div>
        </div>
      </div>
      {/* Topics List */}
      <div className="space-y-4">
        {sortedTopics?.map((topic, index) => {
          const trendConfig = getTrendIcon(topic?.trend);
          const isExpanded = selectedTopic === topic?.id;
          
          return (
            <div 
              key={topic?.id}
              className="bg-muted rounded-lg p-4 hover:bg-muted/80 transition-smooth cursor-pointer"
              onClick={() => setSelectedTopic(isExpanded ? null : topic?.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-lg text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-heading font-medium text-foreground">{topic?.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(topic?.category)}`}>
                        {topic?.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Icon name={trendConfig?.icon} size={14} className={trendConfig?.color} />
                        <span className={`text-xs capitalize ${trendConfig?.color}`}>
                          {topic?.trend}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{topic?.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <Icon name="Target" size={12} />
                        <span>Confidence: {Math.round(topic?.confidence * 100)}%</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} />
                        <span>Relevance: {Math.round(topic?.relevance * 100)}%</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="FileText" size={12} />
                        <span>{topic?.articles?.toLocaleString()} articles</span>
                      </div>
                    </div>
                    
                    {/* Progress Bars */}
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Confidence</span>
                          <span>{Math.round(topic?.confidence * 100)}%</span>
                        </div>
                        <div className="w-full bg-background rounded-full h-1.5">
                          <div 
                            className="bg-primary h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${topic?.confidence * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Relevance</span>
                          <span>{Math.round(topic?.relevance * 100)}%</span>
                        </div>
                        <div className="w-full bg-background rounded-full h-1.5">
                          <div 
                            className="bg-secondary h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${topic?.relevance * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8"
                    title="Add to monitoring"
                    onClick={(e) => {
                      e?.stopPropagation();
                      // Add topic to monitoring
                    }}
                  >
                    <Icon name="Plus" size={14} />
                  </Button>
                  
                  <Icon 
                    name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-muted-foreground"
                  />
                </div>
              </div>
              {/* Expanded Details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-border space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Key Keywords</h5>
                    <div className="flex flex-wrap gap-2">
                      {topic?.keywords?.map((keyword, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Related Topics</h5>
                    <div className="flex flex-wrap gap-2">
                      {topic?.relatedTopics?.map((relatedTopic, idx) => (
                        <button
                          key={idx}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth"
                          onClick={(e) => {
                            e?.stopPropagation();
                            // Navigate to related topic
                          }}
                        >
                          {relatedTopic}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopicClassification;