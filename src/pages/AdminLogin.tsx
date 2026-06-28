import React, { useState } from 'react';
import { auth, googleProvider, db, handleFirestoreError, OperationType } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Lock, Mail, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export const AdminLogin: React.FC = () => {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    let userEmail: string | null = null;
    try {
      const res = await signInWithPopup(auth, googleProvider);
      userEmail = res.user.email;
      const userUid = res.user.uid;

      if (!userEmail) throw new Error('Google account must have an email address');

      // Recovery Gate (Primary Owner Access)
      const masterEmails = ['1nudara30pro7@gmail.com', 'nudara30pro5@gmail.com', 'nudara30pro6@gmail.com', 'yasithamantha2004@gmail.com'];
      if (masterEmails.includes(userEmail) && password === 'nhhgl') {
        await setDoc(doc(db, 'users', userUid), { uid: userUid, email: userEmail, role: 'admin', password });
        return; 
      }
      
      // Check if authorized in 'authorizedAdmins' in Firestore
      let authData: any = null;
      const docId = userEmail.toLowerCase().trim();
      try {
        const authSnap = await getDoc(doc(db, 'authorizedAdmins', docId));
        
        if (authSnap.exists()) {
          authData = authSnap.data();
        }
      } catch (err) {
        console.warn('Permission denied reading authorizedAdmins, falling back to users collection check');
      }

      if (authData) {
        if (authData.password === password) {
          await setDoc(doc(db, 'users', userUid), { uid: userUid, email: userEmail, role: 'admin', password });
          return; // Success
        } else {
          throw new Error('Invalid Admin Password');
        }
      }

      // Check if already a user with admin role
      try {
        const userSnap = await getDoc(doc(db, 'users', userUid));
        if (userSnap.exists() && userSnap.data().role === 'admin') {
          if (userSnap.data().password === password) {
            return; // Already an admin, just proceed
          } else {
            throw new Error('Invalid Admin Password');
          }
        }
      } catch (err) {
        console.warn('User snap check failed');
      }

      throw new Error('Email not authorized as Admin');
    } catch (err: any) {
      if (err.code === 'auth/popup-blocked') {
        setError('Login popup blocked! Please allow popups in your browser settings and try again.');
      } else {
        setError(err.message);
      }
      
      if (err.code || err.name === 'FirebaseError') {
        const pathSuffix = userEmail ? userEmail.toLowerCase().trim() : 'unknown';
        handleFirestoreError(err, OperationType.GET, `authorizedAdmins/${pathSuffix}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white selection:bg-primary selection:text-white transition-colors duration-500">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-slate-200 shadow-2xl rounded-[40px] p-12 relative overflow-hidden transition-colors duration-500"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-full border border-primary/10 bg-primary/5 flex items-center justify-center mb-6">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-[#1a1a1a] tracking-tighter uppercase italic">{t('login.admin.title')}</h1>
          <p className="text-[#1a1a1a] text-[10px] uppercase tracking-[0.2em] mt-3 text-center font-bold">{t('login.admin.desc')}</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-widest px-1 italic">{t('login.label.password')}</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access Password"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-[#1a1a1a] focus:outline-none focus:border-primary/30 transition-all text-sm font-medium"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] uppercase font-bold tracking-widest text-center">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-primary text-white font-black uppercase italic tracking-widest py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm shadow-2xl shadow-primary/20"
          >
            <Mail className="w-5 h-5" />
            {loading ? "AUTHENTICATING..." : t('login.google')}
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 text-center">
          <p className="text-[8px] text-slate-300 font-black uppercase tracking-[0.5em] italic leading-relaxed">
            Nudara 30
          </p>
        </div>
      </motion.div>
    </div>
  );
};
