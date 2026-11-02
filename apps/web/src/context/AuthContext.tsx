import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  phone: string;
  fullName: string;
  email?: string;
  avatarUrl?: string;
  language: 'en' | 'ta';
  isVerified: boolean;
  isBlocked: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (phone: string, fullName: string) => void;
  logout: () => void;
  deleteAccount: () => void;
  favourites: string[];
  toggleFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('flacon_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [favourites, setFavourites] = useState<string[]>(() => {
    const saved = localStorage.getItem('flacon_favourites');
    return saved ? JSON.parse(saved) : ['f101', 'f102'];
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('flacon_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('flacon_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('flacon_favourites', JSON.stringify(favourites));
  }, [favourites]);

  const login = (phone: string, fullName: string) => {
    const newUser: User = {
      id: 'usr_' + Date.now(),
      phone,
      fullName: fullName || 'Flacon Member',
      language: 'en',
      isVerified: true,
      isBlocked: false
    };
    setUser(newUser);
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const deleteAccount = () => {
    setUser(null);
    setFavourites([]);
    localStorage.clear();
    alert('Your Flacon account and personal data have been completely deleted per privacy compliance.');
  };

  const toggleFavourite = (id: string) => {
    setFavourites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isFavourite = (id: string) => favourites.includes(id);

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      logout,
      deleteAccount,
      favourites,
      toggleFavourite,
      isFavourite,
      authModalOpen,
      setAuthModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

