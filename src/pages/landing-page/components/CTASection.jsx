import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import { useLanguage } from '../../../hooks/useLanguage';

const CTASection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleRegister = () => {
    navigate('/authentication-login-register', { 
      state: { mode: 'register' } 
    });
  };

  const handleLogin = () => {
    navigate('/authentication-login-register');
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 gradient-bg rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="micro-interaction inline-flex items-center space-x-2 bg-card text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-subtle">
          <Icon name="Sparkles" size={16} />
          <span>{t('landing.cta.badge')}</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          {t('landing.cta.title')}
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('landing.cta.subtitle')}
        </p>

        {/* Key Benefits Icons */}
        <div className="flex justify-center items-center space-x-8 mb-12">
          {t('landing.cta.benefits', { returnObjects: true })?.map((benefit, index) => (
            <div key={index} className="micro-interaction flex items-center space-x-2 text-muted-foreground">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name={benefit?.icon} size={16} className="text-success" />
              </div>
              <span className="text-sm">{benefit?.title}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleRegister}
            className="micro-interaction gradient-bg text-white px-8 py-4 rounded-xl font-medium shadow-elevated hover:shadow-moderate transform hover:scale-105 duration-200 flex items-center justify-center space-x-2"
          >
            <Icon name="UserPlus" size={20} />
            <span>{t('landing.cta.registerButton')}</span>
          </button>
          <button
            onClick={handleLogin}
            className="micro-interaction bg-card border border-border hover:bg-muted text-foreground px-8 py-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Icon name="LogIn" size={20} />
            <span>{t('landing.cta.loginButton')}</span>
          </button>
        </div>

        {/* Free Trial Note */}
        <p className="text-sm text-muted-foreground">
          {t('landing.cta.freeTrial')}
        </p>

        {/* Trust Indicators */}
        <div className="flex justify-center items-center space-x-6 mt-8 text-sm text-muted-foreground">
          <div className="micro-interaction flex items-center space-x-1">
            <Icon name="Shield" size={16} className="text-success" />
            <span>{t('landing.trustIndicators.secure')}</span>
          </div>
          <div className="micro-interaction flex items-center space-x-1">
            <Icon name="Zap" size={16} className="text-warning" />
            <span>{t('landing.trustIndicators.realTime')}</span>
          </div>
          <div className="micro-interaction flex items-center space-x-1">
            <Icon name="Globe" size={16} className="text-primary" />
            <span>{t('landing.trustIndicators.multiLanguage')}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto">
          <div className="micro-interaction">
            <div className="text-2xl font-bold text-foreground">50K+</div>
            <div className="text-sm text-muted-foreground">{t('landing.stats.articlesProcessed')}</div>
          </div>
          <div className="micro-interaction">
            <div className="text-2xl font-bold text-foreground">1.2K+</div>
            <div className="text-sm text-muted-foreground">{t('landing.stats.activeUsers')}</div>
          </div>
          <div className="micro-interaction">
            <div className="text-2xl font-bold text-foreground">95%</div>
            <div className="text-sm text-muted-foreground">{t('landing.stats.timeSaved')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;