import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, onSnapshot, collection, addDoc, deleteDoc, getDocs, writeBatch, setDoc } from 'firebase/firestore';
import { UserProfile } from '../types';
import { DashboardLayout } from '../components/Layout';
import { ShieldCheck, Plus, Trash2, Mail, Lock, Database, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GeneralDashboard: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('manage-admins');
  const [admins, setAdmins] = useState<any[]>([]);
  const [newAdmin, setNewAdmin] = useState({ email: '', password: '' });
  const [isClearing, setIsClearing] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [settings, setSettings] = useState({ registrationVideoUrl: '' });
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  useEffect(() => {
    const unsubAdmins = onSnapshot(collection(db, 'authorizedAdmins'), (snap) => {
      setAdmins(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }, (err) => {
      console.warn("Permission denied reading authorizedAdmins. You may need to log in via General Login first.");
    });

    const unsubSettings = onSnapshot(doc(db, 'settings', 'general'), (doc) => {
      if (doc.exists()) {
        setSettings({ registrationVideoUrl: doc.data().registrationVideoUrl || '' });
      }
    });

    return () => {
      unsubAdmins();
      unsubSettings();
    };
  }, []);

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    try {
      await setDoc(doc(db, 'settings', 'general'), settings, { merge: true });
      alert('Settings saved successfully!');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'settings/general');
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleAddAdmin = async () => {
    try {
      await addDoc(collection(db, 'authorizedAdmins'), {
        email: newAdmin.email,
        password: newAdmin.password,
        role: 'admin'
      });
      setNewAdmin({ email: '', password: '' });
      alert('Admin authorized successfully!');
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'authorizedAdmins'); }
  };

  const handleDeleteAdmin = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'authorizedAdmins', id));
    } catch (err) { handleFirestoreError(err, OperationType.DELETE, `authorizedAdmins/${id}`); }
  };

  const handleClearDatabase = async () => {
    if (confirmText !== 'CLEAR') {
      alert('Please type CLEAR to confirm.');
      return;
    }

    setIsClearing(true);
    try {
      const collectionsToClear = [
        'students',
        'lessons',
        'onlineClasses',
        'paperResults',
        'home_posts',
        'home_videos',
        'academicYears',
        'recordings',
        'counters',
        'users'
      ];

      for (const collName of collectionsToClear) {
        const snap = await getDocs(collection(db, collName));
        const batch = writeBatch(db);
        snap.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
      }

      // Also clear home_content/main
      await deleteDoc(doc(db, 'home_content', 'main'));

      alert('Database cleared successfully! (Authorized Admins preserved)');
      setConfirmText('');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'clear-database');
    } finally {
      setIsClearing(false);
    }
  };

  const renderSystemSettings = () => (
    <div className="space-y-12">
      <div className="bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm transition-colors duration-500">
        <h3 className="text-2xl font-black mb-10 text-[#1a1a1a] flex items-center gap-4 uppercase italic tracking-tighter">
          <Database className="w-7 h-7 text-primary/40" /> Site Settings
        </h3>
        <div className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">How to Register Video (YouTube URL)</label>
            <input
              type="text"
              placeholder="https://youtube.com/watch?v=..."
              value={settings.registrationVideoUrl}
              onChange={e => setSettings({...settings, registrationVideoUrl: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-6 text-[#1a1a1a] text-xs font-mono tracking-widest placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
            />
          </div>
          <button
            onClick={handleSaveSettings}
            disabled={isSavingSettings}
            className="bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-xl shadow-primary/20 disabled:opacity-50"
          >
            {isSavingSettings ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      <div className="bg-white border border-red-100 p-12 rounded-[40px] relative overflow-hidden shadow-sm transition-colors duration-500">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <AlertTriangle className="w-48 h-48 text-red-500" />
        </div>
        
        <div className="flex items-center gap-6 mb-10 relative z-10">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100">
            <AlertTriangle className="w-8 h-8 text-red-500/50" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-[#1a1a1a] tracking-tighter uppercase italic">Danger Zone</h3>
            <p className="text-[#1a1a1a] text-xs font-bold uppercase tracking-widest leading-relaxed">System-wide irreversible operations</p>
          </div>
        </div>

        <div className="p-10 bg-red-50/50 border border-red-100 rounded-[32px] relative z-10">
          <h4 className="text-xl font-black text-red-600/80 mb-4 uppercase italic tracking-tight">Full System Reset</h4>
          <p className="text-[#1a1a1a] text-sm mb-10 leading-relaxed font-medium max-w-2xl">
            Executing this protocol will permanently erase all students, study packs, session records, and performance indexes. 
            <span className="text-[#1a1a1a] font-black underline decoration-red-500/50"> Authorized administrator access will be retained</span> for security continuity.
          </p>

          <div className="space-y-6 max-w-md">
            <div className="space-y-2">
              <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1 block">
                Security Confirmation Terminal
              </label>
              <input
                type="text"
                placeholder="TYPE 'CLEAR' TO PROCEED"
                value={confirmText}
                onChange={e => setConfirmText(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl py-5 px-6 text-[#1a1a1a] text-xs font-black tracking-widest placeholder:text-slate-300 focus:outline-none focus:border-red-500/30 transition-all font-mono"
              />
            </div>
            <button
              onClick={handleClearDatabase}
              disabled={isClearing || confirmText !== 'CLEAR'}
              className={`w-full py-5 rounded-2xl font-black uppercase italic tracking-[0.2em] transition-all flex items-center justify-center gap-3 text-sm ${
                confirmText === 'CLEAR' 
                  ? 'bg-red-500 text-white hover:bg-red-600 shadow-xl shadow-red-500/20 active:scale-95' 
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'
              }`}
            >
              {isClearing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Database className="w-5 h-5" />
                  INITIATE WIPE
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderManageAdmins = () => (
    <div className="space-y-12">
      <div className="bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm transition-colors duration-500">
        <h3 className="text-2xl font-black mb-10 text-[#1a1a1a] flex items-center gap-4 uppercase italic tracking-tighter">
          <ShieldCheck className="w-7 h-7 text-primary/40" /> Elevate Permissions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a1a1a] group-focus-within:text-primary transition-colors" />
            <input
              type="email"
              placeholder="Designate Administrator Email"
              value={newAdmin.email}
              onChange={e => setNewAdmin({...newAdmin, email: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 pl-14 pr-6 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a1a1a] group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Assign Security Token"
              value={newAdmin.password}
              onChange={e => setNewAdmin({...newAdmin, password: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 pl-14 pr-6 text-[#1a1a1a] text-xs font-mono tracking-widest placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-mono"
            />
          </div>
        </div>
        <button
          onClick={handleAddAdmin}
          className="mt-10 bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-xl shadow-primary/20"
        >
          Authorize Access
        </button>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-[40px] overflow-hidden transition-colors duration-500">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.3em] text-[#1a1a1a] italic border-b border-slate-100">
                <th className="px-10 py-6">ADMINISTRATOR_IDENTITY</th>
                <th className="px-10 py-6">SECURITY_TOKEN</th>
                <th className="px-10 py-6 text-right">PROTOCOL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {admins.map(admin => (
                <tr key={admin.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-8 text-sm font-black text-[#1a1a1a] uppercase tracking-tight italic">{admin.email}</td>
                  <td className="px-10 py-8 text-xs text-[#1a1a1a] font-mono tracking-widest">{admin.password}</td>
                  <td className="px-10 py-8 text-right">
                    <button 
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-white transition-all group-hover:scale-110 shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-10 py-24 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
                      <ShieldCheck className="w-10 h-10 text-slate-200" />
                    </div>
                    <p className="text-[#1a1a1a] text-xs font-black uppercase tracking-widest italic opacity-50">Zero administrative overrides detected.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout role={profile.role} activeTab={activeTab} setActiveTab={setActiveTab} profile={profile}>
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          {activeTab === 'manage-admins' && renderManageAdmins()}
          {activeTab === 'system-settings' && renderSystemSettings()}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
};
