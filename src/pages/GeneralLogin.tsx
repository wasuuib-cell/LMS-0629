import React, { useState } from 'react';
import { auth, googleProvider, db, handleFirestoreError, OperationType } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Lock, Mail, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export const GeneralLogin: React.FC = () => {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const userEmail = res.user.email;
      const uid = res.user.uid;

      const recoveryEmails = ['1nudara30pro7@gmail.com', 'nudara30pro8@gmail.com', 'wasuuib@gmail.com', 'morningbosterapp@gmail.com'];
      const recoveryPassword = 'nhhgl';
      
      const isAuthorized = userEmail && recoveryEmails.includes(userEmail) && password === recoveryPassword;

      if (isAuthorized) {
        console.log("Promoting user to admin role...");
        await setDoc(doc(db, 'users', uid), { 
          uid, 
          email: userEmail, 
          role: 'admin',
          password: password
        });
        alert('Admin role assigned successfully! You can now use the Admin Dashboard.');
      } else {
        throw new Error('Invalid General Admin Credentials');
      }
    } catch (err: any) {
      if (err.code === 'auth/popup-blocked') {
        setError('Login popup blocked! Please allow popups in your browser settings and try again.');
      } else {
        setError(err.message);
      }
      handleFirestoreError(err, OperationType.WRITE, 'users/general-login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white selection:bg-primary selection:text-white transition-colors duration-500">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-slate-200 rounded-[40px] p-12 relative overflow-hidden shadow-2xl shadow-slate-200/50 transition-colors duration-500"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center mb-6 bg-slate-50 transition-colors duration-500">
            <Lock className="w-6 h-6 text-slate-300" />
          </div>
          <h1 className="text-3xl font-bold text-[#1a1a1a] tracking-tighter uppercase italic">{t('login.general.title')}</h1>
          <p className="text-[#1a1a1a] text-[10px] uppercase tracking-[0.2em] mt-3 text-center font-bold px-4">{t('login.general.desc')}</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-widest px-1 italic">{t('login.label.masterPassword')}</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter master password"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-[#1a1a1a] focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-500 text-[10px] uppercase font-bold tracking-widest text-center italic">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-primary text-white font-black uppercase italic tracking-widest py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm shadow-xl shadow-primary/20"
          >
            <Mail className="w-5 h-5 text-white/50" />
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
