import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { useLanguage } from '../../../hooks/useLanguage';

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = t('landing.testimonials.testimonials', { returnObjects: true });
  const stats = t('landing.testimonials.stats', { returnObjects: true });

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials?.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < rating ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="MessageCircle" size={16} />
            <span>{t('landing.testimonials.badge')}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            {t('landing.testimonials.trustedBy')}
            <span className="text-primary block">{t('landing.testimonials.title')}</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('landing.testimonials.description')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-1">
                {stat?.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="bg-card rounded-2xl border border-border p-8 lg:p-12 shadow-elevated">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    {renderStars(5)}
                  </div>
                  <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed mb-6">
                    "{testimonials?.[currentTestimonial]?.content}"
                  </blockquote>
                  
                  {/* Highlight Badge */}
                  <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    <Icon name="Zap" size={14} />
                    <span>{testimonials?.[currentTestimonial]?.highlight}</span>
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                    alt={testimonials?.[currentTestimonial]?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-heading font-semibold text-foreground">
                      {testimonials?.[currentTestimonial]?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials?.[currentTestimonial]?.role} at {testimonials?.[currentTestimonial]?.company}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation & Indicators */}
              <div className="lg:col-span-1 flex lg:flex-col items-center justify-center space-x-4 lg:space-x-0 lg:space-y-4">
                {/* Testimonial Indicators */}
                <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                  {testimonials?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? 'bg-primary scale-125' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                  <button
                    onClick={() => setCurrentTestimonial((prev) => 
                      prev === 0 ? testimonials?.length - 1 : prev - 1
                    )}
                    className="p-2 bg-muted hover:bg-muted-foreground/10 rounded-lg transition-colors duration-200"
                  >
                    <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => setCurrentTestimonial((prev) => 
                      (prev + 1) % testimonials?.length
                    )}
                    className="p-2 bg-muted hover:bg-muted-foreground/10 rounded-lg transition-colors duration-200"
                  >
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Background Quote Icon */}
          <div className="absolute top-4 right-4 opacity-10">
            <Icon name="Quote" size={48} className="text-primary" />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">{t('landing.testimonials.trustBadges')}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {[
              "TechCrunch", "Reuters", "Bloomberg", "BBC News", "CNN", "The Guardian"
            ]?.map((source, index) => (
              <div key={index} className="text-lg font-heading font-semibold text-muted-foreground">
                {source}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;