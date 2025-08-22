import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TestingPanel = ({ 
  botInfo = null, 
  selectedChannels = [], 
  postFormat = {},
  onTestComplete = () => {} 
}) => {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResults, setTestResults] = useState({});
  const [selectedTestChannel, setSelectedTestChannel] = useState('');
  const [testHistory, setTestHistory] = useState([]);

  const mockTestArticle = {
    title: 'Test Article: Telegram Integration Working Successfully',
    summary: 'This is a test message to verify that your Telegram bot integration is configured correctly and can post news articles to your channels.',
    source: 'Chimera News System',
    url: 'https://chimera-news.com/test',
    sentiment: 'positive',
    keywords: ['Test', 'Integration', 'Success'],
    timestamp: new Date()
  };

  const testTypes = [
    {
      id: 'connection',
      name: 'Connection Test',
      description: 'Verify bot can connect to Telegram API',
      icon: 'Wifi'
    },
    {
      id: 'permissions',
      name: 'Permissions Test',
      description: 'Check bot permissions in selected channels',
      icon: 'Shield'
    },
    {
      id: 'message',
      name: 'Test Message',
      description: 'Send a test news post to verify formatting',
      icon: 'MessageSquare'
    }
  ];

  const handleConnectionTest = async () => {
    setIsTestingConnection(true);
    setTestResults(prev => ({ ...prev, connection: 'testing' }));

    // Simulate connection test
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      
      setTestResults(prev => ({
        ...prev,
        connection: success ? 'success' : 'error',
        connectionDetails: success 
          ? {
              status: 'Connected',
              botId: botInfo?.username || 'chimera_news_bot',
              apiResponse: 'OK',
              latency: Math.floor(Math.random() * 100) + 50
            }
          : {
              status: 'Failed',
              error: 'Invalid bot token or network error',
              suggestion: 'Check your bot token and internet connection'
            }
      }));
      
      setIsTestingConnection(false);
    }, 2000);
  };

  const handlePermissionsTest = async () => {
    setTestResults(prev => ({ ...prev, permissions: 'testing' }));

    // Simulate permissions test for each channel
    setTimeout(() => {
      const channelResults = selectedChannels?.map(channelId => ({
        channelId,
        canPost: Math.random() > 0.2, // 80% success rate
        canEdit: Math.random() > 0.3, // 70% success rate
        canDelete: Math.random() > 0.5, // 50% success rate
        isAdmin: Math.random() > 0.4 // 60% success rate
      }));

      setTestResults(prev => ({
        ...prev,
        permissions: 'success',
        channelResults
      }));
    }, 1500);
  };

  const handleTestMessage = async () => {
    if (!selectedTestChannel) return;

    setIsSendingTest(true);
    setTestResults(prev => ({ ...prev, message: 'testing' }));

    // Simulate sending test message
    setTimeout(() => {
      const success = Math.random() > 0.15; // 85% success rate
      
      const testResult = {
        id: Date.now(),
        channelId: selectedTestChannel,
        success,
        timestamp: new Date(),
        messageId: success ? Math.floor(Math.random() * 10000) : null,
        error: success ? null : 'Failed to send message - insufficient permissions'
      };

      setTestResults(prev => ({
        ...prev,
        message: success ? 'success' : 'error',
        lastTest: testResult
      }));

      setTestHistory(prev => [testResult, ...prev?.slice(0, 4)]);
      setIsSendingTest(false);
      
      onTestComplete(testResult);
    }, 2500);
  };

  const getTestStatus = (testType) => {
    const result = testResults?.[testType];
    if (result === 'testing') return { icon: 'Loader', color: 'text-warning', spin: true };
    if (result === 'success') return { icon: 'CheckCircle', color: 'text-success', spin: false };
    if (result === 'error') return { icon: 'XCircle', color: 'text-error', spin: false };
    return { icon: 'Circle', color: 'text-muted-foreground', spin: false };
  };

  const channelOptions = selectedChannels?.map(channelId => ({
    value: channelId,
    label: channelId?.startsWith('@') ? channelId : `Channel ${channelId}`
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Icon name="TestTube" size={48} className="mx-auto text-primary mb-4" />
        <h3 className="font-heading font-semibold text-foreground mb-2">
          Test Integration
        </h3>
        <p className="text-muted-foreground">
          Verify your Telegram bot setup before going live
        </p>
      </div>
      {/* Test Controls */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Run Tests</h4>
        
        <div className="space-y-4">
          {testTypes?.map((test) => {
            const status = getTestStatus(test?.id);
            const isDisabled = test?.id === 'permissions' && !botInfo;
            const isMessageTest = test?.id === 'message';
            
            return (
              <div key={test?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name={test?.icon} size={20} className="text-muted-foreground" />
                  <div>
                    <h5 className="font-medium text-foreground">{test?.name}</h5>
                    <p className="text-sm text-muted-foreground">{test?.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={status?.icon} 
                    size={16} 
                    className={`${status?.color} ${status?.spin ? 'animate-spin' : ''}`} 
                  />
                  
                  {test?.id === 'connection' && (
                    <Button
                      size="sm"
                      onClick={handleConnectionTest}
                      disabled={isTestingConnection || !botInfo}
                      loading={isTestingConnection}
                    >
                      Test
                    </Button>
                  )}
                  
                  {test?.id === 'permissions' && (
                    <Button
                      size="sm"
                      onClick={handlePermissionsTest}
                      disabled={isDisabled || selectedChannels?.length === 0}
                      loading={testResults?.permissions === 'testing'}
                    >
                      Test
                    </Button>
                  )}
                  
                  {isMessageTest && (
                    <Button
                      size="sm"
                      onClick={handleTestMessage}
                      disabled={!selectedTestChannel || isSendingTest}
                      loading={isSendingTest}
                    >
                      Send
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Test Message Channel Selection */}
        {selectedChannels?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <Select
              label="Test Channel"
              placeholder="Select channel for test message"
              options={channelOptions}
              value={selectedTestChannel}
              onChange={setSelectedTestChannel}
              description="Choose which channel to send the test message to"
            />
          </div>
        )}
      </div>
      {/* Test Results */}
      {Object.keys(testResults)?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4">Test Results</h4>
          
          <div className="space-y-4">
            {/* Connection Results */}
            {testResults?.connection && (
              <div className={`
                p-3 rounded-lg border-l-4
                ${testResults?.connection === 'success' ?'bg-success/10 border-success' :'bg-error/10 border-error'
                }
              `}>
                <h5 className="font-medium text-foreground mb-2">Connection Test</h5>
                {testResults?.connectionDetails && (
                  <div className="text-sm space-y-1">
                    {testResults?.connection === 'success' ? (
                      <>
                        <p className="text-success">✓ Bot connected successfully</p>
                        <p className="text-muted-foreground">Bot ID: {testResults?.connectionDetails?.botId}</p>
                        <p className="text-muted-foreground">Latency: {testResults?.connectionDetails?.latency}ms</p>
                      </>
                    ) : (
                      <>
                        <p className="text-error">✗ Connection failed</p>
                        <p className="text-muted-foreground">{testResults?.connectionDetails?.error}</p>
                        <p className="text-muted-foreground">{testResults?.connectionDetails?.suggestion}</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Permissions Results */}
            {testResults?.channelResults && (
              <div className="p-3 bg-muted rounded-lg">
                <h5 className="font-medium text-foreground mb-2">Channel Permissions</h5>
                <div className="space-y-2">
                  {testResults?.channelResults?.map((result, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{result?.channelId}</span>
                      <div className="flex space-x-2">
                        <span className={result?.canPost ? 'text-success' : 'text-error'}>
                          {result?.canPost ? '✓' : '✗'} Post
                        </span>
                        <span className={result?.canEdit ? 'text-success' : 'text-error'}>
                          {result?.canEdit ? '✓' : '✗'} Edit
                        </span>
                        <span className={result?.isAdmin ? 'text-success' : 'text-error'}>
                          {result?.isAdmin ? '✓' : '✗'} Admin
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message Test Results */}
            {testResults?.lastTest && (
              <div className={`
                p-3 rounded-lg border-l-4
                ${testResults?.lastTest?.success 
                  ? 'bg-success/10 border-success' :'bg-error/10 border-error'
                }
              `}>
                <h5 className="font-medium text-foreground mb-2">Test Message</h5>
                <div className="text-sm space-y-1">
                  {testResults?.lastTest?.success ? (
                    <>
                      <p className="text-success">✓ Test message sent successfully</p>
                      <p className="text-muted-foreground">Channel: {testResults?.lastTest?.channelId}</p>
                      <p className="text-muted-foreground">Message ID: {testResults?.lastTest?.messageId}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-error">✗ Failed to send test message</p>
                      <p className="text-muted-foreground">{testResults?.lastTest?.error}</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Test History */}
      {testHistory?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4">Recent Tests</h4>
          
          <div className="space-y-2">
            {testHistory?.map((test) => (
              <div key={test?.id} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={test?.success ? 'CheckCircle' : 'XCircle'} 
                    size={14} 
                    className={test?.success ? 'text-success' : 'text-error'} 
                  />
                  <span className="text-foreground">{test?.channelId}</span>
                </div>
                <span className="text-muted-foreground">
                  {test?.timestamp?.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Test Article Preview */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Test Article Preview</h4>
        
        <div className="bg-muted rounded-lg p-4 border-l-4 border-primary font-mono text-sm whitespace-pre-wrap">
          {`😊 **${mockTestArticle?.title}**

${mockTestArticle?.summary}

📰 *${mockTestArticle?.source}*
🔗 [Read more](${mockTestArticle?.url})

#Test #Integration #Success`}
        </div>
        
        <p className="text-xs text-muted-foreground mt-2">
          This is how your test message will appear in Telegram channels
        </p>
      </div>
      {/* Status Summary */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <h4 className="font-medium text-primary mb-3">Integration Status</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bot Connection:</span>
            <span className={`font-medium ${
              testResults?.connection === 'success' ? 'text-success' : 
              testResults?.connection === 'error' ? 'text-error' : 'text-muted-foreground'
            }`}>
              {testResults?.connection === 'success' ? 'Connected' : 
               testResults?.connection === 'error' ? 'Failed' : 'Not tested'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Channels:</span>
            <span className="text-foreground font-medium">{selectedChannels?.length} selected</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Test:</span>
            <span className="text-foreground font-medium">
              {testHistory?.length > 0 ? testHistory?.[0]?.timestamp?.toLocaleString() : 'Never'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingPanel;