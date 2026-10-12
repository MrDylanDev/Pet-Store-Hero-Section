import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Heart, Share2, MessageCircle, ShoppingBag } from 'lucide-react';
import { ASSETS } from '../data/constants';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProduct: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  onOpenProduct,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(true);
  const [likesCount, setLikesCount] = useState(24380);

  if (!isOpen) return null;

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((c) => c - 1);
    } else {
      setLiked(true);
      setLikesCount((c) => c + 1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-stone-900 rounded-3xl shadow-2xl overflow-hidden relative border border-white/10 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 z-30 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold text-white tracking-wide">
              Viral Pet Review · TikTok & YouTube
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video viewport area */}
        <div className="relative aspect-[9/16] max-h-[72vh] w-full overflow-hidden bg-black flex items-center justify-center">
          <img
            src={ASSETS.videoCard}
            alt="Video presentation"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isPlaying ? 'scale-105' : 'scale-100 brightness-90'
            }`}
          />

          {/* Center Play/Pause Overlay indicator */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center focus:outline-none"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {!isPlaying && (
              <div className="w-16 h-16 rounded-full bg-[#1a3d1a]/90 text-white flex items-center justify-center shadow-2xl border border-white/20 transition-transform hover:scale-110">
                <Play className="w-7 h-7 fill-white stroke-white ml-1" />
              </div>
            )}
          </button>

          {/* Simulated Right Action Strip (TikTok/Reels style) */}
          <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4">
            {/* Like */}
            <button
              onClick={toggleLike}
              className="flex flex-col items-center gap-1 text-white group"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                  liked ? 'bg-red-500/80 text-white' : 'bg-black/40 text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-white stroke-white' : ''}`} />
              </div>
              <span className="text-[10px] font-semibold">{likesCount.toLocaleString()}</span>
            </button>

            {/* Comments */}
            <div className="flex flex-col items-center gap-1 text-white">
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold">1,842</span>
            </div>

            {/* Mute toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition-colors hover:bg-black/60"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Bottom Captions & Product Tag */}
          <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-semibold text-white text-xs">@whiskers_and_co</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                Verified Pet Parent
              </span>
            </div>
            <p className="text-xs text-gray-200 line-clamp-2 mb-3">
              &ldquo;My cat Milo hasn&apos;t left this Cozy Cat House for 3 days straight. The orthopedic base is unmatched!&rdquo; 🐾✨
            </p>

            {/* Direct Shop button */}
            <button
              onClick={() => {
                onClose();
                onOpenProduct();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-[#E86A10] hover:bg-[#d45e0d] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Cozy Cat House ($49.99)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
