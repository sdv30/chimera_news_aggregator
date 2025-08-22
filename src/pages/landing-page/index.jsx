import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../../hooks/useLanguage';
import LandingHeader from './components/LandingHeader';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import DemoSection from './components/DemoSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const LandingPage = () => {
  const { t } = useLanguage();

  // Smooth scroll behavior for anchor links
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const href = e?.target?.getAttribute('href');
      if (href && href?.startsWith('#')) {
        e?.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('landing.title')}</title>
        <meta 
          name="description" 
          content={t('landing.description')} 
        />
        <meta 
          name="keywords" 
          content="AI news aggregation, news curation, Telegram bot, news summaries, personalized news, journalism tools" 
        />
        <meta property="og:title" content={t('landing.title')} />
        <meta 
          property="og:description" 
          content={t('landing.description')} 
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://chimeranews.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <LandingHeader />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Features Section */}
          <section id="features">
            <FeaturesSection />
          </section>

          {/* Demo Section */}
          <DemoSection />

          {/* Testimonials Section */}
          <section id="testimonials">
            <TestimonialsSection />
          </section>

          {/* Pricing Section */}
          <section id="pricing">
            <PricingSection />
          </section>

          {/* Final CTA Section */}
          <CTASection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;