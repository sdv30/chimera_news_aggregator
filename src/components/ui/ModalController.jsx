import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ModalController = ({ 
  isOpen = false, 
  onClose = () => {}, 
  title = '', 
  children, 
  size = 'default',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className = ''
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  const sizeClasses = {
    sm: 'max-w-md',
    default: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  // Handle focus management
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef?.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      previousFocusRef?.current?.focus();
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e) => {
      if (e?.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e?.target === e?.currentTarget) {
      onClose();
    }
  };

  // Handle keyboard navigation within modal
  const handleKeyDown = (e) => {
    if (e?.key === 'Tab') {
      const focusableElements = modalRef?.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabIndex="-1"])'
      );
      
      if (focusableElements?.length) {
        const firstElement = focusableElements?.[0];
        const lastElement = focusableElements?.[focusableElements?.length - 1];

        if (e?.shiftKey && document.activeElement === firstElement) {
          e?.preventDefault();
          lastElement?.focus();
        } else if (!e?.shiftKey && document.activeElement === lastElement) {
          e?.preventDefault();
          firstElement?.focus();
        }
      }
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-1100 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={`
          relative w-full ${sizeClasses?.[size]} max-h-[90vh] bg-card rounded-lg shadow-elevated
          animate-fade-in overflow-hidden flex flex-col
          ${className}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-border">
            {title && (
              <h2 
                id="modal-title" 
                className="text-lg font-heading font-semibold text-foreground"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="ml-auto"
                aria-label="Close modal"
              >
                <Icon name="X" size={18} />
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

// Specialized modal components
export const SemanticAnalysisModal = ({ 
  isOpen, 
  onClose, 
  articleData = null 
}) => {
  return (
    <ModalController
      isOpen={isOpen}
      onClose={onClose}
      title="Semantic Analysis"
      size="lg"
    >
      <div className="p-6">
        {articleData ? (
          <div className="space-y-6">
            {/* Article Info */}
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-heading font-medium text-foreground mb-2">
                {articleData?.title || 'Article Title'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {articleData?.source || 'Unknown Source'} • {articleData?.date || 'Today'}
              </p>
            </div>

            {/* Analysis Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-heading font-medium text-foreground mb-2">
                    Sentiment Analysis
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full" 
                        style={{ width: '75%' }}
                      />
                    </div>
                    <span className="text-sm text-success font-medium">Positive</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-medium text-foreground mb-2">
                    Key Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['Technology', 'Innovation', 'Business']?.map((topic) => (
                      <span 
                        key={topic}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-heading font-medium text-foreground mb-2">
                    Readability Score
                  </h4>
                  <div className="text-2xl font-heading font-semibold text-foreground">
                    8.5/10
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Easy to read
                  </p>
                </div>

                <div>
                  <h4 className="font-heading font-medium text-foreground mb-2">
                    Related Articles
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Found 12 similar articles
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button>
                Save Analysis
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No article selected for analysis</p>
            </div>
          </div>
        )}
      </div>
    </ModalController>
  );
};

export const TelegramSetupModal = ({ 
  isOpen, 
  onClose 
}) => {
  return (
    <ModalController
      isOpen={isOpen}
      onClose={onClose}
      title="Telegram Integration Setup"
      size="default"
    >
      <div className="p-6 space-y-6">
        <div className="text-center">
          <Icon name="MessageSquare" size={48} className="mx-auto text-primary mb-4" />
          <h3 className="font-heading font-medium text-foreground mb-2">
            Connect Your Telegram Bot
          </h3>
          <p className="text-muted-foreground">
            Set up automated news delivery to your Telegram channels
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bot Token
            </label>
            <input
              type="password"
              placeholder="Enter your Telegram bot token"
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Channel ID
            </label>
            <input
              type="text"
              placeholder="@yourchannel or channel ID"
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Setup Instructions:</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Create a bot using @BotFather on Telegram</li>
              <li>Copy the bot token and paste it above</li>
              <li>Add the bot to your channel as an admin</li>
              <li>Enter your channel username or ID</li>
            </ol>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>
            Connect Bot
          </Button>
        </div>
      </div>
    </ModalController>
  );
};

export default ModalController;