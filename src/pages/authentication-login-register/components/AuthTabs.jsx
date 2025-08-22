import React from 'react';

import { useLanguage } from '../../../hooks/useLanguage';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'login', label: t('auth.login') },
    { id: 'register', label: t('auth.register') }
  ];

  return (
    <div className="flex rounded-lg bg-muted p-1">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === tab?.id
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab?.label}
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;