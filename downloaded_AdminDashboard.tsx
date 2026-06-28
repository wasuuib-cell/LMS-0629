import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/AdminDashboard.tsx");import.meta.env = {"BASE_URL": "/", "DEV": true, "MODE": "development", "PROD": false, "SSR": false};import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=2104f878"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
var _s = $RefreshSig$();
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=2104f878"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import { db, handleFirestoreError, OperationType } from "/src/firebase.ts";
import { doc, onSnapshot, collection, addDoc, setDoc, updateDoc, deleteDoc, runTransaction, getDoc, serverTimestamp } from "/node_modules/.vite/deps/firebase_firestore.js?v=2104f878";
import { DashboardLayout } from "/src/components/Layout.tsx?t=1782657701171";
import { VideoPlayer } from "/src/components/VideoPlayer.tsx?t=1782629809060";
import { Users, BookOpen, Video, Plus, Trash2, ExternalLink, Image as ImageIcon, Type, Play, ShieldCheck, BarChart3, Edit, X, Copy, Calendar, Layers, LayoutGrid, Activity, Trophy, TrendingUp, MessageCircle, Microscope, Dna, Heart, Brain, GraduationCap, MapPin, Lightbulb, FileText, CalendarCheck, CheckCircle2, Clock } from "/node_modules/.vite/deps/lucide-react.js?v=2104f878";
import { motion, AnimatePresence } from "/node_modules/.vite/deps/motion_react.js?v=2104f878";
import { transformImageUrl } from "/src/lib/utils.ts?t=1782648302645";
import { useLanguage } from "/src/contexts/LanguageContext.tsx";
export const AdminDashboard = ({ profile }) => {
  _s();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [homePreviewMode, setHomePreviewMode] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [onlineClasses, setOnlineClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [paperResults, setPaperResults] = useState([]);
  const [authorizedAdmins, setAuthorizedAdmins] = useState([]);
  const [priUsers, setPriUsers] = useState([]);
  const [newPriEmail, setNewPriEmail] = useState("");
  useEffect(() => {
    const unsubPri = onSnapshot(collection(db, "authorizedPri"), (snapshot) => {
      setPriUsers(snapshot.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() })));
    });
    return () => unsubPri();
  }, []);
  const handleAddPriUser = async () => {
    if (!newPriEmail) return;
    try {
      const email = newPriEmail.toLowerCase().trim();
      await setDoc(doc(db, "authorizedPri", email), {
        email,
        createdAt: serverTimestamp()
      });
      setNewPriEmail("");
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, "authorizedPri");
    }
  };
  const [academicYears, setAcademicYears] = useState([]);
  const [recordings, setRecordings] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [marksFilterYear, setMarksFilterYear] = useState("all");
  const [marksFilterPaper, setMarksFilterPaper] = useState("all");
  const [overviewBatchId, setOverviewBatchId] = useState("all");
  const [topicMode, setTopicMode] = useState("existing");
  const [newLesson, setNewLesson] = useState({
    topic: "",
    subTopic: "",
    videoUrl: "",
    videoType: "youtube",
    visibility: "private",
    thumbnailUrl: "",
    imageUrl: "",
    maxViews: 2,
    yearId: "",
    isSafeZone: true
  });
  const [newClass, setNewClass] = useState({ title: "", link: "", type: "zoom" });
  const [newStudent, setNewStudent] = useState({ name: "", email: "", class: "", whatsapp: "", address: "", studentId: "", school: "", nic: "", yearId: "" });
  const [newPaperResult, setNewPaperResult] = useState({ paperNumber: 1, studentIndex: "", marks: 0, yearId: "" });
  const [newYear, setNewYear] = useState({ year: "" });
  const [newRecording, setNewRecording] = useState({
    title: "",
    videoUrl: "",
    visibility: "private",
    maxViews: 2,
    yearId: "",
    publishDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    isSafeZone: true
  });
  const [selectedRecordingYear, setSelectedRecordingYear] = useState("all");
  const [newAuthAdmin, setNewAuthAdmin] = useState({ email: "", password: "" });
  const [newPriUser, setNewPriUser] = useState({ email: "", name: "" });
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentSearch, setStudentSearch] = useState("");
  const [homeContent, setHomeContent] = useState({
    teacherName: "Chathuranaga Bandara",
    teacherMethodology: "ලංකාවේ ඉහළම ප්‍රතිඵල සහිත Bio පන්තිය.",
    teacherImageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2670&auto=format&fit=crop",
    teacherHeroUrl: "https://images.unsplash.com/photo-1603126019936-f9b6d9a563bb?q=80&w=2670&auto=format&fit=crop",
    teacherAboutUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?q=80&w=2574&auto=format&fit=crop",
    aboutTitle: "About Us",
    aboutSubtitle: "Chathuranaga Bandara",
    aboutRichText: `<p>පන්ති ආරම්භ කර වසර 4ක් ගතවන විට දිවයිනේ මුළු Bio A සාමර්ථ ගණනින් 10න් 1ක් අප පන්තිය සතු විය. ඊළඟ වසර වන විට එය 6න් 1ක් දක්වා වැඩි විය. මෙම වසරේ එය 4න් 1ක් දක්වා වැඩිවිය. ඒ දිස්ත්‍රික් මුල් 20 තුළ සිසුන් 126 කට වැඩි ප්‍රමාණයක් සමඟය.</p><p>මෙය ලංකා ඉතිහාසයේ පළමු වසර 6 තුළ පන්තියක් වාර්ථා කළ වැඩිම ප්‍රතිඵල සමූහය යන්න අවිවාදිතය. සෑබෑ කරුණ නම්, වසර 6ක් නොව කොපමණ කාලයක් පන්ති කළ ද මෙම මට්ටමේ ප්‍රතිඵල නිර්මාණය කළ කිසිදු පන්තියක් දිවයිනේ පැවතී නැත.</p><p>අප මේ අභිභවා යන්නේ ඉතිහාසයේ කිසිවෙකුත් ආසන්නයටවත් ගමන් නොකළ සීමාවන් ය. එය ද අපගේ හයවන කණ්ඩායම (2024 A/L) වනවිට ය ..</p>`,
    aboutCtaText: "Join Now",
    aboutCtaUrl: "/lms",
    processTitle: "Our Successful",
    processSubtitle: "Work Process",
    processSteps: [
      { id: "1", title: "නිවැරැදි විෂය කරුණු", description: "විෂය නිර්දේශය ආවරණය වන නිවැරදි විෂය කරුණු සම්පිණ්ඩණය කර සිසුන්ට ඉගැන්වීම", icon: "BookOpen" },
      { id: "2", title: "විෂයානුබද්ධ ක්‍රියාකාරකම්", description: "විෂය කරුණු මතක තබා ගැනීම පහසු කිරීම උදෙසා සුවිශේෂ ක්‍රමවේද සතිපතා සිදුකිරීම", icon: "Lightbulb" },
      { id: "3", title: "විශේෂ ප්‍රශ්න පත්‍ර", description: "සුවිශේෂ ප්‍රශ්න පත්‍ර මඟින් සිසුන් දැනුමින් සහ අත්දැකීම් මඟින් උසස් පෙළ විභාගයට සූදානම් කරවීම", icon: "FileText" },
      { id: "4", title: "නිවැරදි කාල රාමුව", description: "විෂය කරුණු පන්තිය තුළ දීම අවධාරණය කිරීමෙන් නිවැරැදි කාල රාමුවක් තුළ සිසුන් මෙහෙයවීම", icon: "CalendarCheck" },
      { id: "5", title: "විශිෂ්ටතම ප්‍රතිඵල", description: "අවසන් ප්‍රතිඵලක් ලෙස සිසුන්ට විශිෂ්ටතම ප්‍රතිඵලයක් ලබාගැනීම සඳහා මඟපෙන්වීම", icon: "CheckCircle2" }
    ],
    specialTitle: "Special Programs",
    specialSubtitle: "The final Paper Class",
    specialDesc: "A/L PAPER එකට පස්සේ ලංකාවේ වැඩිම ළමයි ප්‍රමාණයක් එකපාර ලියන Bio PAPER එක. විශේෂ ප්‍රශ්න, පෙරහුරු ප්‍රශ්න සමගින් සිසුන්ගේ විෂය පිළිබඳව හැකියාව වැඩි දියුණු කරමින් විභාගය සඳහා සූදානම් කරවනු ලබයි",
    specialFeatures: [
      { id: "f1", title: "මධ්‍යස්ථාන 42ක්", description: "දිවයින පුරා මධ්‍යස්ථාන 42 දී සිසුන්ට ප්‍රශ්න පත්‍රය සඳහා භෞතිකව සහභාගි වීමේ හැකියාව ඇත.", icon: "MapPin" },
      { id: "f2", title: "වැඩිම Rank ලිස්ට් එක", description: "උසස් පෙළ විභාගයට පසුව විශාලතම සිසුන් පිරිසකට එකවර ලකුණු ලබාදී ශ්රේණිගත කිරීම් සිදුකරන එකම Bio පන්තිය.", icon: "Users" },
      { id: "f3", title: "ප්‍රගති සමාලෝචනය", description: "නව තාක්ෂණික ක්‍රමවේදයන් ඔස්සේ සිසුන්ගේ පසුගිය ප්‍රශ්න පත්‍ර වල ලකුණු අධ්‍යයනය කර සිසුන්ගේ ප්‍රගතිය වාර්තාවක් වෙබ්අඩවිය හරහා ලබා ගත හැකි වීම", icon: "BarChart3" },
      { id: "f4", title: "ලකුණු විශ්ලේෂණය", description: "සෑම සිසුවෙකුටම ලකුණු පිළිබඳව ප්‍රශ්න පත්‍ර පරීක්ෂක සමඟ සම්බන්ධ වී වාර්තාවක් ලබාගත හැකි වීම, තම අඩුපාඩු ඔවුන් සමඟ සාකච්ඡා කළ හැකි වීම", icon: "Clock" }
    ],
    telegramTitle: "Bio",
    telegramSubtitle: "Our Telegram Channels",
    telegramChannels: [
      { id: "t1", name: "2028 Theory", url: "https://t.me/CHEM28T", imageUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop" },
      { id: "t2", name: "2026 Revision", url: "https://t.me/chem_26R", imageUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop" },
      { id: "t3", name: "2026 Theory", url: "https://t.me/chem26Th", imageUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop" },
      { id: "t4", name: "2027 Theory", url: "https://t.me/CHEM_27T", imageUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop" }
    ],
    teacherBioTitle: "ගුරුවරයා පිළිබඳව,",
    teacherBioText: `2017 උසස් පෙළ ජීව විද්‍යා අංශයෙන් දිවයිනේ 4 වන ස්ථානයට (කොළඹ දිස්ත්‍රික් 2) සමත්ව මේ වන විට කොළඹ වෛද්‍ය පීඨයේ සිය උපාධිය අවසන් කරමින් සිටියි. 2019 දී උපකාරක පන්ති ක්ෂේත්‍රයට පිවිසෙන ඔහු වසර 4ක් යන්නටත් පෙර (වයස අවුරුදු 24ක වන විට) දිවයිනේ එදා මෙදා තුර සමස්ථ ටියුෂන් ඉතිහාසයේම වැඩිම සිසුන් පිරිසක් සහභාගි වන ජීව විද්‍යාව පන්තිය නිර්මාණය කරන්නේ, යල්පැනගිය ක්‍රමවේදයන් වෙනුවට වසර කිහිපයකට ඉහත දී තමා විසින්ම අනුගමනය කළ අතිසාර්ථක ක්‍රමවේදයන් පන්තියේ වැඩ පිළිවෙළට මුසු කරමින් අවවාදයට එහා ගිය ආදර්ශයක් මත සිසුන් විභාගයට සූදානම් කරවීම සහ විෂයන් 3ටම අදාළ නිවැරදි මගපෙන්වීම හේතුවෙන් වේ.

සිය පළමු පන්තියෙන්ම ගම්පහ දිස්ත්‍රික්කයේ ප්‍රථමයා (දිවයිනේ 9) ද දෙවන පන්තියෙන් දිවයිනේ 2, 4 ඇතුළුව දිස්ත්‍රික් ප්‍රථමයන් 2ක් දෙවැනියන් 3ක් සහ තෙවනියෙක් නිර්මාණය වන්නේ ද ඉහත කී හේතුව සහ ගුරුවරයා සතු සහජයෙන් ලද විෂය කරුණු පැහැදිලි කිරීමේ හැකියාව හේතුවෙන් වේ.`,
    teacherVideoUrl: "https://youtu.be/7XrbdDzD7V8",
    teacherVideoThumbnail: "https://images.unsplash.com/photo-1532187875620-1e4334f6eee9?q=80&w=2670&auto=format&fit=crop",
    heroSlides: [
      { id: "s1", title: "Bio Highest Results", subtitle: "Journey of Excellence", imageUrl: "/1.avif", ctaText: "Explore Our Journey", ctaUrl: "/lms" },
      { id: "s2", title: "විශිෂ්ටතම Bio පන්තිය", subtitle: "අද ලංකාවේ", imageUrl: "/2.avif" },
      { id: "s3", title: "Bio පන්තිය", subtitle: "දිවයිනේ වැඩිම සිසුන් පිරිසක්", imageUrl: "/3.avif" }
    ],
    contactTitle: "Contact Us",
    contactSubtitle: "පහත සඳහන් ආකාර මගින් ඔබට අප හා සම්බන්ධ විය හැක",
    contactAddress: "No: 160, Rajagiriya.",
    contactPhone: "070 123 4567",
    contactEmail: "info@bwithb.lk",
    contactWorkingHours: "Mon-Sat: 8am-5pm",
    facebookUrl: "",
    youtubeUrl: "",
    whatsappUrl: "",
    instagramUrl: "",
    linkedinUrl: "#",
    allowedDomain: typeof window !== "undefined" ? window.location.origin : ""
  });
  const [homePosts, setHomePosts] = useState([]);
  const [homeVideos, setHomeVideos] = useState([]);
  const [newHomePost, setNewHomePost] = useState({ title: "", description: "", imageUrl: "" });
  const [newHomeVideo, setNewHomeVideo] = useState({ title: "", videoUrl: "" });
  const [newSlide, setNewSlide] = useState({ title: "", subtitle: "", imageUrl: "", ctaText: "", ctaUrl: "", titleFontSize: 10, titleFontSizeMobile: 4 });
  const [newProcessStep, setNewProcessStep] = useState({ title: "", description: "", icon: "BookOpen" });
  const [newFeature, setNewFeature] = useState({ title: "", description: "", icon: "Play" });
  const [newTelegram, setNewTelegram] = useState({ name: "", url: "", imageUrl: "" });
  const LOCAL_SLIDES = [
    { imageUrl: "/1.avif" },
    { imageUrl: "/2.avif" },
    { imageUrl: "/3.avif" }
  ];
  const currentMonth = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
  useEffect(() => {
    const unsubLessons = onSnapshot(collection(db, "lessons"), (snap) => {
      setLessons(snap.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, "lessons"));
    const unsubClasses = onSnapshot(collection(db, "onlineClasses"), (snap) => {
      setOnlineClasses(snap.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, "onlineClasses"));
    const unsubStudents = onSnapshot(collection(db, "students"), (snap) => {
      const studentData = snap.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() }));
      const sortedStudents = studentData.sort((a, b) => {
        const dateA = a.registeredAt?.toDate?.()?.getTime() || new Date(a.registeredAt || 0).getTime();
        const dateB = b.registeredAt?.toDate?.()?.getTime() || new Date(b.registeredAt || 0).getTime();
        return dateB - dateA;
      });
      setStudents(sortedStudents);
    }, (err) => handleFirestoreError(err, OperationType.LIST, "students"));
    const unsubHomeContent = onSnapshot(doc(db, "home_content", "main"), (snap) => {
      if (snap.exists()) setHomeContent(snap.data());
    });
    const unsubHomePosts = onSnapshot(collection(db, "home_posts"), (snap) => {
      setHomePosts(snap.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() })));
    });
    const unsubHomeVideos = onSnapshot(collection(db, "home_videos"), (snap) => {
      setHomeVideos(snap.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() })));
    });
    const unsubAuthAdmins = onSnapshot(collection(db, "authorizedAdmins"), (snap) => {
      setAuthorizedAdmins(snap.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() })));
    }, (err) => {
      console.warn("Permission denied reading authorizedAdmins. You may need to log in via General Login first.");
    });
    const unsubPaperResults = onSnapshot(collection(db, "paperResults"), (snap) => {
      setPaperResults(snap.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() })));
    });
    const unsubAcademicYears = onSnapshot(collection(db, "academicYears"), (snap) => {
      setAcademicYears(snap.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() })));
    });
    const unsubRecordings = onSnapshot(collection(db, "recordings"), (snap) => {
      setRecordings(snap.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() })));
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
      const student = students.find((s) => s.studentId === newPaperResult.studentIndex || s.indexNumber === newPaperResult.studentIndex);
      if (student && student.yearId && student.yearId !== newPaperResult.yearId) {
        setNewPaperResult((prev) => ({ ...prev, yearId: student.yearId || "" }));
      }
    }
  }, [newPaperResult.studentIndex, students]);
  const handleAddLesson = async () => {
    try {
      await addDoc(collection(db, "lessons"), { ...newLesson, createdAt: serverTimestamp() });
      setNewLesson({
        topic: "",
        subTopic: "",
        videoUrl: "",
        videoType: "youtube",
        visibility: "private",
        thumbnailUrl: "",
        imageUrl: "",
        maxViews: 2,
        yearId: newLesson.yearId,
        isSafeZone: true
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "lessons");
    }
  };
  const handleAddClass = async () => {
    try {
      await addDoc(collection(db, "onlineClasses"), { ...newClass, startTime: serverTimestamp() });
      setNewClass({ title: "", link: "", type: "zoom" });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "onlineClasses");
    }
  };
  const handleAddStudent = async () => {
    try {
      const counterRef = doc(db, "counters", "studentIndex");
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
      const formattedIndex = nextIndex.toString().padStart(4, "0");
      await addDoc(collection(db, "students"), {
        ...newStudent,
        studentId: formattedIndex,
        indexNumber: formattedIndex,
        registeredAt: serverTimestamp(),
        payments: { [currentMonth]: false },
        hasSeenId: false
      });
      setNewStudent({ name: "", email: "", class: "", whatsapp: "", address: "", studentId: "", school: "", nic: "", yearId: "" });
      alert(`Student registered with Index: ${formattedIndex}`);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "students");
    }
  };
  const handleUpdateStudent = async () => {
    if (!editingStudent) return;
    try {
      const { id, uid, ...data } = editingStudent;
      await updateDoc(doc(db, "students", id), data);
      if (uid) {
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          await updateDoc(userRef, {
            name: data.name,
            yearId: data.yearId || "",
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
      alert("Student record updated successfully!");
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, "students");
    }
  };
  const handleAddAuthAdmin = async () => {
    try {
      const docId = newAuthAdmin.email.toLowerCase().trim();
      if (!docId) throw new Error("Email is required");
      await setDoc(doc(db, "authorizedAdmins", docId), {
        ...newAuthAdmin,
        email: docId,
        id: docId
      });
      setNewAuthAdmin({ email: "", password: "" });
      alert("Admin authorized successfully!");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "authorizedAdmins");
    }
  };
  const handleAddPaperResult = async () => {
    const targetIndex = (newPaperResult.studentIndex || "").trim();
    if (!targetIndex || !newPaperResult.yearId) return;
    const isDuplicate = paperResults.some(
      (r) => r.studentIndex === targetIndex && r.paperNumber === newPaperResult.paperNumber && r.yearId === newPaperResult.yearId
    );
    if (isDuplicate) {
      if (!window.confirm("WARNING: A result already exists for this Index and Paper. Continue anyway?")) {
        return;
      }
    }
    try {
      const student = students.find(
        (s) => s.studentId && s.studentId.trim() === targetIndex || s.indexNumber && s.indexNumber.trim() === targetIndex
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
      const docRef = await addDoc(collection(db, "paperResults"), resultData);
      const paperNum = newPaperResult.paperNumber;
      const yearId = newPaperResult.yearId;
      const resultsForPaper = paperResults.filter((r) => r.paperNumber === paperNum && r.yearId === yearId);
      resultsForPaper.push({ ...resultData, id: docRef.id });
      const sorted = [...resultsForPaper].sort((a, b) => b.marks - a.marks);
      await Promise.all(sorted.map(
        (res, index) => updateDoc(doc(db, "paperResults", res.id), { rank: index + 1 })
      ));
      setNewPaperResult({ ...newPaperResult, studentIndex: "", marks: 0 });
      alert("Marks added and ranks updated!");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "paperResults");
    }
  };
  const handleAddHomePost = async () => {
    try {
      await addDoc(collection(db, "home_posts"), {
        ...newHomePost,
        createdAt: serverTimestamp()
      });
      setNewHomePost({ title: "", description: "", imageUrl: "" });
      alert("Moment added to gallery successfully!");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "home_posts");
    }
  };
  const handleAddHomeVideo = async () => {
    try {
      await addDoc(collection(db, "home_videos"), {
        ...newHomeVideo,
        createdAt: serverTimestamp()
      });
      setNewHomeVideo({ title: "", videoUrl: "" });
      alert("Video added successfully!");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "home_videos");
    }
  };
  const togglePayment = async (studentId, month, currentStatus) => {
    try {
      await updateDoc(doc(db, "students", studentId), {
        [`payments.${month}`]: !currentStatus
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `students/${studentId}/payments`);
    }
  };
  const handleDelete = async (path, id) => {
    if (!window.confirm("Are you sure you want to delete this record? This action cannot be undone.")) return;
    try {
      let collectionName = path;
      if (path === "home/posts") collectionName = "home_posts";
      if (path === "home/videos") collectionName = "home_videos";
      if (path === "students") {
        const student = students.find((s) => s.id === id);
        if (student?.uid) {
          await deleteDoc(doc(db, "users", student.uid));
        }
      }
      await deleteDoc(doc(db, collectionName, id));
      alert("Record deleted successfully.");
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${path}/${id}`);
    }
  };
  const handleCopyPaidEmails = () => {
    const paidEmails = students.filter((s) => s.payments?.[currentMonth]).map((s) => s.email).filter((email) => email).join(", ");
    if (paidEmails) {
      navigator.clipboard.writeText(paidEmails);
      alert(`Success: ${paidEmails.split(",").length} emails copied to clipboard!`);
    } else {
      alert("No paid students found for the current month.");
    }
  };
  const handleAddYear = async () => {
    try {
      if (!newYear.year.trim()) {
        alert("Please enter a valid Academic Year name.");
        return;
      }
      await addDoc(collection(db, "academicYears"), { ...newYear, createdAt: serverTimestamp() });
      setNewYear({ year: "" });
      alert("Academic Year created successfully. If you see a permission error, please ensure you have deployed the firestore.rules as described.");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "academicYears");
    }
  };
  const handleAddRecording = async () => {
    try {
      if (!newRecording.yearId) {
        alert("Please select a Year first.");
        return;
      }
      await addDoc(collection(db, "recordings"), { ...newRecording, createdAt: serverTimestamp() });
      setNewRecording({
        title: "",
        videoUrl: "",
        visibility: "private",
        maxViews: 2,
        yearId: "",
        publishDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        isSafeZone: true
      });
      alert("Recording added successfully!");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "recordings");
    }
  };
  const renderAcademicYears = () => /* @__PURE__ */ jsxDEV("div", { className: "space-y-12", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm", children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-black mb-10 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter", children: [
        /* @__PURE__ */ jsxDEV(Calendar, { className: "w-7 h-7 text-primary/40" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 522,
          columnNumber: 11
        }, this),
        " Manage Academic Years"
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 521,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Academic Year Name" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 526,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "e.g. 2026 / 2027",
              value: newYear.year,
              onChange: (e) => setNewYear({ ...newYear, year: e.target.value }),
              className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 527,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 525,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-end", children: /* @__PURE__ */ jsxDEV("button", { onClick: handleAddYear, className: "w-full bg-primary text-white font-black uppercase italic tracking-[0.2em] py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20", children: "CREATE YEAR" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 536,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 535,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 524,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 520,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 shadow-sm rounded-[40px] overflow-hidden", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left", children: [
      /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "bg-slate-50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic border-b border-slate-100", children: [
        /* @__PURE__ */ jsxDEV("th", { className: "px-10 py-6", children: "YEAR_IDENTIFIER" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 547,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "px-10 py-6 text-right", children: "PROTOCOLS" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 548,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 546,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 545,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-slate-100", children: academicYears.sort((a, b) => b.year.localeCompare(a.year)).map(
        (y) => /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-slate-50/50 transition-colors group", children: [
          /* @__PURE__ */ jsxDEV("td", { className: "px-10 py-8 text-sm font-black text-slate-900 uppercase tracking-tight italic", children: y.year }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 554,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("td", { className: "px-10 py-8 text-right", children: /* @__PURE__ */ jsxDEV("button", { onClick: () => handleDelete("academicYears", y.id), className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group-hover:scale-110 shadow-sm", children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 557,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 556,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 555,
            columnNumber: 17
          }, this)
        ] }, y.id, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 553,
          columnNumber: 11
        }, this)
      ) }, void 0, false, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 551,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 544,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 543,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
    lineNumber: 519,
    columnNumber: 3
  }, this);
  const renderRecordings = () => {
    const filteredRecordings = recordings.filter((r) => selectedRecordingYear === "all" || r.yearId === selectedRecordingYear);
    return /* @__PURE__ */ jsxDEV("div", { className: "space-y-12", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-black mb-10 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter", children: [
          /* @__PURE__ */ jsxDEV(Plus, { className: "w-7 h-7 text-primary/40" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 575,
            columnNumber: 13
          }, this),
          " Add New Recording"
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 574,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Recording Headline" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 579,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                placeholder: "Recording Title",
                value: newRecording.title,
                onChange: (e) => setNewRecording({ ...newRecording, title: e.target.value }),
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 580,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 578,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Target Batch (Year)" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 589,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: newRecording.yearId,
                onChange: (e) => setNewRecording({ ...newRecording, yearId: e.target.value }),
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold focus:outline-none focus:border-primary/30 transition-all appearance-none cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "", children: "Select Year" }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 595,
                    columnNumber: 17
                  }, this),
                  academicYears.map((y) => /* @__PURE__ */ jsxDEV("option", { value: y.id, children: y.year }, y.id, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 596,
                    columnNumber: 43
                  }, this))
                ]
              },
              void 0,
              true,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 590,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 588,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Publish Date" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 600,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "date",
                value: newRecording.publishDate,
                onChange: (e) => setNewRecording({ ...newRecording, publishDate: e.target.value }),
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold focus:outline-none focus:border-primary/30 transition-all"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 601,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 599,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-2 space-y-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Video Transmission Protocol (URL)" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 609,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                placeholder: "Video Link",
                value: newRecording.videoUrl,
                onChange: (e) => setNewRecording({ ...newRecording, videoUrl: e.target.value }),
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-mono tracking-widest focus:outline-none focus:border-primary/30 transition-all"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 610,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 608,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Privacy & UX Toggles" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 619,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-1 gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    type: "button",
                    onClick: () => setNewRecording({ ...newRecording, visibility: "private" }),
                    className: `flex-1 py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${newRecording.visibility === "private" ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" : "bg-slate-50 text-slate-400 border-slate-200"}`,
                    children: "SECURE"
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 622,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    type: "button",
                    onClick: () => setNewRecording({ ...newRecording, visibility: "unlisted" }),
                    className: `flex-1 py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${newRecording.visibility === "unlisted" ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" : "bg-slate-50 text-slate-400 border-slate-200"}`,
                    children: "GUEST"
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 629,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 621,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  type: "button",
                  onClick: () => setNewRecording({ ...newRecording, isSafeZone: !newRecording.isSafeZone }),
                  className: `px-6 rounded-2xl border transition-all flex items-center gap-2 ${newRecording.isSafeZone ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/20" : "bg-slate-50 text-slate-400 border-slate-200"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV(ShieldCheck, { className: `w-4 h-4 ${newRecording.isSafeZone ? "text-primary" : "text-slate-300"}` }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 642,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-black uppercase tracking-widest", children: "SAFE_ZONE" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 643,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 637,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 620,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 618,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 577,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: handleAddRecording, className: "mt-10 bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20", children: "DEPLOY RECORDING" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 648,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 573,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-8 rounded-[35px] shadow-sm flex items-center gap-6 overflow-x-auto custom-scrollbar no-scrollbar scroll-smooth", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setSelectedRecordingYear("all"),
            className: `shrink-0 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedRecordingYear === "all" ? "bg-primary text-white shadow-xl shadow-primary/20" : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`,
            children: "ALL_RECORDS"
          },
          void 0,
          false,
          {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 655,
            columnNumber: 11
          },
          this
        ),
        academicYears.sort((a, b) => b.year.localeCompare(a.year)).map(
          (y) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setSelectedRecordingYear(y.id),
              className: `shrink-0 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedRecordingYear === y.id ? "bg-primary text-white shadow-xl shadow-primary/20" : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`,
              children: [
                "BATCH_",
                y.year
              ]
            },
            y.id,
            true,
            {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 662,
              columnNumber: 11
            },
            this
          )
        )
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 654,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
        filteredRecordings.sort((a, b) => b.publishDate.localeCompare(a.publishDate)).map(
          (rec) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 rounded-[32px] overflow-hidden group hover:border-primary/30 transition-all duration-500 shadow-sm relative", children: /* @__PURE__ */ jsxDEV("div", { className: "p-8", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-start mb-6", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10", children: /* @__PURE__ */ jsxDEV(Play, { className: "w-5 h-5 text-primary" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 678,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 677,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("button", { onClick: () => handleDelete("recordings", rec.id), className: "p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 transition-all", children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 681,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 680,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 676,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("h4", { className: "text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-2 group-hover:text-primary transition-colors", children: rec.title }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 684,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2 mb-6", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "px-3 py-1 bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest rounded-lg border border-slate-100", children: rec.publishDate }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 686,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: `px-3 py-1 text-white text-[8px] font-black uppercase tracking-widest rounded-lg ${rec.visibility === "private" ? "bg-red-500" : "bg-slate-900"}`, children: rec.visibility }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 689,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 685,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setSelectedLesson({ id: rec.id, topic: rec.title, subTopic: "Recording", videoUrl: rec.videoUrl, videoType: "youtube", visibility: rec.visibility, createdAt: rec.createdAt, maxViews: rec.maxViews }),
                className: "w-full py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-primary hover:border-primary/20 transition-all",
                children: "PREVIEW STREAM →"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 693,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 675,
            columnNumber: 15
          }, this) }, rec.id, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 674,
            columnNumber: 11
          }, this)
        ),
        filteredRecordings.length === 0 && /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-3 py-20 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxDEV(Layers, { className: "w-16 h-16 text-slate-100 mb-6" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 704,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 font-black uppercase tracking-widest text-[10px]", children: "No recordings found for this partition." }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 705,
            columnNumber: 16
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 703,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 672,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 572,
      columnNumber: 7
    }, this);
  };
  const renderOverview = () => {
    const selectedYear = academicYears.find((y) => y.id === overviewBatchId);
    const batchResults = overviewBatchId === "all" ? paperResults : paperResults.filter((r) => r.yearId === overviewBatchId);
    const batchPaperNumbers = Array.from(new Set(batchResults.map((r) => r.paperNumber)));
    const latestPaperNum = batchPaperNumbers.length > 0 ? Math.max(...batchPaperNumbers) : null;
    const latestPaperResults = latestPaperNum !== null ? batchResults.filter((r) => r.paperNumber === latestPaperNum).sort((a, b) => b.marks - a.marks) : [];
    const topScorer = latestPaperResults[0];
    const top10 = latestPaperResults.slice(0, 10);
    const studentBestMarks = batchResults.reduce((acc, res) => {
      if (!acc[res.studentIndex] || res.marks > acc[res.studentIndex].marks) {
        acc[res.studentIndex] = res;
      }
      return acc;
    }, {});
    const batchChampions = Object.values(studentBestMarks).sort((a, b) => b.marks - a.marks).slice(0, 10);
    return /* @__PURE__ */ jsxDEV("div", { className: "space-y-12 pb-24", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "glass p-10 rounded-[40px] relative overflow-hidden group hover:border-primary/20 transition-all duration-500 bg-white shadow-xl shadow-slate-200/50", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-6 mb-6 relative z-10", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxDEV(Users, { className: "w-8 h-8 text-primary" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 745,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 744,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-[10px] uppercase font-black tracking-[0.3em] mb-1", children: t("dash.admin.totalStudents") }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 748,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "text-5xl font-black text-slate-900 italic tracking-tighter", children: students.length }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 749,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 747,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 743,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 742,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "glass p-10 rounded-[40px] relative overflow-hidden group hover:border-primary/20 transition-all duration-500 bg-white shadow-xl shadow-slate-200/50", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-6 mb-6 relative z-10", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxDEV(BookOpen, { className: "w-8 h-8 text-primary" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 757,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 756,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-[10px] uppercase font-black tracking-[0.3em] mb-1", children: t("dash.admin.studyPacks") }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 760,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "text-5xl font-black text-slate-900 italic tracking-tighter", children: lessons.length }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 761,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 759,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 755,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 754,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "glass p-10 rounded-[40px] relative overflow-hidden group hover:border-primary/20 transition-all duration-500 bg-white shadow-xl shadow-slate-200/50", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-6 mb-6 relative z-10", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxDEV(Video, { className: "w-8 h-8 text-primary" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 769,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 768,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-[10px] uppercase font-black tracking-[0.3em] mb-1", children: t("dash.admin.liveClasses") }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 772,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "text-5xl font-black text-slate-900 italic tracking-tighter", children: onlineClasses.length }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 773,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 771,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 767,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 766,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 741,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-3 rounded-[30px] shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar max-w-fit mx-auto", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setOverviewBatchId("all"),
            className: `px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${overviewBatchId === "all" ? "bg-primary text-white shadow-lg" : "bg-transparent text-slate-400 hover:bg-slate-50"}`,
            children: "All Analytics"
          },
          void 0,
          false,
          {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 781,
            columnNumber: 11
          },
          this
        ),
        academicYears.sort((a, b) => b.year.localeCompare(a.year)).map(
          (y) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setOverviewBatchId(y.id),
              className: `px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${overviewBatchId === y.id ? "bg-primary text-white shadow-lg" : "bg-transparent text-slate-400 hover:bg-slate-50"}`,
              children: [
                "Batch ",
                y.year
              ]
            },
            y.id,
            true,
            {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 788,
              columnNumber: 11
            },
            this
          )
        )
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 780,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-8 space-y-8", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 rounded-[50px] p-12 text-white relative overflow-hidden group", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 p-16 opacity-10 pointer-events-none rotate-12 group-hover:scale-110 transition-transform duration-1000", children: /* @__PURE__ */ jsxDEV(TrendingUp, { className: "w-64 h-64" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 804,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 803,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 mb-8", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "px-5 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full", children: "Latest Evolution" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 809,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 font-black tracking-widest text-[10px] uppercase", children: [
                  "Paper_",
                  latestPaperNum || "N/A"
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 810,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 808,
                columnNumber: 18
              }, this),
              topScorer ? /* @__PURE__ */ jsxDEV("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-xs font-black uppercase tracking-[0.3em] mb-2 italic", children: "Current Peak Performer" }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 816,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("h2", { className: "text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none truncate max-w-full", children: students.find((s) => s.studentId === topScorer.studentIndex)?.name || `INDEX_${topScorer.studentIndex}` }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 817,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 815,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-12", children: [
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("p", { className: "text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1", children: "AGGREGATE_MARK" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 823,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-4xl font-black text-primary italic", children: [
                      "%",
                      topScorer.marks
                    ] }, void 0, true, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 824,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 822,
                    columnNumber: 26
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "w-[1px] h-12 bg-slate-800" }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 826,
                    columnNumber: 26
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("p", { className: "text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1", children: "CANDIDATE_ID" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 828,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-4xl font-black text-white font-mono tracking-tighter", children: topScorer.studentIndex }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 829,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 827,
                    columnNumber: 26
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 821,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 814,
                columnNumber: 17
              }, this) : /* @__PURE__ */ jsxDEV("div", { className: "py-20 text-center opacity-20 italic font-black uppercase tracking-[0.2em]", children: "Transmission Null: Waiting for sequence sync" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 834,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 807,
              columnNumber: 16
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 802,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 rounded-[50px] p-12 shadow-xl shadow-slate-200/30", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-12", children: [
              /* @__PURE__ */ jsxDEV("h4", { className: "text-2xl font-black italic tracking-tighter uppercase text-slate-900 border-l-4 border-primary pl-6", children: [
                "Top 10: Paper ",
                latestPaperNum
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 842,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] font-black text-slate-400 tracking-widest uppercase", children: [
                "Batch ",
                selectedYear?.year || "Global"
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 845,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 841,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
              top10.map(
                (res, i) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-primary transition-all", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-6", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: `w-10 h-10 flex items-center justify-center rounded-xl font-black italic ${i === 0 ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-white text-slate-400 group-hover:bg-white/20 group-hover:text-white"}`, children: [
                      "#",
                      i + 1
                    ] }, void 0, true, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 852,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-black text-slate-900 uppercase group-hover:text-white transition-colors", children: students.find((s) => s.studentId === res.studentIndex)?.name || `STUDENT_${res.studentIndex}` }, void 0, false, {
                        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                        lineNumber: 856,
                        columnNumber: 30
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] font-mono text-slate-400 uppercase tracking-widest group-hover:text-white/60", children: [
                        "ID: ",
                        res.studentIndex
                      ] }, void 0, true, {
                        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                        lineNumber: 857,
                        columnNumber: 30
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 855,
                      columnNumber: 27
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 851,
                    columnNumber: 24
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-right", children: /* @__PURE__ */ jsxDEV("p", { className: "text-xl font-black italic text-primary group-hover:text-white leading-none", children: [
                    "%",
                    res.marks
                  ] }, void 0, true, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 861,
                    columnNumber: 27
                  }, this) }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 860,
                    columnNumber: 24
                  }, this)
                ] }, res.id, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 850,
                  columnNumber: 17
                }, this)
              ),
              top10.length === 0 && /* @__PURE__ */ jsxDEV("p", { className: "text-center py-20 text-xs font-black text-slate-300 uppercase tracking-widest italic animate-pulse", children: "Scanning database for results..." }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 865,
                columnNumber: 42
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 848,
              columnNumber: 16
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 840,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 801,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-4 space-y-8", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 rounded-[50px] p-10 shadow-xl overflow-hidden relative", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-10 border-b border-slate-100 pb-8", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20", children: /* @__PURE__ */ jsxDEV(Trophy, { className: "w-6 h-6" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 875,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 874,
              columnNumber: 20
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h4", { className: "text-lg font-black uppercase italic tracking-tighter text-slate-900 leading-tight", children: "Batch Champions" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 878,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-400 font-black uppercase tracking-widest", children: "All-Time Peak Records" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 879,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 877,
              columnNumber: 20
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 873,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
            batchChampions.map(
              (res, i) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-5 group", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black ${i < 3 ? "bg-primary/10 text-primary border border-primary/20" : "bg-slate-50 text-slate-300 border border-slate-100"}`, children: i + 1 }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 887,
                    columnNumber: 27
                  }, this),
                  i === 0 && /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping" }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 890,
                    columnNumber: 39
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 886,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] font-black uppercase text-slate-900 truncate tracking-tight", children: students.find((s) => s.studentId === res.studentIndex)?.name || `ID_${res.studentIndex}` }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 893,
                    columnNumber: 28
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-[8px] font-black uppercase tracking-widest text-primary/60 italic", children: [
                    "Paper ",
                    res.paperNumber,
                    " Peak"
                  ] }, void 0, true, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 894,
                    columnNumber: 28
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 892,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-right", children: /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-black italic text-slate-900", children: [
                  "%",
                  res.marks
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 897,
                  columnNumber: 28
                }, this) }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 896,
                  columnNumber: 25
                }, this)
              ] }, res.id, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 885,
                columnNumber: 17
              }, this)
            ),
            batchChampions.length === 0 && /* @__PURE__ */ jsxDEV("p", { className: "text-center py-20 text-xs font-black text-slate-200 uppercase tracking-widest italic leading-relaxed", children: [
              "No champion data",
              /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 901,
                columnNumber: 184
              }, this),
              "extracted yet."
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 901,
              columnNumber: 52
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 883,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 872,
          columnNumber: 14
        }, this) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 871,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 799,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 739,
      columnNumber: 7
    }, this);
  };
  const renderClasses = () => {
    const groupedLessons = lessons.reduce((acc, lesson) => {
      if (!acc[lesson.topic]) acc[lesson.topic] = [];
      acc[lesson.topic].push(lesson);
      return acc;
    }, {});
    const sortedTopics = Object.keys(groupedLessons).sort();
    const existingTopics = sortedTopics;
    return /* @__PURE__ */ jsxDEV("div", { className: "space-y-12", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-black mb-10 text-[#1a1a1a] flex items-center gap-4 uppercase italic tracking-tighter", children: [
          /* @__PURE__ */ jsxDEV(Plus, { className: "w-7 h-7 text-primary/40" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 924,
            columnNumber: 11
          }, this),
          " ",
          t("dash.admin.addNewLesson")
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 923,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-1 space-y-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1", children: "Study Pack Access Security" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 928,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setNewLesson({ ...newLesson, visibility: "private", videoType: "drive" }),
                  className: `flex-1 py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${newLesson.visibility === "private" ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" : "bg-slate-50 text-[#1a1a1a] border-slate-200 hover:border-primary/20"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3 h-3" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 934,
                      columnNumber: 17
                    }, this),
                    " Private (Secure)"
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 930,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setNewLesson({ ...newLesson, visibility: "unlisted", videoType: "youtube" }),
                  className: `flex-1 py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${newLesson.visibility === "unlisted" ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" : "bg-slate-50 text-[#1a1a1a] border-slate-200 hover:border-primary/20"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV(ExternalLink, { className: "w-3 h-3" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 940,
                      columnNumber: 17
                    }, this),
                    " Unlisted (Public)"
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 936,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 929,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 927,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-1 space-y-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1", children: "Target Batch (Year)" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 946,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: newLesson.yearId,
                onChange: (e) => setNewLesson({ ...newLesson, yearId: e.target.value }),
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold focus:outline-none focus:border-primary/30 transition-all appearance-none cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "", children: "Select Year (Optional)" }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 952,
                    columnNumber: 15
                  }, this),
                  academicYears.map((y) => /* @__PURE__ */ jsxDEV("option", { value: y.id, children: y.year }, y.id, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 953,
                    columnNumber: 41
                  }, this))
                ]
              },
              void 0,
              true,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 947,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 945,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-2 space-y-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-2 px-1", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em]", children: "Study Pack (Topic)" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 959,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex bg-slate-100 p-1 rounded-lg gap-1", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setTopicMode("existing"),
                    className: `px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-md transition-all ${topicMode === "existing" ? "bg-white text-primary shadow-sm" : "text-slate-400"}`,
                    children: "Existing"
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 961,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setTopicMode("new"),
                    className: `px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-md transition-all ${topicMode === "new" ? "bg-white text-primary shadow-sm" : "text-slate-400"}`,
                    children: "New"
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 967,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 960,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 958,
              columnNumber: 14
            }, this),
            topicMode === "existing" && existingTopics.length > 0 ? /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: newLesson.topic,
                onChange: (e) => setNewLesson({ ...newLesson, topic: e.target.value }),
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold focus:outline-none focus:border-primary/30 transition-all cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "", children: "Choose an existing study pack..." }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 982,
                    columnNumber: 17
                  }, this),
                  existingTopics.map((t2) => /* @__PURE__ */ jsxDEV("option", { value: t2, children: t2 }, t2, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 983,
                    columnNumber: 44
                  }, this))
                ]
              },
              void 0,
              true,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 977,
                columnNumber: 15
              },
              this
            ) : /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                placeholder: "Enter new study pack name / topic",
                value: newLesson.topic,
                onChange: (e) => setNewLesson({ ...newLesson, topic: e.target.value }),
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-sans"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 986,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 957,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1", children: "Lesson Name (Sub Topic)" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 997,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                placeholder: "Lesson Name",
                value: newLesson.subTopic,
                onChange: (e) => setNewLesson({ ...newLesson, subTopic: e.target.value }),
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-sans"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 998,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 996,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-1 space-y-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1", children: "Video Source Identity (URL)" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1007,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                placeholder: "Video URL",
                value: newLesson.videoUrl,
                onChange: (e) => setNewLesson({ ...newLesson, videoUrl: e.target.value }),
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-mono tracking-widest placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1008,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1006,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-2 space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex gap-6 items-end", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex-1 space-y-2", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1", children: "Thumbnail Preview Reference" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1019,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    placeholder: "Thumbnail Image URL (Optional)",
                    value: newLesson.thumbnailUrl,
                    onChange: (e) => setNewLesson({ ...newLesson, thumbnailUrl: e.target.value }),
                    className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1020,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1018,
                columnNumber: 15
              }, this),
              newLesson.thumbnailUrl && /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-xl rotate-3", children: /* @__PURE__ */ jsxDEV(
                "img",
                {
                  src: transformImageUrl(newLesson.thumbnailUrl),
                  className: "w-full h-full object-cover",
                  referrerPolicy: "no-referrer"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1030,
                  columnNumber: 19
                },
                this
              ) }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1029,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1017,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex gap-6 items-end", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex-1 space-y-2", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1", children: "Study Pack Cover Image" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1040,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    placeholder: "Image URL (For Study Packs)",
                    value: newLesson.imageUrl,
                    onChange: (e) => setNewLesson({ ...newLesson, imageUrl: e.target.value }),
                    className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1041,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1039,
                columnNumber: 15
              }, this),
              newLesson.imageUrl && /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-xl -rotate-3", children: /* @__PURE__ */ jsxDEV(
                "img",
                {
                  src: transformImageUrl(newLesson.imageUrl),
                  className: "w-full h-full object-cover",
                  referrerPolicy: "no-referrer"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1051,
                  columnNumber: 19
                },
                this
              ) }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1050,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1038,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1016,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1", children: "Stream Host Provider" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1061,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: newLesson.videoType,
                onChange: (e) => setNewLesson({ ...newLesson, videoType: e.target.value }),
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] appearance-none cursor-pointer focus:outline-none focus:border-primary/30 transition-all",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "youtube", children: "YouTube" }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1067,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "drive", children: "Google Drive" }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1068,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1062,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1060,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1", children: "Maximum Visual Access Count" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1073,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "number",
                  value: newLesson.maxViews,
                  onChange: (e) => setNewLesson({ ...newLesson, maxViews: parseInt(e.target.value) || 2 }),
                  className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-black tracking-widest focus:outline-none focus:border-primary/30 transition-all"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1074,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1072,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-5 h-5 text-primary" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1083,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]", children: "Safe Zone" }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1085,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-[8px] text-slate-400 font-bold", children: "Crop YouTube UI bars" }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1086,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1084,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1082,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setNewLesson({ ...newLesson, isSafeZone: !newLesson.isSafeZone }),
                  className: `w-12 h-6 rounded-full transition-all relative ${newLesson.isSafeZone ? "bg-primary" : "bg-slate-300"}`,
                  children: /* @__PURE__ */ jsxDEV("div", { className: `absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${newLesson.isSafeZone ? "left-7" : "left-1"}` }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1093,
                    columnNumber: 17
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1089,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1081,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1071,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 926,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: handleAddLesson, className: "mt-10 bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20", children: t("dash.admin.uploadLesson") }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1098,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 922,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-16", children: sortedTopics.map(
        (topic) => /* @__PURE__ */ jsxDEV("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-6 group", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-2 h-12 bg-primary rounded-full group-hover:scale-y-110 transition-transform duration-500" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1107,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h4", { className: "text-3xl font-black text-[#1a1a1a] uppercase italic tracking-tighter", children: topic }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1109,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[#1a1a1a] text-[10px] font-black uppercase tracking-[0.3em] opacity-40", children: [
                groupedLessons[topic].length,
                " STREAMS IN THIS PACK"
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1110,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1108,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1106,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: groupedLessons[topic].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(
            (lesson) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 rounded-[32px] overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "aspect-video w-full overflow-hidden relative", children: [
                lesson.imageUrl || lesson.thumbnailUrl ? /* @__PURE__ */ jsxDEV(
                  "img",
                  {
                    src: transformImageUrl(lesson.imageUrl || lesson.thumbnailUrl || ""),
                    alt: lesson.topic,
                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
                    referrerPolicy: "no-referrer"
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1119,
                    columnNumber: 19
                  },
                  this
                ) : /* @__PURE__ */ jsxDEV("div", { className: "w-full h-full bg-slate-100 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(BookOpen, { className: "w-10 h-10 text-slate-300" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1127,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1126,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute top-6 left-6 flex flex-wrap gap-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "px-3 py-1 bg-white/80 backdrop-blur-md text-[#1a1a1a] text-[8px] font-black uppercase tracking-[0.2em] rounded-lg border border-slate-200 shadow-sm", children: lesson.videoType }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1131,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: `px-3 py-1 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-lg border ${lesson.visibility === "private" ? "bg-red-500 border-red-600" : "bg-primary border-primary-dark"}`, children: lesson.visibility || "private" }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1134,
                    columnNumber: 23
                  }, this),
                  lesson.yearId && /* @__PURE__ */ jsxDEV("span", { className: "px-3 py-1 bg-slate-900/10 backdrop-blur-md text-slate-900 text-[8px] font-black uppercase tracking-[0.2em] rounded-lg border border-slate-300", children: academicYears.find((y) => y.id === lesson.yearId)?.year || "Batch" }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1138,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1130,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute top-6 right-6", children: /* @__PURE__ */ jsxDEV("button", { onClick: () => handleDelete("lessons", lesson.id), className: "p-3 bg-white/80 backdrop-blur-md text-slate-400 hover:text-red-500 rounded-xl border border-slate-200 transition-all hover:scale-110 shadow-sm", children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1145,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1144,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1143,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1117,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "p-10", children: [
                /* @__PURE__ */ jsxDEV("h4", { className: "text-xl font-black text-[#1a1a1a] uppercase italic tracking-tighter mb-2 group-hover:text-primary transition-colors", children: lesson.subTopic }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1150,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-t border-slate-100 pt-6", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 text-[10px] text-[#1a1a1a] font-black uppercase tracking-widest", children: [
                    "Access: ",
                    lesson.maxViews || 2,
                    "X"
                  ] }, void 0, true, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1152,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("button", { onClick: () => setSelectedLesson(lesson), className: "text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-primary-dark transition-all", children: "Preview Terminal →" }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1155,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1151,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1149,
                columnNumber: 19
              }, this)
            ] }, lesson.id, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1116,
              columnNumber: 15
            }, this)
          ) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1114,
            columnNumber: 13
          }, this)
        ] }, topic, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1105,
          columnNumber: 11
        }, this)
      ) }, void 0, false, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1103,
        columnNumber: 7
      }, this),
      selectedLesson && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-4xl", children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: () => setSelectedLesson(null), className: "mb-4 text-white hover:text-primary transition-all", children: "Close Preview" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1169,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(VideoPlayer, { url: selectedLesson.videoUrl, type: selectedLesson.videoType, visibility: selectedLesson.visibility, userEmail: profile.email, isSafeZone: selectedLesson.isSafeZone }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1170,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1168,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1167,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 921,
      columnNumber: 7
    }, this);
  };
  const [viewingHistory, setViewingHistory] = useState(null);
  const renderStudents = () => {
    const filteredStudents = students.filter((s) => {
      const search = studentSearch.toLowerCase();
      const name = (s.name || "").toLowerCase();
      const id = (s.studentId || "").toLowerCase();
      const email = (s.email || "").toLowerCase();
      return name.includes(search) || id.includes(search) || email.includes(search);
    });
    return /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-12", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-6 md:p-10 rounded-[40px] shadow-sm", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-xl md:text-2xl font-black mb-10 text-[#1a1a1a] flex items-center gap-4 uppercase italic tracking-tighter", children: [
            /* @__PURE__ */ jsxDEV(Plus, { className: "w-7 h-7 text-primary/40" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1195,
              columnNumber: 13
            }, this),
            " ",
            t("dash.admin.registerStudent")
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1194,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 lg:col-span-2", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1 italic", children: "Student Designation" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1199,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("input", { type: "text", placeholder: "Full Institutional Name", value: newStudent.name, onChange: (e) => setNewStudent({ ...newStudent, name: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-sans" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1200,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1198,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 lg:col-span-2", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1 italic", children: "Security Credentials (Email)" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1203,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("input", { type: "email", placeholder: "Official Email Address", value: newStudent.email, onChange: (e) => setNewStudent({ ...newStudent, email: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-mono" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1204,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1202,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1 italic", children: "Gov. Authentication (NIC)" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1207,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("input", { type: "text", placeholder: "NIC / ID Reference", value: newStudent.nic, onChange: (e) => setNewStudent({ ...newStudent, nic: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1208,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1206,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1 italic", children: "Batch Allocation (Year)" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1211,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV(
                "select",
                {
                  value: newStudent.yearId,
                  onChange: (e) => setNewStudent({ ...newStudent, yearId: e.target.value }),
                  className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[#1a1a1a] text-xs font-bold focus:outline-none focus:border-primary/30 transition-all appearance-none cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxDEV("option", { value: "", children: "Select Year" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 1217,
                      columnNumber: 17
                    }, this),
                    academicYears.map((y) => /* @__PURE__ */ jsxDEV("option", { value: y.id, children: y.year }, y.id, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 1218,
                      columnNumber: 43
                    }, this))
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1212,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1210,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1 italic", children: "Batch Allocation (Class)" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1222,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("input", { type: "text", placeholder: "Academic Class", value: newStudent.class, onChange: (e) => setNewStudent({ ...newStudent, class: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1223,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1221,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 lg:col-span-2", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Prior Academic Entity" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1226,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("input", { type: "text", placeholder: "School Name", value: newStudent.school, onChange: (e) => setNewStudent({ ...newStudent, school: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1227,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1225,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 lg:col-span-3", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Geographic Coordinates (Address)" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1230,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("input", { type: "text", placeholder: "Physical Address", value: newStudent.address, onChange: (e) => setNewStudent({ ...newStudent, address: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1231,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1229,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Direct Transmission (WhatsApp)" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1234,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("input", { type: "text", placeholder: "Mobile Number", value: newStudent.whatsapp, onChange: (e) => setNewStudent({ ...newStudent, whatsapp: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-mono" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1235,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1233,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1197,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("button", { onClick: handleAddStudent, className: "mt-10 bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20", children: t("dash.admin.addStudent") }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1238,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1193,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-6 md:p-10 rounded-[40px] shadow-sm", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-xl md:text-2xl font-black text-slate-900 italic uppercase tracking-tighter", children: "Strategic Student Management" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1244,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleCopyPaidEmails,
                className: "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary-dark transition-colors group",
                children: [
                  /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3 group-hover:scale-110 transition-transform" }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1249,
                    columnNumber: 17
                  }, this),
                  "Copy Paid Emails (CSV)"
                ]
              },
              void 0,
              true,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1245,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1243,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "relative w-full md:w-[500px] group", children: [
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                placeholder: "SEEK STUDENT BY NAME OR SERIAL...",
                value: studentSearch,
                onChange: (e) => setStudentSearch(e.target.value),
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-5 text-slate-900 text-[10px] font-black tracking-[0.2em] focus:outline-none focus:border-primary/30 transition-all placeholder:text-slate-300"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1254,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(Users, { className: "w-4 h-4 text-slate-300 absolute left-6 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1261,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1253,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1242,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1241,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 shadow-sm rounded-[40px] overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left", children: [
          /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "bg-slate-50 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic border-b border-slate-100", children: [
            /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-5", children: "ENTITY_IDENTITY" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1271,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-5", children: "INDEX_SERIAL" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1272,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-5", children: "GOV_ID" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1273,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-5", children: "CLASS_NODE" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1274,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-5", children: "ACADEMIC_SCHOOL" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1275,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-5", children: "W_APP_LINK" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1276,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-5 text-center", children: [
              "ACCESS_PROTOCOL (",
              currentMonth,
              ")"
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1277,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-6 py-5 text-right", children: "PROTOCOLS" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1278,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1270,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1269,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-slate-100", children: filteredStudents.map(
            (student) => /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-slate-50/50 transition-colors group", children: [
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-6 transition-all duration-300", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs md:text-sm font-black text-slate-900 italic uppercase tracking-tight", children: student.name }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1285,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-slate-400 font-medium truncate max-w-[150px] italic", children: student.address }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1286,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1284,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-6 text-[11px] text-slate-500 font-mono tracking-widest", children: student.studentId?.replace("YA-2026-", "") }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1288,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-6 text-[11px] text-slate-400 font-mono tracking-tight", children: student.nic }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1289,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-6 text-[11px] text-slate-500 font-black uppercase italic", children: student.class }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1290,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-6 text-[11px] text-slate-400 uppercase font-bold tracking-tight", children: student.school }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1291,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-6 text-[11px] text-slate-400 font-mono", children: student.whatsapp }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1292,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-6 text-center", children: /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => togglePayment(student.id, currentMonth, student.payments?.[currentMonth] || false),
                  className: `w-10 h-10 rounded-xl border flex items-center justify-center mx-auto transition-all text-xs font-black ${student.payments?.[currentMonth] ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-slate-50 border-slate-200 text-slate-300 hover:border-primary/20 hover:text-slate-400"}`,
                  children: student.payments?.[currentMonth] ? "✓" : "✕"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1294,
                  columnNumber: 23
                },
                this
              ) }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1293,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "px-6 py-6 text-right", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setEditingStudent(student),
                    className: "p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-primary transition-all group-hover:scale-105 shadow-sm",
                    title: "Modify Record",
                    children: /* @__PURE__ */ jsxDEV(Edit, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 1312,
                      columnNumber: 27
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1307,
                    columnNumber: 25
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setViewingHistory(student),
                    className: "p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-primary transition-all group-hover:scale-105 shadow-sm",
                    title: "Audit History",
                    children: /* @__PURE__ */ jsxDEV(BookOpen, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 1319,
                      columnNumber: 27
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1314,
                    columnNumber: 25
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("button", { onClick: () => handleDelete("students", student.id), className: "p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group-hover:scale-105 shadow-sm", title: "Delete Student", children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1322,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1321,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1306,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1305,
                columnNumber: 21
              }, this)
            ] }, student.id, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1283,
              columnNumber: 19
            }, this)
          ) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1281,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1268,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1267,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1266,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1192,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(AnimatePresence, { children: viewingHistory && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 },
          className: "bg-white border border-slate-200 rounded-3xl p-8 w-full max-w-md shadow-2xl",
          children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold mb-4 italic uppercase tracking-tighter text-slate-900", children: t("dash.admin.paymentHistory") }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1344,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-sm mb-6 font-medium italic", children: [
              t("dash.admin.historyFor"),
              " ",
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-900 font-black", children: viewingHistory.name }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1345,
                columnNumber: 106
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1345,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar", children: [
              Object.entries(viewingHistory.payments || {}).sort((a, b) => b[0].localeCompare(a[0])).map(
                ([month, paid]) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-black text-slate-900 italic", children: month }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1350,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: `text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${paid ? "bg-primary/10 text-primary border border-primary/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`, children: paid ? t("dash.admin.paid") : t("dash.admin.unpaid") }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1351,
                    columnNumber: 21
                  }, this)
                ] }, month, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1349,
                  columnNumber: 17
                }, this)
              ),
              (!viewingHistory.payments || Object.keys(viewingHistory.payments).length === 0) && /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center py-4", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100", children: /* @__PURE__ */ jsxDEV(BookOpen, { className: "w-8 h-8 text-slate-200" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1359,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1358,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-center text-slate-300 italic text-xs font-medium", children: t("dash.admin.noHistory") }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1361,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1357,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1347,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-8 pt-6 border-t border-slate-100", children: [
              /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-black mb-4 flex items-center gap-2 uppercase italic tracking-tighter text-slate-900", children: [
                /* @__PURE__ */ jsxDEV(Video, { className: "w-4 h-4 text-primary" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1368,
                  columnNumber: 19
                }, this),
                " Video View History"
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1367,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar", children: [
                Object.entries(viewingHistory.videoViews || {}).map(([lessonId, views]) => {
                  const lesson = lessons.find((l) => l.id === lessonId);
                  return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0 mr-4", children: [
                      /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-black truncate text-slate-900 italic uppercase", children: lesson?.topic || "Unknown Lesson" }, void 0, false, {
                        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                        lineNumber: 1376,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-400 font-bold uppercase tracking-widest", children: [
                        views,
                        " / ",
                        lesson?.maxViews || 2,
                        " views"
                      ] }, void 0, true, {
                        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                        lineNumber: 1377,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 1375,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: async () => {
                          if (confirm(`Reset views for "${lesson?.topic}"?`)) {
                            await updateDoc(doc(db, "students", viewingHistory.id), {
                              [`videoViews.${lessonId}`]: 0
                            });
                            setViewingHistory({ ...viewingHistory, videoViews: { ...viewingHistory.videoViews, [lessonId]: 0 } });
                          }
                        },
                        className: "text-[10px] text-primary hover:underline font-black uppercase tracking-widest",
                        children: "Reset"
                      },
                      void 0,
                      false,
                      {
                        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                        lineNumber: 1379,
                        columnNumber: 25
                      },
                      this
                    )
                  ] }, lessonId, true, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1374,
                    columnNumber: 23
                  }, this);
                }),
                (!viewingHistory.videoViews || Object.keys(viewingHistory.videoViews).length === 0) && /* @__PURE__ */ jsxDEV("p", { className: "text-center text-slate-300 py-4 italic text-xs font-medium", children: "No video views recorded yet." }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1396,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1370,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1366,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setViewingHistory(null),
                className: "w-full mt-8 bg-slate-900 text-white font-black uppercase italic tracking-widest py-3 rounded-xl hover:bg-slate-800 transition-all text-sm",
                children: t("dash.admin.close")
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1401,
                columnNumber: 15
              },
              this
            )
          ]
        },
        void 0,
        true,
        {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1338,
          columnNumber: 13
        },
        this
      ) }, void 0, false, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1337,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1335,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV(AnimatePresence, { children: editingStudent && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 },
          className: "bg-white border border-slate-200 rounded-3xl p-8 w-full max-w-2xl shadow-2xl",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-6", children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-black italic uppercase tracking-tighter text-slate-900", children: "Edit Student Record" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1423,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("button", { onClick: () => setEditingStudent(null), className: "p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400", children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1425,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1424,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1422,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic", children: "Full Name" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1431,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("input", { type: "text", value: editingStudent.name, onChange: (e) => setEditingStudent({ ...editingStudent, name: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-medium focus:outline-none focus:border-primary/30" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1432,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1430,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic", children: "Email (Read Only)" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1435,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("input", { type: "email", value: editingStudent.email, disabled: true, className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-400 text-sm font-medium opacity-60 cursor-not-allowed" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1436,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1434,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic", children: "Index Number" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1439,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("input", { type: "text", value: editingStudent.studentId, onChange: (e) => setEditingStudent({ ...editingStudent, studentId: e.target.value, indexNumber: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-mono tracking-widest focus:outline-none focus:border-primary/30" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1440,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1438,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic", children: "NIC / ID Number" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1443,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("input", { type: "text", value: editingStudent.nic, onChange: (e) => setEditingStudent({ ...editingStudent, nic: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-medium focus:outline-none focus:border-primary/30" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1444,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1442,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic", children: "Exam Year" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1447,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "select",
                  {
                    value: editingStudent.yearId || "",
                    onChange: (e) => setEditingStudent({ ...editingStudent, yearId: e.target.value }),
                    className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-primary/30",
                    children: [
                      /* @__PURE__ */ jsxDEV("option", { value: "", children: "Select Year" }, void 0, false, {
                        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                        lineNumber: 1453,
                        columnNumber: 21
                      }, this),
                      academicYears.map((y) => /* @__PURE__ */ jsxDEV("option", { value: y.id, children: y.year }, y.id, false, {
                        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                        lineNumber: 1454,
                        columnNumber: 47
                      }, this))
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1448,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1446,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic", children: "Class" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1458,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("input", { type: "text", value: editingStudent.class, onChange: (e) => setEditingStudent({ ...editingStudent, class: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-black uppercase italic focus:outline-none focus:border-primary/30" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1459,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1457,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic", children: "School" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1462,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("input", { type: "text", value: editingStudent.school, onChange: (e) => setEditingStudent({ ...editingStudent, school: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-bold uppercase focus:outline-none focus:border-primary/30" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1463,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1461,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic", children: "WhatsApp" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1466,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("input", { type: "text", value: editingStudent.whatsapp, onChange: (e) => setEditingStudent({ ...editingStudent, whatsapp: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-mono tracking-widest focus:outline-none focus:border-primary/30" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1467,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1465,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 italic", children: "Address" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1470,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("input", { type: "text", value: editingStudent.address, onChange: (e) => setEditingStudent({ ...editingStudent, address: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-medium italic focus:outline-none focus:border-primary/30" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1471,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1469,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1429,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setEditingStudent(null),
                  className: "flex-1 bg-slate-50 border border-slate-200 text-slate-400 font-black uppercase italic tracking-widest py-4 rounded-xl hover:bg-slate-100 transition-all text-sm",
                  children: "Cancel"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1476,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleUpdateStudent,
                  className: "flex-1 bg-primary text-white font-black uppercase italic tracking-widest py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-sm shadow-xl shadow-primary/20",
                  children: "Save Changes"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1482,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1475,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1416,
          columnNumber: 13
        },
        this
      ) }, void 0, false, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1415,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1413,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 1191,
      columnNumber: 7
    }, this);
  };
  const renderLive = () => /* @__PURE__ */ jsxDEV("div", { className: "space-y-12", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm", children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-black mb-10 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter", children: [
        /* @__PURE__ */ jsxDEV(Plus, { className: "w-7 h-7 text-primary/40" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1501,
          columnNumber: 11
        }, this),
        " ",
        t("dash.admin.broadcastAnnouncement")
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1500,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Session Headline" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1505,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "Session Title",
              value: newClass.title,
              onChange: (e) => setNewClass({ ...newClass, title: e.target.value }),
              className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1506,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1504,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Meeting Destination (Link)" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1515,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "Session Link",
              value: newClass.link,
              onChange: (e) => setNewClass({ ...newClass, link: e.target.value }),
              className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-mono tracking-widest placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-mono"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1516,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1514,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Classification Target" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1525,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: newClass.type,
              onChange: (e) => setNewClass({ ...newClass, type: e.target.value }),
              className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-600 appearance-none cursor-pointer focus:outline-none focus:border-primary/30 transition-all",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "today", children: "LIVE_TRANSMISSION" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1531,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "group", children: "RESOURCE_NODE" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1532,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1526,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1524,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-end", children: /* @__PURE__ */ jsxDEV("button", { onClick: handleAddClass, className: "w-full bg-primary text-white font-black uppercase italic tracking-[0.2em] py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20", children: "BROADCAST" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1536,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1535,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1503,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 1499,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: onlineClasses.map(
      (cls) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-10 rounded-[32px] relative overflow-hidden group hover:border-primary/20 transition-all duration-500 shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-8 relative z-10", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: `w-3 h-3 rounded-full ${cls.type === "zoom" ? "bg-primary animate-pulse" : "bg-indigo-500 animate-pulse"}` }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1548,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic", children: [
              "LIVE_",
              cls.type
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1549,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1547,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("button", { onClick: () => handleDelete("onlineClasses", cls.id), className: "p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 transition-all hover:bg-red-50", children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1552,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1551,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1546,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h4", { className: "text-2xl font-black text-slate-900 italic tracking-tighter uppercase mb-2 relative z-10 group-hover:text-primary transition-colors", children: cls.title }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1556,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-400 font-mono tracking-widest truncate mb-10 relative z-10 opacity-50", children: cls.link }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1557,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "a",
          {
            href: cls.link,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-primary-dark transition-colors relative z-10",
            children: "VALDIATE LINK →"
          },
          void 0,
          false,
          {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1559,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity", children: /* @__PURE__ */ jsxDEV(Video, { className: "w-32 h-32 text-primary" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1569,
          columnNumber: 16
        }, this) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1568,
          columnNumber: 13
        }, this)
      ] }, cls.id, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1545,
        columnNumber: 7
      }, this)
    ) }, void 0, false, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 1543,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
    lineNumber: 1498,
    columnNumber: 3
  }, this);
  const renderAdmins = () => /* @__PURE__ */ jsxDEV("div", { className: "space-y-12", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm", children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-black mb-10 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-7 h-7 text-primary/40" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1581,
          columnNumber: 11
        }, this),
        " ",
        t("dash.admin.authorizeNew")
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1580,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Admin Security Email" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1585,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "email",
              placeholder: "Google Account Email",
              value: newAuthAdmin.email,
              onChange: (e) => setNewAuthAdmin({ ...newAuthAdmin, email: e.target.value }),
              className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-mono"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1586,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1584,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Security Access Token" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1595,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "Designate Token",
              value: newAuthAdmin.password,
              onChange: (e) => setNewAuthAdmin({ ...newAuthAdmin, password: e.target.value }),
              className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-mono tracking-widest placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-mono"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1596,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1594,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1583,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("button", { onClick: handleAddAuthAdmin, className: "mt-10 bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20", children: "Commit Authorization" }, void 0, false, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1605,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 1579,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 shadow-sm rounded-[40px] overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left", children: [
      /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "bg-slate-50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic border-b border-slate-100", children: [
        /* @__PURE__ */ jsxDEV("th", { className: "px-10 py-6", children: "ADMINISTRATOR_ID" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1615,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "px-10 py-6", children: "SECURITY_TOKEN" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1616,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "px-10 py-6 text-right", children: "PROTOCOLS" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1617,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1614,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1613,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-slate-100", children: authorizedAdmins.map(
        (admin) => /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-slate-50/50 transition-colors group", children: [
          /* @__PURE__ */ jsxDEV("td", { className: "px-10 py-8 text-sm font-black text-slate-900 uppercase tracking-tight italic", children: admin.email }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1623,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("td", { className: "px-10 py-8 text-xs text-slate-500 font-mono tracking-widest", children: admin.password }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1624,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("td", { className: "px-10 py-8 text-right", children: /* @__PURE__ */ jsxDEV("button", { onClick: () => handleDelete("authorizedAdmins", admin.id), className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group-hover:scale-110 shadow-sm", children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1627,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1626,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1625,
            columnNumber: 19
          }, this)
        ] }, admin.id, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1622,
          columnNumber: 13
        }, this)
      ) }, void 0, false, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1620,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 1612,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 1611,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 1610,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
    lineNumber: 1578,
    columnNumber: 3
  }, this);
  const paperNumRef = React.useRef(null);
  const studentIndexRef = React.useRef(null);
  const marksRef = React.useRef(null);
  const renderMarks = () => {
    const filteredResults = paperResults.filter((r) => {
      const yearMatch = marksFilterYear === "all" || r.yearId === marksFilterYear;
      const paperMatch = marksFilterPaper === "all" || r.paperNumber === marksFilterPaper;
      return yearMatch && paperMatch;
    });
    return /* @__PURE__ */ jsxDEV("div", { className: "space-y-12 pb-20", children: /* @__PURE__ */ jsxDEV("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-10 rounded-[45px] shadow-sm relative overflow-hidden group", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000", children: /* @__PURE__ */ jsxDEV(BarChart3, { className: "w-32 h-32 text-primary" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1655,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1654,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-black mb-10 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter relative z-10", children: t("dash.admin.uploadMarks") }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1658,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Batch Year" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1664,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
              /* @__PURE__ */ jsxDEV(
                "select",
                {
                  value: newPaperResult.yearId,
                  onChange: (e) => setNewPaperResult({ ...newPaperResult, yearId: e.target.value }),
                  className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-black tracking-widest focus:outline-none focus:border-primary/30 transition-all appearance-none cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxDEV("option", { value: "", children: "Select Batch" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 1671,
                      columnNumber: 23
                    }, this),
                    academicYears.map(
                      (y) => /* @__PURE__ */ jsxDEV("option", { value: y.id, children: [
                        y.year,
                        " BATCH"
                      ] }, y.id, true, {
                        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                        lineNumber: 1673,
                        columnNumber: 21
                      }, this)
                    )
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1666,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(Calendar, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1676,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1665,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1663,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Exam Reference" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1680,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                ref: paperNumRef,
                type: "number",
                value: newPaperResult.paperNumber,
                onChange: (e) => setNewPaperResult({ ...newPaperResult, paperNumber: parseInt(e.target.value) || 1 }),
                onKeyDown: (e) => {
                  if (e.key === "Enter") studentIndexRef.current?.focus();
                },
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-black tracking-widest focus:outline-none focus:border-primary/30 transition-all"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1681,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1679,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Candidate Index" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1693,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                ref: studentIndexRef,
                type: "text",
                placeholder: "e.g. 0001",
                value: newPaperResult.studentIndex,
                onChange: (e) => setNewPaperResult({ ...newPaperResult, studentIndex: e.target.value }),
                onKeyDown: (e) => {
                  if (e.key === "Enter") marksRef.current?.focus();
                },
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all font-mono"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1694,
                columnNumber: 19
              },
              this
            ),
            newPaperResult.studentIndex && students.find((s) => s.studentId === newPaperResult.studentIndex) && /* @__PURE__ */ jsxDEV("p", { className: "text-[8px] text-primary font-black uppercase tracking-widest px-1 mt-2 animate-pulse", children: [
              "Identified: ",
              students.find((s) => s.studentId === newPaperResult.studentIndex)?.name
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1706,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1692,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic", children: "Aggregate (%)" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1712,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                ref: marksRef,
                type: "number",
                placeholder: "0-100",
                value: newPaperResult.marks,
                onChange: (e) => setNewPaperResult({ ...newPaperResult, marks: parseInt(e.target.value) || 0 }),
                onKeyDown: (e) => {
                  if (e.key === "Enter") handleAddPaperResult();
                },
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-black tracking-widest focus:outline-none focus:border-primary/30 transition-all font-mono"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1713,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1711,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1662,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: handleAddPaperResult, className: "mt-10 bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-103 active:scale-95 transition-all text-sm shadow-xl shadow-primary/20 w-full md:w-auto", children: "Commit Record & Sync Standings" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1726,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1653,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 shadow-sm rounded-[45px] overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-50/50 px-10 py-6 border-b border-slate-100 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic", children: "Transmitted Sequence Data" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1733,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-black uppercase tracking-widest text-primary italic", children: [
            filteredResults.length,
            " RECORDS FOUND"
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1735,
            columnNumber: 22
          }, this) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1734,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1732,
          columnNumber: 16
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left", children: [
          /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "bg-slate-50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic border-b border-slate-100/50", children: [
            /* @__PURE__ */ jsxDEV("th", { className: "px-10 py-6", children: "PROTOCOL" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1742,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-10 py-6", children: "BATCH_CORE" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1743,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-10 py-6", children: "PAPER" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1744,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-10 py-6", children: "INDEX_SERIAL" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1745,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-10 py-6", children: "NAME" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1746,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-10 py-6", children: "AGGREGATE" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1747,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "px-10 py-6 text-right", children: "STANDING" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1748,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1741,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1740,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-slate-100", children: [
            filteredResults.sort((a, b) => b.paperNumber - a.paperNumber || b.marks - a.marks).map((res) => {
              const student = students.find((s) => s.studentId === res.studentIndex || s.indexNumber === res.studentIndex);
              return /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-slate-50/50 transition-colors group", children: [
                /* @__PURE__ */ jsxDEV("td", { className: "px-10 py-8", children: /* @__PURE__ */ jsxDEV("button", { onClick: () => handleDelete("paperResults", res.id), className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group-hover:scale-110 shadow-sm hover:rotate-12", children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1758,
                  columnNumber: 31
                }, this) }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1757,
                  columnNumber: 29
                }, this) }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1756,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("td", { className: "px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest italic", children: academicYears.find((y) => y.id === res.yearId)?.year || "N/A" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1761,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("td", { className: "px-10 py-8 text-sm font-black text-slate-900 uppercase tracking-tight italic", children: [
                  "PAPER_",
                  res.paperNumber
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1764,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("td", { className: "px-10 py-8 text-xs text-slate-500 font-mono tracking-widest group-hover:text-primary transition-colors", children: res.studentIndex }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1765,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("td", { className: "px-10 py-8 text-[10px] font-bold text-slate-900 uppercase tracking-wide truncate max-w-[150px]", title: student?.name, children: student?.name || "UNKNOWN_NODE" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1766,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("td", { className: "px-10 py-8 text-xl font-black text-slate-900 italic tracking-tighter", children: [
                  res.marks,
                  "%"
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1769,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("td", { className: "px-10 py-8 text-right", children: /* @__PURE__ */ jsxDEV("span", { className: "px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all group-hover:bg-primary group-hover:text-white group-hover:border-primary shadow-sm", children: [
                  "#",
                  res.rank
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1771,
                  columnNumber: 29
                }, this) }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1770,
                  columnNumber: 27
                }, this)
              ] }, res.id, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1755,
                columnNumber: 23
              }, this);
            }),
            filteredResults.length === 0 && /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colSpan: 7, className: "px-10 py-32 text-center", children: [
              /* @__PURE__ */ jsxDEV(Microscope, { className: "w-16 h-16 text-slate-100 mx-auto mb-6" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1779,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 text-[10px] font-black uppercase tracking-widest italic opacity-50", children: "No sequence data found matching the current matrix configuration." }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1780,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1778,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1777,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1751,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1739,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1738,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1731,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 1652,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 1651,
      columnNumber: 7
    }, this);
  };
  const IconMap = {
    Microscope,
    Dna,
    Heart,
    Brain,
    Activity,
    GraduationCap,
    BookOpen,
    MapPin,
    Lightbulb,
    FileText,
    CalendarCheck,
    CheckCircle2,
    Clock
  };
  const getImagePath = (path) => {
    if (!path || typeof path !== "string" || path.trim() === "") return void 0;
    if (path.trim().includes(" ") || path.trim().length > 200) {
      return void 0;
    }
    if (path.startsWith("http") || path.startsWith("data:")) {
      return transformImageUrl(path) || void 0;
    }
    const cleanPath = path.trim().startsWith("/") ? path.trim() : `/${path.trim()}`;
    const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
    return `${base}${cleanPath}`;
  };
  const renderHomeManager = () => /* @__PURE__ */ jsxDEV("div", { className: `space-y-12 ${homePreviewMode ? "lg:grid lg:grid-cols-2 lg:gap-12 lg:space-y-0" : ""}`, children: [
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-8 max-h-[85vh] overflow-y-auto pr-4 custom-scrollbar", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between sticky top-0 bg-slate-50 z-20 pb-4", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-black uppercase italic tracking-tighter text-slate-900", children: "Nexus_Home_Core" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1818,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                if (window.confirm("Reset all hero slides to default local images?")) {
                  setHomeContent({
                    ...homeContent,
                    heroSlides: [
                      { id: "s1", title: "Bio_EXCELLENCE", subtitle: "MASTER THE ELEMENTS", imageUrl: "/1.avif", ctaText: "Join_Now", ctaUrl: "/lms", titleFontSize: 10, titleFontSizeMobile: 4 },
                      { id: "s2", title: "ADVANCED_CONCEPTS", subtitle: "BEYOND THE BASICS", imageUrl: "/2.avif", ctaText: "Explore", ctaUrl: "/lms", titleFontSize: 10, titleFontSizeMobile: 4 },
                      { id: "s3", title: "FUTURE_SCIENCE", subtitle: "INNOVATIVE LEARNING", imageUrl: "/3.avif", ctaText: "Get_Started", ctaUrl: "/lms", titleFontSize: 10, titleFontSizeMobile: 4 }
                    ]
                  });
                }
              },
              className: "px-4 py-2 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-100 hover:bg-red-500 hover:text-white transition-all shrink-0",
              children: "Reset_Slides"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1820,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setHomePreviewMode(!homePreviewMode),
              className: `px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${homePreviewMode ? "bg-primary text-black" : "bg-slate-200 text-slate-500"}`,
              children: homePreviewMode ? "Close_Preview" : "Live_Preview"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1837,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1819,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1817,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-8 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Users, { className: "w-5 h-5 text-primary" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1848,
            columnNumber: 13
          }, this),
          " Teacher Identity"
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1847,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 block mb-2", children: "Teacher Full Name" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1852,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("input", { type: "text", value: homeContent.teacherName, onChange: (e) => setHomeContent({ ...homeContent, teacherName: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1853,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1851,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 block mb-2", children: "Teacher Methodology" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1856,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("input", { type: "text", value: homeContent.teacherMethodology, onChange: (e) => setHomeContent({ ...homeContent, teacherMethodology: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1857,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1855,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 block mb-2", children: "Core Image (Avatar/Icons)" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1860,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("input", { type: "text", value: homeContent.teacherImageUrl, onChange: (e) => setHomeContent({ ...homeContent, teacherImageUrl: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1861,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1859,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 block mb-2", children: "Allowed Domain (for YouTube Player)" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1864,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                placeholder: typeof window !== "undefined" ? window.location.origin : "",
                value: homeContent.allowedDomain || "",
                onChange: (e) => setHomeContent({ ...homeContent, allowedDomain: e.target.value }),
                className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 font-mono"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1865,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[8px] text-slate-400 mt-1 px-1", children: [
              "Default: ",
              typeof window !== "undefined" ? window.location.origin : ""
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1872,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1863,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1850,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1846,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-8 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(LayoutGrid, { className: "w-5 h-5 text-primary" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 1880,
            columnNumber: 13
          }, this),
          " Hero Slides (Text Content)"
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1879,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
          (homeContent.heroSlides || []).map(
            (slide, idx) => /* @__PURE__ */ jsxDEV("div", { className: "p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-black uppercase text-primary italic", children: [
                  "Slide_0",
                  idx + 1
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1887,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      const slides = [...homeContent.heroSlides || []];
                      slides.splice(idx, 1);
                      setHomeContent({ ...homeContent, heroSlides: slides });
                    },
                    className: "p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors",
                    children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 1896,
                      columnNumber: 21
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1888,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1886,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 gap-3", children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("label", { className: "text-[8px] font-black uppercase text-slate-400 px-1 mb-1 block italic", children: "Title" }, void 0, false, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1902,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: "text",
                      value: slide.title,
                      onChange: (e) => {
                        const slides = [...homeContent.heroSlides || []];
                        slides[idx] = { ...slide, title: e.target.value };
                        setHomeContent({ ...homeContent, heroSlides: slides });
                      },
                      className: "w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold"
                    },
                    void 0,
                    false,
                    {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 1903,
                      columnNumber: 21
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1901,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("label", { className: "text-[8px] font-black uppercase text-slate-400 px-1 mb-1 block italic", children: "Subtitle" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 1916,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "input",
                      {
                        type: "text",
                        value: slide.subtitle,
                        onChange: (e) => {
                          const slides = [...homeContent.heroSlides || []];
                          slides[idx] = { ...slide, subtitle: e.target.value };
                          setHomeContent({ ...homeContent, heroSlides: slides });
                        },
                        className: "w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold"
                      },
                      void 0,
                      false,
                      {
                        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                        lineNumber: 1917,
                        columnNumber: 23
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1915,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("label", { className: "text-[8px] font-black uppercase text-slate-400 px-1 mb-1 block italic", children: "Background Image" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 1929,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxDEV(
                        "select",
                        {
                          value: ["/1.avif", "/2.avif", "/3.avif"].includes(slide.imageUrl || "") ? slide.imageUrl : "custom",
                          onChange: (e) => {
                            const val = e.target.value;
                            const slides = [...homeContent.heroSlides || []];
                            if (val !== "custom") {
                              slides[idx] = { ...slide, imageUrl: val };
                              setHomeContent({ ...homeContent, heroSlides: slides });
                            }
                          },
                          className: "flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-900 appearance-none cursor-pointer",
                          children: [
                            /* @__PURE__ */ jsxDEV("option", { value: "/1.avif", children: "Local: Image 01" }, void 0, false, {
                              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                              lineNumber: 1943,
                              columnNumber: 27
                            }, this),
                            /* @__PURE__ */ jsxDEV("option", { value: "/2.avif", children: "Local: Image 02" }, void 0, false, {
                              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                              lineNumber: 1944,
                              columnNumber: 27
                            }, this),
                            /* @__PURE__ */ jsxDEV("option", { value: "/3.avif", children: "Local: Image 03" }, void 0, false, {
                              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                              lineNumber: 1945,
                              columnNumber: 27
                            }, this),
                            /* @__PURE__ */ jsxDEV("option", { value: "custom", children: "-- Custom / External --" }, void 0, false, {
                              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                              lineNumber: 1946,
                              columnNumber: 27
                            }, this)
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                          lineNumber: 1931,
                          columnNumber: 25
                        },
                        this
                      ),
                      getImagePath(slide.imageUrl) && /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0 shadow-sm bg-slate-100", children: /* @__PURE__ */ jsxDEV("img", { src: getImagePath(slide.imageUrl), className: "w-full h-full object-cover", onError: (e) => e.currentTarget.src = "" }, void 0, false, {
                        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                        lineNumber: 1950,
                        columnNumber: 30
                      }, this) }, void 0, false, {
                        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                        lineNumber: 1949,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 1930,
                      columnNumber: 23
                    }, this),
                    (!["/1.avif", "/2.avif", "/3.avif"].includes(slide.imageUrl || "") || slide.imageUrl === "") && /* @__PURE__ */ jsxDEV(
                      "input",
                      {
                        type: "text",
                        placeholder: "Paste External Image URL",
                        value: slide.imageUrl,
                        onChange: (e) => {
                          const slides = [...homeContent.heroSlides || []];
                          slides[idx] = { ...slide, imageUrl: e.target.value };
                          setHomeContent({ ...homeContent, heroSlides: slides });
                        },
                        className: "w-full mt-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-[10px] font-mono focus:outline-none focus:border-primary/50"
                      },
                      void 0,
                      false,
                      {
                        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                        lineNumber: 1955,
                        columnNumber: 19
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1928,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1914,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("label", { className: "text-[8px] font-black uppercase text-slate-400 px-1 mb-1 block italic", children: "Button Text" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 1971,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "input",
                      {
                        type: "text",
                        value: slide.ctaText || "",
                        onChange: (e) => {
                          const slides = [...homeContent.heroSlides || []];
                          slides[idx] = { ...slide, ctaText: e.target.value };
                          setHomeContent({ ...homeContent, heroSlides: slides });
                        },
                        className: "w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold"
                      },
                      void 0,
                      false,
                      {
                        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                        lineNumber: 1972,
                        columnNumber: 23
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1970,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("label", { className: "text-[8px] font-black uppercase text-slate-400 px-1 mb-1 block italic", children: "Button URL" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 1984,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "input",
                      {
                        type: "text",
                        value: slide.ctaUrl || "",
                        onChange: (e) => {
                          const slides = [...homeContent.heroSlides || []];
                          slides[idx] = { ...slide, ctaUrl: e.target.value };
                          setHomeContent({ ...homeContent, heroSlides: slides });
                        },
                        className: "w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono"
                      },
                      void 0,
                      false,
                      {
                        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                        lineNumber: 1985,
                        columnNumber: 23
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 1983,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 1969,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 1900,
                columnNumber: 17
              }, this)
            ] }, slide.id, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 1885,
              columnNumber: 11
            }, this)
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                const slides = homeContent.heroSlides || [];
                const localImage = LOCAL_SLIDES[slides.length % LOCAL_SLIDES.length].imageUrl;
                setHomeContent({ ...homeContent, heroSlides: [...slides, {
                  id: Date.now().toString(),
                  title: "NEW_SLIDE_TITLE",
                  subtitle: "NEW_SUBTITLE",
                  ctaText: "EXPLORE",
                  ctaUrl: "/lms",
                  imageUrl: localImage,
                  titleFontSize: 10,
                  titleFontSizeMobile: 4
                }] });
              },
              className: "w-full bg-slate-900 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all border border-white/10",
              children: "Add_New_Slide_Layer"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2001,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 1883,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 1878,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-8 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Type, { className: "w-5 h-5 text-primary" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2025,
            columnNumber: 13
          }, this),
          " About Section"
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2024,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxDEV("input", { placeholder: "About Title", type: "text", value: homeContent.aboutTitle, onChange: (e) => setHomeContent({ ...homeContent, aboutTitle: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2028,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-black tracking-widest px-1 block mb-1", children: "Teacher Profile Image (Use /1.avif for local or an external URL)" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2030,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxDEV("input", { type: "text", value: homeContent.teacherAboutUrl, onChange: (e) => setHomeContent({ ...homeContent, teacherAboutUrl: e.target.value }), className: "flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2032,
                columnNumber: 17
              }, this),
              getImagePath(homeContent.teacherAboutUrl) && /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex-shrink-0", children: /* @__PURE__ */ jsxDEV("img", { src: getImagePath(homeContent.teacherAboutUrl), className: "w-full h-full object-cover", onError: (e) => e.currentTarget.src = "" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2035,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2034,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2031,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2029,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("textarea", { placeholder: "About Description (HTML)", rows: 6, value: homeContent.aboutRichText, onChange: (e) => setHomeContent({ ...homeContent, aboutRichText: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2040,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2027,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2023,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-8 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Activity, { className: "w-5 h-5 text-primary" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2047,
            columnNumber: 13
          }, this),
          " Sync Protocol Steps"
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2046,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 mb-8", children: [
          /* @__PURE__ */ jsxDEV("input", { placeholder: "Step Title", type: "text", value: newProcessStep.title, onChange: (e) => setNewProcessStep({ ...newProcessStep, title: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2050,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("textarea", { placeholder: "Step Description", value: newProcessStep.description, onChange: (e) => setNewProcessStep({ ...newProcessStep, description: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs resize-none", rows: 2 }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2051,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-4 sm:grid-cols-6 gap-2", children: Object.keys(IconMap).map(
            (icon) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setNewProcessStep({ ...newProcessStep, icon }),
                className: `p-3 rounded-lg border flex items-center justify-center transition-all ${newProcessStep.icon === icon ? "bg-primary/20 border-primary" : "bg-slate-50 border-slate-100"}`,
                title: icon,
                children: React.createElement(IconMap[icon] || BookOpen, { className: "w-4 h-4 text-slate-600" })
              },
              icon,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2054,
                columnNumber: 13
              },
              this
            )
          ) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2052,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                const steps = homeContent.processSteps || [];
                setHomeContent({ ...homeContent, processSteps: [...steps, { ...newProcessStep, id: Date.now().toString() }] });
                setNewProcessStep({ title: "", description: "", icon: "Activity" });
              },
              className: "w-full bg-slate-900 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all",
              children: "Add_Protocol_Step"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2064,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2049,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: (homeContent.processSteps || []).map(
          (step, idx) => /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary border border-slate-100", children: React.createElement(IconMap[step.icon] || BookOpen, { className: "w-4 h-4" }) }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2079,
                columnNumber: 20
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-black uppercase italic tracking-tight", children: step.title }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2082,
                columnNumber: 20
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2078,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => {
                  const steps = [...homeContent.processSteps || []];
                  steps.splice(idx, 1);
                  setHomeContent({ ...homeContent, processSteps: steps });
                },
                className: "text-red-400 hover:text-red-600",
                children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 2092,
                  columnNumber: 19
                }, this)
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2084,
                columnNumber: 17
              },
              this
            )
          ] }, step.id, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2077,
            columnNumber: 11
          }, this)
        ) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2075,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2045,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-8 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Layers, { className: "w-5 h-5 text-primary" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2102,
            columnNumber: 13
          }, this),
          " Special Program Features"
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2101,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxDEV("input", { placeholder: "Section Title", type: "text", value: homeContent.specialTitle, onChange: (e) => setHomeContent({ ...homeContent, specialTitle: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2105,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("input", { placeholder: "Section Subtitle", type: "text", value: homeContent.specialSubtitle, onChange: (e) => setHomeContent({ ...homeContent, specialSubtitle: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2106,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("textarea", { placeholder: "Section Description", value: homeContent.specialDesc, onChange: (e) => setHomeContent({ ...homeContent, specialDesc: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none", rows: 3 }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2107,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "border-t border-slate-100 pt-6 mt-6", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] font-black uppercase tracking-widest mb-4", children: "Add Highlight Feature" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2110,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
              /* @__PURE__ */ jsxDEV("input", { placeholder: "Feature Title", type: "text", value: newFeature.title, onChange: (e) => setNewFeature({ ...newFeature, title: e.target.value }), className: "bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2112,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("input", { placeholder: "Feature Description", type: "text", value: newFeature.description, onChange: (e) => setNewFeature({ ...newFeature, description: e.target.value }), className: "bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2113,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2111,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => {
                  const features = homeContent.specialFeatures || [];
                  setHomeContent({ ...homeContent, specialFeatures: [...features, { ...newFeature, id: Date.now().toString(), icon: "Play" }] });
                  setNewFeature({ title: "", description: "", icon: "Play" });
                },
                className: "w-full bg-slate-100 text-slate-900 font-black py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all mb-6",
                children: "Insert_Feature_Node"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2115,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: (homeContent.specialFeatures || []).map(
              (feat, idx) => /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold uppercase truncate max-w-[200px]", children: feat.title }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 2129,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      const features = [...homeContent.specialFeatures || []];
                      features.splice(idx, 1);
                      setHomeContent({ ...homeContent, specialFeatures: features });
                    },
                    className: "text-red-400 hover:text-red-600",
                    children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 2138,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 2130,
                    columnNumber: 21
                  },
                  this
                )
              ] }, feat.id, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2128,
                columnNumber: 15
              }, this)
            ) }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2126,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2109,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2104,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2100,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-8 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(MessageCircle, { className: "w-5 h-5 text-primary" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2150,
            columnNumber: 14
          }, this),
          " Telegram Channels"
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2149,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxDEV("input", { placeholder: "Channels Section Title", type: "text", value: homeContent.telegramTitle, onChange: (e) => setHomeContent({ ...homeContent, telegramTitle: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2153,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("input", { placeholder: "Channels Section Subtitle", type: "text", value: homeContent.telegramSubtitle, onChange: (e) => setHomeContent({ ...homeContent, telegramSubtitle: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2154,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "border-t border-slate-100 pt-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
              /* @__PURE__ */ jsxDEV("input", { placeholder: "Channel Name", type: "text", value: newTelegram.name, onChange: (e) => setNewTelegram({ ...newTelegram, name: e.target.value }), className: "bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2158,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("input", { placeholder: "Channel URL", type: "text", value: newTelegram.url, onChange: (e) => setNewTelegram({ ...newTelegram, url: e.target.value }), className: "bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2159,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("input", { placeholder: "Cover Image URL", type: "text", value: newTelegram.imageUrl, onChange: (e) => setNewTelegram({ ...newTelegram, imageUrl: e.target.value }), className: "bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs md:col-span-2" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2160,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2157,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => {
                  const chans = homeContent.telegramChannels || [];
                  setHomeContent({ ...homeContent, telegramChannels: [...chans, { ...newTelegram, id: Date.now().toString() }] });
                  setNewTelegram({ name: "", url: "", imageUrl: "" });
                },
                className: "w-full bg-slate-100 text-slate-900 font-black py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all mb-6",
                children: "Deploy_Channel_Link"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2162,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-2", children: (homeContent.telegramChannels || []).map(
              (chan, idx) => /* @__PURE__ */ jsxDEV("div", { className: "relative group rounded-xl overflow-hidden aspect-square border border-slate-100", children: [
                /* @__PURE__ */ jsxDEV("img", { src: transformImageUrl(chan.imageUrl), className: "w-full h-full object-cover" }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 2176,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      const chans = [...homeContent.telegramChannels || []];
                      chans.splice(idx, 1);
                      setHomeContent({ ...homeContent, telegramChannels: chans });
                    },
                    className: "absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white",
                    children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
                      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                      lineNumber: 2185,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                    lineNumber: 2177,
                    columnNumber: 21
                  },
                  this
                )
              ] }, chan.id, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2175,
                columnNumber: 15
              }, this)
            ) }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2173,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2156,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2152,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2148,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-8 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(MapPin, { className: "w-5 h-5 text-primary" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2197,
            columnNumber: 14
          }, this),
          " Contact & HQ Identity"
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2196,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxDEV("input", { placeholder: "Contact Title", type: "text", value: homeContent.contactTitle, onChange: (e) => setHomeContent({ ...homeContent, contactTitle: e.target.value }), className: "bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2201,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("input", { placeholder: "Contact Subtitle", type: "text", value: homeContent.contactSubtitle, onChange: (e) => setHomeContent({ ...homeContent, contactSubtitle: e.target.value }), className: "bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2202,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2200,
            columnNumber: 14
          }, this),
          /* @__PURE__ */ jsxDEV("input", { placeholder: "Physical HQ Address", type: "text", value: homeContent.contactAddress, onChange: (e) => setHomeContent({ ...homeContent, contactAddress: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2204,
            columnNumber: 14
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxDEV("input", { placeholder: "Hotline", type: "text", value: homeContent.contactPhone, onChange: (e) => setHomeContent({ ...homeContent, contactPhone: e.target.value }), className: "bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2206,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("input", { placeholder: "Email Node", type: "text", value: homeContent.contactEmail, onChange: (e) => setHomeContent({ ...homeContent, contactEmail: e.target.value }), className: "bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2207,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2205,
            columnNumber: 14
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2199,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2195,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-8 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(ExternalLink, { className: "w-5 h-5 text-primary" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2215,
            columnNumber: 14
          }, this),
          " Transmission Nodes (Socials)"
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2214,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1 block", children: "Facebook" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2220,
              columnNumber: 20
            }, this),
            /* @__PURE__ */ jsxDEV("input", { type: "text", value: homeContent.facebookUrl, onChange: (e) => setHomeContent({ ...homeContent, facebookUrl: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2221,
              columnNumber: 20
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2219,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1 block", children: "YouTube" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2224,
              columnNumber: 20
            }, this),
            /* @__PURE__ */ jsxDEV("input", { type: "text", value: homeContent.youtubeUrl, onChange: (e) => setHomeContent({ ...homeContent, youtubeUrl: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2225,
              columnNumber: 20
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2223,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1 block", children: "WhatsApp" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2228,
              columnNumber: 20
            }, this),
            /* @__PURE__ */ jsxDEV("input", { type: "text", value: homeContent.whatsappUrl, onChange: (e) => setHomeContent({ ...homeContent, whatsappUrl: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2229,
              columnNumber: 20
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2227,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1 block", children: "Instagram" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2232,
              columnNumber: 20
            }, this),
            /* @__PURE__ */ jsxDEV("input", { type: "text", value: homeContent.instagramUrl, onChange: (e) => setHomeContent({ ...homeContent, instagramUrl: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2233,
              columnNumber: 20
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2231,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2218,
          columnNumber: 14
        }, this) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2217,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2213,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-8 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(ImageIcon, { className: "w-5 h-5 text-primary" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2242,
            columnNumber: 13
          }, this),
          " Gallery Section"
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2241,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxDEV("input", { placeholder: "Gallery Section Title", type: "text", value: homeContent.galleryTitle, onChange: (e) => setHomeContent({ ...homeContent, galleryTitle: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2245,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("input", { placeholder: "Gallery Section Subtitle", type: "text", value: homeContent.gallerySubtitle, onChange: (e) => setHomeContent({ ...homeContent, gallerySubtitle: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2246,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2244,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2240,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-8 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold mb-6 text-slate-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Video, { className: "w-5 h-5 text-primary" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2253,
            columnNumber: 13
          }, this),
          " Teacher Bio & Video"
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2252,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-bold px-1", children: "Bio Section Title" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2258,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("input", { type: "text", value: homeContent.teacherBioTitle, onChange: (e) => setHomeContent({ ...homeContent, teacherBioTitle: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2259,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2257,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-bold px-1", children: "Video URL (YouTube/Drive)" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2262,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("input", { type: "text", value: homeContent.teacherVideoUrl, onChange: (e) => setHomeContent({ ...homeContent, teacherVideoUrl: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2263,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2261,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2256,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-slate-400 uppercase font-bold px-1", children: "Detailed Bio Text" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2267,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("textarea", { rows: 8, value: homeContent.teacherBioText, onChange: (e) => setHomeContent({ ...homeContent, teacherBioText: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-primary/50 resize-none font-sans" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2268,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2266,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2255,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2251,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-8 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black uppercase italic mb-6 text-slate-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(BarChart3, { className: "w-5 h-5 text-primary" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2276,
            columnNumber: 13
          }, this),
          " Results Performance Node"
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2275,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxDEV("input", { placeholder: "Results Section Title", type: "text", value: homeContent.resultsTitle, onChange: (e) => setHomeContent({ ...homeContent, resultsTitle: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2279,
            columnNumber: 14
          }, this),
          /* @__PURE__ */ jsxDEV("input", { placeholder: "Results Banner Image URL", type: "text", value: homeContent.resultsImageUrl, onChange: (e) => setHomeContent({ ...homeContent, resultsImageUrl: e.target.value }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2280,
            columnNumber: 14
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxDEV("input", { placeholder: "CTA Text (View Results)", type: "text", value: homeContent.resultsCtaText, onChange: (e) => setHomeContent({ ...homeContent, resultsCtaText: e.target.value }), className: "bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2282,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("input", { placeholder: "CTA URL", type: "text", value: homeContent.resultsCtaUrl, onChange: (e) => setHomeContent({ ...homeContent, resultsCtaUrl: e.target.value }), className: "bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2283,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2281,
            columnNumber: 14
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2278,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2274,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-8 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black uppercase italic text-slate-900 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(ImageIcon, { className: "w-5 h-5 text-primary" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2292,
              columnNumber: 15
            }, this),
            " Gallery Moments"
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2291,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full text-slate-500", children: [
            homePosts.length,
            " Active_Feeds"
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2294,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2290,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100", children: [
          /* @__PURE__ */ jsxDEV("input", { placeholder: "Moment Title", type: "text", value: newHomePost.title, onChange: (e) => setNewHomePost({ ...newHomePost, title: e.target.value }), className: "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2300,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("input", { placeholder: "Image URL", type: "text", value: newHomePost.imageUrl, onChange: (e) => setNewHomePost({ ...newHomePost, imageUrl: e.target.value }), className: "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2301,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleAddHomePost,
              className: "w-full bg-slate-900 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all",
              children: "Add_Moment_to_Feed"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2302,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2299,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: homePosts.map(
          (post) => /* @__PURE__ */ jsxDEV("div", { className: "relative group aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200", children: [
            /* @__PURE__ */ jsxDEV("img", { src: transformImageUrl(post.imageUrl), className: "w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2313,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxDEV("button", { onClick: () => handleDelete("home/posts", post.id), className: "self-end p-2 bg-red-500 text-white rounded-lg hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3 h-3" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2316,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2315,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-white font-black uppercase truncate", children: post.title }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2318,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2314,
              columnNumber: 17
            }, this)
          ] }, post.id, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2312,
            columnNumber: 11
          }, this)
        ) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2310,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2289,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-8 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black uppercase italic text-slate-900 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Play, { className: "w-5 h-5 text-primary" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2329,
              columnNumber: 15
            }, this),
            " Video Highlights"
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2328,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full text-slate-500", children: [
            homeVideos.length,
            " Active_Nodes"
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2331,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2327,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100", children: [
          /* @__PURE__ */ jsxDEV("input", { placeholder: "Video Title", type: "text", value: newHomeVideo.title, onChange: (e) => setNewHomeVideo({ ...newHomeVideo, title: e.target.value }), className: "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2337,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("input", { placeholder: "Youtube/Embed URL", type: "text", value: newHomeVideo.videoUrl, onChange: (e) => setNewHomeVideo({ ...newHomeVideo, videoUrl: e.target.value }), className: "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2338,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleAddHomeVideo,
              className: "w-full bg-slate-900 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all",
              children: "Connect_Video_Stream"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2339,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2336,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: homeVideos.map(
          (v) => /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(Video, { className: "w-4 h-4 text-primary" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2352,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2351,
                columnNumber: 22
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-black text-slate-900 uppercase italic", children: v.title }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 2355,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[8px] text-slate-400 font-medium truncate max-w-[150px]", children: v.videoUrl }, void 0, false, {
                  fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                  lineNumber: 2356,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2354,
                columnNumber: 22
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2350,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("button", { onClick: () => handleDelete("home/videos", v.id), className: "p-2 text-slate-400 hover:text-red-500 transition-colors", children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2360,
              columnNumber: 22
            }, this) }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2359,
              columnNumber: 19
            }, this)
          ] }, v.id, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2349,
            columnNumber: 11
          }, this)
        ) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2347,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2326,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: async () => {
            await setDoc(doc(db, "home_content", "main"), homeContent);
            alert("Nexus Terminal Updated Successfully.");
          },
          className: "w-full bg-primary text-black font-black uppercase italic tracking-[0.2em] py-6 rounded-[2rem] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm sticky bottom-0 z-30",
          children: "Initialize_Global_Sync"
        },
        void 0,
        false,
        {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2368,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 1816,
      columnNumber: 7
    }, this),
    homePreviewMode && /* @__PURE__ */ jsxDEV("div", { className: "hidden lg:block h-[85vh] sticky top-0 rounded-[3rem] overflow-hidden border-8 border-slate-900 shadow-2xl bg-black", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "h-full overflow-y-auto custom-scrollbar", children: /* @__PURE__ */ jsxDEV("div", { className: "scale-[0.5] origin-top w-[200%] bg-[#050505] text-white", children: [
        /* @__PURE__ */ jsxDEV("header", { className: "py-10 px-12 flex justify-between items-center border-b border-white/5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-4xl font-black italic uppercase tracking-tighter", children: [
            homeContent.teacherName?.split(" ")[0],
            " ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-primary tracking-tighter", children: homeContent.teacherName?.split(" ")[1] }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2386,
              columnNumber: 132
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2386,
            columnNumber: 20
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "px-12 py-5 bg-white text-black text-2xl font-black uppercase tracking-widest rounded-full", children: "NEXUS_SYNC" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2387,
            columnNumber: 20
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2385,
          columnNumber: 17
        }, this),
        homeContent.heroSlides?.length ? /* @__PURE__ */ jsxDEV("div", { className: "relative h-[800px] flex items-center px-20", children: [
          /* @__PURE__ */ jsxDEV("img", { src: transformImageUrl(homeContent.heroSlides[0].imageUrl), className: "absolute inset-0 w-full h-full object-cover opacity-60" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2392,
            columnNumber: 22
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 space-y-10 max-w-5xl", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-primary text-2xl font-black tracking-[0.5em] uppercase", children: homeContent.heroSlides[0].subtitle }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2394,
              columnNumber: 24
            }, this),
            /* @__PURE__ */ jsxDEV("h1", { className: "text-[12rem] font-black italic uppercase leading-[0.85] tracking-tighter", children: homeContent.heroSlides[0].title?.replace(/_/g, " ") || "UNTITLED_SLIDE" }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2395,
              columnNumber: 24
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex gap-8", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "px-16 py-8 bg-primary rounded-full" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2399,
                columnNumber: 26
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "px-16 py-8 border-4 border-white/20 rounded-full" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2400,
                columnNumber: 26
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2398,
              columnNumber: 24
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2393,
            columnNumber: 22
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2391,
          columnNumber: 11
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "h-[800px] bg-slate-900 flex items-center justify-center text-4xl", children: "NO_HERO_DATA" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2404,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "py-40 px-20 grid grid-cols-2 gap-40", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "aspect-[3/4] bg-slate-800 rounded-[100px] overflow-hidden", children: /* @__PURE__ */ jsxDEV("img", { src: transformImageUrl(homeContent.teacherAboutUrl), className: "w-full h-full object-cover grayscale" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2408,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2407,
            columnNumber: 20
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-12 py-20", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-9xl font-black italic uppercase tracking-tighter", children: homeContent.aboutTitle }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2411,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-4xl text-white/50 leading-relaxed font-sans", children: homeContent.teacherMethodology }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2412,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2410,
            columnNumber: 20
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2406,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "py-40 px-20 grid grid-cols-5 gap-12", children: homeContent.processSteps?.map(
          (s, i) => /* @__PURE__ */ jsxDEV("div", { className: "p-16 rounded-[60px] bg-white/5 border border-white/10 space-y-10", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-24 h-24 bg-primary rounded-[30px] flex items-center justify-center text-black", children: React.createElement(IconMap[s.icon] || BookOpen, { className: "w-12 h-12" }) }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2419,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-4xl font-black italic uppercase", children: s.title }, void 0, false, {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2422,
              columnNumber: 25
            }, this)
          ] }, i, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2418,
            columnNumber: 13
          }, this)
        ) }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2416,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("footer", { className: "py-40 bg-black/50 border-t border-white/5 px-20 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-5xl font-black tracking-tighter", children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " CORE_STABLE"
          ] }, void 0, true, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2428,
            columnNumber: 20
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex gap-10", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxDEV("div", { className: "w-20 h-20 bg-white/5 rounded-[20px]" }, i, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2430,
            columnNumber: 48
          }, this)) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2429,
            columnNumber: 20
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2427,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2384,
        columnNumber: 14
      }, this) }, void 0, false, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2382,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-4 right-4 px-4 py-2 bg-primary/20 backdrop-blur-xl border border-primary/40 rounded-full text-[8px] font-black uppercase tracking-widest text-primary animate-pulse", children: "Live_Nexus_Feed" }, void 0, false, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2435,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 2381,
      columnNumber: 5
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
    lineNumber: 1814,
    columnNumber: 3
  }, this);
  const renderPriManagement = () => /* @__PURE__ */ jsxDEV("div", { className: "space-y-12 pb-24", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-12 rounded-[40px] shadow-sm", children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-black mb-10 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-7 h-7 text-primary/40" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2447,
          columnNumber: 11
        }, this),
        " PRI Access Control"
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2446,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row gap-6", children: [
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "email",
            placeholder: "Official PRI Email (Google Login)",
            value: newPriEmail,
            onChange: (e) => setNewPriEmail(e.target.value),
            className: "flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-black tracking-widest focus:outline-none focus:border-primary/30 transition-all font-mono"
          },
          void 0,
          false,
          {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2450,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("button", { onClick: handleAddPriUser, className: "bg-primary text-white font-black uppercase italic tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm shadow-2xl shadow-primary/20", children: "Authorize Node" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2457,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2449,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 2445,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: priUsers.map(
      (user) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white border border-slate-200 p-8 rounded-[35px] shadow-sm group hover:border-primary/20 transition-all relative overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-start mb-6 relative z-10", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100", children: /* @__PURE__ */ jsxDEV(Users, { className: "w-6 h-6 text-slate-400" }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2468,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
            lineNumber: 2467,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleDelete("authorizedPri", user.id),
              className: "p-3 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity",
              children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
                fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
                lineNumber: 2474,
                columnNumber: 17
              }, this)
            },
            void 0,
            false,
            {
              fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
              lineNumber: 2470,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2466,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] mb-2", children: user.email }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2477,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 italic", children: "Access Level: PRI_MARKS_MANAGER" }, void 0, false, {
          fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
          lineNumber: 2478,
          columnNumber: 13
        }, this)
      ] }, user.id, true, {
        fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
        lineNumber: 2465,
        columnNumber: 7
      }, this)
    ) }, void 0, false, {
      fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
      lineNumber: 2463,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
    lineNumber: 2444,
    columnNumber: 3
  }, this);
  return /* @__PURE__ */ jsxDEV(DashboardLayout, { role: "admin", activeTab, setActiveTab, profile, children: /* @__PURE__ */ jsxDEV(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxDEV(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, children: [
    activeTab === "overview" && renderOverview(),
    activeTab === "home" && renderHomeManager(),
    activeTab === "classes" && renderClasses(),
    activeTab === "recordings" && renderRecordings(),
    activeTab === "batches" && renderAcademicYears(),
    activeTab === "live" && renderLive(),
    activeTab === "students" && renderStudents(),
    activeTab === "marks" && renderMarks(),
    activeTab === "admins" && renderAdmins(),
    activeTab === "pri" && renderPriManagement()
  ] }, activeTab, true, {
    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
    lineNumber: 2488,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
    lineNumber: 2487,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx",
    lineNumber: 2486,
    columnNumber: 5
  }, this);
};
_s(AdminDashboard, "z/nT9nncrSgwCfaIPHQMohymRnQ=", false, function() {
  return [useLanguage];
});
_c = AdminDashboard;
var _c;
$RefreshReg$(_c, "AdminDashboard");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) {
  return RefreshRuntime.register(type, "C:/Users/CB/Documents/lms/cbpolityacademy/pro 1/project_new/project_modified/src/pages/AdminDashboard.tsx " + id);
}
function $RefreshSig$() {
  return RefreshRuntime.createSignatureFunctionForTransform();
}

//# sourceMappingURL=data:application/json;base64,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R0FBR3RDLEdBQUcsSUFBSSxHQUNuSHZRO0FBQUFBLGtCQUFjLGNBQWMyUSxlQUFlO0FBQUEsSUFDM0MzUSxjQUFjLFVBQVU2VSxrQkFBa0I7QUFBQSxJQUMxQzdVLGNBQWMsYUFBYStSLGNBQWM7QUFBQSxJQUN6Qy9SLGNBQWMsZ0JBQWdCd1EsaUJBQWlCO0FBQUEsSUFDL0N4USxjQUFjLGFBQWFtUSxvQkFBb0I7QUFBQSxJQUMvQ25RLGNBQWMsVUFBVXFULFdBQVc7QUFBQSxJQUNuQ3JULGNBQWMsY0FBY3dTLGVBQWU7QUFBQSxJQUMzQ3hTLGNBQWMsV0FBVzZULFlBQVk7QUFBQSxJQUNyQzdULGNBQWMsWUFBWXVULGFBQWE7QUFBQSxJQUN2Q3ZULGNBQWMsU0FBU3dXLG9CQUFvQjtBQUFBLE9BVjdCeFcsV0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQVdBLEtBWkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQWFBLEtBZEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQWVBO0FBRUo7QUFBRUYsR0EzN0VXRixnQkFBa0Q7QUFBQSxVQUMvQ0QsV0FBVztBQUFBO0FBQUEsS0FEZEM7QUFBa0QsSUFBQThXO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJkYiIsImhhbmRsZUZpcmVzdG9yZUVycm9yIiwiT3BlcmF0aW9uVHlwZSIsImRvYyIsIm9uU25hcHNob3QiLCJjb2xsZWN0aW9uIiwiYWRkRG9jIiwic2V0RG9jIiwidXBkYXRlRG9jIiwiZGVsZXRlRG9jIiwicnVuVHJhbnNhY3Rpb24iLCJnZXREb2MiLCJzZXJ2ZXJUaW1lc3RhbXAiLCJEYXNoYm9hcmRMYXlvdXQiLCJWaWRlb1BsYXllciIsIlVzZXJzIiwiQm9va09wZW4iLCJWaWRlbyIsIlBsdXMiLCJUcmFzaDIiLCJFeHRlcm5hbExpbmsiLCJJbWFnZSIsIkltYWdlSWNvbiIsIlR5cGUiLCJQbGF5IiwiU2hpZWxkQ2hlY2siLCJCYXJDaGFydDMiLCJFZGl0IiwiWCIsIkNvcHkiLCJDYWxlbmRhciIsIkxheWVycyIsIkxheW91dEdyaWQiLCJBY3Rpdml0eSIsIlRyb3BoeSIsIlRyZW5kaW5nVXAiLCJNZXNzYWdlQ2lyY2xlIiwiTWljcm9zY29wZSIsIkRuYSIsIkhlYXJ0IiwiQnJhaW4iLCJHcmFkdWF0aW9uQ2FwIiwiTWFwUGluIiwiTGlnaHRidWxiIiwiRmlsZVRleHQiLCJDYWxlbmRhckNoZWNrIiwiQ2hlY2tDaXJjbGUyIiwiQ2xvY2siLCJtb3Rpb24iLCJBbmltYXRlUHJlc2VuY2UiLCJ0cmFuc2Zvcm1JbWFnZVVybCIsInVzZUxhbmd1YWdlIiwiQWRtaW5EYXNoYm9hcmQiLCJwcm9maWxlIiwiX3MiLCJ0IiwiYWN0aXZlVGFiIiwic2V0QWN0aXZlVGFiIiwiaG9tZVByZXZpZXdNb2RlIiwic2V0SG9tZVByZXZpZXdNb2RlIiwibGVzc29ucyIsInNldExlc3NvbnMiLCJvbmxpbmVDbGFzc2VzIiwic2V0T25saW5lQ2xhc3NlcyIsInN0dWRlbnRzIiwic2V0U3R1ZGVudHMiLCJwYXBlclJlc3VsdHMiLCJzZXRQYXBlclJlc3VsdHMiLCJhdXRob3JpemVkQWRtaW5zIiwic2V0QXV0aG9yaXplZEFkbWlucyIsInByaVVzZXJzIiwic2V0UHJpVXNlcnMiLCJuZXdQcmlFbWFpbCIsInNldE5ld1ByaUVtYWlsIiwidW5zdWJQcmkiLCJzbmFwc2hvdCIsImRvY3MiLCJtYXAiLCJpZCIsImRhdGEiLCJoYW5kbGVBZGRQcmlVc2VyIiwiZW1haWwiLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJjcmVhdGVkQXQiLCJlcnIiLCJXUklURSIsImFjYWRlbWljWWVhcnMiLCJzZXRBY2FkZW1pY1llYXJzIiwicmVjb3JkaW5ncyIsInNldFJlY29yZGluZ3MiLCJzZWxlY3RlZExlc3NvbiIsInNldFNlbGVjdGVkTGVzc29uIiwibWFya3NGaWx0ZXJZZWFyIiwic2V0TWFya3NGaWx0ZXJZZWFyIiwibWFya3NGaWx0ZXJQYXBlciIsInNldE1hcmtzRmlsdGVyUGFwZXIiLCJvdmVydmlld0JhdGNoSWQiLCJzZXRPdmVydmlld0JhdGNoSWQiLCJ0b3BpY01vZGUiLCJzZXRUb3BpY01vZGUiLCJuZXdMZXNzb24iLCJzZXROZXdMZXNzb24iLCJ0b3BpYyIsInN1YlRvcGljIiwidmlkZW9VcmwiLCJ2aWRlb1R5cGUiLCJ2aXNpYmlsaXR5IiwidGh1bWJuYWlsVXJsIiwiaW1hZ2VVcmwiLCJtYXhWaWV3cyIsInllYXJJZCIsImlzU2FmZVpvbmUiLCJuZXdDbGFzcyIsInNldE5ld0NsYXNzIiwidGl0bGUiLCJsaW5rIiwidHlwZSIsIm5ld1N0dWRlbnQiLCJzZXROZXdTdHVkZW50IiwibmFtZSIsImNsYXNzIiwid2hhdHNhcHAiLCJhZGRyZXNzIiwic3R1ZGVudElkIiwic2Nob29sIiwibmljIiwibmV3UGFwZXJSZXN1bHQiLCJzZXROZXdQYXBlclJlc3VsdCIsInBhcGVyTnVtYmVyIiwic3R1ZGVudEluZGV4IiwibWFya3MiLCJuZXdZZWFyIiwic2V0TmV3WWVhciIsInllYXIiLCJuZXdSZWNvcmRpbmciLCJzZXROZXdSZWNvcmRpbmciLCJwdWJsaXNoRGF0ZSIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInNwbGl0Iiwic2VsZWN0ZWRSZWNvcmRpbmdZZWFyIiwic2V0U2VsZWN0ZWRSZWNvcmRpbmdZZWFyIiwibmV3QXV0aEFkbWluIiwic2V0TmV3QXV0aEFkbWluIiwicGFzc3dvcmQiLCJuZXdQcmlVc2VyIiwic2V0TmV3UHJpVXNlciIsImVkaXRpbmdTdHVkZW50Iiwic2V0RWRpdGluZ1N0dWRlbnQiLCJzdHVkZW50U2VhcmNoIiwic2V0U3R1ZGVudFNlYXJjaCIsImhvbWVDb250ZW50Iiwic2V0SG9tZUNvbnRlbnQiLCJ0ZWFjaGVyTmFtZSIsInRlYWNoZXJNZXRob2RvbG9neSIsInRlYWNoZXJJbWFnZVVybCIsInRlYWNoZXJIZXJvVXJsIiwidGVhY2hlckFib3V0VXJsIiwiYWJvdXRUaXRsZSIsImFib3V0U3VidGl0bGUiLCJhYm91dFJpY2hUZXh0IiwiYWJvdXRDdGFUZXh0IiwiYWJvdXRDdGFVcmwiLCJwcm9jZXNzVGl0bGUiLCJwcm9jZXNzU3VidGl0bGUiLCJwcm9jZXNzU3RlcHMiLCJkZXNjcmlwdGlvbiIsImljb24iLCJzcGVjaWFsVGl0bGUiLCJzcGVjaWFsU3VidGl0bGUiLCJzcGVjaWFsRGVzYyIsInNwZWNpYWxGZWF0dXJlcyIsInRlbGVncmFtVGl0bGUiLCJ0ZWxlZ3JhbVN1YnRpdGxlIiwidGVsZWdyYW1DaGFubmVscyIsInVybCIsInRlYWNoZXJCaW9UaXRsZSIsInRlYWNoZXJCaW9UZXh0IiwidGVhY2hlclZpZGVvVXJsIiwidGVhY2hlclZpZGVvVGh1bWJuYWlsIiwiaGVyb1NsaWRlcyIsInN1YnRpdGxlIiwiY3RhVGV4dCIsImN0YVVybCIsImNvbnRhY3RUaXRsZSIsImNvbnRhY3RTdWJ0aXRsZSIsImNvbnRhY3RBZGRyZXNzIiwiY29udGFjdFBob25lIiwiY29udGFjdEVtYWlsIiwiY29udGFjdFdvcmtpbmdIb3VycyIsImZhY2Vib29rVXJsIiwieW91dHViZVVybCIsIndoYXRzYXBwVXJsIiwiaW5zdGFncmFtVXJsIiwibGlua2VkaW5VcmwiLCJhbGxvd2VkRG9tYWluIiwid2luZG93IiwibG9jYXRpb24iLCJvcmlnaW4iLCJob21lUG9zdHMiLCJzZXRIb21lUG9zdHMiLCJob21lVmlkZW9zIiwic2V0SG9tZVZpZGVvcyIsIm5ld0hvbWVQb3N0Iiwic2V0TmV3SG9tZVBvc3QiLCJuZXdIb21lVmlkZW8iLCJzZXROZXdIb21lVmlkZW8iLCJuZXdTbGlkZSIsInNldE5ld1NsaWRlIiwidGl0bGVGb250U2l6ZSIsInRpdGxlRm9udFNpemVNb2JpbGUiLCJuZXdQcm9jZXNzU3RlcCIsInNldE5ld1Byb2Nlc3NTdGVwIiwibmV3RmVhdHVyZSIsInNldE5ld0ZlYXR1cmUiLCJuZXdUZWxlZ3JhbSIsInNldE5ld1RlbGVncmFtIiwiTE9DQUxfU0xJREVTIiwiY3VycmVudE1vbnRoIiwic2xpY2UiLCJ1bnN1Ykxlc3NvbnMiLCJzbmFwIiwiTElTVCIsInVuc3ViQ2xhc3NlcyIsInVuc3ViU3R1ZGVudHMiLCJzdHVkZW50RGF0YSIsInNvcnRlZFN0dWRlbnRzIiwic29ydCIsImEiLCJiIiwiZGF0ZUEiLCJyZWdpc3RlcmVkQXQiLCJ0b0RhdGUiLCJnZXRUaW1lIiwiZGF0ZUIiLCJ1bnN1YkhvbWVDb250ZW50IiwiZXhpc3RzIiwidW5zdWJIb21lUG9zdHMiLCJ1bnN1YkhvbWVWaWRlb3MiLCJ1bnN1YkF1dGhBZG1pbnMiLCJjb25zb2xlIiwid2FybiIsInVuc3ViUGFwZXJSZXN1bHRzIiwidW5zdWJBY2FkZW1pY1llYXJzIiwidW5zdWJSZWNvcmRpbmdzIiwibGVuZ3RoIiwic3R1ZGVudCIsImZpbmQiLCJzIiwiaW5kZXhOdW1iZXIiLCJwcmV2IiwiaGFuZGxlQWRkTGVzc29uIiwiQ1JFQVRFIiwiaGFuZGxlQWRkQ2xhc3MiLCJzdGFydFRpbWUiLCJoYW5kbGVBZGRTdHVkZW50IiwiY291bnRlclJlZiIsIm5leHRJbmRleCIsInRyYW5zYWN0aW9uIiwiY291bnRlckRvYyIsImdldCIsInNldCIsInZhbHVlIiwidXBkYXRlIiwiZm9ybWF0dGVkSW5kZXgiLCJ0b1N0cmluZyIsInBhZFN0YXJ0IiwicGF5bWVudHMiLCJoYXNTZWVuSWQiLCJhbGVydCIsImhhbmRsZVVwZGF0ZVN0dWRlbnQiLCJ1aWQiLCJ1c2VyUmVmIiwidXNlckRvYyIsIlVQREFURSIsImhhbmRsZUFkZEF1dGhBZG1pbiIsImRvY0lkIiwiRXJyb3IiLCJoYW5kbGVBZGRQYXBlclJlc3VsdCIsInRhcmdldEluZGV4IiwiaXNEdXBsaWNhdGUiLCJzb21lIiwiciIsImNvbmZpcm0iLCJyZXN1bHREYXRhIiwiTnVtYmVyIiwiZG9jUmVmIiwicGFwZXJOdW0iLCJyZXN1bHRzRm9yUGFwZXIiLCJmaWx0ZXIiLCJwdXNoIiwic29ydGVkIiwiUHJvbWlzZSIsImFsbCIsInJlcyIsImluZGV4IiwicmFuayIsImhhbmRsZUFkZEhvbWVQb3N0IiwiaGFuZGxlQWRkSG9tZVZpZGVvIiwidG9nZ2xlUGF5bWVudCIsIm1vbnRoIiwiY3VycmVudFN0YXR1cyIsImhhbmRsZURlbGV0ZSIsInBhdGgiLCJjb2xsZWN0aW9uTmFtZSIsIkRFTEVURSIsImhhbmRsZUNvcHlQYWlkRW1haWxzIiwicGFpZEVtYWlscyIsImpvaW4iLCJuYXZpZ2F0b3IiLCJjbGlwYm9hcmQiLCJ3cml0ZVRleHQiLCJoYW5kbGVBZGRZZWFyIiwiaGFuZGxlQWRkUmVjb3JkaW5nIiwicmVuZGVyQWNhZGVtaWNZZWFycyIsImUiLCJ0YXJnZXQiLCJsb2NhbGVDb21wYXJlIiwieSIsInJlbmRlclJlY29yZGluZ3MiLCJmaWx0ZXJlZFJlY29yZGluZ3MiLCJyZWMiLCJyZW5kZXJPdmVydmlldyIsInNlbGVjdGVkWWVhciIsImJhdGNoUmVzdWx0cyIsImJhdGNoUGFwZXJOdW1iZXJzIiwiQXJyYXkiLCJmcm9tIiwiU2V0IiwibGF0ZXN0UGFwZXJOdW0iLCJNYXRoIiwibWF4IiwibGF0ZXN0UGFwZXJSZXN1bHRzIiwidG9wU2NvcmVyIiwidG9wMTAiLCJzdHVkZW50QmVzdE1hcmtzIiwicmVkdWNlIiwiYWNjIiwiYmF0Y2hDaGFtcGlvbnMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJpIiwicmVuZGVyQ2xhc3NlcyIsImdyb3VwZWRMZXNzb25zIiwibGVzc29uIiwic29ydGVkVG9waWNzIiwia2V5cyIsImV4aXN0aW5nVG9waWNzIiwicGFyc2VJbnQiLCJ2aWV3aW5nSGlzdG9yeSIsInNldFZpZXdpbmdIaXN0b3J5IiwicmVuZGVyU3R1ZGVudHMiLCJmaWx0ZXJlZFN0dWRlbnRzIiwic2VhcmNoIiwiaW5jbHVkZXMiLCJyZXBsYWNlIiwib3BhY2l0eSIsInNjYWxlIiwiZW50cmllcyIsInBhaWQiLCJ2aWRlb1ZpZXdzIiwibGVzc29uSWQiLCJ2aWV3cyIsImwiLCJyZW5kZXJMaXZlIiwiY2xzIiwicmVuZGVyQWRtaW5zIiwiYWRtaW4iLCJwYXBlck51bVJlZiIsInVzZVJlZiIsInN0dWRlbnRJbmRleFJlZiIsIm1hcmtzUmVmIiwicmVuZGVyTWFya3MiLCJmaWx0ZXJlZFJlc3VsdHMiLCJ5ZWFyTWF0Y2giLCJwYXBlck1hdGNoIiwia2V5IiwiY3VycmVudCIsImZvY3VzIiwiSWNvbk1hcCIsImdldEltYWdlUGF0aCIsInVuZGVmaW5lZCIsInN0YXJ0c1dpdGgiLCJjbGVhblBhdGgiLCJiYXNlIiwiaW1wb3J0IiwiZW52IiwiQkFTRV9VUkwiLCJyZW5kZXJIb21lTWFuYWdlciIsInNsaWRlIiwiaWR4Iiwic2xpZGVzIiwic3BsaWNlIiwidmFsIiwiY3VycmVudFRhcmdldCIsInNyYyIsImxvY2FsSW1hZ2UiLCJub3ciLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwic3RlcHMiLCJzdGVwIiwiZmVhdHVyZXMiLCJmZWF0IiwiY2hhbnMiLCJjaGFuIiwiZ2FsbGVyeVRpdGxlIiwiZ2FsbGVyeVN1YnRpdGxlIiwicmVzdWx0c1RpdGxlIiwicmVzdWx0c0ltYWdlVXJsIiwicmVzdWx0c0N0YVRleHQiLCJyZXN1bHRzQ3RhVXJsIiwicG9zdCIsInYiLCJnZXRGdWxsWWVhciIsInJlbmRlclByaU1hbmFnZW1lbnQiLCJ1c2VyIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQWRtaW5EYXNoYm9hcmQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZGIsIGhhbmRsZUZpcmVzdG9yZUVycm9yLCBPcGVyYXRpb25UeXBlIH0gZnJvbSAnLi4vZmlyZWJhc2UnO1xuaW1wb3J0IHsgZG9jLCBvblNuYXBzaG90LCBjb2xsZWN0aW9uLCBhZGREb2MsIHNldERvYywgdXBkYXRlRG9jLCBkZWxldGVEb2MsIHJ1blRyYW5zYWN0aW9uLCBxdWVyeSwgd2hlcmUsIGdldERvYywgc2VydmVyVGltZXN0YW1wIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcbmltcG9ydCB7IFVzZXJQcm9maWxlLCBMZXNzb24sIE9ubGluZUNsYXNzLCBTdHVkZW50UmVjb3JkLCBIb21lQ29udGVudCwgSG9tZVBvc3QsIEhvbWVWaWRlbywgUGFwZXJSZXN1bHQsIEFjYWRlbWljWWVhciwgUmVjb3JkaW5nIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgRGFzaGJvYXJkTGF5b3V0IH0gZnJvbSAnLi4vY29tcG9uZW50cy9MYXlvdXQnO1xuaW1wb3J0IHsgVmlkZW9QbGF5ZXIgfSBmcm9tICcuLi9jb21wb25lbnRzL1ZpZGVvUGxheWVyJztcbmltcG9ydCB7IFVzZXJzLCBCb29rT3BlbiwgVmlkZW8sIFBsdXMsIFRyYXNoMiwgRXh0ZXJuYWxMaW5rLCBIb21lIGFzIEhvbWVJY29uLCBJbWFnZSBhcyBJbWFnZUljb24sIFR5cGUsIFBsYXksIFNoaWVsZENoZWNrLCBCYXJDaGFydDMsIEVkaXQsIFgsIENvcHksIENhbGVuZGFyLCBMYXllcnMsIENoZXZyb25MZWZ0LCBDaGV2cm9uUmlnaHQsIExheW91dEdyaWQsIEFjdGl2aXR5LCBUcm9waHksIFRyZW5kaW5nVXAsIE1lc3NhZ2VDaXJjbGUsIE1pY3Jvc2NvcGUsIERuYSwgSGVhcnQsIEJyYWluLCBHcmFkdWF0aW9uQ2FwLCBNYXBQaW4sIExpZ2h0YnVsYiwgRmlsZVRleHQsIENhbGVuZGFyQ2hlY2ssIENoZWNrQ2lyY2xlMiwgQ2xvY2sgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgbW90aW9uLCBBbmltYXRlUHJlc2VuY2UgfSBmcm9tICdtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgdHJhbnNmb3JtSW1hZ2VVcmwsIGZvcm1hdERhdGUgfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuaW1wb3J0IHsgdXNlTGFuZ3VhZ2UgfSBmcm9tICcuLi9jb250ZXh0cy9MYW5ndWFnZUNvbnRleHQnO1xuXG5leHBvcnQgY29uc3QgQWRtaW5EYXNoYm9hcmQ6IFJlYWN0LkZDPHsgcHJvZmlsZTogVXNlclByb2ZpbGUgfT4gPSAoeyBwcm9maWxlIH0pID0+IHtcbiAgY29uc3QgeyB0IH0gPSB1c2VMYW5ndWFnZSgpO1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoJ292ZXJ2aWV3Jyk7XG4gIGNvbnN0IFtob21lUHJldmlld01vZGUsIHNldEhvbWVQcmV2aWV3TW9kZV0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFtsZXNzb25zLCBzZXRMZXNzb25zXSA9IHVzZVN0YXRlPExlc3NvbltdPihbXSk7XG4gIGNvbnN0IFtvbmxpbmVDbGFzc2VzLCBzZXRPbmxpbmVDbGFzc2VzXSA9IHVzZVN0YXRlPE9ubGluZUNsYXNzW10+KFtdKTtcbiAgY29uc3QgW3N0dWRlbnRzLCBzZXRTdHVkZW50c10gPSB1c2VTdGF0ZTxTdHVkZW50UmVjb3JkW10+KFtdKTtcbiAgY29uc3QgW3BhcGVyUmVzdWx0cywgc2V0UGFwZXJSZXN1bHRzXSA9IHVzZVN0YXRlPFBhcGVyUmVzdWx0W10+KFtdKTtcbiAgY29uc3QgW2F1dGhvcml6ZWRBZG1pbnMsIHNldEF1dGhvcml6ZWRBZG1pbnNdID0gdXNlU3RhdGU8YW55W10+KFtdKTtcbiAgY29uc3QgW3ByaVVzZXJzLCBzZXRQcmlVc2Vyc10gPSB1c2VTdGF0ZTxhbnlbXT4oW10pO1xuICBjb25zdCBbbmV3UHJpRW1haWwsIHNldE5ld1ByaUVtYWlsXSA9IHVzZVN0YXRlKCcnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3ViUHJpID0gb25TbmFwc2hvdChjb2xsZWN0aW9uKGRiLCAnYXV0aG9yaXplZFByaScpLCAoc25hcHNob3QpID0+IHtcbiAgICAgIHNldFByaVVzZXJzKHNuYXBzaG90LmRvY3MubWFwKGRvYyA9PiAoeyBpZDogZG9jLmlkLCAuLi5kb2MuZGF0YSgpIH0pKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHVuc3ViUHJpKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVBZGRQcmlVc2VyID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghbmV3UHJpRW1haWwpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZW1haWwgPSBuZXdQcmlFbWFpbC50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgICAgIGF3YWl0IHNldERvYyhkb2MoZGIsICdhdXRob3JpemVkUHJpJywgZW1haWwpLCB7XG4gICAgICAgIGVtYWlsLFxuICAgICAgICBjcmVhdGVkQXQ6IHNlcnZlclRpbWVzdGFtcCgpXG4gICAgICB9KTtcbiAgICAgIHNldE5ld1ByaUVtYWlsKCcnKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGhhbmRsZUZpcmVzdG9yZUVycm9yKGVyciwgT3BlcmF0aW9uVHlwZS5XUklURSwgJ2F1dGhvcml6ZWRQcmknKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IFthY2FkZW1pY1llYXJzLCBzZXRBY2FkZW1pY1llYXJzXSA9IHVzZVN0YXRlPEFjYWRlbWljWWVhcltdPihbXSk7XG4gIGNvbnN0IFtyZWNvcmRpbmdzLCBzZXRSZWNvcmRpbmdzXSA9IHVzZVN0YXRlPFJlY29yZGluZ1tdPihbXSk7XG4gIGNvbnN0IFtzZWxlY3RlZExlc3Nvbiwgc2V0U2VsZWN0ZWRMZXNzb25dID0gdXNlU3RhdGU8TGVzc29uIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFttYXJrc0ZpbHRlclllYXIsIHNldE1hcmtzRmlsdGVyWWVhcl0gPSB1c2VTdGF0ZTxzdHJpbmc+KCdhbGwnKTtcbiAgY29uc3QgW21hcmtzRmlsdGVyUGFwZXIsIHNldE1hcmtzRmlsdGVyUGFwZXJdID0gdXNlU3RhdGU8bnVtYmVyIHwgJ2FsbCc+KCdhbGwnKTtcbiAgY29uc3QgW292ZXJ2aWV3QmF0Y2hJZCwgc2V0T3ZlcnZpZXdCYXRjaElkXSA9IHVzZVN0YXRlPHN0cmluZz4oJ2FsbCcpO1xuXG4gIGNvbnN0IFt0b3BpY01vZGUsIHNldFRvcGljTW9kZV0gPSB1c2VTdGF0ZTwnbmV3JyB8ICdleGlzdGluZyc+KCdleGlzdGluZycpO1xuICBcbiAgLy8gRm9ybSBzdGF0ZXNcbiAgY29uc3QgW25ld0xlc3Nvbiwgc2V0TmV3TGVzc29uXSA9IHVzZVN0YXRlPHtcbiAgICB0b3BpYzogc3RyaW5nO1xuICAgIHN1YlRvcGljOiBzdHJpbmc7XG4gICAgdmlkZW9Vcmw6IHN0cmluZztcbiAgICB2aWRlb1R5cGU6ICdkcml2ZScgfCAneW91dHViZSc7XG4gICAgdmlzaWJpbGl0eTogJ3ByaXZhdGUnIHwgJ3VubGlzdGVkJztcbiAgICB0aHVtYm5haWxVcmw6IHN0cmluZztcbiAgICBpbWFnZVVybDogc3RyaW5nO1xuICAgIG1heFZpZXdzOiBudW1iZXI7XG4gICAgeWVhcklkOiBzdHJpbmc7XG4gICAgaXNTYWZlWm9uZTogYm9vbGVhbjtcbiAgfT4oeyBcbiAgICB0b3BpYzogJycsIFxuICAgIHN1YlRvcGljOiAnJywgXG4gICAgdmlkZW9Vcmw6ICcnLCBcbiAgICB2aWRlb1R5cGU6ICd5b3V0dWJlJywgXG4gICAgdmlzaWJpbGl0eTogJ3ByaXZhdGUnLFxuICAgIHRodW1ibmFpbFVybDogJycsIFxuICAgIGltYWdlVXJsOiAnJywgXG4gICAgbWF4Vmlld3M6IDIsXG4gICAgeWVhcklkOiAnJyxcbiAgICBpc1NhZmVab25lOiB0cnVlXG4gIH0pO1xuICBjb25zdCBbbmV3Q2xhc3MsIHNldE5ld0NsYXNzXSA9IHVzZVN0YXRlKHsgdGl0bGU6ICcnLCBsaW5rOiAnJywgdHlwZTogJ3pvb20nIGFzIGNvbnN0IH0pO1xuICBjb25zdCBbbmV3U3R1ZGVudCwgc2V0TmV3U3R1ZGVudF0gPSB1c2VTdGF0ZSh7IG5hbWU6ICcnLCBlbWFpbDogJycsIGNsYXNzOiAnJywgd2hhdHNhcHA6ICcnLCBhZGRyZXNzOiAnJywgc3R1ZGVudElkOiAnJywgc2Nob29sOiAnJywgbmljOiAnJywgeWVhcklkOiAnJyB9KTtcbiAgY29uc3QgW25ld1BhcGVyUmVzdWx0LCBzZXROZXdQYXBlclJlc3VsdF0gPSB1c2VTdGF0ZSh7IHBhcGVyTnVtYmVyOiAxLCBzdHVkZW50SW5kZXg6ICcnLCBtYXJrczogMCwgeWVhcklkOiAnJyB9KTtcbiAgY29uc3QgW25ld1llYXIsIHNldE5ld1llYXJdID0gdXNlU3RhdGUoeyB5ZWFyOiAnJyB9KTtcbiAgY29uc3QgW25ld1JlY29yZGluZywgc2V0TmV3UmVjb3JkaW5nXSA9IHVzZVN0YXRlPHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHZpZGVvVXJsOiBzdHJpbmc7XG4gICAgdmlzaWJpbGl0eTogJ3ByaXZhdGUnIHwgJ3VubGlzdGVkJztcbiAgICBtYXhWaWV3czogbnVtYmVyO1xuICAgIHllYXJJZDogc3RyaW5nO1xuICAgIHB1Ymxpc2hEYXRlOiBzdHJpbmc7XG4gICAgaXNTYWZlWm9uZTogYm9vbGVhbjtcbiAgfT4oeyBcbiAgICB0aXRsZTogJycsIFxuICAgIHZpZGVvVXJsOiAnJywgXG4gICAgdmlzaWJpbGl0eTogJ3ByaXZhdGUnLCBcbiAgICBtYXhWaWV3czogMiwgXG4gICAgeWVhcklkOiAnJywgXG4gICAgcHVibGlzaERhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLFxuICAgIGlzU2FmZVpvbmU6IHRydWVcbiAgfSk7XG4gIGNvbnN0IFtzZWxlY3RlZFJlY29yZGluZ1llYXIsIHNldFNlbGVjdGVkUmVjb3JkaW5nWWVhcl0gPSB1c2VTdGF0ZTxzdHJpbmc+KCdhbGwnKTtcbiAgY29uc3QgW25ld0F1dGhBZG1pbiwgc2V0TmV3QXV0aEFkbWluXSA9IHVzZVN0YXRlKHsgZW1haWw6ICcnLCBwYXNzd29yZDogJycgfSk7XG4gIGNvbnN0IFtuZXdQcmlVc2VyLCBzZXROZXdQcmlVc2VyXSA9IHVzZVN0YXRlKHsgZW1haWw6ICcnLCBuYW1lOiAnJyB9KTtcbiAgY29uc3QgW2VkaXRpbmdTdHVkZW50LCBzZXRFZGl0aW5nU3R1ZGVudF0gPSB1c2VTdGF0ZTxTdHVkZW50UmVjb3JkIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzdHVkZW50U2VhcmNoLCBzZXRTdHVkZW50U2VhcmNoXSA9IHVzZVN0YXRlKCcnKTtcblxuICAvLyBIb21lIHN0YXRlc1xuICBjb25zdCBbaG9tZUNvbnRlbnQsIHNldEhvbWVDb250ZW50XSA9IHVzZVN0YXRlPEhvbWVDb250ZW50Pih7IFxuICAgIHRlYWNoZXJOYW1lOiAnQ2hhdGh1cmFuYWdhIEJhbmRhcmEnLCBcbiAgICB0ZWFjaGVyTWV0aG9kb2xvZ3k6ICfgtr3gtoLgtprgt4/gt4Dgt5og4LaJ4LeE4LeF4La4IOC2tOC3iuKAjeC2u+C2reC3kuC2teC2vSDgt4Pgt4Tgt5Lgtq0gQmlvIOC2tOC2seC3iuC2reC3kuC2ui4nLCBcbiAgICB0ZWFjaGVySW1hZ2VVcmw6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUzMjA5NDM0OTg4NC01NDNiYzExYjIzNGQ/cT04MCZ3PTI2NzAmYXV0bz1mb3JtYXQmZml0PWNyb3AnLFxuICAgIHRlYWNoZXJIZXJvVXJsOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MDMxMjYwMTk5MzYtZjliNmQ5YTU2M2JiP3E9ODAmdz0yNjcwJmF1dG89Zm9ybWF0JmZpdD1jcm9wJyxcbiAgICB0ZWFjaGVyQWJvdXRVcmw6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU4MTA5MzQ1ODc5MS05ZjNjMzI1MGJiOGI/cT04MCZ3PTI1NzQmYXV0bz1mb3JtYXQmZml0PWNyb3AnLFxuICAgIGFib3V0VGl0bGU6ICdBYm91dCBVcycsXG4gICAgYWJvdXRTdWJ0aXRsZTogJ0NoYXRodXJhbmFnYSBCYW5kYXJhJyxcbiAgICBhYm91dFJpY2hUZXh0OiBgPHA+4La04Lax4LeK4Lat4LeSIOC2huC2u+C2uOC3iuC2tyDgtprgtrsg4LeA4LeD4La7IDTgtprgt4og4Lac4Lat4LeA4LaxIOC3gOC3kuC2pyDgtq/gt5Lgt4Dgtrrgt5LgtrHgt5og4La44LeU4LeF4LeUIEJpbyBBIOC3g+C3j+C2uOC2u+C3iuC2riDgtpzgtqvgtrHgt5LgtrHgt4ogMTDgtrHgt4ogMeC2muC3iiDgtoXgtrQg4La04Lax4LeK4Lat4LeS4La6IOC3g+C2reC3lCDgt4Dgt5LgtrouIOC2iuC3heC2nyDgt4Dgt4Pgtrsg4LeA4LaxIOC3gOC3kuC2pyDgtpHgtrogNuC2seC3iiAx4Laa4LeKIOC2r+C2muC3iuC3gOC3jyDgt4Dgt5Dgtqngt5Ig4LeA4LeS4La6LiDgtrjgt5ngtrgg4LeA4LeD4La74LeaIOC2keC2uiA04Lax4LeKIDHgtprgt4og4Lav4Laa4LeK4LeA4LePIOC3gOC3kOC2qeC3kuC3gOC3kuC2ui4g4LaSIOC2r+C3kuC3g+C3iuC2reC3iuKAjeC2u+C3kuC2muC3iiDgtrjgt5Tgtr3gt4ogMjAg4Lat4LeU4LeFIOC3g+C3kuC3g+C3lOC2seC3iiAxMjYg4Laa4LanIOC3gOC3kOC2qeC3kiDgtrTgt4rigI3gtrvgtrjgt4/gtqvgtrrgtprgt4og4LeD4La44Laf4La6LjwvcD48cD7gtrjgt5ngtrog4La94LaC4Laa4LePIOC2ieC2reC3kuC3hOC3j+C3g+C2uuC3miDgtrTgt4Xgtrjgt5Qg4LeA4LeD4La7IDYg4Lat4LeU4LeFIOC2tOC2seC3iuC2reC3kuC2uuC2muC3iiDgt4Dgt4/gtrvgt4rgtq7gt48g4Laa4LeFIOC3gOC3kOC2qeC3kuC2uCDgtrTgt4rigI3gtrvgtq3gt5LgtrXgtr0g4LeD4La44LeW4LeE4La6IOC2uuC2seC3iuC2sSDgtoXgt4Dgt5Lgt4Dgt4/gtq/gt5Lgtq3gtrouIOC3g+C3keC2tuC3kSDgtprgtrvgt5Tgtqsg4Lax4La44LeKLCDgt4Dgt4PgtrsgNuC2muC3iiDgtrHgt5zgt4Ag4Laa4Lec4La04La44LarIOC2muC3j+C2veC2uuC2muC3iiDgtrTgtrHgt4rgtq3gt5Ig4Laa4LeFIOC2ryDgtrjgt5ngtrgg4La44Lan4LeK4Lan4La44LeaIOC2tOC3iuKAjeC2u+C2reC3kuC2teC2vSDgtrHgt5Lgtrvgt4rgtrjgt4/gtqvgtrog4Laa4LeFIOC2muC3kuC3g+C3kuC2r+C3lCDgtrTgtrHgt4rgtq3gt5Lgtrrgtprgt4og4Lav4LeS4LeA4La64LeS4Lax4LeaIOC2tOC3kOC3gOC2reC3kyDgtrHgt5Dgtq0uPC9wPjxwPuC2heC2tCDgtrjgt5og4LaF4La34LeS4La34LeA4LePIOC2uuC2seC3iuC2seC3miDgtongtq3gt5Lgt4Tgt4/gt4Pgtrrgt5og4Laa4LeS4LeD4LeS4LeA4LeZ4Laa4LeU4Lat4LeKIOC2huC3g+C2seC3iuC2seC2uuC2p+C3gOC2reC3iiDgtpzgtrjgtrHgt4og4Lax4Lec4Laa4LeFIOC3g+C3k+C2uOC3j+C3gOC2seC3iiDgtrouIOC2keC2uiDgtq8g4LaF4La04Lac4LeaIOC3hOC2uuC3gOC2sSDgtprgtqvgt4rgtqngt4/gtrrgtrggKDIwMjQgQS9MKSDgt4DgtrHgt4Dgt5Lgtqcg4La6IC4uPC9wPmAsXG4gICAgYWJvdXRDdGFUZXh0OiAnSm9pbiBOb3cnLFxuICAgIGFib3V0Q3RhVXJsOiAnL2xtcycsXG4gICAgXG4gICAgcHJvY2Vzc1RpdGxlOiAnT3VyIFN1Y2Nlc3NmdWwnLFxuICAgIHByb2Nlc3NTdWJ0aXRsZTogJ1dvcmsgUHJvY2VzcycsXG4gICAgcHJvY2Vzc1N0ZXBzOiBbXG4gICAgICB7IGlkOiAnMScsIHRpdGxlOiAn4Lax4LeS4LeA4LeQ4La74LeQ4Lav4LeSIOC3gOC3kuC3guC2uiDgtprgtrvgt5Tgtqvgt5QnLCBkZXNjcmlwdGlvbjogJ+C3gOC3kuC3guC2uiDgtrHgt5Lgtrvgt4rgtq/gt5rgt4Hgtrog4LaG4LeA4La74Lar4La6IOC3gOC2sSDgtrHgt5Lgt4Dgt5Dgtrvgtq/gt5Ig4LeA4LeS4LeC4La6IOC2muC2u+C3lOC2q+C3lCDgt4Pgtrjgt4rgtrTgt5Lgtqvgt4rgtqngtqvgtrog4Laa4La7IOC3g+C3kuC3g+C3lOC2seC3iuC2pyDgtongtpzgt5DgtrHgt4rgt4Dgt5PgtrgnLCBpY29uOiAnQm9va09wZW4nIH0sXG4gICAgICB7IGlkOiAnMicsIHRpdGxlOiAn4LeA4LeS4LeC4La64LeP4Lax4LeU4La24Lav4LeK4LawIOC2muC3iuKAjeC2u+C3kuC2uuC3j+C2muC3j+C2u+C2muC2uOC3iicsIGRlc2NyaXB0aW9uOiAn4LeA4LeS4LeC4La6IOC2muC2u+C3lOC2q+C3lCDgtrjgtq3gtpog4Lat4La24LePIOC2nOC3kOC2seC3k+C2uCDgtrTgt4Tgt4Pgt5Qg4Laa4LeS4La74LeT4La4IOC2i+C2r+C3meC3g+C3jyDgt4Pgt5Tgt4Dgt5Lgt4Hgt5rgt4Ig4Laa4LeK4oCN4La74La44LeA4Lea4LavIOC3g+C2reC3kuC2tOC2reC3jyDgt4Pgt5Lgtq/gt5Tgtprgt5Lgtrvgt5PgtrgnLCBpY29uOiAnTGlnaHRidWxiJyB9LFxuICAgICAgeyBpZDogJzMnLCB0aXRsZTogJ+C3gOC3kuC3geC3muC3giDgtrTgt4rigI3gtrvgt4Hgt4rgtrEg4La04Lat4LeK4oCN4La7JywgZGVzY3JpcHRpb246ICfgt4Pgt5Tgt4Dgt5Lgt4Hgt5rgt4Ig4La04LeK4oCN4La74LeB4LeK4LaxIOC2tOC2reC3iuKAjeC2uyDgtrjgtp/gt5LgtrHgt4og4LeD4LeS4LeD4LeU4Lax4LeKIOC2r+C3kOC2seC3lOC2uOC3kuC2seC3iiDgt4Pgt4Qg4LaF4Lat4LeK4Lav4LeQ4Laa4LeT4La44LeKIOC2uOC2n+C3kuC2seC3iiDgtovgt4Pgt4Pgt4og4La04LeZ4LeFIOC3gOC3kuC2t+C3j+C2nOC2uuC2pyDgt4Pgt5bgtq/gt4/gtrHgtrjgt4og4Laa4La74LeA4LeT4La4JywgaWNvbjogJ0ZpbGVUZXh0JyB9LFxuICAgICAgeyBpZDogJzQnLCB0aXRsZTogJ+C2seC3kuC3gOC3kOC2u+C2r+C3kiDgtprgt4/gtr0g4La74LeP4La44LeU4LeAJywgZGVzY3JpcHRpb246ICfgt4Dgt5Lgt4Lgtrog4Laa4La74LeU4Lar4LeUIOC2tOC2seC3iuC2reC3kuC2uiDgtq3gt5Tgt4Ug4Lav4LeT4La4IOC2heC3gOC2sOC3j+C2u+C2q+C2uiDgtprgt5Lgtrvgt5Pgtrjgt5ngtrHgt4og4Lax4LeS4LeA4LeQ4La74LeQ4Lav4LeSIOC2muC3j+C2vSDgtrvgt4/gtrjgt5Tgt4Dgtprgt4og4Lat4LeU4LeFIOC3g+C3kuC3g+C3lOC2seC3iiDgtrjgt5ngt4Tgt5ngtrrgt4Dgt5PgtrgnLCBpY29uOiAnQ2FsZW5kYXJDaGVjaycgfSxcbiAgICAgIHsgaWQ6ICc1JywgdGl0bGU6ICfgt4Dgt5Lgt4Hgt5Lgt4Lgt4rgtqfgtq3gtrgg4La04LeK4oCN4La74Lat4LeS4La14La9JywgZGVzY3JpcHRpb246ICfgtoXgt4Dgt4PgtrHgt4og4La04LeK4oCN4La74Lat4LeS4La14La94Laa4LeKIOC2veC3meC3gyDgt4Pgt5Lgt4Pgt5TgtrHgt4rgtqcg4LeA4LeS4LeB4LeS4LeC4LeK4Lan4Lat4La4IOC2tOC3iuKAjeC2u+C2reC3kuC2teC2veC2uuC2muC3iiDgtr3gtrbgt4/gtpzgt5DgtrHgt5Pgtrgg4LeD4Laz4LeE4LePIOC2uOC2n+C2tOC3meC2seC3iuC3gOC3k+C2uCcsIGljb246ICdDaGVja0NpcmNsZTInIH1cbiAgICBdLFxuXG4gICAgc3BlY2lhbFRpdGxlOiAnU3BlY2lhbCBQcm9ncmFtcycsXG4gICAgc3BlY2lhbFN1YnRpdGxlOiAnVGhlIGZpbmFsIFBhcGVyIENsYXNzJyxcbiAgICBzcGVjaWFsRGVzYzogJ0EvTCBQQVBFUiDgtpHgtprgtqcg4La04LeD4LeK4LeD4LeaIOC2veC2guC2muC3j+C3gOC3miDgt4Dgt5Dgtqngt5Lgtrgg4LeF4La44La64LeSIOC2tOC3iuKAjeC2u+C2uOC3j+C2q+C2uuC2muC3iiDgtpHgtprgtrTgt4/gtrsg4La94LeS4La64LaxIEJpbyBQQVBFUiDgtpHgtpouIOC3gOC3kuC3geC3muC3giDgtrTgt4rigI3gtrvgt4Hgt4rgtrEsIOC2tOC3meC2u+C3hOC3lOC2u+C3lCDgtrTgt4rigI3gtrvgt4Hgt4rgtrEg4LeD4La44Lac4LeS4Lax4LeKIOC3g+C3kuC3g+C3lOC2seC3iuC2nOC3miDgt4Dgt5Lgt4Lgtrog4La04LeS4LeF4LeS4La24Laz4LeAIOC3hOC3kOC2muC3kuC2uuC3j+C3gCDgt4Dgt5Dgtqngt5Ig4Lav4LeS4La64LeU4Lar4LeUIOC2muC2u+C2uOC3kuC2seC3iiDgt4Dgt5Lgtrfgt4/gtpzgtrog4LeD4Laz4LeE4LePIOC3g+C3luC2r+C3j+C2seC2uOC3iiDgtprgtrvgt4DgtrHgt5Qg4La94La24La64LeSJyxcbiAgICBzcGVjaWFsRmVhdHVyZXM6IFtcbiAgICAgIHsgaWQ6ICdmMScsIHRpdGxlOiAn4La44Law4LeK4oCN4La64LeD4LeK4Lau4LeP4LaxIDQy4Laa4LeKJywgZGVzY3JpcHRpb246ICfgtq/gt5Lgt4Dgtrrgt5LgtrEg4La04LeU4La74LePIOC2uOC2sOC3iuKAjeC2uuC3g+C3iuC2ruC3j+C2sSA0MiDgtq/gt5Mg4LeD4LeS4LeD4LeU4Lax4LeK4LanIOC2tOC3iuKAjeC2u+C3geC3iuC2sSDgtrTgtq3gt4rigI3gtrvgtrog4LeD4Laz4LeE4LePIOC2t+C3nuC2reC3kuC2muC3gCDgt4Pgt4Tgtrfgt4/gtpzgt5Ig4LeA4LeT4La44LeaIOC3hOC3kOC2muC3kuC2uuC3j+C3gCDgtofgtq0uJywgaWNvbjogJ01hcFBpbicgfSxcbiAgICAgIHsgaWQ6ICdmMicsIHRpdGxlOiAn4LeA4LeQ4Lap4LeS4La4IFJhbmsg4La94LeS4LeD4LeK4Lan4LeKIOC2keC2micsIGRlc2NyaXB0aW9uOiAn4LaL4LeD4LeD4LeKIOC2tOC3meC3hSDgt4Dgt5Lgtrfgt4/gtpzgtrrgtqcg4La04LeD4LeU4LeAIOC3gOC3kuC3geC3j+C2veC2reC2uCDgt4Pgt5Lgt4Pgt5TgtrHgt4og4La04LeS4La74LeS4LeD4Laa4LanIOC2keC2muC3gOC2uyDgtr3gtprgt5Tgtqvgt5Qg4La94La24LeP4Lav4LeTIOC3geC3iuC2u+C3muC2q+C3kuC2nOC2rSDgtprgt5Lgtrvgt5Pgtrjgt4og4LeD4LeS4Lav4LeU4Laa4La74LaxIOC2keC2muC2uCBCaW8g4La04Lax4LeK4Lat4LeS4La6LicsIGljb246ICdVc2VycycgfSxcbiAgICAgIHsgaWQ6ICdmMycsIHRpdGxlOiAn4La04LeK4oCN4La74Lac4Lat4LeSIOC3g+C2uOC3j+C2veC3neC2oOC2seC2uicsIGRlc2NyaXB0aW9uOiAn4Lax4LeAIOC2reC3j+C2muC3iuC3guC2q+C3kuC2miDgtprgt4rigI3gtrvgtrjgt4Dgt5rgtq/gtrrgtrHgt4og4LaU4LeD4LeK4LeD4LeaIOC3g+C3kuC3g+C3lOC2seC3iuC2nOC3miDgtrTgt4Pgt5Tgtpzgt5Lgtrog4La04LeK4oCN4La74LeB4LeK4LaxIOC2tOC2reC3iuKAjeC2uyDgt4Dgtr0g4La94Laa4LeU4Lar4LeUIOC2heC2sOC3iuKAjeC2uuC2uuC2seC2uiDgtprgtrsg4LeD4LeS4LeD4LeU4Lax4LeK4Lac4LeaIOC2tOC3iuKAjeC2u+C2nOC2reC3kuC2uiDgt4Dgt4/gtrvgt4rgtq3gt4/gt4Dgtprgt4og4LeA4LeZ4La24LeK4LaF4Lap4LeA4LeS4La6IOC3hOC2u+C3hOC3jyDgtr3gtrbgt48g4Lac4LatIOC3hOC3kOC2muC3kiDgt4Dgt5PgtrgnLCBpY29uOiAnQmFyQ2hhcnQzJyB9LFxuICAgICAgeyBpZDogJ2Y0JywgdGl0bGU6ICfgtr3gtprgt5Tgtqvgt5Qg4LeA4LeS4LeB4LeK4La94Lea4LeC4Lar4La6JywgZGVzY3JpcHRpb246ICfgt4Pgt5Hgtrgg4LeD4LeS4LeD4LeU4LeA4LeZ4Laa4LeU4Lan4La4IOC2veC2muC3lOC2q+C3lCDgtrTgt5Lgt4Xgt5LgtrbgtrPgt4Ag4La04LeK4oCN4La74LeB4LeK4LaxIOC2tOC2reC3iuKAjeC2uyDgtrTgtrvgt5Pgtprgt4rgt4Lgtpog4LeD4La44LafIOC3g+C2uOC3iuC2tuC2seC3iuC2sCDgt4Dgt5Mg4LeA4LeP4La74LeK4Lat4LeP4LeA4Laa4LeKIOC2veC2tuC3j+C2nOC2rSDgt4Tgt5Dgtprgt5Ig4LeA4LeT4La4LCDgtq3gtrgg4LaF4Lap4LeU4La04LeP4Lap4LeUIOC2lOC3gOC3lOC2seC3iiDgt4Pgtrjgtp8g4LeD4LeP4Laa4Lag4LeK4Lah4LePIOC2muC3hSDgt4Tgt5Dgtprgt5Ig4LeA4LeT4La4JywgaWNvbjogJ0Nsb2NrJyB9XG4gICAgXSxcblxuICAgIHRlbGVncmFtVGl0bGU6ICdCaW8nLFxuICAgIHRlbGVncmFtU3VidGl0bGU6ICdPdXIgVGVsZWdyYW0gQ2hhbm5lbHMnLFxuICAgIHRlbGVncmFtQ2hhbm5lbHM6IFtcbiAgICAgIHsgaWQ6ICd0MScsIG5hbWU6ICcyMDI4IFRoZW9yeScsIHVybDogJ2h0dHBzOi8vdC5tZS9DSEVNMjhUJywgaW1hZ2VVcmw6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxNDg1MDUyMzI5Ni1kOGMxYWY5M2Q0MDA/cT04MCZ3PTI2NzAmYXV0bz1mb3JtYXQmZml0PWNyb3AnIH0sXG4gICAgICB7IGlkOiAndDInLCBuYW1lOiAnMjAyNiBSZXZpc2lvbicsIHVybDogJ2h0dHBzOi8vdC5tZS9jaGVtXzI2UicsIGltYWdlVXJsOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTQ4NTA1MjMyOTYtZDhjMWFmOTNkNDAwP3E9ODAmdz0yNjcwJmF1dG89Zm9ybWF0JmZpdD1jcm9wJyB9LFxuICAgICAgeyBpZDogJ3QzJywgbmFtZTogJzIwMjYgVGhlb3J5JywgdXJsOiAnaHR0cHM6Ly90Lm1lL2NoZW0yNlRoJywgaW1hZ2VVcmw6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxNDg1MDUyMzI5Ni1kOGMxYWY5M2Q0MDA/cT04MCZ3PTI2NzAmYXV0bz1mb3JtYXQmZml0PWNyb3AnIH0sXG4gICAgICB7IGlkOiAndDQnLCBuYW1lOiAnMjAyNyBUaGVvcnknLCB1cmw6ICdodHRwczovL3QubWUvQ0hFTV8yN1QnLCBpbWFnZVVybDogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjE0ODUwNTIzMjk2LWQ4YzFhZjkzZDQwMD9xPTgwJnc9MjY3MCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCcgfVxuICAgIF0sXG5cbiAgICB0ZWFjaGVyQmlvVGl0bGU6ICfgtpzgt5Tgtrvgt5Tgt4Dgtrvgtrrgt48g4La04LeS4LeF4LeS4La24Laz4LeALCcsXG4gICAgdGVhY2hlckJpb1RleHQ6IGAyMDE3IOC2i+C3g+C3g+C3iiDgtrTgt5ngt4Ug4Lai4LeT4LeAIOC3gOC3kuC2r+C3iuKAjeC2uuC3jyDgtoXgtoLgt4Hgtrrgt5ngtrHgt4og4Lav4LeS4LeA4La64LeS4Lax4LeaIDQg4LeA4LaxIOC3g+C3iuC2ruC3j+C2seC2uuC2pyAo4Laa4Lec4LeF4La5IOC2r+C3kuC3g+C3iuC2reC3iuKAjeC2u+C3kuC2muC3iiAyKSDgt4Pgtrjgtq3gt4rgt4Ag4La44LeaIOC3gOC2sSDgt4Dgt5Lgtqcg4Laa4Lec4LeF4La5IOC3gOC3m+C2r+C3iuKAjeC2uiDgtrTgt5Pgtqjgtrrgt5og4LeD4LeS4La6IOC2i+C2tOC3j+C2sOC3kuC2uiDgtoXgt4Dgt4PgtrHgt4og4Laa4La74La44LeS4Lax4LeKIOC3g+C3kuC2p+C3kuC2uuC3ki4gMjAxOSDgtq/gt5Mg4LaL4La04Laa4LeP4La74LaaIOC2tOC2seC3iuC2reC3kiDgtprgt4rgt4Lgt5rgtq3gt4rigI3gtrvgtrrgtqcg4La04LeS4LeA4LeS4LeD4LeZ4LaxIOC2lOC3hOC3lCDgt4Dgt4PgtrsgNOC2muC3iiDgtrrgtrHgt4rgtrHgtqfgtq3gt4og4La04LeZ4La7ICjgt4Dgtrrgt4Mg4LaF4LeA4LeU4La74LeU4Lav4LeUIDI04LaaIOC3gOC2sSDgt4Dgt5LgtqcpIOC2r+C3kuC3gOC2uuC3kuC2seC3miDgtpHgtq/gt48g4La44LeZ4Lav4LePIOC2reC3lOC2uyDgt4Pgtrjgt4Pgt4rgtq4g4Lan4LeS4La64LeU4LeC4Lax4LeKIOC2ieC2reC3kuC3hOC3j+C3g+C2uuC3muC2uCDgt4Dgt5Dgtqngt5Lgtrgg4LeD4LeS4LeD4LeU4Lax4LeKIOC2tOC3kuC2u+C3kuC3g+C2muC3iiDgt4Pgt4Tgtrfgt4/gtpzgt5Ig4LeA4LaxIOC2ouC3k+C3gCDgt4Dgt5Lgtq/gt4rigI3gtrrgt4/gt4Ag4La04Lax4LeK4Lat4LeS4La6IOC2seC3kuC2u+C3iuC2uOC3j+C2q+C2uiDgtprgtrvgtrHgt4rgtrHgt5osIOC2uuC2veC3iuC2tOC3kOC2seC2nOC3kuC2uiDgtprgt4rigI3gtrvgtrjgt4Dgt5rgtq/gtrrgtrHgt4og4LeA4LeZ4Lax4LeU4LeA4LanIOC3gOC3g+C2uyDgtprgt5Lgt4Tgt5LgtrTgtrrgtprgtqcg4LaJ4LeE4LatIOC2r+C3kyDgtq3gtrjgt48g4LeA4LeS4LeD4LeS4Lax4LeK4La4IOC2heC2seC3lOC2nOC2uOC2seC2uiDgtprgt4Ug4LaF4Lat4LeS4LeD4LeP4La74LeK4Lau4LaaIOC2muC3iuKAjeC2u+C2uOC3gOC3muC2r+C2uuC2seC3iiDgtrTgtrHgt4rgtq3gt5Lgtrrgt5og4LeA4LeQ4LapIOC2tOC3kuC3heC3kuC3gOC3meC3heC2pyDgtrjgt5Tgt4Pgt5Qg4Laa4La74La44LeS4Lax4LeKIOC2heC3gOC3gOC3j+C2r+C2uuC2pyDgtpHgt4Tgt48g4Lac4LeS4La6IOC2huC2r+C2u+C3iuC3geC2uuC2muC3iiDgtrjgtq0g4LeD4LeS4LeD4LeU4Lax4LeKIOC3gOC3kuC2t+C3j+C2nOC2uuC2pyDgt4Pgt5bgtq/gt4/gtrHgtrjgt4og4Laa4La74LeA4LeT4La4IOC3g+C3hCDgt4Dgt5Lgt4LgtrrgtrHgt4ogM+C2p+C2uCDgtoXgtq/gt4/gt4Ug4Lax4LeS4LeA4LeQ4La74Lav4LeSIOC2uOC2nOC2tOC3meC2seC3iuC3gOC3k+C2uCDgt4Tgt5rgtq3gt5Tgt4Dgt5ngtrHgt4og4LeA4LeaLlxcblxcbuC3g+C3kuC2uiDgtrTgt4Xgtrjgt5Qg4La04Lax4LeK4Lat4LeS4La64LeZ4Lax4LeK4La4IOC2nOC2uOC3iuC2tOC3hCDgtq/gt5Lgt4Pgt4rgtq3gt4rigI3gtrvgt5Lgtprgt4rgtprgtrrgt5og4La04LeK4oCN4La74Lau4La44La64LePICjgtq/gt5Lgt4Dgtrrgt5LgtrHgt5ngt4ogOSkg4LavIOC2r+C3meC3gOC2sSDgtrTgtrHgt4rgtq3gt5Lgtrrgt5ngtrHgt4og4Lav4LeS4LeA4La64LeS4Lax4LeaIDIsIDQg4LaH4Lat4LeU4LeF4LeU4LeAIOC2r+C3kuC3g+C3iuC2reC3iuKAjeC2u+C3kuC2muC3iiDgtrTgt4rigI3gtrvgtq7gtrjgtrrgtrHgt4ogMuC2muC3iiDgtq/gt5ngt4Dgt5DgtrHgt5LgtrrgtrHgt4ogM+C2muC3iiDgt4Pgt4Qg4Lat4LeZ4LeA4Lax4LeS4La64LeZ4Laa4LeKIOC2seC3kuC2u+C3iuC2uOC3j+C2q+C2uiDgt4DgtrHgt4rgtrHgt5og4LavIOC2ieC3hOC2rSDgtprgt5Mg4LeE4Lea4Lat4LeU4LeAIOC3g+C3hCDgtpzgt5Tgtrvgt5Tgt4Dgtrvgtrrgt48g4LeD4Lat4LeUIOC3g+C3hOC2ouC2uuC3meC2seC3iiDgtr3gtq8g4LeA4LeS4LeC4La6IOC2muC2u+C3lOC2q+C3lCDgtrTgt5Dgt4Tgt5Dgtq/gt5Lgtr3gt5Ig4Laa4LeS4La74LeT4La44LeaIOC3hOC3kOC2muC3kuC2uuC3j+C3gCDgt4Tgt5rgtq3gt5Tgt4Dgt5ngtrHgt4og4LeA4LeaLmAsXG4gICAgdGVhY2hlclZpZGVvVXJsOiAnaHR0cHM6Ly95b3V0dS5iZS83WHJiZER6RDdWOCcsXG4gICAgdGVhY2hlclZpZGVvVGh1bWJuYWlsOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzIxODc4NzU2MjAtMWU0MzM0ZjZlZWU5P3E9ODAmdz0yNjcwJmF1dG89Zm9ybWF0JmZpdD1jcm9wJyxcblxuICAgIGhlcm9TbGlkZXM6IFtcbiAgICAgICB7IGlkOiAnczEnLCB0aXRsZTogJ0JpbyBIaWdoZXN0IFJlc3VsdHMnLCBzdWJ0aXRsZTogJ0pvdXJuZXkgb2YgRXhjZWxsZW5jZScsIGltYWdlVXJsOiAnLzEuYXZpZicsIGN0YVRleHQ6ICdFeHBsb3JlIE91ciBKb3VybmV5JywgY3RhVXJsOiAnL2xtcycgfSxcbiAgICAgICB7IGlkOiAnczInLCB0aXRsZTogJ+C3gOC3kuC3geC3kuC3guC3iuC2p+C2reC2uCBCaW8g4La04Lax4LeK4Lat4LeS4La6Jywgc3VidGl0bGU6ICfgtoXgtq8g4La94LaC4Laa4LeP4LeA4LeaJywgaW1hZ2VVcmw6ICcvMi5hdmlmJyB9LFxuICAgICAgIHsgaWQ6ICdzMycsIHRpdGxlOiAnQmlvIOC2tOC2seC3iuC2reC3kuC2uicsIHN1YnRpdGxlOiAn4Lav4LeS4LeA4La64LeS4Lax4LeaIOC3gOC3kOC2qeC3kuC2uCDgt4Pgt5Lgt4Pgt5TgtrHgt4og4La04LeS4La74LeS4LeD4Laa4LeKJywgaW1hZ2VVcmw6ICcvMy5hdmlmJyB9XG4gICAgXSxcblxuICAgIGNvbnRhY3RUaXRsZTogJ0NvbnRhY3QgVXMnLFxuICAgIGNvbnRhY3RTdWJ0aXRsZTogJ+C2tOC3hOC2rSDgt4PgtrPgt4TgtrHgt4og4LaG4Laa4LeP4La7IOC2uOC2nOC3kuC2seC3iiDgtpTgtrbgtqcg4LaF4La0IOC3hOC3jyDgt4Pgtrjgt4rgtrbgtrHgt4rgtrAg4LeA4LeS4La6IOC3hOC3kOC2micsXG4gICAgY29udGFjdEFkZHJlc3M6ICdObzogMTYwLCBSYWphZ2lyaXlhLicsXG4gICAgY29udGFjdFBob25lOiAnMDcwIDEyMyA0NTY3JyxcbiAgICBjb250YWN0RW1haWw6ICdpbmZvQGJ3aXRoYi5saycsXG4gICAgY29udGFjdFdvcmtpbmdIb3VyczogJ01vbi1TYXQ6IDhhbS01cG0nLFxuXG4gICAgZmFjZWJvb2tVcmw6ICcnLFxuICAgIHlvdXR1YmVVcmw6ICcnLFxuICAgIHdoYXRzYXBwVXJsOiAnJyxcbiAgICBpbnN0YWdyYW1Vcmw6ICcnLFxuICAgIGxpbmtlZGluVXJsOiAnIycsXG4gICAgYWxsb3dlZERvbWFpbjogdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cubG9jYXRpb24ub3JpZ2luIDogJydcbiAgfSk7XG4gIGNvbnN0IFtob21lUG9zdHMsIHNldEhvbWVQb3N0c10gPSB1c2VTdGF0ZTxIb21lUG9zdFtdPihbXSk7XG4gIGNvbnN0IFtob21lVmlkZW9zLCBzZXRIb21lVmlkZW9zXSA9IHVzZVN0YXRlPEhvbWVWaWRlb1tdPihbXSk7XG4gIGNvbnN0IFtuZXdIb21lUG9zdCwgc2V0TmV3SG9tZVBvc3RdID0gdXNlU3RhdGU8eyB0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBpbWFnZVVybDogc3RyaW5nLCBpbWFnZVVybHM/OiBzdHJpbmdbXSB9Pih7IHRpdGxlOiAnJywgZGVzY3JpcHRpb246ICcnLCBpbWFnZVVybDogJycgfSk7XG4gIGNvbnN0IFtuZXdIb21lVmlkZW8sIHNldE5ld0hvbWVWaWRlb10gPSB1c2VTdGF0ZSh7IHRpdGxlOiAnJywgdmlkZW9Vcmw6ICcnIH0pO1xuICBcbiAgLy8gVGVtcCBzdGF0ZXMgZm9yIGhvbWUgYnVpbGRlclxuICBjb25zdCBbbmV3U2xpZGUsIHNldE5ld1NsaWRlXSA9IHVzZVN0YXRlKHsgdGl0bGU6ICcnLCBzdWJ0aXRsZTogJycsIGltYWdlVXJsOiAnJywgY3RhVGV4dDogJycsIGN0YVVybDogJycsIHRpdGxlRm9udFNpemU6IDEwLCB0aXRsZUZvbnRTaXplTW9iaWxlOiA0IH0pO1xuICBjb25zdCBbbmV3UHJvY2Vzc1N0ZXAsIHNldE5ld1Byb2Nlc3NTdGVwXSA9IHVzZVN0YXRlKHsgdGl0bGU6ICcnLCBkZXNjcmlwdGlvbjogJycsIGljb246ICdCb29rT3BlbicgfSk7XG4gIGNvbnN0IFtuZXdGZWF0dXJlLCBzZXROZXdGZWF0dXJlXSA9IHVzZVN0YXRlKHsgdGl0bGU6ICcnLCBkZXNjcmlwdGlvbjogJycsIGljb246ICdQbGF5JyB9KTtcbiAgY29uc3QgW25ld1RlbGVncmFtLCBzZXROZXdUZWxlZ3JhbV0gPSB1c2VTdGF0ZSh7IG5hbWU6ICcnLCB1cmw6ICcnLCBpbWFnZVVybDogJycgfSk7XG5cbiAgLy8gTG9jYWwgSGVybyBTbGlkZXMgZmFsbGJhY2tcbiAgY29uc3QgTE9DQUxfU0xJREVTID0gW1xuICAgIHsgaW1hZ2VVcmw6ICcvMS5hdmlmJyB9LFxuICAgIHsgaW1hZ2VVcmw6ICcvMi5hdmlmJyB9LFxuICAgIHsgaW1hZ2VVcmw6ICcvMy5hdmlmJyB9XG4gIF07XG5cbiAgY29uc3QgY3VycmVudE1vbnRoID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDcpOyAvLyBZWVlZLU1NXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1bnN1Ykxlc3NvbnMgPSBvblNuYXBzaG90KGNvbGxlY3Rpb24oZGIsICdsZXNzb25zJyksIChzbmFwKSA9PiB7XG4gICAgICBzZXRMZXNzb25zKHNuYXAuZG9jcy5tYXAoZG9jID0+ICh7IGlkOiBkb2MuaWQsIC4uLmRvYy5kYXRhKCkgfSBhcyBMZXNzb24pKSk7XG4gICAgfSwgKGVycikgPT4gaGFuZGxlRmlyZXN0b3JlRXJyb3IoZXJyLCBPcGVyYXRpb25UeXBlLkxJU1QsICdsZXNzb25zJykpO1xuXG4gICAgY29uc3QgdW5zdWJDbGFzc2VzID0gb25TbmFwc2hvdChjb2xsZWN0aW9uKGRiLCAnb25saW5lQ2xhc3NlcycpLCAoc25hcCkgPT4ge1xuICAgICAgc2V0T25saW5lQ2xhc3NlcyhzbmFwLmRvY3MubWFwKGRvYyA9PiAoeyBpZDogZG9jLmlkLCAuLi5kb2MuZGF0YSgpIH0gYXMgT25saW5lQ2xhc3MpKSk7XG4gICAgfSwgKGVycikgPT4gaGFuZGxlRmlyZXN0b3JlRXJyb3IoZXJyLCBPcGVyYXRpb25UeXBlLkxJU1QsICdvbmxpbmVDbGFzc2VzJykpO1xuXG4gICAgY29uc3QgdW5zdWJTdHVkZW50cyA9IG9uU25hcHNob3QoY29sbGVjdGlvbihkYiwgJ3N0dWRlbnRzJyksIChzbmFwKSA9PiB7XG4gICAgICBjb25zdCBzdHVkZW50RGF0YSA9IHNuYXAuZG9jcy5tYXAoZG9jID0+ICh7IGlkOiBkb2MuaWQsIC4uLmRvYy5kYXRhKCkgfSBhcyBTdHVkZW50UmVjb3JkKSk7XG4gICAgICAvLyBTb3J0IGJ5IHJlZ2lzdHJhdGlvbiBkYXRlIGRlc2NlbmRpbmcgKG5ld2VzdCBmaXJzdClcbiAgICAgIGNvbnN0IHNvcnRlZFN0dWRlbnRzID0gc3R1ZGVudERhdGEuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBkYXRlQSA9IChhLnJlZ2lzdGVyZWRBdCBhcyBhbnkpPy50b0RhdGU/LigpPy5nZXRUaW1lKCkgfHwgbmV3IERhdGUoYS5yZWdpc3RlcmVkQXQgYXMgYW55IHx8IDApLmdldFRpbWUoKTtcbiAgICAgICAgY29uc3QgZGF0ZUIgPSAoYi5yZWdpc3RlcmVkQXQgYXMgYW55KT8udG9EYXRlPy4oKT8uZ2V0VGltZSgpIHx8IG5ldyBEYXRlKGIucmVnaXN0ZXJlZEF0IGFzIGFueSB8fCAwKS5nZXRUaW1lKCk7XG4gICAgICAgIHJldHVybiBkYXRlQiAtIGRhdGVBO1xuICAgICAgfSk7XG4gICAgICBzZXRTdHVkZW50cyhzb3J0ZWRTdHVkZW50cyk7XG4gICAgfSwgKGVycikgPT4gaGFuZGxlRmlyZXN0b3JlRXJyb3IoZXJyLCBPcGVyYXRpb25UeXBlLkxJU1QsICdzdHVkZW50cycpKTtcblxuICAgIGNvbnN0IHVuc3ViSG9tZUNvbnRlbnQgPSBvblNuYXBzaG90KGRvYyhkYiwgJ2hvbWVfY29udGVudCcsICdtYWluJyksIChzbmFwKSA9PiB7XG4gICAgICBpZiAoc25hcC5leGlzdHMoKSkgc2V0SG9tZUNvbnRlbnQoc25hcC5kYXRhKCkgYXMgSG9tZUNvbnRlbnQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdW5zdWJIb21lUG9zdHMgPSBvblNuYXBzaG90KGNvbGxlY3Rpb24oZGIsICdob21lX3Bvc3RzJyksIChzbmFwKSA9PiB7XG4gICAgICBzZXRIb21lUG9zdHMoc25hcC5kb2NzLm1hcChkb2MgPT4gKHsgaWQ6IGRvYy5pZCwgLi4uZG9jLmRhdGEoKSB9IGFzIEhvbWVQb3N0KSkpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdW5zdWJIb21lVmlkZW9zID0gb25TbmFwc2hvdChjb2xsZWN0aW9uKGRiLCAnaG9tZV92aWRlb3MnKSwgKHNuYXApID0+IHtcbiAgICAgIHNldEhvbWVWaWRlb3Moc25hcC5kb2NzLm1hcChkb2MgPT4gKHsgaWQ6IGRvYy5pZCwgLi4uZG9jLmRhdGEoKSB9IGFzIEhvbWVWaWRlbykpKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHVuc3ViQXV0aEFkbWlucyA9IG9uU25hcHNob3QoY29sbGVjdGlvbihkYiwgJ2F1dGhvcml6ZWRBZG1pbnMnKSwgKHNuYXApID0+IHtcbiAgICAgIHNldEF1dGhvcml6ZWRBZG1pbnMoc25hcC5kb2NzLm1hcChkb2MgPT4gKHsgaWQ6IGRvYy5pZCwgLi4uZG9jLmRhdGEoKSB9KSkpO1xuICAgIH0sIChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUud2FybihcIlBlcm1pc3Npb24gZGVuaWVkIHJlYWRpbmcgYXV0aG9yaXplZEFkbWlucy4gWW91IG1heSBuZWVkIHRvIGxvZyBpbiB2aWEgR2VuZXJhbCBMb2dpbiBmaXJzdC5cIik7XG4gICAgfSk7XG5cbiAgICBjb25zdCB1bnN1YlBhcGVyUmVzdWx0cyA9IG9uU25hcHNob3QoY29sbGVjdGlvbihkYiwgJ3BhcGVyUmVzdWx0cycpLCAoc25hcCkgPT4ge1xuICAgICAgc2V0UGFwZXJSZXN1bHRzKHNuYXAuZG9jcy5tYXAoZG9jID0+ICh7IGlkOiBkb2MuaWQsIC4uLmRvYy5kYXRhKCkgfSBhcyBQYXBlclJlc3VsdCkpKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHVuc3ViQWNhZGVtaWNZZWFycyA9IG9uU25hcHNob3QoY29sbGVjdGlvbihkYiwgJ2FjYWRlbWljWWVhcnMnKSwgKHNuYXApID0+IHtcbiAgICAgIHNldEFjYWRlbWljWWVhcnMoc25hcC5kb2NzLm1hcChkb2MgPT4gKHsgaWQ6IGRvYy5pZCwgLi4uZG9jLmRhdGEoKSB9IGFzIEFjYWRlbWljWWVhcikpKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHVuc3ViUmVjb3JkaW5ncyA9IG9uU25hcHNob3QoY29sbGVjdGlvbihkYiwgJ3JlY29yZGluZ3MnKSwgKHNuYXApID0+IHtcbiAgICAgIHNldFJlY29yZGluZ3Moc25hcC5kb2NzLm1hcChkb2MgPT4gKHsgaWQ6IGRvYy5pZCwgLi4uZG9jLmRhdGEoKSB9IGFzIFJlY29yZGluZykpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB1bnN1Ykxlc3NvbnMoKTtcbiAgICAgIHVuc3ViQ2xhc3NlcygpO1xuICAgICAgdW5zdWJTdHVkZW50cygpO1xuICAgICAgdW5zdWJIb21lQ29udGVudCgpO1xuICAgICAgdW5zdWJIb21lUG9zdHMoKTtcbiAgICAgIHVuc3ViSG9tZVZpZGVvcygpO1xuICAgICAgdW5zdWJBdXRoQWRtaW5zKCk7XG4gICAgICB1bnN1YlBhcGVyUmVzdWx0cygpO1xuICAgICAgdW5zdWJBY2FkZW1pY1llYXJzKCk7XG4gICAgICB1bnN1YlJlY29yZGluZ3MoKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAobmV3UGFwZXJSZXN1bHQuc3R1ZGVudEluZGV4ICYmIHN0dWRlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHN0dWRlbnQgPSBzdHVkZW50cy5maW5kKHMgPT4gcy5zdHVkZW50SWQgPT09IG5ld1BhcGVyUmVzdWx0LnN0dWRlbnRJbmRleCB8fCBzLmluZGV4TnVtYmVyID09PSBuZXdQYXBlclJlc3VsdC5zdHVkZW50SW5kZXgpO1xuICAgICAgaWYgKHN0dWRlbnQgJiYgc3R1ZGVudC55ZWFySWQgJiYgc3R1ZGVudC55ZWFySWQgIT09IG5ld1BhcGVyUmVzdWx0LnllYXJJZCkge1xuICAgICAgICBzZXROZXdQYXBlclJlc3VsdChwcmV2ID0+ICh7IC4uLnByZXYsIHllYXJJZDogc3R1ZGVudC55ZWFySWQgfHwgJycgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgW25ld1BhcGVyUmVzdWx0LnN0dWRlbnRJbmRleCwgc3R1ZGVudHNdKTtcblxuICBjb25zdCBoYW5kbGVBZGRMZXNzb24gPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGFkZERvYyhjb2xsZWN0aW9uKGRiLCAnbGVzc29ucycpLCB7IC4uLm5ld0xlc3NvbiwgY3JlYXRlZEF0OiBzZXJ2ZXJUaW1lc3RhbXAoKSB9KTtcbiAgICAgIHNldE5ld0xlc3Nvbih7IFxuICAgICAgICB0b3BpYzogJycsIFxuICAgICAgICBzdWJUb3BpYzogJycsIFxuICAgICAgICB2aWRlb1VybDogJycsIFxuICAgICAgICB2aWRlb1R5cGU6ICd5b3V0dWJlJywgXG4gICAgICAgIHZpc2liaWxpdHk6ICdwcml2YXRlJywgXG4gICAgICAgIHRodW1ibmFpbFVybDogJycsIFxuICAgICAgICBpbWFnZVVybDogJycsIFxuICAgICAgICBtYXhWaWV3czogMixcbiAgICAgICAgeWVhcklkOiBuZXdMZXNzb24ueWVhcklkLFxuICAgICAgICBpc1NhZmVab25lOiB0cnVlXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHsgaGFuZGxlRmlyZXN0b3JlRXJyb3IoZXJyLCBPcGVyYXRpb25UeXBlLkNSRUFURSwgJ2xlc3NvbnMnKTsgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFkZENsYXNzID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBhZGREb2MoY29sbGVjdGlvbihkYiwgJ29ubGluZUNsYXNzZXMnKSwgeyAuLi5uZXdDbGFzcywgc3RhcnRUaW1lOiBzZXJ2ZXJUaW1lc3RhbXAoKSB9KTtcbiAgICAgIHNldE5ld0NsYXNzKHsgdGl0bGU6ICcnLCBsaW5rOiAnJywgdHlwZTogJ3pvb20nIH0pO1xuICAgIH0gY2F0Y2ggKGVycikgeyBoYW5kbGVGaXJlc3RvcmVFcnJvcihlcnIsIE9wZXJhdGlvblR5cGUuQ1JFQVRFLCAnb25saW5lQ2xhc3NlcycpOyB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQWRkU3R1ZGVudCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gQXV0by1nZW5lcmF0ZSBJbmRleCBOdW1iZXJcbiAgICAgIGNvbnN0IGNvdW50ZXJSZWYgPSBkb2MoZGIsICdjb3VudGVycycsICdzdHVkZW50SW5kZXgnKTtcbiAgICAgIGxldCBuZXh0SW5kZXggPSAxO1xuICAgICAgXG4gICAgICBhd2FpdCBydW5UcmFuc2FjdGlvbihkYiwgYXN5bmMgKHRyYW5zYWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50ZXJEb2MgPSBhd2FpdCB0cmFuc2FjdGlvbi5nZXQoY291bnRlclJlZik7XG4gICAgICAgIGlmICghY291bnRlckRvYy5leGlzdHMoKSkge1xuICAgICAgICAgIHRyYW5zYWN0aW9uLnNldChjb3VudGVyUmVmLCB7IHZhbHVlOiAxIH0pO1xuICAgICAgICAgIG5leHRJbmRleCA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dEluZGV4ID0gY291bnRlckRvYy5kYXRhKCkudmFsdWUgKyAxO1xuICAgICAgICAgIHRyYW5zYWN0aW9uLnVwZGF0ZShjb3VudGVyUmVmLCB7IHZhbHVlOiBuZXh0SW5kZXggfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBmb3JtYXR0ZWRJbmRleCA9IG5leHRJbmRleC50b1N0cmluZygpLnBhZFN0YXJ0KDQsICcwJyk7XG5cbiAgICAgIGF3YWl0IGFkZERvYyhjb2xsZWN0aW9uKGRiLCAnc3R1ZGVudHMnKSwgeyBcbiAgICAgICAgLi4ubmV3U3R1ZGVudCwgXG4gICAgICAgIHN0dWRlbnRJZDogZm9ybWF0dGVkSW5kZXgsXG4gICAgICAgIGluZGV4TnVtYmVyOiBmb3JtYXR0ZWRJbmRleCxcbiAgICAgICAgcmVnaXN0ZXJlZEF0OiBzZXJ2ZXJUaW1lc3RhbXAoKSxcbiAgICAgICAgcGF5bWVudHM6IHsgW2N1cnJlbnRNb250aF06IGZhbHNlIH0sXG4gICAgICAgIGhhc1NlZW5JZDogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgc2V0TmV3U3R1ZGVudCh7IG5hbWU6ICcnLCBlbWFpbDogJycsIGNsYXNzOiAnJywgd2hhdHNhcHA6ICcnLCBhZGRyZXNzOiAnJywgc3R1ZGVudElkOiAnJywgc2Nob29sOiAnJywgbmljOiAnJywgeWVhcklkOiAnJyB9KTtcbiAgICAgIGFsZXJ0KGBTdHVkZW50IHJlZ2lzdGVyZWQgd2l0aCBJbmRleDogJHtmb3JtYXR0ZWRJbmRleH1gKTtcbiAgICB9IGNhdGNoIChlcnIpIHsgaGFuZGxlRmlyZXN0b3JlRXJyb3IoZXJyLCBPcGVyYXRpb25UeXBlLkNSRUFURSwgJ3N0dWRlbnRzJyk7IH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVVcGRhdGVTdHVkZW50ID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghZWRpdGluZ1N0dWRlbnQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCwgdWlkLCAuLi5kYXRhIH0gPSBlZGl0aW5nU3R1ZGVudDtcbiAgICAgIGF3YWl0IHVwZGF0ZURvYyhkb2MoZGIsICdzdHVkZW50cycsIGlkKSwgZGF0YSk7XG4gICAgICBcbiAgICAgIC8vIEFsc28gdXBkYXRlIHVzZXIgcHJvZmlsZSBpZiBpdCBleGlzdHNcbiAgICAgIGlmICh1aWQpIHtcbiAgICAgICAgY29uc3QgdXNlclJlZiA9IGRvYyhkYiwgJ3VzZXJzJywgdWlkKTtcbiAgICAgICAgY29uc3QgdXNlckRvYyA9IGF3YWl0IGdldERvYyh1c2VyUmVmKTtcbiAgICAgICAgaWYgKHVzZXJEb2MuZXhpc3RzKCkpIHtcbiAgICAgICAgICBhd2FpdCB1cGRhdGVEb2ModXNlclJlZiwge1xuICAgICAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgICAgICAgeWVhcklkOiBkYXRhLnllYXJJZCB8fCAnJyxcbiAgICAgICAgICAgIGNsYXNzOiBkYXRhLmNsYXNzLFxuICAgICAgICAgICAgd2hhdHNhcHA6IGRhdGEud2hhdHNhcHAsXG4gICAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MsXG4gICAgICAgICAgICBzdHVkZW50SWQ6IGRhdGEuc3R1ZGVudElkLFxuICAgICAgICAgICAgaW5kZXhOdW1iZXI6IGRhdGEuaW5kZXhOdW1iZXIsXG4gICAgICAgICAgICBuaWM6IGRhdGEubmljLFxuICAgICAgICAgICAgc2Nob29sOiBkYXRhLnNjaG9vbFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNldEVkaXRpbmdTdHVkZW50KG51bGwpO1xuICAgICAgYWxlcnQoJ1N0dWRlbnQgcmVjb3JkIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5IScpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaGFuZGxlRmlyZXN0b3JlRXJyb3IoZXJyLCBPcGVyYXRpb25UeXBlLlVQREFURSwgJ3N0dWRlbnRzJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFkZEF1dGhBZG1pbiA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZG9jSWQgPSBuZXdBdXRoQWRtaW4uZW1haWwudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgICBpZiAoIWRvY0lkKSB0aHJvdyBuZXcgRXJyb3IoJ0VtYWlsIGlzIHJlcXVpcmVkJyk7XG4gICAgICBhd2FpdCBzZXREb2MoZG9jKGRiLCAnYXV0aG9yaXplZEFkbWlucycsIGRvY0lkKSwgeyBcbiAgICAgICAgLi4ubmV3QXV0aEFkbWluLCBcbiAgICAgICAgZW1haWw6IGRvY0lkLFxuICAgICAgICBpZDogZG9jSWQgXG4gICAgICB9KTtcbiAgICAgIHNldE5ld0F1dGhBZG1pbih7IGVtYWlsOiAnJywgcGFzc3dvcmQ6ICcnIH0pO1xuICAgICAgYWxlcnQoJ0FkbWluIGF1dGhvcml6ZWQgc3VjY2Vzc2Z1bGx5IScpO1xuICAgIH0gY2F0Y2ggKGVycikgeyBoYW5kbGVGaXJlc3RvcmVFcnJvcihlcnIsIE9wZXJhdGlvblR5cGUuQ1JFQVRFLCAnYXV0aG9yaXplZEFkbWlucycpOyB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQWRkUGFwZXJSZXN1bHQgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0SW5kZXggPSAobmV3UGFwZXJSZXN1bHQuc3R1ZGVudEluZGV4IHx8ICcnKS50cmltKCk7XG4gICAgaWYgKCF0YXJnZXRJbmRleCB8fCAhbmV3UGFwZXJSZXN1bHQueWVhcklkKSByZXR1cm47XG5cbiAgICAvLyBEdXBsaWNhdGUgY2hlY2tcbiAgICBjb25zdCBpc0R1cGxpY2F0ZSA9IHBhcGVyUmVzdWx0cy5zb21lKHIgPT4gXG4gICAgICByLnN0dWRlbnRJbmRleCA9PT0gdGFyZ2V0SW5kZXggJiYgXG4gICAgICByLnBhcGVyTnVtYmVyID09PSBuZXdQYXBlclJlc3VsdC5wYXBlck51bWJlciAmJiBcbiAgICAgIHIueWVhcklkID09PSBuZXdQYXBlclJlc3VsdC55ZWFySWRcbiAgICApO1xuXG4gICAgaWYgKGlzRHVwbGljYXRlKSB7XG4gICAgICBpZiAoIXdpbmRvdy5jb25maXJtKFwiV0FSTklORzogQSByZXN1bHQgYWxyZWFkeSBleGlzdHMgZm9yIHRoaXMgSW5kZXggYW5kIFBhcGVyLiBDb250aW51ZSBhbnl3YXk/XCIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3R1ZGVudCA9IHN0dWRlbnRzLmZpbmQocyA9PiBcbiAgICAgICAgKHMuc3R1ZGVudElkICYmIHMuc3R1ZGVudElkLnRyaW0oKSA9PT0gdGFyZ2V0SW5kZXgpIHx8IFxuICAgICAgICAocy5pbmRleE51bWJlciAmJiBzLmluZGV4TnVtYmVyLnRyaW0oKSA9PT0gdGFyZ2V0SW5kZXgpXG4gICAgICApO1xuICAgICAgY29uc3QgcmVzdWx0RGF0YSA9IHtcbiAgICAgICAgLi4ubmV3UGFwZXJSZXN1bHQsXG4gICAgICAgIHN0dWRlbnRJbmRleDogdGFyZ2V0SW5kZXgsXG4gICAgICAgIG1hcmtzOiBOdW1iZXIobmV3UGFwZXJSZXN1bHQubWFya3MpLFxuICAgICAgICB1aWQ6IHN0dWRlbnQ/LnVpZCB8fCBudWxsLFxuICAgICAgICBjcmVhdGVkQXQ6IHNlcnZlclRpbWVzdGFtcCgpXG4gICAgICB9O1xuICAgICAgaWYgKCFzdHVkZW50Py51aWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBTdHVkZW50IHdpdGggaW5kZXggJHt0YXJnZXRJbmRleH0gZG9lcyBub3QgaGF2ZSBhIGxpbmtlZCBVSUQuIFRoZSByZXN1bHQgbWF5IG5vdCBiZSB2aXNpYmxlIHVudGlsIHRoZXkgbG9nIGluLmApO1xuICAgICAgfVxuICAgICAgY29uc3QgZG9jUmVmID0gYXdhaXQgYWRkRG9jKGNvbGxlY3Rpb24oZGIsICdwYXBlclJlc3VsdHMnKSwgcmVzdWx0RGF0YSk7XG4gICAgICBcbiAgICAgIC8vIFJlY2FsY3VsYXRlIHJhbmtzIGZvciB0aGlzIHBhcGVyIGFuZCB5ZWFyXG4gICAgICBjb25zdCBwYXBlck51bSA9IG5ld1BhcGVyUmVzdWx0LnBhcGVyTnVtYmVyO1xuICAgICAgY29uc3QgeWVhcklkID0gbmV3UGFwZXJSZXN1bHQueWVhcklkO1xuICAgICAgY29uc3QgcmVzdWx0c0ZvclBhcGVyID0gcGFwZXJSZXN1bHRzLmZpbHRlcihyID0+IHIucGFwZXJOdW1iZXIgPT09IHBhcGVyTnVtICYmIHIueWVhcklkID09PSB5ZWFySWQpO1xuICAgICAgLy8gQWRkIHRoZSBuZXcgb25lIHRvIHRoZSBsaXN0IGZvciBzb3J0aW5nXG4gICAgICByZXN1bHRzRm9yUGFwZXIucHVzaCh7IC4uLnJlc3VsdERhdGEsIGlkOiBkb2NSZWYuaWQgfSBhcyBhbnkgYXMgUGFwZXJSZXN1bHQpO1xuICAgICAgXG4gICAgICBjb25zdCBzb3J0ZWQgPSBbLi4ucmVzdWx0c0ZvclBhcGVyXS5zb3J0KChhLCBiKSA9PiBiLm1hcmtzIC0gYS5tYXJrcyk7XG4gICAgICBcbiAgICAgIC8vIFVwZGF0ZSByYW5rcyBpbiBGaXJlc3RvcmVcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKHNvcnRlZC5tYXAoKHJlcywgaW5kZXgpID0+IFxuICAgICAgICB1cGRhdGVEb2MoZG9jKGRiLCAncGFwZXJSZXN1bHRzJywgcmVzLmlkKSwgeyByYW5rOiBpbmRleCArIDEgfSlcbiAgICAgICkpO1xuXG4gICAgICBzZXROZXdQYXBlclJlc3VsdCh7IC4uLm5ld1BhcGVyUmVzdWx0LCBzdHVkZW50SW5kZXg6ICcnLCBtYXJrczogMCB9KTtcbiAgICAgIGFsZXJ0KCdNYXJrcyBhZGRlZCBhbmQgcmFua3MgdXBkYXRlZCEnKTtcbiAgICB9IGNhdGNoIChlcnIpIHsgaGFuZGxlRmlyZXN0b3JlRXJyb3IoZXJyLCBPcGVyYXRpb25UeXBlLkNSRUFURSwgJ3BhcGVyUmVzdWx0cycpOyB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQWRkSG9tZVBvc3QgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGFkZERvYyhjb2xsZWN0aW9uKGRiLCAnaG9tZV9wb3N0cycpLCB7IFxuICAgICAgICAuLi5uZXdIb21lUG9zdCwgXG4gICAgICAgIGNyZWF0ZWRBdDogc2VydmVyVGltZXN0YW1wKCkgXG4gICAgICB9KTtcbiAgICAgIHNldE5ld0hvbWVQb3N0KHsgdGl0bGU6ICcnLCBkZXNjcmlwdGlvbjogJycsIGltYWdlVXJsOiAnJyB9KTtcbiAgICAgIGFsZXJ0KCdNb21lbnQgYWRkZWQgdG8gZ2FsbGVyeSBzdWNjZXNzZnVsbHkhJyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7IGhhbmRsZUZpcmVzdG9yZUVycm9yKGVyciwgT3BlcmF0aW9uVHlwZS5DUkVBVEUsICdob21lX3Bvc3RzJyk7IH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGRIb21lVmlkZW8gPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGFkZERvYyhjb2xsZWN0aW9uKGRiLCAnaG9tZV92aWRlb3MnKSwgeyBcbiAgICAgICAgLi4ubmV3SG9tZVZpZGVvLCBcbiAgICAgICAgY3JlYXRlZEF0OiBzZXJ2ZXJUaW1lc3RhbXAoKSBcbiAgICAgIH0pO1xuICAgICAgc2V0TmV3SG9tZVZpZGVvKHsgdGl0bGU6ICcnLCB2aWRlb1VybDogJycgfSk7XG4gICAgICBhbGVydCgnVmlkZW8gYWRkZWQgc3VjY2Vzc2Z1bGx5IScpO1xuICAgIH0gY2F0Y2ggKGVycikgeyBoYW5kbGVGaXJlc3RvcmVFcnJvcihlcnIsIE9wZXJhdGlvblR5cGUuQ1JFQVRFLCAnaG9tZV92aWRlb3MnKTsgfVxuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZVBheW1lbnQgPSBhc3luYyAoc3R1ZGVudElkOiBzdHJpbmcsIG1vbnRoOiBzdHJpbmcsIGN1cnJlbnRTdGF0dXM6IGJvb2xlYW4pID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdXBkYXRlRG9jKGRvYyhkYiwgJ3N0dWRlbnRzJywgc3R1ZGVudElkKSwge1xuICAgICAgICBbYHBheW1lbnRzLiR7bW9udGh9YF06ICFjdXJyZW50U3RhdHVzXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHsgaGFuZGxlRmlyZXN0b3JlRXJyb3IoZXJyLCBPcGVyYXRpb25UeXBlLlVQREFURSwgYHN0dWRlbnRzLyR7c3R1ZGVudElkfS9wYXltZW50c2ApOyB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gYXN5bmMgKHBhdGg6IHN0cmluZywgaWQ6IHN0cmluZykgPT4ge1xuICAgIGlmICghd2luZG93LmNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcmVjb3JkPyBUaGlzIGFjdGlvbiBjYW5ub3QgYmUgdW5kb25lLlwiKSkgcmV0dXJuO1xuICAgIFxuICAgIHRyeSB7XG4gICAgICAvLyBNYXAgUlREQiBwYXRocyB0byBGaXJlc3RvcmUgY29sbGVjdGlvbnNcbiAgICAgIGxldCBjb2xsZWN0aW9uTmFtZSA9IHBhdGg7XG4gICAgICBpZiAocGF0aCA9PT0gJ2hvbWUvcG9zdHMnKSBjb2xsZWN0aW9uTmFtZSA9ICdob21lX3Bvc3RzJztcbiAgICAgIGlmIChwYXRoID09PSAnaG9tZS92aWRlb3MnKSBjb2xsZWN0aW9uTmFtZSA9ICdob21lX3ZpZGVvcyc7XG5cbiAgICAgIGlmIChwYXRoID09PSAnc3R1ZGVudHMnKSB7XG4gICAgICAgIC8vIEZpbmQgdGhlIHN0dWRlbnQgdG8gZ2V0IHRoZWlyIHVpZFxuICAgICAgICBjb25zdCBzdHVkZW50ID0gc3R1ZGVudHMuZmluZChzID0+IHMuaWQgPT09IGlkKTtcbiAgICAgICAgaWYgKHN0dWRlbnQ/LnVpZCkge1xuICAgICAgICAgIGF3YWl0IGRlbGV0ZURvYyhkb2MoZGIsICd1c2VycycsIHN0dWRlbnQudWlkKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGF3YWl0IGRlbGV0ZURvYyhkb2MoZGIsIGNvbGxlY3Rpb25OYW1lLCBpZCkpO1xuICAgICAgYWxlcnQoXCJSZWNvcmQgZGVsZXRlZCBzdWNjZXNzZnVsbHkuXCIpO1xuICAgIH0gY2F0Y2ggKGVycikgeyBoYW5kbGVGaXJlc3RvcmVFcnJvcihlcnIsIE9wZXJhdGlvblR5cGUuREVMRVRFLCBgJHtwYXRofS8ke2lkfWApOyB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ29weVBhaWRFbWFpbHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcGFpZEVtYWlscyA9IHN0dWRlbnRzXG4gICAgICAuZmlsdGVyKHMgPT4gcy5wYXltZW50cz8uW2N1cnJlbnRNb250aF0pXG4gICAgICAubWFwKHMgPT4gcy5lbWFpbClcbiAgICAgIC5maWx0ZXIoZW1haWwgPT4gZW1haWwpIC8vIEVuc3VyZSBlbWFpbCBleGlzdHNcbiAgICAgIC5qb2luKCcsICcpO1xuICAgIFxuICAgIGlmIChwYWlkRW1haWxzKSB7XG4gICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChwYWlkRW1haWxzKTtcbiAgICAgIGFsZXJ0KGBTdWNjZXNzOiAke3BhaWRFbWFpbHMuc3BsaXQoJywnKS5sZW5ndGh9IGVtYWlscyBjb3BpZWQgdG8gY2xpcGJvYXJkIWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydCgnTm8gcGFpZCBzdHVkZW50cyBmb3VuZCBmb3IgdGhlIGN1cnJlbnQgbW9udGguJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFkZFllYXIgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghbmV3WWVhci55ZWFyLnRyaW0oKSkge1xuICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciBhIHZhbGlkIEFjYWRlbWljIFllYXIgbmFtZS5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGF3YWl0IGFkZERvYyhjb2xsZWN0aW9uKGRiLCAnYWNhZGVtaWNZZWFycycpLCB7IC4uLm5ld1llYXIsIGNyZWF0ZWRBdDogc2VydmVyVGltZXN0YW1wKCkgfSk7XG4gICAgICBzZXROZXdZZWFyKHsgeWVhcjogJycgfSk7XG4gICAgICBhbGVydChcIkFjYWRlbWljIFllYXIgY3JlYXRlZCBzdWNjZXNzZnVsbHkuIElmIHlvdSBzZWUgYSBwZXJtaXNzaW9uIGVycm9yLCBwbGVhc2UgZW5zdXJlIHlvdSBoYXZlIGRlcGxveWVkIHRoZSBmaXJlc3RvcmUucnVsZXMgYXMgZGVzY3JpYmVkLlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHsgaGFuZGxlRmlyZXN0b3JlRXJyb3IoZXJyLCBPcGVyYXRpb25UeXBlLkNSRUFURSwgJ2FjYWRlbWljWWVhcnMnKTsgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFkZFJlY29yZGluZyA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFuZXdSZWNvcmRpbmcueWVhcklkKSB7XG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIHNlbGVjdCBhIFllYXIgZmlyc3QuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhd2FpdCBhZGREb2MoY29sbGVjdGlvbihkYiwgJ3JlY29yZGluZ3MnKSwgeyAuLi5uZXdSZWNvcmRpbmcsIGNyZWF0ZWRBdDogc2VydmVyVGltZXN0YW1wKCkgfSk7XG4gICAgICBzZXROZXdSZWNvcmRpbmcoeyBcbiAgICAgICAgdGl0bGU6ICcnLCBcbiAgICAgICAgdmlkZW9Vcmw6ICcnLCBcbiAgICAgICAgdmlzaWJpbGl0eTogJ3ByaXZhdGUnLCBcbiAgICAgICAgbWF4Vmlld3M6IDIsIFxuICAgICAgICB5ZWFySWQ6ICcnLCBcbiAgICAgICAgcHVibGlzaERhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLFxuICAgICAgICBpc1NhZmVab25lOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGFsZXJ0KFwiUmVjb3JkaW5nIGFkZGVkIHN1Y2Nlc3NmdWxseSFcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7IGhhbmRsZUZpcmVzdG9yZUVycm9yKGVyciwgT3BlcmF0aW9uVHlwZS5DUkVBVEUsICdyZWNvcmRpbmdzJyk7IH1cbiAgfTtcblxuICBjb25zdCByZW5kZXJBY2FkZW1pY1llYXJzID0gKCkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xMlwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBwLTEyIHJvdW5kZWQtWzQwcHhdIHNoYWRvdy1zbVwiPlxuICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBtYi0xMCB0ZXh0LXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCB1cHBlcmNhc2UgaXRhbGljIHRyYWNraW5nLXRpZ2h0ZXJcIj5cbiAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwidy03IGgtNyB0ZXh0LXByaW1hcnkvNDBcIiAvPiBNYW5hZ2UgQWNhZGVtaWMgWWVhcnNcbiAgICAgICAgPC9oMz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy1bMC4zZW1dIHB4LTEgaXRhbGljXCI+QWNhZGVtaWMgWWVhciBOYW1lPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIDIwMjYgLyAyMDI3XCIgXG4gICAgICAgICAgICAgIHZhbHVlPXtuZXdZZWFyLnllYXJ9IFxuICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXROZXdZZWFyKHsuLi5uZXdZZWFyLCB5ZWFyOiBlLnRhcmdldC52YWx1ZX0pfSBcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsIHB4LTYgcHktNSB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciBwbGFjZWhvbGRlcjp0ZXh0LXNsYXRlLTMwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvMzAgdHJhbnNpdGlvbi1hbGxcIiBcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWVuZFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVBZGRZZWFyfSBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctcHJpbWFyeSB0ZXh0LXdoaXRlIGZvbnQtYmxhY2sgdXBwZXJjYXNlIGl0YWxpYyB0cmFja2luZy1bMC4yZW1dIHB5LTUgcm91bmRlZC0yeGwgaG92ZXI6c2NhbGUtMTA1IGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCB0ZXh0LXNtIHNoYWRvdy0yeGwgc2hhZG93LXByaW1hcnkvMjBcIj5cbiAgICAgICAgICAgICAgQ1JFQVRFIFlFQVJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHNoYWRvdy1zbSByb3VuZGVkLVs0MHB4XSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwiYmctc2xhdGUtNTAgdGV4dC1bMTBweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctWzAuM2VtXSB0ZXh0LXNsYXRlLTQwMCBpdGFsaWMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHgtMTAgcHktNlwiPllFQVJfSURFTlRJRklFUjwvdGg+XG4gICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweC0xMCBweS02IHRleHQtcmlnaHRcIj5QUk9UT0NPTFM8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICB7YWNhZGVtaWNZZWFycy5zb3J0KChhLCBiKSA9PiBiLnllYXIubG9jYWxlQ29tcGFyZShhLnllYXIpKS5tYXAoeSA9PiAoXG4gICAgICAgICAgICAgIDx0ciBrZXk9e3kuaWR9IGNsYXNzTmFtZT1cImhvdmVyOmJnLXNsYXRlLTUwLzUwIHRyYW5zaXRpb24tY29sb3JzIGdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB4LTEwIHB5LTggdGV4dC1zbSBmb250LWJsYWNrIHRleHQtc2xhdGUtOTAwIHVwcGVyY2FzZSB0cmFja2luZy10aWdodCBpdGFsaWNcIj57eS55ZWFyfTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB4LTEwIHB5LTggdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVEZWxldGUoJ2FjYWRlbWljWWVhcnMnLCB5LmlkKX0gY2xhc3NOYW1lPVwicC00IGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtcmVkLTUwMCBob3ZlcjpiZy1yZWQtNTAgdHJhbnNpdGlvbi1hbGwgZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICBjb25zdCByZW5kZXJSZWNvcmRpbmdzID0gKCkgPT4ge1xuICAgIGNvbnN0IGZpbHRlcmVkUmVjb3JkaW5ncyA9IHJlY29yZGluZ3MuZmlsdGVyKHIgPT4gc2VsZWN0ZWRSZWNvcmRpbmdZZWFyID09PSAnYWxsJyB8fCByLnllYXJJZCA9PT0gc2VsZWN0ZWRSZWNvcmRpbmdZZWFyKTtcbiAgICBcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcC0xMiByb3VuZGVkLVs0MHB4XSBzaGFkb3ctc21cIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBtYi0xMCB0ZXh0LXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCB1cHBlcmNhc2UgaXRhbGljIHRyYWNraW5nLXRpZ2h0ZXJcIj5cbiAgICAgICAgICAgIDxQbHVzIGNsYXNzTmFtZT1cInctNyBoLTcgdGV4dC1wcmltYXJ5LzQwXCIgLz4gQWRkIE5ldyBSZWNvcmRpbmdcbiAgICAgICAgICA8L2gzPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMSBpdGFsaWNcIj5SZWNvcmRpbmcgSGVhZGxpbmU8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlJlY29yZGluZyBUaXRsZVwiIFxuICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdSZWNvcmRpbmcudGl0bGV9IFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld1JlY29yZGluZyh7Li4ubmV3UmVjb3JkaW5nLCB0aXRsZTogZS50YXJnZXQudmFsdWV9KX0gXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsIHB4LTYgcHktNSB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciBwbGFjZWhvbGRlcjp0ZXh0LXNsYXRlLTMwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvMzAgdHJhbnNpdGlvbi1hbGxcIiBcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMSBpdGFsaWNcIj5UYXJnZXQgQmF0Y2ggKFllYXIpPC9sYWJlbD5cbiAgICAgICAgICAgICAgPHNlbGVjdCBcbiAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UmVjb3JkaW5nLnllYXJJZH0gXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0TmV3UmVjb3JkaW5nKHsuLi5uZXdSZWNvcmRpbmcsIHllYXJJZDogZS50YXJnZXQudmFsdWV9KX0gXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsIHB4LTYgcHktNSB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXhzIGZvbnQtYm9sZCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvMzAgdHJhbnNpdGlvbi1hbGwgYXBwZWFyYW5jZS1ub25lIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgWWVhcjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIHthY2FkZW1pY1llYXJzLm1hcCh5ID0+IDxvcHRpb24ga2V5PXt5LmlkfSB2YWx1ZT17eS5pZH0+e3kueWVhcn08L29wdGlvbj4pfVxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMSBpdGFsaWNcIj5QdWJsaXNoIERhdGU8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgdHlwZT1cImRhdGVcIiBcbiAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UmVjb3JkaW5nLnB1Ymxpc2hEYXRlfSBcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXROZXdSZWNvcmRpbmcoey4uLm5ld1JlY29yZGluZywgcHVibGlzaERhdGU6IGUudGFyZ2V0LnZhbHVlfSl9IFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC02IHB5LTUgdGV4dC1zbGF0ZS05MDAgdGV4dC14cyBmb250LWJvbGQgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzMwIHRyYW5zaXRpb24tYWxsXCIgXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tMiBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMSBpdGFsaWNcIj5WaWRlbyBUcmFuc21pc3Npb24gUHJvdG9jb2wgKFVSTCk8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlZpZGVvIExpbmtcIiBcbiAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UmVjb3JkaW5nLnZpZGVvVXJsfSBcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXROZXdSZWNvcmRpbmcoey4uLm5ld1JlY29yZGluZywgdmlkZW9Vcmw6IGUudGFyZ2V0LnZhbHVlfSl9IFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC02IHB5LTUgdGV4dC1zbGF0ZS05MDAgdGV4dC14cyBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHJpbWFyeS8zMCB0cmFuc2l0aW9uLWFsbFwiIFxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIGZvbnQtYmxhY2sgdHJhY2tpbmctWzAuM2VtXSBweC0xIGl0YWxpY1wiPlByaXZhY3kgJiBVWCBUb2dnbGVzPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC00XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtMSBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE5ld1JlY29yZGluZyh7Li4ubmV3UmVjb3JkaW5nLCB2aXNpYmlsaXR5OiAncHJpdmF0ZSd9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC0xIHB5LTQgcm91bmRlZC0yeGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCAke25ld1JlY29yZGluZy52aXNpYmlsaXR5ID09PSAncHJpdmF0ZScgPyAnYmctcHJpbWFyeSB0ZXh0LXdoaXRlIGJvcmRlci1wcmltYXJ5IHNoYWRvdy14bCBzaGFkb3ctcHJpbWFyeS8yMCcgOiAnYmctc2xhdGUtNTAgdGV4dC1zbGF0ZS00MDAgYm9yZGVyLXNsYXRlLTIwMCd9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgU0VDVVJFXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXROZXdSZWNvcmRpbmcoey4uLm5ld1JlY29yZGluZywgdmlzaWJpbGl0eTogJ3VubGlzdGVkJyBhcyBjb25zdH0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4LTEgcHktNCByb3VuZGVkLTJ4bCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgdGV4dC1bMTBweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0ICR7KG5ld1JlY29yZGluZy52aXNpYmlsaXR5IGFzIHN0cmluZykgPT09ICd1bmxpc3RlZCcgPyAnYmctcHJpbWFyeSB0ZXh0LXdoaXRlIGJvcmRlci1wcmltYXJ5IHNoYWRvdy14bCBzaGFkb3ctcHJpbWFyeS8yMCcgOiAnYmctc2xhdGUtNTAgdGV4dC1zbGF0ZS00MDAgYm9yZGVyLXNsYXRlLTIwMCd9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgR1VFU1RcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE5ld1JlY29yZGluZyh7Li4ubmV3UmVjb3JkaW5nLCBpc1NhZmVab25lOiAhbmV3UmVjb3JkaW5nLmlzU2FmZVpvbmV9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTYgcm91bmRlZC0yeGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yICR7bmV3UmVjb3JkaW5nLmlzU2FmZVpvbmUgPyAnYmctc2xhdGUtOTAwIHRleHQtd2hpdGUgYm9yZGVyLXNsYXRlLTkwMCBzaGFkb3cteGwgc2hhZG93LXNsYXRlLTkwMC8yMCcgOiAnYmctc2xhdGUtNTAgdGV4dC1zbGF0ZS00MDAgYm9yZGVyLXNsYXRlLTIwMCd9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPXtgdy00IGgtNCAke25ld1JlY29yZGluZy5pc1NhZmVab25lID8gJ3RleHQtcHJpbWFyeScgOiAndGV4dC1zbGF0ZS0zMDAnfWB9IC8+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3RcIj5TQUZFX1pPTkU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVBZGRSZWNvcmRpbmd9IGNsYXNzTmFtZT1cIm10LTEwIGJnLXByaW1hcnkgdGV4dC13aGl0ZSBmb250LWJsYWNrIHVwcGVyY2FzZSBpdGFsaWMgdHJhY2tpbmctWzAuMmVtXSBweC0xMCBweS01IHJvdW5kZWQtMnhsIGhvdmVyOnNjYWxlLTEwNSBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgdGV4dC1zbSBzaGFkb3ctMnhsIHNoYWRvdy1wcmltYXJ5LzIwXCI+XG4gICAgICAgICAgICBERVBMT1kgUkVDT1JESU5HXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBZZWFyIEZpbHRlciBTbGlkZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcC04IHJvdW5kZWQtWzM1cHhdIHNoYWRvdy1zbSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNiBvdmVyZmxvdy14LWF1dG8gY3VzdG9tLXNjcm9sbGJhciBuby1zY3JvbGxiYXIgc2Nyb2xsLXNtb290aFwiPlxuICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFJlY29yZGluZ1llYXIoJ2FsbCcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgc2hyaW5rLTAgcHgtOCBweS0zIHJvdW5kZWQtMnhsIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCB0cmFuc2l0aW9uLWFsbCAke3NlbGVjdGVkUmVjb3JkaW5nWWVhciA9PT0gJ2FsbCcgPyAnYmctcHJpbWFyeSB0ZXh0LXdoaXRlIHNoYWRvdy14bCBzaGFkb3ctcHJpbWFyeS8yMCcgOiAnYmctc2xhdGUtNTAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6Ymctc2xhdGUtMTAwJ31gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIEFMTF9SRUNPUkRTXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAge2FjYWRlbWljWWVhcnMuc29ydCgoYSwgYikgPT4gYi55ZWFyLmxvY2FsZUNvbXBhcmUoYS55ZWFyKSkubWFwKHkgPT4gKFxuICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAga2V5PXt5LmlkfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFJlY29yZGluZ1llYXIoeS5pZCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHNocmluay0wIHB4LTggcHktMyByb3VuZGVkLTJ4bCB0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgdHJhbnNpdGlvbi1hbGwgJHtzZWxlY3RlZFJlY29yZGluZ1llYXIgPT09IHkuaWQgPyAnYmctcHJpbWFyeSB0ZXh0LXdoaXRlIHNoYWRvdy14bCBzaGFkb3ctcHJpbWFyeS8yMCcgOiAnYmctc2xhdGUtNTAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6Ymctc2xhdGUtMTAwJ31gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBCQVRDSF97eS55ZWFyfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtOFwiPlxuICAgICAgICAgIHtmaWx0ZXJlZFJlY29yZGluZ3Muc29ydCgoYSwgYikgPT4gYi5wdWJsaXNoRGF0ZS5sb2NhbGVDb21wYXJlKGEucHVibGlzaERhdGUpKS5tYXAocmVjID0+IChcbiAgICAgICAgICAgIDxkaXYga2V5PXtyZWMuaWR9IGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtWzMycHhdIG92ZXJmbG93LWhpZGRlbiBncm91cCBob3Zlcjpib3JkZXItcHJpbWFyeS8zMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAgc2hhZG93LXNtIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC04XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1zdGFydCBtYi02XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTIgaC0xMiBiZy1wcmltYXJ5LzUgcm91bmRlZC0yeGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYm9yZGVyIGJvcmRlci1wcmltYXJ5LzEwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxQbGF5IGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1wcmltYXJ5XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVEZWxldGUoJ3JlY29yZGluZ3MnLCByZWMuaWQpfSBjbGFzc05hbWU9XCJwLTMgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXJlZC01MDAgdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYmxhY2sgdGV4dC1zbGF0ZS05MDAgdXBwZXJjYXNlIGl0YWxpYyB0cmFja2luZy10aWdodGVyIG1iLTIgZ3JvdXAtaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb24tY29sb3JzXCI+e3JlYy50aXRsZX08L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTIgbWItNlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMyBweS0xIGJnLXNsYXRlLTUwIHRleHQtc2xhdGUtNDAwIHRleHQtWzhweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAge3JlYy5wdWJsaXNoRGF0ZX1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTMgcHktMSB0ZXh0LXdoaXRlIHRleHQtWzhweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHJvdW5kZWQtbGcgJHtyZWMudmlzaWJpbGl0eSA9PT0gJ3ByaXZhdGUnID8gJ2JnLXJlZC01MDAnIDogJ2JnLXNsYXRlLTkwMCd9YH0+XG4gICAgICAgICAgICAgICAgICAgIHtyZWMudmlzaWJpbGl0eX1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRMZXNzb24oeyBpZDogcmVjLmlkLCB0b3BpYzogcmVjLnRpdGxlLCBzdWJUb3BpYzogJ1JlY29yZGluZycsIHZpZGVvVXJsOiByZWMudmlkZW9VcmwsIHZpZGVvVHlwZTogJ3lvdXR1YmUnLCB2aXNpYmlsaXR5OiByZWMudmlzaWJpbGl0eSwgY3JlYXRlZEF0OiByZWMuY3JlYXRlZEF0LCBtYXhWaWV3czogcmVjLm1heFZpZXdzIH0gYXMgTGVzc29uKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS00IGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMTAwIHJvdW5kZWQtMnhsIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS02MDAgaG92ZXI6dGV4dC1wcmltYXJ5IGhvdmVyOmJvcmRlci1wcmltYXJ5LzIwIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBQUkVWSUVXIFNUUkVBTSAmcmFycjtcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKX1cbiAgICAgICAgICB7ZmlsdGVyZWRSZWNvcmRpbmdzLmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTMgcHktMjAgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgIDxMYXllcnMgY2xhc3NOYW1lPVwidy0xNiBoLTE2IHRleHQtc2xhdGUtMTAwIG1iLTZcIiAvPlxuICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDAgZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRleHQtWzEwcHhdXCI+Tm8gcmVjb3JkaW5ncyBmb3VuZCBmb3IgdGhpcyBwYXJ0aXRpb24uPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlck92ZXJ2aWV3ID0gKCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkWWVhciA9IGFjYWRlbWljWWVhcnMuZmluZCh5ID0+IHkuaWQgPT09IG92ZXJ2aWV3QmF0Y2hJZCk7XG4gICAgY29uc3QgYmF0Y2hSZXN1bHRzID0gb3ZlcnZpZXdCYXRjaElkID09PSAnYWxsJyA/IHBhcGVyUmVzdWx0cyA6IHBhcGVyUmVzdWx0cy5maWx0ZXIociA9PiByLnllYXJJZCA9PT0gb3ZlcnZpZXdCYXRjaElkKTtcbiAgICBcbiAgICAvLyBGaW5kIGxhdGVzdCBwYXBlciBmb3IgdGhpcyBzcGVjaWZpYyBiYXRjaFxuICAgIGNvbnN0IGJhdGNoUGFwZXJOdW1iZXJzID0gQXJyYXkuZnJvbShuZXcgU2V0KGJhdGNoUmVzdWx0cy5tYXAociA9PiByLnBhcGVyTnVtYmVyKSkpO1xuICAgIGNvbnN0IGxhdGVzdFBhcGVyTnVtID0gYmF0Y2hQYXBlck51bWJlcnMubGVuZ3RoID4gMCA/IE1hdGgubWF4KC4uLihiYXRjaFBhcGVyTnVtYmVycyBhcyBudW1iZXJbXSkpIDogbnVsbDtcbiAgICBcbiAgICBjb25zdCBsYXRlc3RQYXBlclJlc3VsdHMgPSBsYXRlc3RQYXBlck51bSAhPT0gbnVsbCBcbiAgICAgID8gYmF0Y2hSZXN1bHRzLmZpbHRlcihyID0+IHIucGFwZXJOdW1iZXIgPT09IGxhdGVzdFBhcGVyTnVtKS5zb3J0KChhLCBiKSA9PiBiLm1hcmtzIC0gYS5tYXJrcylcbiAgICAgIDogW107XG4gICAgXG4gICAgY29uc3QgdG9wU2NvcmVyID0gbGF0ZXN0UGFwZXJSZXN1bHRzWzBdO1xuICAgIGNvbnN0IHRvcDEwID0gbGF0ZXN0UGFwZXJSZXN1bHRzLnNsaWNlKDAsIDEwKTtcblxuICAgIC8vIEFsbC10aW1lIGNoYW1waW9ucyAoaGlnaGVzdCBtYXJrcyBldmVyIG9idGFpbmVkIGluIGFueSBwYXBlciBmb3IgdGhpcyBiYXRjaClcbiAgICBjb25zdCBzdHVkZW50QmVzdE1hcmtzID0gYmF0Y2hSZXN1bHRzLnJlZHVjZSgoYWNjLCByZXMpID0+IHtcbiAgICAgIGlmICghYWNjW3Jlcy5zdHVkZW50SW5kZXhdIHx8IHJlcy5tYXJrcyA+IGFjY1tyZXMuc3R1ZGVudEluZGV4XS5tYXJrcykge1xuICAgICAgICBhY2NbcmVzLnN0dWRlbnRJbmRleF0gPSByZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9IGFzIFJlY29yZDxzdHJpbmcsIFBhcGVyUmVzdWx0Pik7XG5cbiAgICBjb25zdCBiYXRjaENoYW1waW9ucyA9IChPYmplY3QudmFsdWVzKHN0dWRlbnRCZXN0TWFya3MpIGFzIFBhcGVyUmVzdWx0W10pLnNvcnQoKGEsIGIpID0+IGIubWFya3MgLSBhLm1hcmtzKS5zbGljZSgwLCAxMCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEyIHBiLTI0XCI+XG4gICAgICAgIHsvKiBDb3JlIFN0YXRzIE92ZXJ2aWV3ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTMgZ2FwLThcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzIHAtMTAgcm91bmRlZC1bNDBweF0gcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuIGdyb3VwIGhvdmVyOmJvcmRlci1wcmltYXJ5LzIwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTUwMCBiZy13aGl0ZSBzaGFkb3cteGwgc2hhZG93LXNsYXRlLTIwMC81MFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNiBtYi02IHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTE2IGgtMTYgYmctcHJpbWFyeS81IHJvdW5kZWQtMnhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJvcmRlciBib3JkZXItcHJpbWFyeS8xMCBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm1cIj5cbiAgICAgICAgICAgICAgICA8VXNlcnMgY2xhc3NOYW1lPVwidy04IGgtOCB0ZXh0LXByaW1hcnlcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy1bMC4zZW1dIG1iLTFcIj57dCgnZGFzaC5hZG1pbi50b3RhbFN0dWRlbnRzJyl9PC9wPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LTV4bCBmb250LWJsYWNrIHRleHQtc2xhdGUtOTAwIGl0YWxpYyB0cmFja2luZy10aWdodGVyXCI+e3N0dWRlbnRzLmxlbmd0aH08L2gzPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcyBwLTEwIHJvdW5kZWQtWzQwcHhdIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBncm91cCBob3Zlcjpib3JkZXItcHJpbWFyeS8yMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAgYmctd2hpdGUgc2hhZG93LXhsIHNoYWRvdy1zbGF0ZS0yMDAvNTBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTYgbWItNiByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xNiBoLTE2IGJnLXByaW1hcnkvNSByb3VuZGVkLTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBib3JkZXIgYm9yZGVyLXByaW1hcnkvMTAgZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtXCI+XG4gICAgICAgICAgICAgICAgPEJvb2tPcGVuIGNsYXNzTmFtZT1cInctOCBoLTggdGV4dC1wcmltYXJ5XCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYmxhY2sgdHJhY2tpbmctWzAuM2VtXSBtYi0xXCI+e3QoJ2Rhc2guYWRtaW4uc3R1ZHlQYWNrcycpfTwvcD5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC01eGwgZm9udC1ibGFjayB0ZXh0LXNsYXRlLTkwMCBpdGFsaWMgdHJhY2tpbmctdGlnaHRlclwiPntsZXNzb25zLmxlbmd0aH08L2gzPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcyBwLTEwIHJvdW5kZWQtWzQwcHhdIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBncm91cCBob3Zlcjpib3JkZXItcHJpbWFyeS8yMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAgYmctd2hpdGUgc2hhZG93LXhsIHNoYWRvdy1zbGF0ZS0yMDAvNTBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTYgbWItNiByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xNiBoLTE2IGJnLXByaW1hcnkvNSByb3VuZGVkLTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBib3JkZXIgYm9yZGVyLXByaW1hcnkvMTAgZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtXCI+XG4gICAgICAgICAgICAgICAgPFZpZGVvIGNsYXNzTmFtZT1cInctOCBoLTggdGV4dC1wcmltYXJ5XCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYmxhY2sgdHJhY2tpbmctWzAuM2VtXSBtYi0xXCI+e3QoJ2Rhc2guYWRtaW4ubGl2ZUNsYXNzZXMnKX08L3A+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtNXhsIGZvbnQtYmxhY2sgdGV4dC1zbGF0ZS05MDAgaXRhbGljIHRyYWNraW5nLXRpZ2h0ZXJcIj57b25saW5lQ2xhc3Nlcy5sZW5ndGh9PC9oMz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEJhdGNoIFNlbGVjdG9yIFRhYnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcC0zIHJvdW5kZWQtWzMwcHhdIHNoYWRvdy1zbSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBvdmVyZmxvdy14LWF1dG8gbm8tc2Nyb2xsYmFyIG1heC13LWZpdCBteC1hdXRvXCI+XG4gICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE92ZXJ2aWV3QmF0Y2hJZCgnYWxsJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC04IHB5LTQgcm91bmRlZC0yeGwgdGV4dC1bMTBweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRyYW5zaXRpb24tYWxsICR7b3ZlcnZpZXdCYXRjaElkID09PSAnYWxsJyA/ICdiZy1wcmltYXJ5IHRleHQtd2hpdGUgc2hhZG93LWxnJyA6ICdiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTQwMCBob3ZlcjpiZy1zbGF0ZS01MCd9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBBbGwgQW5hbHl0aWNzXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAge2FjYWRlbWljWWVhcnMuc29ydCgoYSwgYikgPT4gYi55ZWFyLmxvY2FsZUNvbXBhcmUoYS55ZWFyKSkubWFwKHkgPT4gKFxuICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAga2V5PXt5LmlkfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRPdmVydmlld0JhdGNoSWQoeS5pZCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTggcHktNCByb3VuZGVkLTJ4bCB0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgdHJhbnNpdGlvbi1hbGwgd2hpdGVzcGFjZS1ub3dyYXAgJHtvdmVydmlld0JhdGNoSWQgPT09IHkuaWQgPyAnYmctcHJpbWFyeSB0ZXh0LXdoaXRlIHNoYWRvdy1sZycgOiAnYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS00MDAgaG92ZXI6Ymctc2xhdGUtNTAnfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIEJhdGNoIHt5LnllYXJ9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIER5bmFtaWMgQW5hbHl0aWNzIEdyaWQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLThcIj5cbiAgICAgICAgICB7LyogTGF0ZXN0IEV4YW0gU3BvdGxpZ2h0ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tOCBzcGFjZS15LThcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIHJvdW5kZWQtWzUwcHhdIHAtMTIgdGV4dC13aGl0ZSByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gZ3JvdXBcIj5cbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCBwLTE2IG9wYWNpdHktMTAgcG9pbnRlci1ldmVudHMtbm9uZSByb3RhdGUtMTIgZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTEwMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxUcmVuZGluZ1VwIGNsYXNzTmFtZT1cInctNjQgaC02NFwiIC8+XG4gICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgbWItOFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC01IHB5LTIgYmctcHJpbWFyeSB0ZXh0LXdoaXRlIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCByb3VuZGVkLWZ1bGxcIj5MYXRlc3QgRXZvbHV0aW9uPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVzdCB0ZXh0LVsxMHB4XSB1cHBlcmNhc2VcIj5QYXBlcl97bGF0ZXN0UGFwZXJOdW0gfHwgJ04vQSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICB7dG9wU2NvcmVyID8gKFxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS04XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQteHMgZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctWzAuM2VtXSBtYi0yIGl0YWxpY1wiPkN1cnJlbnQgUGVhayBQZXJmb3JtZXI8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC02eGwgbWQ6dGV4dC04eGwgZm9udC1ibGFjayBpdGFsaWMgdHJhY2tpbmctdGlnaHRlciB1cHBlcmNhc2UgbGVhZGluZy1ub25lIHRydW5jYXRlIG1heC13LWZ1bGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzdHVkZW50cy5maW5kKHMgPT4gcy5zdHVkZW50SWQgPT09IHRvcFNjb3Jlci5zdHVkZW50SW5kZXgpPy5uYW1lIHx8IGBJTkRFWF8ke3RvcFNjb3Jlci5zdHVkZW50SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBtYi0xXCI+QUdHUkVHQVRFX01BUks8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1ibGFjayB0ZXh0LXByaW1hcnkgaXRhbGljXCI+JXt0b3BTY29yZXIubWFya3N9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1bMXB4XSBoLTEyIGJnLXNsYXRlLTgwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgbWItMVwiPkNBTkRJREFURV9JRDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBmb250LWJsYWNrIHRleHQtd2hpdGUgZm9udC1tb25vIHRyYWNraW5nLXRpZ2h0ZXJcIj57dG9wU2NvcmVyLnN0dWRlbnRJbmRleH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweS0yMCB0ZXh0LWNlbnRlciBvcGFjaXR5LTIwIGl0YWxpYyBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yZW1dXCI+VHJhbnNtaXNzaW9uIE51bGw6IFdhaXRpbmcgZm9yIHNlcXVlbmNlIHN5bmM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBMYXRlc3QgUGFwZXIgTGVhZGVyYm9hcmQgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtWzUwcHhdIHAtMTIgc2hhZG93LXhsIHNoYWRvdy1zbGF0ZS0yMDAvMzBcIj5cbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTEyXCI+XG4gICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBpdGFsaWMgdHJhY2tpbmctdGlnaHRlciB1cHBlcmNhc2UgdGV4dC1zbGF0ZS05MDAgYm9yZGVyLWwtNCBib3JkZXItcHJpbWFyeSBwbC02XCI+XG4gICAgICAgICAgICAgICAgICAgIFRvcCAxMDogUGFwZXIge2xhdGVzdFBhcGVyTnVtfVxuICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdGV4dC1zbGF0ZS00MDAgdHJhY2tpbmctd2lkZXN0IHVwcGVyY2FzZVwiPkJhdGNoIHtzZWxlY3RlZFllYXI/LnllYXIgfHwgJ0dsb2JhbCd9PC9wPlxuICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICAgICAgICB7dG9wMTAubWFwKChyZXMsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e3Jlcy5pZH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtNiBiZy1zbGF0ZS01MCByb3VuZGVkLTN4bCBncm91cCBob3ZlcjpiZy1wcmltYXJ5IHRyYW5zaXRpb24tYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdy0xMCBoLTEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQteGwgZm9udC1ibGFjayBpdGFsaWMgJHtpID09PSAwID8gJ2JnLXByaW1hcnkgdGV4dC13aGl0ZSBzaGFkb3ctbGcgc2hhZG93LXByaW1hcnkvMzAnIDogJ2JnLXdoaXRlIHRleHQtc2xhdGUtNDAwIGdyb3VwLWhvdmVyOmJnLXdoaXRlLzIwIGdyb3VwLWhvdmVyOnRleHQtd2hpdGUnfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICN7aSArIDF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJsYWNrIHRleHQtc2xhdGUtOTAwIHVwcGVyY2FzZSBncm91cC1ob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzXCI+e3N0dWRlbnRzLmZpbmQocyA9PiBzLnN0dWRlbnRJZCA9PT0gcmVzLnN0dWRlbnRJbmRleCk/Lm5hbWUgfHwgYFNUVURFTlRfJHtyZXMuc3R1ZGVudEluZGV4fWB9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBncm91cC1ob3Zlcjp0ZXh0LXdoaXRlLzYwXCI+SUQ6IHtyZXMuc3R1ZGVudEluZGV4fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJsYWNrIGl0YWxpYyB0ZXh0LXByaW1hcnkgZ3JvdXAtaG92ZXI6dGV4dC13aGl0ZSBsZWFkaW5nLW5vbmVcIj4le3Jlcy5tYXJrc308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAge3RvcDEwLmxlbmd0aCA9PT0gMCAmJiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBweS0yMCB0ZXh0LXhzIGZvbnQtYmxhY2sgdGV4dC1zbGF0ZS0zMDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBpdGFsaWMgYW5pbWF0ZS1wdWxzZVwiPlNjYW5uaW5nIGRhdGFiYXNlIGZvciByZXN1bHRzLi4uPC9wPn1cbiAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQWxsLVRpbWUgQ2hhbXBpb25zIFBlciBCYXRjaCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTQgc3BhY2UteS04XCI+XG4gICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLVs1MHB4XSBwLTEwIHNoYWRvdy14bCBvdmVyZmxvdy1oaWRkZW4gcmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC00IG1iLTEwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0xMDAgcGItOFwiPlxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMiBoLTEyIGJnLXByaW1hcnkgcm91bmRlZC0yeGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC13aGl0ZSBzaGFkb3ctbGcgc2hhZG93LXByaW1hcnkvMjBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8VHJvcGh5IGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPlxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ibGFjayB1cHBlcmNhc2UgaXRhbGljIHRyYWNraW5nLXRpZ2h0ZXIgdGV4dC1zbGF0ZS05MDAgbGVhZGluZy10aWdodFwiPkJhdGNoIENoYW1waW9uczwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0XCI+QWxsLVRpbWUgUGVhayBSZWNvcmRzPC9wPlxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgICAgICAgICAgICAgICB7YmF0Y2hDaGFtcGlvbnMubWFwKChyZXM6IFBhcGVyUmVzdWx0LCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17cmVzLmlkfSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNSBncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHctMTAgaC0xMCByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQteHMgZm9udC1ibGFjayAke2kgPCAzID8gJ2JnLXByaW1hcnkvMTAgdGV4dC1wcmltYXJ5IGJvcmRlciBib3JkZXItcHJpbWFyeS8yMCcgOiAnYmctc2xhdGUtNTAgdGV4dC1zbGF0ZS0zMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS0xMDAnfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aSArIDF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aSA9PT0gMCAmJiA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMSAtcmlnaHQtMSB3LTMgaC0zIGJnLXJlZC01MDAgcm91bmRlZC1mdWxsIGJvcmRlci0yIGJvcmRlci13aGl0ZSBhbmltYXRlLXBpbmdcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdGV4dC1zbGF0ZS05MDAgdHJ1bmNhdGUgdHJhY2tpbmctdGlnaHRcIj57c3R1ZGVudHMuZmluZChzID0+IHMuc3R1ZGVudElkID09PSByZXMuc3R1ZGVudEluZGV4KT8ubmFtZSB8fCBgSURfJHtyZXMuc3R1ZGVudEluZGV4fWB9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bOHB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgdGV4dC1wcmltYXJ5LzYwIGl0YWxpY1wiPlBhcGVyIHtyZXMucGFwZXJOdW1iZXJ9IFBlYWs8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJsYWNrIGl0YWxpYyB0ZXh0LXNsYXRlLTkwMFwiPiV7cmVzLm1hcmtzfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAge2JhdGNoQ2hhbXBpb25zLmxlbmd0aCA9PT0gMCAmJiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBweS0yMCB0ZXh0LXhzIGZvbnQtYmxhY2sgdGV4dC1zbGF0ZS0yMDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBpdGFsaWMgbGVhZGluZy1yZWxheGVkXCI+Tm8gY2hhbXBpb24gZGF0YTxici8+ZXh0cmFjdGVkIHlldC48L3A+fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyQ2xhc3NlcyA9ICgpID0+IHtcbiAgICBjb25zdCBncm91cGVkTGVzc29ucyA9IGxlc3NvbnMucmVkdWNlKChhY2MsIGxlc3NvbikgPT4ge1xuICAgICAgaWYgKCFhY2NbbGVzc29uLnRvcGljXSkgYWNjW2xlc3Nvbi50b3BpY10gPSBbXTtcbiAgICAgIGFjY1tsZXNzb24udG9waWNdLnB1c2gobGVzc29uKTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30gYXMgUmVjb3JkPHN0cmluZywgTGVzc29uW10+KTtcblxuICAgIGNvbnN0IHNvcnRlZFRvcGljcyA9IE9iamVjdC5rZXlzKGdyb3VwZWRMZXNzb25zKS5zb3J0KCk7XG4gICAgY29uc3QgZXhpc3RpbmdUb3BpY3MgPSBzb3J0ZWRUb3BpY3M7XG5cbiAgICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xMlwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBwLTEyIHJvdW5kZWQtWzQwcHhdIHNoYWRvdy1zbVwiPlxuICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBtYi0xMCB0ZXh0LVsjMWExYTFhXSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCB1cHBlcmNhc2UgaXRhbGljIHRyYWNraW5nLXRpZ2h0ZXJcIj5cbiAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTcgaC03IHRleHQtcHJpbWFyeS80MFwiIC8+IHt0KCdkYXNoLmFkbWluLmFkZE5ld0xlc3NvbicpfVxuICAgICAgICA8L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTZcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTEgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1bIzFhMWExYV0gdXBwZXJjYXNlIGZvbnQtYmxhY2sgdHJhY2tpbmctWzAuM2VtXSBweC0xXCI+U3R1ZHkgUGFjayBBY2Nlc3MgU2VjdXJpdHk8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC00XCI+XG4gICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TmV3TGVzc29uKHsuLi5uZXdMZXNzb24sIHZpc2liaWxpdHk6ICdwcml2YXRlJyBhcyBjb25zdCwgdmlkZW9UeXBlOiAnZHJpdmUnIGFzIGNvbnN0fSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC0xIHB5LTQgcm91bmRlZC0yeGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiAke25ld0xlc3Nvbi52aXNpYmlsaXR5ID09PSAncHJpdmF0ZScgPyAnYmctcHJpbWFyeSB0ZXh0LXdoaXRlIGJvcmRlci1wcmltYXJ5IHNoYWRvdy14bCBzaGFkb3ctcHJpbWFyeS8yMCcgOiAnYmctc2xhdGUtNTAgdGV4dC1bIzFhMWExYV0gYm9yZGVyLXNsYXRlLTIwMCBob3Zlcjpib3JkZXItcHJpbWFyeS8yMCd9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz4gUHJpdmF0ZSAoU2VjdXJlKVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXROZXdMZXNzb24oey4uLm5ld0xlc3NvbiwgdmlzaWJpbGl0eTogJ3VubGlzdGVkJyBhcyBjb25zdCwgdmlkZW9UeXBlOiAneW91dHViZScgYXMgY29uc3R9KX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4LTEgcHktNCByb3VuZGVkLTJ4bCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgdGV4dC1bMTBweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yICR7bmV3TGVzc29uLnZpc2liaWxpdHkgPT09ICd1bmxpc3RlZCcgPyAnYmctcHJpbWFyeSB0ZXh0LXdoaXRlIGJvcmRlci1wcmltYXJ5IHNoYWRvdy14bCBzaGFkb3ctcHJpbWFyeS8yMCcgOiAnYmctc2xhdGUtNTAgdGV4dC1bIzFhMWExYV0gYm9yZGVyLXNsYXRlLTIwMCBob3Zlcjpib3JkZXItcHJpbWFyeS8yMCd9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxFeHRlcm5hbExpbmsgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+IFVubGlzdGVkIChQdWJsaWMpXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTEgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1bIzFhMWExYV0gdXBwZXJjYXNlIGZvbnQtYmxhY2sgdHJhY2tpbmctWzAuM2VtXSBweC0xXCI+VGFyZ2V0IEJhdGNoIChZZWFyKTwvbGFiZWw+XG4gICAgICAgICAgICA8c2VsZWN0IFxuICAgICAgICAgICAgICB2YWx1ZT17bmV3TGVzc29uLnllYXJJZH0gXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld0xlc3Nvbih7Li4ubmV3TGVzc29uLCB5ZWFySWQ6IGUudGFyZ2V0LnZhbHVlfSl9IFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGwgcHgtNiBweS01IHRleHQtWyMxYTFhMWFdIHRleHQteHMgZm9udC1ib2xkIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHJpbWFyeS8zMCB0cmFuc2l0aW9uLWFsbCBhcHBlYXJhbmNlLW5vbmUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IFllYXIgKE9wdGlvbmFsKTwvb3B0aW9uPlxuICAgICAgICAgICAgICB7YWNhZGVtaWNZZWFycy5tYXAoeSA9PiA8b3B0aW9uIGtleT17eS5pZH0gdmFsdWU9e3kuaWR9Pnt5LnllYXJ9PC9vcHRpb24+KX1cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi0yIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIG1iLTIgcHgtMVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1bIzFhMWExYV0gdXBwZXJjYXNlIGZvbnQtYmxhY2sgdHJhY2tpbmctWzAuM2VtXVwiPlN0dWR5IFBhY2sgKFRvcGljKTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBiZy1zbGF0ZS0xMDAgcC0xIHJvdW5kZWQtbGcgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VG9waWNNb2RlKCdleGlzdGluZycpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xIHRleHQtWzhweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHJvdW5kZWQtbWQgdHJhbnNpdGlvbi1hbGwgJHt0b3BpY01vZGUgPT09ICdleGlzdGluZycgPyAnYmctd2hpdGUgdGV4dC1wcmltYXJ5IHNoYWRvdy1zbScgOiAndGV4dC1zbGF0ZS00MDAnfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgRXhpc3RpbmdcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VG9waWNNb2RlKCduZXcnKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMSB0ZXh0LVs4cHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCByb3VuZGVkLW1kIHRyYW5zaXRpb24tYWxsICR7dG9waWNNb2RlID09PSAnbmV3JyA/ICdiZy13aGl0ZSB0ZXh0LXByaW1hcnkgc2hhZG93LXNtJyA6ICd0ZXh0LXNsYXRlLTQwMCd9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBOZXdcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAge3RvcGljTW9kZSA9PT0gJ2V4aXN0aW5nJyAmJiBleGlzdGluZ1RvcGljcy5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgICA8c2VsZWN0IFxuICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdMZXNzb24udG9waWN9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0TmV3TGVzc29uKHsuLi5uZXdMZXNzb24sIHRvcGljOiBlLnRhcmdldC52YWx1ZX0pfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC02IHB5LTUgdGV4dC1bIzFhMWExYV0gdGV4dC14cyBmb250LWJvbGQgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzMwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5DaG9vc2UgYW4gZXhpc3Rpbmcgc3R1ZHkgcGFjay4uLjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIHtleGlzdGluZ1RvcGljcy5tYXAodCA9PiA8b3B0aW9uIGtleT17dH0gdmFsdWU9e3R9Pnt0fTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgbmV3IHN0dWR5IHBhY2sgbmFtZSAvIHRvcGljXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17bmV3TGVzc29uLnRvcGljfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld0xlc3Nvbih7Li4ubmV3TGVzc29uLCB0b3BpYzogZS50YXJnZXQudmFsdWV9KX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGwgcHgtNiBweS01IHRleHQtWyMxYTFhMWFdIHRleHQteHMgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtMzAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHJpbWFyeS8zMCB0cmFuc2l0aW9uLWFsbCBmb250LXNhbnNcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1bIzFhMWExYV0gdXBwZXJjYXNlIGZvbnQtYmxhY2sgdHJhY2tpbmctWzAuM2VtXSBweC0xXCI+TGVzc29uIE5hbWUgKFN1YiBUb3BpYyk8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJMZXNzb24gTmFtZVwiXG4gICAgICAgICAgICAgIHZhbHVlPXtuZXdMZXNzb24uc3ViVG9waWN9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld0xlc3Nvbih7Li4ubmV3TGVzc29uLCBzdWJUb3BpYzogZS50YXJnZXQudmFsdWV9KX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsIHB4LTYgcHktNSB0ZXh0LVsjMWExYTFhXSB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciBwbGFjZWhvbGRlcjp0ZXh0LXNsYXRlLTMwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvMzAgdHJhbnNpdGlvbi1hbGwgZm9udC1zYW5zXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi0xIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtWyMxYTFhMWFdIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMVwiPlZpZGVvIFNvdXJjZSBJZGVudGl0eSAoVVJMKTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlZpZGVvIFVSTFwiXG4gICAgICAgICAgICAgIHZhbHVlPXtuZXdMZXNzb24udmlkZW9Vcmx9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld0xlc3Nvbih7Li4ubmV3TGVzc29uLCB2aWRlb1VybDogZS50YXJnZXQudmFsdWV9KX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsIHB4LTYgcHktNSB0ZXh0LVsjMWExYTFhXSB0ZXh0LXhzIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3QgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS0zMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzMwIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi0yIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC02IGl0ZW1zLWVuZFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1bIzFhMWExYV0gdXBwZXJjYXNlIGZvbnQtYmxhY2sgdHJhY2tpbmctWzAuM2VtXSBweC0xXCI+VGh1bWJuYWlsIFByZXZpZXcgUmVmZXJlbmNlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVGh1bWJuYWlsIEltYWdlIFVSTCAoT3B0aW9uYWwpXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdMZXNzb24udGh1bWJuYWlsVXJsfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0TmV3TGVzc29uKHsuLi5uZXdMZXNzb24sIHRodW1ibmFpbFVybDogZS50YXJnZXQudmFsdWV9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC02IHB5LTUgdGV4dC1bIzFhMWExYV0gdGV4dC14cyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS0zMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzMwIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge25ld0xlc3Nvbi50aHVtYm5haWxVcmwgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xNiBoLTE2IHJvdW5kZWQtMnhsIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzaHJpbmstMCBzaGFkb3cteGwgcm90YXRlLTNcIj5cbiAgICAgICAgICAgICAgICAgIDxpbWcgXG4gICAgICAgICAgICAgICAgICAgIHNyYz17dHJhbnNmb3JtSW1hZ2VVcmwobmV3TGVzc29uLnRodW1ibmFpbFVybCl9IFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlclwiIFxuICAgICAgICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtNiBpdGVtcy1lbmRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtWyMxYTFhMWFdIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMVwiPlN0dWR5IFBhY2sgQ292ZXIgSW1hZ2U8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJJbWFnZSBVUkwgKEZvciBTdHVkeSBQYWNrcylcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld0xlc3Nvbi5pbWFnZVVybH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld0xlc3Nvbih7Li4ubmV3TGVzc29uLCBpbWFnZVVybDogZS50YXJnZXQudmFsdWV9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC02IHB5LTUgdGV4dC1bIzFhMWExYV0gdGV4dC14cyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS0zMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzMwIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge25ld0xlc3Nvbi5pbWFnZVVybCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTE2IGgtMTYgcm91bmRlZC0yeGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHNocmluay0wIHNoYWRvdy14bCAtcm90YXRlLTNcIj5cbiAgICAgICAgICAgICAgICAgIDxpbWcgXG4gICAgICAgICAgICAgICAgICAgIHNyYz17dHJhbnNmb3JtSW1hZ2VVcmwobmV3TGVzc29uLmltYWdlVXJsKX0gXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyXCIgXG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmVyUG9saWN5PVwibm8tcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1bIzFhMWExYV0gdXBwZXJjYXNlIGZvbnQtYmxhY2sgdHJhY2tpbmctWzAuM2VtXSBweC0xXCI+U3RyZWFtIEhvc3QgUHJvdmlkZXI8L2xhYmVsPlxuICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICB2YWx1ZT17bmV3TGVzc29uLnZpZGVvVHlwZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0TmV3TGVzc29uKHsuLi5uZXdMZXNzb24sIHZpZGVvVHlwZTogZS50YXJnZXQudmFsdWUgYXMgYW55fSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC02IHB5LTUgdGV4dC1bMTBweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRleHQtWyMxYTFhMWFdIGFwcGVhcmFuY2Utbm9uZSBjdXJzb3ItcG9pbnRlciBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvMzAgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwieW91dHViZVwiPllvdVR1YmU8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRyaXZlXCI+R29vZ2xlIERyaXZlPC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtWyMxYTFhMWFdIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMVwiPk1heGltdW0gVmlzdWFsIEFjY2VzcyBDb3VudDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdMZXNzb24ubWF4Vmlld3N9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0TmV3TGVzc29uKHsuLi5uZXdMZXNzb24sIG1heFZpZXdzOiBwYXJzZUludChlLnRhcmdldC52YWx1ZSkgfHwgMn0pfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC02IHB5LTUgdGV4dC1bIzFhMWExYV0gdGV4dC14cyBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVzdCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvMzAgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwLTQgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGxcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtcHJpbWFyeVwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCB0ZXh0LVsjMWExYTFhXVwiPlNhZmUgWm9uZTwvcD5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzhweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1ib2xkXCI+Q3JvcCBZb3VUdWJlIFVJIGJhcnM8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE5ld0xlc3Nvbih7Li4ubmV3TGVzc29uLCBpc1NhZmVab25lOiAhbmV3TGVzc29uLmlzU2FmZVpvbmV9KX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEyIGgtNiByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGwgcmVsYXRpdmUgJHtuZXdMZXNzb24uaXNTYWZlWm9uZSA/ICdiZy1wcmltYXJ5JyA6ICdiZy1zbGF0ZS0zMDAnfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGFic29sdXRlIHRvcC0xIHctNCBoLTQgYmctd2hpdGUgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tYWxsICR7bmV3TGVzc29uLmlzU2FmZVpvbmUgPyAnbGVmdC03JyA6ICdsZWZ0LTEnfWB9IC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUFkZExlc3Nvbn0gY2xhc3NOYW1lPVwibXQtMTAgYmctcHJpbWFyeSB0ZXh0LXdoaXRlIGZvbnQtYmxhY2sgdXBwZXJjYXNlIGl0YWxpYyB0cmFja2luZy1bMC4yZW1dIHB4LTEwIHB5LTUgcm91bmRlZC0yeGwgaG92ZXI6c2NhbGUtMTA1IGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCB0ZXh0LXNtIHNoYWRvdy0yeGwgc2hhZG93LXByaW1hcnkvMjBcIj5cbiAgICAgICAgICB7dCgnZGFzaC5hZG1pbi51cGxvYWRMZXNzb24nKX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTE2XCI+XG4gICAgICAgIHtzb3J0ZWRUb3BpY3MubWFwKHRvcGljID0+IChcbiAgICAgICAgICA8ZGl2IGtleT17dG9waWN9IGNsYXNzTmFtZT1cInNwYWNlLXktOFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNiBncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMiBoLTEyIGJnLXByaW1hcnkgcm91bmRlZC1mdWxsIGdyb3VwLWhvdmVyOnNjYWxlLXktMTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTUwMFwiIC8+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYmxhY2sgdGV4dC1bIzFhMWExYV0gdXBwZXJjYXNlIGl0YWxpYyB0cmFja2luZy10aWdodGVyXCI+e3RvcGljfTwvaDQ+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bIzFhMWExYV0gdGV4dC1bMTBweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctWzAuM2VtXSBvcGFjaXR5LTQwXCI+e2dyb3VwZWRMZXNzb25zW3RvcGljXS5sZW5ndGh9IFNUUkVBTVMgSU4gVEhJUyBQQUNLPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTMgZ2FwLThcIj5cbiAgICAgICAgICAgICAge2dyb3VwZWRMZXNzb25zW3RvcGljXS5zb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShiLmNyZWF0ZWRBdCkuZ2V0VGltZSgpIC0gbmV3IERhdGUoYS5jcmVhdGVkQXQpLmdldFRpbWUoKSkubWFwKGxlc3NvbiA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2xlc3Nvbi5pZH0gY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC1bMzJweF0gb3ZlcmZsb3ctaGlkZGVuIGdyb3VwIGhvdmVyOmJvcmRlci1wcmltYXJ5LzMwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTUwMCBob3ZlcjotdHJhbnNsYXRlLXktMSBob3ZlcjpzaGFkb3ctMnhsXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFzcGVjdC12aWRlbyB3LWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtsZXNzb24uaW1hZ2VVcmwgfHwgbGVzc29uLnRodW1ibmFpbFVybCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXt0cmFuc2Zvcm1JbWFnZVVybChsZXNzb24uaW1hZ2VVcmwgfHwgbGVzc29uLnRodW1ibmFpbFVybCB8fCAnJyl9IFxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0PXtsZXNzb24udG9waWN9IFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBvYmplY3QtY292ZXIgZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTcwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBiZy1zbGF0ZS0xMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb29rT3BlbiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgdGV4dC1zbGF0ZS0zMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtNiBsZWZ0LTYgZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0zIHB5LTEgYmctd2hpdGUvODAgYmFja2Ryb3AtYmx1ci1tZCB0ZXh0LVsjMWExYTFhXSB0ZXh0LVs4cHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsZXNzb24udmlkZW9UeXBlfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0zIHB5LTEgYmFja2Ryb3AtYmx1ci1tZCB0ZXh0LXdoaXRlIHRleHQtWzhweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMmVtXSByb3VuZGVkLWxnIGJvcmRlciAkeyhsZXNzb24udmlzaWJpbGl0eSBhcyBzdHJpbmcpID09PSAncHJpdmF0ZScgPyAnYmctcmVkLTUwMCBib3JkZXItcmVkLTYwMCcgOiAnYmctcHJpbWFyeSBib3JkZXItcHJpbWFyeS1kYXJrJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsZXNzb24udmlzaWJpbGl0eSB8fCAncHJpdmF0ZSd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHtsZXNzb24ueWVhcklkICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTMgcHktMSBiZy1zbGF0ZS05MDAvMTAgYmFja2Ryb3AtYmx1ci1tZCB0ZXh0LXNsYXRlLTkwMCB0ZXh0LVs4cHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7YWNhZGVtaWNZZWFycy5maW5kKHkgPT4geS5pZCA9PT0gbGVzc29uLnllYXJJZCk/LnllYXIgfHwgJ0JhdGNoJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtNiByaWdodC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVEZWxldGUoJ2xlc3NvbnMnLCBsZXNzb24uaWQpfSBjbGFzc05hbWU9XCJwLTMgYmctd2hpdGUvODAgYmFja2Ryb3AtYmx1ci1tZCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXJlZC01MDAgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCB0cmFuc2l0aW9uLWFsbCBob3ZlcjpzY2FsZS0xMTAgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTEwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYmxhY2sgdGV4dC1bIzFhMWExYV0gdXBwZXJjYXNlIGl0YWxpYyB0cmFja2luZy10aWdodGVyIG1iLTIgZ3JvdXAtaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb24tY29sb3JzXCI+e2xlc3Nvbi5zdWJUb3BpY308L2g0PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItdCBib3JkZXItc2xhdGUtMTAwIHB0LTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHRleHQtWzEwcHhdIHRleHQtWyMxYTFhMWFdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgIEFjY2Vzczoge2xlc3Nvbi5tYXhWaWV3cyB8fCAyfVhcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkTGVzc29uKGxlc3Nvbil9IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1wcmltYXJ5IGhvdmVyOnRleHQtcHJpbWFyeS1kYXJrIHRyYW5zaXRpb24tYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBQcmV2aWV3IFRlcm1pbmFsICZyYXJyO1xuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgICAge3NlbGVjdGVkTGVzc29uICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00IGJnLWJsYWNrLzkwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctNHhsXCI+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkTGVzc29uKG51bGwpfSBjbGFzc05hbWU9XCJtYi00IHRleHQtd2hpdGUgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb24tYWxsXCI+Q2xvc2UgUHJldmlldzwvYnV0dG9uPlxuICAgICAgICAgICAgPFZpZGVvUGxheWVyIHVybD17c2VsZWN0ZWRMZXNzb24udmlkZW9Vcmx9IHR5cGU9e3NlbGVjdGVkTGVzc29uLnZpZGVvVHlwZX0gdmlzaWJpbGl0eT17c2VsZWN0ZWRMZXNzb24udmlzaWJpbGl0eX0gdXNlckVtYWlsPXtwcm9maWxlLmVtYWlsfSBpc1NhZmVab25lPXtzZWxlY3RlZExlc3Nvbi5pc1NhZmVab25lfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBbdmlld2luZ0hpc3RvcnksIHNldFZpZXdpbmdIaXN0b3J5XSA9IHVzZVN0YXRlPFN0dWRlbnRSZWNvcmQgfCBudWxsPihudWxsKTtcblxuICBjb25zdCByZW5kZXJTdHVkZW50cyA9ICgpID0+IHtcbiAgICBjb25zdCBmaWx0ZXJlZFN0dWRlbnRzID0gc3R1ZGVudHMuZmlsdGVyKHMgPT4ge1xuICAgICAgY29uc3Qgc2VhcmNoID0gc3R1ZGVudFNlYXJjaC50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgbmFtZSA9IChzLm5hbWUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IGlkID0gKHMuc3R1ZGVudElkIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBlbWFpbCA9IChzLmVtYWlsIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBcbiAgICAgIHJldHVybiBuYW1lLmluY2x1ZGVzKHNlYXJjaCkgfHwgaWQuaW5jbHVkZXMoc2VhcmNoKSB8fCBlbWFpbC5pbmNsdWRlcyhzZWFyY2gpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xMlwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHAtNiBtZDpwLTEwIHJvdW5kZWQtWzQwcHhdIHNoYWRvdy1zbVwiPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIG1kOnRleHQtMnhsIGZvbnQtYmxhY2sgbWItMTAgdGV4dC1bIzFhMWExYV0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTQgdXBwZXJjYXNlIGl0YWxpYyB0cmFja2luZy10aWdodGVyXCI+XG4gICAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTcgaC03IHRleHQtcHJpbWFyeS80MFwiIC8+IHt0KCdkYXNoLmFkbWluLnJlZ2lzdGVyU3R1ZGVudCcpfVxuICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC02XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBsZzpjb2wtc3Bhbi0yXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LVsjMWExYTFhXSB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy1bMC4zZW1dIHB4LTEgaXRhbGljXCI+U3R1ZGVudCBEZXNpZ25hdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiRnVsbCBJbnN0aXR1dGlvbmFsIE5hbWVcIiB2YWx1ZT17bmV3U3R1ZGVudC5uYW1lfSBvbkNoYW5nZT17ZSA9PiBzZXROZXdTdHVkZW50KHsuLi5uZXdTdHVkZW50LCBuYW1lOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGwgcHgtNiBweS01IHRleHQtWyMxYTFhMWFdIHRleHQteHMgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtMzAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHJpbWFyeS8zMCB0cmFuc2l0aW9uLWFsbCBmb250LXNhbnNcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBsZzpjb2wtc3Bhbi0yXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LVsjMWExYTFhXSB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy1bMC4zZW1dIHB4LTEgaXRhbGljXCI+U2VjdXJpdHkgQ3JlZGVudGlhbHMgKEVtYWlsKTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cIk9mZmljaWFsIEVtYWlsIEFkZHJlc3NcIiB2YWx1ZT17bmV3U3R1ZGVudC5lbWFpbH0gb25DaGFuZ2U9e2UgPT4gc2V0TmV3U3R1ZGVudCh7Li4ubmV3U3R1ZGVudCwgZW1haWw6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC02IHB5LTUgdGV4dC1bIzFhMWExYV0gdGV4dC14cyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS0zMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzMwIHRyYW5zaXRpb24tYWxsIGZvbnQtbW9ub1wiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LVsjMWExYTFhXSB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy1bMC4zZW1dIHB4LTEgaXRhbGljXCI+R292LiBBdXRoZW50aWNhdGlvbiAoTklDKTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiTklDIC8gSUQgUmVmZXJlbmNlXCIgdmFsdWU9e25ld1N0dWRlbnQubmljfSBvbkNoYW5nZT17ZSA9PiBzZXROZXdTdHVkZW50KHsuLi5uZXdTdHVkZW50LCBuaWM6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC02IHB5LTUgdGV4dC1bIzFhMWExYV0gdGV4dC14cyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS0zMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzMwIHRyYW5zaXRpb24tYWxsXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtWyMxYTFhMWFdIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMSBpdGFsaWNcIj5CYXRjaCBBbGxvY2F0aW9uIChZZWFyKTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxzZWxlY3QgXG4gICAgICAgICAgICAgICAgdmFsdWU9e25ld1N0dWRlbnQueWVhcklkfSBcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXROZXdTdHVkZW50KHsuLi5uZXdTdHVkZW50LCB5ZWFySWQ6IGUudGFyZ2V0LnZhbHVlfSl9IFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC02IHB5LTUgdGV4dC1bIzFhMWExYV0gdGV4dC14cyBmb250LWJvbGQgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzMwIHRyYW5zaXRpb24tYWxsIGFwcGVhcmFuY2Utbm9uZSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IFllYXI8L29wdGlvbj5cbiAgICAgICAgICAgICAgICB7YWNhZGVtaWNZZWFycy5tYXAoeSA9PiA8b3B0aW9uIGtleT17eS5pZH0gdmFsdWU9e3kuaWR9Pnt5LnllYXJ9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LVsjMWExYTFhXSB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy1bMC4zZW1dIHB4LTEgaXRhbGljXCI+QmF0Y2ggQWxsb2NhdGlvbiAoQ2xhc3MpPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJBY2FkZW1pYyBDbGFzc1wiIHZhbHVlPXtuZXdTdHVkZW50LmNsYXNzfSBvbkNoYW5nZT17ZSA9PiBzZXROZXdTdHVkZW50KHsuLi5uZXdTdHVkZW50LCBjbGFzczogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsIHB4LTYgcHktNSB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciBwbGFjZWhvbGRlcjp0ZXh0LXNsYXRlLTMwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvMzAgdHJhbnNpdGlvbi1hbGxcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBsZzpjb2wtc3Bhbi0yXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy1bMC4zZW1dIHB4LTEgaXRhbGljXCI+UHJpb3IgQWNhZGVtaWMgRW50aXR5PC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJTY2hvb2wgTmFtZVwiIHZhbHVlPXtuZXdTdHVkZW50LnNjaG9vbH0gb25DaGFuZ2U9e2UgPT4gc2V0TmV3U3R1ZGVudCh7Li4ubmV3U3R1ZGVudCwgc2Nob29sOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGwgcHgtNiBweS01IHRleHQtc2xhdGUtOTAwIHRleHQteHMgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtMzAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHJpbWFyeS8zMCB0cmFuc2l0aW9uLWFsbFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIGxnOmNvbC1zcGFuLTNcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMSBpdGFsaWNcIj5HZW9ncmFwaGljIENvb3JkaW5hdGVzIChBZGRyZXNzKTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiUGh5c2ljYWwgQWRkcmVzc1wiIHZhbHVlPXtuZXdTdHVkZW50LmFkZHJlc3N9IG9uQ2hhbmdlPXtlID0+IHNldE5ld1N0dWRlbnQoey4uLm5ld1N0dWRlbnQsIGFkZHJlc3M6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC02IHB5LTUgdGV4dC1zbGF0ZS05MDAgdGV4dC14cyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS0zMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzMwIHRyYW5zaXRpb24tYWxsXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMSBpdGFsaWNcIj5EaXJlY3QgVHJhbnNtaXNzaW9uIChXaGF0c0FwcCk8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIk1vYmlsZSBOdW1iZXJcIiB2YWx1ZT17bmV3U3R1ZGVudC53aGF0c2FwcH0gb25DaGFuZ2U9e2UgPT4gc2V0TmV3U3R1ZGVudCh7Li4ubmV3U3R1ZGVudCwgd2hhdHNhcHA6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC02IHB5LTUgdGV4dC1zbGF0ZS05MDAgdGV4dC14cyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS0zMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzMwIHRyYW5zaXRpb24tYWxsIGZvbnQtbW9ub1wiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUFkZFN0dWRlbnR9IGNsYXNzTmFtZT1cIm10LTEwIGJnLXByaW1hcnkgdGV4dC13aGl0ZSBmb250LWJsYWNrIHVwcGVyY2FzZSBpdGFsaWMgdHJhY2tpbmctWzAuMmVtXSBweC0xMCBweS01IHJvdW5kZWQtMnhsIGhvdmVyOnNjYWxlLTEwNSBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgdGV4dC1zbSBzaGFkb3ctMnhsIHNoYWRvdy1wcmltYXJ5LzIwXCI+e3QoJ2Rhc2guYWRtaW4uYWRkU3R1ZGVudCcpfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHAtNiBtZDpwLTEwIHJvdW5kZWQtWzQwcHhdIHNoYWRvdy1zbVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC02XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14bCBtZDp0ZXh0LTJ4bCBmb250LWJsYWNrIHRleHQtc2xhdGUtOTAwIGl0YWxpYyB1cHBlcmNhc2UgdHJhY2tpbmctdGlnaHRlclwiPlN0cmF0ZWdpYyBTdHVkZW50IE1hbmFnZW1lbnQ8L2gzPlxuICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNvcHlQYWlkRW1haWxzfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCB0ZXh0LXByaW1hcnkgaG92ZXI6dGV4dC1wcmltYXJ5LWRhcmsgdHJhbnNpdGlvbi1jb2xvcnMgZ3JvdXBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPENvcHkgY2xhc3NOYW1lPVwidy0zIGgtMyBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm1cIiAvPlxuICAgICAgICAgICAgICAgIENvcHkgUGFpZCBFbWFpbHMgKENTVilcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIG1kOnctWzUwMHB4XSBncm91cFwiPlxuICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNFRUsgU1RVREVOVCBCWSBOQU1FIE9SIFNFUklBTC4uLlwiIFxuICAgICAgICAgICAgICAgIHZhbHVlPXtzdHVkZW50U2VhcmNofVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldFN0dWRlbnRTZWFyY2goZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC0xMiBweS01IHRleHQtc2xhdGUtOTAwIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdHJhY2tpbmctWzAuMmVtXSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvMzAgdHJhbnNpdGlvbi1hbGwgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS0zMDBcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8VXNlcnMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNsYXRlLTMwMCBhYnNvbHV0ZSBsZWZ0LTYgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIGdyb3VwLWZvY3VzLXdpdGhpbjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvbi1jb2xvcnNcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgc2hhZG93LXNtIHJvdW5kZWQtWzQwcHhdIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cteC1hdXRvXCI+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImJnLXNsYXRlLTUwIHRleHQtWzlweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTQwMCBpdGFsaWMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB4LTYgcHktNVwiPkVOVElUWV9JREVOVElUWTwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHgtNiBweS01XCI+SU5ERVhfU0VSSUFMPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweC02IHB5LTVcIj5HT1ZfSUQ8L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB4LTYgcHktNVwiPkNMQVNTX05PREU8L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB4LTYgcHktNVwiPkFDQURFTUlDX1NDSE9PTDwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHgtNiBweS01XCI+V19BUFBfTElOSzwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHgtNiBweS01IHRleHQtY2VudGVyXCI+QUNDRVNTX1BST1RPQ09MICh7Y3VycmVudE1vbnRofSk8L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB4LTYgcHktNSB0ZXh0LXJpZ2h0XCI+UFJPVE9DT0xTPC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICA8dGJvZHkgY2xhc3NOYW1lPVwiZGl2aWRlLXkgZGl2aWRlLXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgICAgIHtmaWx0ZXJlZFN0dWRlbnRzLm1hcChzdHVkZW50ID0+IChcbiAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e3N0dWRlbnQuaWR9IGNsYXNzTmFtZT1cImhvdmVyOmJnLXNsYXRlLTUwLzUwIHRyYW5zaXRpb24tY29sb3JzIGdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTYgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIG1kOnRleHQtc20gZm9udC1ibGFjayB0ZXh0LXNsYXRlLTkwMCBpdGFsaWMgdXBwZXJjYXNlIHRyYWNraW5nLXRpZ2h0XCI+e3N0dWRlbnQubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tZWRpdW0gdHJ1bmNhdGUgbWF4LXctWzE1MHB4XSBpdGFsaWNcIj57c3R1ZGVudC5hZGRyZXNzfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHgtNiBweS02IHRleHQtWzExcHhdIHRleHQtc2xhdGUtNTAwIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3RcIj57c3R1ZGVudC5zdHVkZW50SWQ/LnJlcGxhY2UoJ1lBLTIwMjYtJywgJycpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTYgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vIHRyYWNraW5nLXRpZ2h0XCI+e3N0dWRlbnQubmljfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTYgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDAgZm9udC1ibGFjayB1cHBlcmNhc2UgaXRhbGljXCI+e3N0dWRlbnQuY2xhc3N9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB4LTYgcHktNiB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ib2xkIHRyYWNraW5nLXRpZ2h0XCI+e3N0dWRlbnQuc2Nob29sfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTYgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vXCI+e3N0dWRlbnQud2hhdHNhcHB9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB4LTYgcHktNiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0b2dnbGVQYXltZW50KHN0dWRlbnQuaWQsIGN1cnJlbnRNb250aCwgc3R1ZGVudC5wYXltZW50cz8uW2N1cnJlbnRNb250aF0gfHwgZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMCBoLTEwIHJvdW5kZWQteGwgYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG14LWF1dG8gdHJhbnNpdGlvbi1hbGwgdGV4dC14cyBmb250LWJsYWNrICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0dWRlbnQucGF5bWVudHM/LltjdXJyZW50TW9udGhdIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXByaW1hcnkgdGV4dC13aGl0ZSBib3JkZXItcHJpbWFyeSBzaGFkb3ctbGcgc2hhZG93LXByaW1hcnkvMjAnIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTUwIGJvcmRlci1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6Ym9yZGVyLXByaW1hcnkvMjAgaG92ZXI6dGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c3R1ZGVudC5wYXltZW50cz8uW2N1cnJlbnRNb250aF0gPyAn4pyTJyA6ICfinJUnfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHgtNiBweS02IHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktZW5kIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRFZGl0aW5nU3R1ZGVudChzdHVkZW50KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb24tYWxsIGdyb3VwLWhvdmVyOnNjYWxlLTEwNSBzaGFkb3ctc21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIk1vZGlmeSBSZWNvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8RWRpdCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFZpZXdpbmdIaXN0b3J5KHN0dWRlbnQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTMgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvbi1hbGwgZ3JvdXAtaG92ZXI6c2NhbGUtMTA1IHNoYWRvdy1zbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiQXVkaXQgSGlzdG9yeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxCb29rT3BlbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gaGFuZGxlRGVsZXRlKCdzdHVkZW50cycsIHN0dWRlbnQuaWQpfSBjbGFzc05hbWU9XCJwLTMgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXJlZC01MDAgaG92ZXI6YmctcmVkLTUwIHRyYW5zaXRpb24tYWxsIGdyb3VwLWhvdmVyOnNjYWxlLTEwNSBzaGFkb3ctc21cIiB0aXRsZT1cIkRlbGV0ZSBTdHVkZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxUcmFzaDIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEhpc3RvcnkgTW9kYWwgKi99XG4gICAgICA8QW5pbWF0ZVByZXNlbmNlPlxuICAgICAgICB7dmlld2luZ0hpc3RvcnkgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBiZy1zbGF0ZS05MDAvNjAgYmFja2Ryb3AtYmx1ci1zbVwiPlxuICAgICAgICAgICAgPG1vdGlvbi5kaXYgXG4gICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgc2NhbGU6IDAuOTUgfX1cbiAgICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCBzY2FsZTogMSB9fVxuICAgICAgICAgICAgICBleGl0PXt7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjk1IH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtM3hsIHAtOCB3LWZ1bGwgbWF4LXctbWQgc2hhZG93LTJ4bFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCBtYi00IGl0YWxpYyB1cHBlcmNhc2UgdHJhY2tpbmctdGlnaHRlciB0ZXh0LXNsYXRlLTkwMFwiPnt0KCdkYXNoLmFkbWluLnBheW1lbnRIaXN0b3J5Jyl9PC9oMz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1zbSBtYi02IGZvbnQtbWVkaXVtIGl0YWxpY1wiPnt0KCdkYXNoLmFkbWluLmhpc3RvcnlGb3InKX0gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS05MDAgZm9udC1ibGFja1wiPnt2aWV3aW5nSGlzdG9yeS5uYW1lfTwvc3Bhbj48L3A+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyBtYXgtaC1bNDB2aF0gb3ZlcmZsb3cteS1hdXRvIHByLTIgY3VzdG9tLXNjcm9sbGJhclwiPlxuICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyh2aWV3aW5nSGlzdG9yeS5wYXltZW50cyB8fCB7fSkuc29ydCgoYSwgYikgPT4gYlswXS5sb2NhbGVDb21wYXJlKGFbMF0pKS5tYXAoKFttb250aCwgcGFpZF0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXttb250aH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMyBiZy1zbGF0ZS01MCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ibGFjayB0ZXh0LXNsYXRlLTkwMCBpdGFsaWNcIj57bW9udGh9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHB4LTMgcHktMSByb3VuZGVkLWZ1bGwgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCAke3BhaWQgPyAnYmctcHJpbWFyeS8xMCB0ZXh0LXByaW1hcnkgYm9yZGVyIGJvcmRlci1wcmltYXJ5LzIwJyA6ICdiZy1yZWQtNTAwLzEwIHRleHQtcmVkLTUwMCBib3JkZXIgYm9yZGVyLXJlZC01MDAvMjAnfWB9PlxuICAgICAgICAgICAgICAgICAgICAgIHtwYWlkID8gdCgnZGFzaC5hZG1pbi5wYWlkJykgOiB0KCdkYXNoLmFkbWluLnVucGFpZCcpfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICB7KCF2aWV3aW5nSGlzdG9yeS5wYXltZW50cyB8fCBPYmplY3Qua2V5cyh2aWV3aW5nSGlzdG9yeS5wYXltZW50cykubGVuZ3RoID09PSAwKSAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIHB5LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTE2IGgtMTYgYmctc2xhdGUtNTAgcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1iLTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8Qm9va09wZW4gY2xhc3NOYW1lPVwidy04IGgtOCB0ZXh0LXNsYXRlLTIwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciB0ZXh0LXNsYXRlLTMwMCBpdGFsaWMgdGV4dC14cyBmb250LW1lZGl1bVwiPnt0KCdkYXNoLmFkbWluLm5vSGlzdG9yeScpfTwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtOCBwdC02IGJvcmRlci10IGJvcmRlci1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJsYWNrIG1iLTQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdXBwZXJjYXNlIGl0YWxpYyB0cmFja2luZy10aWdodGVyIHRleHQtc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICAgICAgICA8VmlkZW8gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXByaW1hcnlcIiAvPiBWaWRlbyBWaWV3IEhpc3RvcnlcbiAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIG1heC1oLVszMHZoXSBvdmVyZmxvdy15LWF1dG8gcHItMiBjdXN0b20tc2Nyb2xsYmFyXCI+XG4gICAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXModmlld2luZ0hpc3RvcnkudmlkZW9WaWV3cyB8fCB7fSkubWFwKChbbGVzc29uSWQsIHZpZXdzXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsZXNzb24gPSBsZXNzb25zLmZpbmQobCA9PiBsLmlkID09PSBsZXNzb25JZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2xlc3NvbklkfSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0zIGJnLXNsYXRlLTUwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTAgbXItNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYmxhY2sgdHJ1bmNhdGUgdGV4dC1zbGF0ZS05MDAgaXRhbGljIHVwcGVyY2FzZVwiPntsZXNzb24/LnRvcGljIHx8ICdVbmtub3duIExlc3Nvbid9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdFwiPnt2aWV3c30gLyB7bGVzc29uPy5tYXhWaWV3cyB8fCAyfSB2aWV3czwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17YXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25maXJtKGBSZXNldCB2aWV3cyBmb3IgXCIke2xlc3Nvbj8udG9waWN9XCI/YCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHVwZGF0ZURvYyhkb2MoZGIsICdzdHVkZW50cycsIHZpZXdpbmdIaXN0b3J5LmlkKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYHZpZGVvVmlld3MuJHtsZXNzb25JZH1gXTogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWaWV3aW5nSGlzdG9yeSh7Li4udmlld2luZ0hpc3RvcnksIHZpZGVvVmlld3M6IHsuLi52aWV3aW5nSGlzdG9yeS52aWRlb1ZpZXdzLCBbbGVzc29uSWRdOiAwfX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1wcmltYXJ5IGhvdmVyOnVuZGVybGluZSBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNldFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgIHsoIXZpZXdpbmdIaXN0b3J5LnZpZGVvVmlld3MgfHwgT2JqZWN0LmtleXModmlld2luZ0hpc3RvcnkudmlkZW9WaWV3cykubGVuZ3RoID09PSAwKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHRleHQtc2xhdGUtMzAwIHB5LTQgaXRhbGljIHRleHQteHMgZm9udC1tZWRpdW1cIj5ObyB2aWRlbyB2aWV3cyByZWNvcmRlZCB5ZXQuPC9wPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRWaWV3aW5nSGlzdG9yeShudWxsKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgbXQtOCBiZy1zbGF0ZS05MDAgdGV4dC13aGl0ZSBmb250LWJsYWNrIHVwcGVyY2FzZSBpdGFsaWMgdHJhY2tpbmctd2lkZXN0IHB5LTMgcm91bmRlZC14bCBob3ZlcjpiZy1zbGF0ZS04MDAgdHJhbnNpdGlvbi1hbGwgdGV4dC1zbVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7dCgnZGFzaC5hZG1pbi5jbG9zZScpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuXG4gICAgICB7LyogRWRpdCBTdHVkZW50IE1vZGFsICovfVxuICAgICAgPEFuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAge2VkaXRpbmdTdHVkZW50ICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgYmctc2xhdGUtOTAwLzYwIGJhY2tkcm9wLWJsdXItc21cIj5cbiAgICAgICAgICAgIDxtb3Rpb24uZGl2IFxuICAgICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjk1IH19XG4gICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgc2NhbGU6IDEgfX1cbiAgICAgICAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwLCBzY2FsZTogMC45NSB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTN4bCBwLTggdy1mdWxsIG1heC13LTJ4bCBzaGFkb3ctMnhsXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgbWItNlwiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYmxhY2sgaXRhbGljIHVwcGVyY2FzZSB0cmFja2luZy10aWdodGVyIHRleHQtc2xhdGUtOTAwXCI+RWRpdCBTdHVkZW50IFJlY29yZDwvaDM+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRFZGl0aW5nU3R1ZGVudChudWxsKX0gY2xhc3NOYW1lPVwicC0yIGhvdmVyOmJnLXNsYXRlLTUwIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNCBtYi02XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy13aWRlc3QgcHgtMSBpdGFsaWNcIj5GdWxsIE5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e2VkaXRpbmdTdHVkZW50Lm5hbWV9IG9uQ2hhbmdlPXtlID0+IHNldEVkaXRpbmdTdHVkZW50KHsuLi5lZGl0aW5nU3R1ZGVudCwgbmFtZTogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQtc2xhdGUtOTAwIHRleHQtc20gZm9udC1tZWRpdW0gZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzMwXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVzdCBweC0xIGl0YWxpY1wiPkVtYWlsIChSZWFkIE9ubHkpPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiB2YWx1ZT17ZWRpdGluZ1N0dWRlbnQuZW1haWx9IGRpc2FibGVkIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLXhsIHB4LTQgcHktMyB0ZXh0LXNsYXRlLTQwMCB0ZXh0LXNtIGZvbnQtbWVkaXVtIG9wYWNpdHktNjAgY3Vyc29yLW5vdC1hbGxvd2VkXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVzdCBweC0xIGl0YWxpY1wiPkluZGV4IE51bWJlcjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT17ZWRpdGluZ1N0dWRlbnQuc3R1ZGVudElkfSBvbkNoYW5nZT17ZSA9PiBzZXRFZGl0aW5nU3R1ZGVudCh7Li4uZWRpdGluZ1N0dWRlbnQsIHN0dWRlbnRJZDogZS50YXJnZXQudmFsdWUsIGluZGV4TnVtYmVyOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTMgdGV4dC1zbGF0ZS05MDAgdGV4dC1zbSBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHJpbWFyeS8zMFwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy13aWRlc3QgcHgtMSBpdGFsaWNcIj5OSUMgLyBJRCBOdW1iZXI8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e2VkaXRpbmdTdHVkZW50Lm5pY30gb25DaGFuZ2U9e2UgPT4gc2V0RWRpdGluZ1N0dWRlbnQoey4uLmVkaXRpbmdTdHVkZW50LCBuaWM6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLXhsIHB4LTQgcHktMyB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXNtIGZvbnQtbWVkaXVtIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHJpbWFyeS8zMFwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy13aWRlc3QgcHgtMSBpdGFsaWNcIj5FeGFtIFllYXI8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPHNlbGVjdCBcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2VkaXRpbmdTdHVkZW50LnllYXJJZCB8fCAnJ30gXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldEVkaXRpbmdTdHVkZW50KHsuLi5lZGl0aW5nU3R1ZGVudCwgeWVhcklkOiBlLnRhcmdldC52YWx1ZX0pfSBcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQtc2xhdGUtOTAwIHRleHQtc20gZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzMwXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBZZWFyPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIHthY2FkZW1pY1llYXJzLm1hcCh5ID0+IDxvcHRpb24ga2V5PXt5LmlkfSB2YWx1ZT17eS5pZH0+e3kueWVhcn08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy13aWRlc3QgcHgtMSBpdGFsaWNcIj5DbGFzczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT17ZWRpdGluZ1N0dWRlbnQuY2xhc3N9IG9uQ2hhbmdlPXtlID0+IHNldEVkaXRpbmdTdHVkZW50KHsuLi5lZGl0aW5nU3R1ZGVudCwgY2xhc3M6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLXhsIHB4LTQgcHktMyB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXNtIGZvbnQtYmxhY2sgdXBwZXJjYXNlIGl0YWxpYyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvMzBcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIGZvbnQtYmxhY2sgdHJhY2tpbmctd2lkZXN0IHB4LTEgaXRhbGljXCI+U2Nob29sPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXtlZGl0aW5nU3R1ZGVudC5zY2hvb2x9IG9uQ2hhbmdlPXtlID0+IHNldEVkaXRpbmdTdHVkZW50KHsuLi5lZGl0aW5nU3R1ZGVudCwgc2Nob29sOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTMgdGV4dC1zbGF0ZS05MDAgdGV4dC1zbSBmb250LWJvbGQgdXBwZXJjYXNlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHJpbWFyeS8zMFwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy13aWRlc3QgcHgtMSBpdGFsaWNcIj5XaGF0c0FwcDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT17ZWRpdGluZ1N0dWRlbnQud2hhdHNhcHB9IG9uQ2hhbmdlPXtlID0+IHNldEVkaXRpbmdTdHVkZW50KHsuLi5lZGl0aW5nU3R1ZGVudCwgd2hhdHNhcHA6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLXhsIHB4LTQgcHktMyB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXNtIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3QgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzMwXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVzdCBweC0xIGl0YWxpY1wiPkFkZHJlc3M8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e2VkaXRpbmdTdHVkZW50LmFkZHJlc3N9IG9uQ2hhbmdlPXtlID0+IHNldEVkaXRpbmdTdHVkZW50KHsuLi5lZGl0aW5nU3R1ZGVudCwgYWRkcmVzczogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQtc2xhdGUtOTAwIHRleHQtc20gZm9udC1tZWRpdW0gaXRhbGljIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHJpbWFyeS8zMFwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRFZGl0aW5nU3R1ZGVudChudWxsKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXNsYXRlLTQwMCBmb250LWJsYWNrIHVwcGVyY2FzZSBpdGFsaWMgdHJhY2tpbmctd2lkZXN0IHB5LTQgcm91bmRlZC14bCBob3ZlcjpiZy1zbGF0ZS0xMDAgdHJhbnNpdGlvbi1hbGwgdGV4dC1zbVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgQ2FuY2VsXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVVwZGF0ZVN0dWRlbnR9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgYmctcHJpbWFyeSB0ZXh0LXdoaXRlIGZvbnQtYmxhY2sgdXBwZXJjYXNlIGl0YWxpYyB0cmFja2luZy13aWRlc3QgcHktNCByb3VuZGVkLXhsIGhvdmVyOnNjYWxlLVsxLjAyXSBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgdGV4dC1zbSBzaGFkb3cteGwgc2hhZG93LXByaW1hcnkvMjBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFNhdmUgQ2hhbmdlc1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuICAgICAgPC8+XG4gICAgKTtcbiAgfTtcblxuICBjb25zdCByZW5kZXJMaXZlID0gKCkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xMlwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBwLTEyIHJvdW5kZWQtWzQwcHhdIHNoYWRvdy1zbVwiPlxuICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBtYi0xMCB0ZXh0LXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCB1cHBlcmNhc2UgaXRhbGljIHRyYWNraW5nLXRpZ2h0ZXJcIj5cbiAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTcgaC03IHRleHQtcHJpbWFyeS80MFwiIC8+IHt0KCdkYXNoLmFkbWluLmJyb2FkY2FzdEFubm91bmNlbWVudCcpfVxuICAgICAgICA8L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTZcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMSBpdGFsaWNcIj5TZXNzaW9uIEhlYWRsaW5lPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2Vzc2lvbiBUaXRsZVwiXG4gICAgICAgICAgICAgIHZhbHVlPXtuZXdDbGFzcy50aXRsZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0TmV3Q2xhc3Moey4uLm5ld0NsYXNzLCB0aXRsZTogZS50YXJnZXQudmFsdWV9KX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsIHB4LTYgcHktNSB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciBwbGFjZWhvbGRlcjp0ZXh0LXNsYXRlLTMwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvMzAgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMSBpdGFsaWNcIj5NZWV0aW5nIERlc3RpbmF0aW9uIChMaW5rKTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlc3Npb24gTGlua1wiXG4gICAgICAgICAgICAgIHZhbHVlPXtuZXdDbGFzcy5saW5rfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXROZXdDbGFzcyh7Li4ubmV3Q2xhc3MsIGxpbms6IGUudGFyZ2V0LnZhbHVlfSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC02IHB5LTUgdGV4dC1zbGF0ZS05MDAgdGV4dC14cyBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtMzAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHJpbWFyeS8zMCB0cmFuc2l0aW9uLWFsbCBmb250LW1vbm9cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMSBpdGFsaWNcIj5DbGFzc2lmaWNhdGlvbiBUYXJnZXQ8L2xhYmVsPlxuICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICB2YWx1ZT17bmV3Q2xhc3MudHlwZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0TmV3Q2xhc3Moey4uLm5ld0NsYXNzLCB0eXBlOiBlLnRhcmdldC52YWx1ZSBhcyBhbnl9KX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsIHB4LTYgcHktNSB0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgdGV4dC1zbGF0ZS02MDAgYXBwZWFyYW5jZS1ub25lIGN1cnNvci1wb2ludGVyIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHJpbWFyeS8zMCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ0b2RheVwiPkxJVkVfVFJBTlNNSVNTSU9OPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJncm91cFwiPlJFU09VUkNFX05PREU8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1lbmRcIj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlQWRkQ2xhc3N9IGNsYXNzTmFtZT1cInctZnVsbCBiZy1wcmltYXJ5IHRleHQtd2hpdGUgZm9udC1ibGFjayB1cHBlcmNhc2UgaXRhbGljIHRyYWNraW5nLVswLjJlbV0gcHktNSByb3VuZGVkLTJ4bCBob3ZlcjpzY2FsZS0xMDUgYWN0aXZlOnNjYWxlLTk1IHRyYW5zaXRpb24tYWxsIHRleHQtc20gc2hhZG93LTJ4bCBzaGFkb3ctcHJpbWFyeS8yMFwiPlxuICAgICAgICAgICAgICBCUk9BRENBU1RcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLThcIj5cbiAgICAgICAge29ubGluZUNsYXNzZXMubWFwKGNscyA9PiAoXG4gICAgICAgICAgPGRpdiBrZXk9e2Nscy5pZH0gY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcC0xMCByb3VuZGVkLVszMnB4XSByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gZ3JvdXAgaG92ZXI6Ym9yZGVyLXByaW1hcnkvMjAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNTAwIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItOCByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHctMyBoLTMgcm91bmRlZC1mdWxsICR7Y2xzLnR5cGUgPT09ICd6b29tJyA/ICdiZy1wcmltYXJ5IGFuaW1hdGUtcHVsc2UnIDogJ2JnLWluZGlnby01MDAgYW5pbWF0ZS1wdWxzZSd9YH0gLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy1bMC4zZW1dIHRleHQtc2xhdGUtNDAwIGl0YWxpY1wiPkxJVkVfe2Nscy50eXBlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gaGFuZGxlRGVsZXRlKCdvbmxpbmVDbGFzc2VzJywgY2xzLmlkKX0gY2xhc3NOYW1lPVwicC0zIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1yZWQtNTAwIHRyYW5zaXRpb24tYWxsIGhvdmVyOmJnLXJlZC01MFwiPlxuICAgICAgICAgICAgICAgIDxUcmFzaDIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJsYWNrIHRleHQtc2xhdGUtOTAwIGl0YWxpYyB0cmFja2luZy10aWdodGVyIHVwcGVyY2FzZSBtYi0yIHJlbGF0aXZlIHotMTAgZ3JvdXAtaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb24tY29sb3JzXCI+e2Nscy50aXRsZX08L2g0PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCB0cnVuY2F0ZSBtYi0xMCByZWxhdGl2ZSB6LTEwIG9wYWNpdHktNTBcIj57Y2xzLmxpbmt9PC9wPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8YSBcbiAgICAgICAgICAgICAgaHJlZj17Y2xzLmxpbmt9IFxuICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIiBcbiAgICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiIFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTQgdGV4dC1bMTBweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXByaW1hcnkgaG92ZXI6dGV4dC1wcmltYXJ5LWRhcmsgdHJhbnNpdGlvbi1jb2xvcnMgcmVsYXRpdmUgei0xMFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICBWQUxESUFURSBMSU5LICZyYXJyO1xuICAgICAgICAgICAgPC9hPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgcC0xMCBvcGFjaXR5LVswLjAyXSBwb2ludGVyLWV2ZW50cy1ub25lIGdyb3VwLWhvdmVyOm9wYWNpdHktWzAuMDVdIHRyYW5zaXRpb24tb3BhY2l0eVwiPlxuICAgICAgICAgICAgICAgPFZpZGVvIGNsYXNzTmFtZT1cInctMzIgaC0zMiB0ZXh0LXByaW1hcnlcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgY29uc3QgcmVuZGVyQWRtaW5zID0gKCkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xMlwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBwLTEyIHJvdW5kZWQtWzQwcHhdIHNoYWRvdy1zbVwiPlxuICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBtYi0xMCB0ZXh0LXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCB1cHBlcmNhc2UgaXRhbGljIHRyYWNraW5nLXRpZ2h0ZXJcIj5cbiAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy03IGgtNyB0ZXh0LXByaW1hcnkvNDBcIiAvPiB7dCgnZGFzaC5hZG1pbi5hdXRob3JpemVOZXcnKX1cbiAgICAgICAgPC9oMz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy1bMC4zZW1dIHB4LTEgaXRhbGljXCI+QWRtaW4gU2VjdXJpdHkgRW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIiBcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJHb29nbGUgQWNjb3VudCBFbWFpbFwiIFxuICAgICAgICAgICAgICB2YWx1ZT17bmV3QXV0aEFkbWluLmVtYWlsfSBcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0TmV3QXV0aEFkbWluKHsuLi5uZXdBdXRoQWRtaW4sIGVtYWlsOiBlLnRhcmdldC52YWx1ZX0pfSBcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsIHB4LTYgcHktNSB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciBwbGFjZWhvbGRlcjp0ZXh0LXNsYXRlLTMwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvMzAgdHJhbnNpdGlvbi1hbGwgZm9udC1tb25vXCIgXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIGZvbnQtYmxhY2sgdHJhY2tpbmctWzAuM2VtXSBweC0xIGl0YWxpY1wiPlNlY3VyaXR5IEFjY2VzcyBUb2tlbjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRGVzaWduYXRlIFRva2VuXCIgXG4gICAgICAgICAgICAgIHZhbHVlPXtuZXdBdXRoQWRtaW4ucGFzc3dvcmR9IFxuICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXROZXdBdXRoQWRtaW4oey4uLm5ld0F1dGhBZG1pbiwgcGFzc3dvcmQ6IGUudGFyZ2V0LnZhbHVlfSl9IFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGwgcHgtNiBweS01IHRleHQtc2xhdGUtOTAwIHRleHQteHMgZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCBwbGFjZWhvbGRlcjp0ZXh0LXNsYXRlLTMwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvMzAgdHJhbnNpdGlvbi1hbGwgZm9udC1tb25vXCIgXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVBZGRBdXRoQWRtaW59IGNsYXNzTmFtZT1cIm10LTEwIGJnLXByaW1hcnkgdGV4dC13aGl0ZSBmb250LWJsYWNrIHVwcGVyY2FzZSBpdGFsaWMgdHJhY2tpbmctWzAuMmVtXSBweC0xMCBweS01IHJvdW5kZWQtMnhsIGhvdmVyOnNjYWxlLTEwNSBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgdGV4dC1zbSBzaGFkb3ctMnhsIHNoYWRvdy1wcmltYXJ5LzIwXCI+XG4gICAgICAgICAgQ29tbWl0IEF1dGhvcml6YXRpb25cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzaGFkb3ctc20gcm91bmRlZC1bNDBweF0gb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cteC1hdXRvXCI+XG4gICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImJnLXNsYXRlLTUwIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLVswLjNlbV0gdGV4dC1zbGF0ZS00MDAgaXRhbGljIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHgtMTAgcHktNlwiPkFETUlOSVNUUkFUT1JfSUQ8L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweC0xMCBweS02XCI+U0VDVVJJVFlfVE9LRU48L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweC0xMCBweS02IHRleHQtcmlnaHRcIj5QUk9UT0NPTFM8L3RoPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICAgIHthdXRob3JpemVkQWRtaW5zLm1hcChhZG1pbiA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17YWRtaW4uaWR9IGNsYXNzTmFtZT1cImhvdmVyOmJnLXNsYXRlLTUwLzUwIHRyYW5zaXRpb24tY29sb3JzIGdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHgtMTAgcHktOCB0ZXh0LXNtIGZvbnQtYmxhY2sgdGV4dC1zbGF0ZS05MDAgdXBwZXJjYXNlIHRyYWNraW5nLXRpZ2h0IGl0YWxpY1wiPnthZG1pbi5lbWFpbH08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB4LTEwIHB5LTggdGV4dC14cyB0ZXh0LXNsYXRlLTUwMCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0XCI+e2FkbWluLnBhc3N3b3JkfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHgtMTAgcHktOCB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gaGFuZGxlRGVsZXRlKCdhdXRob3JpemVkQWRtaW5zJywgYWRtaW4uaWQpfSBjbGFzc05hbWU9XCJwLTQgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGwgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1yZWQtNTAwIGhvdmVyOmJnLXJlZC01MCB0cmFuc2l0aW9uLWFsbCBncm91cC1ob3ZlcjpzY2FsZS0xMTAgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xuXG4gIGNvbnN0IHBhcGVyTnVtUmVmID0gUmVhY3QudXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQ+KG51bGwpO1xuICBjb25zdCBzdHVkZW50SW5kZXhSZWYgPSBSZWFjdC51c2VSZWY8SFRNTElucHV0RWxlbWVudD4obnVsbCk7XG4gIGNvbnN0IG1hcmtzUmVmID0gUmVhY3QudXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQ+KG51bGwpO1xuXG4gIGNvbnN0IHJlbmRlck1hcmtzID0gKCkgPT4ge1xuICAgIGNvbnN0IGZpbHRlcmVkUmVzdWx0cyA9IHBhcGVyUmVzdWx0cy5maWx0ZXIociA9PiB7XG4gICAgICBjb25zdCB5ZWFyTWF0Y2ggPSBtYXJrc0ZpbHRlclllYXIgPT09ICdhbGwnIHx8IHIueWVhcklkID09PSBtYXJrc0ZpbHRlclllYXI7XG4gICAgICBjb25zdCBwYXBlck1hdGNoID0gbWFya3NGaWx0ZXJQYXBlciA9PT0gJ2FsbCcgfHwgci5wYXBlck51bWJlciA9PT0gbWFya3NGaWx0ZXJQYXBlcjtcbiAgICAgIHJldHVybiB5ZWFyTWF0Y2ggJiYgcGFwZXJNYXRjaDtcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMTIgcGItMjBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktOFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBwLTEwIHJvdW5kZWQtWzQ1cHhdIHNoYWRvdy1zbSByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIHAtMTAgb3BhY2l0eS01IHBvaW50ZXItZXZlbnRzLW5vbmUgZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTEwMDBcIj5cbiAgICAgICAgICAgICAgICA8QmFyQ2hhcnQzIGNsYXNzTmFtZT1cInctMzIgaC0zMiB0ZXh0LXByaW1hcnlcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBtYi0xMCB0ZXh0LXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCB1cHBlcmNhc2UgaXRhbGljIHRyYWNraW5nLXRpZ2h0ZXIgcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICAgICAgICAgIHt0KCdkYXNoLmFkbWluLnVwbG9hZE1hcmtzJyl9XG4gICAgICAgICAgICAgIDwvaDM+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy00IGdhcC02IHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMSBpdGFsaWNcIj5CYXRjaCBZZWFyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UGFwZXJSZXN1bHQueWVhcklkfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld1BhcGVyUmVzdWx0KHsuLi5uZXdQYXBlclJlc3VsdCwgeWVhcklkOiBlLnRhcmdldC52YWx1ZX0pfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC02IHB5LTUgdGV4dC1zbGF0ZS05MDAgdGV4dC14cyBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVzdCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvMzAgdHJhbnNpdGlvbi1hbGwgYXBwZWFyYW5jZS1ub25lIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgQmF0Y2g8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICB7YWNhZGVtaWNZZWFycy5tYXAoeSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17eS5pZH0gdmFsdWU9e3kuaWR9Pnt5LnllYXJ9IEJBVENIPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtNCB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdy00IGgtNCB0ZXh0LXNsYXRlLTQwMCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIGZvbnQtYmxhY2sgdHJhY2tpbmctWzAuM2VtXSBweC0xIGl0YWxpY1wiPkV4YW0gUmVmZXJlbmNlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgcmVmPXtwYXBlck51bVJlZn1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiIFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UGFwZXJSZXN1bHQucGFwZXJOdW1iZXJ9IFxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXROZXdQYXBlclJlc3VsdCh7Li4ubmV3UGFwZXJSZXN1bHQsIHBhcGVyTnVtYmVyOiBwYXJzZUludChlLnRhcmdldC52YWx1ZSkgfHwgMX0pfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSBzdHVkZW50SW5kZXhSZWYuY3VycmVudD8uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsIHB4LTYgcHktNSB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXhzIGZvbnQtYmxhY2sgdHJhY2tpbmctd2lkZXN0IGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHJpbWFyeS8zMCB0cmFuc2l0aW9uLWFsbFwiIFxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMSBpdGFsaWNcIj5DYW5kaWRhdGUgSW5kZXg8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICByZWY9e3N0dWRlbnRJbmRleFJlZn1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIDAwMDFcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UGFwZXJSZXN1bHQuc3R1ZGVudEluZGV4fSBcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0TmV3UGFwZXJSZXN1bHQoey4uLm5ld1BhcGVyUmVzdWx0LCBzdHVkZW50SW5kZXg6IGUudGFyZ2V0LnZhbHVlfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIG1hcmtzUmVmLmN1cnJlbnQ/LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bCBweC02IHB5LTUgdGV4dC1zbGF0ZS05MDAgdGV4dC14cyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS0zMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzMwIHRyYW5zaXRpb24tYWxsIGZvbnQtbW9ub1wiIFxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIHtuZXdQYXBlclJlc3VsdC5zdHVkZW50SW5kZXggJiYgc3R1ZGVudHMuZmluZChzID0+IHMuc3R1ZGVudElkID09PSBuZXdQYXBlclJlc3VsdC5zdHVkZW50SW5kZXgpICYmIChcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bOHB4XSB0ZXh0LXByaW1hcnkgZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHB4LTEgbXQtMiBhbmltYXRlLXB1bHNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgSWRlbnRpZmllZDoge3N0dWRlbnRzLmZpbmQocyA9PiBzLnN0dWRlbnRJZCA9PT0gbmV3UGFwZXJSZXN1bHQuc3R1ZGVudEluZGV4KT8ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLVswLjNlbV0gcHgtMSBpdGFsaWNcIj5BZ2dyZWdhdGUgKCUpPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgcmVmPXttYXJrc1JlZn1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiIFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjAtMTAwXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld1BhcGVyUmVzdWx0Lm1hcmtzfSBcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0TmV3UGFwZXJSZXN1bHQoey4uLm5ld1BhcGVyUmVzdWx0LCBtYXJrczogcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIHx8IDB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykgaGFuZGxlQWRkUGFwZXJSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsIHB4LTYgcHktNSB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXhzIGZvbnQtYmxhY2sgdHJhY2tpbmctd2lkZXN0IGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHJpbWFyeS8zMCB0cmFuc2l0aW9uLWFsbCBmb250LW1vbm9cIiBcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUFkZFBhcGVyUmVzdWx0fSBjbGFzc05hbWU9XCJtdC0xMCBiZy1wcmltYXJ5IHRleHQtd2hpdGUgZm9udC1ibGFjayB1cHBlcmNhc2UgaXRhbGljIHRyYWNraW5nLVswLjJlbV0gcHgtMTAgcHktNSByb3VuZGVkLTJ4bCBob3ZlcjpzY2FsZS0xMDMgYWN0aXZlOnNjYWxlLTk1IHRyYW5zaXRpb24tYWxsIHRleHQtc20gc2hhZG93LXhsIHNoYWRvdy1wcmltYXJ5LzIwIHctZnVsbCBtZDp3LWF1dG9cIj5cbiAgICAgICAgICAgICAgICBDb21taXQgUmVjb3JkICYgU3luYyBTdGFuZGluZ3NcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzaGFkb3ctc20gcm91bmRlZC1bNDVweF0gb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTUwLzUwIHB4LTEwIHB5LTYgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTEwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy1bMC4zZW1dIHRleHQtc2xhdGUtNDAwIGl0YWxpY1wiPlRyYW5zbWl0dGVkIFNlcXVlbmNlIERhdGE8L2g0PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRleHQtcHJpbWFyeSBpdGFsaWNcIj57ZmlsdGVyZWRSZXN1bHRzLmxlbmd0aH0gUkVDT1JEUyBGT1VORDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImJnLXNsYXRlLTUwIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLVswLjNlbV0gdGV4dC1zbGF0ZS00MDAgaXRhbGljIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0xMDAvNTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHgtMTAgcHktNlwiPlBST1RPQ09MPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHgtMTAgcHktNlwiPkJBVENIX0NPUkU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweC0xMCBweS02XCI+UEFQRVI8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweC0xMCBweS02XCI+SU5ERVhfU0VSSUFMPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHgtMTAgcHktNlwiPk5BTUU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweC0xMCBweS02XCI+QUdHUkVHQVRFPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHgtMTAgcHktNiB0ZXh0LXJpZ2h0XCI+U1RBTkRJTkc8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtmaWx0ZXJlZFJlc3VsdHMuc29ydCgoYSwgYikgPT4gYi5wYXBlck51bWJlciAtIGEucGFwZXJOdW1iZXIgfHwgYi5tYXJrcyAtIGEubWFya3MpLm1hcChyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0dWRlbnQgPSBzdHVkZW50cy5maW5kKHMgPT4gcy5zdHVkZW50SWQgPT09IHJlcy5zdHVkZW50SW5kZXggfHwgcy5pbmRleE51bWJlciA9PT0gcmVzLnN0dWRlbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e3Jlcy5pZH0gY2xhc3NOYW1lPVwiaG92ZXI6Ymctc2xhdGUtNTAvNTAgdHJhbnNpdGlvbi1jb2xvcnMgZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB4LTEwIHB5LThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZURlbGV0ZSgncGFwZXJSZXN1bHRzJywgcmVzLmlkKX0gY2xhc3NOYW1lPVwicC00IGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtcmVkLTUwMCBob3ZlcjpiZy1yZWQtNTAgdHJhbnNpdGlvbi1hbGwgZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIHNoYWRvdy1zbSBob3Zlcjpyb3RhdGUtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUcmFzaDIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC0xMCBweS04IHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBpdGFsaWNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWNhZGVtaWNZZWFycy5maW5kKHkgPT4geS5pZCA9PT0gcmVzLnllYXJJZCk/LnllYXIgfHwgJ04vQSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC0xMCBweS04IHRleHQtc20gZm9udC1ibGFjayB0ZXh0LXNsYXRlLTkwMCB1cHBlcmNhc2UgdHJhY2tpbmctdGlnaHQgaXRhbGljXCI+UEFQRVJfe3Jlcy5wYXBlck51bWJlcn08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHgtMTAgcHktOCB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3QgZ3JvdXAtaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb24tY29sb3JzXCI+e3Jlcy5zdHVkZW50SW5kZXh9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB4LTEwIHB5LTggdGV4dC1bMTBweF0gZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlIHRydW5jYXRlIG1heC13LVsxNTBweF1cIiB0aXRsZT17c3R1ZGVudD8ubmFtZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3N0dWRlbnQ/Lm5hbWUgfHwgJ1VOS05PV05fTk9ERSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC0xMCBweS04IHRleHQteGwgZm9udC1ibGFjayB0ZXh0LXNsYXRlLTkwMCBpdGFsaWMgdHJhY2tpbmctdGlnaHRlclwiPntyZXMubWFya3N9JTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC0xMCBweS04IHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC00IHB5LTIgYmctc2xhdGUtNTAgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgdGV4dC1zbGF0ZS02MDAgdHJhbnNpdGlvbi1hbGwgZ3JvdXAtaG92ZXI6YmctcHJpbWFyeSBncm91cC1ob3Zlcjp0ZXh0LXdoaXRlIGdyb3VwLWhvdmVyOmJvcmRlci1wcmltYXJ5IHNoYWRvdy1zbVwiPiN7cmVzLnJhbmt9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAge2ZpbHRlcmVkUmVzdWx0cy5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjb2xTcGFuPXs3fSBjbGFzc05hbWU9XCJweC0xMCBweS0zMiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8TWljcm9zY29wZSBjbGFzc05hbWU9XCJ3LTE2IGgtMTYgdGV4dC1zbGF0ZS0xMDAgbXgtYXV0byBtYi02XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDAgdGV4dC1bMTBweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IGl0YWxpYyBvcGFjaXR5LTUwXCI+Tm8gc2VxdWVuY2UgZGF0YSBmb3VuZCBtYXRjaGluZyB0aGUgY3VycmVudCBtYXRyaXggY29uZmlndXJhdGlvbi48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IEljb25NYXA6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7XG4gICAgTWljcm9zY29wZSwgRG5hLCBIZWFydCwgQnJhaW4sIEFjdGl2aXR5LCBHcmFkdWF0aW9uQ2FwLCBCb29rT3BlbiwgTWFwUGluLCBMaWdodGJ1bGIsIEZpbGVUZXh0LCBDYWxlbmRhckNoZWNrLCBDaGVja0NpcmNsZTIsIENsb2NrXG4gIH07XG5cbiAgY29uc3QgZ2V0SW1hZ2VQYXRoID0gKHBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwpID0+IHtcbiAgICBpZiAoIXBhdGggfHwgdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnIHx8IHBhdGgudHJpbSgpID09PSAnJykgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBcbiAgICAvLyBSb2J1c3RuZXNzOiBSZWplY3QgaWYgY29udGFpbnMgc3BhY2VzIG9yIGlzIHRvbyBsb25nIChsaWtlbHkgbm90IGEgcGF0aClcbiAgICBpZiAocGF0aC50cmltKCkuaW5jbHVkZXMoJyAnKSB8fCBwYXRoLnRyaW0oKS5sZW5ndGggPiAyMDApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKHBhdGguc3RhcnRzV2l0aCgnaHR0cCcpIHx8IHBhdGguc3RhcnRzV2l0aCgnZGF0YTonKSkge1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybUltYWdlVXJsKHBhdGgpIHx8IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgY2xlYW5QYXRoID0gcGF0aC50cmltKCkuc3RhcnRzV2l0aCgnLycpID8gcGF0aC50cmltKCkgOiBgLyR7cGF0aC50cmltKCl9YDtcbiAgICBjb25zdCBiYXNlID0gKChpbXBvcnQubWV0YSBhcyBhbnkpLmVudi5CQVNFX1VSTCB8fCAnLycpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XG4gICAgcmV0dXJuIGAke2Jhc2V9JHtjbGVhblBhdGh9YDtcbiAgfTtcblxuICBjb25zdCByZW5kZXJIb21lTWFuYWdlciA9ICgpID0+IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YHNwYWNlLXktMTIgJHtob21lUHJldmlld01vZGUgPyAnbGc6Z3JpZCBsZzpncmlkLWNvbHMtMiBsZzpnYXAtMTIgbGc6c3BhY2UteS0wJyA6ICcnfWB9PlxuICAgICAgey8qIENvbmZpZ3VyYXRpb24gQ29sdW1uICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTggbWF4LWgtWzg1dmhdIG92ZXJmbG93LXktYXV0byBwci00IGN1c3RvbS1zY3JvbGxiYXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gc3RpY2t5IHRvcC0wIGJnLXNsYXRlLTUwIHotMjAgcGItNFwiPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJsYWNrIHVwcGVyY2FzZSBpdGFsaWMgdHJhY2tpbmctdGlnaHRlciB0ZXh0LXNsYXRlLTkwMFwiPk5leHVzX0hvbWVfQ29yZTwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XG4gICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5jb25maXJtKFwiUmVzZXQgYWxsIGhlcm8gc2xpZGVzIHRvIGRlZmF1bHQgbG9jYWwgaW1hZ2VzP1wiKSkge1xuICAgICAgICAgICAgICAgICAgc2V0SG9tZUNvbnRlbnQoe1xuICAgICAgICAgICAgICAgICAgICAuLi5ob21lQ29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgaGVyb1NsaWRlczogW1xuICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICdzMScsIHRpdGxlOiAnQmlvX0VYQ0VMTEVOQ0UnLCBzdWJ0aXRsZTogJ01BU1RFUiBUSEUgRUxFTUVOVFMnLCBpbWFnZVVybDogJy8xLmF2aWYnLCBjdGFUZXh0OiAnSm9pbl9Ob3cnLCBjdGFVcmw6ICcvbG1zJywgdGl0bGVGb250U2l6ZTogMTAsIHRpdGxlRm9udFNpemVNb2JpbGU6IDQgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnczInLCB0aXRsZTogJ0FEVkFOQ0VEX0NPTkNFUFRTJywgc3VidGl0bGU6ICdCRVlPTkQgVEhFIEJBU0lDUycsIGltYWdlVXJsOiAnLzIuYXZpZicsIGN0YVRleHQ6ICdFeHBsb3JlJywgY3RhVXJsOiAnL2xtcycsIHRpdGxlRm9udFNpemU6IDEwLCB0aXRsZUZvbnRTaXplTW9iaWxlOiA0IH0sXG4gICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ3MzJywgdGl0bGU6ICdGVVRVUkVfU0NJRU5DRScsIHN1YnRpdGxlOiAnSU5OT1ZBVElWRSBMRUFSTklORycsIGltYWdlVXJsOiAnLzMuYXZpZicsIGN0YVRleHQ6ICdHZXRfU3RhcnRlZCcsIGN0YVVybDogJy9sbXMnLCB0aXRsZUZvbnRTaXplOiAxMCwgdGl0bGVGb250U2l6ZU1vYmlsZTogNCB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIGJnLXJlZC01MCB0ZXh0LXJlZC01MDAgcm91bmRlZC14bCB0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgYm9yZGVyIGJvcmRlci1yZWQtMTAwIGhvdmVyOmJnLXJlZC01MDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWFsbCBzaHJpbmstMFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFJlc2V0X1NsaWRlc1xuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRIb21lUHJldmlld01vZGUoIWhvbWVQcmV2aWV3TW9kZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLXhsIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCB0cmFuc2l0aW9uLWFsbCAke2hvbWVQcmV2aWV3TW9kZSA/ICdiZy1wcmltYXJ5IHRleHQtYmxhY2snIDogJ2JnLXNsYXRlLTIwMCB0ZXh0LXNsYXRlLTUwMCd9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2hvbWVQcmV2aWV3TW9kZSA/ICdDbG9zZV9QcmV2aWV3JyA6ICdMaXZlX1ByZXZpZXcnfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7LyogR2xvYmFsIElkZW50aXR5ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHAtOCByb3VuZGVkLTN4bCBzaGFkb3ctc21cIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIHVwcGVyY2FzZSBpdGFsaWMgbWItNiB0ZXh0LXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPFVzZXJzIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1wcmltYXJ5XCIgLz4gVGVhY2hlciBJZGVudGl0eVxuICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy13aWRlc3QgcHgtMSBibG9jayBtYi0yXCI+VGVhY2hlciBGdWxsIE5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT17aG9tZUNvbnRlbnQudGVhY2hlck5hbWV9IG9uQ2hhbmdlPXtlID0+IHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgdGVhY2hlck5hbWU6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLXhsIHB4LTQgcHktMyB0ZXh0LXNtIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHJpbWFyeS81MFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy13aWRlc3QgcHgtMSBibG9jayBtYi0yXCI+VGVhY2hlciBNZXRob2RvbG9neTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXtob21lQ29udGVudC50ZWFjaGVyTWV0aG9kb2xvZ3l9IG9uQ2hhbmdlPXtlID0+IHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgdGVhY2hlck1ldGhvZG9sb2d5OiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTMgdGV4dC1zbSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvNTBcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIGZvbnQtYmxhY2sgdHJhY2tpbmctd2lkZXN0IHB4LTEgYmxvY2sgbWItMlwiPkNvcmUgSW1hZ2UgKEF2YXRhci9JY29ucyk8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT17aG9tZUNvbnRlbnQudGVhY2hlckltYWdlVXJsfSBvbkNoYW5nZT17ZSA9PiBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIHRlYWNoZXJJbWFnZVVybDogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQtc20gZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzUwXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVzdCBweC0xIGJsb2NrIG1iLTJcIj5BbGxvd2VkIERvbWFpbiAoZm9yIFlvdVR1YmUgUGxheWVyKTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gOiAnJ30gXG4gICAgICAgICAgICAgICAgdmFsdWU9e2hvbWVDb250ZW50LmFsbG93ZWREb21haW4gfHwgJyd9IFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgYWxsb3dlZERvbWFpbjogZS50YXJnZXQudmFsdWV9KX0gXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQtc20gZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzUwIGZvbnQtbW9ub1wiIFxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNDAwIG10LTEgcHgtMVwiPkRlZmF1bHQ6IHt0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gOiAnJ308L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEhlcm8gUHJvdG9jb2xzIC0gU2ltcGxpZmllZCBmb3IgMyBUZXh0cyBPbmx5ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHAtOCByb3VuZGVkLTN4bCBzaGFkb3ctc21cIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIHVwcGVyY2FzZSBpdGFsaWMgbWItNiB0ZXh0LXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPExheW91dEdyaWQgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXByaW1hcnlcIiAvPiBIZXJvIFNsaWRlcyAoVGV4dCBDb250ZW50KVxuICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgICAgICAgIHsoaG9tZUNvbnRlbnQuaGVyb1NsaWRlcyB8fCBbXSkubWFwKChzbGlkZSwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtzbGlkZS5pZH0gY2xhc3NOYW1lPVwicC02IGJnLXNsYXRlLTUwIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMTAwIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRleHQtcHJpbWFyeSBpdGFsaWNcIj5TbGlkZV8we2lkeCArIDF9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWRlcyA9IFsuLi4oaG9tZUNvbnRlbnQuaGVyb1NsaWRlcyB8fCBbXSldO1xuICAgICAgICAgICAgICAgICAgICAgIHNsaWRlcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIGhlcm9TbGlkZXM6IHNsaWRlc30pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgdGV4dC1yZWQtNTAwIGhvdmVyOmJnLXJlZC01MCByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzhweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdGV4dC1zbGF0ZS00MDAgcHgtMSBtYi0xIGJsb2NrIGl0YWxpY1wiPlRpdGxlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NsaWRlLnRpdGxlfSBcbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGlkZXMgPSBbLi4uKGhvbWVDb250ZW50Lmhlcm9TbGlkZXMgfHwgW10pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1tpZHhdID0geyAuLi5zbGlkZSwgdGl0bGU6IGUudGFyZ2V0LnZhbHVlIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIGhlcm9TbGlkZXM6IHNsaWRlc30pO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0yIHRleHQteHMgZm9udC1ib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzhweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdGV4dC1zbGF0ZS00MDAgcHgtMSBtYi0xIGJsb2NrIGl0YWxpY1wiPlN1YnRpdGxlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NsaWRlLnN1YnRpdGxlfSBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpZGVzID0gWy4uLihob21lQ29udGVudC5oZXJvU2xpZGVzIHx8IFtdKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1tpZHhdID0geyAuLi5zbGlkZSwgc3VidGl0bGU6IGUudGFyZ2V0LnZhbHVlIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgaGVyb1NsaWRlczogc2xpZGVzfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0yIHRleHQteHMgZm9udC1ib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bOHB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0ZXh0LXNsYXRlLTQwMCBweC0xIG1iLTEgYmxvY2sgaXRhbGljXCI+QmFja2dyb3VuZCBJbWFnZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17WycvMS5hdmlmJywgJy8yLmF2aWYnLCAnLzMuYXZpZiddLmluY2x1ZGVzKHNsaWRlLmltYWdlVXJsIHx8ICcnKSA/IHNsaWRlLmltYWdlVXJsIDogJ2N1c3RvbSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGlkZXMgPSBbLi4uKGhvbWVDb250ZW50Lmhlcm9TbGlkZXMgfHwgW10pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsICE9PSAnY3VzdG9tJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzW2lkeF0gPSB7IC4uLnNsaWRlLCBpbWFnZVVybDogdmFsIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIGhlcm9TbGlkZXM6IHNsaWRlc30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIGJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0yIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCB0ZXh0LXNsYXRlLTkwMCBhcHBlYXJhbmNlLW5vbmUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiLzEuYXZpZlwiPkxvY2FsOiBJbWFnZSAwMTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiLzIuYXZpZlwiPkxvY2FsOiBJbWFnZSAwMjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiLzMuYXZpZlwiPkxvY2FsOiBJbWFnZSAwMzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY3VzdG9tXCI+LS0gQ3VzdG9tIC8gRXh0ZXJuYWwgLS08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAge2dldEltYWdlUGF0aChzbGlkZS5pbWFnZVVybCkgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLWxnIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzaHJpbmstMCBzaGFkb3ctc20gYmctc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtnZXRJbWFnZVBhdGgoc2xpZGUuaW1hZ2VVcmwpfSBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlclwiIG9uRXJyb3I9eyhlKSA9PiBlLmN1cnJlbnRUYXJnZXQuc3JjID0gJyd9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICB7KCFbJy8xLmF2aWYnLCAnLzIuYXZpZicsICcvMy5hdmlmJ10uaW5jbHVkZXMoc2xpZGUuaW1hZ2VVcmwgfHwgJycpIHx8IHNsaWRlLmltYWdlVXJsID09PSAnJykgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUGFzdGUgRXh0ZXJuYWwgSW1hZ2UgVVJMXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NsaWRlLmltYWdlVXJsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpZGVzID0gWy4uLihob21lQ29udGVudC5oZXJvU2xpZGVzIHx8IFtdKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzW2lkeF0gPSB7IC4uLnNsaWRlLCBpbWFnZVVybDogZS50YXJnZXQudmFsdWUgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIGhlcm9TbGlkZXM6IHNsaWRlc30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgbXQtMiBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLXhsIHB4LTQgcHktMiB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wcmltYXJ5LzUwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVs4cHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRleHQtc2xhdGUtNDAwIHB4LTEgbWItMSBibG9jayBpdGFsaWNcIj5CdXR0b24gVGV4dDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzbGlkZS5jdGFUZXh0IHx8ICcnfSBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpZGVzID0gWy4uLihob21lQ29udGVudC5oZXJvU2xpZGVzIHx8IFtdKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1tpZHhdID0geyAuLi5zbGlkZSwgY3RhVGV4dDogZS50YXJnZXQudmFsdWUgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SG9tZUNvbnRlbnQoey4uLmhvbWVDb250ZW50LCBoZXJvU2xpZGVzOiBzbGlkZXN9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTIgdGV4dC14cyBmb250LWJvbGRcIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVs4cHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRleHQtc2xhdGUtNDAwIHB4LTEgbWItMSBibG9jayBpdGFsaWNcIj5CdXR0b24gVVJMPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NsaWRlLmN0YVVybCB8fCAnJ30gXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWRlcyA9IFsuLi4oaG9tZUNvbnRlbnQuaGVyb1NsaWRlcyB8fCBbXSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNbaWR4XSA9IHsgLi4uc2xpZGUsIGN0YVVybDogZS50YXJnZXQudmFsdWUgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SG9tZUNvbnRlbnQoey4uLmhvbWVDb250ZW50LCBoZXJvU2xpZGVzOiBzbGlkZXN9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTIgdGV4dC14cyBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG5cbiAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzbGlkZXMgPSBob21lQ29udGVudC5oZXJvU2xpZGVzIHx8IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsSW1hZ2UgPSBMT0NBTF9TTElERVNbc2xpZGVzLmxlbmd0aCAlIExPQ0FMX1NMSURFUy5sZW5ndGhdLmltYWdlVXJsO1xuICAgICAgICAgICAgICAgIHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgaGVyb1NsaWRlczogWy4uLnNsaWRlcywgeyBcbiAgICAgICAgICAgICAgICAgIGlkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ05FV19TTElERV9USVRMRScsXG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZTogJ05FV19TVUJUSVRMRScsXG4gICAgICAgICAgICAgICAgICBjdGFUZXh0OiAnRVhQTE9SRScsXG4gICAgICAgICAgICAgICAgICBjdGFVcmw6ICcvbG1zJyxcbiAgICAgICAgICAgICAgICAgIGltYWdlVXJsOiBsb2NhbEltYWdlLCBcbiAgICAgICAgICAgICAgICAgIHRpdGxlRm9udFNpemU6IDEwLFxuICAgICAgICAgICAgICAgICAgdGl0bGVGb250U2l6ZU1vYmlsZTogNFxuICAgICAgICAgICAgICAgIH1dfSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05MDAgdGV4dC13aGl0ZSBmb250LWJsYWNrIHB5LTQgcm91bmRlZC14bCB0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IGhvdmVyOmJnLXByaW1hcnkgaG92ZXI6dGV4dC1ibGFjayB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgQWRkX05ld19TbGlkZV9MYXllclxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcC04IHJvdW5kZWQtM3hsIHNoYWRvdy1zbVwiPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYmxhY2sgdXBwZXJjYXNlIGl0YWxpYyBtYi02IHRleHQtc2xhdGUtOTAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8VHlwZSBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtcHJpbWFyeVwiIC8+IEFib3V0IFNlY3Rpb25cbiAgICAgICAgICA8L2gzPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJBYm91dCBUaXRsZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e2hvbWVDb250ZW50LmFib3V0VGl0bGV9IG9uQ2hhbmdlPXtlID0+IHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgYWJvdXRUaXRsZTogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQtc20gZm9udC1ib2xkXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ibGFjayB0cmFja2luZy13aWRlc3QgcHgtMSBibG9jayBtYi0xXCI+VGVhY2hlciBQcm9maWxlIEltYWdlIChVc2UgLzEuYXZpZiBmb3IgbG9jYWwgb3IgYW4gZXh0ZXJuYWwgVVJMKTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXtob21lQ29udGVudC50ZWFjaGVyQWJvdXRVcmx9IG9uQ2hhbmdlPXtlID0+IHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgdGVhY2hlckFib3V0VXJsOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJmbGV4LTEgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTMgdGV4dC1zbSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvNTBcIiAvPlxuICAgICAgICAgICAgICAgIHtnZXRJbWFnZVBhdGgoaG9tZUNvbnRlbnQudGVhY2hlckFib3V0VXJsKSAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTIgaC0xMiByb3VuZGVkLXhsIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzaGFkb3ctc20gYmctc2xhdGUtMTAwIGZsZXgtc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2dldEltYWdlUGF0aChob21lQ29udGVudC50ZWFjaGVyQWJvdXRVcmwpfSBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlclwiIG9uRXJyb3I9eyhlKSA9PiBlLmN1cnJlbnRUYXJnZXQuc3JjID0gJyd9IC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHRleHRhcmVhIHBsYWNlaG9sZGVyPVwiQWJvdXQgRGVzY3JpcHRpb24gKEhUTUwpXCIgcm93cz17Nn0gdmFsdWU9e2hvbWVDb250ZW50LmFib3V0UmljaFRleHR9IG9uQ2hhbmdlPXtlID0+IHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgYWJvdXRSaWNoVGV4dDogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQtc20gcmVzaXplLW5vbmVcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogU3luYyBQcm90b2NvbCAoV29yayBQcm9jZXNzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBwLTggcm91bmRlZC0zeGwgc2hhZG93LXNtXCI+XG4gICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ibGFjayB1cHBlcmNhc2UgaXRhbGljIG1iLTYgdGV4dC1zbGF0ZS05MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxBY3Rpdml0eSBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtcHJpbWFyeVwiIC8+IFN5bmMgUHJvdG9jb2wgU3RlcHNcbiAgICAgICAgICA8L2gzPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IG1iLThcIj5cbiAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIlN0ZXAgVGl0bGVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXtuZXdQcm9jZXNzU3RlcC50aXRsZX0gb25DaGFuZ2U9e2UgPT4gc2V0TmV3UHJvY2Vzc1N0ZXAoey4uLm5ld1Byb2Nlc3NTdGVwLCB0aXRsZTogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQteHNcIiAvPlxuICAgICAgICAgICAgPHRleHRhcmVhIHBsYWNlaG9sZGVyPVwiU3RlcCBEZXNjcmlwdGlvblwiIHZhbHVlPXtuZXdQcm9jZXNzU3RlcC5kZXNjcmlwdGlvbn0gb25DaGFuZ2U9e2UgPT4gc2V0TmV3UHJvY2Vzc1N0ZXAoey4uLm5ld1Byb2Nlc3NTdGVwLCBkZXNjcmlwdGlvbjogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQteHMgcmVzaXplLW5vbmVcIiByb3dzPXsyfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy00IHNtOmdyaWQtY29scy02IGdhcC0yXCI+XG4gICAgICAgICAgICAgIHtPYmplY3Qua2V5cyhJY29uTWFwKS5tYXAoaWNvbiA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgIGtleT17aWNvbn1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE5ld1Byb2Nlc3NTdGVwKHsuLi5uZXdQcm9jZXNzU3RlcCwgaWNvbn0pfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQtbGcgYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24tYWxsICR7bmV3UHJvY2Vzc1N0ZXAuaWNvbiA9PT0gaWNvbiA/ICdiZy1wcmltYXJ5LzIwIGJvcmRlci1wcmltYXJ5JyA6ICdiZy1zbGF0ZS01MCBib3JkZXItc2xhdGUtMTAwJ31gfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2ljb259XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge1JlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbk1hcFtpY29uXSB8fCBCb29rT3BlbiwgeyBjbGFzc05hbWU6IFwidy00IGgtNCB0ZXh0LXNsYXRlLTYwMFwiIH0pfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0ZXBzID0gaG9tZUNvbnRlbnQucHJvY2Vzc1N0ZXBzIHx8IFtdO1xuICAgICAgICAgICAgICAgIHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgcHJvY2Vzc1N0ZXBzOiBbLi4uc3RlcHMsIHsgLi4ubmV3UHJvY2Vzc1N0ZXAsIGlkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCkgfV19KTtcbiAgICAgICAgICAgICAgICBzZXROZXdQcm9jZXNzU3RlcCh7IHRpdGxlOiAnJywgZGVzY3JpcHRpb246ICcnLCBpY29uOiAnQWN0aXZpdHknIH0pO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTAwIHRleHQtd2hpdGUgZm9udC1ibGFjayBweS00IHJvdW5kZWQteGwgdGV4dC1bMTBweF0gdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBob3ZlcjpiZy1wcmltYXJ5IGhvdmVyOnRleHQtYmxhY2sgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBBZGRfUHJvdG9jb2xfU3RlcFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgIHsoaG9tZUNvbnRlbnQucHJvY2Vzc1N0ZXBzIHx8IFtdKS5tYXAoKHN0ZXAsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17c3RlcC5pZH0gY2xhc3NOYW1lPVwicC00IGJnLXNsYXRlLTUwIHJvdW5kZWQtMnhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXIgYm9yZGVyLXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC1sZyBiZy13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXByaW1hcnkgYm9yZGVyIGJvcmRlci1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7UmVhY3QuY3JlYXRlRWxlbWVudChJY29uTWFwW3N0ZXAuaWNvbl0gfHwgQm9va09wZW4sIHsgY2xhc3NOYW1lOiBcInctNCBoLTRcIiB9KX1cbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSBpdGFsaWMgdHJhY2tpbmctdGlnaHRcIj57c3RlcC50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RlcHMgPSBbLi4uKGhvbWVDb250ZW50LnByb2Nlc3NTdGVwcyB8fCBbXSldO1xuICAgICAgICAgICAgICAgICAgICBzdGVwcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0SG9tZUNvbnRlbnQoey4uLmhvbWVDb250ZW50LCBwcm9jZXNzU3RlcHM6IHN0ZXBzfSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1yZWQtNDAwIGhvdmVyOnRleHQtcmVkLTYwMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFNwZWNpYWwgUHJvZ3JhbSBQcm90b2NvbHMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcC04IHJvdW5kZWQtM3hsIHNoYWRvdy1zbVwiPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYmxhY2sgdXBwZXJjYXNlIGl0YWxpYyBtYi02IHRleHQtc2xhdGUtOTAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8TGF5ZXJzIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1wcmltYXJ5XCIgLz4gU3BlY2lhbCBQcm9ncmFtIEZlYXR1cmVzXG4gICAgICAgICAgPC9oMz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiU2VjdGlvbiBUaXRsZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e2hvbWVDb250ZW50LnNwZWNpYWxUaXRsZX0gb25DaGFuZ2U9e2UgPT4gc2V0SG9tZUNvbnRlbnQoey4uLmhvbWVDb250ZW50LCBzcGVjaWFsVGl0bGU6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLXhsIHB4LTQgcHktMyB0ZXh0LXNtXCIgLz5cbiAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIlNlY3Rpb24gU3VidGl0bGVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXtob21lQ29udGVudC5zcGVjaWFsU3VidGl0bGV9IG9uQ2hhbmdlPXtlID0+IHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgc3BlY2lhbFN1YnRpdGxlOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTMgdGV4dC1zbVwiIC8+XG4gICAgICAgICAgICA8dGV4dGFyZWEgcGxhY2Vob2xkZXI9XCJTZWN0aW9uIERlc2NyaXB0aW9uXCIgdmFsdWU9e2hvbWVDb250ZW50LnNwZWNpYWxEZXNjfSBvbkNoYW5nZT17ZSA9PiBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIHNwZWNpYWxEZXNjOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTMgdGV4dC1zbSByZXNpemUtbm9uZVwiIHJvd3M9ezN9IC8+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTEwMCBwdC02IG10LTZcIj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IG1iLTRcIj5BZGQgSGlnaGxpZ2h0IEZlYXR1cmU8L3A+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNCBtYi00XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiRmVhdHVyZSBUaXRsZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e25ld0ZlYXR1cmUudGl0bGV9IG9uQ2hhbmdlPXtlID0+IHNldE5ld0ZlYXR1cmUoey4uLm5ld0ZlYXR1cmUsIHRpdGxlOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLXhsIHB4LTQgcHktMyB0ZXh0LXhzXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJGZWF0dXJlIERlc2NyaXB0aW9uXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17bmV3RmVhdHVyZS5kZXNjcmlwdGlvbn0gb25DaGFuZ2U9e2UgPT4gc2V0TmV3RmVhdHVyZSh7Li4ubmV3RmVhdHVyZSwgZGVzY3JpcHRpb246IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cImJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQteHNcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBmZWF0dXJlcyA9IGhvbWVDb250ZW50LnNwZWNpYWxGZWF0dXJlcyB8fCBbXTtcbiAgICAgICAgICAgICAgICAgIHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgc3BlY2lhbEZlYXR1cmVzOiBbLi4uZmVhdHVyZXMsIHsgLi4ubmV3RmVhdHVyZSwgaWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSwgaWNvbjogJ1BsYXknIH1dfSk7XG4gICAgICAgICAgICAgICAgICBzZXROZXdGZWF0dXJlKHsgdGl0bGU6ICcnLCBkZXNjcmlwdGlvbjogJycsIGljb246ICdQbGF5JyB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS0xMDAgdGV4dC1zbGF0ZS05MDAgZm9udC1ibGFjayBweS0zIHJvdW5kZWQteGwgdGV4dC1bMTBweF0gdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBob3ZlcjpiZy1zbGF0ZS0yMDAgdHJhbnNpdGlvbi1hbGwgbWItNlwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBJbnNlcnRfRmVhdHVyZV9Ob2RlXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgeyhob21lQ29udGVudC5zcGVjaWFsRmVhdHVyZXMgfHwgW10pLm1hcCgoZmVhdCwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZmVhdC5pZH0gY2xhc3NOYW1lPVwicC0zIGJnLXNsYXRlLTUwIHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlciBib3JkZXItc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJ1bmNhdGUgbWF4LXctWzIwMHB4XVwiPntmZWF0LnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZWF0dXJlcyA9IFsuLi4oaG9tZUNvbnRlbnQuc3BlY2lhbEZlYXR1cmVzIHx8IFtdKV07XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgc3BlY2lhbEZlYXR1cmVzOiBmZWF0dXJlc30pO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1yZWQtNDAwIGhvdmVyOnRleHQtcmVkLTYwMFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVGVsZWdyYW0gVHJhbnNtaXNzaW9uIEdyaWQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcC04IHJvdW5kZWQtM3hsIHNoYWRvdy1zbVwiPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYmxhY2sgdXBwZXJjYXNlIGl0YWxpYyBtYi02IHRleHQtc2xhdGUtOTAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgPE1lc3NhZ2VDaXJjbGUgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXByaW1hcnlcIiAvPiBUZWxlZ3JhbSBDaGFubmVsc1xuICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkNoYW5uZWxzIFNlY3Rpb24gVGl0bGVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXtob21lQ29udGVudC50ZWxlZ3JhbVRpdGxlfSBvbkNoYW5nZT17ZSA9PiBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIHRlbGVncmFtVGl0bGU6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLXhsIHB4LTQgcHktMyB0ZXh0LXNtXCIgLz5cbiAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkNoYW5uZWxzIFNlY3Rpb24gU3VidGl0bGVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXtob21lQ29udGVudC50ZWxlZ3JhbVN1YnRpdGxlfSBvbkNoYW5nZT17ZSA9PiBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIHRlbGVncmFtU3VidGl0bGU6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLXhsIHB4LTQgcHktMyB0ZXh0LXNtXCIgLz5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXItdCBib3JkZXItc2xhdGUtMTAwIHB0LTZcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00IG1iLTRcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJDaGFubmVsIE5hbWVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXtuZXdUZWxlZ3JhbS5uYW1lfSBvbkNoYW5nZT17ZSA9PiBzZXROZXdUZWxlZ3JhbSh7Li4ubmV3VGVsZWdyYW0sIG5hbWU6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cImJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQteHNcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkNoYW5uZWwgVVJMXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17bmV3VGVsZWdyYW0udXJsfSBvbkNoYW5nZT17ZSA9PiBzZXROZXdUZWxlZ3JhbSh7Li4ubmV3VGVsZWdyYW0sIHVybDogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwiYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTMgdGV4dC14c1wiIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiQ292ZXIgSW1hZ2UgVVJMXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17bmV3VGVsZWdyYW0uaW1hZ2VVcmx9IG9uQ2hhbmdlPXtlID0+IHNldE5ld1RlbGVncmFtKHsuLi5uZXdUZWxlZ3JhbSwgaW1hZ2VVcmw6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cImJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQteHMgbWQ6Y29sLXNwYW4tMlwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5zID0gaG9tZUNvbnRlbnQudGVsZWdyYW1DaGFubmVscyB8fCBbXTtcbiAgICAgICAgICAgICAgICAgIHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgdGVsZWdyYW1DaGFubmVsczogWy4uLmNoYW5zLCB7IC4uLm5ld1RlbGVncmFtLCBpZDogRGF0ZS5ub3coKS50b1N0cmluZygpIH1dfSk7XG4gICAgICAgICAgICAgICAgICBzZXROZXdUZWxlZ3JhbSh7IG5hbWU6ICcnLCB1cmw6ICcnLCBpbWFnZVVybDogJycgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtMTAwIHRleHQtc2xhdGUtOTAwIGZvbnQtYmxhY2sgcHktMyByb3VuZGVkLXhsIHRleHQtWzEwcHhdIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgaG92ZXI6Ymctc2xhdGUtMjAwIHRyYW5zaXRpb24tYWxsIG1iLTZcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgRGVwbG95X0NoYW5uZWxfTGlua1xuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICB7KGhvbWVDb250ZW50LnRlbGVncmFtQ2hhbm5lbHMgfHwgW10pLm1hcCgoY2hhbiwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17Y2hhbi5pZH0gY2xhc3NOYW1lPVwicmVsYXRpdmUgZ3JvdXAgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gYXNwZWN0LXNxdWFyZSBib3JkZXIgYm9yZGVyLXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17dHJhbnNmb3JtSW1hZ2VVcmwoY2hhbi5pbWFnZVVybCl9IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGFucyA9IFsuLi4oaG9tZUNvbnRlbnQudGVsZWdyYW1DaGFubmVscyB8fCBbXSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIHRlbGVncmFtQ2hhbm5lbHM6IGNoYW5zfSk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLXJlZC01MDAvODAgb3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tb3BhY2l0eSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxUcmFzaDIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDb250YWN0IFZlY3RvciBOb2RlcyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBwLTggcm91bmRlZC0zeGwgc2hhZG93LXNtXCI+XG4gICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ibGFjayB1cHBlcmNhc2UgaXRhbGljIG1iLTYgdGV4dC1zbGF0ZS05MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICA8TWFwUGluIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1wcmltYXJ5XCIgLz4gQ29udGFjdCAmIEhRIElkZW50aXR5XG4gICAgICAgICAgPC9oMz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkNvbnRhY3QgVGl0bGVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXtob21lQ29udGVudC5jb250YWN0VGl0bGV9IG9uQ2hhbmdlPXtlID0+IHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgY29udGFjdFRpdGxlOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLXhsIHB4LTQgcHktMyB0ZXh0LXNtXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJDb250YWN0IFN1YnRpdGxlXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17aG9tZUNvbnRlbnQuY29udGFjdFN1YnRpdGxlfSBvbkNoYW5nZT17ZSA9PiBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIGNvbnRhY3RTdWJ0aXRsZTogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwiYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTMgdGV4dC1zbVwiIC8+XG4gICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiUGh5c2ljYWwgSFEgQWRkcmVzc1wiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e2hvbWVDb250ZW50LmNvbnRhY3RBZGRyZXNzfSBvbkNoYW5nZT17ZSA9PiBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIGNvbnRhY3RBZGRyZXNzOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTMgdGV4dC1zbVwiIC8+XG4gICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiSG90bGluZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e2hvbWVDb250ZW50LmNvbnRhY3RQaG9uZX0gb25DaGFuZ2U9e2UgPT4gc2V0SG9tZUNvbnRlbnQoey4uLmhvbWVDb250ZW50LCBjb250YWN0UGhvbmU6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cImJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQtc21cIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkVtYWlsIE5vZGVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXtob21lQ29udGVudC5jb250YWN0RW1haWx9IG9uQ2hhbmdlPXtlID0+IHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgY29udGFjdEVtYWlsOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLXhsIHB4LTQgcHktMyB0ZXh0LXNtXCIgLz5cbiAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE5ldXJhbCBOZXR3b3JrIChTb2NpYWwpIExpbmtzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHAtOCByb3VuZGVkLTN4bCBzaGFkb3ctc21cIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIHVwcGVyY2FzZSBpdGFsaWMgbWItNiB0ZXh0LXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgIDxFeHRlcm5hbExpbmsgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXByaW1hcnlcIiAvPiBUcmFuc21pc3Npb24gTm9kZXMgKFNvY2lhbHMpXG4gICAgICAgICAgPC9oMz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzhweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRleHQtc2xhdGUtNDAwIG1iLTEgYmxvY2tcIj5GYWNlYm9vazwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e2hvbWVDb250ZW50LmZhY2Vib29rVXJsfSBvbkNoYW5nZT17ZSA9PiBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIGZhY2Vib29rVXJsOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTMgdGV4dC14c1wiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bOHB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgdGV4dC1zbGF0ZS00MDAgbWItMSBibG9ja1wiPllvdVR1YmU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXtob21lQ29udGVudC55b3V0dWJlVXJsfSBvbkNoYW5nZT17ZSA9PiBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIHlvdXR1YmVVcmw6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLXhsIHB4LTQgcHktMyB0ZXh0LXhzXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVs4cHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCB0ZXh0LXNsYXRlLTQwMCBtYi0xIGJsb2NrXCI+V2hhdHNBcHA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXtob21lQ29udGVudC53aGF0c2FwcFVybH0gb25DaGFuZ2U9e2UgPT4gc2V0SG9tZUNvbnRlbnQoey4uLmhvbWVDb250ZW50LCB3aGF0c2FwcFVybDogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQteHNcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzhweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRleHQtc2xhdGUtNDAwIG1iLTEgYmxvY2tcIj5JbnN0YWdyYW08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXtob21lQ29udGVudC5pbnN0YWdyYW1Vcmx9IG9uQ2hhbmdlPXtlID0+IHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgaW5zdGFncmFtVXJsOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTMgdGV4dC14c1wiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBHYWxsZXJ5IFNlY3Rpb24gQ29udHJvbHMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcC04IHJvdW5kZWQtM3hsIHNoYWRvdy1zbVwiPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYmxhY2sgdXBwZXJjYXNlIGl0YWxpYyBtYi02IHRleHQtc2xhdGUtOTAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8SW1hZ2VJY29uIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1wcmltYXJ5XCIgLz4gR2FsbGVyeSBTZWN0aW9uXG4gICAgICAgICAgPC9oMz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiR2FsbGVyeSBTZWN0aW9uIFRpdGxlXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17aG9tZUNvbnRlbnQuZ2FsbGVyeVRpdGxlfSBvbkNoYW5nZT17ZSA9PiBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIGdhbGxlcnlUaXRsZTogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQtc21cIiAvPlxuICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiR2FsbGVyeSBTZWN0aW9uIFN1YnRpdGxlXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17aG9tZUNvbnRlbnQuZ2FsbGVyeVN1YnRpdGxlfSBvbkNoYW5nZT17ZSA9PiBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIGdhbGxlcnlTdWJ0aXRsZTogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQtc21cIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVGVhY2hlciBCaW8gJiBWaWRlbyBTZWN0aW9uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHAtOCByb3VuZGVkLTN4bCBzaGFkb3ctc21cIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgbWItNiB0ZXh0LXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPFZpZGVvIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1wcmltYXJ5XCIgLz4gVGVhY2hlciBCaW8gJiBWaWRlb1xuICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC02XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ib2xkIHB4LTFcIj5CaW8gU2VjdGlvbiBUaXRsZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e2hvbWVDb250ZW50LnRlYWNoZXJCaW9UaXRsZX0gb25DaGFuZ2U9e2UgPT4gc2V0SG9tZUNvbnRlbnQoey4uLmhvbWVDb250ZW50LCB0ZWFjaGVyQmlvVGl0bGU6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLXhsIHB4LTQgcHktMyB0ZXh0LXhzIHRleHQtc2xhdGUtOTAwXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJvbGQgcHgtMVwiPlZpZGVvIFVSTCAoWW91VHViZS9Ecml2ZSk8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXtob21lQ29udGVudC50ZWFjaGVyVmlkZW9Vcmx9IG9uQ2hhbmdlPXtlID0+IHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgdGVhY2hlclZpZGVvVXJsOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTMgdGV4dC14cyB0ZXh0LXNsYXRlLTkwMFwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIGZvbnQtYm9sZCBweC0xXCI+RGV0YWlsZWQgQmlvIFRleHQ8L2xhYmVsPlxuICAgICAgICAgICAgICA8dGV4dGFyZWEgcm93cz17OH0gdmFsdWU9e2hvbWVDb250ZW50LnRlYWNoZXJCaW9UZXh0fSBvbkNoYW5nZT17ZSA9PiBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIHRlYWNoZXJCaW9UZXh0OiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTMgdGV4dC14cyB0ZXh0LXNsYXRlLTkwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXByaW1hcnkvNTAgcmVzaXplLW5vbmUgZm9udC1zYW5zXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogUmVzdWx0cyAmIEVsaXRlIFBlcmZvcm1hbmNlICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHAtOCByb3VuZGVkLTN4bCBzaGFkb3ctc21cIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIHVwcGVyY2FzZSBpdGFsaWMgbWItNiB0ZXh0LXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPEJhckNoYXJ0MyBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtcHJpbWFyeVwiIC8+IFJlc3VsdHMgUGVyZm9ybWFuY2UgTm9kZVxuICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJSZXN1bHRzIFNlY3Rpb24gVGl0bGVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXtob21lQ29udGVudC5yZXN1bHRzVGl0bGV9IG9uQ2hhbmdlPXtlID0+IHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgcmVzdWx0c1RpdGxlOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTMgdGV4dC1zbVwiIC8+XG4gICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiUmVzdWx0cyBCYW5uZXIgSW1hZ2UgVVJMXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17aG9tZUNvbnRlbnQucmVzdWx0c0ltYWdlVXJsfSBvbkNoYW5nZT17ZSA9PiBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIHJlc3VsdHNJbWFnZVVybDogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQtc21cIiAvPlxuICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkNUQSBUZXh0IChWaWV3IFJlc3VsdHMpXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17aG9tZUNvbnRlbnQucmVzdWx0c0N0YVRleHR9IG9uQ2hhbmdlPXtlID0+IHNldEhvbWVDb250ZW50KHsuLi5ob21lQ29udGVudCwgcmVzdWx0c0N0YVRleHQ6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cImJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQtc21cIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkNUQSBVUkxcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXtob21lQ29udGVudC5yZXN1bHRzQ3RhVXJsfSBvbkNoYW5nZT17ZSA9PiBzZXRIb21lQ29udGVudCh7Li4uaG9tZUNvbnRlbnQsIHJlc3VsdHNDdGFVcmw6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cImJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQtc21cIiAvPlxuICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogR2FsbGVyeSBNb21lbnRzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHAtOCByb3VuZGVkLTN4bCBzaGFkb3ctc21cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBtYi02XCI+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIHVwcGVyY2FzZSBpdGFsaWMgdGV4dC1zbGF0ZS05MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPEltYWdlSWNvbiBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtcHJpbWFyeVwiIC8+IEdhbGxlcnkgTW9tZW50c1xuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzhweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IGJnLXNsYXRlLTEwMCBweC0zIHB5LTEgcm91bmRlZC1mdWxsIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgIHtob21lUG9zdHMubGVuZ3RofSBBY3RpdmVfRmVlZHNcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCBtYi04IHAtNiBiZy1zbGF0ZS01MCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiTW9tZW50IFRpdGxlXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17bmV3SG9tZVBvc3QudGl0bGV9IG9uQ2hhbmdlPXtlID0+IHNldE5ld0hvbWVQb3N0KHsuLi5uZXdIb21lUG9zdCwgdGl0bGU6IGUudGFyZ2V0LnZhbHVlfSl9IGNsYXNzTmFtZT1cInctZnVsbCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLXhsIHB4LTQgcHktMyB0ZXh0LXhzXCIgLz5cbiAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkltYWdlIFVSTFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e25ld0hvbWVQb3N0LmltYWdlVXJsfSBvbkNoYW5nZT17ZSA9PiBzZXROZXdIb21lUG9zdCh7Li4ubmV3SG9tZVBvc3QsIGltYWdlVXJsOiBlLnRhcmdldC52YWx1ZX0pfSBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC14bCBweC00IHB5LTMgdGV4dC14c1wiIC8+XG4gICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVBZGRIb21lUG9zdH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTkwMCB0ZXh0LXdoaXRlIGZvbnQtYmxhY2sgcHktNCByb3VuZGVkLXhsIHRleHQtWzEwcHhdIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgaG92ZXI6YmctcHJpbWFyeSBob3Zlcjp0ZXh0LWJsYWNrIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgQWRkX01vbWVudF90b19GZWVkXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICAgICAge2hvbWVQb3N0cy5tYXAocG9zdCA9PiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtwb3N0LmlkfSBjbGFzc05hbWU9XCJyZWxhdGl2ZSBncm91cCBhc3BlY3Qtc3F1YXJlIHJvdW5kZWQtMnhsIG92ZXJmbG93LWhpZGRlbiBiZy1zbGF0ZS0xMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz17dHJhbnNmb3JtSW1hZ2VVcmwocG9zdC5pbWFnZVVybCl9IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIGdyYXlzY2FsZSBncm91cC1ob3ZlcjpncmF5c2NhbGUtMCB0cmFuc2l0aW9uLWFsbFwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLXNsYXRlLTkwMC82MCBvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgdHJhbnNpdGlvbi1vcGFjaXR5IHAtNCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVEZWxldGUoJ2hvbWUvcG9zdHMnLCBwb3N0LmlkKX0gY2xhc3NOYW1lPVwic2VsZi1lbmQgcC0yIGJnLXJlZC01MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGhvdmVyOnNjYWxlLTExMCB0cmFuc2l0aW9uLXRyYW5zZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXdoaXRlIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRydW5jYXRlXCI+e3Bvc3QudGl0bGV9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVmlkZW8gSGlnaGxpZ2h0cyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBwLTggcm91bmRlZC0zeGwgc2hhZG93LXNtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgbWItNlwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ibGFjayB1cHBlcmNhc2UgaXRhbGljIHRleHQtc2xhdGUtOTAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxQbGF5IGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1wcmltYXJ5XCIgLz4gVmlkZW8gSGlnaGxpZ2h0c1xuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzhweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IGJnLXNsYXRlLTEwMCBweC0zIHB5LTEgcm91bmRlZC1mdWxsIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgIHtob21lVmlkZW9zLmxlbmd0aH0gQWN0aXZlX05vZGVzXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCBtYi04IHAtNiBiZy1zbGF0ZS01MCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiVmlkZW8gVGl0bGVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXtuZXdIb21lVmlkZW8udGl0bGV9IG9uQ2hhbmdlPXtlID0+IHNldE5ld0hvbWVWaWRlbyh7Li4ubmV3SG9tZVZpZGVvLCB0aXRsZTogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwidy1mdWxsIGJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQteHNcIiAvPlxuICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiWW91dHViZS9FbWJlZCBVUkxcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXtuZXdIb21lVmlkZW8udmlkZW9Vcmx9IG9uQ2hhbmdlPXtlID0+IHNldE5ld0hvbWVWaWRlbyh7Li4ubmV3SG9tZVZpZGVvLCB2aWRlb1VybDogZS50YXJnZXQudmFsdWV9KX0gY2xhc3NOYW1lPVwidy1mdWxsIGJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQteGwgcHgtNCBweS0zIHRleHQteHNcIiAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQWRkSG9tZVZpZGVvfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTAwIHRleHQtd2hpdGUgZm9udC1ibGFjayBweS00IHJvdW5kZWQteGwgdGV4dC1bMTBweF0gdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBob3ZlcjpiZy1wcmltYXJ5IGhvdmVyOnRleHQtYmxhY2sgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBDb25uZWN0X1ZpZGVvX1N0cmVhbVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgIHtob21lVmlkZW9zLm1hcCh2ID0+IChcbiAgICAgICAgICAgICAgIDxkaXYga2V5PXt2LmlkfSBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgcC00IGJnLXNsYXRlLTUwIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAgaC0xMCBiZy1wcmltYXJ5LzIwIHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxWaWRlbyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHJpbWFyeVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYmxhY2sgdGV4dC1zbGF0ZS05MDAgdXBwZXJjYXNlIGl0YWxpY1wiPnt2LnRpdGxlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzhweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tZWRpdW0gdHJ1bmNhdGUgbWF4LXctWzE1MHB4XVwiPnt2LnZpZGVvVXJsfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZURlbGV0ZSgnaG9tZS92aWRlb3MnLCB2LmlkKX0gY2xhc3NOYW1lPVwicC0yIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtcmVkLTUwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBHbG9iYWwgU2F2ZSAqL31cbiAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICBvbkNsaWNrPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCBzZXREb2MoZG9jKGRiLCAnaG9tZV9jb250ZW50JywgJ21haW4nKSwgaG9tZUNvbnRlbnQpO1xuICAgICAgICAgICAgYWxlcnQoJ05leHVzIFRlcm1pbmFsIFVwZGF0ZWQgU3VjY2Vzc2Z1bGx5LicpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXByaW1hcnkgdGV4dC1ibGFjayBmb250LWJsYWNrIHVwcGVyY2FzZSBpdGFsaWMgdHJhY2tpbmctWzAuMmVtXSBweS02IHJvdW5kZWQtWzJyZW1dIHNoYWRvdy0yeGwgc2hhZG93LXByaW1hcnkvMjAgaG92ZXI6c2NhbGUtWzEuMDJdIGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCB0ZXh0LXNtIHN0aWNreSBib3R0b20tMCB6LTMwXCJcbiAgICAgICAgPlxuICAgICAgICAgIEluaXRpYWxpemVfR2xvYmFsX1N5bmNcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIExpdmUgUHJldmlldyBDb2x1bW4gKi99XG4gICAgICB7aG9tZVByZXZpZXdNb2RlICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4gbGc6YmxvY2sgaC1bODV2aF0gc3RpY2t5IHRvcC0wIHJvdW5kZWQtWzNyZW1dIG92ZXJmbG93LWhpZGRlbiBib3JkZXItOCBib3JkZXItc2xhdGUtOTAwIHNoYWRvdy0yeGwgYmctYmxhY2tcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtZnVsbCBvdmVyZmxvdy15LWF1dG8gY3VzdG9tLXNjcm9sbGJhclwiPlxuICAgICAgICAgICAgIHsvKiBNb2NrIEhvbWUgUmVuZGVyIChTaW1wbGlmaWVkIGZvciBQcmV2aWV3KSAqL31cbiAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjYWxlLVswLjVdIG9yaWdpbi10b3Agdy1bMjAwJV0gYmctWyMwNTA1MDVdIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInB5LTEwIHB4LTEyIGZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBib3JkZXItYiBib3JkZXItd2hpdGUvNVwiPlxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1ibGFjayBpdGFsaWMgdXBwZXJjYXNlIHRyYWNraW5nLXRpZ2h0ZXJcIj57aG9tZUNvbnRlbnQudGVhY2hlck5hbWU/LnNwbGl0KCcgJylbMF19IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSB0cmFja2luZy10aWdodGVyXCI+e2hvbWVDb250ZW50LnRlYWNoZXJOYW1lPy5zcGxpdCgnICcpWzFdfTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTEyIHB5LTUgYmctd2hpdGUgdGV4dC1ibGFjayB0ZXh0LTJ4bCBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3Qgcm91bmRlZC1mdWxsXCI+TkVYVVNfU1lOQzwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHtob21lQ29udGVudC5oZXJvU2xpZGVzPy5sZW5ndGggPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGgtWzgwMHB4XSBmbGV4IGl0ZW1zLWNlbnRlciBweC0yMFwiPlxuICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3RyYW5zZm9ybUltYWdlVXJsKGhvbWVDb250ZW50Lmhlcm9TbGlkZXNbMF0uaW1hZ2VVcmwpfSBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIG9wYWNpdHktNjBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwIHNwYWNlLXktMTAgbWF4LXctNXhsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSB0ZXh0LTJ4bCBmb250LWJsYWNrIHRyYWNraW5nLVswLjVlbV0gdXBwZXJjYXNlXCI+e2hvbWVDb250ZW50Lmhlcm9TbGlkZXNbMF0uc3VidGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC1bMTJyZW1dIGZvbnQtYmxhY2sgaXRhbGljIHVwcGVyY2FzZSBsZWFkaW5nLVswLjg1XSB0cmFja2luZy10aWdodGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtob21lQ29udGVudC5oZXJvU2xpZGVzWzBdLnRpdGxlPy5yZXBsYWNlKC9fL2csICcgJykgfHwgJ1VOVElUTEVEX1NMSURFJ31cbiAgICAgICAgICAgICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC04XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC0xNiBweS04IGJnLXByaW1hcnkgcm91bmRlZC1mdWxsXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTE2IHB5LTggYm9yZGVyLTQgYm9yZGVyLXdoaXRlLzIwIHJvdW5kZWQtZnVsbFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogPGRpdiBjbGFzc05hbWU9XCJoLVs4MDBweF0gYmctc2xhdGUtOTAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtNHhsXCI+Tk9fSEVST19EQVRBPC9kaXY+fVxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweS00MCBweC0yMCBncmlkIGdyaWQtY29scy0yIGdhcC00MFwiPlxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXNwZWN0LVszLzRdIGJnLXNsYXRlLTgwMCByb3VuZGVkLVsxMDBweF0gb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3RyYW5zZm9ybUltYWdlVXJsKGhvbWVDb250ZW50LnRlYWNoZXJBYm91dFVybCl9IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIGdyYXlzY2FsZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEyIHB5LTIwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtOXhsIGZvbnQtYmxhY2sgaXRhbGljIHVwcGVyY2FzZSB0cmFja2luZy10aWdodGVyXCI+e2hvbWVDb250ZW50LmFib3V0VGl0bGV9PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LTR4bCB0ZXh0LXdoaXRlLzUwIGxlYWRpbmctcmVsYXhlZCBmb250LXNhbnNcIj57aG9tZUNvbnRlbnQudGVhY2hlck1ldGhvZG9sb2d5fTwvcD5cbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHktNDAgcHgtMjAgZ3JpZCBncmlkLWNvbHMtNSBnYXAtMTJcIj5cbiAgICAgICAgICAgICAgICAgICB7aG9tZUNvbnRlbnQucHJvY2Vzc1N0ZXBzPy5tYXAoKHMsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJwLTE2IHJvdW5kZWQtWzYwcHhdIGJnLXdoaXRlLzUgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBzcGFjZS15LTEwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMjQgaC0yNCBiZy1wcmltYXJ5IHJvdW5kZWQtWzMwcHhdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtYmxhY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHtSZWFjdC5jcmVhdGVFbGVtZW50KEljb25NYXBbcy5pY29uXSB8fCBCb29rT3BlbiwgeyBjbGFzc05hbWU6IFwidy0xMiBoLTEyXCIgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1ibGFjayBpdGFsaWMgdXBwZXJjYXNlXCI+e3MudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3NOYW1lPVwicHktNDAgYmctYmxhY2svNTAgYm9yZGVyLXQgYm9yZGVyLXdoaXRlLzUgcHgtMjAgZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTV4bCBmb250LWJsYWNrIHRyYWNraW5nLXRpZ2h0ZXJcIj7CqSB7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBDT1JFX1NUQUJMRTwvZGl2PlxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7WzEsMiwzLDRdLm1hcChpID0+IDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJ3LTIwIGgtMjAgYmctd2hpdGUvNSByb3VuZGVkLVsyMHB4XVwiIC8+KX1cbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC00IHJpZ2h0LTQgcHgtNCBweS0yIGJnLXByaW1hcnkvMjAgYmFja2Ryb3AtYmx1ci14bCBib3JkZXIgYm9yZGVyLXByaW1hcnkvNDAgcm91bmRlZC1mdWxsIHRleHQtWzhweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRleHQtcHJpbWFyeSBhbmltYXRlLXB1bHNlXCI+XG4gICAgICAgICAgICBMaXZlX05leHVzX0ZlZWRcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xuXG4gIGNvbnN0IHJlbmRlclByaU1hbmFnZW1lbnQgPSAoKSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEyIHBiLTI0XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHAtMTIgcm91bmRlZC1bNDBweF0gc2hhZG93LXNtXCI+XG4gICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJsYWNrIG1iLTEwIHRleHQtc2xhdGUtOTAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC00IHVwcGVyY2FzZSBpdGFsaWMgdHJhY2tpbmctdGlnaHRlclwiPlxuICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTcgaC03IHRleHQtcHJpbWFyeS80MFwiIC8+IFBSSSBBY2Nlc3MgQ29udHJvbFxuICAgICAgICA8L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgZ2FwLTZcIj5cbiAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICB0eXBlPVwiZW1haWxcIiBcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiT2ZmaWNpYWwgUFJJIEVtYWlsIChHb29nbGUgTG9naW4pXCIgXG4gICAgICAgICAgICB2YWx1ZT17bmV3UHJpRW1haWx9IFxuICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0TmV3UHJpRW1haWwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsIHB4LTYgcHktNSB0ZXh0LXNsYXRlLTkwMCB0ZXh0LXhzIGZvbnQtYmxhY2sgdHJhY2tpbmctd2lkZXN0IGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHJpbWFyeS8zMCB0cmFuc2l0aW9uLWFsbCBmb250LW1vbm9cIiBcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlQWRkUHJpVXNlcn0gY2xhc3NOYW1lPVwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlIGZvbnQtYmxhY2sgdXBwZXJjYXNlIGl0YWxpYyB0cmFja2luZy1bMC4yZW1dIHB4LTEwIHB5LTUgcm91bmRlZC0yeGwgaG92ZXI6c2NhbGUtMTA1IGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCB0ZXh0LXNtIHNoYWRvdy0yeGwgc2hhZG93LXByaW1hcnkvMjBcIj5cbiAgICAgICAgICAgIEF1dGhvcml6ZSBOb2RlXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNlwiPlxuICAgICAgICB7cHJpVXNlcnMubWFwKHVzZXIgPT4gKFxuICAgICAgICAgIDxkaXYga2V5PXt1c2VyLmlkfSBjbGFzc05hbWU9XCJiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBwLTggcm91bmRlZC1bMzVweF0gc2hhZG93LXNtIGdyb3VwIGhvdmVyOmJvcmRlci1wcmltYXJ5LzIwIHRyYW5zaXRpb24tYWxsIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1zdGFydCBtYi02IHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEyIGgtMTIgYmctc2xhdGUtNTAgcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBib3JkZXIgYm9yZGVyLXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgICAgIDxVc2VycyBjbGFzc05hbWU9XCJ3LTYgaC02IHRleHQtc2xhdGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlRGVsZXRlKCdhdXRob3JpemVkUHJpJywgdXNlci5pZCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zIGJnLXJlZC01MCB0ZXh0LXJlZC01MDAgcm91bmRlZC14bCBvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgdHJhbnNpdGlvbi1vcGFjaXR5XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxUcmFzaDIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgdGV4dC1bIzFhMWExYV0gbWItMlwiPnt1c2VyLmVtYWlsfTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzhweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctWzAuM2VtXSB0ZXh0LXNsYXRlLTQwMCBpdGFsaWNcIj5BY2Nlc3MgTGV2ZWw6IFBSSV9NQVJLU19NQU5BR0VSPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPERhc2hib2FyZExheW91dCByb2xlPVwiYWRtaW5cIiBhY3RpdmVUYWI9e2FjdGl2ZVRhYn0gc2V0QWN0aXZlVGFiPXtzZXRBY3RpdmVUYWJ9IHByb2ZpbGU9e3Byb2ZpbGV9PlxuICAgICAgPEFuaW1hdGVQcmVzZW5jZSBtb2RlPVwid2FpdFwiPlxuICAgICAgICA8bW90aW9uLmRpdiBrZXk9e2FjdGl2ZVRhYn0gaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAxMCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX0gZXhpdD17eyBvcGFjaXR5OiAwLCB5OiAtMTAgfX0+XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ292ZXJ2aWV3JyAmJiByZW5kZXJPdmVydmlldygpfVxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdob21lJyAmJiByZW5kZXJIb21lTWFuYWdlcigpfVxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdjbGFzc2VzJyAmJiByZW5kZXJDbGFzc2VzKCl9XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3JlY29yZGluZ3MnICYmIHJlbmRlclJlY29yZGluZ3MoKX1cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnYmF0Y2hlcycgJiYgcmVuZGVyQWNhZGVtaWNZZWFycygpfVxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdsaXZlJyAmJiByZW5kZXJMaXZlKCl9XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3N0dWRlbnRzJyAmJiByZW5kZXJTdHVkZW50cygpfVxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdtYXJrcycgJiYgcmVuZGVyTWFya3MoKX1cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnYWRtaW5zJyAmJiByZW5kZXJBZG1pbnMoKX1cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAncHJpJyAmJiByZW5kZXJQcmlNYW5hZ2VtZW50KCl9XG4gICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuICAgIDwvRGFzaGJvYXJkTGF5b3V0PlxuICApO1xufTtcbiJdLCJmaWxlIjoiQzovVXNlcnMvQ0IvRG9jdW1lbnRzL2xtcy9jYnBvbGl0eWFjYWRlbXkvcHJvIDEvcHJvamVjdF9uZXcvcHJvamVjdF9tb2RpZmllZC9zcmMvcGFnZXMvQWRtaW5EYXNoYm9hcmQudHN4In0=