import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import BotSetupWizard from './components/BotSetupWizard';
import ChannelSelector from './components/ChannelSelector';
import PostingSchedule from './components/PostingSchedule';
import PostFormatCustomizer from './components/PostFormatCustomizer';
import TestingPanel from './components/TestingPanel';
import PublicationHistory from './components/PublicationHistory';

const TelegramIntegrationSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [setupData, setSetupData] = useState({
    botInfo: null,
    selectedChannels: [],
    schedule: {},
    postFormat: {},
    isComplete: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('setup');

  const setupSteps = [
    {
      id: 1,
      title: 'Bot Setup',
      description: 'Configure your Telegram bot',
      component: 'wizard',
      icon: 'Bot'
    },
    {
      id: 2,
      title: 'Channels',
      description: 'Select target channels',
      component: 'channels',
      icon: 'Users'
    },
    {
      id: 3,
      title: 'Schedule',
      description: 'Set posting schedule',
      component: 'schedule',
      icon: 'Clock'
    },
    {
      id: 4,
      title: 'Format',
      description: 'Customize post format',
      component: 'format',
      icon: 'FileText'
    },
    {
      id: 5,
      title: 'Testing',
      description: 'Test integration',
      component: 'testing',
      icon: 'TestTube'
    }
  ];

  const tabs = [
    { id: 'setup', label: 'Setup', icon: 'Settings' },
    { id: 'history', label: 'History', icon: 'BarChart3' }
  ];

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/authentication-login-register');
      return;
    }

    // Load saved setup data
    const savedSetup = localStorage.getItem('telegramSetup');
    if (savedSetup) {
      try {
        const parsedSetup = JSON.parse(savedSetup);
        setSetupData(parsedSetup);
        if (parsedSetup?.isComplete) {
          setActiveTab('history');
        }
      } catch (error) {
        console.error('Failed to load saved setup:', error);
      }
    }
  }, [navigate]);

  const handleStepComplete = (stepData) => {
    const newSetupData = { ...setupData, ...stepData };
    setSetupData(newSetupData);
    
    // Save to localStorage
    localStorage.setItem('telegramSetup', JSON.stringify(newSetupData));
    
    if (currentStep < setupSteps?.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBotSetupComplete = (botData) => {
    handleStepComplete({ botInfo: botData?.botInfo });
  };

  const handleChannelSelection = (channels) => {
    handleStepComplete({ selectedChannels: channels });
  };

  const handleScheduleChange = (schedule) => {
    handleStepComplete({ schedule });
  };

  const handleFormatChange = (format) => {
    handleStepComplete({ postFormat: format });
  };

  const handleTestComplete = (testResult) => {
    if (testResult?.success) {
      const completeSetup = { ...setupData, isComplete: true };
      setSetupData(completeSetup);
      localStorage.setItem('telegramSetup', JSON.stringify(completeSetup));
    }
  };

  const handleFinishSetup = async () => {
    setIsLoading(true);
    
    // Simulate saving configuration
    setTimeout(() => {
      const completeSetup = { ...setupData, isComplete: true };
      setSetupData(completeSetup);
      localStorage.setItem('telegramSetup', JSON.stringify(completeSetup));
      setIsLoading(false);
      setActiveTab('history');
    }, 2000);
  };

  const handleResetSetup = () => {
    setSetupData({
      botInfo: null,
      selectedChannels: [],
      schedule: {},
      postFormat: {},
      isComplete: false
    });
    setCurrentStep(1);
    setActiveTab('setup');
    localStorage.removeItem('telegramSetup');
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return setupData?.botInfo !== null;
      case 2:
        return setupData?.selectedChannels?.length > 0;
      case 3:
        return Object.keys(setupData?.schedule)?.length > 0;
      case 4:
        return Object.keys(setupData?.postFormat)?.length > 0;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    const step = setupSteps?.[currentStep - 1];
    
    switch (step?.component) {
      case 'wizard':
        return (
          <BotSetupWizard
            onComplete={handleBotSetupComplete}
            onBack={() => navigate('/control-panel-source-keyword-management')}
          />
        );
      case 'channels':
        return (
          <ChannelSelector
            botInfo={setupData?.botInfo}
            selectedChannels={setupData?.selectedChannels}
            onChannelSelect={handleChannelSelection}
          />
        );
      case 'schedule':
        return (
          <PostingSchedule
            initialSchedule={setupData?.schedule}
            onScheduleChange={handleScheduleChange}
          />
        );
      case 'format':
        return (
          <PostFormatCustomizer
            initialFormat={setupData?.postFormat}
            onFormatChange={handleFormatChange}
          />
        );
      case 'testing':
        return (
          <TestingPanel
            botInfo={setupData?.botInfo}
            selectedChannels={setupData?.selectedChannels}
            postFormat={setupData?.postFormat}
            onTestComplete={handleTestComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/control-panel-source-keyword-management')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  Telegram Integration
                </h1>
                <p className="text-muted-foreground">
                  Configure automated news distribution to your Telegram channels
                </p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth
                    ${activeTab === tab?.id
                      ? 'bg-background text-foreground shadow-subtle'
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          {activeTab === 'setup' ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Progress Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
                  <h3 className="font-heading font-semibold text-foreground mb-4">
                    Setup Progress
                  </h3>
                  
                  <div className="space-y-3">
                    {setupSteps?.map((step) => (
                      <div
                        key={step?.id}
                        className={`
                          flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-smooth
                          ${currentStep === step?.id
                            ? 'bg-primary/10 text-primary'
                            : currentStep > step?.id
                            ? 'bg-success/10 text-success' :'text-muted-foreground hover:bg-muted'
                          }
                        `}
                        onClick={() => {
                          if (step?.id <= currentStep || setupData?.isComplete) {
                            setCurrentStep(step?.id);
                          }
                        }}
                      >
                        <div className={`
                          flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium
                          ${currentStep === step?.id
                            ? 'bg-primary text-primary-foreground'
                            : currentStep > step?.id
                            ? 'bg-success text-success-foreground'
                            : 'bg-muted text-muted-foreground'
                          }
                        `}>
                          {currentStep > step?.id ? (
                            <Icon name="Check" size={12} />
                          ) : (
                            step?.id
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{step?.title}</div>
                          <div className="text-xs opacity-70">{step?.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Setup Status */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon 
                        name={setupData?.isComplete ? "CheckCircle" : "Clock"} 
                        size={16} 
                        className={setupData?.isComplete ? "text-success" : "text-warning"} 
                      />
                      <span className={setupData?.isComplete ? "text-success" : "text-warning"}>
                        {setupData?.isComplete ? 'Setup Complete' : 'In Progress'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-card border border-border rounded-lg">
                  <div className="p-6">
                    {renderStepContent()}
                  </div>

                  {/* Navigation Footer */}
                  <div className="flex justify-between items-center p-6 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (currentStep > 1) {
                          setCurrentStep(currentStep - 1);
                        } else {
                          navigate('/control-panel-source-keyword-management');
                        }
                      }}
                      iconName="ChevronLeft"
                      iconPosition="left"
                    >
                      {currentStep === 1 ? 'Back to Control Panel' : 'Previous'}
                    </Button>

                    <div className="flex items-center space-x-2">
                      {setupData?.isComplete && (
                        <Button
                          variant="outline"
                          onClick={handleResetSetup}
                          iconName="RotateCcw"
                        >
                          Reset Setup
                        </Button>
                      )}

                      {currentStep < setupSteps?.length ? (
                        <Button
                          onClick={() => setCurrentStep(currentStep + 1)}
                          disabled={!canProceedToNext()}
                          iconName="ChevronRight"
                          iconPosition="right"
                        >
                          Next Step
                        </Button>
                      ) : (
                        <Button
                          onClick={handleFinishSetup}
                          disabled={!canProceedToNext()}
                          loading={isLoading}
                          iconName="Check"
                          iconPosition="left"
                        >
                          {isLoading ? 'Saving...' : 'Complete Setup'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Publication History Tab */
            (<div className="max-w-4xl mx-auto">
              <PublicationHistory />
            </div>)
          )}
        </div>
      </div>
    </div>
  );
};

export default TelegramIntegrationSetup;