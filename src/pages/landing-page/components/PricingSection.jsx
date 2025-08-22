import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useLanguage } from '../../../hooks/useLanguage';

const PricingSection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'starter',
      name: t('landing.pricing.starter.name'),
      description: t('landing.pricing.starter.description'),
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      features: t('landing.pricing.starter.features', { returnObjects: true }),
      limitations: t('landing.pricing.starter.limitations', { returnObjects: true }),
      cta: t('landing.pricing.starter.cta'),
      variant: 'outline'
    },
    {
      id: 'professional',
      name: t('landing.pricing.professional.name'),
      description: t('landing.pricing.professional.description'),
      monthlyPrice: 29,
      yearlyPrice: 290,
      popular: true,
      features: t('landing.pricing.professional.features', { returnObjects: true }),
      limitations: [],
      cta: t('landing.pricing.professional.cta'),
      variant: 'default'
    },
    {
      id: 'enterprise',
      name: t('landing.pricing.enterprise.name'),
      description: t('landing.pricing.enterprise.description'),
      monthlyPrice: 99,
      yearlyPrice: 990,
      popular: false,
      features: t('landing.pricing.enterprise.features', { returnObjects: true }),
      limitations: [],
      cta: t('landing.pricing.enterprise.cta'),
      variant: 'secondary'
    }
  ];

  const handleGetStarted = (planId) => {
    navigate('/authentication-login-register', { 
      state: { selectedPlan: planId } 
    });
  };

  const getPrice = (plan) => {
    const price = billingCycle === 'monthly' ? plan?.monthlyPrice : plan?.yearlyPrice;
    return price === 0 ? t('landing.pricing.starter.price') : `$${price}`;
  };

  const getSavings = (plan) => {
    if (plan?.monthlyPrice === 0) return null;
    const monthlyCost = plan?.monthlyPrice * 12;
    const savings = monthlyCost - plan?.yearlyPrice;
    return savings > 0 ? `${t('common.save')} $${savings}` : null;
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="DollarSign" size={16} />
            <span>{t('landing.pricing.title')}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            {t('landing.pricing.title')}
            <span className="text-primary block">{t('landing.pricing.subtitle')}</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('landing.pricing.description')}
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                billingCycle === 'monthly' ?'bg-background text-foreground shadow-subtle' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('landing.pricing.monthly')}
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                billingCycle === 'yearly' ?'bg-background text-foreground shadow-subtle' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('landing.pricing.yearly')}
              <span className="ml-2 px-2 py-0.5 bg-success/20 text-success text-xs rounded-full">
                {t('landing.pricing.saveTwentyPercent')}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans?.map((plan) => (
            <div
              key={plan?.id}
              className={`relative bg-card rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-elevated ${
                plan?.popular
                  ? 'border-primary shadow-moderate scale-105'
                  : 'border-border hover:border-primary/20'
              }`}
            >
              {/* Popular Badge */}
              {plan?.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    {t('landing.pricing.mostPopular')}
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {plan?.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {plan?.description}
                </p>
                
                {/* Price */}
                <div className="mb-4">
                  <div className="text-4xl font-heading font-bold text-foreground">
                    {getPrice(plan)}
                    {plan?.monthlyPrice > 0 && (
                      <span className="text-lg text-muted-foreground font-normal">
                        /{billingCycle === 'monthly' ? t('landing.pricing.monthly')?.toLowerCase() : t('landing.pricing.yearly')?.toLowerCase()}
                      </span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && getSavings(plan) && (
                    <div className="text-sm text-success font-medium mt-1">
                      {getSavings(plan)}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  variant={plan?.variant}
                  size="lg"
                  fullWidth
                  onClick={() => handleGetStarted(plan?.id)}
                  className="mb-6"
                >
                  {plan?.cta}
                </Button>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h4 className="font-heading font-semibold text-foreground">
                  {t('landing.pricing.whatIncluded')}
                </h4>
                <ul className="space-y-3">
                  {plan?.features?.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Limitations */}
                {plan?.limitations?.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <ul className="space-y-2">
                      {plan?.limitations?.map((limitation, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Icon name="X" size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-8">
            {t('landing.pricing.faq.title')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t('landing.pricing.faq.questions', { returnObjects: true })?.map((faq, index) => (
              <div key={index} className="text-left bg-card rounded-lg border border-border p-6">
                <h4 className="font-heading font-semibold text-foreground mb-2">
                  {faq?.question}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {faq?.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-primary/5 rounded-2xl border border-primary/20 p-8">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              {t('landing.pricing.bottomCta.title')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('landing.pricing.bottomCta.subtitle')}
            </p>
            <Button
              size="lg"
              onClick={() => handleGetStarted('professional')}
              iconName="ArrowRight"
              iconPosition="right"
              className="text-lg px-8 py-4"
            >
              {t('landing.pricing.bottomCta.cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;