import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalysisHeader = ({ 
  article, 
  onClose, 
  onShare, 
  onSave,
  isSaved = false 
}) => {
  const shareOptions = [
    { name: 'Twitter', icon: 'Twitter', color: 'text-blue-500' },
    { name: 'Facebook', icon: 'Facebook', color: 'text-blue-600' },
    { name: 'LinkedIn', icon: 'Linkedin', color: 'text-blue-700' },
    { name: 'WhatsApp', icon: 'MessageCircle', color: 'text-green-500' },
    { name: 'Telegram', icon: 'Send', color: 'text-blue-400' }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="sticky top-0 z-10 bg-card border-b border-border p-4 lg:p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 pr-4">
          <h1 className="text-lg lg:text-xl font-heading font-semibold text-foreground leading-tight mb-2">
            {article?.title || "Article Analysis"}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={14} />
              <span>{article?.source || "Unknown Source"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} />
              <span>{formatDate(article?.publishedAt || new Date())}</span>
            </div>
            {article?.readTime && (
              <div className="flex items-center space-x-2">
                <Icon name="BookOpen" size={14} />
                <span>{article?.readTime} min read</span>
              </div>
            )}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="flex-shrink-0"
        >
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={isSaved ? "default" : "outline"}
          size="sm"
          onClick={onSave}
          iconName={isSaved ? "BookmarkCheck" : "Bookmark"}
          iconPosition="left"
        >
          {isSaved ? "Saved" : "Save"}
        </Button>

        <div className="flex items-center space-x-1">
          {shareOptions?.map((option) => (
            <Button
              key={option?.name}
              variant="ghost"
              size="icon"
              onClick={() => onShare(option?.name?.toLowerCase())}
              className="w-8 h-8"
              title={`Share on ${option?.name}`}
            >
              <Icon name={option?.icon} size={16} className={option?.color} />
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          onClick={() => window.open(article?.url, '_blank')}
        >
          Original
        </Button>
      </div>
    </div>
  );
};

export default AnalysisHeader;