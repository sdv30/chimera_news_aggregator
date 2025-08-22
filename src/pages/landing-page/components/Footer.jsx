import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useLanguage } from '../../../hooks/useLanguage';

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date()?.getFullYear();

  const handleSubscribe = (e) => {
    e?.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    product: [
      { label: t('landing.footer.features'), href: '#features' },
      { label: t('landing.footer.pricing'), href: '#pricing' },
      { label: t('landing.footer.api'), href: '#' },
      { label: t('landing.footer.integrations'), href: '#' },
      { label: t('landing.footer.changelog'), href: '#' }
    ],
    company: [
      { label: t('landing.footer.aboutUs'), href: '#' },
      { label: t('landing.footer.blog'), href: '#' },
      { label: t('landing.footer.careers'), href: '#' },
      { label: t('landing.footer.pressKit'), href: '#' },
      { label: t('landing.footer.contact'), href: '#' }
    ],
    resources: [
      { label: t('landing.footer.helpCenter'), href: '#' },
      { label: t('landing.footer.community'), href: '#' },
      { label: t('landing.footer.tutorials'), href: '#' },
      { label: t('landing.footer.webinars'), href: '#' },
      { label: t('landing.footer.status'), href: '#' }
    ],
    legal: [
      { label: t('landing.footer.privacyPolicy'), href: '#' },
      { label: t('landing.footer.termsOfService'), href: '#' },
      { label: t('landing.footer.cookiePolicy'), href: '#' },
      { label: t('landing.footer.gdpr'), href: '#' },
      { label: t('landing.footer.security'), href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
    { name: 'GitHub', icon: 'Github', href: '#' },
    { name: 'Discord', icon: 'MessageCircle', href: '#' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'sah', name: 'Саха тыла', flag: '🏴' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                {t('landing.footer.newsletter.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('landing.footer.newsletter.description')}
              </p>
            </div>
            <div>
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder={t('landing.footer.newsletter.placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                    required
                    className="flex-1"
                  />
                  <Button type="submit" iconName="Send" iconPosition="right">
                    {t('landing.footer.newsletter.subscribe')}
                  </Button>
                </form>
              ) : (
                <div className="flex items-center space-x-2 text-success">
                  <Icon name="CheckCircle" size={20} />
                  <span className="font-medium">{t('landing.footer.newsletter.subscribed')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">
                  Chimera News
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('landing.footer.tagline')}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t('landing.footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.href}
                  className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">{t('landing.footer.product')}</h4>
            <ul className="space-y-3">
              {footerLinks?.product?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">{t('landing.footer.company')}</h4>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">{t('landing.footer.resources')}</h4>
            <ul className="space-y-3">
              {footerLinks?.resources?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">{t('landing.footer.legal')}</h4>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} Chimera News. {t('landing.footer.allRightsReserved')}
            </div>

            {/* Language Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">{t('landing.footer.language')}</span>
              <div className="flex space-x-2">
                {languages?.map((lang) => (
                  <button
                    key={lang?.code}
                    className="flex items-center space-x-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground rounded transition-colors duration-200"
                  >
                    <span>{lang?.flag}</span>
                    <span>{lang?.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Status & Trust Indicators */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>{t('landing.footer.systemStatus')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={14} />
                <span>{t('landing.footer.compliance')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;