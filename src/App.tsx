import React, { useEffect, useState, Suspense, lazy } from 'react';
import { auth, db, handleFirestoreError, OperationType } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, getDocFromServer } from 'firebase/firestore';
import { UserProfile } from './types';
import { SecurityWrapper, ErrorBoundary } from './components/Security';
import { Loader2 } from 'lucide-react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Lazy load pages
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const StudentLogin = lazy(() => import('./pages/StudentLogin').then(m => ({ default: m.StudentLogin })));
const AdminLogin = lazy(() => import('./pages/AdminLogin').then(m => ({ default: m.AdminLogin })));
const GeneralLogin = lazy(() => import('./pages/GeneralLogin').then(m => ({ default: m.GeneralLogin })));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const GeneralDashboard = lazy(() => import('./pages/GeneralDashboard').then(m => ({ default: m.GeneralDashboard })));
const PriLogin = lazy(() => import('./pages/PriLogin').then(m => ({ default: m.PriLogin })));
const PriDashboard = lazy(() => import('./pages/PriDashboard').then(m => ({ default: m.PriDashboard })));

import { PublicLayout } from './components/PublicLayout';

const LoadingScreen = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <Loader2 className="w-12 h-12 text-primary animate-spin" />
  </div>
);

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Validate Connection to Firestore on boot
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. ");
        }
      }
    };
    testConnection();

    let unsubProfile: (() => void) | null = null;

    const unsubAuth = onAuthStateChanged(auth, async (u) => {
      if (unsubProfile) {
        unsubProfile();
        unsubProfile = null;
      }

      if (u) {
        setUser(u);
        const profileRef = doc(db, 'users', u.uid);
        unsubProfile = onSnapshot(profileRef, async (snap) => {
          if (snap.exists()) {
            setProfile(snap.data() as UserProfile);
          } else {
            const adminEmails = [
              'nudara30pro8@gmail.com',
              'wasuuib@gmail.com',
              '1nudara30pro7@gmail.com',
              'nudara30pro5@gmail.com',
              'nudara30pro6@gmail.com',
              'yasithamantha2004@gmail.com'
            ];
            if (u.email && adminEmails.includes(u.email)) {
              setProfile({ uid: u.uid, email: u.email, role: 'admin' });
            } else if (u.email) {
              // Also check for PRI users if not in main users collection
              try {
                const { getDoc, doc } = await import('firebase/firestore');
                const priDoc = await getDoc(doc(db, 'authorizedPri', u.email.toLowerCase()));
                if (priDoc.exists()) {
                  setProfile({ uid: u.uid, email: u.email, role: 'pri' as any });
                } else {
                  setProfile(null);
                }
              } catch (e) {
                console.error("PRI check failed", e);
                setProfile(null);
              }
            } else {
              setProfile(null);
            }
          }
          setLoading(false);
        }, (err) => {
          handleFirestoreError(err, OperationType.GET, `users/${u.uid}`);
          setLoading(false);
        });
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubAuth();
      if (unsubProfile) unsubProfile();
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <SecurityWrapper>
        <ThemeProvider>
          <LanguageProvider>
            <BrowserRouter>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                {/* Home Page */}
                <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />

                {/* Student Route */}
                <Route path="/lms" element={
                  user && profile?.role === 'student' ? (
                    <StudentDashboard profile={profile} />
                  ) : (
                    <PublicLayout><StudentLogin /></PublicLayout>
                  )
                } />

                {/* Admin Route */}
                <Route path="/admin" element={
                  user && profile?.role === 'admin' ? (
                    <AdminDashboard profile={profile} />
                  ) : (
                    <PublicLayout><AdminLogin /></PublicLayout>
                  )
                } />

                {/* General Route */}
                <Route path="/general" element={
                  user && (profile?.role === 'general' || profile?.role === 'admin') ? (
                    <GeneralDashboard profile={profile} />
                  ) : (
                    <PublicLayout><GeneralLogin /></PublicLayout>
                  )
                } />

                {/* PRI Route */}
                <Route path="/pri" element={
                  user && (profile?.role === 'pri' || profile?.role === 'admin') ? (
                    <PriDashboard profile={profile!} />
                  ) : (
                    <PublicLayout><PriLogin /></PublicLayout>
                  )
                } />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </SecurityWrapper>
    </ErrorBoundary>
  );
}
