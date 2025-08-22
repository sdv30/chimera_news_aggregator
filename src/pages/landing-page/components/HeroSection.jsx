import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import { useLanguage } from '../../../hooks/useLanguage';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Parallax effect - ТЗ требует
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setParallaxOffset(scrolled * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegister = () => {
    navigate('/authentication-login-register', { 
      state: { mode: 'register' } 
    });
  };

  const handleLogin = () => {
    navigate('/authentication-login-register');
  };

  const handleViewDemo = () => {
    document.getElementById('demo-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="relative bg-background pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background Pattern with Parallax */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="parallax-element absolute top-20 left-10 w-32 h-32 gradient-bg rounded-full blur-3xl"
          style={{ '--parallax-offset': `${parallaxOffset * 0.3}px` }}
        ></div>
        <div 
          className="parallax-element absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"
          style={{ '--parallax-offset': `${parallaxOffset * -0.2}px` }}
        ></div>
        <div 
          className="parallax-element absolute top-1/2 left-1/2 w-60 h-60 bg-accent/30 rounded-full blur-3xl"
          style={{ '--parallax-offset': `${parallaxOffset * 0.1}px` }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="micro-interaction inline-flex items-center space-x-2 bg-card text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-subtle">
              <Icon name="Zap" size={16} />
              <span>{t('landing.aiPoweredCuration')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t('landing.heroTitle')}
              <span className="gradient-text block">{t('landing.heroTitleHighlight')}</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              {t('landing.heroSubtitle')}
            </p>

            {/* AI Agents Section - ТЗ требует описание Гидра и Оракул */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="micro-interaction bg-card p-4 rounded-xl border border-border shadow-subtle">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={16} color="white" />
                  </div>
                  <h3 className="font-semibold text-foreground">{t('landing.aiAgents.hydra.name')}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('landing.aiAgents.hydra.description')}
                </p>
              </div>
              
              <div className="micro-interaction bg-card p-4 rounded-xl border border-border shadow-subtle">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                    <Icon name="Eye" size={16} color="white" />
                  </div>
                  <h3 className="font-semibold text-foreground">{t('landing.aiAgents.oracle.name')}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('landing.aiAgents.oracle.description')}
                </p>
              </div>
            </div>

            {/* Key Benefits - ТЗ требует */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              <div className="micro-interaction text-center">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Icon name="Clock" size={20} className="text-success" />
                </div>
                <div className="text-sm font-medium text-foreground">{t('landing.benefits.timeSaving')}</div>
                <div className="text-xs text-muted-foreground">{t('landing.benefits.upTo')}</div>
              </div>
              <div className="micro-interaction text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Icon name="Target" size={20} className="text-primary" />
                </div>
                <div className="text-sm font-medium text-foreground">{t('landing.benefits.personalization')}</div>
                <div className="text-xs text-muted-foreground">{t('landing.benefits.aiFilters')}</div>
              </div>
              <div className="micro-interaction text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Icon name="Filter" size={20} className="text-secondary" />
                </div>
                <div className="text-sm font-medium text-foreground">{t('landing.benefits.flowControl')}</div>
                <div className="text-xs text-muted-foreground">{t('landing.benefits.information')}</div>
              </div>
            </div>

            {/* CTA Buttons - ТЗ требует "Зарегистрироваться" и "Войти" */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={handleRegister}
                className="micro-interaction gradient-bg text-white px-8 py-3 rounded-xl font-medium shadow-moderate hover:shadow-elevated transform hover:scale-105 duration-200"
              >
                {t('navigation.register')}
              </button>
              <button
                onClick={handleLogin}
                className="micro-interaction border border-border hover:bg-card text-foreground px-8 py-3 rounded-xl font-medium transition-colors"
              >
                {t('navigation.signIn')}
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">{t('landing.stats.articlesProcessed')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">1.2K+</div>
                <div className="text-sm text-muted-foreground">{t('landing.stats.activeUsers')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">{t('landing.stats.timeSaved')}</div>
              </div>
            </div>
          </div>

          {/* Visual Interface Examples - ТЗ требует */}
          <div className="relative">
            <div className="micro-interaction relative bg-card rounded-2xl shadow-elevated p-6 border border-border">
              {/* Mock Dashboard Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 gradient-bg rounded-lg flex items-center justify-center">
                      <Icon name="Zap" size={14} color="white" />
                    </div>
                    <span className="font-semibold text-foreground">Chimera News</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-success">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span>Live</span>
                  </div>
                </div>

                {/* Mock News Cards with Visual Examples */}
                <div className="space-y-3">
                  {[
                    {
                      title: t('landing.mockNews.article1.title'),
                      source: t('landing.mockNews.article1.source'),
                      sentiment: "positive",
                      time: t('landing.mockNews.article1.time'),
                      agent: t('landing.aiAgents.hydra.name')
                    },
                    {
                      title: t('landing.mockNews.article2.title'),
                      source: t('landing.mockNews.article2.source'),
                      sentiment: "positive", 
                      time: t('landing.mockNews.article2.time'),
                      agent: t('landing.aiAgents.oracle.name')
                    },
                    {
                      title: t('landing.mockNews.article3.title'),
                      source: t('landing.mockNews.article3.source'),
                      sentiment: "neutral",
                      time: t('landing.mockNews.article3.time'),
                      agent: t('landing.aiAgents.hydra.name')
                    }
                  ]?.map((article, index) => (
                    <div key={index} className="bg-muted/30 rounded-lg p-3 border border-border/50 micro-interaction">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-medium text-foreground line-clamp-2 flex-1">
                          {article?.title}
                        </h4>
                        <div className="flex items-center space-x-2 ml-2">
                          <div className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {article?.agent}
                          </div>
                          <Icon 
                            name={article?.sentiment === 'positive' ? 'TrendingUp' : 'Minus'} 
                            size={12} 
                            className={article?.sentiment === 'positive' ? 'text-success' : 'text-muted-foreground'} 
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{article?.source}</span>
                        <span>{article?.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* System Operation Principles - ТЗ требует */}
                <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Brain" size={14} className="text-primary" />
                    <span className="text-xs font-medium text-primary">{t('landing.systemOperation.title')}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('landing.systemOperation.steps')}
                  </p>
                </div>
              </div>

              {/* Floating Elements with Micro-interactions */}
              <div className="absolute -top-4 -right-4 micro-interaction bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium shadow-moderate">
                <Icon name="CheckCircle" size={12} className="inline mr-1" />
                {t('landing.floatingElements.aiFiltering')}
              </div>
              <div className="absolute -bottom-4 -left-4 micro-interaction bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium shadow-moderate">
                <Icon name="MessageSquare" size={12} className="inline mr-1" />
                {t('landing.floatingElements.autoTelegram')}
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 gradient-bg rounded-2xl blur-3xl -z-10 scale-110 opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;