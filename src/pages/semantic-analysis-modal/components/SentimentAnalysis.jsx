import React from 'react';
import Icon from '../../../components/AppIcon';

const SentimentAnalysis = ({ sentimentData }) => {
  const getSentimentIcon = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return { icon: 'Smile', color: 'text-success', emoji: '😊' };
      case 'negative':
        return { icon: 'Frown', color: 'text-error', emoji: '😔' };
      case 'neutral':
        return { icon: 'Meh', color: 'text-muted-foreground', emoji: '😐' };
      default:
        return { icon: 'HelpCircle', color: 'text-muted-foreground', emoji: '🤔' };
    }
  };

  const sentimentConfig = getSentimentIcon(sentimentData?.overall);
  
  const emotions = [
    { name: 'Joy', value: sentimentData?.emotions?.joy || 0.15, color: 'bg-yellow-500' },
    { name: 'Trust', value: sentimentData?.emotions?.trust || 0.72, color: 'bg-blue-500' },
    { name: 'Fear', value: sentimentData?.emotions?.fear || 0.08, color: 'bg-purple-500' },
    { name: 'Surprise', value: sentimentData?.emotions?.surprise || 0.23, color: 'bg-orange-500' },
    { name: 'Sadness', value: sentimentData?.emotions?.sadness || 0.12, color: 'bg-gray-500' },
    { name: 'Disgust', value: sentimentData?.emotions?.disgust || 0.05, color: 'bg-green-500' },
    { name: 'Anger', value: sentimentData?.emotions?.anger || 0.18, color: 'bg-red-500' },
    { name: 'Anticipation', value: sentimentData?.emotions?.anticipation || 0.45, color: 'bg-indigo-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Sentiment */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-medium text-foreground">Overall Sentiment</h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{sentimentConfig?.emoji}</span>
            <Icon name={sentimentConfig?.icon} size={20} className={sentimentConfig?.color} />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="capitalize text-foreground font-medium">
                {sentimentData?.overall || 'Positive'}
              </span>
              <span className="text-muted-foreground">
                {Math.round((sentimentData?.confidence || 0.85) * 100)}% confidence
              </span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  sentimentData?.overall === 'positive' ? 'bg-success' :
                  sentimentData?.overall === 'negative' ? 'bg-error' : 'bg-muted-foreground'
                }`}
                style={{ width: `${(sentimentData?.confidence || 0.85) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Emotional Breakdown */}
      <div>
        <h4 className="font-heading font-medium text-foreground mb-4">Emotional Analysis</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {emotions?.map((emotion) => (
            <div key={emotion?.name} className="bg-muted rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">{emotion?.name}</span>
                <span className="text-xs text-muted-foreground">
                  {Math.round(emotion?.value * 100)}%
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-700 ${emotion?.color}`}
                  style={{ width: `${emotion?.value * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Sentiment Timeline */}
      <div>
        <h4 className="font-heading font-medium text-foreground mb-4">Sentiment Flow</h4>
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Beginning</span>
            <span>Middle</span>
            <span>End</span>
          </div>
          <div className="flex space-x-1 h-8">
            <div className="flex-1 bg-success rounded-l-md opacity-80"></div>
            <div className="flex-1 bg-success opacity-90"></div>
            <div className="flex-1 bg-warning opacity-70"></div>
            <div className="flex-1 bg-warning opacity-60"></div>
            <div className="flex-1 bg-success rounded-r-md opacity-85"></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Article maintains positive tone throughout with slight uncertainty in the middle section
          </p>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;