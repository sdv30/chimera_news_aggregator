import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TelegramIntegrationSetup from './pages/telegram-integration-setup';
import AuthenticationPage from './pages/authentication-login-register';
import LandingPage from './pages/landing-page';
import SemanticAnalysisModal from './pages/semantic-analysis-modal';
import NewsFeedDashboard from './pages/news-feed-dashboard';
import ControlPanelSourceKeywordManagement from './pages/control-panel-source-keyword-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here - Landing page as default for guests */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthenticationPage />} />
        <Route path="/telegram-integration-setup" element={<TelegramIntegrationSetup />} />
        <Route path="/authentication-login-register" element={<AuthenticationPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/semantic-analysis-modal" element={<SemanticAnalysisModal />} />
        <Route path="/news-feed-dashboard" element={<NewsFeedDashboard />} />
        <Route path="/control-panel-source-keyword-management" element={<ControlPanelSourceKeywordManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;