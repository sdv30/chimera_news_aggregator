import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const KeywordChip = ({ 
  keyword, 
  onRemove, 
  onEdit, 
  isDragging = false,
  relevanceScore = 0,
  category = 'general'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = () => {
    const colors = {
      technology: 'bg-blue-100 text-blue-800 border-blue-200',
      business: 'bg-green-100 text-green-800 border-green-200',
      politics: 'bg-red-100 text-red-800 border-red-200',
      sports: 'bg-orange-100 text-orange-800 border-orange-200',
      science: 'bg-purple-100 text-purple-800 border-purple-200',
      general: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors?.[category] || colors?.general;
  };

  const getRelevanceColor = () => {
    if (relevanceScore >= 80) return 'text-success';
    if (relevanceScore >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div
      className={`
        inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all duration-200
        ${getCategoryColor()}
        ${isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
        ${isHovered ? 'shadow-moderate' : 'shadow-subtle'}
        cursor-pointer select-none
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable
      onDragStart={(e) => {
        e?.dataTransfer?.setData('text/plain', keyword?.id);
      }}
    >
      {/* Drag Handle */}
      <Icon 
        name="GripVertical" 
        size={12} 
        className="text-muted-foreground cursor-grab active:cursor-grabbing" 
      />
      {/* Keyword Text */}
      <span className="text-sm font-medium">
        {keyword?.text || keyword}
      </span>
      {/* Relevance Score */}
      {relevanceScore > 0 && (
        <div className="flex items-center space-x-1">
          <Icon 
            name="TrendingUp" 
            size={12} 
            className={getRelevanceColor()} 
          />
          <span className={`text-xs ${getRelevanceColor()}`}>
            {relevanceScore}%
          </span>
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center space-x-1">
        {onEdit && (
          <button
            onClick={(e) => {
              e?.stopPropagation();
              onEdit(keyword);
            }}
            className="p-0.5 rounded-full hover:bg-black/10 transition-colors"
          >
            <Icon name="Edit" size={12} />
          </button>
        )}
        
        <button
          onClick={(e) => {
            e?.stopPropagation();
            onRemove(keyword?.id || keyword);
          }}
          className="p-0.5 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
        >
          <Icon name="X" size={12} />
        </button>
      </div>
    </div>
  );
};

export default KeywordChip;