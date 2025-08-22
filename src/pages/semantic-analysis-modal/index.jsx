import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import AnalysisHeader from './components/AnalysisHeader';
import SentimentAnalysis from './components/SentimentAnalysis';
import EntityRecognition from './components/EntityRecognition';
import FactExtraction from './components/FactExtraction';
import TopicClassification from './components/TopicClassification';
import ContentSummary from './components/ContentSummary';
import RelatedArticles from './components/RelatedArticles';
import QuickActions from './components/QuickActions';

const SemanticAnalysisModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('summary');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [article, setArticle] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  // Mock article data
  const mockArticle = {
    id: 1,
    title: 'Tesla Reports Record Q4 2023 Deliveries, Cybertruck Production Timeline Confirmed',
    source: 'TechCrunch',
    publishedAt: '2025-08-20T10:30:00Z',
    readTime: 5,
    url: 'https://techcrunch.com/tesla-q4-2023-deliveries',
    content: `Tesla has announced exceptional Q4 2023 results with record-breaking vehicle deliveries...`,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=400&fit=crop'
  };

  // Mock analysis data
  const mockAnalysisData = {
    sentiment: {
      overall: 'positive',
      confidence: 0.85,
      emotions: {
        joy: 0.15,
        trust: 0.72,
        fear: 0.08,
        surprise: 0.23,
        sadness: 0.12,
        disgust: 0.05,
        anger: 0.18,
        anticipation: 0.45
      }
    },
    entities: [
      { id: 1, name: 'Tesla Inc.', type: 'organization', confidence: 0.95, mentions: 12 },
      { id: 2, name: 'Elon Musk', type: 'person', confidence: 0.92, mentions: 8 },
      { id: 3, name: 'Cybertruck', type: 'product', confidence: 0.90, mentions: 7 }
    ],
    topics: [
      { id: 1, name: 'Electric Vehicles', confidence: 0.92, relevance: 0.88, category: 'Technology' },
      { id: 2, name: 'Financial Performance', confidence: 0.85, relevance: 0.79, category: 'Business' }
    ]
  };

  const analysisSections = [
    { id: 'summary', label: 'Summary', icon: 'FileText', component: ContentSummary },
    { id: 'sentiment', label: 'Sentiment', icon: 'Heart', component: SentimentAnalysis },
    { id: 'entities', label: 'Entities', icon: 'Users', component: EntityRecognition },
    { id: 'facts', label: 'Facts', icon: 'CheckCircle', component: FactExtraction },
    { id: 'topics', label: 'Topics', icon: 'Tag', component: TopicClassification },
    { id: 'related', label: 'Related', icon: 'Link', component: RelatedArticles },
    { id: 'actions', label: 'Actions', icon: 'Zap', component: QuickActions }
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setArticle(mockArticle);
      setAnalysisData(mockAnalysisData);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.key === 'Escape') {
        handleClose();
      }
      
      if (e?.key === 'ArrowLeft' || e?.key === 'ArrowRight') {
        const currentIndex = analysisSections?.findIndex(s => s?.id === activeSection);
        const nextIndex = e?.key === 'ArrowRight' 
          ? Math.min(currentIndex + 1, analysisSections?.length - 1)
          : Math.max(currentIndex - 1, 0);
        setActiveSection(analysisSections?.[nextIndex]?.id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  const handleClose = () => {
    navigate('/news-feed-dashboard');
  };

  const handleSave = () => {
    // Save article to archive
  };

  const handleShare = (platform) => {
    // Share article to specified platform
  };

  const renderActiveSection = () => {
    const section = analysisSections?.find(s => s?.id === activeSection);
    if (!section) return null;

    const Component = section?.component;
    const props = {
      article,
      onClose: handleClose
    };

    switch (activeSection) {
      case 'summary':
        return <Component {...props} summaryData={analysisData} />;
      case 'sentiment':
        return <Component {...props} sentimentData={analysisData?.sentiment} />;
      case 'entities':
        return <Component {...props} entities={analysisData?.entities} />;
      case 'facts':
        return <Component {...props} facts={null} />;
      case 'topics':
        return <Component {...props} topics={analysisData?.topics} />;
      case 'related':
        return <Component {...props} relatedArticles={null} />;
      case 'actions':
        return <Component {...props} />;
      default:
        return <Component {...props} />;
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-1100 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-card rounded-lg p-8 max-w-md mx-4 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="font-heading font-medium text-foreground mb-2">Analyzing Article</h3>
          <p className="text-sm text-muted-foreground">
            AI is processing the content for semantic analysis...
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Sentiment Analysis</span>
              <span>✓</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Entity Recognition</span>
              <Icon name="Loader" size={12} className="animate-spin" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Topic Classification</span>
              <span>⏳</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-1100 bg-black/50 backdrop-blur-sm">
      <div className={`
        ${isMobile 
          ? 'w-full h-full' :'w-full max-w-7xl h-[90vh] mx-auto mt-[5vh] rounded-lg shadow-elevated'
        }
        bg-background flex flex-col overflow-hidden
      `}>
        {/* Header */}
        <AnalysisHeader
          article={article}
          onClose={handleClose}
          onSave={handleSave}
          onShare={handleShare}
          isSaved={false}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar / Mobile Bottom Navigation */}
          {isMobile ? (
            <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-10">
              <div className="flex overflow-x-auto px-2 py-2">
                {analysisSections?.map((section) => (
                  <button
                    key={section?.id}
                    onClick={() => setActiveSection(section?.id)}
                    className={`
                      flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-xs font-medium transition-smooth min-w-0 flex-shrink-0
                      ${activeSection === section?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <Icon name={section?.icon} size={16} />
                    <span className="truncate">{section?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-64 bg-muted border-r border-border flex-shrink-0">
              <div className="p-4">
                <h3 className="font-heading font-medium text-foreground mb-4">Analysis Sections</h3>
                <nav className="space-y-1">
                  {analysisSections?.map((section) => (
                    <button
                      key={section?.id}
                      onClick={() => setActiveSection(section?.id)}
                      className={`
                        flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-smooth
                        ${activeSection === section?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }
                      `}
                    >
                      <Icon name={section?.icon} size={16} />
                      <span>{section?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={`flex-1 overflow-auto ${isMobile ? 'pb-20' : ''}`}>
            <div className="p-4 lg:p-6">
              {renderActiveSection()}
            </div>
          </div>
        </div>

        {/* Mobile Swipe Indicator */}
        {isMobile && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-1 bg-muted-foreground/30 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SemanticAnalysisModal;