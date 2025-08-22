import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../AppIcon';

const StatusIndicator = ({ 
  isConnected = true,
  processingCount = 0,
  lastUpdate = null,
  className = ''
}) => {
  const [notifications, setNotifications] = useState([]);
  const [showToast, setShowToast] = useState(false);

  // Simulate real-time notifications
  useEffect(() => {
    if (processingCount > 0) {
      const interval = setInterval(() => {
        const newNotification = {
          id: Date.now(),
          type: 'info',
          message: `Processing ${processingCount} articles...`,
          timestamp: new Date()
        };
        
        setNotifications(prev => [newNotification, ...prev?.slice(0, 4)]);
        setShowToast(true);
        
        setTimeout(() => setShowToast(false), 3000);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [processingCount]);

  const getStatusColor = () => {
    if (!isConnected) return 'text-error';
    if (processingCount > 0) return 'text-warning';
    return 'text-success';
  };

  const getStatusIcon = () => {
    if (!isConnected) return 'WifiOff';
    if (processingCount > 0) return 'Loader';
    return 'Wifi';
  };

  const getStatusText = () => {
    if (!isConnected) return 'Disconnected';
    if (processingCount > 0) return `Processing ${processingCount}`;
    return 'Connected';
  };

  return (
    <>
      {/* Status Badge */}
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
          <Icon 
            name={getStatusIcon()} 
            size={14} 
            className={processingCount > 0 ? 'animate-spin' : ''} 
          />
          <span className="text-xs font-medium">
            {getStatusText()}
          </span>
        </div>
        
        {lastUpdate && (
          <span className="text-xs text-muted-foreground">
            {new Date(lastUpdate)?.toLocaleTimeString()}
          </span>
        )}
      </div>
      {/* Toast Notifications */}
      {showToast && notifications?.length > 0 && createPortal(
        <div className="fixed top-20 right-4 z-1300 space-y-2">
          {notifications?.slice(0, 3)?.map((notification) => (
            <div
              key={notification?.id}
              className="bg-card border border-border rounded-lg shadow-elevated p-4 min-w-80 animate-slide-in-from-top"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Icon 
                    name="Info" 
                    size={16} 
                    className="text-primary mt-0.5" 
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    {notification?.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification?.timestamp?.toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => setShowToast(false)}
                  className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
};

// Real-time WebSocket status component
export const WebSocketStatus = ({ 
  connectionState = 'connected',
  messageCount = 0,
  errorCount = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (connectionState === 'connecting' || connectionState === 'error') {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [connectionState]);

  if (!isVisible && connectionState === 'connected') return null;

  const getStatusConfig = () => {
    switch (connectionState) {
      case 'connecting':
        return {
          icon: 'Loader',
          color: 'text-warning',
          bg: 'bg-warning/10',
          text: 'Connecting...',
          animate: 'animate-spin'
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          color: 'text-error',
          bg: 'bg-error/10',
          text: 'Connection Error',
          animate: ''
        };
      default:
        return {
          icon: 'CheckCircle',
          color: 'text-success',
          bg: 'bg-success/10',
          text: 'Connected',
          animate: ''
        };
    }
  };

  const config = getStatusConfig();

  return createPortal(
    <div className="fixed bottom-4 right-4 z-1300">
      <div className={`
        flex items-center space-x-2 px-3 py-2 rounded-lg border border-border
        bg-card shadow-elevated ${config?.bg}
      `}>
        <Icon 
          name={config?.icon} 
          size={16} 
          className={`${config?.color} ${config?.animate}`} 
        />
        <span className={`text-sm font-medium ${config?.color}`}>
          {config?.text}
        </span>
        {messageCount > 0 && (
          <span className="text-xs text-muted-foreground">
            ({messageCount} msgs)
          </span>
        )}
      </div>
    </div>,
    document.body
  );
};

export default StatusIndicator;