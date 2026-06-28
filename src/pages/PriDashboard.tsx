import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, onSnapshot, collection, addDoc, setDoc, updateDoc, deleteDoc, runTransaction, query, where, getDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfile, Lesson, OnlineClass, StudentRecord, HomeContent, HomePost, HomeVideo, PaperResult, AcademicYear, Recording } from '../types';
import { DashboardLayout } from '../components/Layout';
import { CardMarkTab } from '../components/CardMarkTab';
import { Users, BookOpen, Video, Plus, Trash2, ExternalLink, ShieldCheck, BarChart3, Activity, Trophy, TrendingUp, Microscope, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export const PriDashboard: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [paperResults, setPaperResults] = useState<PaperResult[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [marksFilterYear, setMarksFilterYear] = useState<string>('all');
  const [marksFilterPaper, setMarksFilterPaper] = useState<number | 'all'>('all');
  const [overviewBatchId, setOverviewBatchId] = useState<string>('all');
  const [newPaperResult, setNewPaperResult] = useState({ paperNumber: 1, studentIndex: '', marks: 0, yearId: '' });
  const [newYear, setNewYear] = useState({ year: '' });

  useEffect(() => {
    const unsubYears = onSnapshot(collection(db, 'academicYears'), (snapshot) => {
      setAcademicYears(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AcademicYear)));
    });
    const unsubResults = onSnapshot(collection(db, 'paperResults'), (snapshot) => {
      setPaperResults(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PaperResult)));
    });
    const unsubStudents = onSnapshot(collection(db, 'students'), (snapshot) => {
      setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StudentRecord)));
    });

    return () => {
      unsubYears();
      unsubResults();
      unsubStudents();
    };
  }, []);

  const handleDelete = async (collectionName: string, id: string) => {
    if (!window.confirm("PROTOCOL_WARNING: Data dissolution is irreversible. Confirm?")) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, collectionName);
    }
  };

  const handleAddYear = async () => {
    try {
      if (!newYear.year.trim()) return;
      await addDoc(collection(db, 'academicYears'), { ...newYear, createdAt: serverTimestamp() });
      setNewYear({ year: '' });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'academicYears');
    }
  };

  useEffect(() => {
    if (newPaperResult.studentIndex && students.length > 0) {
      const student = students.find(s => s.studentId === newPaperResult.studentIndex || s.indexNumber === newPaperResult.studentIndex);
      if (student && student.yearId && student.yearId !== newPaperResult.yearId) {
        setNewPaperResult(prev => ({ ...prev, yearId: student.yearId || '' }));
      }
    }
  }, [newPaperResult.studentIndex, students]);

  const handleAddPaperResult = async () => {
    const targetIndex = (newPaperResult.studentIndex || '').trim();
    if (!targetIndex || !newPaperResult.yearId) return;

    // Duplicate check
    const isDuplicate = paperResults.some(r => 
      r.studentIndex === targetIndex && 
      r.paperNumber === newPaperResult.paperNumber && 
      r.yearId === newPaperResult.yearId
    );

    if (isDuplicate) {
      if (!window.confirm("WARNING: A result already exists for this Index and Paper. Duplicate entries might affect rankings. Continue anyway?")) {
        return;
      }
    }

    try {
      const student = students.find(s => 
        (s.studentId && s.studentId.trim() === targetIndex) || 
        (s.indexNumber && s.indexNumber.trim() === targetIndex)
      );
      const resultsForPaper = paperResults.filter(r => r.paperNumber === newPaperResult.paperNumber && r.yearId === newPaperResult.yearId);
      const marks = [...resultsForPaper.map(r => r.marks), newPaperResult.marks].sort((a, b) => b - a);
      const rank = marks.indexOf(newPaperResult.marks) + 1;
      
      const resultData = {
        ...newPaperResult,
        studentIndex: targetIndex,
        marks: Number(newPaperResult.marks),
        uid: student?.uid || null,
        rank,
        createdAt: serverTimestamp()
      };
      
      await addDoc(collection(db, 'paperResults'), resultData);
      setNewPaperResult({ ...newPaperResult, studentIndex: '', marks: 0 });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'paperResults');
    }
  };

  const renderAcademicYears = () => (
    <div className="space-y-12">
      <div className="bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm">
        <h3 className="text-2xl font-black mb-10 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter">
          <Calendar className="w-7 h-7 text-primary/40" /> Manage Batches
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Batch Name</label>
            <input 
              type="text" 
              placeholder="e.g. 2026 / 2027" 
              value={newYear.year} 
              onChange={e => setNewYear({...newYear, year: e.target.value})} 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all" 
            />
          </div>
          <div className="flex items-end">
            <button onClick={handleAddYear} className="w-full bg-primary text-white font-black uppercase italic tracking-[0.2em] py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20">
              CREATE BATCH
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-[40px] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic border-b border-slate-100">
              <th className="px-10 py-6">BATCH_IDENTIFIER</th>
              <th className="px-10 py-6 text-right">PROTOCOLS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {academicYears.sort((a, b) => b.year.localeCompare(a.year)).map(y => (
              <tr key={y.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-10 py-8 text-sm font-black text-slate-900 uppercase tracking-tight italic">{y.year}</td>
                <td className="px-10 py-8 text-right">
                  <button onClick={() => handleDelete('academicYears', y.id)} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group-hover:scale-110 shadow-sm">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOverview = () => {
    const batchResults = overviewBatchId === 'all' ? paperResults : paperResults.filter(r => r.yearId === overviewBatchId);
    const batchPaperNumbers = Array.from(new Set(batchResults.map(r => r.paperNumber)));
    const latestPaperNum = batchPaperNumbers.length > 0 ? Math.max(...(batchPaperNumbers as number[])) : null;
    const latestPaperResults = latestPaperNum !== null ? batchResults.filter(r => r.paperNumber === latestPaperNum).sort((a, b) => b.marks - a.marks) : [];
    const topScorer = latestPaperResults[0];
    const top10 = latestPaperResults.slice(0, 10);

    return (
      <div className="space-y-12 pb-24">
        <div className="bg-white border border-slate-200 p-3 rounded-[30px] shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar max-w-fit mx-auto">
          <button onClick={() => setOverviewBatchId('all')} className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${overviewBatchId === 'all' ? 'bg-primary text-white shadow-lg' : 'bg-transparent text-slate-400 hover:bg-slate-50'}`}>All Analytics</button>
          {academicYears.sort((a, b) => b.year.localeCompare(a.year)).map(y => (
            <button key={y.id} onClick={() => setOverviewBatchId(y.id)} className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${overviewBatchId === y.id ? 'bg-primary text-white shadow-lg' : 'bg-transparent text-slate-400 hover:bg-slate-50'}`}>Batch {y.year}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12 space-y-8">
            <div className="bg-slate-900 rounded-[50px] p-12 text-white relative overflow-hidden group">
               <div className="relative z-10">
                 {topScorer && (
                   <div className="space-y-8">
                      <div>
                        <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] mb-2 italic">Latest Peak Performer (Paper {latestPaperNum})</p>
                        <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none truncate max-w-full">
                           {students.find(s => s.studentId === topScorer.studentIndex)?.name || `INDEX_${topScorer.studentIndex}`}
                        </h2>
                      </div>
                      <div className="flex items-center gap-12">
                         <div><p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">AGGREGATE_MARK</p><p className="text-4xl font-black text-primary italic">%{topScorer.marks}</p></div>
                         <div className="w-[1px] h-12 bg-slate-800" /><div className="flex-1"><p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">INDEX_NUMBER</p><p className="text-4xl font-black text-white font-mono tracking-tighter">{topScorer.studentIndex}</p></div>
                      </div>
                   </div>
                 )}
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMarks = () => {
    const filteredResults = paperResults.filter(res => {
      const yearMatch = marksFilterYear === 'all' || res.yearId === marksFilterYear;
      const paperMatch = marksFilterPaper === 'all' || res.paperNumber === marksFilterPaper;
      return yearMatch && paperMatch;
    }).sort((a,b) => b.marks - a.marks);

    return (
      <div className="space-y-12 pb-20">
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 p-10 rounded-[45px] shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900 border-l-4 border-primary pl-6">Inbound Sequence Registration</h3>
                {newPaperResult.studentIndex && (
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase text-primary italic bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                      Target Identified: {students.find(s => s.studentId === newPaperResult.studentIndex || s.indexNumber === newPaperResult.studentIndex)?.name || 'UNREGISTERED_ENTITY'}
                    </span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                <select value={newPaperResult.yearId} onChange={e => setNewPaperResult({...newPaperResult, yearId: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[10px] font-black uppercase tracking-widest appearance-none cursor-pointer">
                  <option value="">SELECT_BATCH</option>
                  {academicYears.map(y => <option key={y.id} value={y.id}>{y.year} BATCH</option>)}
                </select>
                <input type="number" placeholder="PAPER_NUM" value={newPaperResult.paperNumber} onChange={e => setNewPaperResult({...newPaperResult, paperNumber: parseInt(e.target.value)})} className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[10px] font-black uppercase tracking-widest" />
                <input type="text" placeholder="INDEX_SERIAL" value={newPaperResult.studentIndex} onChange={e => setNewPaperResult({...newPaperResult, studentIndex: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[10px] font-black uppercase tracking-widest" />
                <input type="number" placeholder="MARKS_INT" value={newPaperResult.marks} onChange={e => setNewPaperResult({...newPaperResult, marks: parseInt(e.target.value)})} className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[10px] font-black uppercase tracking-widest" />
              </div>
              <button onClick={handleAddPaperResult} className="mt-8 w-full bg-primary text-white font-black uppercase italic tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-4 hover:scale-[1.01] transition-all shadow-xl shadow-primary/20">DEPLOY_RESULT_NODE</button>
            </div>

            <div className="bg-white border border-slate-200 rounded-[45px] shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-10 border-b border-slate-100">
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900">MARKS_REGISTRY</h3>
                <div className="flex gap-4">
                  <select value={marksFilterYear} onChange={e => setMarksFilterYear(e.target.value)} className="bg-slate-100 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase">
                    <option value="all">ALL BATCHES</option>
                    {academicYears.map(y => <option key={y.id} value={y.id}>{y.year}</option>)}
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic border-b border-slate-100/50">
                      <th className="px-10 py-6">PROTOCOL</th>
                      <th className="px-10 py-6">BATCH_CORE</th>
                      <th className="px-10 py-6">PAPER</th>
                      <th className="px-10 py-6">INDEX_SERIAL</th>
                      <th className="px-10 py-6">NAME_ALIAS</th>
                      <th className="px-10 py-6">AGGREGATE</th>
                      <th className="px-10 py-6 text-right">STANDING</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredResults.map((res) => {
                      const student = students.find(s => s.studentId === res.studentIndex || s.indexNumber === res.studentIndex);
                      return (
                        <tr key={res.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-10 py-8">
                            <button onClick={() => handleDelete('paperResults', res.id)} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group-hover:scale-110 shadow-sm hover:rotate-12">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                          <td className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{academicYears.find(y => y.id === res.yearId)?.year || 'N/A'}</td>
                          <td className="px-10 py-8 text-sm font-black text-slate-900 uppercase tracking-tight italic">PAPER_{res.paperNumber}</td>
                          <td className="px-10 py-8 text-xs text-slate-500 font-mono tracking-widest group-hover:text-primary transition-colors">{res.studentIndex}</td>
                          <td className="px-10 py-8 text-[10px] font-bold text-slate-900 uppercase tracking-wide truncate max-w-[150px]">{student?.name || 'UNKNOWN_NODE'}</td>
                          <td className="px-10 py-8 text-xl font-black text-slate-900 italic tracking-tighter">{res.marks}%</td>
                          <td className="px-10 py-8 text-right"><span className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:bg-primary group-hover:text-white shadow-sm">#{res.rank}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </div>
    );
  };

  return (
    <DashboardLayout role="pri" activeTab={activeTab} setActiveTab={setActiveTab} profile={profile}>
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'batches' && renderAcademicYears()}
          {activeTab === 'marks' && renderMarks()}
          {activeTab === 'cardmark' && <CardMarkTab />}
          {activeTab === 'students' && (
            <div className="bg-white border border-slate-200 rounded-[45px] shadow-sm overflow-hidden p-10">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-10 text-slate-900">Candidate Directory (ReadOnly)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map(s => (
                  <div key={s.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 italic">{academicYears.find(y => y.id === s.yearId)?.year} Batch</p>
                    <p className="text-xs font-black uppercase text-slate-900 mb-1">{s.name}</p>
                    <p className="text-[10px] font-mono text-slate-400">ID: {s.studentId}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
};
