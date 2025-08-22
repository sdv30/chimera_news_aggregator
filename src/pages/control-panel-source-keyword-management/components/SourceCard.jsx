import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SourceCard = ({ 
  source, 
  onToggle, 
  onEdit, 
  onDelete, 
  onPreview 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [articleCount, setArticleCount] = useState(source?.articleCount || 0);

  // Simulate real-time article count updates via WebSocket
  useEffect(() => {
    if (source?.status === 'active') {
      const interval = setInterval(() => {
        setArticleCount(prev => prev + Math.floor(Math.random() * 3));
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [source?.status]);

  const handleToggle = () => {
    setIsAnimating(true);
    onToggle(source?.id);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getStatusConfig = () => {
    switch (source?.status) {
      case 'active':
        return {
          color: 'text-success',
          bg: 'bg-success/10',
          icon: 'CheckCircle',
          text: 'Active'
        };
      case 'error':
        return {
          color: 'text-error',
          bg: 'bg-error/10',
          icon: 'AlertCircle',
          text: 'Error'
        };
      case 'inactive':
        return {
          color: 'text-muted-foreground',
          bg: 'bg-muted',
          icon: 'Circle',
          text: 'Inactive'
        };
      default:
        return {
          color: 'text-warning',
          bg: 'bg-warning/10',
          icon: 'Loader',
          text: 'Processing'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className={`
      bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-moderate
      ${isAnimating ? 'scale-105' : 'scale-100'}
    `}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={source?.type === 'rss' ? 'Rss' : 'Globe'} 
              size={16} 
              className="text-primary flex-shrink-0" 
            />
            <h3 className="font-heading font-medium text-foreground truncate">
              {source?.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {source?.url}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPreview(source)}
            className="flex-shrink-0"
          >
            <Icon name="Eye" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(source)}
            className="flex-shrink-0"
          >
            <Icon name="Edit" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(source?.id)}
            className="flex-shrink-0 text-error hover:text-error"
          >
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
      {/* Status and Metrics */}
      <div className="flex items-center justify-between mb-4">
        <div className={`
          flex items-center space-x-2 px-3 py-1 rounded-full ${statusConfig?.bg}
        `}>
          <Icon 
            name={statusConfig?.icon} 
            size={14} 
            className={`${statusConfig?.color} ${source?.status === 'processing' ? 'animate-spin' : ''}`} 
          />
          <span className={`text-xs font-medium ${statusConfig?.color}`}>
            {statusConfig?.text}
          </span>
        </div>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="FileText" size={14} />
            <span>{articleCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{source?.lastUpdate || '2h ago'}</span>
          </div>
        </div>
      </div>
      {/* Description */}
      {source?.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {source?.description}
        </p>
      )}
      {/* Tags */}
      {source?.tags && source?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {source?.tags?.slice(0, 3)?.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {source?.tags?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{source?.tags?.length - 3}
            </span>
          )}
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant={source?.status === 'active' ? 'outline' : 'default'}
            size="sm"
            onClick={handleToggle}
            iconName={source?.status === 'active' ? 'Pause' : 'Play'}
            iconPosition="left"
          >
            {source?.status === 'active' ? 'Pause' : 'Start'}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          Added {source?.createdAt || 'Today'}
        </div>
      </div>
    </div>
  );
};

export default SourceCard;