import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendsPanel = ({ 
  isOpen = false, 
  onClose = () => {}
}) => {
  const [activeTab, setActiveTab] = useState('keywords');
  const [timeRange, setTimeRange] = useState('week');

  const mockKeywordTrends = [
    { keyword: 'AI Technology', count: 156, growth: 23.5, trend: 'up' },
    { keyword: 'Climate Change', count: 142, growth: 18.2, trend: 'up' },
    { keyword: 'Cryptocurrency', count: 98, growth: -12.3, trend: 'down' },
    { keyword: 'Space Exploration', count: 87, growth: 45.7, trend: 'up' },
    { keyword: 'Healthcare', count: 76, growth: 8.9, trend: 'up' }
  ];

  const mockWeeklyData = [
    { day: 'Mon', articles: 45, engagement: 78 },
    { day: 'Tue', articles: 52, engagement: 85 },
    { day: 'Wed', articles: 38, engagement: 72 },
    { day: 'Thu', articles: 61, engagement: 92 },
    { day: 'Fri', articles: 48, engagement: 68 },
    { day: 'Sat', articles: 29, engagement: 54 },
    { day: 'Sun', articles: 33, engagement: 61 }
  ];

  const mockSentimentData = [
    { name: 'Positive', value: 45, color: '#10B981' },
    { name: 'Neutral', value: 35, color: '#6B7280' },
    { name: 'Negative', value: 20, color: '#EF4444' }
  ];

  const mockSourceStats = [
    { source: 'BBC', articles: 23, reliability: 95 },
    { source: 'Reuters', articles: 19, reliability: 92 },
    { source: 'CNN', articles: 17, reliability: 88 },
    { source: 'Guardian', articles: 15, reliability: 90 },
    { source: 'AP News', articles: 12, reliability: 94 }
  ];

  const tabs = [
    { id: 'keywords', label: 'Keywords', icon: 'TrendingUp' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'sentiment', label: 'Sentiment', icon: 'Heart' },
    { id: 'sources', label: 'Sources', icon: 'Globe' }
  ];

  const timeRanges = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-80 bg-card border-l border-border shadow-elevated overflow-hidden flex flex-col lg:relative lg:z-auto lg:shadow-none">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={18} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">Trends</h3>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="text-xs bg-muted border border-border rounded px-2 py-1"
          >
            {timeRanges?.map((range) => (
              <option key={range?.value} value={range?.value}>
                {range?.label}
              </option>
            ))}
          </select>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`
              flex-1 flex items-center justify-center space-x-1 px-2 py-3 text-xs font-medium transition-smooth
              ${activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <Icon name={tab?.icon} size={14} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'keywords' && (
          <div className="space-y-4">
            <h4 className="font-heading font-medium text-foreground">Trending Keywords</h4>
            <div className="space-y-3">
              {mockKeywordTrends?.map((item, index) => (
                <div key={item?.keyword} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
                      <span className="text-sm font-medium text-foreground">{item?.keyword}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">{item?.count} articles</span>
                      <div className={`flex items-center space-x-1 ${getTrendColor(item?.trend)}`}>
                        <Icon name={getTrendIcon(item?.trend)} size={12} />
                        <span className="text-xs font-medium">{Math.abs(item?.growth)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-heading font-medium text-foreground mb-3">Weekly Activity</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockWeeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--color-card)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="articles" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-medium text-foreground mb-3">Engagement Trend</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockWeeklyData}>
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--color-card)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="engagement" 
                      stroke="var(--color-accent)" 
                      strokeWidth={2}
                      dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sentiment' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-heading font-medium text-foreground mb-3">Sentiment Distribution</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockSentimentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockSentimentData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2">
              {mockSentimentData?.map((item) => (
                <div key={item?.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item?.color }}
                    />
                    <span className="text-sm text-foreground">{item?.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item?.value}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="space-y-4">
            <h4 className="font-heading font-medium text-foreground">Source Performance</h4>
            <div className="space-y-3">
              {mockSourceStats?.map((source) => (
                <div key={source?.source} className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{source?.source}</span>
                    <span className="text-xs text-muted-foreground">{source?.articles} articles</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">Reliability:</span>
                    <div className="flex-1 bg-background rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full" 
                        style={{ width: `${source?.reliability}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground">{source?.reliability}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          onClick={onClose}
          className="lg:hidden"
        >
          Close Trends
        </Button>
      </div>
    </div>
  );
};

export default TrendsPanel;