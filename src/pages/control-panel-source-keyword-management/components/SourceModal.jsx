import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SourceModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  source = null,
  mode = 'add' // 'add', 'edit', 'preview'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    type: 'rss',
    description: '',
    tags: [],
    category: 'general',
    updateFrequency: 'hourly'
  });
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (source) {
      setFormData({
        name: source?.name || '',
        url: source?.url || '',
        type: source?.type || 'rss',
        description: source?.description || '',
        tags: source?.tags || [],
        category: source?.category || 'general',
        updateFrequency: source?.updateFrequency || 'hourly'
      });
    } else {
      setFormData({
        name: '',
        url: '',
        type: 'rss',
        description: '',
        tags: [],
        category: 'general',
        updateFrequency: 'hourly'
      });
    }
    setValidationResult(null);
  }, [source, isOpen]);

  const typeOptions = [
    { value: 'rss', label: 'RSS Feed' },
    { value: 'website', label: 'Website' },
    { value: 'api', label: 'API Endpoint' }
  ];

  const categoryOptions = [
    { value: 'general', label: 'General News' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'politics', label: 'Politics' },
    { value: 'sports', label: 'Sports' },
    { value: 'science', label: 'Science' }
  ];

  const frequencyOptions = [
    { value: 'hourly', label: 'Every Hour' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation when URL changes
    if (field === 'url') {
      setValidationResult(null);
    }
  };

  const handleValidateUrl = async () => {
    if (!formData?.url) return;
    
    setIsValidating(true);
    try {
      // Simulate URL validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation result
      const isValid = formData?.url?.includes('rss') || formData?.url?.includes('feed');
      setValidationResult({
        isValid,
        message: isValid 
          ? 'Valid RSS feed detected' :'URL appears to be a regular website, not an RSS feed',
        preview: isValid ? {
          title: 'Sample News Site',
          description: 'Latest news and updates from around the world',
          articleCount: 25,
          lastUpdate: '2 hours ago'
        } : null
      });
    } catch (error) {
      setValidationResult({
        isValid: false,
        message: 'Failed to validate URL. Please check the URL and try again.'
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleAddTag = () => {
    if (newTag?.trim() && !formData?.tags?.includes(newTag?.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev?.tags, newTag?.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev?.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-card rounded-lg shadow-elevated overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            {mode === 'add' && 'Add New Source'}
            {mode === 'edit' && 'Edit Source'}
            {mode === 'preview' && 'Source Preview'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Source Name"
                type="text"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                placeholder="Enter source name"
                required
                disabled={mode === 'preview'}
              />
              
              <Select
                label="Source Type"
                options={typeOptions}
                value={formData?.type}
                onChange={(value) => handleInputChange('type', value)}
                disabled={mode === 'preview'}
              />
            </div>

            {/* URL with Validation */}
            <div>
              <Input
                label="URL"
                type="url"
                value={formData?.url}
                onChange={(e) => handleInputChange('url', e?.target?.value)}
                placeholder="https://example.com/rss"
                required
                disabled={mode === 'preview'}
              />
              
              {mode !== 'preview' && (
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleValidateUrl}
                    loading={isValidating}
                    iconName="CheckCircle"
                    iconPosition="left"
                    disabled={!formData?.url}
                  >
                    Validate URL
                  </Button>
                  
                  {validationResult && (
                    <div className={`
                      flex items-center space-x-2 text-sm
                      ${validationResult?.isValid ? 'text-success' : 'text-error'}
                    `}>
                      <Icon 
                        name={validationResult?.isValid ? 'CheckCircle' : 'XCircle'} 
                        size={16} 
                      />
                      <span>{validationResult?.message}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Preview Results */}
            {validationResult?.preview && (
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Source Preview</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Title:</span>
                    <span className="ml-2 text-foreground">{validationResult?.preview?.title}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Description:</span>
                    <span className="ml-2 text-foreground">{validationResult?.preview?.description}</span>
                  </div>
                  <div className="flex space-x-4">
                    <div>
                      <span className="text-muted-foreground">Articles:</span>
                      <span className="ml-2 text-foreground">{validationResult?.preview?.articleCount}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Update:</span>
                      <span className="ml-2 text-foreground">{validationResult?.preview?.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                placeholder="Optional description for this source"
                rows={3}
                disabled={mode === 'preview'}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>

            {/* Category and Frequency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Category"
                options={categoryOptions}
                value={formData?.category}
                onChange={(value) => handleInputChange('category', value)}
                disabled={mode === 'preview'}
              />
              
              <Select
                label="Update Frequency"
                options={frequencyOptions}
                value={formData?.updateFrequency}
                onChange={(value) => handleInputChange('updateFrequency', value)}
                disabled={mode === 'preview'}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tags
              </label>
              
              {mode !== 'preview' && (
                <div className="flex space-x-2 mb-3">
                  <Input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e?.target?.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e?.key === 'Enter' && (e?.preventDefault(), handleAddTag())}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddTag}
                    iconName="Plus"
                    disabled={!newTag?.trim()}
                  >
                    Add
                  </Button>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {formData?.tags?.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    {mode !== 'preview' && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-primary/80"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        {mode !== 'preview' && (
          <div className="flex justify-end space-x-3 p-6 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {mode === 'add' ? 'Add Source' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourceModal;