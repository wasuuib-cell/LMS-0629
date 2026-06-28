import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] px-6 py-4 md:px-12 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'bg-black shadow-2xl py-3' : 'bg-transparent py-5'}`}>
      <div className="flex items-center gap-4 group">
        {/* Branding removed by user request */}
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <Link to="/lms" className="px-6 py-2.5 bg-[#f87171] text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl shadow-[#f87171]/30 flex items-center gap-2 group">
          {t('nav.joinNow')} <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </nav>
  );
};
