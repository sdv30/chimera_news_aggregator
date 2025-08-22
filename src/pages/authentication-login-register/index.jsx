import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import GoogleOAuthButton from './components/GoogleOAuthButton';
import LanguageSelector from './components/LanguageSelector';
import LoadingOverlay from './components/LoadingOverlay';

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translations = {
    en: {
      title: 'Welcome to Chimera News',
      subtitle: 'Your intelligent news aggregation platform',
      loginSuccess: 'Login successful! Redirecting...',
      registerSuccess: 'Account created! Please check your email for verification.',
      oauthSuccess: 'Authentication successful! Setting up your account...',
      networkError: 'Network error. Please check your connection and try again.',
      serverError: 'Server error. Please try again later.'
    },
    ru: {
      title: 'Добро пожаловать в Chimera News',
      subtitle: 'Ваша интеллектуальная платформа агрегации новостей',
      loginSuccess: 'Вход выполнен успешно! Перенаправление...',
      registerSuccess: 'Аккаунт создан! Проверьте email для подтверждения.',
      oauthSuccess: 'Аутентификация успешна! Настраиваем ваш аккаунт...',
      networkError: 'Ошибка сети. Проверьте подключение и попробуйте снова.',
      serverError: 'Ошибка сервера. Попробуйте позже.'
    },
    sah: {
      title: 'Chimera News-ка нөрүү сүрэх',
      subtitle: 'Эн умнай сонун агрегация платформата',
      loginSuccess: 'Киирии сөп! Көһөрүү...',
      registerSuccess: 'Аккаунт оҥоһуллубут! Email-ы көр.',
      oauthSuccess: 'Аутентификация сөп! Аккаунтыҥ туруоруу...',
      networkError: 'Сиэт алҕаһа. Холбоһуу көр уонна хатылаа.',
      serverError: 'Сервер алҕаһа. Кэлин хатылаа.'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('chimera_language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const t = translations?.[currentLanguage] || translations?.en;

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      localStorage.setItem('chimera_auth_token', 'mock_jwt_token_' + Date.now());
      localStorage.setItem('chimera_user', JSON.stringify({
        id: 'user_123',
        email: formData?.email,
        name: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        preferences: {
          language: currentLanguage,
          theme: 'light'
        }
      }));

      setError('');
      
      // Show success message briefly
      setTimeout(() => {
        navigate('/news-feed-dashboard');
      }, 1000);

    } catch (err) {
      setError(t?.networkError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      localStorage.setItem('chimera_pending_verification', JSON.stringify({
        email: formData?.email,
        name: formData?.fullName,
        timestamp: Date.now()
      }));

      setError('');
      
      // Show success message and switch to login
      setTimeout(() => {
        setActiveTab('login');
      }, 2000);

    } catch (err) {
      setError(t?.serverError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async (authData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful OAuth
      localStorage.setItem('chimera_auth_token', 'mock_oauth_token_' + Date.now());
      localStorage.setItem('chimera_user', JSON.stringify({
        id: authData?.user?.id,
        email: authData?.user?.email,
        name: authData?.user?.name,
        avatar: authData?.user?.avatar,
        provider: 'google',
        preferences: {
          language: currentLanguage,
          theme: 'light'
        }
      }));

      setError('');
      
      // Redirect after brief delay
      setTimeout(() => {
        navigate('/news-feed-dashboard');
      }, 1000);

    } catch (err) {
      setError(t?.networkError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 lg:p-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Zap" size={20} color="white" />
          </div>
          <div>
            <h1 className="text-lg font-heading font-semibold text-foreground">
              Chimera News
            </h1>
            <p className="text-xs text-muted-foreground -mt-1">
              Aggregator
            </p>
          </div>
        </div>
        
        <LanguageSelector />
      </header>
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mx-auto mb-4">
              <Icon name="Newspaper" size={32} color="white" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
              {t?.title}
            </h2>
            <p className="text-muted-foreground">
              {t?.subtitle}
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-card border border-border rounded-xl shadow-elevated p-6">
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            {activeTab === 'login' ? (
              <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
              />
            ) : (
              <RegisterForm
                onSubmit={handleRegister}
                isLoading={isLoading}
                error={error}
              />
            )}

            <div className="mt-6">
              <GoogleOAuthButton
                onGoogleAuth={handleGoogleAuth}
                isLoading={isLoading}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-6 space-y-2">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              ← Back to Home
            </button>
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-colors">
                Privacy Policy
              </button>
              <span>•</span>
              <button className="hover:text-foreground transition-colors">
                Terms of Service
              </button>
              <span>•</span>
              <button className="hover:text-foreground transition-colors">
                Help
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Loading Overlay */}
      <LoadingOverlay 
        isVisible={isLoading} 
        message={
          activeTab === 'login' ? t?.loginSuccess :
          activeTab === 'register' ? t?.registerSuccess :
          t?.oauthSuccess
        }
      />
      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default AuthenticationPage;