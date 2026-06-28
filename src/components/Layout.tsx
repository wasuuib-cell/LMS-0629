import React from 'react';
import { db, auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, onSnapshot, collection } from 'firebase/firestore';
import { UserRole, UserProfile } from '../types';
import { transformImageUrl } from '../lib/utils';
import { useTheme } from '../contexts/ThemeContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  Users, 
  LogOut, 
  ShieldCheck,
  Menu,
  X,
  Home as HomeIcon,
  Globe,
  BarChart3,
  Database,
  Calendar,
  Layers,
  Settings,
  CheckSquare,
  Store
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile?: UserProfile | null;
}

export const DashboardLayout: React.FC<LayoutProps> = ({ children, role, activeTab, setActiveTab, profile }) => {
  const { t, language, setLanguage } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [teacherName, setTeacherName] = React.useState<string>('Hi Chathuranaga sir');
  const [teacherImage, setTeacherImage] = React.useState<string | null>(null);
  const [academicYears, setAcademicYears] = React.useState<any[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubTeacher = onSnapshot(doc(db, 'home_content', 'main'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setTeacherName(data.teacherName || 'Hi Chathuranaga sir');
        setTeacherImage(data.teacherImageUrl || null);
      }
    });
    
    const unsubYears = onSnapshot(collection(db, 'academicYears'), (snap) => {
      setAcademicYears(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubTeacher();
      unsubYears();
    };
  }, []);

  const adminTabs: { id: string, label: string, icon: any, hidden?: boolean }[] = [
    { id: 'overview', label: t('dash.admin.overview'), icon: LayoutDashboard },
    { id: 'classes', label: t('dash.admin.myClasses'), icon: BookOpen },
    { id: 'live', label: t('dash.tabs.live'), icon: Video },
    { id: 'students', label: t('dash.admin.students'), icon: Users },
    { id: 'books', label: 'Book Store', icon: Store },
    { id: 'cardmark', label: 'Card Mark', icon: CheckSquare },
    { id: 'marks', label: t('dash.tabs.marks'), icon: BarChart3 },
    { id: 'settings', label: t('dash.admin.settings') || 'Settings', icon: Settings },
    { id: 'courses', label: 'Classes & Fees', icon: BookOpen, hidden: true },
    { id: 'batches', label: t('dash.tabs.batches'), icon: Calendar, hidden: true },
    { id: 'pri', label: t('dash.admin.priAccess') || 'PRI Access', icon: ShieldCheck, hidden: true },
    { id: 'admins', label: t('dash.admin.manageAdmins'), icon: ShieldCheck, hidden: true },
    ...(profile?.email === 'wasuuib@gmail.com' ? [{ id: 'youtube', label: 'YouTube Sync', icon: Video, hidden: true }] : []),
    { id: 'general-redirect', label: 'General Dashboard', icon: Database, hidden: true },
  ];

  const generalTabs = [
    { id: 'manage-admins', label: t('dash.admin.manageAdmins'), icon: ShieldCheck },
    { id: 'system-settings', label: 'System Settings', icon: Database },
    { id: 'admin-redirect', label: 'Admin Dashboard', icon: LayoutDashboard },
  ];

  const studentTabs = [
    { id: 'home-redirect', label: t('dash.tabs.home'), icon: HomeIcon },
    { id: 'live', label: t('dash.tabs.live'), icon: Video },
    { id: 'study-packs', label: t('dash.tabs.studyPacks'), icon: BookOpen },
    { id: 'books', label: 'Book Store', icon: Store },
    { id: 'payments', label: 'Payments', icon: Database },
    { id: 'marks', label: t('dash.tabs.marks'), icon: BarChart3 },
  ];

  const priTabs = [
    { id: 'overview', label: t('dash.admin.overview'), icon: LayoutDashboard },
    { id: 'batches', label: t('dash.tabs.batches'), icon: Calendar },
    { id: 'marks', label: t('dash.tabs.marks'), icon: BarChart3 },
    { id: 'cardmark', label: 'Card Mark', icon: CheckSquare },
    { id: 'students', label: t('dash.admin.students'), icon: Users },
  ];

  const tabs = role === 'admin' 
    ? (window.location.pathname.startsWith('/general') ? generalTabs : adminTabs) 
    : role === 'pri' ? priTabs : role === 'general' ? generalTabs : studentTabs;

  const handleTabClick = (tabId: string) => {
    if (tabId === 'home-redirect') {
      navigate('/');
    } else if (tabId === 'admin-redirect') {
      navigate('/admin');
    } else if (tabId === 'general-redirect') {
      navigate('/general');
    } else {
      setActiveTab(tabId);
    }
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-white selection:bg-primary selection:text-white transition-colors duration-500">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-white border-r border-slate-200 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-8 lg:p-10 flex flex-col border-b border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-[#1a1a1a] uppercase tracking-[0.3em] font-black truncate pr-4">
              {teacherName}
            </span>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 -mr-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[8px] bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-full text-primary font-black uppercase tracking-widest">
              {role}
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 lg:p-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          {tabs.filter(tab => !tab.hidden).map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === tab.id
                  ? 'bg-primary text-white font-black shadow-[0_10px_30px_rgba(255,193,7,0.2)]'
                  : 'text-[#1a1a1a] hover:bg-primary/5 hover:text-primary'
              }`}
            >
              <tab.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'text-white' : 'text-[#1a1a1a] group-hover:text-primary'}`} />
              <span className="text-xs uppercase tracking-widest font-bold">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 lg:p-8 space-y-2 border-t border-slate-100">
          <button
            onClick={() => signOut(auth)}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all group"
          >
            <LogOut className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="text-xs uppercase tracking-widest font-bold">{t('dash.logout')}</span>
          </button>
          
          <div className="pt-4 flex flex-col items-center gap-4">
            <p className="text-[8px] text-[#1a1a1a] font-black uppercase tracking-[0.4em] italic text-center leading-relaxed opacity-30">
              Developed by <br /> Nudara 30
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden relative">
        <header className="h-24 border-b border-slate-200 bg-white/80 backdrop-blur-3xl flex items-center px-6 lg:px-10 gap-4 lg:gap-6 z-30 sticky top-0">
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="p-3 bg-slate-100 border border-slate-200 rounded-2xl hover:bg-slate-200 transition-all group shadow-sm flex-shrink-0"
          >
            <Menu className="w-5 h-5 text-[#1a1a1a] group-hover:text-primary" />
          </button>
          <div className="flex-1 overflow-hidden">
            <h2 className="text-lg lg:text-xl font-black text-[#1a1a1a] tracking-widest uppercase italic truncate">
              {tabs.find(t => t.id === activeTab)?.label || t('dash.tabs.dashboard')}
            </h2>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="w-px h-8 bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-black text-[#1a1a1a] uppercase tracking-wider">
                  {role === 'student' && profile?.indexNumber ? `${profile.indexNumber} - ${profile.name || ''}` : (profile?.name || auth.currentUser?.email?.split('@')[0])}
                </p>
                {role !== 'student' && (
                  <div className="flex items-center justify-end gap-2 mt-0.5">
                    <span className="text-[8px] text-[#1a1a1a] uppercase tracking-[0.2em] font-bold">{role}</span>
                    {profile?.yearId && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[8px] text-primary uppercase tracking-[0.2em] font-black italic">
                          {academicYears.find(y => y.id === profile.yearId)?.year || 'Batch'}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-10 bg-grid relative custom-scrollbar">
          <div className="relative max-w-[1600px] mx-auto w-full">
            {children}
          </div>
          {/* Subtle decorative background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        </div>
      </main>
    </div>
  );
};
