import React, { useState, useEffect, Suspense, lazy } from 'react';
import { db, handleFirestoreError, OperationType, auth, storage } from '../firebase';
import { doc, onSnapshot, collection, query, where, updateDoc, deleteDoc, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { UserProfile, Lesson, OnlineClass, PaperResult, StudentRecord, AcademicYear, Recording, Course, CourseCombo, Payment } from '../types';
import { DashboardLayout } from '../components/Layout';
import { BookOpen, Video, ShieldAlert, BarChart3, Trophy, TrendingUp, Loader2, ShieldCheck, Layers, Play, Calendar, Trash2, Database, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { transformImageUrl, formatDate } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';
import { LessonSkeleton } from '../components/Skeleton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Lazy load VideoPlayer
const VideoPlayer = lazy(() => import('../components/VideoPlayer').then(m => ({ default: m.VideoPlayer })));

export const StudentDashboard: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('study-packs');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [onlineClasses, setOnlineClasses] = useState<OnlineClass[]>([]);
  const [paperResults, setPaperResults] = useState<PaperResult[]>([]);
    const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBookToBuy, setSelectedBookToBuy] = useState<Book | null>(null);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseCombos, setCourseCombos] = useState<CourseCombo[]>([]);
  const [selectedRecordingYear, setSelectedRecordingYear] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isPaid, setIsPaid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [showIdModal, setShowIdModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<StudentRecord | null>(null);
  const [paymentSettings, setPaymentSettings] = useState<any>(null);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);

  useEffect(() => {
    if (studentData) {
      setIsPaid(studentData.payments?.[selectedMonth] || false);
    }
  }, [selectedMonth, studentData]);

  useEffect(() => {
    if (profile?.hasSeenId === false) {
      setShowIdModal(true);
    }
  }, [profile?.hasSeenId]);
  const [paymentForm, setPaymentForm] = useState({ month: '', courseId: '', file: null as File | null, deliveryAddress: '', contactNumber: '' });
  const [myPayments, setMyPayments] = useState<any[]>([]);
  const [isUploadingPayment, setIsUploadingPayment] = useState(false);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  useEffect(() => {
    if (profile?.yearId) {
      setSelectedRecordingYear(profile.yearId);
    }
  }, [profile?.yearId]);

  useEffect(() => {
    if (!profile?.email) return;

    // Check payment status from Firestore
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, where('email', '==', profile.email));
    
    const unsubStatus = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        const docSnap = snap.docs[0];
        const student = { id: docSnap.id, ...docSnap.data() } as StudentRecord;
        setStudentData(student);
        setIsPaid(student?.payments?.[selectedMonth] || false);
      } else {
        setIsPaid(false);
        setStudentData(null);
      }
    }, (err) => handleFirestoreError(err, OperationType.GET, 'students/payment-check'));

    const unsubPayments = onSnapshot(query(collection(db, 'payments'), where('studentId', '==', profile.uid || auth.currentUser?.uid || '')), (snap) => {
      setMyPayments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    
    const unsubLessons = onSnapshot(collection(db, 'lessons'), (snap) => {
      const allLessons = snap.docs.map(d => ({ id: d.id, ...d.data() } as Lesson));
      const studentClasses = profile.class ? profile.class.split(', ').filter(Boolean) : [];
      const filtered = allLessons.filter(l => {
        const hasNoYearRestrictions = (!l.yearIds || l.yearIds.length === 0) && !l.yearId;
        const matchesOldYear = l.yearId === profile.yearId;
        const matchesNewYear = l.yearIds && l.yearIds.includes(profile.yearId || '');
        const matchesYear = hasNoYearRestrictions || matchesOldYear || matchesNewYear;

        const hasNoClassRestrictions = (!l.classTypes || l.classTypes.length === 0) && !l.classType;
        const matchesOldClass = l.classType && studentClasses.includes(l.classType);
        const matchesNewClass = l.classTypes && l.classTypes.some(c => studentClasses.includes(c));
        const matchesClass = hasNoClassRestrictions || matchesOldClass || matchesNewClass;

        return matchesYear && matchesClass;
      });
      setLessons(filtered);
      
      const urlParams = new URLSearchParams(window.location.search);
      const lessonId = urlParams.get('lesson');
      if (lessonId) {
        const lesson = filtered.find(l => l.id === lessonId);
        if (lesson) {
          setSelectedLesson(lesson);
          setSelectedTopic(lesson.topic);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
      
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'lessons');
      setLoading(false);
    });

    const unsubClasses = onSnapshot(collection(db, 'onlineClasses'), (snap) => {
      setOnlineClasses(snap.docs.map(d => ({ id: d.id, ...d.data() } as OnlineClass)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'onlineClasses'));

    const paperResultsRef = collection(db, 'paperResults');
    
    // We query by all possible identifiers to ensure visibility
    const idsToTry = [profile?.studentId, profile?.indexNumber].filter(Boolean) as string[];
    
    // If we have no identifiers, we can't query effectively
    let unsubPaperResults = () => {};
    
    if (idsToTry.length > 0) {
      // Query documents where studentIndex matches any of our IDs
      const paperQuery = query(paperResultsRef, where('studentIndex', 'in', idsToTry));
      
      unsubPaperResults = onSnapshot(paperQuery, (snap) => {
        const results = snap.docs.map(d => ({ id: d.id, ...d.data() } as PaperResult));
        // Sort and set
        setPaperResults(results.filter(r => !r.yearId || r.yearId === profile.yearId).sort((a, b) => (a.paperNumber || 0) - (b.paperNumber || 0)));
      }, (err) => {
        // Fallback to UID query if the index query fails (though rules should permit it)
        const uidQuery = query(paperResultsRef, where('uid', '==', auth.currentUser?.uid));
        onSnapshot(uidQuery, (uidSnap) => {
          const uidResults = uidSnap.docs.map(d => ({ id: d.id, ...d.data() } as PaperResult));
          setPaperResults(uidResults.filter(r => !r.yearId || r.yearId === profile.yearId).sort((a, b) => (a.paperNumber || 0) - (b.paperNumber || 0)));
        }, (uidErr) => handleFirestoreError(uidErr, OperationType.LIST, 'paperResults'));
      });
    } else if (auth.currentUser?.uid) {
       // Only UID fallback if no other IDs available
       const uidQuery = query(paperResultsRef, where('uid', '==', auth.currentUser?.uid));
       unsubPaperResults = onSnapshot(uidQuery, (snap) => {
         const results = snap.docs.map(d => ({ id: d.id, ...d.data() } as PaperResult));
         setPaperResults(results.filter(r => !r.yearId || r.yearId === profile.yearId).sort((a, b) => (a.paperNumber || 0) - (b.paperNumber || 0)));
       }, (err) => handleFirestoreError(err, OperationType.LIST, 'paperResults'));
    }

    const unsubAcademicYears = onSnapshot(collection(db, 'academicYears'), (snap) => {
      setAcademicYears(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as AcademicYear)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'academicYears'));

        const unsubBooks = onSnapshot(collection(db, 'books'), (snap) => {
      setBooks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book)));
    });
    const unsubRecordings = onSnapshot(collection(db, 'recordings'), (snap) => {
      setRecordings(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Recording)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'recordings'));

    const unsubCourses = onSnapshot(collection(db, 'courses'), (snap) => {
      setCourses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course)));
    });

    const unsubCombos = onSnapshot(collection(db, 'courseCombos'), (snap) => {
      setCourseCombos(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as CourseCombo)));
    });

    const unsubPaymentSettings = onSnapshot(doc(db, 'settings', 'payments'), (snap) => {
      if (snap.exists()) setPaymentSettings(snap.data());
    }, (error) => {
      console.error("Error fetching payment settings:", error);
    });

    return () => {
      unsubStatus();
      unsubLessons();
      unsubPayments();
      unsubClasses();
      unsubPaperResults();
      unsubAcademicYears();
      unsubRecordings();
      unsubCourses();
      unsubCombos();
      unsubPaymentSettings();
    };
  }, [profile?.email, profile?.studentId, currentMonth]);

  const handleCloseIdModal = async () => {
    try {
      // Update both users and students documents
      await updateDoc(doc(db, 'users', profile.uid), { hasSeenId: true });
      
      if (studentData) {
        await updateDoc(doc(db, 'students', studentData.id), { hasSeenId: true });
      }
      
      setShowIdModal(false);
    } catch (err) {
      console.error("Error updating hasSeenId:", err);
      setShowIdModal(false);
    }
  };

  const handleWatchLesson = async (lesson: Lesson) => {
    if (!studentData) return;
    setSelectedLesson(lesson);
  };



  if (isPaid === null) {
    return (
      <DashboardLayout role="student" activeTab={activeTab} setActiveTab={setActiveTab} profile={profile}>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
          <div className="w-16 h-16 border-2 border-slate-100 border-t-primary rounded-full animate-spin" />
          <p className="text-slate-300 text-[10px] uppercase font-black tracking-[0.3em] animate-pulse">Initializing Terminal...</p>
        </div>
      </DashboardLayout>
    );
  }

  const renderRecordings = () => {
    if (isPaid === false) {
      return (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[40px] border border-slate-100 shadow-xl">
          <div className="w-24 h-24 bg-red-500/5 rounded-full flex items-center justify-center mb-8 border border-red-500/10">
            <ShieldAlert className="w-10 h-10 text-red-500/30" />
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-tighter uppercase italic text-[#1a1a1a]">{t('dash.student.paymentRequired')}</h2>
          <p className="text-[#1a1a1a] max-w-md text-sm leading-relaxed font-medium">
            {t('dash.student.paymentDesc')}
          </p>
        </div>
      );
    }

    // Strictly filter by student's batch year
    const filteredRecordings = recordings.filter(r => r.yearId === profile.yearId);
    
    // Calendar logic
    const daysInMonth = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const monthRecordings = filteredRecordings.filter(r => {
      const d = new Date(r.publishDate);
      return d.getMonth() === currentCalendarDate.getMonth() && d.getFullYear() === currentCalendarDate.getFullYear();
    });

    return (
      <div className="space-y-12">
        {selectedLesson ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <button 
              onClick={() => setSelectedLesson(null)}
              className="text-[10px] text-[#1a1a1a] hover:text-primary flex items-center gap-3 uppercase font-black tracking-[0.2em] transition-all group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> {t('dash.student.backToRecordings')}
            </button>
            
            <div className="max-w-5xl mx-auto space-y-10">
              <div className="bg-white rounded-[40px] overflow-hidden border border-slate-200 shadow-2xl">
                <Suspense fallback={<div className="aspect-video bg-slate-100 animate-pulse" />}>
                  <VideoPlayer 
                    url={selectedLesson.videoUrl} 
                    type={selectedLesson.videoType} 
                    visibility={selectedLesson.visibility}
                    userEmail={profile.email}
                    isSafeZone={selectedLesson.isSafeZone}
                  />
                </Suspense>
              </div>
              
              <div className="p-12 bg-white border border-slate-100 rounded-[40px] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 pointer-events-none opacity-[0.03]">
                  <Play className="w-32 h-32 text-slate-900" />
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-[8px] font-black uppercase tracking-widest text-primary">
                        Transmission Node
                      </span>
                      <span className="text-[#1a1a1a] text-[10px] font-bold uppercase tracking-widest">
                        {formatDate(selectedLesson.createdAt)}
                      </span>
                    </div>
                    <h2 className="text-4xl font-black text-[#1a1a1a] tracking-tighter uppercase italic">{selectedLesson.topic}</h2>
                    <p className="text-[#1a1a1a] text-lg font-medium">{selectedLesson.subTopic}</p>
                    {selectedLesson.documentUrl && (
                      <a href={selectedLesson.documentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all mt-4 border border-red-100 hover:border-red-500">
                        View Document
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="bg-primary/5 border border-primary/10 px-6 py-3 rounded-2xl">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">
                    {academicYears.find(y => y.id === profile.yearId)?.year || 'MY_BATCH'} RELEASES
                  </p>
                </div>
              </div>

              {/* View Mode Toggle */}
            <div className="bg-white border border-slate-200 p-2 rounded-2xl flex gap-1 shadow-sm shrink-0">
               <button 
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-slate-50'}`}
               >
                 <Layers className="w-4 h-4" />
               </button>
               <button 
                onClick={() => setViewMode('calendar')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'calendar' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-slate-50'}`}
               >
                 <Calendar className="w-4 h-4" />
               </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredRecordings.sort((a, b) => b.publishDate.localeCompare(a.publishDate)).map(rec => (
                <motion.div
                  layoutId={rec.id}
                  key={rec.id}
                  onClick={() => setSelectedLesson({ id: rec.id, topic: rec.title, subTopic: 'Past Session Recording', videoUrl: rec.videoUrl, videoType: 'youtube', visibility: rec.visibility, createdAt: rec.createdAt, isSafeZone: rec.isSafeZone } as Lesson)}
                  className="bg-white border border-slate-200 rounded-[24px] md:rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 group shadow-sm hover:border-primary/20 hover:shadow-2xl hover:-translate-y-2 relative"
                >
                  <div className="p-6 md:p-8">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-primary/10 group-hover:scale-110 transition-transform duration-500">
                      <Play className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    
                    <h4 className="text-xl md:text-2xl font-black text-[#1a1a1a] uppercase italic tracking-tighter mb-2 group-hover:text-primary transition-colors">{rec.title}</h4>
                    <div className="flex flex-wrap gap-2 mb-8">
                      <span className="px-3 py-1 bg-slate-50 text-[#1a1a1a] text-[8px] font-black uppercase tracking-widest rounded-lg border border-slate-100 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {rec.publishDate}
                      </span>
                      <span className={`px-3 py-1 text-white text-[8px] font-black uppercase tracking-widest rounded-lg ${rec.visibility === 'private' ? 'bg-red-500' : 'bg-[#1a1a1a]'}`}>
                        {rec.visibility}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                       <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Enter Terminal &rarr;</span>
                       <Layers className="w-4 h-4 text-slate-100" />
                    </div>
                  </div>
                </motion.div>
              ))}
              {filteredRecordings.length === 0 && (
                <div className="md:col-span-3 py-24 flex flex-col items-center">
                   <Layers className="w-20 h-20 text-slate-100 mb-8" />
                   <p className="text-slate-300 font-black uppercase tracking-widest text-[10px]">{t('dash.student.noRecordings')}</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="calendar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white border border-slate-200 p-4 md:p-12 rounded-[30px] md:rounded-[50px] shadow-sm overflow-hidden"
            >
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12">
                  <h4 className="text-xl md:text-2xl font-black text-slate-900 uppercase italic tracking-tighter">
                    {currentCalendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h4>
                  <div className="flex gap-2">
                     <button 
                      onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1)))}
                      className="flex-1 md:flex-none p-3 bg-slate-50 border border-slate-200 rounded-xl hover:text-primary transition-all"
                     >
                       <span className="text-sm font-black">&larr;</span>
                     </button>
                     <button 
                      onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1)))}
                      className="flex-1 md:flex-none p-3 bg-slate-50 border border-slate-200 rounded-xl hover:text-primary transition-all"
                     >
                       <span className="text-sm font-black">&rarr;</span>
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-7 gap-1 md:gap-4">
                 {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                   <div key={day} className="text-center font-black text-[8px] md:text-[10px] text-slate-400 uppercase tracking-widest py-2 md:py-4 border-b border-slate-50 mb-2 md:mb-4">{day}</div>
                 ))}
                 {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                   <div key={`empty-${i}`} className="p-4 md:p-10" />
                 ))}
                 {days.map(day => {
                   const dateStr = `${currentCalendarDate.getFullYear()}-${String(currentCalendarDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                   const dayRecordings = monthRecordings.filter(r => r.publishDate === dateStr);
                   const isToday = new Date().toISOString().split('T')[0] === dateStr;

                   return (
                     <div 
                      key={day} 
                      className={`min-h-[100px] p-2 md:p-4 border rounded-3xl transition-all relative group ${isToday ? 'border-primary/40 bg-primary/[0.02]' : 'border-slate-50 hover:border-slate-200 font-medium'}`}
                     >
                        <span className={`text-sm font-black italic tracking-tighter ${dayRecordings.length > 0 ? 'text-primary' : 'text-slate-300'}`}>{day}</span>
                        
                        <div className="mt-2 space-y-1">
                          {dayRecordings.map(rec => (
                            <button
                              key={rec.id}
                              onClick={() => setSelectedLesson({ id: rec.id, topic: rec.title, subTopic: 'Past Session Recording', videoUrl: rec.videoUrl, videoType: 'youtube', visibility: rec.visibility, createdAt: rec.createdAt, isSafeZone: rec.isSafeZone } as Lesson)}
                              className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white p-2 rounded-xl text-[8px] font-black uppercase tracking-tight text-left transition-all truncate"
                              title={rec.title}
                            >
                              {rec.title}
                            </button>
                          ))}
                        </div>
                     </div>
                   );
                 })}
               </div>
            </motion.div>
          )}
          </AnimatePresence>
          </>
        )}
      </div>
    );
  };

  const handleAddCourse = async (courseName: string) => {
    if (!profile?.email || !studentData || isAddingCourse) return;
    setIsAddingCourse(true);
    try {
      const studentsRef = collection(db, 'students');
      const q = query(studentsRef, where('email', '==', profile.email));
      const snap = await getDocs(q);
      
      if (!snap.empty) {
        const docRef = snap.docs[0].ref;
        const currentClassStr = studentData.class || '';
        // Check if already has it (case insensitive)
        const currentClasses = currentClassStr.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
        if (currentClasses.includes(courseName.toLowerCase().trim())) {
           alert("Already enrolled in this class.");
           setIsAddingCourse(false);
           return;
        }
        
        const newClassStr = currentClassStr ? `${currentClassStr}, ${courseName}` : courseName;
        await updateDoc(docRef, { class: newClassStr });
        
        // Also update users collection if role is student
        const userRef = doc(db, 'users', profile.uid);
        await updateDoc(userRef, { class: newClassStr });
        
        alert(`Successfully enrolled in ${courseName}!`);
      }
    } catch (err: any) {
      console.error(err);
      alert("Failed to enroll in the class. Please try again.");
    } finally {
      setIsAddingCourse(false);
    }
  };

  const handleRemoveCourse = async (courseName: string) => {
    if (!profile?.email || !studentData || isAddingCourse) return;
    if (!window.confirm(`Are you sure you want to remove ${courseName}?`)) return;
    setIsAddingCourse(true);
    try {
      const studentsRef = collection(db, 'students');
      const q = query(studentsRef, where('email', '==', profile.email));
      const snap = await getDocs(q);
      
      if (!snap.empty) {
        const docRef = snap.docs[0].ref;
        const currentClassStr = studentData.class || '';
        const currentClasses = currentClassStr.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
        const newClasses = currentClasses.filter(c => c !== courseName.toLowerCase().trim());
        
        const finalClasses = courses.filter(c => newClasses.includes(c.name.toLowerCase().trim())).map(c => c.name);
        
        await updateDoc(docRef, { class: finalClasses.join(', ') });
        const userRef = doc(db, 'users', profile.uid);
        await updateDoc(userRef, { class: finalClasses.join(', ') });
      }
    } catch (err: any) {
      console.error(err);
      alert('Error removing course.');
    } finally {
      setIsAddingCourse(false);
    }
  };

  const renderPayments = () => {
    let totalFee = 0;
    const selectedClassNames = studentData?.class ? studentData.class.toLowerCase().split(',').map((s: string) => s.trim()).filter(Boolean) : [];
    const enrolledIds = courses
      .filter(c => c.yearId === studentData?.yearId && selectedClassNames.includes(c.name.toLowerCase().trim()))
      .map(c => c.id);
      
    const availableCourses = courses.filter(c => c.yearId === studentData?.yearId && !selectedClassNames.includes(c.name.toLowerCase().trim()));
    
    let bestCombo: CourseCombo | null = null;
    let maxCovered = 0;

    courseCombos.filter(c => c.yearId === studentData?.yearId).forEach(combo => {
      const isCovered = combo.courseIds.every(id => enrolledIds.includes(id));
      if (isCovered && combo.courseIds.length > maxCovered) {
        maxCovered = combo.courseIds.length;
        bestCombo = combo;
      }
    });

    if (bestCombo) {
      totalFee += bestCombo.comboFee;
      enrolledIds.forEach(id => {
        if (!bestCombo!.courseIds.includes(id)) {
          const course = courses.find(c => c.id === id);
          if (course) totalFee += course.fee;
        }
      });
    } else {
      enrolledIds.forEach(id => {
        const course = courses.find(c => c.id === id);
        if (course) totalFee += course.fee;
      });
    }

    return (
      
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-64 overflow-y-auto">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-4 sticky top-0 bg-white pb-2 flex items-center justify-between border-b border-slate-100">
              Class Payments History
              <Calendar className="w-4 h-4 text-primary" />
            </h4>
            <div className="space-y-3">
              {myPayments.filter(p => p.paymentType !== 'book').length === 0 && (
                <p className="text-xs text-slate-400 font-medium italic text-center mt-8">No class payments found.</p>
              )}
              {myPayments.filter(p => p.paymentType !== 'book').sort((a,b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()).map(p => (
                <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-slate-700">{p.month}</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">Rs. {p.amount}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${p.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-64 overflow-y-auto">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-4 sticky top-0 bg-white pb-2 flex items-center justify-between border-b border-slate-100">
              Book Orders History
              <BookOpen className="w-4 h-4 text-primary" />
            </h4>
            <div className="space-y-3">
              {myPayments.filter(p => p.paymentType === 'book').length === 0 && (
                <p className="text-xs text-slate-400 font-medium italic text-center mt-8">No book orders found.</p>
              )}
              {myPayments.filter(p => p.paymentType === 'book').sort((a,b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()).map(p => (
                <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <div className="max-w-[150px]">
                    <p className="text-xs font-bold text-slate-700 truncate" title={p.bookTitle}>{p.bookTitle}</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">Rs. {p.amount}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${p.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {p.status}
                    </span>
                    {p.status === 'approved' && (
                       <span className="text-[9px] text-green-600 font-bold uppercase italic">Will be delivered soon</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedBookToBuy ? (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-primary/5 p-6 md:p-8 rounded-[32px] border border-primary/20 shadow-sm gap-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:w-2 transition-all" />
            <div className="pl-4">
              <h3 className="text-xl font-black uppercase tracking-widest text-primary flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                Book Order: {selectedBookToBuy.title}
              </h3>
              <p className="text-sm text-slate-600 font-medium mt-1">Price: Rs. {selectedBookToBuy.price}</p>
            </div>
            <button 
              onClick={() => setSelectedBookToBuy(null)} 
              className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-600 rounded-xl font-black uppercase tracking-widest text-xs transition-colors shadow-sm border border-slate-200"
            >
              Cancel Order
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 md:p-8 rounded-[32px] border border-slate-200 shadow-sm gap-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:w-2 transition-all" />
            <div className="pl-4">
              <h3 className="text-xl font-black uppercase tracking-widest text-slate-800 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-primary" />
                Select Payment Month
              </h3>
              <p className="text-sm text-slate-500 font-medium mt-1">Choose the month you are viewing or paying for</p>
            </div>
            <input 
              type="month" 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-6 py-4 border-2 border-slate-200 rounded-2xl font-black text-slate-700 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg w-full md:w-auto"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[40px] shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black mb-2 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter">
                <Database className="w-7 h-7 text-primary" />
                Payment Summary
              </h3>
              <p className="text-sm text-slate-500 mb-8 font-medium">Your currently enrolled classes and monthly fee.</p>

              {!selectedBookToBuy && (
              <div className="space-y-4 mb-8">
                {enrolledIds.map(id => {
                  const course = courses.find(c => c.id === id);
                  const isPaidCourse = studentData?.coursePayments?.[id]?.[selectedMonth];
                  return course ? (
                    <div key={id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div>
                        <p className="font-bold text-slate-800">{course.name}</p>
                        <p className="text-xs font-medium text-slate-500">Rs. {course.fee}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${isPaidCourse ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {isPaidCourse ? 'Paid' : 'Pending'}
                        </div>
                        {!isPaidCourse && (
                          <button 
                            onClick={() => handleRemoveCourse(course.name)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            title="Remove Class"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : null;
                })}
                {enrolledIds.length === 0 && (
                  <p className="text-sm text-slate-400 italic text-center py-4">No classes enrolled.</p>
                )}
              </div>
              )}

              {!selectedBookToBuy && availableCourses.length > 0 && (
                <div className="mt-8 border-t border-slate-200 pt-8 mb-8">
                  <h4 className="text-sm font-black mb-4 text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Available Classes
                  </h4>
                  <div className="space-y-3">
                    {availableCourses.map(course => (
                      <div key={course.id} className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded-xl hover:border-primary/30 transition-colors">
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{course.name}</p>
                          <p className="text-xs font-medium text-slate-500">Rs. {course.fee}</p>
                        </div>
                        <button 
                          onClick={() => handleAddCourse(course.name)}
                          disabled={isAddingCourse}
                          className="px-4 py-2 bg-slate-900 text-white hover:bg-primary hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                        >
                          Enroll Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-3xl">
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-2">
                {selectedBookToBuy ? 'Book Price' : 'Total Monthly Fee'}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-primary">Rs.</span>
                <span className="text-5xl font-black italic tracking-tighter">
                  {selectedBookToBuy ? selectedBookToBuy.price : totalFee}
                </span>
              </div>
              {!selectedBookToBuy && bestCombo && (
                <p className="text-xs font-bold text-accent mt-2 inline-block bg-accent/20 px-3 py-1 rounded-full">
                  Combo Applied: {bestCombo.name}
                </p>
              )}
            </div>
          </div>

          {isPaid && !selectedBookToBuy ? (
            <div className="bg-white border-2 border-green-100 p-8 md:p-12 rounded-[40px] shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[500px]">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
              
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-32 h-32 bg-green-100 rounded-[32px] rotate-3 flex items-center justify-center mb-10 shadow-lg shadow-green-100/50 relative z-10"
              >
                <CheckCircle2 className="w-16 h-16 text-green-600 -rotate-3" />
              </motion.div>
              
              <h3 className="text-4xl font-black mb-6 text-green-800 uppercase italic tracking-tighter relative z-10">
                Payment Successful!
              </h3>
              
              <p className="text-xl text-green-700 font-bold leading-relaxed max-w-md relative z-10">
                ඔබ <span className="text-2xl font-black bg-green-200/50 px-3 py-1 rounded-xl mx-2">{selectedMonth}</span> මාසය සඳහා මුදල් සාර්ථකව ගෙවා ඇත. 
        <br/><br/>
                <span className="text-base text-green-600/80">ඔබට දැන් පන්ති වලට සහභාගී විය හැක!</span>
              </p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[40px] shadow-sm">
               <h3 className="text-xl font-black mb-6 text-slate-900 uppercase italic tracking-tighter">Upload Bank Slip</h3>
               <p className="text-sm text-slate-600 mb-6 font-medium leading-relaxed">
                 Please pay your monthly fee and upload the bank slip using the form below. The admin will verify and grant you access to the Study Packs.
               </p>
               <div className="w-full h-auto min-h-[600px] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 overflow-hidden flex flex-col items-center justify-center relative">
                {!isUploadingPayment ? (
                  <div className="w-full h-full flex flex-col p-8 bg-white space-y-6">
                    <div className="bg-slate-100 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        {selectedBookToBuy ? (
                           <div>
                             <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Order Details</p>
                             <p className="font-bold text-slate-900 text-sm mt-1">{selectedBookToBuy.title}</p>
                           </div>
                        ) : (
                           <div>
                             <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Payment Month</p>
                             <p className="font-bold text-slate-900 text-sm mt-1">{selectedMonth}</p>
                           </div>
                        )}
                       <div className="md:text-right">
                          <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Enrolled Classes</p>
                          <p className="font-bold text-slate-900 text-sm mt-1">
                             {enrolledIds.length > 0 ? enrolledIds.map(id => courses.find(c => c.id === id)?.name || id).join(', ') : 'No classes enrolled'}
                          </p>
                       </div>
                    </div>

                    <div className="space-y-2 flex-grow">
                      <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-widest px-1 italic">Bank Slip Image</label>
                      <div className="w-full h-32 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center relative bg-slate-50 overflow-hidden group">
                        {paymentForm.file ? (
                          <img src={URL.createObjectURL(paymentForm.file)} alt="Slip" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Database className="w-8 h-8 text-slate-300 mb-2 group-hover:text-primary transition-colors" />
                            <span className="text-xs text-slate-400 font-bold px-4 text-center">Click or Drag to Upload Slip</span>
                          </>
                        )}
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              setPaymentForm({...paymentForm, file: e.target.files[0]});
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>

                      {selectedBookToBuy && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Delivery Address</label>
                            <input 
                              type="text" 
                              value={paymentForm.deliveryAddress}
                              onChange={(e) => setPaymentForm({...paymentForm, deliveryAddress: e.target.value})}
                              placeholder="Full delivery address"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-primary/50 transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Contact Number</label>
                            <input 
                              type="text" 
                              value={paymentForm.contactNumber}
                              onChange={(e) => setPaymentForm({...paymentForm, contactNumber: e.target.value})}
                              placeholder="Phone number"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-primary/50 transition-colors"
                            />
                          </div>
                        </div>
                      )}

                    <button 
                      onClick={async () => {
                        if (!paymentForm.file) {
                          alert("Please upload a slip.");
                          return;
                        }
                        if (!selectedBookToBuy && enrolledIds.length === 0) {
                          alert("You are not enrolled in any courses.");
                          return;
                        }
                        if (selectedBookToBuy && (!paymentForm.deliveryAddress || !paymentForm.contactNumber)) {
                          alert("Please provide both delivery address and contact number.");
                          return;
                        }
                        setIsUploadingPayment(true);
                        try {
                          const imageBitmap = await createImageBitmap(paymentForm.file);
                          const canvas = document.createElement('canvas');
                          let width = imageBitmap.width;
                          let height = imageBitmap.height;
                          const MAX_DIM = 800;
                          if (width > height && width > MAX_DIM) {
                            height *= MAX_DIM / width;
                            width = MAX_DIM;
                          } else if (height > MAX_DIM) {
                            width *= MAX_DIM / height;
                            height = MAX_DIM;
                          }
                          canvas.width = width;
                          canvas.height = height;
                          const ctx = canvas.getContext('2d');
                          ctx?.drawImage(imageBitmap, 0, 0, width, height);
                          
                          const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.6));
                          if (!blob) throw new Error("Compression failed");
                          
                          const reader = new FileReader();
                          reader.readAsDataURL(blob);
                          const base64data = await new Promise<string>((resolve) => {
                            reader.onloadend = () => resolve(reader.result as string);
                          });

                          const scriptUrl = 'https://script.google.com/macros/s/AKfycbyogWoZRxK57ROMJ3OZHn8bLFm1_t3LKDe6ZMAloyKA-ZHm3oWU-2DyxZNHt_cbPhFQmg/exec';
                          const res = await fetch(scriptUrl, {
                            method: 'POST',
                            body: JSON.stringify({
                              file: base64data,
                              mimeType: 'image/jpeg',
                              fileName: `slip_${auth.currentUser?.uid}_${Date.now()}.jpg`
                            }),
                            headers: {
                              'Content-Type': 'text/plain;charset=utf-8',
                            }
                          });
                          
                          const resData = await res.json();
                          if (!resData.success) throw new Error(resData.error || "Upload failed via Drive");
                          const downloadUrl = resData.url;
                          
                          const paymentData = {
                            studentId: auth.currentUser?.uid || profile?.uid || '',
                            studentName: profile?.name || studentData?.name || '',
                            studentIndex: studentData?.studentId || profile?.studentId || '',
                            yearId: studentData?.yearId || '',
                            class: studentData?.class || '',
                            amount: selectedBookToBuy ? selectedBookToBuy.price : (paymentForm.courseId ? (courses.find(c => c.id === paymentForm.courseId)?.fee || 0) : totalFee),
                            month: selectedBookToBuy ? 'Book Order' : selectedMonth,
                            courseId: selectedBookToBuy ? 'book' : (paymentForm.courseId || 'all'),
                            paymentType: selectedBookToBuy ? 'book' : 'class',
                            bookId: selectedBookToBuy ? selectedBookToBuy.id : '',
                            bookTitle: selectedBookToBuy ? selectedBookToBuy.title : '',
                            deliveryAddress: selectedBookToBuy ? paymentForm.deliveryAddress : '',
                            contactNumber: selectedBookToBuy ? paymentForm.contactNumber : '',
                            slipUrl: downloadUrl,
                            status: 'pending',
                            createdAt: serverTimestamp() as any
                          };
                          
                          await addDoc(collection(db, 'payments'), paymentData);
                          
                          alert("Payment slip submitted successfully! Admin will verify and approve it soon.");
                          setPaymentForm({ month: '', courseId: '', file: null, deliveryAddress: '', contactNumber: '' });
                          setSelectedBookToBuy(null);
                        } catch (err: any) {
                          console.error(err);
                          alert("Failed to submit payment. " + err.message);
                        } finally {
                          setIsUploadingPayment(false);
                        }
                      }}
                      className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl"
                    >
                      SUBMIT PAYMENT SLIP
                    </button>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-8 text-center">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                    <p className="text-slate-800 font-bold mb-2">Uploading Payment Slip...</p>
                    <p className="text-xs text-slate-500">Please wait while your slip is securely uploaded.</p>
                  </div>
                )}
             </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStudyPacks = () => {
    const groupedLessons = lessons.reduce((acc, lesson) => {
      if (!acc[lesson.topic]) acc[lesson.topic] = [];
      acc[lesson.topic].push(lesson);
      return acc;
    }, {} as Record<string, Lesson[]>);

    // Sort videos inside each topic by the `order` field
    Object.keys(groupedLessons).forEach(topic => {
      groupedLessons[topic].sort((a, b) => (a.order || 0) - (b.order || 0));
    });

    const sortedTopics = Object.keys(groupedLessons).sort();

    const getTopicGradient = (topic: string) => {
      const gradients = [
        'from-blue-600 to-cyan-500',
        'from-purple-600 to-pink-500',
        'from-orange-500 to-amber-400',
        'from-emerald-600 to-teal-400',
        'from-rose-600 to-red-500',
        'from-indigo-600 to-blue-500',
        'from-amber-600 to-orange-500',
        'from-fuchsia-600 to-purple-500'
      ];
      let hash = 0;
      for (let i = 0; i < topic.length; i++) {
        hash = topic.charCodeAt(i) + ((hash << 5) - hash);
      }
      return gradients[Math.abs(hash) % gradients.length];
    };

    return (
      <div className="space-y-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <LessonSkeleton key={i} />)}
          </div>
        ) : selectedLesson ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            {isPaid === false && !(paymentSettings?.freeTopics || []).includes(selectedTopic) ? (
              <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[40px] border border-slate-100 shadow-xl">
                <div className="w-24 h-24 bg-red-500/5 rounded-full flex items-center justify-center mb-8 border border-red-500/10">
                  <ShieldAlert className="w-10 h-10 text-red-500/30" />
                </div>
                <h2 className="text-3xl font-black mb-4 tracking-tighter uppercase italic text-[#1a1a1a]">{t('dash.student.paymentRequired')}</h2>
                <p className="text-[#1a1a1a] max-w-md text-sm leading-relaxed font-medium">
                  {t('dash.student.paymentDesc')}
                </p>
                <button 
                  onClick={() => setSelectedLesson(null)}
                  className="mt-8 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all text-sm uppercase tracking-widest"
                >
                  Back to Lessons
                </button>
              </div>
            ) : (
              <>
            <button 
              onClick={() => setSelectedLesson(null)}
              className="text-[10px] text-slate-400 hover:text-primary flex items-center gap-3 uppercase font-black tracking-[0.2em] transition-all group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> {t('dash.student.backToLessons')}
            </button>
            
            <div className="max-w-5xl mx-auto space-y-10">
              <div className="bg-white rounded-[40px] overflow-hidden border border-slate-200 shadow-2xl transition-colors duration-500">
                <Suspense fallback={<div className="aspect-video bg-slate-100 animate-pulse" />}>
                  <VideoPlayer 
                    url={selectedLesson.videoUrl} 
                    type={selectedLesson.videoType} 
                    visibility={selectedLesson.visibility}
                    userEmail={profile.email}
                    isSafeZone={selectedLesson.isSafeZone}
                  />
                </Suspense>
              </div>
              
              <div className="p-6 md:p-12 bg-white border border-slate-100 rounded-[30px] md:rounded-[40px] shadow-xl relative overflow-hidden transition-colors duration-500">
                <div className="absolute top-0 right-0 p-6 md:p-12 pointer-events-none opacity-[0.03]">
                  <Video className="w-24 h-24 md:w-32 md:h-32 text-[#1a1a1a]" />
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8 relative z-10">
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-[7px] md:text-[8px] font-black uppercase tracking-widest text-primary">
                        {selectedLesson.videoType}
                      </span>
                      <span className="text-[#1a1a1a] text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                        {formatDate(selectedLesson.createdAt)}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] tracking-tighter uppercase italic leading-none">{selectedLesson.topic}</h2>
                    <p className="text-[#1a1a1a] text-base md:text-lg font-medium">{selectedLesson.subTopic}</p>
                    {selectedLesson.documentUrl && (
                      <a href={selectedLesson.documentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all mt-4 border border-red-100 hover:border-red-500">
                        View Document
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
              </>
            )}
          </motion.div>
        ) : selectedTopic ? (
          <div className="space-y-10">
            <button 
              onClick={() => setSelectedTopic(null)}
              className="text-[10px] text-slate-400 hover:text-primary flex items-center gap-3 uppercase font-black tracking-[0.2em] transition-all group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Study Packs
            </button>

            <div className={`bg-gradient-to-r ${getTopicGradient(selectedTopic)} p-8 md:p-12 rounded-[40px] shadow-lg relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic mb-4">{selectedTopic}</h2>
                <p className="text-white/80 text-[10px] uppercase font-black tracking-[0.2em] bg-black/30 inline-block px-4 py-2 rounded-xl backdrop-blur-md">{groupedLessons[selectedTopic]?.length || 0} Lessons available</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {groupedLessons[selectedTopic]?.map(lesson => (
                  <motion.div 
                    key={lesson.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`bg-white border border-slate-100 rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300 flex flex-col md:flex-row group hover:shadow-lg hover:border-primary/20`}
                  >
                    <div className="w-full md:w-56 lg:w-72 aspect-video shrink-0 overflow-hidden relative">
                      {lesson.thumbnailUrl || lesson.imageUrl ? (
                        <img 
                          src={transformImageUrl(lesson.thumbnailUrl || lesson.imageUrl || '')} 
                          alt={lesson.topic} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${getTopicGradient(lesson.topic)} flex flex-col items-center justify-center p-4 text-center`}>
                          <BookOpen className="w-6 h-6 text-white/50 mb-2" />
                          <span className="text-white font-black italic tracking-tight text-sm line-clamp-2 leading-tight drop-shadow-md">{lesson.subTopic}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                      <h4 className="text-lg md:text-xl font-black text-[#1a1a1a] uppercase italic tracking-tight mb-2 group-hover:text-primary transition-colors">{lesson.subTopic}</h4>
                      <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">{formatDate(lesson.createdAt)}</p>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTopics.map(topic => {
              const packLessons = groupedLessons[topic];
              const firstLesson = packLessons[0];
              
              const isTopicFree = (paymentSettings?.freeTopics || []).includes(topic);
              return (
                <motion.div
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className="bg-white border border-slate-100 rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 group shadow-sm hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:-translate-y-1 relative"
                >
                  <div className="aspect-video w-full overflow-hidden relative">
                    {firstLesson.imageUrl || firstLesson.thumbnailUrl ? (
                      <img 
                        src={transformImageUrl(firstLesson.imageUrl || firstLesson.thumbnailUrl || '')} 
                        alt={topic} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getTopicGradient(topic)} flex flex-col items-center justify-center p-6 text-center`}>
                        <Layers className="w-12 h-12 text-white/20 mb-4" />
                        <span className="text-white font-black italic tracking-tight text-2xl line-clamp-2 leading-tight drop-shadow-md">{topic}</span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-white/60 backdrop-blur-md border border-slate-200 text-slate-900 text-[8px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                        {packLessons.length} Modules
                      </span>
                    </div>
                    {isTopicFree && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> FREE
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <h4 className="text-2xl font-black text-[#1a1a1a] uppercase italic tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">{topic}</h4>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderLive = () => {
    if (isPaid === false) {
      return (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[40px] border border-slate-100 shadow-xl">
          <div className="w-24 h-24 bg-red-500/5 rounded-full flex items-center justify-center mb-8 border border-red-500/10">
            <ShieldAlert className="w-10 h-10 text-red-500/30" />
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-tighter uppercase italic text-[#1a1a1a]">{t('dash.student.paymentRequired')}</h2>
          <p className="text-[#1a1a1a] max-w-md text-sm leading-relaxed font-medium">
            {t('dash.student.paymentDesc')}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {onlineClasses
          .filter(cls => {
            const clsData = cls as any;
            const hasYear = !clsData.yearIds || clsData.yearIds.length === 0 || clsData.yearIds.includes(profile.yearId);
            const hasClass = !clsData.classTypes || clsData.classTypes.length === 0 || clsData.classTypes.includes(profile.class);
            return hasYear && hasClass;
          })
          .map(cls => {
          if ((cls as any).description) {
            return (
              <div key={cls.id} className="col-span-full bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 rounded-l-[40px]" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                      <Video className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{cls.title}</h4>
                      <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black">{cls.type} MEETING ANNOUNCEMENT</p>
                    </div>
                  </div>
                  <a
                    href={cls.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-10 py-5 bg-blue-500 hover:bg-blue-600 text-white font-black uppercase italic tracking-[0.2em] rounded-2xl transition-all shadow-[0_15px_40px_rgba(59,130,246,0.3)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.4)] hover:-translate-y-1 flex items-center justify-center gap-3 whitespace-nowrap"
                  >
                    Join Zoom Meeting <span className="text-lg">&rarr;</span>
                  </a>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mb-4">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 font-medium leading-relaxed">
                    {(cls as any).description}
                  </pre>
                </div>
              </div>
            );
          }

          return (
            <div key={cls.id} className="bg-white p-10 rounded-[40px] flex items-center justify-between border border-slate-100 group hover:border-primary/20 transition-all duration-500 shadow-sm text-[#1a1a1a]">
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center border border-primary/10 relative">
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
                  <Video className="w-10 h-10 text-primary/30 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] text-[#1a1a1a] uppercase tracking-[0.3em] font-black mb-1">{cls.type}</p>
                  <h4 className="text-2xl font-black uppercase italic tracking-tight">{cls.title}</h4>
                </div>
              </div>
              <a
                href={cls.link}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-primary text-white font-black uppercase italic tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-[0_10px_30px_rgba(22,163,74,0.2)] flex items-center gap-3"
              >
                Join <span className="text-xs">&rarr;</span>
              </a>
            </div>
          );
        })}
        {onlineClasses.filter(cls => {
            const clsData = cls as any;
            const hasYear = !clsData.yearIds || clsData.yearIds.length === 0 || clsData.yearIds.includes(profile.yearId);
            const hasClass = !clsData.classTypes || clsData.classTypes.length === 0 || clsData.classTypes.includes(profile.class);
            return hasYear && hasClass;
          }).length === 0 && (
          <div className="col-span-full py-24 text-center bg-white border border-slate-100 border-dashed rounded-[40px] flex flex-col items-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100">
              <Video className="w-12 h-12 text-slate-200" />
            </div>
            <p className="text-slate-300 text-sm uppercase font-black tracking-widest">{t('dash.student.noLive')}</p>
          </div>
        )}
      </div>
    </div>
    );
  };

  const handleDeleteResult = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this result?")) return;
    try {
      await deleteDoc(doc(db, 'paperResults', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `paperResults/${id}`);
    }
  };

  
  const renderBookStore = () => (
    <div className="space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900">
          Book <span className="text-primary">Store</span>
        </h2>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
          Order academic materials directly to your class
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book.id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
            <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden shrink-0">
              {book.imageUrl ? (
                <img src={transformImageUrl(book.imageUrl)} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <BookOpen className="w-12 h-12 opacity-50" />
                </div>
              )}
              {book.videoUrl && (
                <a href={book.videoUrl} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-600 hover:scale-110 transition-transform shadow-lg">
                  <Play className="w-5 h-5 fill-current" />
                </a>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="text-white font-black uppercase tracking-wider text-lg truncate">{book.title}</h4>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <p className="text-sm text-slate-500 font-medium mb-6 flex-grow">{book.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Price</p>
                  <p className="text-xl font-black text-slate-900">Rs. {book.price}</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedBookToBuy(book);
                    setActiveTab('payments');
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
        {books.length === 0 && (
          <div className="col-span-full p-12 text-center border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-medium">
            No books available at the moment.
          </div>
        )}
      </div>
    </div>
  );

  const renderMarks = () => {
    const chartData = [...paperResults]
      .sort((a, b) => a.paperNumber - b.paperNumber)
      .map(res => ({
        name: `P${res.paperNumber}`,
        marks: res.marks,
        rank: res.rank
      }));

    const latestResult = paperResults[paperResults.length - 1];

    return (
      <div className="space-y-12">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="glass p-6 md:p-10 rounded-[32px] relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 bg-white">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 border border-primary/10">
              <BarChart3 className="w-6 h-6 md:w-7 md:h-7 text-primary/40" />
            </div>
            <p className="text-[#1a1a1a] text-[8px] md:text-[10px] uppercase font-black tracking-widest mb-1">Performance</p>
            <h3 className="text-4xl md:text-5xl font-black text-[#1a1a1a] italic tracking-tighter">{latestResult?.marks || 0}<span className="text-xl md:text-2xl font-bold opacity-30">%</span></h3>
          </div>
          
          <div className="glass p-6 md:p-10 rounded-[32px] relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 bg-white">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 border border-primary/10">
              <Trophy className="w-6 h-6 md:w-7 md:h-7 text-primary/40" />
            </div>
            <p className="text-[#1a1a1a] text-[8px] md:text-[10px] uppercase font-black tracking-widest mb-1">Standings</p>
            <h3 className="text-4xl md:text-5xl font-black text-[#1a1a1a] italic tracking-tighter"><span className="text-xl md:text-2xl font-bold opacity-30 mr-1">#</span>{latestResult?.rank || '-'}</h3>
          </div>

          <div className="glass p-6 md:p-10 rounded-[32px] relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 bg-white">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 border border-primary/10">
              <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-primary/40" />
            </div>
            <p className="text-[#1a1a1a] text-[8px] md:text-[10px] uppercase font-black tracking-widest mb-1">Total Exams</p>
            <h3 className="text-4xl md:text-5xl font-black text-[#1a1a1a] italic tracking-tighter">{paperResults.length}</h3>
          </div>
        </div>

        {/* Progress Chart */}
        {paperResults.length > 0 ? (
          <div className="bg-white border border-slate-100 p-6 md:p-12 rounded-[40px] shadow-xl">
            <h3 className="text-xl md:text-2xl font-black mb-8 md:mb-12 flex items-center gap-4 uppercase italic tracking-tighter">
               {t('dash.student.performanceIndex')}
            </h3>
            <div className="h-[250px] md:h-[400px] w-full min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%" debounce={50}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMarks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00000005" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#00000020" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                    fontWeight={900}
                  />
                  <YAxis 
                    stroke="#00000020" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    domain={[0, 100]}
                    fontWeight={900}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid rgba(34, 197, 94, 0.1)', 
                      borderRadius: '20px',
                      padding: '10px md:20px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                      fontSize: '10px'
                    }}
                    itemStyle={{ color: '#22c55e', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                  />
                  <Area 
                     type="monotone" 
                     dataKey="marks" 
                     stroke="#22c55e" 
                     strokeWidth={4}
                     fillOpacity={1} 
                     fill="url(#colorMarks)" 
                     animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-100 p-12 rounded-[40px] text-center border-dashed">
            <p className="text-slate-300 text-xs font-black uppercase tracking-widest">{t('dash.student.noRecords')}</p>
          </div>
        )}

        {/* Results Table */}
        <div className="bg-white border border-slate-100 rounded-[30px] md:rounded-[40px] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">
                  <th className="px-5 md:px-10 py-4 md:py-6 italic font-black text-xs md:text-sm">{t('dash.student.examPaper')}</th>
                  <th className="px-5 md:px-10 py-4 md:py-6 italic font-black text-xs md:text-sm">{t('dash.student.aggregateMarks')}</th>
                  <th className="px-5 md:px-10 py-4 md:py-6 italic font-black text-xs md:text-sm">{t('dash.student.batchStanding')}</th>
                  <th className="hidden md:table-cell px-5 md:px-10 py-4 md:py-6 italic font-black text-xs md:text-sm">{t('dash.student.dateRecorded')}</th>
                  <th className="px-5 md:px-10 py-4 md:py-6 italic font-black text-xs md:text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paperResults.slice().reverse().map(res => (
                  <tr key={res.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-5 md:px-10 py-6 md:py-8">
                       <span className="text-slate-900 font-black uppercase italic tracking-tighter text-sm md:text-base">Paper {res.paperNumber}</span>
                    </td>
                    <td className="px-5 md:px-10 py-6 md:py-8">
                       <span className="text-xl md:text-2xl font-black text-primary italic tracking-tighter group-hover:scale-110 transition-transform inline-block">{res.marks}%</span>
                    </td>
                    <td className="px-5 md:px-10 py-6 md:py-8">
                       <span className="px-3 md:px-4 py-1.5 md:py-2 bg-slate-100 rounded-lg md:rounded-xl border border-slate-200 text-[8px] md:text-[10px] font-black group-hover:bg-primary group-hover:text-white transition-all whitespace-nowrap">#{res.rank}</span>
                    </td>
                    <td className="hidden md:table-cell px-5 md:px-10 py-6 md:py-8 text-[10px] text-slate-300 uppercase font-black tracking-widest whitespace-nowrap">
                      {formatDate(res.createdAt)}
                    </td>
                    <td className="px-5 md:px-10 py-6 md:py-8 text-right">
                      <button 
                        onClick={() => handleDeleteResult(res.id)}
                        className="p-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        title="Delete Result"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {paperResults.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 md:px-10 py-20 md:py-24 text-center">
                      <p className="text-slate-300 text-[10px] md:text-xs font-black uppercase tracking-widest italic opacity-50">{t('dash.student.noRecords')}</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout role="student" activeTab={activeTab} setActiveTab={setActiveTab} profile={profile}>
      <AnimatePresence>
        {showIdModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-2xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-white border-slate-200 shadow-2xl rounded-[30px] md:rounded-[50px] p-8 md:p-16 w-full max-w-xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              
              <div className="flex justify-center mb-8 md:mb-10 relative group">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/5 rounded-[24px] md:rounded-[32px] flex items-center justify-center border border-primary/10 rotate-6 group-hover:rotate-0 transition-all duration-700 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1544377193-33bc799aeec4?q=80&w=2670&auto=format&fit=crop" 
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400?text=Bio';
                    }}
                    className="w-full h-full object-cover grayscale brightness-110" 
                    alt="Success Symbol"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-primary rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-2xl rotate-12 group-hover:rotate-0 transition-all duration-700">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-6 text-[#1a1a1a] tracking-tighter uppercase italic leading-tight">{t('dash.student.welcomeTitle')} {profile.name}!</h2>
              <p className="text-[#1a1a1a] mb-8 md:mb-12 leading-relaxed text-xs md:text-sm font-medium">
                {t('dash.student.welcomeDesc')}
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-[24px] md:rounded-[32px] p-6 md:p-10 mb-8 md:mb-12 relative overflow-hidden group hover:border-primary transition-all duration-700">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-transparent pointer-events-none" />
                <p className="text-[8px] md:text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.4em] mb-2 md:mb-4">{t('dash.student.identificationSerial')}</p>
                <p className="text-4xl md:text-6xl font-black text-primary tracking-tighter group-hover:scale-105 transition-all duration-700 italic">
                  {profile.studentId?.replace('YA-2026-', '')}
                </p>
              </div>
              
              <button 
                onClick={handleCloseIdModal}
                className="w-full bg-primary text-white font-black uppercase italic tracking-[0.2em] py-4 md:py-6 rounded-2xl md:rounded-3xl hover:scale-[1.02] transition-all duration-500 shadow-2xl active:scale-95 text-xs md:text-base"
              >
                {t('dash.student.commitToMemory')}
              </button>
              
              <p className="mt-8 text-[8px] text-slate-300 uppercase font-black tracking-[0.3em] font-black">
                {t('dash.student.terminalAutoSecured')}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'study-packs' && renderStudyPacks()}
          {activeTab === 'live' && renderLive()}
          {activeTab === 'recordings' && renderRecordings()}
          {activeTab === 'payments' && renderPayments()}
          {activeTab === 'marks' && renderMarks()}
          {activeTab === 'books' && renderBookStore()}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
};
export default StudentDashboard;
