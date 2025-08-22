import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { useLanguage } from '../../../hooks/useLanguage';

const DemoSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('hydra');

  const demoTabs = [
    {
      id: 'hydra',
      name: 'ИИ-Агент "Гидра"',
      icon: 'Zap',
      description: 'Многоплатформенный анализ и обработка новостей'
    },
    {
      id: 'oracle', 
      name: 'ИИ-Агент "Оракул"',
      icon: 'Eye',
      description: 'Предсказательная аналитика и персонализация'
    },
    {
      id: 'interface',
      name: 'Интерфейс системы',
      icon: 'Monitor',
      description: 'Визуальные примеры пользовательского интерфейса'
    }
  ];

  const renderHydraDemo = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
            <Icon name="Zap" size={16} color="white" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Гидра - Мультисборщик</h4>
            <p className="text-sm text-muted-foreground">Сканирует 1,247 источников</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-success">Активна</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Globe" size={16} className="text-primary" />
            <span className="text-sm font-medium">Источники</span>
          </div>
          <div className="text-2xl font-bold text-primary">1,247</div>
          <div className="text-xs text-muted-foreground">активных RSS лент</div>
        </div>
        
        <div className="bg-success/5 p-4 rounded-lg border border-success/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="FileText" size={16} className="text-success" />
            <span className="text-sm font-medium">Обработано</span>
          </div>
          <div className="text-2xl font-bold text-success">2,847</div>
          <div className="text-xs text-muted-foreground">статей за час</div>
        </div>
      </div>

      <div className="bg-muted/30 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Activity" size={16} className="text-foreground" />
          <span className="text-sm font-medium">Процесс обработки</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Сканирование источников</span>
            <span className="text-success">✓ Завершено</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Извлечение контента</span>
            <span className="text-primary">⟳ В процессе</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Первичная фильтрация</span>
            <span className="text-muted-foreground">⏳ Ожидание</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOracleDemo = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="Eye" size={16} color="white" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Оракул - Аналитик</h4>
            <p className="text-sm text-muted-foreground">Персонализация и предсказания</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
          <span className="text-sm text-secondary">Анализирует</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
          <div className="text-lg font-bold text-secondary">87%</div>
          <div className="text-xs text-muted-foreground">точность предсказаний</div>
        </div>
        <div className="bg-success/5 p-4 rounded-lg border border-success/20">
          <div className="text-lg font-bold text-success">94%</div>
          <div className="text-xs text-muted-foreground">релевантность</div>
        </div>
        <div className="bg-warning/5 p-4 rounded-lg border border-warning/20">
          <div className="text-lg font-bold text-warning">12ms</div>
          <div className="text-xs text-muted-foreground">время анализа</div>
        </div>
      </div>

      <div className="bg-muted/30 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="TrendingUp" size={16} className="text-foreground" />
          <span className="text-sm font-medium">Анализ тенденций</span>
        </div>
        <div className="space-y-2">
          {[
            { topic: "ИИ в медицине", trend: "+24%", color: "text-success" },
            { topic: "Криптовалюты", trend: "-8%", color: "text-error" },
            { topic: "Климат", trend: "+15%", color: "text-success" }
          ]?.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-foreground">{item?.topic}</span>
              <span className={`text-sm font-medium ${item?.color}`}>{item?.trend}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Target" size={16} className="text-primary" />
          <span className="text-sm font-medium">Персонализация</span>
        </div>
        <p className="text-sm text-muted-foreground">
          На основе ваших предпочтений выбрано 23 релевантные статьи из 2,847 обработанных
        </p>
      </div>
    </div>
  );

  const renderInterfaceDemo = () => (
    <div className="space-y-4">
      {/* Mock News Feed Interface */}
      <div className="bg-card p-4 rounded-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-foreground">Новостная лента</h4>
          <div className="flex items-center space-x-2">
            <button className="micro-interaction px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
              Все
            </button>
            <button className="micro-interaction px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs">
              Технологии
            </button>
            <button className="micro-interaction px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs">
              Бизнес
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              title: "Новый прорыв в квантовых вычислениях",
              source: "TechNews",
              time: "5 мин назад",
              sentiment: "positive",
              agent: "Гидра"
            },
            {
              title: "Рынок криптовалют показывает восстановление",
              source: "CryptoDaily", 
              time: "12 мин назад",
              sentiment: "neutral",
              agent: "Оракул"
            },
            {
              title: "ИИ в образовании: новые возможности",
              source: "EduTech",
              time: "18 мин назад", 
              sentiment: "positive",
              agent: "Гидра"
            }
          ]?.map((article, index) => (
            <div key={index} className="micro-interaction p-3 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex items-start justify-between mb-2">
                <h5 className="text-sm font-medium text-foreground flex-1">{article?.title}</h5>
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
      </div>

      {/* Mock Telegram Integration Interface */}
      <div className="bg-card p-4 rounded-lg border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="MessageSquare" size={16} className="text-accent" />
          <h4 className="font-semibold text-foreground">Telegram интеграция</h4>
        </div>

        <div className="bg-accent/5 p-3 rounded-lg border border-accent/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">@news_channel_ru</span>
            <div className="flex items-center space-x-1 text-xs text-success">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Подключен</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            Последняя отправка: 3 статьи • 14:30
          </p>
          <div className="text-xs text-accent">
            📱 Следующая отправка через 1ч 30мин
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="demo-section" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="micro-interaction inline-flex items-center space-x-2 bg-card text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-subtle">
            <Icon name="Play" size={16} />
            <span>{t('landing.demo.liveDemo')}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('landing.demo.title')}
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('landing.demo.subtitle')}
          </p>
        </div>

        {/* Demo Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {demoTabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`micro-interaction flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground shadow-moderate'
                  : 'bg-card text-foreground hover:bg-muted border border-border'
              }`}
            >
              <Icon name={tab?.icon} size={20} />
              <span>{tab?.name}</span>
            </button>
          ))}
        </div>

        {/* Demo Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-elevated">
            {/* Tab Description */}
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {demoTabs?.find(tab => tab?.id === activeTab)?.name}
              </h3>
              <p className="text-muted-foreground">
                {demoTabs?.find(tab => tab?.id === activeTab)?.description}
              </p>
            </div>

            {/* Demo Content */}
            <div className="min-h-[400px]">
              {activeTab === 'hydra' && renderHydraDemo()}
              {activeTab === 'oracle' && renderOracleDemo()}
              {activeTab === 'interface' && renderInterfaceDemo()}
            </div>
          </div>
        </div>

        {/* Demo Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="micro-interaction text-center bg-success/5 p-6 rounded-xl border border-success/20">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              {t('landing.demo.aiFiltered')}
            </h4>
            <p className="text-muted-foreground text-sm">
              100% контента проходит через ИИ-фильтрацию для максимальной релевантности
            </p>
          </div>

          <div className="micro-interaction text-center bg-accent/5 p-6 rounded-xl border border-accent/20">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="MessageSquare" size={32} className="text-accent" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              {t('landing.demo.autoTelegram')}
            </h4>
            <p className="text-muted-foreground text-sm">
              Автоматическая доставка в ваши Telegram каналы по расписанию
            </p>
          </div>

          <div className="micro-interaction text-center bg-primary/5 p-6 rounded-xl border border-primary/20">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Zap" size={32} className="text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Режим реального времени
            </h4>
            <p className="text-muted-foreground text-sm">
              Мгновенные уведомления о важных новостях и трендах
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;