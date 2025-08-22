import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EntityRecognition = ({ entities }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const entityCategories = [
    { id: 'all', label: 'All Entities', icon: 'Globe', count: entities?.length || 0 },
    { id: 'person', label: 'People', icon: 'User', count: entities?.filter(e => e?.type === 'person')?.length || 0 },
    { id: 'organization', label: 'Organizations', icon: 'Building', count: entities?.filter(e => e?.type === 'organization')?.length || 0 },
    { id: 'location', label: 'Locations', icon: 'MapPin', count: entities?.filter(e => e?.type === 'location')?.length || 0 },
    { id: 'event', label: 'Events', icon: 'Calendar', count: entities?.filter(e => e?.type === 'event')?.length || 0 },
    { id: 'product', label: 'Products', icon: 'Package', count: entities?.filter(e => e?.type === 'product')?.length || 0 }
  ];

  const mockEntities = entities || [
    { id: 1, name: 'Elon Musk', type: 'person', confidence: 0.95, mentions: 8, description: 'CEO of Tesla and SpaceX', wikiUrl: 'https://en.wikipedia.org/wiki/Elon_Musk' },
    { id: 2, name: 'Tesla Inc.', type: 'organization', confidence: 0.92, mentions: 12, description: 'Electric vehicle manufacturer', wikiUrl: 'https://en.wikipedia.org/wiki/Tesla,_Inc.' },
    { id: 3, name: 'Austin, Texas', type: 'location', confidence: 0.88, mentions: 3, description: 'City in Texas, USA', wikiUrl: 'https://en.wikipedia.org/wiki/Austin,_Texas' },
    { id: 4, name: 'Cybertruck Launch', type: 'event', confidence: 0.85, mentions: 5, description: 'Tesla vehicle launch event', wikiUrl: null },
    { id: 5, name: 'Model Y', type: 'product', confidence: 0.90, mentions: 7, description: 'Tesla electric SUV', wikiUrl: 'https://en.wikipedia.org/wiki/Tesla_Model_Y' },
    { id: 6, name: 'SpaceX', type: 'organization', confidence: 0.87, mentions: 4, description: 'Private space exploration company', wikiUrl: 'https://en.wikipedia.org/wiki/SpaceX' }
  ];

  const filteredEntities = selectedCategory === 'all' 
    ? mockEntities 
    : mockEntities?.filter(entity => entity?.type === selectedCategory);

  const getEntityIcon = (type) => {
    switch (type) {
      case 'person': return 'User';
      case 'organization': return 'Building';
      case 'location': return 'MapPin';
      case 'event': return 'Calendar';
      case 'product': return 'Package';
      default: return 'Tag';
    }
  };

  const getEntityColor = (type) => {
    switch (type) {
      case 'person': return 'text-blue-600 bg-blue-50';
      case 'organization': return 'text-green-600 bg-green-50';
      case 'location': return 'text-purple-600 bg-purple-50';
      case 'event': return 'text-orange-600 bg-orange-50';
      case 'product': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {entityCategories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth
              ${selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }
            `}
          >
            <Icon name={category?.icon} size={14} />
            <span>{category?.label}</span>
            <span className="bg-background/20 text-xs px-1.5 py-0.5 rounded-full">
              {category?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Entity List */}
      <div className="space-y-3">
        {filteredEntities?.map((entity) => (
          <div key={entity?.id} className="bg-muted rounded-lg p-4 hover:bg-muted/80 transition-smooth">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`p-2 rounded-lg ${getEntityColor(entity?.type)}`}>
                  <Icon name={getEntityIcon(entity?.type)} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground truncate">{entity?.name}</h4>
                    <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-full">
                      {entity?.mentions} mentions
                    </span>
                  </div>
                  
                  {entity?.description && (
                    <p className="text-sm text-muted-foreground mb-2">{entity?.description}</p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Target" size={12} />
                      <span>Confidence: {Math.round(entity?.confidence * 100)}%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Hash" size={12} />
                      <span className="capitalize">{entity?.type}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-3">
                {entity?.wikiUrl && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open(entity?.wikiUrl, '_blank')}
                    className="w-8 h-8"
                    title="View on Wikipedia"
                  >
                    <Icon name="ExternalLink" size={14} />
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {/* Add to monitoring keywords */}}
                  className="w-8 h-8"
                  title="Add to keywords"
                >
                  <Icon name="Plus" size={14} />
                </Button>
              </div>
            </div>
            
            {/* Confidence Bar */}
            <div className="mt-3">
              <div className="w-full bg-background rounded-full h-1">
                <div 
                  className="bg-primary h-1 rounded-full transition-all duration-500"
                  style={{ width: `${entity?.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredEntities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No entities found in this category</p>
        </div>
      )}
    </div>
  );
};

export default EntityRecognition;