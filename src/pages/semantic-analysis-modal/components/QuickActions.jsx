import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ article, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedActions, setCompletedActions] = useState(new Set());

  const quickActions = [
    {
      id: 'save-archive',
      title: 'Save to Archive',
      description: 'Add this article to your personal archive',
      icon: 'Archive',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCompletedActions(prev => new Set([...prev, 'save-archive']));
        setIsProcessing(false);
      }
    },
    {
      id: 'add-keywords',
      title: 'Add Keywords to Monitoring',
      description: 'Extract and add key terms to your keyword list',
      icon: 'Tags',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCompletedActions(prev => new Set([...prev, 'add-keywords']));
        setIsProcessing(false);
      }
    },
    {
      id: 'create-alert',
      title: 'Create Similar Content Alert',
      description: 'Get notified about similar articles',
      icon: 'Bell',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 1200));
        setCompletedActions(prev => new Set([...prev, 'create-alert']));
        setIsProcessing(false);
      }
    },
    {
      id: 'export-analysis',
      title: 'Export Analysis Report',
      description: 'Download detailed analysis as PDF',
      icon: 'Download',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCompletedActions(prev => new Set([...prev, 'export-analysis']));
        setIsProcessing(false);
      }
    },
    {
      id: 'share-telegram',
      title: 'Share to Telegram',
      description: 'Send summary to your Telegram channel',
      icon: 'Send',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      action: async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCompletedActions(prev => new Set([...prev, 'share-telegram']));
        setIsProcessing(false);
      }
    },
    {
      id: 'find-similar',
      title: 'Find Similar Articles',
      description: 'Search for related content in your archive',
      icon: 'Search',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      action: async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 1800));
        setCompletedActions(prev => new Set([...prev, 'find-similar']));
        setIsProcessing(false);
      }
    }
  ];

  const handleAction = async (actionItem) => {
    if (isProcessing || completedActions?.has(actionItem?.id)) return;
    await actionItem?.action();
  };

  const getActionStatus = (actionId) => {
    if (completedActions?.has(actionId)) return 'completed';
    if (isProcessing) return 'processing';
    return 'ready';
  };

  const getActionIcon = (actionItem) => {
    const status = getActionStatus(actionItem?.id);
    
    switch (status) {
      case 'completed':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'processing':
        return { icon: 'Loader', color: 'text-primary', animate: 'animate-spin' };
      default:
        return { icon: actionItem?.icon, color: actionItem?.color };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="font-heading font-medium text-foreground mb-2">Quick Actions</h3>
        <p className="text-sm text-muted-foreground">
          Perform common tasks with this article analysis
        </p>
      </div>
      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions?.map((actionItem) => {
          const iconConfig = getActionIcon(actionItem);
          const status = getActionStatus(actionItem?.id);
          const isDisabled = isProcessing && !completedActions?.has(actionItem?.id);
          
          return (
            <button
              key={actionItem?.id}
              onClick={() => handleAction(actionItem)}
              disabled={isDisabled || status === 'completed'}
              className={`
                p-4 rounded-lg border-2 text-left transition-all duration-200
                ${status === 'completed'
                  ? 'border-success bg-success/5 cursor-default'
                  : status === 'processing' ?'border-primary bg-primary/5 cursor-wait' :'border-border bg-muted hover:border-primary hover:bg-primary/5 cursor-pointer'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${status === 'completed' ? 'bg-success/10' : actionItem?.bgColor}`}>
                  <Icon 
                    name={iconConfig?.icon} 
                    size={20} 
                    className={`${iconConfig?.color} ${iconConfig?.animate || ''}`} 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground mb-1">
                    {actionItem?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {status === 'completed' 
                      ? 'Action completed successfully'
                      : status === 'processing' ?'Processing...'
                      : actionItem?.description
                    }
                  </p>
                  
                  {status === 'processing' && (
                    <div className="mt-2">
                      <div className="w-full bg-background rounded-full h-1">
                        <div className="bg-primary h-1 rounded-full animate-pulse w-2/3"></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {status === 'ready' && (
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground mt-1" />
                )}
              </div>
            </button>
          );
        })}
      </div>
      {/* Batch Actions */}
      <div className="border-t border-border pt-6">
        <h4 className="font-heading font-medium text-foreground mb-4">Batch Actions</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              setIsProcessing(true);
              for (const action of quickActions?.slice(0, 3)) {
                if (!completedActions?.has(action?.id)) {
                  await action?.action();
                }
              }
              setIsProcessing(false);
            }}
            disabled={isProcessing}
            iconName="Zap"
            iconPosition="left"
          >
            Quick Save & Monitor
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              setIsProcessing(true);
              for (const action of quickActions?.slice(3)) {
                if (!completedActions?.has(action?.id)) {
                  await action?.action();
                }
              }
              setIsProcessing(false);
            }}
            disabled={isProcessing}
            iconName="Share"
            iconPosition="left"
          >
            Export & Share
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setCompletedActions(new Set());
            }}
            disabled={isProcessing || completedActions?.size === 0}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset Actions
          </Button>
        </div>
      </div>
      {/* Progress Summary */}
      {completedActions?.size > 0 && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">
              {completedActions?.size} of {quickActions?.length} actions completed
            </span>
          </div>
          <div className="w-full bg-success/20 rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedActions?.size / quickActions?.length) * 100}%` }}
            />
          </div>
        </div>
      )}
      {/* Close Button */}
      <div className="text-center pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={onClose}
          iconName="X"
          iconPosition="left"
        >
          Close Analysis
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;