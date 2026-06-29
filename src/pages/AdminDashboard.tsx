import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, onSnapshot, collection, addDoc, setDoc, updateDoc, deleteDoc, runTransaction, query, where, getDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfile, Lesson, OnlineClass, Book, StudentRecord, HomeContent, HomePost, HomeVideo, PaperResult, AcademicYear, Recording } from '../types';
import { createPortal } from 'react-dom';
import { DashboardLayout } from '../components/Layout';
import { CardMarkTab } from '../components/CardMarkTab';
import { VideoPlayer } from '../components/VideoPlayer';
import { Users, BookOpen, Video, Plus, Trash2, ExternalLink, Home as HomeIcon, Image as ImageIcon, Type, Play, ShieldCheck, BarChart3, Edit, X, Copy, Calendar, Layers, ChevronLeft, ChevronRight, LayoutGrid, Activity, Trophy, TrendingUp, MessageCircle, Microscope, Dna, Heart, Brain, GraduationCap, MapPin, Lightbulb, FileText, CalendarCheck, CheckCircle2, Clock, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { transformImageUrl, formatDate } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export const AdminDashboard: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [homePreviewMode, setHomePreviewMode] = useState<boolean>(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);
    const [onlineClasses, setOnlineClasses] = useState<OnlineClass[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Omit<Book, 'id' | 'createdAt'>>({
    title: '', description: '', price: 0, imageUrl: '', videoUrl: ''
  });
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [paperResults, setPaperResults] = useState<PaperResult[]>([]);
  const [authorizedAdmins, setAuthorizedAdmins] = useState<any[]>([]);
  const [priUsers, setPriUsers] = useState<any[]>([]);
  const [cmUsers, setCmUsers] = useState<any[]>([]);
  const [newPriEmail, setNewPriEmail] = useState('');
  const [newCmEmail, setNewCmEmail] = useState('');
  const [activeSettingsTab, setActiveSettingsTab] = useState('batches');
  const [courses, setCourses] = useState<any[]>([]);
  const [newCourse, setNewCourse] = useState({ name: '', fee: '', yearId: '' });

  useEffect(() => {
        const unsubBooks = onSnapshot(collection(db, 'books'), (snapshot) => {
      setBooks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book)));
    });
    const unsubPri = onSnapshot(collection(db, 'authorizedPri'), (snapshot) => {
      setPriUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    const unsubCM = onSnapshot(collection(db, 'authorizedCM'), (snapshot) => {
      setCmUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    const unsubCourses = onSnapshot(collection(db, 'courses'), (snapshot) => {
      setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => { unsubPri(); unsubBooks(); unsubCM(); unsubCourses(); };
  }, []);

  const handleAddPriUser = async () => {
    if (!newPriEmail) return;
    try {
      const email = newPriEmail.toLowerCase().trim();
      await setDoc(doc(db, 'authorizedPri', email), {
        email,
        createdAt: serverTimestamp()
      });
      setNewPriEmail('');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'authorizedPri');
    }
  };

  const handleAddCmUser = async () => {
    if (!newCmEmail) return;
    try {
      const email = newCmEmail.toLowerCase().trim();
      await setDoc(doc(db, 'authorizedCM', email), {
        email,
        createdAt: serverTimestamp()
      });
      setNewCmEmail('');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'authorizedCM');
    }
  };

  const handleAddCourse = async () => {
    if (!newCourse.name || !newCourse.fee || !newCourse.yearId) return;
    try {
      await addDoc(collection(db, 'courses'), {
        ...newCourse,
        createdAt: serverTimestamp()
      });
      setNewCourse({ name: '', fee: '', yearId: '' });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'courses');
    }
  };
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [marksFilterYear, setMarksFilterYear] = useState<string>('all');
  const [marksFilterPaper, setMarksFilterPaper] = useState<number | 'all'>('all');
  const [overviewBatchId, setOverviewBatchId] = useState<string>('all');

  const [topicMode, setTopicMode] = useState<'new' | 'existing'>('existing');
  
  // Form states
  const [isUploadingImage, setIsUploadingImage] = useState<{type: 'thumbnail' | 'image' | null, loading: boolean}>({type: null, loading: false});
  const [newLesson, setNewLesson] = useState<{
    topic: string;
    subTopic: string;
    videoUrl: string;
    videoType: 'drive' | 'youtube';
    visibility: 'private' | 'unlisted';
    thumbnailUrl: string;
    imageUrl: string;
    maxViews: number | '';
    yearId: string;
    isSafeZone: boolean;
  }>({ 
    topic: '', 
    subTopic: '', 
    videoUrl: '', 
    videoType: 'youtube', 
    visibility: 'private',
    thumbnailUrl: '', 
    imageUrl: '', 
    maxViews: '',
    yearId: '',
    isSafeZone: true
  });
  
  const [showZoomSync, setShowZoomSync] = useState(false);
  const [zoomMessage, setZoomMessage] = useState('');
  const [zoomYearIds, setZoomYearIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('defaultYearIds') || '[]'); } catch { return []; }
  });
  const classTypes = [
    { id: 'theory', name: 'Theory' },
    { id: 'revision', name: 'Revision' },
    { id: 'paper', name: 'Paper' }
  ];

  const [zoomClassTypes, setZoomClassTypes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('defaultClassTypes') || '[]'); } catch { return []; }
  });

  const handleSaveZoomMessage = async () => {
    if (!zoomMessage.trim()) return;
    const linkMatch = zoomMessage.match(/(https:\/\/[^\s]+)/);
    const link = linkMatch ? linkMatch[0] : '';
    let title = 'Zoom Meeting';
    const lines = zoomMessage.split('\n');
    if(lines.length > 0) title = lines[0];

    try {
      await addDoc(collection(db, 'onlineClasses'), { 
         title: title, 
         link: link, 
         type: 'zoom', 
         startTime: serverTimestamp(),
         zoomMessage: zoomMessage,
         yearIds: zoomYearIds,
         classTypes: zoomClassTypes
      });
      setShowZoomSync(false);
      setZoomMessage('');
    } catch(err) {
      console.error(err);
    }
  };

  const [newClass, setNewClass] = useState({ title: '', link: '', type: 'zoom' as const });
  const [newStudent, setNewStudent] = useState({ name: '', email: '', class: '', whatsapp: '', address: '', studentId: '', school: '', nic: '', yearId: '' });
  const [newPaperResult, setNewPaperResult] = useState({ paperNumber: 1, studentIndex: '', marks: 0, yearId: '' });
  const [newYear, setNewYear] = useState({ year: '' });
  const [newRecording, setNewRecording] = useState<{
    title: string;
    videoUrl: string;
    visibility: 'private' | 'unlisted';
    maxViews: number;
    yearId: string;
    publishDate: string;
    isSafeZone: boolean;
  }>({ 
    title: '', 
    videoUrl: '', 
    visibility: 'private', 
    maxViews: 2, 
    yearId: '', 
    publishDate: new Date().toISOString().split('T')[0],
    isSafeZone: true
  });
  const [selectedRecordingYear, setSelectedRecordingYear] = useState<string>('all');
  const [newAuthAdmin, setNewAuthAdmin] = useState({ email: '', password: '' });
  const [newPriUser, setNewPriUser] = useState({ email: '', name: '' });
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);
  const [studentSearch, setStudentSearch] = useState('');

  // Home states
  const [homeContent, setHomeContent] = useState<HomeContent>({ 
    teacherName: 'Chathuranaga Bandara', 
    teacherMethodology: 'ලංකාවේ ඉහළම ප්‍රතිඵල සහිත Bio පන්තිය.', 
    teacherImageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2670&auto=format&fit=crop',
    teacherHeroUrl: 'https://images.unsplash.com/photo-1603126019936-f9b6d9a563bb?q=80&w=2670&auto=format&fit=crop',
    teacherAboutUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?q=80&w=2574&auto=format&fit=crop',
    aboutTitle: 'About Us',
    aboutSubtitle: 'Chathuranaga Bandara',
    aboutRichText: `<p>පන්ති ආරම්භ කර වසර 4ක් ගතවන විට දිවයිනේ මුළු Bio A සාමර්ථ ගණනින් 10න් 1ක් අප පන්තිය සතු විය. ඊළඟ වසර වන විට එය 6න් 1ක් දක්වා වැඩි විය. මෙම වසරේ එය 4න් 1ක් දක්වා වැඩිවිය. ඒ දිස්ත්‍රික් මුල් 20 තුළ සිසුන් 126 කට වැඩි ප්‍රමාණයක් සමඟය.</p><p>මෙය ලංකා ඉතිහාසයේ පළමු වසර 6 තුළ පන්තියක් වාර්ථා කළ වැඩිම ප්‍රතිඵල සමූහය යන්න අවිවාදිතය. සෑබෑ කරුණ නම්, වසර 6ක් නොව කොපමණ කාලයක් පන්ති කළ ද මෙම මට්ටමේ ප්‍රතිඵල නිර්මාණය කළ කිසිදු පන්තියක් දිවයිනේ පැවතී නැත.</p><p>අප මේ අභිභවා යන්නේ ඉතිහාසයේ කිසිවෙකුත් ආසන්නයටවත් ගමන් නොකළ සීමාවන් ය. එය ද අපගේ හයවන කණ්ඩායම (2024 A/L) වනවිට ය ..</p>`,
    aboutCtaText: 'Join Now',
    aboutCtaUrl: '/lms',
    
    processTitle: 'Our Successful',
    processSubtitle: 'Work Process',
    processSteps: [
      { id: '1', title: 'නිවැරැදි විෂය කරුණු', description: 'විෂය නිර්දේශය ආවරණය වන නිවැරදි විෂය කරුණු සම්පිණ්ඩණය කර සිසුන්ට ඉගැන්වීම', icon: 'BookOpen' },
      { id: '2', title: 'විෂයානුබද්ධ ක්‍රියාකාරකම්', description: 'විෂය කරුණු මතක තබා ගැනීම පහසු කිරීම උදෙසා සුවිශේෂ ක්‍රමවේද සතිපතා සිදුකිරීම', icon: 'Lightbulb' },
      { id: '3', title: 'විශේෂ ප්‍රශ්න පත්‍ර', description: 'සුවිශේෂ ප්‍රශ්න පත්‍ර මඟින් සිසුන් දැනුමින් සහ අත්දැකීම් මඟින් උසස් පෙළ විභාගයට සූදානම් කරවීම', icon: 'FileText' },
      { id: '4', title: 'නිවැරදි කාල රාමුව', description: 'විෂය කරුණු පන්තිය තුළ දීම අවධාරණය කිරීමෙන් නිවැරැදි කාල රාමුවක් තුළ සිසුන් මෙහෙයවීම', icon: 'CalendarCheck' },
      { id: '5', title: 'විශිෂ්ටතම ප්‍රතිඵල', description: 'අවසන් ප්‍රතිඵලක් ලෙස සිසුන්ට විශිෂ්ටතම ප්‍රතිඵලයක් ලබාගැනීම සඳහා මඟපෙන්වීම', icon: 'CheckCircle2' }
    ],

    specialTitle: 'Special Programs',
    specialSubtitle: 'The final Paper Class',
    specialDesc: 'A/L PAPER එකට පස්සේ ලංකාවේ වැඩිම ළමයි ප්‍රමාණයක් එකපාර ලියන Bio PAPER එක. විශේෂ ප්‍රශ්න, පෙරහුරු ප්‍රශ්න සමගින් සිසුන්ගේ විෂය පිළිබඳව හැකියාව වැඩි දියුණු කරමින් විභාගය සඳහා සූදානම් කරවනු ලබයි',
    specialFeatures: [
      { id: 'f1', title: 'මධ්‍යස්ථාන 42ක්', description: 'දිවයින පුරා මධ්‍යස්ථාන 42 දී සිසුන්ට ප්‍රශ්න පත්‍රය සඳහා භෞතිකව සහභාගි වීමේ හැකියාව ඇත.', icon: 'MapPin' },
      { id: 'f2', title: 'වැඩිම Rank ලිස්ට් එක', description: 'උසස් පෙළ විභාගයට පසුව විශාලතම සිසුන් පිරිසකට එකවර ලකුණු ලබාදී ශ්රේණිගත කිරීම් සිදුකරන එකම Bio පන්තිය.', icon: 'Users' },
      { id: 'f3', title: 'ප්‍රගති සමාලෝචනය', description: 'නව තාක්ෂණික ක්‍රමවේදයන් ඔස්සේ සිසුන්ගේ පසුගිය ප්‍රශ්න පත්‍ර වල ලකුණු අධ්‍යයනය කර සිසුන්ගේ ප්‍රගතිය වාර්තාවක් වෙබ්අඩවිය හරහා ලබා ගත හැකි වීම', icon: 'BarChart3' },
      { id: 'f4', title: 'ලකුණු විශ්ලේෂණය', description: 'සෑම සිසුවෙකුටම ලකුණු පිළිබඳව ප්‍රශ්න පත්‍ර පරීක්ෂක සමඟ සම්බන්ධ වී වාර්තාවක් ලබාගත හැකි වීම, තම අඩුපාඩු ඔවුන් සමඟ සාකච්ඡා කළ හැකි වීම', icon: 'Clock' }
    ],

    telegramTitle: 'Bio',
    telegramSubtitle: 'Our Telegram Channels',
    telegramChannels: [
      { id: 't1', name: '2028 Theory', url: 'https://t.me/CHEM28T', imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop' },
      { id: 't2', name: '2026 Revision', url: 'https://t.me/chem_26R', imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop' },
      { id: 't3', name: '2026 Theory', url: 'https://t.me/chem26Th', imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop' },
      { id: 't4', name: '2027 Theory', url: 'https://t.me/CHEM_27T', imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop' }
    ],

    teacherBioTitle: 'ගුරුවරයා පිළිබඳව,',
    teacherBioText: `2017 උසස් පෙළ ජීව විද්‍යා අංශයෙන් දිවයිනේ 4 වන ස්ථානයට (කොළඹ දිස්ත්‍රික් 2) සමත්ව මේ වන විට කොළඹ වෛද්‍ය පීඨයේ සිය උපාධිය අවසන් කරමින් සිටියි. 2019 දී උපකාරක පන්ති ක්ෂේත්‍රයට පිවිසෙන ඔහු වසර 4ක් යන්නටත් පෙර (වයස අවුරුදු 24ක වන විට) දිවයිනේ එදා මෙදා තුර සමස්ථ ටියුෂන් ඉතිහාසයේම වැඩිම සිසුන් පිරිසක් සහභාගි වන ජීව විද්‍යාව පන්තිය නිර්මාණය කරන්නේ, යල්පැනගිය ක්‍රමවේදයන් වෙනුවට වසර කිහිපයකට ඉහත දී තමා විසින්ම අනුගමනය කළ අතිසාර්ථක ක්‍රමවේදයන් පන්තියේ වැඩ පිළිවෙළට මුසු කරමින් අවවාදයට එහා ගිය ආදර්ශයක් මත සිසුන් විභාගයට සූදානම් කරවීම සහ විෂයන් 3ටම අදාළ නිවැරදි මගපෙන්වීම හේතුවෙන් වේ.\n\nසිය පළමු පන්තියෙන්ම ගම්පහ දිස්ත්‍රික්කයේ ප්‍රථමයා (දිවයිනේ 9) ද දෙවන පන්තියෙන් දිවයිනේ 2, 4 ඇතුළුව දිස්ත්‍රික් ප්‍රථමයන් 2ක් දෙවැනියන් 3ක් සහ තෙවනියෙක් නිර්මාණය වන්නේ ද ඉහත කී හේතුව සහ ගුරුවරයා සතු සහජයෙන් ලද විෂය කරුණු පැහැදිලි කිරීමේ හැකියාව හේතුවෙන් වේ.`,
    teacherVideoUrl: 'https://youtu.be/7XrbdDzD7V8',
    teacherVideoThumbnail: 'https://images.unsplash.com/photo-1532187875620-1e4334f6eee9?q=80&w=2670&auto=format&fit=crop',

    heroSlides: [
       { id: 's1', title: 'Bio Highest Results', subtitle: 'Journey of Excellence', imageUrl: '/1.avif', ctaText: 'Explore Our Journey', ctaUrl: '/lms' },
       { id: 's2', title: 'විශිෂ්ටතම Bio පන්තිය', subtitle: 'අද ලංකාවේ', imageUrl: '/2.avif' },
       { id: 's3', title: 'Bio පන්තිය', subtitle: 'දිවයිනේ වැඩිම සිසුන් පිරිසක්', imageUrl: '/3.avif' }
    ],

    contactTitle: 'Contact Us',
    contactSubtitle: 'පහත සඳහන් ආකාර මගින් ඔබට අප හා සම්බන්ධ විය හැක',
    contactAddress: 'No: 160, Rajagiriya.',
    contactPhone: '070 123 4567',
    contactEmail: 'info@bwithb.lk',
    contactWorkingHours: 'Mon-Sat: 8am-5pm',

    facebookUrl: '',
    youtubeUrl: '',
    whatsappUrl: '',
    instagramUrl: '',
    linkedinUrl: '#',
    allowedDomain: typeof window !== 'undefined' ? window.location.origin : ''
  });
  const [homePosts, setHomePosts] = useState<HomePost[]>([]);
  const [homeVideos, setHomeVideos] = useState<HomeVideo[]>([]);
  const [newHomePost, setNewHomePost] = useState<{ title: string, description: string, imageUrl: string, imageUrls?: string[] }>({ title: '', description: '', imageUrl: '' });
  const [newHomeVideo, setNewHomeVideo] = useState({ title: '', videoUrl: '' });
  
  // Temp states for home builder
  const [newSlide, setNewSlide] = useState({ title: '', subtitle: '', imageUrl: '', ctaText: '', ctaUrl: '', titleFontSize: 10, titleFontSizeMobile: 4 });
  const [newProcessStep, setNewProcessStep] = useState({ title: '', description: '', icon: 'BookOpen' });
  const [newFeature, setNewFeature] = useState({ title: '', description: '', icon: 'Play' });
  const [newTelegram, setNewTelegram] = useState({ name: '', url: '', imageUrl: '' });

  // Local Hero Slides fallback
  const LOCAL_SLIDES = [
    { imageUrl: '/1.avif' },
    { imageUrl: '/2.avif' },
    { imageUrl: '/3.avif' }
  ];

  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

  useEffect(() => {
    const unsubLessons = onSnapshot(collection(db, 'lessons'), (snap) => {
      setLessons(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lesson)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'lessons'));

    const unsubClasses = onSnapshot(collection(db, 'onlineClasses'), (snap) => {
      setOnlineClasses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as OnlineClass)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'onlineClasses'));

    const unsubStudents = onSnapshot(collection(db, 'students'), (snap) => {
      const studentData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as StudentRecord));
      // Sort by registration date descending (newest first)
      const sortedStudents = studentData.sort((a, b) => {
        const dateA = (a.registeredAt as any)?.toDate?.()?.getTime() || new Date(a.registeredAt as any || 0).getTime();
        const dateB = (b.registeredAt as any)?.toDate?.()?.getTime() || new Date(b.registeredAt as any || 0).getTime();
        return dateB - dateA;
      });
      setStudents(sortedStudents);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'students'));

    const unsubHomeContent = onSnapshot(doc(db, 'home_content', 'main'), (snap) => {
      if (snap.exists()) setHomeContent(snap.data() as HomeContent);
    });

    const unsubHomePosts = onSnapshot(collection(db, 'home_posts'), (snap) => {
      setHomePosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as HomePost)));
    });

    const unsubHomeVideos = onSnapshot(collection(db, 'home_videos'), (snap) => {
      setHomeVideos(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as HomeVideo)));
    });

    const unsubAuthAdmins = onSnapshot(collection(db, 'authorizedAdmins'), (snap) => {
      setAuthorizedAdmins(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      console.warn("Permission denied reading authorizedAdmins. You may need to log in via General Login first.");
    });

    const unsubPaperResults = onSnapshot(collection(db, 'paperResults'), (snap) => {
      setPaperResults(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as PaperResult)));
    });

    const unsubAcademicYears = onSnapshot(collection(db, 'academicYears'), (snap) => {
      setAcademicYears(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as AcademicYear)));
    });

    const unsubRecordings = onSnapshot(collection(db, 'recordings'), (snap) => {
      setRecordings(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Recording)));
    });

    return () => {
      unsubLessons();
      unsubClasses();
      unsubStudents();
      unsubHomeContent();
      unsubHomePosts();
      unsubHomeVideos();
      unsubAuthAdmins();
      unsubPaperResults();
      unsubAcademicYears();
      unsubRecordings();
    };
  }, []);

  useEffect(() => {
    if (newPaperResult.studentIndex && students.length > 0) {
      const student = students.find(s => s.studentId === newPaperResult.studentIndex || s.indexNumber === newPaperResult.studentIndex);
      if (student && student.yearId && student.yearId !== newPaperResult.yearId) {
        setNewPaperResult(prev => ({ ...prev, yearId: student.yearId || '' }));
      }
    }
  }, [newPaperResult.studentIndex, students]);

  
  const handleImageUpload = async (file: File, type: 'thumbnail' | 'image' | 'book') => {
    try {
      setIsUploadingImage({type, loading: true});
      
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
      
      const payload = {
        file: base64Data,
        fileName: file.name,
        mimeType: file.type,
        folderName: 'Thumbnails'
      };

      const scriptUrl = 'https://script.google.com/macros/s/AKfycbyogWoZRxK57ROMJ3OZHn8bLFm1_t3LKDe6ZMAloyKA-ZHm3oWU-2DyxZNHt_cbPhFQmg/exec';
      const res = await fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!resData.success) throw new Error(resData.error || "Upload failed via Drive");
      
      const downloadUrl = resData.url;
      
      if (type === 'thumbnail') {
        setNewLesson(prev => ({...prev, thumbnailUrl: downloadUrl}));
      } else if (type === 'book') {
        setNewBook(prev => ({...prev, imageUrl: downloadUrl}));
      } else {
        setNewLesson(prev => ({...prev, imageUrl: downloadUrl}));
      }
    } catch (err: any) {
      console.error(err);
      alert("Error uploading image: " + err.message);
    } finally {
      setIsUploadingImage({type: null, loading: false});
    }
  };

  const handleAddLesson = async () => {
    try {
      await addDoc(collection(db, 'lessons'), { ...newLesson, createdAt: serverTimestamp() });
      setNewLesson({ 
        topic: '', 
        subTopic: '', 
        videoUrl: '', 
        videoType: 'youtube', 
        visibility: 'private', 
        thumbnailUrl: '', 
        imageUrl: '', 
        maxViews: '',
        yearId: newLesson.yearId,
        isSafeZone: true
      });
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'lessons'); }
  };

  const handleAddClass = async () => {
    try {
      await addDoc(collection(db, 'onlineClasses'), { ...newClass, startTime: serverTimestamp() });
      setNewClass({ title: '', link: '', type: 'zoom' });
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'onlineClasses'); }
  };

  const handleAddStudent = async () => {
    try {
      // Auto-generate Index Number
      const counterRef = doc(db, 'counters', 'studentIndex');
      let nextIndex = 1;
      
      await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        if (!counterDoc.exists()) {
          transaction.set(counterRef, { value: 1 });
          nextIndex = 1;
        } else {
          nextIndex = counterDoc.data().value + 1;
          transaction.update(counterRef, { value: nextIndex });
        }
      });

      const formattedIndex = nextIndex.toString().padStart(4, '0');

      await addDoc(collection(db, 'students'), { 
        ...newStudent, 
        studentId: formattedIndex,
        indexNumber: formattedIndex,
        registeredAt: serverTimestamp(),
        payments: { [currentMonth]: false },
        hasSeenId: false
      });
      setNewStudent({ name: '', email: '', class: '', whatsapp: '', address: '', studentId: '', school: '', nic: '', yearId: '' });
      alert(`Student registered with Index: ${formattedIndex}`);
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'students'); }
  };

  const handleUpdateStudent = async () => {
    if (!editingStudent) return;
    try {
      const { id, uid, ...data } = editingStudent;
      await updateDoc(doc(db, 'students', id), data);
      
      // Also update user profile if it exists
      if (uid) {
        const userRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          await updateDoc(userRef, {
            name: data.name,
            yearId: data.yearId || '',
            class: data.class,
            whatsapp: data.whatsapp,
            address: data.address,
            studentId: data.studentId,
            indexNumber: data.indexNumber,
            nic: data.nic,
            school: data.school
          });
        }
      }

      setEditingStudent(null);
      alert('Student record updated successfully!');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'students');
    }
  };

  const handleAddAuthAdmin = async () => {
    try {
      const docId = newAuthAdmin.email.toLowerCase().trim();
      if (!docId) throw new Error('Email is required');
      await setDoc(doc(db, 'authorizedAdmins', docId), { 
        ...newAuthAdmin, 
        email: docId,
        id: docId 
      });
      setNewAuthAdmin({ email: '', password: '' });
      alert('Admin authorized successfully!');
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'authorizedAdmins'); }
  };

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
      if (!window.confirm("WARNING: A result already exists for this Index and Paper. Continue anyway?")) {
        return;
      }
    }

    try {
      const student = students.find(s => 
        (s.studentId && s.studentId.trim() === targetIndex) || 
        (s.indexNumber && s.indexNumber.trim() === targetIndex)
      );
      const resultData = {
        ...newPaperResult,
        studentIndex: targetIndex,
        marks: Number(newPaperResult.marks),
        uid: student?.uid || null,
        createdAt: serverTimestamp()
      };
      if (!student?.uid) {
        console.warn(`Student with index ${targetIndex} does not have a linked UID. The result may not be visible until they log in.`);
      }
      const docRef = await addDoc(collection(db, 'paperResults'), resultData);
      
      // Recalculate ranks for this paper and year
      const paperNum = newPaperResult.paperNumber;
      const yearId = newPaperResult.yearId;
      const resultsForPaper = paperResults.filter(r => r.paperNumber === paperNum && r.yearId === yearId);
      // Add the new one to the list for sorting
      resultsForPaper.push({ ...resultData, id: docRef.id } as any as PaperResult);
      
      const sorted = [...resultsForPaper].sort((a, b) => b.marks - a.marks);
      
      // Update ranks in Firestore
      await Promise.all(sorted.map((res, index) => 
        updateDoc(doc(db, 'paperResults', res.id), { rank: index + 1 })
      ));

      setNewPaperResult({ ...newPaperResult, studentIndex: '', marks: 0 });
      alert('Marks added and ranks updated!');
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'paperResults'); }
  };

  const handleAddHomePost = async () => {
    try {
      await addDoc(collection(db, 'home_posts'), { 
        ...newHomePost, 
        createdAt: serverTimestamp() 
      });
      setNewHomePost({ title: '', description: '', imageUrl: '' });
      alert('Moment added to gallery successfully!');
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'home_posts'); }
  };

  const handleAddHomeVideo = async () => {
    try {
      await addDoc(collection(db, 'home_videos'), { 
        ...newHomeVideo, 
        createdAt: serverTimestamp() 
      });
      setNewHomeVideo({ title: '', videoUrl: '' });
      alert('Video added successfully!');
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'home_videos'); }
  };

  const togglePayment = async (studentId: string, month: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'students', studentId), {
        [`payments.${month}`]: !currentStatus
      });
    } catch (err) { handleFirestoreError(err, OperationType.UPDATE, `students/${studentId}/payments`); }
  };

  const handleDelete = async (path: string, id: string) => {
    if (!window.confirm("Are you sure you want to delete this record? This action cannot be undone.")) return;
    
    try {
      // Map RTDB paths to Firestore collections
      let collectionName = path;
      if (path === 'home/posts') collectionName = 'home_posts';
      if (path === 'home/videos') collectionName = 'home_videos';

      if (path === 'students') {
        // Find the student to get their uid
        const student = students.find(s => s.id === id);
        if (student?.uid) {
          await deleteDoc(doc(db, 'users', student.uid));
        }
      }
      await deleteDoc(doc(db, collectionName, id));
      alert("Record deleted successfully.");
    } catch (err) { handleFirestoreError(err, OperationType.DELETE, `${path}/${id}`); }
  };

  const handleCopyPaidEmails = () => {
    const paidEmails = students
      .filter(s => s.payments?.[currentMonth])
      .map(s => s.email)
      .filter(email => email) // Ensure email exists
      .join(', ');
    
    if (paidEmails) {
      navigator.clipboard.writeText(paidEmails);
      alert(`Success: ${paidEmails.split(',').length} emails copied to clipboard!`);
    } else {
      alert('No paid students found for the current month.');
    }
  };

  const handleAddYear = async () => {
    try {
      if (!newYear.year.trim()) {
        alert("Please enter a valid Academic Year name.");
        return;
      }
      await addDoc(collection(db, 'academicYears'), { ...newYear, createdAt: serverTimestamp() });
      setNewYear({ year: '' });
      alert("Academic Year created successfully. If you see a permission error, please ensure you have deployed the firestore.rules as described.");
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'academicYears'); }
  };

  const handleAddRecording = async () => {
    try {
      if (!newRecording.yearId) {
        alert("Please select a Year first.");
        return;
      }
      await addDoc(collection(db, 'recordings'), { ...newRecording, createdAt: serverTimestamp() });
      setNewRecording({ 
        title: '', 
        videoUrl: '', 
        visibility: 'private', 
        maxViews: '', 
        yearId: '', 
        publishDate: new Date().toISOString().split('T')[0],
        isSafeZone: true
      });
      alert("Recording added successfully!");
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'recordings'); }
  };

  const renderAcademicYears = () => (
    <div className="space-y-12">
      <div className="bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm">
        <h3 className="text-2xl font-black mb-10 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter">
          <Calendar className="w-7 h-7 text-primary/40" /> Manage Academic Years
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Academic Year Name</label>
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
              CREATE YEAR
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-[40px] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic border-b border-slate-100">
              <th className="px-10 py-6">YEAR_IDENTIFIER</th>
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

  const renderRecordings = () => {
    const filteredRecordings = recordings.filter(r => selectedRecordingYear === 'all' || r.yearId === selectedRecordingYear);
    
    return (
      <div className="space-y-12">
        <div className="bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm">
          <h3 className="text-2xl font-black mb-10 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter">
            <Plus className="w-7 h-7 text-primary/40" /> Add New Recording
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Recording Headline</label>
              <input 
                type="text" 
                placeholder="Recording Title" 
                value={newRecording.title} 
                onChange={e => setNewRecording({...newRecording, title: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Target Batch (Year)</label>
              <select 
                value={newRecording.yearId} 
                onChange={e => setNewRecording({...newRecording, yearId: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold focus:outline-none focus:border-primary/30 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select Year</option>
                {academicYears.map(y => <option key={y.id} value={y.id}>{y.year}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Publish Date</label>
              <input 
                type="date" 
                value={newRecording.publishDate} 
                onChange={e => setNewRecording({...newRecording, publishDate: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold focus:outline-none focus:border-primary/30 transition-all" 
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Video Transmission Protocol (URL)</label>
              <input 
                type="text" 
                placeholder="Video Link" 
                value={newRecording.videoUrl} 
                onChange={e => setNewRecording({...newRecording, videoUrl: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-mono tracking-widest focus:outline-none focus:border-primary/30 transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Privacy & UX Toggles</label>
              <div className="flex gap-4">
                <div className="flex flex-1 gap-2">
                  <button 
                    type="button"
                    onClick={() => setNewRecording({...newRecording, visibility: 'private'})}
                    className={`flex-1 py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${newRecording.visibility === 'private' ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                  >
                    SECURE
                  </button>
                  <button 
                    type="button"
                    onClick={() => setNewRecording({...newRecording, visibility: 'unlisted' as const})}
                    className={`flex-1 py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${(newRecording.visibility as string) === 'unlisted' ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                  >
                    GUEST
                  </button>
                </div>
                <button 
                  type="button"
                  onClick={() => setNewRecording({...newRecording, isSafeZone: !newRecording.isSafeZone})}
                  className={`px-6 rounded-2xl border transition-all flex items-center gap-2 ${newRecording.isSafeZone ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/20' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                >
                  <ShieldCheck className={`w-4 h-4 ${newRecording.isSafeZone ? 'text-primary' : 'text-slate-300'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest">SAFE_ZONE</span>
                </button>
              </div>
            </div>
          </div>
          <button onClick={handleAddRecording} className="mt-10 bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20">
            DEPLOY RECORDING
          </button>
        </div>

        {/* Year Filter Slider */}
        <div className="bg-white border border-slate-200 p-8 rounded-[35px] shadow-sm flex items-center gap-6 overflow-x-auto custom-scrollbar no-scrollbar scroll-smooth">
          <button 
            onClick={() => setSelectedRecordingYear('all')}
            className={`shrink-0 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedRecordingYear === 'all' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
          >
            ALL_RECORDS
          </button>
          {academicYears.sort((a, b) => b.year.localeCompare(a.year)).map(y => (
            <button 
              key={y.id}
              onClick={() => setSelectedRecordingYear(y.id)}
              className={`shrink-0 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedRecordingYear === y.id ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
            >
              BATCH_{y.year}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecordings.sort((a, b) => b.publishDate.localeCompare(a.publishDate)).map(rec => (
            <div key={rec.id} className="bg-white border border-slate-200 rounded-[32px] overflow-hidden group hover:border-primary/30 transition-all duration-500 shadow-sm relative">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10">
                    <Play className="w-5 h-5 text-primary" />
                  </div>
                  <button onClick={() => handleDelete('recordings', rec.id)} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-2 group-hover:text-primary transition-colors">{rec.title}</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest rounded-lg border border-slate-100">
                    {rec.publishDate}
                  </span>
                  <span className={`px-3 py-1 text-white text-[8px] font-black uppercase tracking-widest rounded-lg ${rec.visibility === 'private' ? 'bg-red-500' : 'bg-slate-900'}`}>
                    {rec.visibility}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedLesson({ id: rec.id, topic: rec.title, subTopic: 'Recording', videoUrl: rec.videoUrl, videoType: 'youtube', visibility: rec.visibility, createdAt: rec.createdAt, maxViews: rec.maxViews } as Lesson)}
                  className="w-full py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-primary hover:border-primary/20 transition-all"
                >
                  PREVIEW STREAM &rarr;
                </button>
              </div>
            </div>
          ))}
          {filteredRecordings.length === 0 && (
            <div className="md:col-span-3 py-20 flex flex-col items-center">
               <Layers className="w-16 h-16 text-slate-100 mb-6" />
               <p className="text-slate-300 font-black uppercase tracking-widest text-[10px]">No recordings found for this partition.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  
  const handleAddBook = async () => {
    if (!newBook.title || !newBook.price || !newBook.description) {
      alert('Please fill all required fields');
      return;
    }
    try {
      await addDoc(collection(db, 'books'), {
        ...newBook,
        createdAt: serverTimestamp()
      });
      setNewBook({ title: '', description: '', price: 0, imageUrl: '', videoUrl: '' });
      alert('Book added successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to add book');
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteDoc(doc(db, 'books', bookId));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const renderBooks = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900 mb-8">Add New Book</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Book Title</label>
              <input type="text" placeholder="Title" value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider focus:outline-none focus:border-primary/30 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Price (Rs.)</label>
              <input type="number" placeholder="Price" value={newBook.price || ''} onChange={e => setNewBook({...newBook, price: parseInt(e.target.value) || 0})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider focus:outline-none focus:border-primary/30 transition-all" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Description</label>
            <textarea placeholder="Book Description" value={newBook.description} onChange={e => setNewBook({...newBook, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider focus:outline-none focus:border-primary/30 transition-all min-h-[100px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Cover Image</label>
              <div className="relative">
                <input type="text" placeholder="Image URL or Upload File" value={newBook.imageUrl} onChange={e => setNewBook({...newBook, imageUrl: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-6 pr-24 py-5 text-slate-900 text-xs font-bold tracking-wider focus:outline-none focus:border-primary/30 transition-all" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <input type="file" accept="image/*" id="book-upload" className="hidden" onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'book')} />
                  <label htmlFor="book-upload" className={`cursor-pointer px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isUploadingImage.loading && isUploadingImage.type === 'book' ? 'bg-slate-200 text-slate-500' : 'bg-primary text-white hover:bg-black'}`}>
                    {isUploadingImage.loading && isUploadingImage.type === 'book' ? 'Uploading...' : 'Upload'}
                  </label>
                </div>
              </div>
              {newBook.imageUrl && (
                <div className="mt-4 aspect-[4/3] w-48 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={transformImageUrl(newBook.imageUrl)} alt="Book Cover Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Promo Video URL (Optional)</label>
              <input type="text" placeholder="YouTube URL" value={newBook.videoUrl} onChange={e => setNewBook({...newBook, videoUrl: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider focus:outline-none focus:border-primary/30 transition-all" />
            </div>
          </div>
          
          <button onClick={handleAddBook} className="mt-6 bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20">
            Add Book
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">Available Books</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map(book => (
            <div key={book.id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
              <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                {book.imageUrl ? (
                  <img src={transformImageUrl(book.imageUrl)} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <BookOpen className="w-12 h-12 opacity-50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white font-black uppercase tracking-wider text-lg truncate">{book.title}</h4>
                  <p className="text-white/80 font-bold text-sm">Rs. {book.price}</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-slate-500 font-medium line-clamp-3">{book.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <button onClick={() => handleDeleteBook(book.id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // injection point indicator

  const renderOverview = () => {
    const selectedYear = academicYears.find(y => y.id === overviewBatchId);
    const batchResults = overviewBatchId === 'all' ? paperResults : paperResults.filter(r => r.yearId === overviewBatchId);
    
    // Find latest paper for this specific batch
    const batchPaperNumbers = Array.from(new Set(batchResults.map(r => r.paperNumber)));
    const latestPaperNum = batchPaperNumbers.length > 0 ? Math.max(...(batchPaperNumbers as number[])) : null;
    
    const latestPaperResults = latestPaperNum !== null 
      ? batchResults.filter(r => r.paperNumber === latestPaperNum).sort((a, b) => b.marks - a.marks)
      : [];
    
    const topScorer = latestPaperResults[0];
    const top10 = latestPaperResults.slice(0, 10);

    // All-time champions (highest marks ever obtained in any paper for this batch)
    const studentBestMarks = batchResults.reduce((acc, res) => {
      if (!acc[res.studentIndex] || res.marks > acc[res.studentIndex].marks) {
        acc[res.studentIndex] = res;
      }
      return acc;
    }, {} as Record<string, PaperResult>);

    const batchChampions = (Object.values(studentBestMarks) as PaperResult[]).sort((a, b) => b.marks - a.marks).slice(0, 10);

    return (
      <div className="space-y-12 pb-24">
        {/* Core Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <button
            onClick={() => setShowZoomSync(true)}
            className="glass p-8 rounded-[40px] relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/20 text-left flex flex-col justify-center cursor-pointer"
          >
            <div className="flex items-center gap-6 mb-2 relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                <Video className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-blue-100 text-[10px] uppercase font-black tracking-[0.3em] mb-1">Live Sessions</p>
                <h3 className="text-3xl font-black text-white uppercase tracking-wider">Sync Zoom</h3>
              </div>
            </div>
          </button>

          <div className="glass p-10 rounded-[40px] relative overflow-hidden group hover:border-primary/20 transition-all duration-500 bg-white shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-6 mb-6 relative z-10">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-black tracking-[0.3em] mb-1">{t('dash.admin.totalStudents')}</p>
                <h3 className="text-5xl font-black text-slate-900 italic tracking-tighter">{students.length}</h3>
              </div>
            </div>
          </div>

          <div className="glass p-10 rounded-[40px] relative overflow-hidden group hover:border-primary/20 transition-all duration-500 bg-white shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-6 mb-6 relative z-10">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-black tracking-[0.3em] mb-1">{t('dash.admin.studyPacks')}</p>
                <h3 className="text-5xl font-black text-slate-900 italic tracking-tighter">{lessons.length}</h3>
              </div>
            </div>
          </div>

          <div className="glass p-10 rounded-[40px] relative overflow-hidden group hover:border-primary/20 transition-all duration-500 bg-white shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-6 mb-6 relative z-10">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform">
                <Video className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-black tracking-[0.3em] mb-1">{t('dash.admin.liveClasses')}</p>
                <h3 className="text-5xl font-black text-slate-900 italic tracking-tighter">{onlineClasses.length}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Batch Selector Tabs */}
        <div className="bg-white border border-slate-200 p-3 rounded-[30px] shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar max-w-fit mx-auto">
          <button 
            onClick={() => setOverviewBatchId('all')}
            className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${overviewBatchId === 'all' ? 'bg-primary text-white shadow-lg' : 'bg-transparent text-slate-400 hover:bg-slate-50'}`}
          >
            All Analytics
          </button>
          {academicYears.sort((a, b) => b.year.localeCompare(a.year)).map(y => (
            <button 
              key={y.id}
              onClick={() => setOverviewBatchId(y.id)}
              className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${overviewBatchId === y.id ? 'bg-primary text-white shadow-lg' : 'bg-transparent text-slate-400 hover:bg-slate-50'}`}
            >
              Batch {y.year}
            </button>
          ))}
        </div>

        {/* Dynamic Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Latest Exam Spotlight */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-slate-900 rounded-[50px] p-12 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none rotate-12 group-hover:scale-110 transition-transform duration-1000">
                  <TrendingUp className="w-64 h-64" />
               </div>
               
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-8">
                    <span className="px-5 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">Latest Evolution</span>
                    <span className="text-slate-500 font-black tracking-widest text-[10px] uppercase">Paper_{latestPaperNum || 'N/A'}</span>
                 </div>

                 {topScorer ? (
                   <div className="space-y-8">
                      <div>
                        <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] mb-2 italic">Current Peak Performer</p>
                        <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none truncate max-w-full">
                           {students.find(s => s.studentId === topScorer.studentIndex)?.name || `INDEX_${topScorer.studentIndex}`}
                        </h2>
                      </div>
                      <div className="flex items-center gap-12">
                         <div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">AGGREGATE_MARK</p>
                            <p className="text-4xl font-black text-primary italic">%{topScorer.marks}</p>
                         </div>
                         <div className="w-[1px] h-12 bg-slate-800" />
                         <div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">CANDIDATE_ID</p>
                            <p className="text-4xl font-black text-white font-mono tracking-tighter">{topScorer.studentIndex}</p>
                         </div>
                      </div>
                   </div>
                 ) : (
                   <div className="py-20 text-center opacity-20 italic font-black uppercase tracking-[0.2em]">Transmission Null: Waiting for sequence sync</div>
                 )}
               </div>
            </div>

            {/* Latest Paper Leaderboard */}
            <div className="bg-white border border-slate-200 rounded-[50px] p-12 shadow-xl shadow-slate-200/30">
               <div className="flex items-center justify-between mb-12">
                  <h4 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900 border-l-4 border-primary pl-6">
                    Top 10: Paper {latestPaperNum}
                  </h4>
                  <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Batch {selectedYear?.year || 'Global'}</p>
               </div>
               
               <div className="space-y-4">
                  {top10.map((res, i) => (
                    <div key={res.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-primary transition-all">
                       <div className="flex items-center gap-6">
                          <span className={`w-10 h-10 flex items-center justify-center rounded-xl font-black italic ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white text-slate-400 group-hover:bg-white/20 group-hover:text-white'}`}>
                            #{i + 1}
                          </span>
                          <div>
                             <p className="text-xs font-black text-slate-900 uppercase group-hover:text-white transition-colors">{students.find(s => s.studentId === res.studentIndex)?.name || `STUDENT_${res.studentIndex}`}</p>
                             <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest group-hover:text-white/60">ID: {res.studentIndex}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-xl font-black italic text-primary group-hover:text-white leading-none">%{res.marks}</p>
                       </div>
                    </div>
                  ))}
                  {top10.length === 0 && <p className="text-center py-20 text-xs font-black text-slate-300 uppercase tracking-widest italic animate-pulse">Scanning database for results...</p>}
               </div>
            </div>
          </div>

          {/* All-Time Champions Per Batch */}
          <div className="lg:col-span-4 space-y-8">
             <div className="bg-white border border-slate-200 rounded-[50px] p-10 shadow-xl overflow-hidden relative">
                <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-8">
                   <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                      <Trophy className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="text-lg font-black uppercase italic tracking-tighter text-slate-900 leading-tight">Batch Champions</h4>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">All-Time Peak Records</p>
                   </div>
                </div>

                <div className="space-y-6">
                   {batchChampions.map((res: PaperResult, i) => (
                     <div key={res.id} className="flex items-center gap-5 group">
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black ${i < 3 ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-slate-50 text-slate-300 border border-slate-100'}`}>
                             {i + 1}
                          </div>
                          {i === 0 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping" />}
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="text-[10px] font-black uppercase text-slate-900 truncate tracking-tight">{students.find(s => s.studentId === res.studentIndex)?.name || `ID_${res.studentIndex}`}</p>
                           <p className="text-[8px] font-black uppercase tracking-widest text-primary/60 italic">Paper {res.paperNumber} Peak</p>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-black italic text-slate-900">%{res.marks}</p>
                        </div>
                     </div>
                   ))}
                   {batchChampions.length === 0 && <p className="text-center py-20 text-xs font-black text-slate-200 uppercase tracking-widest italic leading-relaxed">No champion data<br/>extracted yet.</p>}
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  const renderClasses = () => {
    const groupedLessons = lessons.reduce((acc, lesson) => {
      if (!acc[lesson.topic]) acc[lesson.topic] = [];
      acc[lesson.topic].push(lesson);
      return acc;
    }, {} as Record<string, Lesson[]>);

    const sortedTopics = Object.keys(groupedLessons).sort();
    const existingTopics = sortedTopics;

    return (
    <div className="space-y-12">
      <div className="bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm">
        <h3 className="text-2xl font-black mb-10 text-[#1a1a1a] flex items-center gap-4 uppercase italic tracking-tighter">
          <Plus className="w-7 h-7 text-primary/40" /> {t('dash.admin.addNewLesson')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1 space-y-2">
            <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Study Pack Access Security</label>
            <div className="flex gap-4">
              <button 
                onClick={() => setNewLesson({...newLesson, visibility: 'private' as const, videoType: 'drive' as const})}
                className={`flex-1 py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${newLesson.visibility === 'private' ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20' : 'bg-slate-50 text-[#1a1a1a] border-slate-200 hover:border-primary/20'}`}
              >
                <ShieldCheck className="w-3 h-3" /> Private (Secure)
              </button>
              <button 
                onClick={() => setNewLesson({...newLesson, visibility: 'unlisted' as const, videoType: 'youtube' as const})}
                className={`flex-1 py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${newLesson.visibility === 'unlisted' ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20' : 'bg-slate-50 text-[#1a1a1a] border-slate-200 hover:border-primary/20'}`}
              >
                <ExternalLink className="w-3 h-3" /> Unlisted (Public)
              </button>
            </div>
          </div>

          <div className="md:col-span-1 space-y-2">
            <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Target Batch (Year)</label>
            <select 
              value={newLesson.yearId} 
              onChange={e => setNewLesson({...newLesson, yearId: e.target.value})} 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold focus:outline-none focus:border-primary/30 transition-all appearance-none cursor-pointer"
            >
              <option value="">Select Year (Optional)</option>
              {academicYears.map(y => <option key={y.id} value={y.id}>{y.year}</option>)}
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
             <div className="flex justify-between items-center mb-2 px-1">
              <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em]">Study Pack (Topic)</label>
              <div className="flex bg-slate-100 p-1 rounded-lg gap-1">
                <button 
                  onClick={() => setTopicMode('existing')}
                  className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-md transition-all ${topicMode === 'existing' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
                >
                  Existing
                </button>
                <button 
                  onClick={() => setTopicMode('new')}
                  className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-md transition-all ${topicMode === 'new' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
                >
                  New
                </button>
              </div>
            </div>
            
            {topicMode === 'existing' && existingTopics.length > 0 ? (
              <select 
                value={newLesson.topic}
                onChange={e => setNewLesson({...newLesson, topic: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold focus:outline-none focus:border-primary/30 transition-all cursor-pointer"
              >
                <option value="">Choose an existing study pack...</option>
                {existingTopics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            ) : (
              <input
                type="text"
                placeholder="Enter new study pack name / topic"
                value={newLesson.topic}
                onChange={e => setNewLesson({...newLesson, topic: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-sans"
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Lesson Name (Sub Topic)</label>
            <input
              type="text"
              placeholder="Lesson Name"
              value={newLesson.subTopic}
              onChange={e => setNewLesson({...newLesson, subTopic: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-sans"
            />
          </div>
          <div className="md:col-span-1 space-y-2">
            <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Video Source Identity (URL)</label>
            <input
              type="text"
              placeholder="Video URL"
              value={newLesson.videoUrl}
              onChange={e => {
                const url = e.target.value;
                const updates: any = { videoUrl: url };
                
                if (url.includes('youtube.com') || url.includes('youtu.be')) {
                  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
                  if (match && match[1]) {
                    updates.thumbnailUrl = `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
                    updates.videoType = 'youtube';
                    
                    fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`)
                      .then(res => res.json())
                      .then(data => {
                        if (data.title) {
                          setNewLesson(prev => ({
                            ...prev, 
                            subTopic: prev.subTopic ? prev.subTopic : data.title 
                          }));
                        }
                      })
                      .catch(console.error);
                  }
                }
                setNewLesson({...newLesson, ...updates});
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-mono tracking-widest placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
            />
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="flex gap-6 items-end">
              <div className="flex-1 space-y-2">
                <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Thumbnail Preview Reference</label>
                <input
                  type="text"
                  placeholder="Thumbnail Image URL (Optional)"
                  value={newLesson.thumbnailUrl}
                  onChange={e => setNewLesson({...newLesson, thumbnailUrl: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
                />
              </div>
              {newLesson.thumbnailUrl && (
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-xl rotate-3">
                  <img 
                    src={transformImageUrl(newLesson.thumbnailUrl)} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </div>
            {topicMode === 'new' && (
              <div className="flex gap-6 items-end">
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Study Pack Cover Image</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Image URL or Upload File"
                      value={newLesson.imageUrl}
                      onChange={e => setNewLesson({...newLesson, imageUrl: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-6 pr-24 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <input 
                        type="file" 
                        accept="image/*"
                        id="cover-upload"
                        className="hidden"
                        onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'image')}
                      />
                      <label 
                        htmlFor="cover-upload"
                        className={`cursor-pointer px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isUploadingImage.loading && isUploadingImage.type === 'image' ? 'bg-slate-200 text-slate-500' : 'bg-primary text-white hover:bg-black'}`}
                      >
                        {isUploadingImage.loading && isUploadingImage.type === 'image' ? 'Uploading...' : 'Upload'}
                      </label>
                    </div>
                  </div>
                </div>
                {newLesson.imageUrl && (
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-xl -rotate-3">
                    <img 
                      src={transformImageUrl(newLesson.imageUrl)} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Stream Host Provider</label>
            <select
              value={newLesson.videoType}
              onChange={e => setNewLesson({...newLesson, videoType: e.target.value as any})}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] appearance-none cursor-pointer focus:outline-none focus:border-primary/30 transition-all"
            >
              <option value="youtube">YouTube</option>
              <option value="drive">Google Drive</option>
            </select>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Maximum Visual Access Count (Optional)</label>
              <input
                type="number"
                placeholder="Leave empty for default (2)"
                value={newLesson.maxViews}
                onChange={e => setNewLesson({...newLesson, maxViews: e.target.value === '' ? '' : parseInt(e.target.value) || ''})}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-black tracking-widest focus:outline-none focus:border-primary/30 transition-all"
              />
            </div>
          </div>
        </div>
        <button onClick={handleAddLesson} className="mt-10 bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20">
          {t('dash.admin.uploadLesson')}
        </button>
      </div>

      <div className="space-y-16">
        {sortedTopics.map(topic => (
          <div key={topic} className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-2 h-12 bg-primary rounded-full group-hover:scale-y-110 transition-transform duration-500" />
              <div>
                <h4 className="text-3xl font-black text-[#1a1a1a] uppercase italic tracking-tighter">{topic}</h4>
                <p className="text-[#1a1a1a] text-[10px] font-black uppercase tracking-[0.3em] opacity-40">{groupedLessons[topic].length} STREAMS IN THIS PACK</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupedLessons[topic].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(lesson => (
                <div key={lesson.id} className="bg-white border border-slate-200 rounded-[32px] overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="aspect-video w-full overflow-hidden relative">
                    {lesson.imageUrl || lesson.thumbnailUrl ? (
                      <img 
                        src={transformImageUrl(lesson.imageUrl || lesson.thumbnailUrl || '')} 
                        alt={lesson.topic} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-slate-300" />
                      </div>
                    )}
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/80 backdrop-blur-md text-[#1a1a1a] text-[8px] font-black uppercase tracking-[0.2em] rounded-lg border border-slate-200 shadow-sm">
                        {lesson.videoType}
                      </span>
                      <span className={`px-3 py-1 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-lg border ${(lesson.visibility as string) === 'private' ? 'bg-red-500 border-red-600' : 'bg-primary border-primary-dark'}`}>
                        {lesson.visibility || 'private'}
                      </span>
                      {lesson.yearId && (
                        <span className="px-3 py-1 bg-slate-900/10 backdrop-blur-md text-slate-900 text-[8px] font-black uppercase tracking-[0.2em] rounded-lg border border-slate-300">
                          {academicYears.find(y => y.id === lesson.yearId)?.year || 'Batch'}
                        </span>
                      )}
                    </div>
                    <div className="absolute top-6 right-6 flex gap-2">
                      <button 
                        onClick={() => {
                          const shareUrl = `${window.location.origin}/lms?lesson=${lesson.id}`;
                          const text = `අලුත් නිබන්ධනයක් දැන් ඔබට! 📚\n${lesson.topic}\nඅනුමාතෘකාව: ${lesson.subTopic}\nමෙතැනින් බලන්න: ${shareUrl}`;
                          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                        }}
                        className="p-3 bg-white/80 backdrop-blur-md text-slate-400 hover:text-green-500 rounded-xl border border-slate-200 transition-all hover:scale-110 shadow-sm"
                        title="Share to WhatsApp"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete('lessons', lesson.id)} className="p-3 bg-white/80 backdrop-blur-md text-slate-400 hover:text-red-500 rounded-xl border border-slate-200 transition-all hover:scale-110 shadow-sm" title="Delete Lesson">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-10">
                    <h4 className="text-xl font-black text-[#1a1a1a] uppercase italic tracking-tighter mb-2 group-hover:text-primary transition-colors">{lesson.subTopic}</h4>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                      <div className="flex items-center gap-3 text-[10px] text-[#1a1a1a] font-black uppercase tracking-widest">
                         Access: {lesson.maxViews || 2}X
                      </div>
                      <button onClick={() => setSelectedLesson(lesson)} className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-primary-dark transition-all">
                        Preview Terminal &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="w-full max-w-4xl">
            <button onClick={() => setSelectedLesson(null)} className="mb-4 text-white hover:text-primary transition-all">Close Preview</button>
            <VideoPlayer url={selectedLesson.videoUrl} type={selectedLesson.videoType} visibility={selectedLesson.visibility} userEmail={profile.email} isSafeZone={selectedLesson.isSafeZone} />
          </div>
        </div>
      )}
    </div>
    );
  };

  const [viewingHistory, setViewingHistory] = useState<StudentRecord | null>(null);

  const renderStudents = () => {
    const filteredStudents = students.filter(s => {
      const search = studentSearch.toLowerCase();
      const name = (s.name || "").toLowerCase();
      const id = (s.studentId || "").toLowerCase();
      const email = (s.email || "").toLowerCase();
      
      return name.includes(search) || id.includes(search) || email.includes(search);
    });

    return (
      <>
        <div className="space-y-12">
        <div className="bg-white border border-slate-200 p-6 md:p-10 rounded-[40px] shadow-sm">
          <h3 className="text-xl md:text-2xl font-black mb-10 text-[#1a1a1a] flex items-center gap-4 uppercase italic tracking-tighter">
            <Plus className="w-7 h-7 text-primary/40" /> {t('dash.admin.registerStudent')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2 lg:col-span-2">
              <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1 italic">Student Designation</label>
              <input type="text" placeholder="Full Institutional Name" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-sans" />
            </div>
            <div className="space-y-2 lg:col-span-2">
              <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1 italic">Security Credentials (Email)</label>
              <input type="email" placeholder="Official Email Address" value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-mono" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1 italic">Gov. Authentication (NIC)</label>
              <input type="text" placeholder="NIC / ID Reference" value={newStudent.nic} onChange={e => setNewStudent({...newStudent, nic: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1 italic">Batch Allocation (Year)</label>
              <select 
                value={newStudent.yearId} 
                onChange={e => setNewStudent({...newStudent, yearId: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold focus:outline-none focus:border-primary/30 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select Year</option>
                {academicYears.map(y => <option key={y.id} value={y.id}>{y.year}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1 italic">Batch Allocation (Class)</label>
              <input type="text" placeholder="Academic Class" value={newStudent.class} onChange={e => setNewStudent({...newStudent, class: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all" />
            </div>
            <div className="space-y-2 lg:col-span-2">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Prior Academic Entity</label>
              <input type="text" placeholder="School Name" value={newStudent.school} onChange={e => setNewStudent({...newStudent, school: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all" />
            </div>
            <div className="space-y-2 lg:col-span-3">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Geographic Coordinates (Address)</label>
              <input type="text" placeholder="Physical Address" value={newStudent.address} onChange={e => setNewStudent({...newStudent, address: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Direct Transmission (WhatsApp)</label>
              <input type="text" placeholder="Mobile Number" value={newStudent.whatsapp} onChange={e => setNewStudent({...newStudent, whatsapp: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-mono" />
            </div>
          </div>
          <button onClick={handleAddStudent} className="mt-10 bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20">{t('dash.admin.addStudent')}</button>
        </div>

        <div className="bg-white border border-slate-200 p-6 md:p-10 rounded-[40px] shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 italic uppercase tracking-tighter">Strategic Student Management</h3>
              <button 
                onClick={handleCopyPaidEmails}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary-dark transition-colors group"
              >
                <Copy className="w-3 h-3 group-hover:scale-110 transition-transform" />
                Copy Paid Emails (CSV)
              </button>
            </div>
            <div className="relative w-full md:w-[500px] group">
              <input 
                type="text" 
                placeholder="SEEK STUDENT BY NAME OR SERIAL..." 
                value={studentSearch}
                onChange={e => setStudentSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-5 text-slate-900 text-[10px] font-black tracking-[0.2em] focus:outline-none focus:border-primary/30 transition-all placeholder:text-slate-300"
              />
              <Users className="w-4 h-4 text-slate-300 absolute left-6 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm rounded-[40px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic border-b border-slate-100">
                  <th className="px-6 py-5">ENTITY_IDENTITY</th>
                  <th className="px-6 py-5">INDEX_SERIAL</th>
                  <th className="px-6 py-5">GOV_ID</th>
                  <th className="px-6 py-5">CLASS_NODE</th>
                  <th className="px-6 py-5">ACADEMIC_SCHOOL</th>
                  <th className="px-6 py-5">W_APP_LINK</th>
                  <th className="px-6 py-5 text-center">ACCESS_PROTOCOL ({currentMonth})</th>
                  <th className="px-6 py-5 text-right">PROTOCOLS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-6 transition-all duration-300">
                      <div className="text-xs md:text-sm font-black text-slate-900 italic uppercase tracking-tight">{student.name}</div>
                      <div className="text-[9px] text-slate-400 font-medium truncate max-w-[150px] italic">{student.address}</div>
                    </td>
                    <td className="px-6 py-6 text-[11px] text-slate-500 font-mono tracking-widest">{student.studentId?.replace('YA-2026-', '')}</td>
                    <td className="px-6 py-6 text-[11px] text-slate-400 font-mono tracking-tight">{student.nic}</td>
                    <td className="px-6 py-6 text-[11px] text-slate-500 font-black uppercase italic">{student.class}</td>
                    <td className="px-6 py-6 text-[11px] text-slate-400 uppercase font-bold tracking-tight">{student.school}</td>
                    <td className="px-6 py-6 text-[11px] text-slate-400 font-mono">{student.whatsapp}</td>
                    <td className="px-6 py-6 text-center">
                      <button 
                        onClick={() => togglePayment(student.id, currentMonth, student.payments?.[currentMonth] || false)}
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center mx-auto transition-all text-xs font-black ${
                          student.payments?.[currentMonth] 
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                            : 'bg-slate-50 border-slate-200 text-slate-300 hover:border-primary/20 hover:text-slate-400'
                        }`}
                      >
                        {student.payments?.[currentMonth] ? '✓' : '✕'}
                      </button>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setEditingStudent(student)}
                          className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-primary transition-all group-hover:scale-105 shadow-sm"
                          title="Modify Record"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => setViewingHistory(student)}
                          className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-primary transition-all group-hover:scale-105 shadow-sm"
                          title="Audit History"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete('students', student.id)} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group-hover:scale-105 shadow-sm" title="Delete Student">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* History Modal */}
      <AnimatePresence>
        {viewingHistory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 w-full max-w-md shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-4 italic uppercase tracking-tighter text-slate-900">{t('dash.admin.paymentHistory')}</h3>
              <p className="text-slate-400 text-sm mb-6 font-medium italic">{t('dash.admin.historyFor')} <span className="text-slate-900 font-black">{viewingHistory.name}</span></p>
              
              <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries(viewingHistory.payments || {}).sort((a, b) => b[0].localeCompare(a[0])).map(([month, paid]) => (
                  <div key={month} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm font-black text-slate-900 italic">{month}</span>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${paid ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                      {paid ? t('dash.admin.paid') : t('dash.admin.unpaid')}
                    </span>
                  </div>
                ))}
                {(!viewingHistory.payments || Object.keys(viewingHistory.payments).length === 0) && (
                  <div className="flex flex-col items-center py-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                      <BookOpen className="w-8 h-8 text-slate-200" />
                    </div>
                    <p className="text-center text-slate-300 italic text-xs font-medium">{t('dash.admin.noHistory')}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="text-sm font-black mb-4 flex items-center gap-2 uppercase italic tracking-tighter text-slate-900">
                  <Video className="w-4 h-4 text-primary" /> Video View History
                </h4>
                <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
                  {Object.entries(viewingHistory.videoViews || {}).map(([lessonId, views]) => {
                    const lesson = lessons.find(l => l.id === lessonId);
                    return (
                      <div key={lessonId} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex-1 min-w-0 mr-4">
                          <p className="text-xs font-black truncate text-slate-900 italic uppercase">{lesson?.topic || 'Unknown Lesson'}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{views} / {lesson?.maxViews || 2} views</p>
                        </div>
                        <button 
                          onClick={async () => {
                            if (confirm(`Reset views for "${lesson?.topic}"?`)) {
                              await updateDoc(doc(db, 'students', viewingHistory.id), {
                                [`videoViews.${lessonId}`]: 0
                              });
                              setViewingHistory({...viewingHistory, videoViews: {...viewingHistory.videoViews, [lessonId]: 0}});
                            }
                          }}
                          className="text-[10px] text-primary hover:underline font-black uppercase tracking-widest"
                        >
                          Reset
                        </button>
                      </div>
                    );
                  })}
                  {(!viewingHistory.videoViews || Object.keys(viewingHistory.videoViews).length === 0) && (
                    <p className="text-center text-slate-300 py-4 italic text-xs font-medium">No video views recorded yet.</p>
                  )}
                </div>
              </div>

              <button 
                onClick={() => setViewingHistory(null)}
                className="w-full mt-8 bg-slate-900 text-white font-black uppercase italic tracking-widest py-3 rounded-xl hover:bg-slate-800 transition-all text-sm"
              >
                {t('dash.admin.close')}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Student Modal */}
      <AnimatePresence>
        {editingStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 w-full max-w-2xl shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">Edit Student Record</h3>
                <button onClick={() => setEditingStudent(null)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic">Full Name</label>
                  <input type="text" value={editingStudent.name} onChange={e => setEditingStudent({...editingStudent, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-medium focus:outline-none focus:border-primary/30" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic">Email (Read Only)</label>
                  <input type="email" value={editingStudent.email} disabled className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-400 text-sm font-medium opacity-60 cursor-not-allowed" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic">Index Number</label>
                  <input type="text" value={editingStudent.studentId} onChange={e => setEditingStudent({...editingStudent, studentId: e.target.value, indexNumber: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-mono tracking-widest focus:outline-none focus:border-primary/30" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic">NIC / ID Number</label>
                  <input type="text" value={editingStudent.nic} onChange={e => setEditingStudent({...editingStudent, nic: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-medium focus:outline-none focus:border-primary/30" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic">Exam Year</label>
                  <select 
                    value={editingStudent.yearId || ''} 
                    onChange={e => setEditingStudent({...editingStudent, yearId: e.target.value})} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-primary/30"
                  >
                    <option value="">Select Year</option>
                    {academicYears.map(y => <option key={y.id} value={y.id}>{y.year}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic">Class</label>
                  <input type="text" value={editingStudent.class} onChange={e => setEditingStudent({...editingStudent, class: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-black uppercase italic focus:outline-none focus:border-primary/30" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic">School</label>
                  <input type="text" value={editingStudent.school} onChange={e => setEditingStudent({...editingStudent, school: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-bold uppercase focus:outline-none focus:border-primary/30" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic">WhatsApp</label>
                  <input type="text" value={editingStudent.whatsapp} onChange={e => setEditingStudent({...editingStudent, whatsapp: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-mono tracking-widest focus:outline-none focus:border-primary/30" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic">Address</label>
                  <input type="text" value={editingStudent.address} onChange={e => setEditingStudent({...editingStudent, address: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-medium italic focus:outline-none focus:border-primary/30" />
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setEditingStudent(null)}
                  className="flex-1 bg-slate-50 border border-slate-200 text-slate-400 font-black uppercase italic tracking-widest py-4 rounded-xl hover:bg-slate-100 transition-all text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateStudent}
                  className="flex-1 bg-primary text-white font-black uppercase italic tracking-widest py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-sm shadow-xl shadow-primary/20"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </>
    );
  };

  const renderLive = () => (
    <div className="space-y-12">
      <div className="bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm">
        <h3 className="text-2xl font-black mb-10 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter">
          <Plus className="w-7 h-7 text-primary/40" /> {t('dash.admin.broadcastAnnouncement')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Session Headline</label>
            <input
              type="text"
              placeholder="Session Title"
              value={newClass.title}
              onChange={e => setNewClass({...newClass, title: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Meeting Destination (Link)</label>
            <input
              type="text"
              placeholder="Session Link"
              value={newClass.link}
              onChange={e => setNewClass({...newClass, link: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-mono tracking-widest placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Classification Target</label>
            <select
              value={newClass.type}
              onChange={e => setNewClass({...newClass, type: e.target.value as any})}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-600 appearance-none cursor-pointer focus:outline-none focus:border-primary/30 transition-all"
            >
              <option value="today">LIVE_TRANSMISSION</option>
              <option value="group">RESOURCE_NODE</option>
            </select>
          </div>
          <div className="flex items-end">
            
  <button
    type="button"
    onClick={() => setShowZoomSync(true)}
    className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl px-6 py-5 text-xs font-black uppercase tracking-widest transition-all mb-4"
  >
    Sync Zoom Meeting
  </button>
  <button onClick={handleAddClass} className="w-full bg-primary text-white font-black uppercase italic tracking-[0.2em] py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20">
              BROADCAST
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {onlineClasses.map(cls => (
          <div key={cls.id} className="bg-white border border-slate-200 p-10 rounded-[32px] relative overflow-hidden group hover:border-primary/20 transition-all duration-500 shadow-sm">
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${cls.type === 'zoom' ? 'bg-primary animate-pulse' : 'bg-indigo-500 animate-pulse'}`} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">LIVE_{cls.type}</span>
              </div>
              <button onClick={() => handleDelete('onlineClasses', cls.id)} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 transition-all hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <h4 className="text-2xl font-black text-slate-900 italic tracking-tighter uppercase mb-2 relative z-10 group-hover:text-primary transition-colors">{cls.title}</h4>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest truncate mb-10 relative z-10 opacity-50">{cls.link}</p>
            
            <a 
              href={cls.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-primary-dark transition-colors relative z-10"
            >
               VALDIATE LINK &rarr;
            </a>

            <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
               <Video className="w-32 h-32 text-primary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAdmins = () => (
    <div className="space-y-12">
      <div className="bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm">
        <h3 className="text-2xl font-black mb-10 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter">
          <ShieldCheck className="w-7 h-7 text-primary/40" /> {t('dash.admin.authorizeNew')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Admin Security Email</label>
            <input 
              type="email" 
              placeholder="Google Account Email" 
              value={newAuthAdmin.email} 
              onChange={e => setNewAuthAdmin({...newAuthAdmin, email: e.target.value})} 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-mono" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Security Access Token</label>
            <input 
              type="text" 
              placeholder="Designate Token" 
              value={newAuthAdmin.password} 
              onChange={e => setNewAuthAdmin({...newAuthAdmin, password: e.target.value})} 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-mono tracking-widest placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-mono" 
            />
          </div>
        </div>
        <button onClick={handleAddAuthAdmin} className="mt-10 bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20">
          Commit Authorization
        </button>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-[40px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic border-b border-slate-100">
                <th className="px-10 py-6">ADMINISTRATOR_ID</th>
                <th className="px-10 py-6">SECURITY_TOKEN</th>
                <th className="px-10 py-6 text-right">PROTOCOLS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {authorizedAdmins.map(admin => (
                <tr key={admin.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-8 text-sm font-black text-slate-900 uppercase tracking-tight italic">{admin.email}</td>
                  <td className="px-10 py-8 text-xs text-slate-500 font-mono tracking-widest">{admin.password}</td>
                  <td className="px-10 py-8 text-right">
                    <button onClick={() => handleDelete('authorizedAdmins', admin.id)} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group-hover:scale-110 shadow-sm">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const paperNumRef = React.useRef<HTMLInputElement>(null);
  const studentIndexRef = React.useRef<HTMLInputElement>(null);
  const marksRef = React.useRef<HTMLInputElement>(null);

  const renderMarks = () => {
    const filteredResults = paperResults.filter(r => {
      const yearMatch = marksFilterYear === 'all' || r.yearId === marksFilterYear;
      const paperMatch = marksFilterPaper === 'all' || r.paperNumber === marksFilterPaper;
      return yearMatch && paperMatch;
    });

    return (
      <div className="space-y-12 pb-20">
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 p-10 rounded-[45px] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <BarChart3 className="w-32 h-32 text-primary" />
              </div>

              <h3 className="text-2xl font-black mb-10 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter relative z-10">
                {t('dash.admin.uploadMarks')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Batch Year</label>
                  <div className="relative">
                    <select 
                      value={newPaperResult.yearId}
                      onChange={e => setNewPaperResult({...newPaperResult, yearId: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-black tracking-widest focus:outline-none focus:border-primary/30 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select Batch</option>
                      {academicYears.map(y => (
                        <option key={y.id} value={y.id}>{y.year} BATCH</option>
                      ))}
                    </select>
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Exam Reference</label>
                  <input 
                    ref={paperNumRef}
                    type="number" 
                    value={newPaperResult.paperNumber} 
                    onChange={e => setNewPaperResult({...newPaperResult, paperNumber: parseInt(e.target.value) || 1})}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') studentIndexRef.current?.focus();
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-black tracking-widest focus:outline-none focus:border-primary/30 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Candidate Index</label>
                  <input 
                    ref={studentIndexRef}
                    type="text" 
                    placeholder="e.g. 0001"
                    value={newPaperResult.studentIndex} 
                    onChange={e => setNewPaperResult({...newPaperResult, studentIndex: e.target.value})}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') marksRef.current?.focus();
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-mono" 
                  />
                  {newPaperResult.studentIndex && students.find(s => s.studentId === newPaperResult.studentIndex) && (
                    <p className="text-[8px] text-primary font-black uppercase tracking-widest px-1 mt-2 animate-pulse">
                      Identified: {students.find(s => s.studentId === newPaperResult.studentIndex)?.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Aggregate (%)</label>
                  <input 
                    ref={marksRef}
                    type="number" 
                    placeholder="0-100"
                    value={newPaperResult.marks} 
                    onChange={e => setNewPaperResult({...newPaperResult, marks: parseInt(e.target.value) || 0})}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddPaperResult();
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-black tracking-widest focus:outline-none focus:border-primary/30 transition-all font-mono" 
                  />
                </div>
              </div>
              <button onClick={handleAddPaperResult} className="mt-10 bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-103 active:scale-95 transition-all text-sm shadow-xl shadow-primary/20 w-full md:w-auto">
                Commit Record & Sync Standings
              </button>
            </div>

            <div className="bg-white border border-slate-200 shadow-sm rounded-[45px] overflow-hidden">
               <div className="bg-slate-50/50 px-10 py-6 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Transmitted Sequence Data</h4>
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">{filteredResults.length} RECORDS FOUND</span>
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
                      <th className="px-10 py-6">NAME</th>
                      <th className="px-10 py-6">AGGREGATE</th>
                      <th className="px-10 py-6 text-right">STANDING</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredResults.sort((a, b) => b.paperNumber - a.paperNumber || b.marks - a.marks).map(res => {
                      const student = students.find(s => s.studentId === res.studentIndex || s.indexNumber === res.studentIndex);
                      return (
                        <tr key={res.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-10 py-8">
                            <button onClick={() => handleDelete('paperResults', res.id)} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group-hover:scale-110 shadow-sm hover:rotate-12">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                          <td className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                            {academicYears.find(y => y.id === res.yearId)?.year || 'N/A'}
                          </td>
                          <td className="px-10 py-8 text-sm font-black text-slate-900 uppercase tracking-tight italic">PAPER_{res.paperNumber}</td>
                          <td className="px-10 py-8 text-xs text-slate-500 font-mono tracking-widest group-hover:text-primary transition-colors">{res.studentIndex}</td>
                          <td className="px-10 py-8 text-[10px] font-bold text-slate-900 uppercase tracking-wide truncate max-w-[150px]" title={student?.name}>
                            {student?.name || 'UNKNOWN_NODE'}
                          </td>
                          <td className="px-10 py-8 text-xl font-black text-slate-900 italic tracking-tighter">{res.marks}%</td>
                          <td className="px-10 py-8 text-right">
                            <span className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all group-hover:bg-primary group-hover:text-white group-hover:border-primary shadow-sm">#{res.rank}</span>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredResults.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-10 py-32 text-center">
                          <Microscope className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                          <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest italic opacity-50">No sequence data found matching the current matrix configuration.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </div>
    );
  };

  const IconMap: Record<string, any> = {
    Microscope, Dna, Heart, Brain, Activity, GraduationCap, BookOpen, MapPin, Lightbulb, FileText, CalendarCheck, CheckCircle2, Clock
  };

  const getImagePath = (path: string | undefined | null) => {
    if (!path || typeof path !== 'string' || path.trim() === '') return undefined;
    
    // Robustness: Reject if contains spaces or is too long (likely not a path)
    if (path.trim().includes(' ') || path.trim().length > 200) {
      return undefined;
    }

    if (path.startsWith('http') || path.startsWith('data:')) {
      return transformImageUrl(path) || undefined;
    }
    const cleanPath = path.trim().startsWith('/') ? path.trim() : `/${path.trim()}`;
    const base = ((import.meta as any).env.BASE_URL || '/').replace(/\/$/, '');
    return `${base}${cleanPath}`;
  };

  const renderHomeManager = () => (
    <div className={`space-y-12 ${homePreviewMode ? 'lg:grid lg:grid-cols-2 lg:gap-12 lg:space-y-0' : ''}`}>
      {/* Configuration Column */}
      <div className="space-y-8 max-h-[85vh] overflow-y-auto pr-4 custom-scrollbar">
        <div className="flex items-center justify-between sticky top-0 bg-slate-50 z-20 pb-4">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">Nexus_Home_Core</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                if (window.confirm("Reset all hero slides to default local images?")) {
                  setHomeContent({
                    ...homeContent,
                    heroSlides: [
                      { id: 's1', title: 'Bio_EXCELLENCE', subtitle: 'MASTER THE ELEMENTS', imageUrl: '/1.avif', ctaText: 'Join_Now', ctaUrl: '/lms', titleFontSize: 10, titleFontSizeMobile: 4 },
                      { id: 's2', title: 'ADVANCED_CONCEPTS', subtitle: 'BEYOND THE BASICS', imageUrl: '/2.avif', ctaText: 'Explore', ctaUrl: '/lms', titleFontSize: 10, titleFontSizeMobile: 4 },
                      { id: 's3', title: 'FUTURE_SCIENCE', subtitle: 'INNOVATIVE LEARNING', imageUrl: '/3.avif', ctaText: 'Get_Started', ctaUrl: '/lms', titleFontSize: 10, titleFontSizeMobile: 4 }
                    ]
                  });
                }
              }}
              className="px-4 py-2 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-100 hover:bg-red-500 hover:text-white transition-all shrink-0"
            >
              Reset_Slides
            </button>
            <button 
              onClick={() => setHomePreviewMode(!homePreviewMode)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${homePreviewMode ? 'bg-primary text-black' : 'bg-slate-200 text-slate-500'}`}
            >
              {homePreviewMode ? 'Close_Preview' : 'Live_Preview'}
            </button>
          </div>
        </div>
        {/* Global Identity */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Teacher Identity
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 block mb-2">Teacher Full Name</label>
              <input type="text" value={homeContent.teacherName} onChange={e => setHomeContent({...homeContent, teacherName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 block mb-2">Teacher Methodology</label>
              <input type="text" value={homeContent.teacherMethodology} onChange={e => setHomeContent({...homeContent, teacherMethodology: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 block mb-2">Core Image (Avatar/Icons)</label>
              <input type="text" value={homeContent.teacherImageUrl} onChange={e => setHomeContent({...homeContent, teacherImageUrl: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 block mb-2">Allowed Domain (for YouTube Player)</label>
              <input 
                type="text" 
                placeholder={typeof window !== 'undefined' ? window.location.origin : ''} 
                value={homeContent.allowedDomain || ''} 
                onChange={e => setHomeContent({...homeContent, allowedDomain: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 font-mono" 
              />
              <p className="text-[8px] text-slate-400 mt-1 px-1">Default: {typeof window !== 'undefined' ? window.location.origin : ''}</p>
            </div>
          </div>
        </div>

        {/* Hero Protocols - Simplified for 3 Texts Only */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-primary" /> Hero Slides (Text Content)
          </h3>
          
          <div className="space-y-6">
            {(homeContent.heroSlides || []).map((slide, idx) => (
              <div key={slide.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase text-primary italic">Slide_0{idx + 1}</span>
                  <button 
                    onClick={() => {
                      const slides = [...(homeContent.heroSlides || [])];
                      slides.splice(idx, 1);
                      setHomeContent({...homeContent, heroSlides: slides});
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="text-[8px] font-black uppercase text-slate-400 px-1 mb-1 block italic">Title</label>
                    <input 
                      type="text" 
                      value={slide.title} 
                      onChange={e => {
                        const slides = [...(homeContent.heroSlides || [])];
                        slides[idx] = { ...slide, title: e.target.value };
                        setHomeContent({...homeContent, heroSlides: slides});
                      }}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[8px] font-black uppercase text-slate-400 px-1 mb-1 block italic">Subtitle</label>
                      <input 
                        type="text" 
                        value={slide.subtitle} 
                        onChange={e => {
                          const slides = [...(homeContent.heroSlides || [])];
                          slides[idx] = { ...slide, subtitle: e.target.value };
                          setHomeContent({...homeContent, heroSlides: slides});
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] font-black uppercase text-slate-400 px-1 mb-1 block italic">Background Image</label>
                      <div className="flex gap-2">
                        <select 
                          value={['/1.avif', '/2.avif', '/3.avif'].includes(slide.imageUrl || '') ? slide.imageUrl : 'custom'}
                          onChange={e => {
                            const val = e.target.value;
                            const slides = [...(homeContent.heroSlides || [])];
                            if (val !== 'custom') {
                              slides[idx] = { ...slide, imageUrl: val };
                              setHomeContent({...homeContent, heroSlides: slides});
                            }
                          }}
                          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-900 appearance-none cursor-pointer"
                        >
                          <option value="/1.avif">Local: Image 01</option>
                          <option value="/2.avif">Local: Image 02</option>
                          <option value="/3.avif">Local: Image 03</option>
                          <option value="custom">-- Custom / External --</option>
                        </select>
                        {getImagePath(slide.imageUrl) && (
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0 shadow-sm bg-slate-100">
                             <img src={getImagePath(slide.imageUrl)} className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = ''} />
                          </div>
                        )}
                      </div>
                      {(!['/1.avif', '/2.avif', '/3.avif'].includes(slide.imageUrl || '') || slide.imageUrl === '') && (
                        <input 
                          type="text"
                          placeholder="Paste External Image URL"
                          value={slide.imageUrl}
                          onChange={e => {
                            const slides = [...(homeContent.heroSlides || [])];
                            slides[idx] = { ...slide, imageUrl: e.target.value };
                            setHomeContent({...homeContent, heroSlides: slides});
                          }}
                          className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-[10px] font-mono focus:outline-none focus:border-primary/50"
                        />
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[8px] font-black uppercase text-slate-400 px-1 mb-1 block italic">Button Text</label>
                      <input 
                        type="text" 
                        value={slide.ctaText || ''} 
                        onChange={e => {
                          const slides = [...(homeContent.heroSlides || [])];
                          slides[idx] = { ...slide, ctaText: e.target.value };
                          setHomeContent({...homeContent, heroSlides: slides});
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] font-black uppercase text-slate-400 px-1 mb-1 block italic">Button URL</label>
                      <input 
                        type="text" 
                        value={slide.ctaUrl || ''} 
                        onChange={e => {
                          const slides = [...(homeContent.heroSlides || [])];
                          slides[idx] = { ...slide, ctaUrl: e.target.value };
                          setHomeContent({...homeContent, heroSlides: slides});
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button 
              onClick={() => {
                const slides = homeContent.heroSlides || [];
                const localImage = LOCAL_SLIDES[slides.length % LOCAL_SLIDES.length].imageUrl;
                setHomeContent({...homeContent, heroSlides: [...slides, { 
                  id: Date.now().toString(),
                  title: 'NEW_SLIDE_TITLE',
                  subtitle: 'NEW_SUBTITLE',
                  ctaText: 'EXPLORE',
                  ctaUrl: '/lms',
                  imageUrl: localImage, 
                  titleFontSize: 10,
                  titleFontSizeMobile: 4
                }]});
              }}
              className="w-full bg-slate-900 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all border border-white/10"
            >
              Add_New_Slide_Layer
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2">
            <Type className="w-5 h-5 text-primary" /> About Section
          </h3>
          <div className="space-y-4">
            <input placeholder="About Title" type="text" value={homeContent.aboutTitle} onChange={e => setHomeContent({...homeContent, aboutTitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold" />
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 block mb-1">Teacher Profile Image (Use /1.avif for local or an external URL)</label>
              <div className="flex gap-4">
                <input type="text" value={homeContent.teacherAboutUrl} onChange={e => setHomeContent({...homeContent, teacherAboutUrl: e.target.value})} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50" />
                {getImagePath(homeContent.teacherAboutUrl) && (
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex-shrink-0">
                    <img src={getImagePath(homeContent.teacherAboutUrl)} className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = ''} />
                  </div>
                )}
              </div>
            </div>
            <textarea placeholder="About Description (HTML)" rows={6} value={homeContent.aboutRichText} onChange={e => setHomeContent({...homeContent, aboutRichText: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none" />
          </div>
        </div>

        {/* Sync Protocol (Work Process) */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Sync Protocol Steps
          </h3>
          <div className="space-y-4 mb-8">
            <input placeholder="Step Title" type="text" value={newProcessStep.title} onChange={e => setNewProcessStep({...newProcessStep, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" />
            <textarea placeholder="Step Description" value={newProcessStep.description} onChange={e => setNewProcessStep({...newProcessStep, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs resize-none" rows={2} />
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {Object.keys(IconMap).map(icon => (
                <button 
                  key={icon}
                  onClick={() => setNewProcessStep({...newProcessStep, icon})}
                  className={`p-3 rounded-lg border flex items-center justify-center transition-all ${newProcessStep.icon === icon ? 'bg-primary/20 border-primary' : 'bg-slate-50 border-slate-100'}`}
                  title={icon}
                >
                  {React.createElement(IconMap[icon] || BookOpen, { className: "w-4 h-4 text-slate-600" })}
                </button>
              ))}
            </div>
            <button 
              onClick={() => {
                const steps = homeContent.processSteps || [];
                setHomeContent({...homeContent, processSteps: [...steps, { ...newProcessStep, id: Date.now().toString() }]});
                setNewProcessStep({ title: '', description: '', icon: 'Activity' });
              }}
              className="w-full bg-slate-900 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all"
            >
              Add_Protocol_Step
            </button>
          </div>
          <div className="space-y-3">
            {(homeContent.processSteps || []).map((step, idx) => (
              <div key={step.id} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary border border-slate-100">
                      {React.createElement(IconMap[step.icon] || BookOpen, { className: "w-4 h-4" })}
                   </div>
                   <span className="text-[10px] font-black uppercase italic tracking-tight">{step.title}</span>
                </div>
                <button 
                  onClick={() => {
                    const steps = [...(homeContent.processSteps || [])];
                    steps.splice(idx, 1);
                    setHomeContent({...homeContent, processSteps: steps});
                  }}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Special Program Protocols */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" /> Special Program Features
          </h3>
          <div className="space-y-4">
            <input placeholder="Section Title" type="text" value={homeContent.specialTitle} onChange={e => setHomeContent({...homeContent, specialTitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
            <input placeholder="Section Subtitle" type="text" value={homeContent.specialSubtitle} onChange={e => setHomeContent({...homeContent, specialSubtitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
            <textarea placeholder="Section Description" value={homeContent.specialDesc} onChange={e => setHomeContent({...homeContent, specialDesc: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none" rows={3} />
            
            <div className="border-t border-slate-100 pt-6 mt-6">
              <p className="text-[10px] font-black uppercase tracking-widest mb-4">Add Highlight Feature</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input placeholder="Feature Title" type="text" value={newFeature.title} onChange={e => setNewFeature({...newFeature, title: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" />
                <input placeholder="Feature Description" type="text" value={newFeature.description} onChange={e => setNewFeature({...newFeature, description: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" />
              </div>
              <button 
                onClick={() => {
                  const features = homeContent.specialFeatures || [];
                  setHomeContent({...homeContent, specialFeatures: [...features, { ...newFeature, id: Date.now().toString(), icon: 'Play' }]});
                  setNewFeature({ title: '', description: '', icon: 'Play' });
                }}
                className="w-full bg-slate-100 text-slate-900 font-black py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all mb-6"
              >
                Insert_Feature_Node
              </button>

              <div className="space-y-2">
                {(homeContent.specialFeatures || []).map((feat, idx) => (
                  <div key={feat.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                    <span className="text-[10px] font-bold uppercase truncate max-w-[200px]">{feat.title}</span>
                    <button 
                      onClick={() => {
                        const features = [...(homeContent.specialFeatures || [])];
                        features.splice(idx, 1);
                        setHomeContent({...homeContent, specialFeatures: features});
                      }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Telegram Transmission Grid */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2">
             <MessageCircle className="w-5 h-5 text-primary" /> Telegram Channels
          </h3>
          <div className="space-y-4">
            <input placeholder="Channels Section Title" type="text" value={homeContent.telegramTitle} onChange={e => setHomeContent({...homeContent, telegramTitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
            <input placeholder="Channels Section Subtitle" type="text" value={homeContent.telegramSubtitle} onChange={e => setHomeContent({...homeContent, telegramSubtitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
            
            <div className="border-t border-slate-100 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input placeholder="Channel Name" type="text" value={newTelegram.name} onChange={e => setNewTelegram({...newTelegram, name: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" />
                <input placeholder="Channel URL" type="text" value={newTelegram.url} onChange={e => setNewTelegram({...newTelegram, url: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" />
                <input placeholder="Cover Image URL" type="text" value={newTelegram.imageUrl} onChange={e => setNewTelegram({...newTelegram, imageUrl: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs md:col-span-2" />
              </div>
              <button 
                onClick={() => {
                  const chans = homeContent.telegramChannels || [];
                  setHomeContent({...homeContent, telegramChannels: [...chans, { ...newTelegram, id: Date.now().toString() }]});
                  setNewTelegram({ name: '', url: '', imageUrl: '' });
                }}
                className="w-full bg-slate-100 text-slate-900 font-black py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all mb-6"
              >
                Deploy_Channel_Link
              </button>

              <div className="grid grid-cols-3 gap-2">
                {(homeContent.telegramChannels || []).map((chan, idx) => (
                  <div key={chan.id} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-100">
                    <img src={transformImageUrl(chan.imageUrl)} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => {
                        const chans = [...(homeContent.telegramChannels || [])];
                        chans.splice(idx, 1);
                        setHomeContent({...homeContent, telegramChannels: chans});
                      }}
                      className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Vector Nodes */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2">
             <MapPin className="w-5 h-5 text-primary" /> Contact & HQ Identity
          </h3>
          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <input placeholder="Contact Title" type="text" value={homeContent.contactTitle} onChange={e => setHomeContent({...homeContent, contactTitle: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                <input placeholder="Contact Subtitle" type="text" value={homeContent.contactSubtitle} onChange={e => setHomeContent({...homeContent, contactSubtitle: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
             </div>
             <input placeholder="Physical HQ Address" type="text" value={homeContent.contactAddress} onChange={e => setHomeContent({...homeContent, contactAddress: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
             <div className="grid grid-cols-2 gap-4">
                <input placeholder="Hotline" type="text" value={homeContent.contactPhone} onChange={e => setHomeContent({...homeContent, contactPhone: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                <input placeholder="Email Node" type="text" value={homeContent.contactEmail} onChange={e => setHomeContent({...homeContent, contactEmail: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
             </div>
          </div>
        </div>

        {/* Neural Network (Social) Links */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2">
             <ExternalLink className="w-5 h-5 text-primary" /> Transmission Nodes (Socials)
          </h3>
          <div className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Facebook</label>
                   <input type="text" value={homeContent.facebookUrl} onChange={e => setHomeContent({...homeContent, facebookUrl: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" />
                </div>
                <div>
                   <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1 block">YouTube</label>
                   <input type="text" value={homeContent.youtubeUrl} onChange={e => setHomeContent({...homeContent, youtubeUrl: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" />
                </div>
                <div>
                   <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1 block">WhatsApp</label>
                   <input type="text" value={homeContent.whatsappUrl} onChange={e => setHomeContent({...homeContent, whatsappUrl: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" />
                </div>
                <div>
                   <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Instagram</label>
                   <input type="text" value={homeContent.instagramUrl} onChange={e => setHomeContent({...homeContent, instagramUrl: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" />
                </div>
             </div>
          </div>
        </div>

        {/* Gallery Section Controls */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" /> Gallery Section
          </h3>
          <div className="space-y-4">
            <input placeholder="Gallery Section Title" type="text" value={homeContent.galleryTitle} onChange={e => setHomeContent({...homeContent, galleryTitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
            <input placeholder="Gallery Section Subtitle" type="text" value={homeContent.gallerySubtitle} onChange={e => setHomeContent({...homeContent, gallerySubtitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
          </div>
        </div>

        {/* Teacher Bio & Video Section */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-slate-900 flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" /> Teacher Bio & Video
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold px-1">Bio Section Title</label>
                <input type="text" value={homeContent.teacherBioTitle} onChange={e => setHomeContent({...homeContent, teacherBioTitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900" />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold px-1">Video URL (YouTube/Drive)</label>
                <input type="text" value={homeContent.teacherVideoUrl} onChange={e => setHomeContent({...homeContent, teacherVideoUrl: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-bold px-1">Detailed Bio Text</label>
              <textarea rows={8} value={homeContent.teacherBioText} onChange={e => setHomeContent({...homeContent, teacherBioText: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-primary/50 resize-none font-sans" />
            </div>
          </div>
        </div>

        {/* Results & Elite Performance */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Results Performance Node
          </h3>
          <div className="space-y-4">
             <input placeholder="Results Section Title" type="text" value={homeContent.resultsTitle} onChange={e => setHomeContent({...homeContent, resultsTitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
             <input placeholder="Results Banner Image URL" type="text" value={homeContent.resultsImageUrl} onChange={e => setHomeContent({...homeContent, resultsImageUrl: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
             <div className="grid grid-cols-2 gap-4">
                <input placeholder="CTA Text (View Results)" type="text" value={homeContent.resultsCtaText} onChange={e => setHomeContent({...homeContent, resultsCtaText: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                <input placeholder="CTA URL" type="text" value={homeContent.resultsCtaUrl} onChange={e => setHomeContent({...homeContent, resultsCtaUrl: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
             </div>
          </div>
        </div>

        {/* Gallery Moments */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black uppercase italic text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" /> Gallery Moments
            </h3>
            <span className="text-[8px] font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full text-slate-500">
              {homePosts.length} Active_Feeds
            </span>
          </div>
          
          <div className="space-y-4 mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <input placeholder="Moment Title" type="text" value={newHomePost.title} onChange={e => setNewHomePost({...newHomePost, title: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs" />
            <input placeholder="Image URL" type="text" value={newHomePost.imageUrl} onChange={e => setNewHomePost({...newHomePost, imageUrl: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs" />
            <button 
              onClick={handleAddHomePost}
              className="w-full bg-slate-900 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all"
            >
              Add_Moment_to_Feed
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {homePosts.map(post => (
              <div key={post.id} className="relative group aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img src={transformImageUrl(post.imageUrl)} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                  <button onClick={() => handleDelete('home/posts', post.id)} className="self-end p-2 bg-red-500 text-white rounded-lg hover:scale-110 transition-transform">
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <p className="text-[10px] text-white font-black uppercase truncate">{post.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Highlights */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black uppercase italic text-slate-900 flex items-center gap-2">
              <Play className="w-5 h-5 text-primary" /> Video Highlights
            </h3>
            <span className="text-[8px] font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full text-slate-500">
              {homeVideos.length} Active_Nodes
            </span>
          </div>

          <div className="space-y-4 mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <input placeholder="Video Title" type="text" value={newHomeVideo.title} onChange={e => setNewHomeVideo({...newHomeVideo, title: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs" />
            <input placeholder="Youtube/Embed URL" type="text" value={newHomeVideo.videoUrl} onChange={e => setNewHomeVideo({...newHomeVideo, videoUrl: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs" />
            <button 
              onClick={handleAddHomeVideo}
              className="w-full bg-slate-900 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all"
            >
              Connect_Video_Stream
            </button>
          </div>

          <div className="space-y-3">
             {homeVideos.map(v => (
               <div key={v.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Video className="w-4 h-4 text-primary" />
                     </div>
                     <div>
                        <p className="text-xs font-black text-slate-900 uppercase italic">{v.title}</p>
                        <p className="text-[8px] text-slate-400 font-medium truncate max-w-[150px]">{v.videoUrl}</p>
                     </div>
                  </div>
                  <button onClick={() => handleDelete('home/videos', v.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                     <Trash2 className="w-4 h-4" />
                  </button>
               </div>
             ))}
          </div>
        </div>

        {/* Global Save */}
        <button 
          onClick={async () => {
            await setDoc(doc(db, 'home_content', 'main'), homeContent);
            alert('Nexus Terminal Updated Successfully.');
          }}
          className="w-full bg-primary text-black font-black uppercase italic tracking-[0.2em] py-6 rounded-[2rem] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm sticky bottom-0 z-30"
        >
          Initialize_Global_Sync
        </button>
      </div>

      {/* Live Preview Column */}
      {homePreviewMode && (
        <div className="hidden lg:block h-[85vh] sticky top-0 rounded-[3rem] overflow-hidden border-8 border-slate-900 shadow-2xl bg-black">
          <div className="h-full overflow-y-auto custom-scrollbar">
             {/* Mock Home Render (Simplified for Preview) */}
             <div className="scale-[0.5] origin-top w-[200%] bg-[#050505] text-white">
                <header className="py-10 px-12 flex justify-between items-center border-b border-white/5">
                   <div className="text-4xl font-black italic uppercase tracking-tighter">{homeContent.teacherName?.split(' ')[0]} <span className="text-primary tracking-tighter">{homeContent.teacherName?.split(' ')[1]}</span></div>
                   <div className="px-12 py-5 bg-white text-black text-2xl font-black uppercase tracking-widest rounded-full">NEXUS_SYNC</div>
                </header>
                
                {homeContent.heroSlides?.length ? (
                  <div className="relative h-[800px] flex items-center px-20">
                     <img src={transformImageUrl(homeContent.heroSlides[0].imageUrl)} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                     <div className="relative z-10 space-y-10 max-w-5xl">
                       <span className="text-primary text-2xl font-black tracking-[0.5em] uppercase">{homeContent.heroSlides[0].subtitle}</span>
                       <h1 className="text-[12rem] font-black italic uppercase leading-[0.85] tracking-tighter">
                          {homeContent.heroSlides[0].title?.replace(/_/g, ' ') || 'UNTITLED_SLIDE'}
                       </h1>
                       <div className="flex gap-8">
                         <div className="px-16 py-8 bg-primary rounded-full" />
                         <div className="px-16 py-8 border-4 border-white/20 rounded-full" />
                       </div>
                     </div>
                  </div>
                ) : <div className="h-[800px] bg-slate-900 flex items-center justify-center text-4xl">NO_HERO_DATA</div>}

                <div className="py-40 px-20 grid grid-cols-2 gap-40">
                   <div className="aspect-[3/4] bg-slate-800 rounded-[100px] overflow-hidden">
                      <img src={transformImageUrl(homeContent.teacherAboutUrl)} className="w-full h-full object-cover grayscale" />
                   </div>
                   <div className="space-y-12 py-20">
                      <h2 className="text-9xl font-black italic uppercase tracking-tighter">{homeContent.aboutTitle}</h2>
                      <p className="text-4xl text-white/50 leading-relaxed font-sans">{homeContent.teacherMethodology}</p>
                   </div>
                </div>

                <div className="py-40 px-20 grid grid-cols-5 gap-12">
                   {homeContent.processSteps?.map((s, i) => (
                     <div key={i} className="p-16 rounded-[60px] bg-white/5 border border-white/10 space-y-10">
                        <div className="w-24 h-24 bg-primary rounded-[30px] flex items-center justify-center text-black">
                           {React.createElement(IconMap[s.icon] || BookOpen, { className: "w-12 h-12" })}
                        </div>
                        <div className="text-4xl font-black italic uppercase">{s.title}</div>
                     </div>
                   ))}
                </div>

                <footer className="py-40 bg-black/50 border-t border-white/5 px-20 flex justify-between items-center">
                   <div className="text-5xl font-black tracking-tighter">© {new Date().getFullYear()} CORE_STABLE</div>
                   <div className="flex gap-10">
                      {[1,2,3,4].map(i => <div key={i} className="w-20 h-20 bg-white/5 rounded-[20px]" />)}
                   </div>
                </footer>
             </div>
          </div>
          <div className="absolute top-4 right-4 px-4 py-2 bg-primary/20 backdrop-blur-xl border border-primary/40 rounded-full text-[8px] font-black uppercase tracking-widest text-primary animate-pulse">
            Live_Nexus_Feed
          </div>
        </div>
      )}
    </div>
  );

  const renderPriManagement = () => (
    <div className="space-y-12 pb-24">
      <div className="bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm">
        <h3 className="text-2xl font-black mb-10 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter">
          <ShieldCheck className="w-7 h-7 text-primary/40" /> PRI Access Control
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <input 
            type="email" 
            placeholder="Official PRI Email (Google Login)" 
            value={newPriEmail} 
            onChange={e => setNewPriEmail(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-black tracking-widest focus:outline-none focus:border-primary/30 transition-all font-mono" 
          />
          <button onClick={handleAddPriUser} className="bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20">
            Authorize Node
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {priUsers.map(user => (
          <div key={user.id} className="bg-white border border-slate-200 p-8 rounded-[35px] shadow-sm group hover:border-primary/20 transition-all relative overflow-hidden">
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                <Users className="w-6 h-6 text-slate-400" />
              </div>
              <button 
                onClick={() => handleDelete('authorizedPri', user.id)}
                className="p-3 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] mb-2">{user.email}</p>
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Access Level: PRI_MARKS_MANAGER</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-12 pb-24">
      <div className="bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm">
        <h3 className="text-2xl font-black mb-10 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter">
          <BookOpen className="w-7 h-7 text-primary/40" /> Manage Classes & Fees
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Class Name</label>
            <input 
              type="text" 
              placeholder="e.g. 2026 Theory" 
              value={newCourse.name} 
              onChange={e => setNewCourse({...newCourse, name: e.target.value})} 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Monthly Fee (LKR)</label>
            <input 
              type="number" 
              placeholder="e.g. 3500" 
              value={newCourse.fee} 
              onChange={e => setNewCourse({...newCourse, fee: e.target.value})} 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Target Batch (Year)</label>
            <select 
              value={newCourse.yearId} 
              onChange={e => setNewCourse({...newCourse, yearId: e.target.value})} 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold focus:outline-none focus:border-primary/30 transition-all appearance-none cursor-pointer"
            >
              <option value="">Select Year</option>
              {academicYears.map(y => <option key={y.id} value={y.id}>{y.year}</option>)}
            </select>
          </div>
        </div>
        <button onClick={handleAddCourse} className="mt-8 w-full bg-primary text-white font-black uppercase italic tracking-[0.2em] py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20">
          CREATE CLASS PROTOCOL
        </button>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-[40px] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic border-b border-slate-100">
              <th className="px-10 py-6">CLASS_ID</th>
              <th className="px-10 py-6">FEE_STRUCTURE</th>
              <th className="px-10 py-6">BATCH_CORE</th>
              <th className="px-10 py-6 text-right">PROTOCOLS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {courses.map(c => (
              <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-10 py-8 text-sm font-black text-slate-900 uppercase tracking-tight italic">{c.name}</td>
                <td className="px-10 py-8 text-sm font-black text-slate-900 uppercase tracking-tight italic">Rs. {c.fee}</td>
                <td className="px-10 py-8 text-[10px] font-black text-primary uppercase tracking-widest italic">{academicYears.find(y => y.id === c.yearId)?.year || 'N/A'}</td>
                <td className="px-10 py-8 text-right">
                  <button onClick={() => handleDelete('courses', c.id)} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group-hover:scale-110 shadow-sm">
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

  const renderCMManagement = () => (
    <div className="space-y-12 pb-24">
      <div className="bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm">
        <h3 className="text-2xl font-black mb-10 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter">
          <ShieldCheck className="w-7 h-7 text-primary/40" /> Card Marker Access
        </h3>
        <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed max-w-2xl">
          Authorized personnel can access the Card Mark system using their email without having full administrative privileges.
        </p>
        <div className="flex gap-4">
          <input 
            type="email" 
            placeholder="ENTER AUTHORIZED EMAIL..." 
            value={newCmEmail} 
            onChange={e => setNewCmEmail(e.target.value)} 
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-sm font-black uppercase tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all" 
          />
          <button onClick={handleAddCmUser} className="bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20">
            Authorize Node
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cmUsers.map(user => (
          <div key={user.id} className="bg-white border border-slate-200 p-8 rounded-[35px] shadow-sm group hover:border-primary/20 transition-all relative overflow-hidden">
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                <Users className="w-6 h-6 text-slate-400" />
              </div>
              <button 
                onClick={() => handleDelete('authorizedCM', user.id)}
                className="p-3 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="relative z-10">
              <h4 className="text-lg font-black text-slate-900 tracking-tight">{user.email}</h4>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary italic mt-2">Card Marker Level</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-12">
      <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4">
        {[
          { id: 'batches', label: 'Batches (Years)' },
          { id: 'courses', label: 'Classes & Fees' },
          { id: 'admins', label: 'Sub Admins' },
          { id: 'pri', label: 'PRI Access' },
          { id: 'cm', label: 'Card Markers' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSettingsTab(tab.id)}
            className={`whitespace-nowrap px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] italic text-xs transition-all ${
              activeSettingsTab === tab.id 
                ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105'
                : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeSettingsTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          {activeSettingsTab === 'batches' && renderAcademicYears()}
          {activeSettingsTab === 'courses' && renderCourses()}
          {activeSettingsTab === 'admins' && renderAdmins()}
          {activeSettingsTab === 'pri' && renderPriManagement()}
          {activeSettingsTab === 'cm' && renderCMManagement()}
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <DashboardLayout role="admin" activeTab={activeTab} setActiveTab={setActiveTab} profile={profile}>
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          {activeTab === 'cardmark' && <CardMarkTab />}
          {activeTab === 'settings' && renderSettings()}
          {activeTab === 'books' && renderBooks()}
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'home' && renderHomeManager()}
          {activeTab === 'classes' && renderClasses()}
          {activeTab === 'recordings' && renderRecordings()}
          {activeTab === 'batches' && renderAcademicYears()}
          {activeTab === 'live' && renderLive()}
          {activeTab === 'students' && renderStudents()}
          {activeTab === 'marks' && renderMarks()}
          {activeTab === 'admins' && renderAdmins()}
          {activeTab === 'pri' && renderPriManagement()}
        </motion.div>
      </AnimatePresence>
    
      {showZoomSync && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-black text-slate-800 tracking-wider uppercase">Sync Zoom Meeting</h2>
              <button onClick={() => setShowZoomSync(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Target Batches (Years)</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {academicYears.map(y => (
                      <button
                        key={y.id}
                        type="button"
                        onClick={() => {
                          const current = zoomYearIds || [];
                          let updated;
                          if (current.includes(y.id)) updated = current.filter(id => id !== y.id);
                          else updated = [...current, y.id];
                          setZoomYearIds(updated);
                          localStorage.setItem('defaultYearIds', JSON.stringify(updated));
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${zoomYearIds.includes(y.id) ? 'bg-primary text-white border-primary shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'}`}
                      >
                        {y.year}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Target Class Types</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {classTypes.map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          const current = zoomClassTypes || [];
                          let updated;
                          if (current.includes(c.name)) updated = current.filter(name => name !== c.name);
                          else updated = [...current, c.name];
                          setZoomClassTypes(updated);
                          localStorage.setItem('defaultClassTypes', JSON.stringify(updated));
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${zoomClassTypes.includes(c.name) ? 'bg-primary text-white border-primary shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Paste Zoom Invitation Message</label>
                <textarea
                  value={zoomMessage}
                  onChange={(e) => setZoomMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-medium focus:outline-none focus:border-primary/30 transition-all min-h-[200px]"
                  placeholder="Topic: Class\nTime: Jan 1, 2026 10:00 AM\n\nJoin Zoom Meeting\nhttps://zoom.us/j/123456789..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setShowZoomSync(false)} className="px-6 py-3 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveZoomMessage} className="px-6 py-3 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                Save & Broadcast
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </DashboardLayout>
  );
};
