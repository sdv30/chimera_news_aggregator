import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PostFormatCustomizer = ({ onFormatChange = () => {}, initialFormat = {} }) => {
  const [format, setFormat] = useState({
    template: 'standard',
    includeEmoji: true,
    includeSummary: true,
    summaryLength: 'medium',
    includeSource: true,
    includeLink: true,
    includeHashtags: true,
    customTemplate: '',
    characterLimit: 4096,
    ...initialFormat
  });

  const [previewData] = useState({
    title: 'Revolutionary AI Technology Transforms Healthcare Industry',
    summary: 'A groundbreaking artificial intelligence system has been developed that can diagnose diseases with 95% accuracy, potentially revolutionizing medical care worldwide. The technology uses advanced machine learning algorithms to analyze medical images and patient data.',
    source: 'TechNews Today',
    url: 'https://technews.com/ai-healthcare-breakthrough',
    sentiment: 'positive',
    keywords: ['AI', 'Healthcare', 'Technology', 'Innovation']
  });

  const templateOptions = [
    { 
      value: 'standard', 
      label: 'Standard Format',
      description: 'Title, summary, source, and link'
    },
    { 
      value: 'minimal', 
      label: 'Minimal Format',
      description: 'Title and link only'
    },
    { 
      value: 'detailed', 
      label: 'Detailed Format',
      description: 'Full article information with hashtags'
    },
    { 
      value: 'custom', 
      label: 'Custom Template',
      description: 'Create your own format'
    }
  ];

  const summaryLengthOptions = [
    { value: 'short', label: 'Short (1-2 sentences)' },
    { value: 'medium', label: 'Medium (2-3 sentences)' },
    { value: 'long', label: 'Long (Full paragraph)' }
  ];

  const availableVariables = [
    { name: '{title}', description: 'Article title' },
    { name: '{summary}', description: 'AI-generated summary' },
    { name: '{source}', description: 'News source name' },
    { name: '{url}', description: 'Article URL' },
    { name: '{date}', description: 'Publication date' },
    { name: '{time}', description: 'Publication time' },
    { name: '{sentiment}', description: 'Emotional tone' },
    { name: '{hashtags}', description: 'Generated hashtags' },
    { name: '{emoji}', description: 'Sentiment emoji' }
  ];

  const handleFormatUpdate = (updates) => {
    const newFormat = { ...format, ...updates };
    setFormat(newFormat);
    onFormatChange(newFormat);
  };

  const insertVariable = (variable) => {
    const textarea = document.getElementById('custom-template');
    if (textarea) {
      const start = textarea?.selectionStart;
      const end = textarea?.selectionEnd;
      const text = format?.customTemplate;
      const newText = text?.substring(0, start) + variable + text?.substring(end);
      
      handleFormatUpdate({ customTemplate: newText });
      
      // Restore cursor position
      setTimeout(() => {
        textarea?.focus();
        textarea?.setSelectionRange(start + variable?.length, start + variable?.length);
      }, 0);
    }
  };

  const generatePreview = () => {
    let preview = '';
    
    if (format?.template === 'custom' && format?.customTemplate) {
      preview = format?.customTemplate?.replace('{title}', previewData?.title)?.replace('{summary}', previewData?.summary)?.replace('{source}', previewData?.source)?.replace('{url}', previewData?.url)?.replace('{date}', new Date()?.toLocaleDateString())?.replace('{time}', new Date()?.toLocaleTimeString())?.replace('{sentiment}', previewData?.sentiment)?.replace('{hashtags}', previewData?.keywords?.map(k => `#${k}`)?.join(' '))?.replace('{emoji}', previewData?.sentiment === 'positive' ? '😊' : previewData?.sentiment === 'negative' ? '😔' : '😐');
    } else {
      // Generate standard templates
      const emoji = format?.includeEmoji ? (previewData?.sentiment === 'positive' ? '😊 ' : previewData?.sentiment === 'negative' ? '😔 ' : '😐 ') : '';
      const title = `${emoji}**${previewData?.title}**`;
      
      let summary = '';
      if (format?.includeSummary) {
        let summaryText = previewData?.summary;
        if (format?.summaryLength === 'short') {
          summaryText = summaryText?.split('.')?.[0] + '.';
        } else if (format?.summaryLength === 'medium') {
          summaryText = summaryText?.split('.')?.slice(0, 2)?.join('.') + '.';
        }
        summary = `\n\n${summaryText}`;
      }
      
      const source = format?.includeSource ? `\n\n📰 *${previewData?.source}*` : '';
      const link = format?.includeLink ? `\n🔗 [Read more](${previewData?.url})` : '';
      const hashtags = format?.includeHashtags ? `\n\n${previewData?.keywords?.map(k => `#${k}`)?.join(' ')}` : '';
      
      if (format?.template === 'minimal') {
        preview = `${title}${link}`;
      } else if (format?.template === 'detailed') {
        preview = `${title}${summary}${source}${link}${hashtags}`;
      } else {
        preview = `${title}${summary}${source}${link}`;
      }
    }
    
    return preview;
  };

  const getCharacterCount = () => {
    return generatePreview()?.length;
  };

  const isOverLimit = () => {
    return getCharacterCount() > format?.characterLimit;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Icon name="FileText" size={48} className="mx-auto text-primary mb-4" />
        <h3 className="font-heading font-semibold text-foreground mb-2">
          Post Format
        </h3>
        <p className="text-muted-foreground">
          Customize how news articles will appear in your Telegram channels
        </p>
      </div>
      {/* Template Selection */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Template Style</h4>
        
        <div className="grid gap-3 mb-4">
          {templateOptions?.map((option) => (
            <div
              key={option?.value}
              className={`
                border rounded-lg p-3 cursor-pointer transition-smooth
                ${format?.template === option?.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }
              `}
              onClick={() => handleFormatUpdate({ template: option?.value })}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-4 h-4 rounded-full border-2 flex items-center justify-center
                  ${format?.template === option?.value
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                  }
                `}>
                  {format?.template === option?.value && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">{option?.label}</h5>
                  <p className="text-sm text-muted-foreground">{option?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Format Options */}
      {format?.template !== 'custom' && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4">Format Options</h4>
          
          <div className="space-y-4">
            {/* Include Options */}
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={format?.includeEmoji}
                  onChange={(e) => handleFormatUpdate({ includeEmoji: e?.target?.checked })}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">Include emoji</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={format?.includeSummary}
                  onChange={(e) => handleFormatUpdate({ includeSummary: e?.target?.checked })}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">Include summary</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={format?.includeSource}
                  onChange={(e) => handleFormatUpdate({ includeSource: e?.target?.checked })}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">Include source</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={format?.includeHashtags}
                  onChange={(e) => handleFormatUpdate({ includeHashtags: e?.target?.checked })}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">Include hashtags</span>
              </label>
            </div>

            {/* Summary Length */}
            {format?.includeSummary && (
              <Select
                label="Summary Length"
                options={summaryLengthOptions}
                value={format?.summaryLength}
                onChange={(value) => handleFormatUpdate({ summaryLength: value })}
              />
            )}
          </div>
        </div>
      )}
      {/* Custom Template */}
      {format?.template === 'custom' && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4">Custom Template</h4>
          
          <div className="space-y-4">
            {/* Variables */}
            <div>
              <h5 className="text-sm font-medium text-foreground mb-2">Available Variables</h5>
              <div className="flex flex-wrap gap-2 mb-4">
                {availableVariables?.map((variable) => (
                  <button
                    key={variable?.name}
                    onClick={() => insertVariable(variable?.name)}
                    className="px-2 py-1 bg-muted hover:bg-muted/80 text-xs rounded transition-smooth"
                    title={variable?.description}
                  >
                    {variable?.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Template Editor */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Template Content
              </label>
              <textarea
                id="custom-template"
                value={format?.customTemplate}
                onChange={(e) => handleFormatUpdate({ customTemplate: e?.target?.value })}
                placeholder="Create your custom template using variables like {title}, {summary}, {source}..."
                className="w-full h-32 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>
      )}
      {/* Character Limit */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Character Limit</h4>
        
        <Input
          label="Maximum Characters"
          type="number"
          min="100"
          max="4096"
          value={format?.characterLimit}
          onChange={(e) => handleFormatUpdate({ characterLimit: parseInt(e?.target?.value) })}
          description="Telegram message limit is 4096 characters"
        />
      </div>
      {/* Preview */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">Preview</h4>
          <div className={`
            text-sm px-2 py-1 rounded
            ${isOverLimit() 
              ? 'bg-error/10 text-error' :'bg-success/10 text-success'
            }
          `}>
            {getCharacterCount()}/{format?.characterLimit} characters
          </div>
        </div>
        
        <div className={`
          bg-muted rounded-lg p-4 border-l-4 font-mono text-sm whitespace-pre-wrap
          ${isOverLimit() ? 'border-error' : 'border-primary'}
        `}>
          {generatePreview() || 'Template preview will appear here...'}
        </div>
        
        {isOverLimit() && (
          <div className="mt-2 flex items-center space-x-2 text-error">
            <Icon name="AlertTriangle" size={14} />
            <span className="text-xs">Message exceeds character limit</span>
          </div>
        )}
      </div>
      {/* Format Summary */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <h4 className="font-medium text-primary mb-3">Format Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Template:</span>
            <span className="text-foreground font-medium">
              {templateOptions?.find(t => t?.value === format?.template)?.label}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Character Limit:</span>
            <span className="text-foreground font-medium">{format?.characterLimit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Includes:</span>
            <span className="text-foreground font-medium">
              {[
                format?.includeEmoji && 'Emoji',
                format?.includeSummary && 'Summary',
                format?.includeSource && 'Source',
                format?.includeHashtags && 'Hashtags'
              ]?.filter(Boolean)?.join(', ') || 'Title only'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFormatCustomizer;