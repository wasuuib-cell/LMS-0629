import React, { useState, useEffect } from 'react';
import { auth, googleProvider, db, handleFirestoreError, OperationType } from '../firebase';
import { signInWithPopup, signInAnonymously } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, runTransaction, addDoc, onSnapshot, serverTimestamp, writeBatch } from 'firebase/firestore';
import { GraduationCap, Mail, Shield, Phone, Hash, LogIn, UserPlus, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { YouTubeCustomPlayer } from '../components/YouTubeCustomPlayer';
import { AcademicYear, Course, CourseCombo, ClassType } from '../types';

const ParticleCanvas: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = 40;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />;
};

export const StudentLogin: React.FC = () => {
  const { t } = useLanguage();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true); // Default to Sign In
  const [isSuccess, setIsSuccess] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{index: string, name: string, studentInfo?: any}>({ index: '', name: '' });
  const [regForm, setRegForm] = useState({ name: '', class: '', whatsapp: '', address: '', studentId: '', school: '', nic: '', email: '', yearId: '', enrolledCourses: [] as string[] });
  const [signInForm, setSignInForm] = useState({ whatsapp: '', studentId: '' });
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [classTypes, setclassTypes] = useState<ClassType[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseCombos, setCourseCombos] = useState<CourseCombo[]>([]);
  const [generalSettings, setGeneralSettings] = useState<{registrationVideoUrl?: string}>({});

  useEffect(() => {
    const unsubYears = onSnapshot(collection(db, 'academicYears'), (snap) => {
      setAcademicYears(snap.docs.map(d => ({ id: d.id, ...d.data() } as AcademicYear)));
    });
    const unsubCourses = onSnapshot(collection(db, 'courses'), (snap) => {
      setCourses(snap.docs.map(d => ({ id: d.id, ...d.data() } as Course)));
    });
    const unsubclassTypes = onSnapshot(collection(db, 'classTypes'), (snap) => {
      setclassTypes(snap.docs.map(d => ({ id: d.id, ...d.data() } as ClassType)));
    });
    const unsubCourseCombos = onSnapshot(collection(db, 'courseCombos'), (snap) => {
      setCourseCombos(snap.docs.map(d => ({ id: d.id, ...d.data() } as CourseCombo)));
    });
    const unsubSettings = onSnapshot(doc(db, 'settings', 'general'), (docSnap) => {
      if (docSnap.exists()) {
        setGeneralSettings(docSnap.data());
      }
    });
    return () => { unsubYears(); unsubCourses(); unsubCourseCombos(); unsubclassTypes(); unsubSettings(); };
  }, []);

  const calculateTotalFee = () => {
    let total = 0;
    const selectedCourseIds = regForm.enrolledCourses;
    if (selectedCourseIds.length === 0) return 0;

    // Check if there is a combo that exactly matches or is a subset of selected courses?
    // Actually, simple combo logic: If a combo's courses are fully included in selected courses, use it.
    // For simplicity, let's find the best combo that covers the most selected courses.
    let bestCombo: CourseCombo | null = null;
    let maxCovered = 0;

    courseCombos.filter(c => c.yearId === regForm.yearId).forEach(combo => {
      const isCovered = combo.courseIds.every(id => selectedCourseIds.includes(id));
      if (isCovered && combo.courseIds.length > maxCovered) {
        maxCovered = combo.courseIds.length;
        bestCombo = combo;
      }
    });

    if (bestCombo) {
      total += bestCombo.comboFee;
      // Add fee for remaining courses not in combo
      selectedCourseIds.forEach(id => {
        if (!bestCombo!.courseIds.includes(id)) {
          const course = courses.find(c => c.id === id);
          if (course) total += course.fee;
        }
      });
    } else {
      selectedCourseIds.forEach(id => {
        const course = courses.find(c => c.id === id);
        if (course) total += course.fee;
      });
    }
    return total;
  };

  const backfillPaperResults = async (studentId: string, userUid: string) => {
    try {
      const q = query(
        collection(db, 'paperResults'),
        where('studentIndex', '==', studentId)
      );
      const snap = await getDocs(q);
      if (snap.empty) return;

      const batch = writeBatch(db);
      let count = 0;
      snap.forEach((d) => {
        const data = d.data();
        if (!data.uid || data.uid !== userUid) {
          batch.update(d.ref, { uid: userUid });
          count++;
        }
      });
      if (count > 0) await batch.commit();
    } catch (err) {
      console.error('Backfill failed:', err);
    }
  };

  const [isExploding, setIsExploding] = useState(false);

  const triggerExplosion = () => {
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 2000);
  };

  const Particle = ({ i }: { i: number; key?: any }) => {
    const angle = (i / 15) * Math.PI * 2;
    const velocity = 50 + Math.random() * 100;
    const x = Math.cos(angle) * velocity;
    const y = Math.sin(angle) * velocity;
    
    return (
      <motion.div
        initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
        animate={{ 
          x: x * 2, 
          y: y * 2, 
          scale: [0, 1.5, 0], 
          opacity: [1, 1, 0] 
        }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute w-2 h-2 rounded-full pointer-events-none"
        style={{ 
          backgroundColor: i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#10b981" : "#ef4444",
          boxShadow: "0 0 10px currentColor"
        }}
      />
    );
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');
    setIsSuccess(false);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const userEmail = res.user.email;
      const userUid = res.user.uid;
      const currentMonth = new Date().toISOString().slice(0, 7);

      // Check if already registered in 'students' in Firestore
      const studentsRef = collection(db, 'students');
      const q = query(studentsRef, where('email', '==', userEmail));
      const snap = await getDocs(q);
      
      let studentData: any = null;
      if (!snap.empty) {
        const docSnap = snap.docs[0];
        studentData = { ...docSnap.data(), id: docSnap.id };
      }

      if (studentData) {
        // Update student record with UID if it's missing
        if (!studentData.uid) {
          await updateDoc(doc(db, 'students', studentData.id), { uid: userUid });
        }

        // Backfill results with UID
        await backfillPaperResults(studentData.studentId, userUid);

        await setDoc(doc(db, 'users', userUid), { 
          uid: userUid, 
          email: userEmail || '', 
          role: 'student',
          name: studentData.name,
          yearId: studentData.yearId || '',
          class: studentData.class,
          whatsapp: studentData.whatsapp,
          address: studentData.address,
          studentId: studentData.studentId,
          indexNumber: studentData.indexNumber || studentData.studentId,
          school: studentData.school,
          hasSeenId: studentData.hasSeenId ?? false
        });
      } else {
        // Not registered, switch to registration form and pre-fill email
        setRegForm(prev => ({ ...prev, email: userEmail || '' }));
        setIsSignIn(false);
        setError("Account not found. Please complete the registration form below.");
      }
    } catch (err: any) {
      if (err.message.includes('Missing or insufficient permissions')) {
        setError("Payment verification pending. Please contact admin.");
      } else if (err.code === 'auth/network-request-failed' || err.message.includes('network-request-failed')) {
        setError("Sign-in failed: Network connection timed out. Please check your internet/VPN.");
      } else if (err.code === 'auth/popup-blocked') {
        setError("Login popup blocked! Please allow popups in your browser settings and try again.");
      } else {
        setError(err.message);
        handleFirestoreError(err, OperationType.GET, 'students');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIsSuccess(false);
    try {
      // 1. MUST trigger popup FIRST to ensure "user gesture" context
      // Trigger Google Login immediately to avoid browser popup blocking
      const res = await signInWithPopup(auth, googleProvider);
      const userUid = res.user.uid;
      const userEmail = res.user.email || '';

      const currentMonth = new Date().toISOString().slice(0, 7);
      const studentsRef = collection(db, 'students');
      
      // 2. Query by WhatsApp to find the student record
      const q = query(studentsRef, where('whatsapp', '==', signInForm.whatsapp));
      const snap = await getDocs(q);
      
      if (snap.empty) {
        throw new Error("Student not found with this WhatsApp number.");
      }

      let studentData: any = null;
      let studentKey: string = '';
      
      snap.forEach((child) => {
        const val = child.data();
        const dbId = val.studentId || '';
        const inputId = signInForm.studentId || '';
        
        // Match if IDs are exactly the same, or if the input matches the last part of a legacy ID
        if (dbId === inputId || dbId.replace('YA-2026-', '') === inputId) {
          studentData = val;
          studentKey = child.id;
        }
      });

      if (!studentData) {
        throw new Error("Invalid Index Number for this WhatsApp number.");
      }



      // 3. Link the Google identity to the student record
      // 1. Set/Update user profile in 'users' collection
      await setDoc(doc(db, 'users', userUid), { 
        uid: userUid, 
        email: userEmail, 
        role: 'student',
        name: studentData.name,
        yearId: studentData.yearId || '',
        class: studentData.class,
        whatsapp: studentData.whatsapp,
        address: studentData.address,
        studentId: studentData.studentId,
        indexNumber: studentData.indexNumber || studentData.studentId,
        school: studentData.school,
        hasSeenId: studentData.hasSeenId ?? false
      });

      // 2. Link the student record to this UID and update email
      // This will now succeed due to the updated security rules
      await updateDoc(doc(db, 'students', studentKey), { 
        uid: userUid,
        email: userEmail,
        whatsapp: studentData.whatsapp, // Include these to satisfy the specific rule check if needed
        indexNumber: studentData.indexNumber || studentData.studentId
      });

      // Backfill results with UID
      await backfillPaperResults(studentData.studentId, userUid);

    } catch (err: any) {
      if (err.code === 'auth/popup-blocked') {
        setError("Login popup blocked! Please allow popups in your browser settings and try again.");
      } else if (err.message.includes('Missing or insufficient permissions')) {
        setError("Payment verification pending. Please contact admin.");
      } else if (err.code === 'auth/network-request-failed' || err.message.includes('network-request-failed')) {
        setError("Connection error: Unable to reach the security server. Check your network.");
      } else {
        setError(err.message);
        if (err.code !== 'auth/popup-closed-by-user') {
          handleFirestoreError(err, OperationType.GET, 'students');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIsSuccess(false);

    try {
      const currentMonth = new Date().toISOString().slice(0, 7);
      
      // Ensure we are signed in (Anonymously or via Google)
      let userUid = auth.currentUser?.uid;
      if (!userUid) {
        const res = await signInAnonymously(auth);
        userUid = res.user.uid;
      }

      // 1. Check if student already exists by WhatsApp or Email
      const studentsRef = collection(db, 'students');
      const emailQuery = query(studentsRef, where('email', '==', regForm.email));
      const whatsappQuery = query(studentsRef, where('whatsapp', '==', regForm.whatsapp));
      
      const [emailSnap, whatsappSnap] = await Promise.all([
        getDocs(emailQuery),
        getDocs(whatsappQuery)
      ]);

      if (!emailSnap.empty || !whatsappSnap.empty) {
        setError("Duplicate Profile Detected: An account with this email/WhatsApp already exists. Try signing in.");
        return;
      }
      
      // 2. Auto-generate Index Number using Firestore Transaction
      console.log("Generating index number...");
      const counterRef = doc(db, 'counters', 'studentIndex');
      let nextIndex = 1;
      
      await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        if (!counterDoc.exists()) {
          transaction.set(counterRef, { value: 1 });
          nextIndex = 1;
        } else {
          const newValue = (counterDoc.data().value || 0) + 1;
          transaction.update(counterRef, { value: newValue });
          nextIndex = newValue;
        }
      });

      const formattedIndex = nextIndex.toString().padStart(4, '0');
      console.log("Generated index:", formattedIndex);

      const studentId = formattedIndex;

      const selectedClassNames = regForm.class ? regForm.class.split(', ').filter(Boolean) : [];
      const computedEnrolledCourses = courses
        .filter(c => c.yearId === regForm.yearId && selectedClassNames.includes(c.name))
        .map(c => c.id);

        const studentInfo = {
          name: regForm.name,
          email: regForm.email,
          yearId: regForm.yearId,
          class: regForm.class,
          whatsapp: regForm.whatsapp,
          address: regForm.address,
          studentId: studentId,
          indexNumber: studentId,
          nic: regForm.nic,
          school: regForm.school,
          registeredAt: serverTimestamp(),
          enrolledCourses: computedEnrolledCourses,
          payments: { [currentMonth]: false },
          coursePayments: computedEnrolledCourses.reduce((acc, courseId) => ({...acc, [courseId]: { [currentMonth]: false }}), {}),
          hasSeenId: false,
          uid: userUid
        };

      console.log("Adding student doc...");
      const studentDocRef = await addDoc(collection(db, 'students'), studentInfo);
      console.log("Student doc added with ID:", studentDocRef.id);
      
      // Registration successful
      setSuccessInfo({ index: formattedIndex, name: regForm.name, studentInfo });
      setIsSuccess(true);
      setRegForm({ name: '', class: '', whatsapp: '', address: '', studentId: '', school: '', nic: '', email: '', yearId: '', enrolledCourses: [] });
      console.log("Registration process completed successfully.");
      
    } catch (err: any) {
      if (err.code === 'auth/network-request-failed' || err.message.includes('network-request-failed')) {
        setError("Network connection timed out. Please check your internet or VPN. Also, ensure 'Anonymous Authentication' is enabled in your Firebase Console.");
      } else {
        setError(err.message);
        handleFirestoreError(err, OperationType.WRITE, 'students');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white selection:bg-primary selection:text-white transition-colors duration-500 relative overflow-hidden">
      {/* Background Particles for Register view */}
      {!isSignIn && <ParticleCanvas />}

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white border border-slate-200 shadow-2xl rounded-[40px] p-12 relative overflow-hidden transition-colors duration-500"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-full border border-primary/10 bg-primary/5 flex items-center justify-center mb-6">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-[#1a1a1a] tracking-tighter uppercase italic">
            {isSuccess ? t('login.title.success') : isSignIn ? t('login.title.signin') : t('login.title.register')}
          </h1>
          <p className="text-[#1a1a1a] text-[10px] uppercase tracking-[0.2em] mt-3 text-center font-bold">
            {isSuccess ? t('login.subtitle.success') : isSignIn ? t('login.subtitle.signin') : t('login.subtitle.register')}
          </p>
        </div>

        <div className="space-y-6">
          {error && !isSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-center text-red-500 flex flex-col items-center gap-3"
            >
              <Shield className="w-4 h-4" />
              {error}
            </motion.div>
          )}

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10 py-6"
            >
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center border border-accent/20 shadow-[0_0_50px_rgba(245,158,11,0.1)]">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#1a1a1a] uppercase italic tracking-tighter">Congratulations, {successInfo.name}!</h3>
                  <p className="text-[#1a1a1a] text-xs font-medium leading-relaxed">
                    Your profile has been created. Please secure your unique ID provided below.
                  </p>
                </div>
                
                <div className="w-full bg-slate-50 border border-slate-200 rounded-[30px] p-10 relative group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-transparent pointer-events-none opacity-50" />
                  <p className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.4em] mb-4">Identification Serial</p>
                  <p className="text-5xl font-black text-accent tracking-widest italic">{successInfo.index}</p>
                </div>

                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 w-full">
                  <p className="text-[9px] text-[#1a1a1a] font-bold uppercase tracking-widest leading-relaxed">
                    Activation Status: <span className="text-primary animate-pulse">Pending</span> <br />
                    Contact Admin to authorize your access.
                  </p>
                </div>

                <button
                  onClick={async () => {
                    try {
                      setLoading(true);
                      if (successInfo.studentInfo && successInfo.studentInfo.uid) {
                        await setDoc(doc(db, 'users', successInfo.studentInfo.uid), {
                          uid: successInfo.studentInfo.uid,
                          email: successInfo.studentInfo.email,
                          role: 'student',
                          name: successInfo.studentInfo.name,
                          yearId: successInfo.studentInfo.yearId || '',
                          class: successInfo.studentInfo.class || '',
                          whatsapp: successInfo.studentInfo.whatsapp || '',
                          address: successInfo.studentInfo.address || '',
                          studentId: successInfo.studentInfo.studentId,
                          indexNumber: successInfo.studentInfo.indexNumber,
                          school: successInfo.studentInfo.school || '',
                          hasSeenId: false
                        });
                      } else {
                        setIsSuccess(false);
                        setIsSignIn(true);
                      }
                    } catch (err) {
                      console.error("Failed to auto-login:", err);
                      setIsSuccess(false);
                      setIsSignIn(true);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="w-full bg-accent text-white font-black uppercase italic tracking-widest py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all text-sm shadow-2xl shadow-accent/20"
                >
                  ENTER DASHBOARD
                </button>
              </div>
            </motion.div>
          ) : isSignIn ? (
            <div className="space-y-8 py-4">
              {/* RGB Liquid Wave Button */}
              <motion.button
                onClick={handleGoogleAuth}
                disabled={loading}
                whileHover="hover"
                initial="initial"
                className="group w-full h-[84px] bg-white border-2 border-slate-100 text-[#1a1a1a] font-black uppercase italic tracking-[0.2em] rounded-[30px] relative overflow-hidden flex items-center justify-center gap-4 transition-all duration-700"
              >
                {/* RGB Glow pulse */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(239, 68, 68, 0.15)",
                      "0 0 15px rgba(34, 197, 94, 0.15)",
                      "0 0 15px rgba(59, 130, 246, 0.15)",
                      "0 0 15px rgba(239, 68, 68, 0.15)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-[30px]"
                />

                {/* Liquid Filling Animation Layer */}
                <motion.div
                  variants={{
                    initial: { y: "100%" },
                    hover: { y: "0%" }
                  }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="absolute inset-0 z-0 overflow-hidden"
                >
                  {/* Colorful RGB Gradient base */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff0000] via-[#0000ff] to-[#00ff00] animate-gradient-x bg-[length:200%_100%] opacity-90" />
                  
                  {/* Rotating distorted shapes to create wave effect */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[160%] -left-1/2 w-[200%] h-[300%] bg-white/20 rounded-[38%] mix-blend-overlay"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[150%] -left-1/2 w-[200%] h-[300%] bg-white/10 rounded-[42%] mix-blend-overlay"
                  />
                </motion.div>

                {/* Button Content */}
                <Mail className="w-6 h-6 text-primary group-hover:text-white relative z-10 transition-colors duration-500 drop-shadow-sm" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500 text-lg font-black italic">
                  {loading ? "CONNECTING..." : t('login.button.google')}
                </span>
              </motion.button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-[8px] uppercase tracking-[0.3em] font-black">
                  <span className="bg-white px-6 text-slate-300">SECURE ACCESS</span>
                </div>
              </div>

              <div className="text-center pb-2">
                <p className="text-sm font-bold text-slate-600 bg-primary/10 border border-primary/20 rounded-xl p-3">
                  Free පාඩම් නොමිලේම නැරඹීමට Register ක්ලික් කර ලියාපදිංචි වන්න
                </p>
              </div>

              {/* Secondary Glow button */}
              <div className="relative flex justify-center items-center">
                {isExploding && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                    {[...Array(30)].map((_, i) => (
                      <Particle key={i} i={i} />
                    ))}
                  </div>
                )}
                <motion.button
                  onClick={() => {
                    triggerExplosion();
                    setTimeout(() => setIsSignIn(false), 200);
                  }}
                  animate={{
                    boxShadow: ["0 0 15px rgba(59, 130, 246, 0.3)", "0 0 25px rgba(59, 130, 246, 0.5)", "0 0 15px rgba(59, 130, 246, 0.3)"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full bg-primary text-white font-black uppercase italic tracking-[0.2em] py-5 rounded-[24px] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 text-sm shadow-xl shadow-primary/20 relative overflow-hidden"
                >
                  <UserPlus className="w-5 h-5" />
                  {t('login.title.register')}
                </motion.button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-widest px-1 italic">{t('login.label.name')}</label>
                <input 
                  required
                  type="text" 
                  value={regForm.name}
                  onChange={e => setRegForm({...regForm, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-[#1a1a1a] focus:outline-none focus:border-primary/30 transition-all text-sm font-medium"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-widest px-1 italic">Email</label>
                <input 
                  required
                  type="email" 
                  value={regForm.email}
                  onChange={e => setRegForm({...regForm, email: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-[#1a1a1a] focus:outline-none focus:border-primary/30 transition-all text-sm font-medium"
                  placeholder="Email Address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-widest px-1 italic">{t('login.label.year')}</label>
                  <div className="relative">
                    <select
                      required
                      value={regForm.yearId}
                      onChange={e => setRegForm({...regForm, yearId: e.target.value, enrolledCourses: []})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-[#1a1a1a] focus:outline-none focus:border-primary/30 transition-all text-sm font-medium appearance-none"
                    >
                      <option value="">Select Year</option>
                      {academicYears.map(y => (
                        <option key={y.id} value={y.id}>{y.year}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-widest px-1 italic">Select Classes</label>
                  <div className="flex flex-wrap gap-2">
                    {classTypes.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No classes available.</p>
                    ) : (
                      classTypes.map(c => {
                        const isSelected = (regForm.class || '').split(', ').includes(c.name);
                        return (
                          <button
                            type="button"
                            key={c.id}
                            onClick={() => {
                              const currentClasses = regForm.class ? regForm.class.split(', ').filter(Boolean) : [];
                              if (currentClasses.includes(c.name)) {
                                setRegForm({...regForm, class: currentClasses.filter(cls => cls !== c.name).join(', ')});
                              } else {
                                setRegForm({...regForm, class: [...currentClasses, c.name].join(', ')});
                              }
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${isSelected ? 'bg-slate-900 border-slate-900 text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'}`}
                          >
                            {c.name}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
              

              
              <div className="space-y-2">
                <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-widest px-1 italic">{t('login.label.nic')}</label>
                <input 
                  required
                  type="text" 
                  value={regForm.nic}
                  onChange={e => setRegForm({...regForm, nic: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-[#1a1a1a] focus:outline-none focus:border-primary/30 transition-all text-sm font-medium"
                  placeholder="ID No"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-widest px-1 italic">{t('login.label.school')}</label>
                <input 
                  required
                  type="text" 
                  value={regForm.school}
                  onChange={e => setRegForm({...regForm, school: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-[#1a1a1a] focus:outline-none focus:border-primary/30 transition-all text-sm font-medium"
                  placeholder="Your School"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-widest px-1 italic">{t('login.label.address')}</label>
                <input 
                  required
                  type="text" 
                  value={regForm.address}
                  onChange={e => setRegForm({...regForm, address: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-[#1a1a1a] focus:outline-none focus:border-primary/30 transition-all text-sm font-medium"
                  placeholder="Home Address"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-widest px-1 italic">WhatsApp</label>
                <input 
                  required
                  type="text" 
                  value={regForm.whatsapp}
                  onChange={e => setRegForm({...regForm, whatsapp: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-[#1a1a1a] focus:outline-none focus:border-primary/30 transition-all text-sm font-medium"
                  placeholder="+94 7X XXX XXXX"
                />
              </div>
              <div className="pt-6 relative z-10">
                <div className="relative flex justify-center items-center">
                  {isExploding && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                      {[...Array(30)].map((_, i) => (
                        <Particle key={i} i={i} />
                      ))}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={triggerExplosion}
                    className="w-full bg-accent text-white font-black uppercase italic tracking-widest py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm shadow-2xl shadow-accent/30 relative overflow-hidden"
                  >
                    <UserPlus className="w-5 h-5" />
                    {loading ? "REGISTERING..." : t('login.button.register')}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSignIn(true)}
                  className="w-full mt-6 text-[10px] text-[#1a1a1a] font-bold uppercase tracking-widest hover:text-primary transition-colors italic"
                >
                  {t('login.link.hasAccount')} <span className="text-primary underline decoration-primary/20 underline-offset-4 tracking-tighter">{t('login.title.signin')}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 text-center">
          <p className="text-[8px] text-slate-300 font-black uppercase tracking-[0.5em] italic leading-relaxed">
            Nudara 30
          </p>
        </div>
      </motion.div>
      
      {/* Registration Video Section */}
      {generalSettings?.registrationVideoUrl && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl mx-auto mt-12 bg-white/80 backdrop-blur-md p-8 rounded-[40px] shadow-2xl border border-white"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-black italic text-slate-800 uppercase tracking-tight">How to Register</h3>
            <p className="text-slate-500 text-sm font-medium mt-2">වෙබ් අඩවියට ලියාපදිංචි වන ආකාරය</p>
          </div>
          <div className="aspect-video rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <YouTubeCustomPlayer url={generalSettings.registrationVideoUrl} />
          </div>
        </motion.div>
      )}
    </div>
  );
};
