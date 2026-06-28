import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export const PriLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email?.toLowerCase();

      if (!email) throw new Error('No email found in Google account.');

      // Check if authorized PRI
      const priDoc = await getDoc(doc(db, 'authorizedPri', email));
      if (!priDoc.exists()) {
        await auth.signOut();
        throw new Error('ACCESS_DENIED: Unauthorized Access Point.');
      }

      navigate('/pri');
    } catch (err: any) {
      setError(err.message || 'Authentication sequence failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 selection:bg-primary selection:text-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-12 rounded-[50px] shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-24 h-24 bg-primary/10 rounded-[35px] flex items-center justify-center border border-primary/20 mb-8 group overflow-hidden">
             <ShieldCheck className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-4">Nexus.PRI_Portal</h1>
          <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] italic">Access strictly restricted to authorized Marks Managers</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-3xl text-red-500 text-[10px] font-black uppercase tracking-widest text-center italic"
          >
            {error}
          </motion.div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-primary text-black font-black uppercase italic tracking-[0.2em] py-6 rounded-[2rem] shadow-2xl shadow-primary/10 hover:scale-[1.02] active:scale-95 transition-all text-sm flex items-center justify-center gap-4 group disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In with Nexus'}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </button>

        <div className="mt-12 flex items-center gap-4 justify-center opacity-30">
           <Lock className="w-4 h-4 text-white" />
           <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white">Encrypted_Terminal_Active</p>
        </div>
      </motion.div>
    </div>
  );
};
