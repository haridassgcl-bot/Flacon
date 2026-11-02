import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CategoryBar } from './components/CategoryBar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { AdDetailPage } from './pages/AdDetailPage';
import { PostAdPage } from './pages/PostAdPage';
import { PricingPage } from './pages/PricingPage';
import { MessagesPage } from './pages/MessagesPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { AccountPage } from './pages/AccountPage';
import { AuthModal } from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';
import { TAMIL_NADU_DISTRICTS } from './data/mockData';

export function App() {
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(TAMIL_NADU_DISTRICTS[0]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
          <Navbar
            language={language}
            onToggleLanguage={toggleLanguage}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
          />
          <CategoryBar language={language} />

          <main className="flex-1">
            <Routes>
              <Route 
                path="/" 
                element={<HomePage language={language} selectedDistrict={selectedDistrict} />} 
              />
              <Route 
                path="/browse" 
                element={<BrowsePage language={language} />} 
              />
              <Route 
                path="/ad/:id" 
                element={<AdDetailPage language={language} />} 
              />
              <Route 
                path="/post-ad" 
                element={<PostAdPage language={language} />} 
              />
              <Route 
                path="/pricing" 
                element={<PricingPage language={language} />} 
              />
              <Route 
                path="/messages" 
                element={<MessagesPage />} 
              />
              <Route 
                path="/favourites" 
                element={<FavouritesPage />} 
              />
              <Route 
                path="/account" 
                element={<AccountPage language={language} onToggleLanguage={toggleLanguage} />} 
              />
              {/* Fallback */}
              <Route 
                path="*" 
                element={<HomePage language={language} selectedDistrict={selectedDistrict} />} 
              />
            </Routes>
          </main>

          <Footer language={language} />
          <AuthModal />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
