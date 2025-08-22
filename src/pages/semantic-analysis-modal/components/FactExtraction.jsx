import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FactExtraction = ({ facts }) => {
  const [selectedFact, setSelectedFact] = useState(null);

  const mockFacts = facts || [
    {
      id: 1,
      type: 'statistic',
      claim: 'Tesla delivered 1.8 million vehicles in 2023',
      confidence: 0.95,
      source: 'Tesla Q4 2023 earnings report',
      verification: 'verified',
      context: 'Annual vehicle delivery numbers',
      relatedEntities: ['Tesla Inc.', 'Q4 2023'],
      importance: 'high'
    },
    {
      id: 2,
      type: 'financial',
      claim: 'Stock price increased by 15% following the announcement',
      confidence: 0.88,
      source: 'Market data analysis',
      verification: 'pending',
      context: 'Market reaction to product launch',
      relatedEntities: ['Tesla Inc.', 'Stock Market'],
      importance: 'medium'
    },
    {
      id: 3,
      type: 'event',
      claim: 'Cybertruck production will begin in late 2024',
      confidence: 0.82,
      source: 'Official company statement',
      verification: 'verified',
      context: 'Production timeline announcement',
      relatedEntities: ['Cybertruck', 'Tesla Inc.'],
      importance: 'high'
    },
    {
      id: 4,
      type: 'quote',
      claim: '"We are committed to sustainable transportation for everyone"',
      confidence: 0.98,
      source: 'CEO public statement',
      verification: 'verified',
      context: 'Company mission statement',
      relatedEntities: ['Elon Musk', 'Tesla Inc.'],
      importance: 'medium'
    },
    {
      id: 5,
      type: 'technical',
      claim: 'New battery technology increases range by 20%',
      confidence: 0.75,
      source: 'Technical specifications',
      verification: 'unverified',
      context: 'Product improvement claims',
      relatedEntities: ['Battery Technology', 'Model Y'],
      importance: 'high'
    }
  ];

  const getFactIcon = (type) => {
    switch (type) {
      case 'statistic': return 'BarChart3';
      case 'financial': return 'DollarSign';
      case 'event': return 'Calendar';
      case 'quote': return 'Quote';
      case 'technical': return 'Cog';
      default: return 'FileText';
    }
  };

  const getFactColor = (type) => {
    switch (type) {
      case 'statistic': return 'text-blue-600 bg-blue-50';
      case 'financial': return 'text-green-600 bg-green-50';
      case 'event': return 'text-purple-600 bg-purple-50';
      case 'quote': return 'text-orange-600 bg-orange-50';
      case 'technical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getVerificationIcon = (status) => {
    switch (status) {
      case 'verified': return { icon: 'CheckCircle', color: 'text-success' };
      case 'pending': return { icon: 'Clock', color: 'text-warning' };
      case 'unverified': return { icon: 'AlertCircle', color: 'text-error' };
      default: return { icon: 'HelpCircle', color: 'text-muted-foreground' };
    }
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-heading font-bold text-foreground">{mockFacts?.length}</div>
          <div className="text-sm text-muted-foreground">Total Facts</div>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-heading font-bold text-success">
            {mockFacts?.filter(f => f?.verification === 'verified')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Verified</div>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-heading font-bold text-warning">
            {mockFacts?.filter(f => f?.verification === 'pending')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-heading font-bold text-error">
            {mockFacts?.filter(f => f?.importance === 'high')?.length}
          </div>
          <div className="text-sm text-muted-foreground">High Priority</div>
        </div>
      </div>
      {/* Facts List */}
      <div className="space-y-4">
        {mockFacts?.map((fact) => {
          const verification = getVerificationIcon(fact?.verification);
          
          return (
            <div 
              key={fact?.id} 
              className={`bg-muted rounded-lg p-4 border-l-4 ${getImportanceColor(fact?.importance)} hover:bg-muted/80 transition-smooth cursor-pointer`}
              onClick={() => setSelectedFact(selectedFact === fact?.id ? null : fact?.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg ${getFactColor(fact?.type)}`}>
                    <Icon name={getFactIcon(fact?.type)} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {fact?.type}
                      </span>
                      <Icon name={verification?.icon} size={14} className={verification?.color} />
                      <span className={`text-xs capitalize ${verification?.color}`}>
                        {fact?.verification}
                      </span>
                    </div>
                    
                    <p className="text-foreground font-medium mb-2 leading-relaxed">
                      {fact?.claim}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Target" size={12} />
                        <span>Confidence: {Math.round(fact?.confidence * 100)}%</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="AlertTriangle" size={12} />
                        <span className="capitalize">{fact?.importance} priority</span>
                      </div>
                    </div>
                    
                    {/* Confidence Bar */}
                    <div className="mt-2">
                      <div className="w-full bg-background rounded-full h-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-500"
                          style={{ width: `${fact?.confidence * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8"
                    title="Verify fact"
                  >
                    <Icon name="Search" size={14} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8"
                    title="Save fact"
                  >
                    <Icon name="Bookmark" size={14} />
                  </Button>
                  
                  <Icon 
                    name={selectedFact === fact?.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-muted-foreground"
                  />
                </div>
              </div>
              {/* Expanded Details */}
              {selectedFact === fact?.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-1">Context</h5>
                    <p className="text-sm text-muted-foreground">{fact?.context}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-1">Source</h5>
                    <p className="text-sm text-muted-foreground">{fact?.source}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Related Entities</h5>
                    <div className="flex flex-wrap gap-2">
                      {fact?.relatedEntities?.map((entity, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {entity}
                        </span>
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

export default FactExtraction;