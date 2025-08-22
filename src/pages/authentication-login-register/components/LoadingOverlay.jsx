import React from 'react';


const LoadingOverlay = ({ isVisible, message = 'Authenticating...' }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-1100 flex items-center justify-center">
      <div className="bg-card rounded-lg shadow-elevated p-6 max-w-sm mx-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-muted rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          <div className="text-center">
            <h3 className="font-heading font-medium text-foreground mb-1">
              Please wait
            </h3>
            <p className="text-sm text-muted-foreground">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;