import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentSummary = ({ article, summaryData }) => {
  const [summaryLength, setSummaryLength] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);

  const summaryOptions = [
    { value: 'short', label: 'Brief', description: '2-3 sentences', icon: 'Zap' },
    { value: 'medium', label: 'Standard', description: '5-7 sentences', icon: 'FileText' },
    { value: 'long', label: 'Detailed', description: 'Full paragraph', icon: 'BookOpen' }
  ];

  const mockSummaries = {
    short: `Tesla announces significant progress in electric vehicle production with record-breaking delivery numbers for Q4 2023. The company's stock price surged following the positive earnings report. New Cybertruck production timeline confirmed for late 2024.`,
    
    medium: `Tesla has reported exceptional performance in Q4 2023, delivering a record 1.8 million vehicles globally, representing a 35% increase from the previous year. The electric vehicle manufacturer's stock price jumped 15% in after-hours trading following the earnings announcement. CEO Elon Musk confirmed that Cybertruck production will commence in late 2024, with initial deliveries expected in early 2025. The company also unveiled new battery technology that promises to increase vehicle range by 20% while reducing manufacturing costs. Tesla's Gigafactory expansion in Austin, Texas, is proceeding ahead of schedule and will significantly boost production capacity.`,
    
    long: `Tesla Inc. has delivered outstanding financial and operational results for Q4 2023, marking a pivotal moment in the company's growth trajectory. The electric vehicle pioneer reported record-breaking delivery numbers of 1.8 million vehicles worldwide, representing a substantial 35% year-over-year increase that exceeded analyst expectations by a significant margin. This achievement triggered an immediate positive market response, with Tesla's stock price surging 15% in after-hours trading as investors celebrated the company's continued dominance in the EV sector.\n\nCEO Elon Musk provided crucial updates on the highly anticipated Cybertruck, confirming that production will officially begin in late 2024 at the Austin Gigafactory. Initial customer deliveries are scheduled for early 2025, with the company expecting to ramp up production throughout the year. The announcement addressed months of speculation about potential delays and provided much-needed clarity for the thousands of customers who have placed pre-orders.\n\nPerhaps most significantly, Tesla unveiled breakthrough battery technology that promises to revolutionize the industry. The new battery cells will increase vehicle range by approximately 20% while simultaneously reducing manufacturing costs by 12%. This technological advancement positions Tesla to maintain its competitive edge as traditional automakers accelerate their electric vehicle programs. The company's ongoing expansion of its Austin, Texas Gigafactory is proceeding ahead of schedule, with full operational capacity expected by mid-2024, which will substantially increase Tesla's global production capabilities.`
  };

  const handleGenerateSummary = async (length) => {
    setIsGenerating(true);
    setSummaryLength(length);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  const handleCopySummary = () => {
    navigator.clipboard?.writeText(mockSummaries?.[summaryLength]);
    // Show toast notification
  };

  const handleSaveSummary = () => {
    // Save summary to user's archive
  };

  const readingTime = Math.ceil(mockSummaries?.[summaryLength]?.split(' ')?.length / 200);

  return (
    <div className="space-y-6">
      {/* Summary Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          {summaryOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => handleGenerateSummary(option?.value)}
              disabled={isGenerating}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth
                ${summaryLength === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                }
                ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <Icon name={option?.icon} size={14} />
              <div className="text-left">
                <div>{option?.label}</div>
                <div className="text-xs opacity-70">{option?.description}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopySummary}
            iconName="Copy"
            iconPosition="left"
            disabled={isGenerating}
          >
            Copy
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveSummary}
            iconName="Save"
            iconPosition="left"
            disabled={isGenerating}
          >
            Save
          </Button>
        </div>
      </div>
      {/* Summary Content */}
      <div className="bg-muted rounded-lg p-6">
        {isGenerating ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Loader" size={16} className="animate-spin" />
              <span className="text-sm">Generating {summaryOptions?.find(o => o?.value === summaryLength)?.label?.toLowerCase()} summary...</span>
            </div>
            
            {/* Skeleton Loading */}
            <div className="space-y-2">
              <div className="h-4 bg-background rounded animate-pulse"></div>
              <div className="h-4 bg-background rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-background rounded animate-pulse w-4/6"></div>
              {summaryLength !== 'short' && (
                <>
                  <div className="h-4 bg-background rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-background rounded animate-pulse w-3/4"></div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{readingTime} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Type" size={14} />
                  <span>{mockSummaries?.[summaryLength]?.split(' ')?.length} words</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="BarChart3" size={14} />
                  <span>
                    {summaryOptions?.find(o => o?.value === summaryLength)?.label} summary
                  </span>
                </div>
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {mockSummaries?.[summaryLength]}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Summary Analytics */}
      {!isGenerating && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-lg font-heading font-semibold text-foreground">
              {Math.round((mockSummaries?.[summaryLength]?.length / (article?.content?.length || 5000)) * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Compression</div>
          </div>
          
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-lg font-heading font-semibold text-foreground">8.5</div>
            <div className="text-sm text-muted-foreground">Readability</div>
          </div>
          
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-lg font-heading font-semibold text-foreground">95%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
          
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-lg font-heading font-semibold text-foreground">12</div>
            <div className="text-sm text-muted-foreground">Key Points</div>
          </div>
        </div>
      )}
      {/* Key Highlights */}
      {!isGenerating && (
        <div>
          <h4 className="font-heading font-medium text-foreground mb-3">Key Highlights</h4>
          <div className="space-y-2">
            {[
              'Record 1.8M vehicle deliveries in Q4 2023',
              'Stock price increased 15% after earnings',
              'Cybertruck production confirmed for late 2024',
              'New battery technology increases range by 20%',
              'Austin Gigafactory expansion ahead of schedule'
            ]?.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm text-foreground">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentSummary;