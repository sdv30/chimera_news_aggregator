import React from 'react';
import Icon from '../../../components/AppIcon';
import { useLanguage } from '../../../hooks/useLanguage';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: 'Brain',
      title: t('landing.features.aiCuration.title'),
      description: t('landing.features.aiCuration.description'),
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      agent: 'Гидра + Оракул'
    },
    {
      icon: 'MessageSquare',
      title: t('landing.features.telegramIntegration.title'),
      description: t('landing.features.telegramIntegration.description'),
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      agent: 'Гидра'
    },
    {
      icon: 'Globe',
      title: t('landing.features.multiLanguage.title'),
      description: t('landing.features.multiLanguage.description'),
      color: 'text-success',
      bgColor: 'bg-success/10',
      agent: 'Система'
    },
    {
      icon: 'BarChart3',
      title: t('landing.features.semanticAnalysis.title'),
      description: t('landing.features.semanticAnalysis.description'),
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      agent: 'Оракул'
    },
    {
      icon: 'Zap',
      title: t('landing.features.realTimeUpdates.title'),
      description: t('landing.features.realTimeUpdates.description'),
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      agent: 'Гидра'
    },
    {
      icon: 'Filter',
      title: t('landing.features.customFilters.title'),
      description: t('landing.features.customFilters.description'),
      color: 'text-error',
      bgColor: 'bg-error/10',
      agent: 'Оракул'
    }
  ];

  // System Operation Principles - ТЗ требует
  const systemPrinciples = [
    {
      step: 1,
      title: t('landing.features.systemPrinciples.steps.collection.title'),
      description: t('landing.features.systemPrinciples.steps.collection.description'),
      icon: "Search"
    },
    {
      step: 2, 
      title: t('landing.features.systemPrinciples.steps.analysis.title'),
      description: t('landing.features.systemPrinciples.steps.analysis.description'),
      icon: "Brain"
    },
    {
      step: 3,
      title: t('landing.features.systemPrinciples.steps.filtering.title'),
      description: t('landing.features.systemPrinciples.steps.filtering.description'),
      icon: "Filter"
    },
    {
      step: 4,
      title: t('landing.features.systemPrinciples.steps.personalization.title'),
      description: t('landing.features.systemPrinciples.steps.personalization.description'),
      icon: "Target"
    },
    {
      step: 5,
      title: t('landing.features.systemPrinciples.steps.delivery.title'),
      description: t('landing.features.systemPrinciples.steps.delivery.description'),
      icon: "Send"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="micro-interaction inline-flex items-center space-x-2 bg-card text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-subtle">
            <Icon name="Star" size={16} />
            <span>{t('landing.features.title')}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('landing.features.title')}
            <span className="gradient-text block">{t('landing.features.tagline')}</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('landing.features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features?.map((feature, index) => (
            <div 
              key={index}
              className="group micro-interaction bg-card rounded-xl p-6 border border-border hover:border-primary/20 hover:shadow-elevated"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 ${feature?.bgColor} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={feature?.icon} size={24} className={feature?.color} />
              </div>

              {/* Content */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {feature?.title}
                </h3>
                <div className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                  {feature?.agent}
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                {feature?.description}
              </p>

              {/* Hover Arrow */}
              <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium mr-2">{t('landing.features.learnMore')}</span>
                <Icon name="ArrowRight" size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* System Operation Principles - ТЗ требует */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-subtle">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              {t('landing.features.systemPrinciples.title')}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('landing.features.systemPrinciples.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {systemPrinciples?.map((principle, index) => (
              <div key={index} className="micro-interaction text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name={principle?.icon} size={24} color="white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-card border-2 border-primary rounded-full flex items-center justify-center text-sm font-bold text-primary">
                    {principle?.step}
                  </div>
                  {index < systemPrinciples?.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                  )}
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {principle?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {principle?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits Summary - ТЗ требует */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="micro-interaction text-center bg-success/5 p-6 rounded-xl border border-success/20">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Clock" size={32} className="text-success" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-2">{t('landing.features.keyBenefits.timeSaving.title')}</h4>
            <p className="text-muted-foreground">
              {t('landing.features.keyBenefits.timeSaving.description')}
            </p>
          </div>

          <div className="micro-interaction text-center bg-primary/5 p-6 rounded-xl border border-primary/20">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Target" size={32} className="text-primary" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-2">{t('landing.features.keyBenefits.personalization.title')}</h4>
            <p className="text-muted-foreground">
              {t('landing.features.keyBenefits.personalization.description')}
            </p>
          </div>

          <div className="micro-interaction text-center bg-secondary/5 p-6 rounded-xl border border-secondary/20">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={32} className="text-secondary" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-2">{t('landing.features.keyBenefits.flowControl.title')}</h4>
            <p className="text-muted-foreground">
              {t('landing.features.keyBenefits.flowControl.description')}
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="micro-interaction inline-flex items-center space-x-4 bg-card rounded-full p-2 shadow-subtle">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4]?.map((i) => (
                <div 
                  key={i}
                  className="w-8 h-8 gradient-bg rounded-full border-2 border-background flex items-center justify-center"
                >
                  <Icon name="User" size={14} color="white" />
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground pr-4">
              {t('landing.features.bottomCta.userCount')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;