import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  RotateCcw,
  FastForward
} from 'lucide-react';
import screenfull from 'screenfull';
import { motion, AnimatePresence } from 'motion/react';

interface YouTubeCustomPlayerProps {
  url: string;
  autoPlay?: boolean;
  isSafeZone?: boolean;
}

export const YouTubeCustomPlayer: React.FC<YouTubeCustomPlayerProps> = ({ url, autoPlay = false, isSafeZone = false }) => {
  const ReactPlayerAny = ReactPlayer as any;
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [currentUrl, setCurrentUrl] = useState(url);
  const [playing, setPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [originUrl, setOriginUrl] = useState(typeof window !== 'undefined' ? window.location.origin : '');

  useEffect(() => {
    setCurrentUrl(url);
    setIsReady(false);
  }, [url]);

  // Fetch allowed domain from Firestore
  useEffect(() => {
    const fetchOrigin = async () => {
      try {
        const snap = await getDoc(doc(db, 'home_content', 'main'));
        if (snap.exists() && snap.data().allowedDomain) {
          setOriginUrl(snap.data().allowedDomain);
        }
      } catch (err) {
        // Fallback silently to window.location.origin which is already the default state
      }
    };
    fetchOrigin();
  }, []);

  const handlePlayerReady = () => {
    setIsReady(true);
  };

  // Hide controls after inactivity
  useEffect(() => {
    let timeout: any;
    if (playing && showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [playing, showControls]);

  const handleMouseMove = () => {
    setShowControls(true);
  };

  const togglePlay = () => setPlaying(!playing);
  
  const toggleMute = () => setMuted(!muted);

  const toggleFullscreen = () => {
    if (containerRef.current && screenfull.isEnabled) {
      screenfull.toggle(containerRef.current);
    }
  };

  useEffect(() => {
    if (screenfull.isEnabled) {
      const handler = () => setFullscreen(screenfull.isFullscreen);
      screenfull.on('change', handler);
      return () => screenfull.off('change', handler);
    }
  }, []);

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (e: any) => {
    setSeeking(false);
    const fraction = parseFloat(e.target.value);
    const targetSeconds = fraction * (duration || 1); 
    
    if (playerRef.current) {
      try {
        if (typeof playerRef.current.seekTo === 'function') {
          playerRef.current.seekTo(targetSeconds, 'seconds');
        } else if (typeof playerRef.current.currentTime !== 'undefined') {
          // It might be directly attached to a native video element
          playerRef.current.currentTime = targetSeconds;
        } else if (typeof playerRef.current.getInternalPlayer === 'function') {
          const internalPlayer = playerRef.current.getInternalPlayer();
          if (internalPlayer) {
            if (typeof internalPlayer.seekTo === 'function') {
              internalPlayer.seekTo(targetSeconds, true); 
            } else if (typeof internalPlayer.currentTime !== 'undefined') {
              internalPlayer.currentTime = targetSeconds; 
            }
          }
        }
      } catch (err) {
        console.error('Seek error:', err);
      }
    }
  };

  const handleTimeUpdate = (e: any) => {
    if (!seeking && e.currentTarget && e.currentTarget.duration) {
      setPlayed(e.currentTarget.currentTime / e.currentTarget.duration);
    }
  };

  const handleDurationChange = (e: any) => {
    if (e.currentTarget && e.currentTarget.duration) {
      setDuration(e.currentTarget.duration);
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const skip = (amount: number) => {
    const targetSeconds = (played * duration) + amount;
    if (playerRef.current) {
      try {
        if (typeof playerRef.current.seekTo === 'function') {
          playerRef.current.seekTo(targetSeconds, 'seconds');
        } else if (typeof playerRef.current.currentTime !== 'undefined') {
          playerRef.current.currentTime = targetSeconds;
        } else if (typeof playerRef.current.getInternalPlayer === 'function') {
          const internalPlayer = playerRef.current.getInternalPlayer();
          if (internalPlayer) {
            if (typeof internalPlayer.seekTo === 'function') {
              internalPlayer.seekTo(targetSeconds, true);
            } else if (typeof internalPlayer.currentTime !== 'undefined') {
              internalPlayer.currentTime = targetSeconds;
            }
          }
        }
      } catch (err) {
        console.error('Skip error:', err);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div 
        ref={containerRef}
        className={`relative group w-full aspect-video bg-black overflow-hidden rounded-xl cursor-default shadow-2xl shadow-black/50 border border-white/5`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => playing && setShowControls(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) togglePlay();
        }}
      >
        <div className={`w-full h-full relative ${isSafeZone ? 'overflow-hidden' : ''}`}>
          {isSafeZone && (
            <div className="absolute top-0 left-0 w-full h-[45px] bg-black z-[11] md:hidden pointer-events-none" />
          )}
          <ReactPlayerAny
            ref={playerRef}
            src={currentUrl}
            url={currentUrl}
            width="100%"
            height={isSafeZone ? 'calc(100% + 110px)' : '100%'}
            playing={playing}
            volume={volume}
            muted={muted}
            onProgress={(state: any) => {
              if (!seeking) setPlayed(state.played);
            }}
            onDuration={(dur: number) => setDuration(dur)}
            onTimeUpdate={handleTimeUpdate}
            onDurationChange={handleDurationChange}
            onReady={handlePlayerReady}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  iv_load_policy: 3,
                  controls: 0,
                  disablekb: 1,
                  showinfo: 0,
                  origin: originUrl || (typeof window !== 'undefined' ? window.location.origin : ''),
                  enablejsapi: 1
                }
              }
            } as any}
            style={{ 
              pointerEvents: 'none',
              position: isSafeZone ? 'absolute' : 'relative',
              top: isSafeZone ? '50%' : '0',
              left: isSafeZone ? '50%' : '0',
              transform: isSafeZone ? 'translate(-50%, -50%)' : 'none'
            }} 
          />
        </div>

        {/* Overlay for interaction */}
        <div 
          className="absolute inset-0 z-10" 
          onClick={togglePlay}
        />

        {/* Centered Play Button when paused */}
        <AnimatePresence>
          {!playing && isReady && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 bg-primary/95 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/20 hover:scale-110 transition-transform"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
            >
              <Play className="w-10 h-10 fill-current ml-1 text-white" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Custom Controls */}
        <AnimatePresence>
          {(showControls || !playing) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/95 via-black/40 to-transparent pt-20 pb-4 px-4 md:px-6"
            >
              {/* Seek Bar */}
              <div className="group/seek relative w-full mb-4">
                <input
                  type="range"
                  min={0}
                  max={0.999999}
                  step="any"
                  value={played}
                  onMouseDown={handleSeekMouseDown}
                  onTouchStart={handleSeekMouseDown}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekMouseUp}
                  onTouchEnd={handleSeekMouseUp}
                  className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-primary group-hover/seek:h-2 transition-all"
                />
                <div 
                  className="absolute top-0 left-0 h-1.5 bg-primary rounded-full pointer-events-none group-hover/seek:h-2 transition-all"
                  style={{ width: `${played * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-6">
                  <button onClick={togglePlay} className="text-white hover:text-primary transition-colors">
                    {playing ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                  </button>

                  <div className="hidden md:flex items-center gap-4">
                    <button onClick={() => skip(-10)} className="text-white/70 hover:text-white transition-colors">
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button onClick={() => skip(10)} className="text-white/70 hover:text-white transition-colors">
                      <FastForward className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="text-white hover:text-primary transition-colors">
                      {muted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step="any"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-20 md:w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
                    />
                  </div>

                  <div className="text-white font-medium text-xs md:text-sm font-mono tracking-tighter">
                    {formatTime(played * duration)} / {formatTime(duration)}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={toggleFullscreen} className="text-white hover:text-primary transition-colors">
                    {fullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Loading interaction shield */}
        {!isReady && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};
