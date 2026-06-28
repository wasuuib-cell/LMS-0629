import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { HomeContent, HomePost, HomeVideo, HeroSlide } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Play, ChevronRight, ChevronLeft, Facebook, Youtube, Instagram, MessageCircle, Linkedin, BookOpen, Lightbulb, FileText, CalendarCheck, CheckCircle2, MapPin, Users, BarChart3, Clock, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { transformImageUrl } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';
import { VideoPlayer } from '../components/VideoPlayer';

import { YouTubeCustomPlayer } from '../components/YouTubeCustomPlayer';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const [content, setContent] = useState<HomeContent | null>(null);
  const [posts, setPosts] = useState<HomePost[]>([]);
  const [videos, setVideos] = useState<HomeVideo[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const unsubContent = onSnapshot(doc(db, 'home_content', 'main'), (snap) => {
      if (snap.exists()) {
        setContent(snap.data() as HomeContent);
      } else {
        // Provide some basic defaults to prevent infinite loading if doc doesn't exist
        setContent({
          teacherName: 'Chathuranaga Bandara',
          teacherMethodology: t('hero.desc'),
          aboutTitle: t('dash.admin.overview'),
          contactTitle: t('footer.contact')
        } as HomeContent);
      }
    });

    const unsubPosts = onSnapshot(query(collection(db, 'home_posts'), orderBy('createdAt', 'desc'), limit(10)), (snap) => {
      setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as HomePost)));
    });

    const unsubVideos = onSnapshot(query(collection(db, 'home_videos'), orderBy('createdAt', 'desc'), limit(5)), (snap) => {
      setVideos(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as HomeVideo)));
    });

    return () => {
      unsubContent();
      unsubPosts();
      unsubVideos();
    };
  }, []);

  // Local Hero Slides Fallback
  const LOCAL_SLIDES: HeroSlide[] = [
    { id: '1', imageUrl: '/1.avif', title: 'එන්න_අපි_දේශපාලන_විද්‍යාව_ඉගෙන_ගමු.', subtitle: 'Political Science Excellence', ctaText: '', ctaUrl: '/lms', titleFontSize: 8, titleFontSizeMobile: 3.5 },
    { id: '2', imageUrl: '/2.avif', title: 'කෙටි_කාලයක්_තුල_ඉහලම_ප්‍රතිපල', subtitle: 'Results Oriented', ctaText: '', ctaUrl: '/lms', titleFontSize: 8, titleFontSizeMobile: 3.5 },
    { id: '3', imageUrl: '/3.avif', title: 'දේශපාලන_විද්‍යාව_with_චතුරංග_බණ්ඩාර', subtitle: 'Expert Guidance', ctaText: '', ctaUrl: '/lms', titleFontSize: 9, titleFontSizeMobile: 3.5 },
    { id: '4', imageUrl: '/our-results.jpeg', title: 'අපේ_ප්‍රතිඵල', subtitle: 'Our Results', ctaText: '', ctaUrl: '/results', titleFontSize: 9, titleFontSizeMobile: 3.5 }
  ];

  const slides = LOCAL_SLIDES;

  // Hero Slider logic
  useEffect(() => {
    if (slides.length <= 1) {
      setCurrentSlideIndex(0);
      return;
    }
    // Safety: if index is out of bounds after update
    if (currentSlideIndex >= slides.length) {
      setCurrentSlideIndex(0);
    }

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length, currentSlideIndex]);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
          <Clock className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
    );
  }

  const getImagePath = (path: string | undefined | null) => {
    if (!path || typeof path !== 'string' || path.trim() === '') return undefined;
    
    // Robustness: Reject if contains spaces or is too long (likely not a path)
    if (path.trim().includes(' ') || path.trim().length > 200) {
      return undefined;
    }

    if (path.startsWith('http') || path.startsWith('data:')) {
      return transformImageUrl(path) || undefined;
    }
    
    // For local public assets in Vite, use the base URL
    const cleanPath = path.trim().startsWith('/') ? path.trim() : `/${path.trim()}`;
    const base = ((import.meta as any).env.BASE_URL || '/').replace(/\/$/, '');
    return `${base}${cleanPath}`;
  };

  const currentSlide = slides[currentSlideIndex] || slides[0] || LOCAL_SLIDES[0];
  
  // Use the slide image if it's valid, otherwise use the matching local fallback
  const getInitialSlideImage = () => {
    if (currentSlide.imageUrl && currentSlide.imageUrl.trim() !== '') {
      const path = getImagePath(currentSlide.imageUrl);
      if (path) return path;
    }
    // Final fallback to local image based on index
    const localUrl = LOCAL_SLIDES[currentSlideIndex % LOCAL_SLIDES.length].imageUrl;
    return getImagePath(localUrl) || localUrl;
  };

  const imageSrc = getInitialSlideImage();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary/30 selection:text-slate-900 overflow-x-hidden w-full">
      {/* Hero Slider Section */}
      <section id="home" className="relative h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`absolute inset-0 flex flex-col justify-center transition-all duration-1000 ${[1, 2].includes(currentSlideIndex) ? 'items-start text-left lg:pl-32' : 'items-center text-center'}`}
          >
            {imageSrc ? (
              <motion.img 
                key={imageSrc}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={imageSrc} 
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                style={{ zIndex: 0, objectPosition: currentSlideIndex === 2 ? 'right center' : 'center center' }}
                onError={(e) => {
                  const fb = getImagePath(LOCAL_SLIDES[0].imageUrl);
                  if (fb && e.currentTarget.src !== fb) {
                    e.currentTarget.src = fb;
                  }
                }}
              />
            ) : (
               <div className="absolute inset-0 bg-slate-900" />
            )}
            
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-black/40 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-[1]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(248,113,113,0.1)_0%,_transparent_70%)] z-[1]" />
            
            <div className={`relative z-[10] w-full max-w-7xl px-6 drop-shadow-2xl transition-all duration-1000 ${[1, 2].includes(currentSlideIndex) ? 'text-left items-start ml-0 lg:pl-32' : 'mx-auto text-center items-center'}`}>
              <div className={[1, 2].includes(currentSlideIndex) ? 'max-w-[70%] lg:max-w-[60%]' : 'w-full'}>
                <motion.span 
                  initial={{ letterSpacing: '1em', opacity: 0 }}
                  animate={{ letterSpacing: '0.4em', opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`text-[#f87171] text-xs md:text-xl font-black uppercase block ${[1, 2].includes(currentSlideIndex) ? 'text-left mb-12' : 'text-center mb-8'}`}
                >
                  {currentSlide.subtitle}
                </motion.span>
                <motion.h1 
                  className={`font-sinhala font-black italic uppercase leading-[1.1] tracking-tighter text-white mb-16 flex flex-wrap gap-x-4 md:gap-x-8 ${[1, 2].includes(currentSlideIndex) ? 'justify-start' : 'justify-center'}`}
                  style={{ 
                    fontSize: `clamp(${currentSlide.titleFontSizeMobile || 3.5}rem, 10vw, ${currentSlide.titleFontSize || 10}rem)` 
                  }}
                >
                  {currentSlide.title.split('_').map((part, i) => (
                    <motion.span 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + (i * 0.2), duration: 0.8, ease: "easeOut" }}
                      className={i % 2 === 1 ? 'text-[#f87171]' : ''}
                    >
                      {part}
                    </motion.span>
                  ))}
                </motion.h1>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className={`flex flex-row gap-4 md:gap-8 ${[1, 2].includes(currentSlideIndex) ? 'justify-start' : 'justify-center'}`}
                >
                  <Link to={currentSlide.ctaUrl || "/lms"} className="px-16 py-8 bg-[#f87171] text-black font-black uppercase italic tracking-widest rounded-full hover:bg-white transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(248,113,113,0.3)] text-xs md:text-base">
                    {currentSlide.ctaText || t('hero.cta.start')}
                  </Link>
                  <a href="#about" className="px-16 py-8 bg-transparent text-white font-black uppercase italic tracking-widest rounded-full border-4 border-white/20 hover:border-white transition-all duration-500 hover:scale-105 active:scale-95 text-xs md:text-base">
                    {t('hero.cta.learn')}
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-white relative overflow-hidden decorative-grid">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative z-10 border-8 border-white">
                <img 
                  src={getImagePath(content.teacherAboutUrl || content.teacherImageUrl)} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <div className="space-y-4">
                <div className="h-2 w-20 bg-primary rounded-full" />
                <h2 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter text-slate-900 leading-none">
                  {content.aboutTitle?.split(' ')[0]} <span className="text-primary italic">{content.aboutTitle?.split(' ').slice(1).join(' ')}</span>
                </h2>
                <span className="text-slate-400 font-bold uppercase tracking-[0.4em] text-xs block">
                  {t('home.transmissionSource')}: {content.teacherName}
                </span>
              </div>

              <div 
                className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg font-medium"
                dangerouslySetInnerHTML={{ __html: content.aboutRichText || '' }}
              />

              <a 
                href={content.aboutCtaUrl || "/lms"}
                className="inline-flex items-center gap-6 px-12 py-6 bg-accent text-white font-black uppercase italic tracking-widest rounded-full shadow-2xl shadow-accent/20 hover:bg-primary hover:text-black transition-all hover:scale-105 active:scale-95"
              >
                {content.aboutCtaText || "Access_Portal"}
                <ArrowUpRight className="w-6 h-6" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Results Section */}
      <section className="py-32 bg-slate-950 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(248,113,113,0.12)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="mb-16 space-y-4 text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-black uppercase tracking-[0.4em] text-xs block"
            >
              DISTRICT_FIRST_ACHIEVERS
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-none text-white"
            >
              OUR <span className="text-primary">RESULTS</span>
            </motion.h2>
            <div className="h-1 w-24 bg-primary rounded-full mx-auto mt-4" />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl animate-pulse" />
                <img 
                  src="/our-results.jpeg" 
                  alt="Our Results - District First 2022 A/L"
                  className="relative z-10 w-full max-w-md rounded-[2rem] shadow-2xl shadow-primary/30 border-4 border-white/10 object-cover"
                />
                {/* Badge */}
                <div className="absolute -top-6 -right-6 z-20 w-24 h-24 bg-primary rounded-full flex flex-col items-center justify-center shadow-xl shadow-primary/40 border-4 border-white/20">
                  <span className="text-black font-black text-xs uppercase leading-none">DISTRICT</span>
                  <span className="text-black font-black text-3xl leading-none">1</span>
                  <span className="text-black font-black text-xs uppercase leading-none">st</span>
                </div>
              </div>
            </motion.div>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 space-y-8"
            >
              {/* Highlight card */}
              <div className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                    <BarChart3 className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <p className="text-primary font-black uppercase tracking-widest text-xs">2022 A/L · මාතලේ දිස්ත්‍රිකය</p>
                    <h3 className="text-white font-black uppercase italic text-2xl tracking-tight">දිස්ත්‍රික් 1 වැනි</h3>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed font-medium">
                  චමෝද්‍යා දුලංජලී · INDEX 4240065 — 2022 A/L කලා විෂය සඳහා මාතලේ දිස්ත්‍රිකයෙන් ප්‍රථම ස්ථානය ලබා ගත්තාය.
                </p>
              </div>

              {/* Student grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { rank: 'District 01', name: 'චමෝද්‍යා දුලංජලී', index: '4240065' },
                  { rank: 'District 14', name: 'නිශාක්‍යා ආරියරත්න', index: '4220366' },
                  { rank: 'District 46', name: 'හසාංජලී නවෝද්‍යා', index: '4240073' },
                  { rank: 'District 34', name: 'දිල්ෂාන් මිහිරංග', index: '7342500' },
                  { rank: 'District 83', name: 'ෂෙහාරා ජිනාදී', index: '3242021' },
                  { rank: 'District 132', name: 'නෙත්මි ඉමල්ෂා', index: '3243214' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                    viewport={{ once: true }}
                    className="rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-primary/10 hover:border-primary/40 transition-all"
                  >
                    <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-1">{s.rank}</p>
                    <p className="text-white font-bold text-sm leading-tight">{s.name}</p>
                    <p className="text-slate-500 text-[10px] font-mono mt-1">#{s.index}</p>
                  </motion.div>
                ))}
              </div>

              <Link 
                to="/results" 
                className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-black font-black uppercase italic tracking-[0.2em] rounded-full hover:bg-white transition-all shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95"
              >
                {t('home.viewResults')}
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section id="process" className="py-32 bg-[#050505] text-white relative decorative-grid">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-20 space-y-4">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">
              {content.processTitle || t('home.syncProtocol')}
            </span>
            <h2 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-none">
              {content.processSubtitle?.split(' ')[0] || "Revolutionize"} <br />
              <span className="text-primary">{content.processSubtitle?.split(' ').slice(1).join(' ') || "The_Process"}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(content.processSteps || []).map((step, idx) => (
              <motion.div 
                key={step.id} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-10 rounded-[40px] bg-white/5 border border-white/5 hover:bg-primary hover:border-primary transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full group-hover:bg-black/20 transition-all" />
                <div className="relative z-10">
                   <div className="text-[4rem] font-black italic text-white/10 group-hover:text-black/20 mb-4 transition-colors leading-none tracking-tighter">
                      {(content.teacherName || 'BW').split(' ').map(n => n[0]).join('')}_0{idx + 1}
                   </div>
                   <h4 className="text-xl font-black uppercase italic tracking-tight mb-6 group-hover:text-black transition-colors">
                     {step.title}
                   </h4>
                   <p className="text-slate-400 text-sm leading-relaxed group-hover:text-black/80 transition-colors font-medium">
                     {step.description}
                   </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Paper Class Section */}
      <section className="py-32 bg-white relative decorative-grid">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-8"
            >
              <div className="space-y-4">
                <span className="text-primary font-black uppercase tracking-[0.4em] text-xs block">
                   {content.specialTitle || "Political Science Special"}
                </span>
                <h2 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter text-slate-900 leading-none">
                  {content.specialSubtitle?.split(' ')[0] || "The_Final"} <br />
                  <span className="text-primary italic">{content.specialSubtitle?.split(' ').slice(1).join(' ') || "Paper_Class"}</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  {content.specialDesc || "A/L PAPER එකට පස්සේ ලංකාවේ වැඩිම ළමයි ප්‍රමාණයක් එකපාර ලියන දේශපාලන විද්‍යා PAPER එක. විශේෂ ප්‍රශ්න, පෙරහුරු ප්‍රශ්න සමගින් සිසුන්ගේ විෂය පිළිබඳව හැකියාව වැඩි දියුණු කරමින් විභාගය සඳහා සූදානම් කරවනු ලබයි"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(content.specialFeatures || []).map((f, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-primary">
                       <Play className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-black uppercase italic text-sm text-slate-800">{f.title}</h5>
                      <p className="text-slate-500 text-xs leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>


            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="lg:w-1/2"
            >
              <div className="relative rounded-[48px] overflow-hidden shadow-2xl">
                 <img src="/images/center-map.png" alt="Exam Centers Map" className="w-full h-auto" onError={(e) => (e.currentTarget.style.display = 'none')} />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp Channels Section */}
      <section className="py-32 bg-slate-50 border-y border-slate-200 relative decorative-grid">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-20 space-y-4">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">
              {content.telegramTitle || "Political Science Communities"}
            </span>
            <h2 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter text-slate-900 leading-none">
              Our <br />
              <span className="text-primary italic">WhatsApp_Channels</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(content.telegramChannels || []).map((chan, idx) => (
              <motion.a 
                key={chan.id}
                href={chan.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center text-center space-y-6"
              >
                <div className="relative w-full aspect-square rounded-[32px] overflow-hidden border-2 border-white shadow-xl group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500">
                  <img src={getImagePath(chan.imageUrl)} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Send className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h4 className="text-lg font-black uppercase italic tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                  {chan.name}
                </h4>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
              <div className="space-y-4">
                <span className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">{content.gallerySubtitle || "Transmission Feed"}</span>
                <h2 className="text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter text-slate-900 leading-none">
                  {content.galleryTitle?.split(' ')[0] || "Explore_"} <br /><span className="text-primary italic">{content.galleryTitle?.split(' ').slice(1).join(' ') || "Our_Gallery"}</span>
                </h2>
              </div>
              <div className="flex gap-4">
                 <Link to="/gallery" className="group flex items-center gap-4 text-xs font-black uppercase italic text-slate-900 hover:text-primary transition-all tracking-widest mb-2">
                  <span className="border-b-2 border-transparent group-hover:border-primary px-1">View_All_Moments</span>
                  <div className="w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                    <ChevronRight className="w-5 h-5 group-hover:text-slate-950 transition-colors" />
                  </div>
                </Link>
              </div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {posts.slice(0, 8).map((post, idx) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className={`relative rounded-3xl overflow-hidden group shadow-lg ${idx % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  <img 
                    src={getImagePath(post.imageUrl)} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                    alt={post.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                     <span className="text-primary font-black uppercase italic text-[10px] tracking-widest mb-2">FEED_{new Date(post.createdAt).toLocaleDateString()}</span>
                     <h4 className="text-white font-display font-black uppercase italic text-lg leading-tight truncate">{post.title}</h4>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Teacher Bio & Video Section */}
      <section className="py-32 bg-slate-50 overflow-hidden relative">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="w-full lg:w-1/2 space-y-10 relative">
                 <div className="space-y-6">
                    <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">
                       {(content.teacherName || 'BW').split(' ').map(n => n[0]).join('')}_IDENTITY
                    </span>
                    <h2 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter text-slate-900 leading-none">
                      {content.teacherBioTitle?.split(' ')[0] || t('home.meetEducator').split(' ')[0]} <br />
                      <span className="text-primary italic">{content.teacherBioTitle?.split(' ').slice(1).join(' ') || t('home.meetEducator').split(' ').slice(1).join('_')}</span>
                    </h2>
                    <div className="h-2 w-20 bg-primary rounded-full" />
                 </div>
                 <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
                    {content.teacherBioText || t('home.teacherBioDefault')}
                 </p>
              </div>
              <div className="w-full lg:w-1/2">
                 <div className="relative group">
                    <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
                    <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl bg-black">
                       <YouTubeCustomPlayer 
                          url={content.teacherVideoUrl || ''} 
                       />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section id="contact" className="py-32 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="bg-slate-900 rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl shadow-primary/20">
              <div className="p-12 md:p-24 text-center space-y-12">
                 <div className="space-y-4">
                    <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">{t('home.initComms')}</span>
                    <h2 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-none text-white">
                      {content.contactTitle?.split(' ')[0] || t('footer.contact').split(' ')[0]} <br />
                      <span className="text-primary italic">{content.contactTitle?.split(' ').slice(1).join(' ') || t('footer.contact').split(' ').slice(1).join('_')}</span>
                    </h2>
                    <p className="text-slate-400 text-lg font-medium mx-auto max-w-2xl">
                       {content.contactSubtitle || "Reach out to us via the following gateways."}
                    </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-4xl mx-auto">
                    <div className="flex gap-6 items-center">
                       <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-6 h-6 text-primary" />
                       </div>
                       <div>
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{t('home.baseTerminal')}</p>
                          <p className="text-white font-medium italic">{content.contactAddress || "Apex Galevala"}</p>
                       </div>
                    </div>
                    <div className="flex gap-6 items-center">
                       <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <MessageCircle className="w-6 h-6 text-primary" />
                       </div>
                       <div>
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{t('home.hotline')}</p>
                          <p className="text-white font-medium italic">{content.contactPhone || "0761942158"}</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-4xl font-display font-black uppercase italic tracking-tighter text-slate-900 leading-none">
                   {content.teacherName?.split(' ')[0]} <br />
                   <span className="text-primary tracking-tighter">{content.teacherName?.split(' ').slice(1).join(' ')}</span>
                </h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] italic">{t('home.terminalName')}</p>
              </div>

              <div className="flex gap-4">
                 {[
                   { icon: Facebook, url: content.facebookUrl },
                   { icon: Youtube, url: content.youtubeUrl },
                   { icon: Instagram, url: content.instagramUrl },
                   { icon: MessageCircle, url: content.whatsappUrl },
                   { icon: Linkedin, url: content.linkedinUrl }
                 ].map((s, i) => s.url && (
                   <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-accent hover:border-accent transition-all group">
                     <s.icon className="w-5 h-5 group-hover:scale-125 transition-transform" />
                   </a>
                 ))}
              </div>
           </div>
           
           <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
               <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest">© {new Date().getFullYear()} {content.teacherName?.toUpperCase()}. {t('footer.rights').toUpperCase()}</p>
              <div className="flex gap-8">
                 <Link to="#" className="text-slate-300 text-[10px] font-black uppercase tracking-widest hover:text-accent transition-colors">{t('footer.privacy')}</Link>
                 <Link to="#" className="text-slate-300 text-[10px] font-black uppercase tracking-widest hover:text-accent transition-colors">{t('footer.terms')}</Link>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};
