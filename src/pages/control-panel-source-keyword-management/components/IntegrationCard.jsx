import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationCard = ({ 
  integration, 
  onConnect, 
  onDisconnect, 
  onTest, 
  onConfigure 
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await onConnect(integration?.id);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleTest = async () => {
    setTestResult('testing');
    try {
      const result = await onTest(integration?.id);
      setTestResult(result ? 'success' : 'error');
      setTimeout(() => setTestResult(null), 3000);
    } catch (error) {
      setTestResult('error');
      setTimeout(() => setTestResult(null), 3000);
    }
  };

  const getStatusConfig = () => {
    switch (integration?.status) {
      case 'connected':
        return {
          color: 'text-success',
          bg: 'bg-success/10',
          icon: 'CheckCircle',
          text: 'Connected'
        };
      case 'error':
        return {
          color: 'text-error',
          bg: 'bg-error/10',
          icon: 'AlertCircle',
          text: 'Error'
        };
      case 'disconnected':
        return {
          color: 'text-muted-foreground',
          bg: 'bg-muted',
          icon: 'Circle',
          text: 'Disconnected'
        };
      default:
        return {
          color: 'text-warning',
          bg: 'bg-warning/10',
          icon: 'Loader',
          text: 'Connecting'
        };
    }
  };

  const getTestResultConfig = () => {
    switch (testResult) {
      case 'testing':
        return {
          color: 'text-warning',
          icon: 'Loader',
          text: 'Testing...',
          animate: 'animate-spin'
        };
      case 'success':
        return {
          color: 'text-success',
          icon: 'CheckCircle',
          text: 'Test successful',
          animate: ''
        };
      case 'error':
        return {
          color: 'text-error',
          icon: 'XCircle',
          text: 'Test failed',
          animate: ''
        };
      default:
        return null;
    }
  };

  const statusConfig = getStatusConfig();
  const testConfig = getTestResultConfig();

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-moderate transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`
            flex items-center justify-center w-12 h-12 rounded-lg
            ${integration?.id === 'telegram' ? 'bg-blue-100' : 'bg-green-100'}
          `}>
            <Icon 
              name={integration?.icon} 
              size={24} 
              className={integration?.id === 'telegram' ? 'text-blue-600' : 'text-green-600'}
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              {integration?.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {integration?.description}
            </p>
          </div>
        </div>

        <div className={`
          flex items-center space-x-2 px-3 py-1 rounded-full ${statusConfig?.bg}
        `}>
          <Icon 
            name={statusConfig?.icon} 
            size={14} 
            className={`${statusConfig?.color} ${integration?.status === 'connecting' ? 'animate-spin' : ''}`} 
          />
          <span className={`text-xs font-medium ${statusConfig?.color}`}>
            {statusConfig?.text}
          </span>
        </div>
      </div>
      {/* Connection Details */}
      {integration?.status === 'connected' && integration?.details && (
        <div className="bg-muted rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {integration?.details?.channel && (
              <div>
                <span className="text-muted-foreground">Channel:</span>
                <span className="ml-2 font-medium text-foreground">
                  {integration?.details?.channel}
                </span>
              </div>
            )}
            {integration?.details?.lastPost && (
              <div>
                <span className="text-muted-foreground">Last Post:</span>
                <span className="ml-2 font-medium text-foreground">
                  {integration?.details?.lastPost}
                </span>
              </div>
            )}
            {integration?.details?.postsCount && (
              <div>
                <span className="text-muted-foreground">Total Posts:</span>
                <span className="ml-2 font-medium text-foreground">
                  {integration?.details?.postsCount}
                </span>
              </div>
            )}
            {integration?.details?.schedule && (
              <div>
                <span className="text-muted-foreground">Schedule:</span>
                <span className="ml-2 font-medium text-foreground">
                  {integration?.details?.schedule}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Test Result */}
      {testConfig && (
        <div className="flex items-center space-x-2 mb-4 p-3 bg-muted rounded-lg">
          <Icon 
            name={testConfig?.icon} 
            size={16} 
            className={`${testConfig?.color} ${testConfig?.animate}`} 
          />
          <span className={`text-sm ${testConfig?.color}`}>
            {testConfig?.text}
          </span>
        </div>
      )}
      {/* Features */}
      {integration?.features && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Features:</h4>
          <div className="flex flex-wrap gap-2">
            {integration?.features?.map((feature, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          {integration?.status === 'connected' ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDisconnect(integration?.id)}
                iconName="Unlink"
                iconPosition="left"
              >
                Disconnect
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleTest}
                iconName="Send"
                iconPosition="left"
                disabled={testResult === 'testing'}
              >
                Test
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={handleConnect}
              loading={isConnecting}
              iconName="Link"
              iconPosition="left"
            >
              Connect
            </Button>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onConfigure(integration?.id)}
          iconName="Settings"
          iconPosition="left"
        >
          Configure
        </Button>
      </div>
      {/* Error Message */}
      {integration?.status === 'error' && integration?.error && (
        <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-error mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-error">Connection Error</p>
              <p className="text-xs text-error/80 mt-1">
                {integration?.error}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationCard;