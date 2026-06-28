import React, { useEffect, useState } from 'react';
import { Play, ExternalLink, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { YouTubeCustomPlayer } from './YouTubeCustomPlayer';

export const Watermark: React.FC = () => {
  const [ip, setIp] = useState<string>('Loading...');
  const [position, setPosition] = useState({ top: '10%', left: '10%' });

  useEffect(() => {
    // Controller to abort fetch if component unmounts
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    fetch('https://api.ipify.org?format=json', { signal: controller.signal })
      .then(res => {
        clearTimeout(timeoutId);
        return res.json();
      })
      .then(data => setIp(data.ip))
      .catch(() => setIp('Secured Feed')); // Avoid "Unknown IP" which looks like an error

    const interval = setInterval(() => {
      const top = Math.floor(Math.random() * 80) + 10;
      const left = Math.floor(Math.random() * 80) + 10;
      setPosition({ top: `${top}%`, left: `${left}%` });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed z-50 pointer-events-none text-white/30 font-bold text-lg select-none transition-all duration-1000"
      style={{ top: position.top, left: position.left }}
    >
      {ip}
    </div>
  );
};

interface VideoPlayerProps {
  url: string;
  type: 'drive' | 'youtube';
  visibility?: 'private' | 'unlisted';
  autoPlay?: boolean;
  userEmail?: string;
  isSafeZone?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, type, visibility = 'private', autoPlay = false, userEmail, isSafeZone = false }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (autoPlay) {
      setIsPlaying(true);
    }
  }, [autoPlay]);

  // If it's YouTube and we are playing, use the Custom YouTube Player
  if (type === 'youtube' && isPlaying) {
    return (
      <div className="relative w-full overflow-hidden shadow-2xl border border-white/10 rounded-xl bg-black">
        <YouTubeCustomPlayer url={url} autoPlay={true} isSafeZone={isSafeZone} />
        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <ShieldAlert className="w-3 h-3 text-primary" />
            <span className="text-[8px] text-white font-bold uppercase tracking-widest">{visibility} Stream</span>
          </div>
        </div>
        <Watermark />
      </div>
    );
  }

  const getEmbedUrl = () => {
    try {
      if (!url) return null;

      if (type === 'drive') {
        let fileId = '';
        const dMatch = url.match(/\/d\/([^/?#]+)/);
        const idMatch = url.match(/[?&]id=([^&]+)/);
        
        if (dMatch) fileId = dMatch[1];
        else if (idMatch) fileId = idMatch[1];

        if (fileId) {
          const baseUrl = `https://drive.google.com/file/d/${fileId}/preview`;
          return isPlaying ? `${baseUrl}?autoplay=1` : baseUrl;
        }
      }

      // Legacy YouTube iframe check (for backward compatibility or if isPlaying is false)
      if (type === 'youtube') {
        let videoId = '';
        const vMatch = url.match(/[?&]v=([^&]+)/);
        const shortMatch = url.match(/youtu\.be\/([^?&/]+)/);
        const embedMatch = url.match(/embed\/([^?&/]+)/);
        const shortsMatch = url.match(/shorts\/([^?&/]+)/);
        const vPathMatch = url.match(/\/v\/([^?&/]+)/);

        if (vMatch) videoId = vMatch[1];
        else if (shortMatch) videoId = shortMatch[1];
        else if (embedMatch) videoId = embedMatch[1];
        else if (shortsMatch) videoId = shortsMatch[1];
        else if (vPathMatch) videoId = vPathMatch[1];

        if (videoId) {
          const baseUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=1&origin=${window.location.origin}`;
          return isPlaying ? `${baseUrl}&autoplay=1` : baseUrl;
        }
      }
    } catch (e) {
      console.error("Error parsing video URL:", e);
    }
    return null;
  };

  const embedUrl = getEmbedUrl();

  if (!embedUrl) {
    return (
      <div className="w-full aspect-video bg-[#141414] rounded-xl flex items-center justify-center border border-white/10">
        <p className="text-gray-500">Invalid video URL</p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
      {!isPlaying && (
        <div 
          className="absolute inset-0 z-20 bg-black/60 flex flex-col items-center justify-center cursor-pointer group-hover:bg-black/40 transition-all duration-300"
          onClick={() => setIsPlaying(true)}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-all duration-300">
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </div>
            <div className="text-center px-8">
              <p className="text-white font-bold text-lg">Click to Start Lesson</p>
              <p className="text-white/40 text-xs mt-1">
                {visibility === 'private' ? 'Secure Private Streaming' : 'Unlisted Content Active'}
              </p>
              {visibility === 'private' && type === 'drive' && userEmail && (
                <p className="text-primary/60 text-[10px] uppercase font-black tracking-widest mt-4 animate-pulse">
                  Ensure Google Account matches: {userEmail}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isPlaying && isLoading && (
        <div className="absolute inset-0 z-15 bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="text-center">
            <p className="text-white font-bold text-sm">Please wait...</p>
            <p className="text-gray-500 text-[10px] mt-1">Loading {visibility} content</p>
          </div>
        </div>
      )}

      {/* Security Shield Message (Optional, subtle) */}
      {isPlaying && (
        <div className="absolute top-4 right-4 z-20 opacity-20 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <ShieldAlert className="w-3 h-3 text-primary" />
            <span className="text-[8px] text-white font-bold uppercase tracking-widest">{visibility} Stream</span>
          </div>
        </div>
      )}
      
      <iframe
        src={embedUrl || undefined}
        className={`w-full h-full border-0 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
        loading="lazy"
        onLoad={() => setIsLoading(false)}
      />

      {/* Authorized Session Info & Fallback */}
      {isPlaying && !isLoading && (
        <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-2">
          {userEmail && (
            <div className="flex flex-col items-end gap-1">
              <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[8px] text-white/60 font-black uppercase tracking-widest">Authorized Email</span>
              </div>
              <p className="text-[10px] text-white/20 font-mono tracking-tighter truncate max-w-[200px]">{userEmail}</p>
            </div>
          )}
          
          {type === 'youtube' && (
            <a 
              href={url}
              target="_blank"
              rel="noreferrer"
              className="group/btn flex items-center gap-2 bg-red-600/20 hover:bg-red-600 border border-red-600/30 px-4 py-2 rounded-xl transition-all duration-300 pointer-events-auto"
            >
              <ExternalLink className="w-3 h-3 text-white" />
              <span className="text-[9px] text-white font-black uppercase tracking-widest">Open on YouTube</span>
            </a>
          )}
        </div>
      )}
      
      <Watermark />
    </div>
  );
};
