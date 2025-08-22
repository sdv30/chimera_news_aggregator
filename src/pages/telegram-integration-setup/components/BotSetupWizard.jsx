import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BotSetupWizard = ({ onComplete = () => {}, onBack = () => {} }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [botToken, setBotToken] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState(null);
  const [botInfo, setBotInfo] = useState(null);

  const steps = [
    {
      id: 1,
      title: 'Create Bot',
      description: 'Set up your Telegram bot with @BotFather'
    },
    {
      id: 2,
      title: 'Configure Token',
      description: 'Enter and validate your bot token'
    },
    {
      id: 3,
      title: 'Test Connection',
      description: 'Verify bot functionality'
    }
  ];

  const handleTokenValidation = async () => {
    if (!botToken?.trim()) return;

    setIsValidating(true);
    setValidationStatus(null);

    // Simulate API validation
    setTimeout(() => {
      if (botToken?.startsWith('123456789:') && botToken?.length > 20) {
        setValidationStatus('success');
        setBotInfo({
          username: 'chimera_news_bot',
          name: 'Chimera News Bot',
          canJoinGroups: true,
          canReadAllGroupMessages: false,
          supportsInlineQueries: false
        });
      } else {
        setValidationStatus('error');
        setBotInfo(null);
      }
      setIsValidating(false);
    }, 2000);
  };

  const handleNext = () => {
    if (currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({ botToken, botInfo });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return validationStatus === 'success';
      case 3:
        return validationStatus === 'success';
      default:
        return false;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps?.map((step, index) => (
            <div key={step?.id} className="flex items-center">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                ${currentStep >= step?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                {currentStep > step?.id ? (
                  <Icon name="Check" size={16} />
                ) : (
                  step?.id
                )}
              </div>
              {index < steps?.length - 1 && (
                <div className={`
                  w-16 h-0.5 mx-2
                  ${currentStep > step?.id ? 'bg-primary' : 'bg-muted'}
                `} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h3 className="font-heading font-semibold text-foreground">
            {steps?.[currentStep - 1]?.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {steps?.[currentStep - 1]?.description}
          </p>
        </div>
      </div>
      {/* Step Content */}
      <div className="min-h-80">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <Icon name="MessageSquare" size={64} className="mx-auto text-primary mb-4" />
              <h4 className="font-heading font-medium text-foreground mb-2">
                Create Your Telegram Bot
              </h4>
              <p className="text-muted-foreground">
                Follow these steps to create a new bot with @BotFather
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h5 className="font-medium text-foreground mb-3">Step-by-step instructions:</h5>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center mt-0.5">1</span>
                  <span>Open Telegram and search for <strong>@BotFather</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center mt-0.5">2</span>
                  <span>Send the command <code className="bg-background px-1 rounded">/newbot</code></span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center mt-0.5">3</span>
                  <span>Choose a name for your bot (e.g., "Chimera News Bot")</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center mt-0.5">4</span>
                  <span>Choose a username ending with "bot" (e.g., "chimera_news_bot")</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center mt-0.5">5</span>
                  <span>Copy the bot token that @BotFather provides</span>
                </li>
              </ol>
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-warning">Important Security Note</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Keep your bot token secure and never share it publicly. This token gives full access to your bot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <Icon name="Key" size={64} className="mx-auto text-primary mb-4" />
              <h4 className="font-heading font-medium text-foreground mb-2">
                Configure Bot Token
              </h4>
              <p className="text-muted-foreground">
                Enter the token you received from @BotFather
              </p>
            </div>

            <div className="space-y-4">
              <Input
                label="Bot Token"
                type="password"
                placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                value={botToken}
                onChange={(e) => setBotToken(e?.target?.value)}
                error={validationStatus === 'error' ? 'Invalid bot token format' : ''}
                description="Token format: numbers:letters (e.g., 123456789:ABCdefGHI...)"
              />

              <Button
                onClick={handleTokenValidation}
                loading={isValidating}
                disabled={!botToken?.trim() || isValidating}
                iconName="Shield"
                iconPosition="left"
                className="w-full"
              >
                {isValidating ? 'Validating Token...' : 'Validate Token'}
              </Button>

              {validationStatus === 'success' && botInfo && (
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-success">Token Validated Successfully</p>
                      <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                        <p><strong>Bot Name:</strong> {botInfo?.name}</p>
                        <p><strong>Username:</strong> @{botInfo?.username}</p>
                        <p><strong>Can Join Groups:</strong> {botInfo?.canJoinGroups ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {validationStatus === 'error' && (
                <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Icon name="XCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-error">Token Validation Failed</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Please check your token format and try again.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <Icon name="Zap" size={64} className="mx-auto text-primary mb-4" />
              <h4 className="font-heading font-medium text-foreground mb-2">
                Test Bot Connection
              </h4>
              <p className="text-muted-foreground">
                Verify that your bot is working correctly
              </p>
            </div>

            {botInfo && (
              <div className="bg-card border border-border rounded-lg p-4">
                <h5 className="font-medium text-foreground mb-3">Bot Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <span className="ml-2 text-foreground font-medium">{botInfo?.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Username:</span>
                    <span className="ml-2 text-foreground font-medium">@{botInfo?.username}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <span className="ml-2 text-success font-medium">Active</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Permissions:</span>
                    <span className="ml-2 text-foreground font-medium">Configured</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <p className="text-sm font-medium text-success">
                  Bot setup completed successfully!
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Your bot is ready to be configured for news distribution.
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={handlePrevious}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          {currentStep === 1 ? 'Back' : 'Previous'}
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          iconName={currentStep === steps?.length ? "Check" : "ChevronRight"}
          iconPosition="right"
        >
          {currentStep === steps?.length ? 'Complete Setup' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default BotSetupWizard;