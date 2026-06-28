import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-white transition-colors duration-500">
      <Header />
      <main className={`flex-1 ${isHomePage ? '' : 'pt-24'}`}>
        {children}
      </main>
    </div>
  );
};
