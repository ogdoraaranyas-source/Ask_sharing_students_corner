import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Heart, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  FileText, 
  Share2,
  Check,
  Eye
} from 'lucide-react';
import { Post } from '../types';

interface NotePreviewModalProps {
  post: Post | null;
  onClose: () => void;
  onLikeNote: (postId: string) => void;
  onToggleBookmark: (postId: string) => void;
}

export const NotePreviewModal: React.FC<NotePreviewModalProps> = ({
  post,
  onClose,
  onLikeNote,
  onToggleBookmark,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!post) return null;

  const totalPages = post.pageCount || 14;

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#141414] w-full max-w-4xl rounded-3xl border border-white/10 shadow-modal overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
        role="dialog"
      >
        {/* Document Viewer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#141414] sticky top-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-300 flex items-center justify-center border border-emerald-500/30 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="font-heading text-sm sm:text-base font-bold text-white truncate">
                {post.title}
              </h2>
              <p className="text-xs text-zinc-400">
                Uploaded by {post.author.name} • {totalPages} Pages
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onLikeNote(post.id)}
              className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                post.userLiked
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  : 'text-zinc-400 border-white/10 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${post.userLiked ? 'fill-rose-400' : ''}`} />
              <span>{post.likesCount || 0}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all shadow-md cursor-pointer active:scale-98"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1.5 rounded-full hover:bg-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Viewer Body */}
        <div className="flex-1 bg-[#0A0A0A] p-4 sm:p-6 overflow-y-auto flex flex-col items-center justify-center">
          <div 
            className="bg-[#18181b] rounded-2xl border border-white/10 shadow-ambient-lvl2 p-4 sm:p-8 max-w-2xl w-full transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {post.pdfThumbnail ? (
              <img
                src={post.pdfThumbnail}
                alt="Document page preview"
                className="w-full h-auto rounded-xl border border-white/10"
              />
            ) : (
              <div className="p-6 text-center">
                <FileText className="w-16 h-16 text-emerald-400 mx-auto mb-3" />
                <h3 className="font-heading text-lg font-bold text-white mb-2">{post.title}</h3>
                <p className="text-sm text-zinc-300 leading-relaxed max-w-md mx-auto">{post.content}</p>
              </div>
            )}
          </div>
        </div>

        {/* Document Viewer Toolbar Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-[#141414] text-xs text-zinc-400">
          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel(Math.max(70, zoomLevel - 10))}
              className="p-1.5 hover:bg-white/5 text-zinc-300 rounded-lg border border-white/10 cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-xs w-12 text-center text-zinc-200">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
              className="p-1.5 hover:bg-white/5 text-zinc-300 rounded-lg border border-white/10 cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Page navigation */}
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 hover:bg-white/5 text-zinc-300 disabled:opacity-30 rounded-lg border border-white/10 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-semibold text-xs text-zinc-200">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 hover:bg-white/5 text-zinc-300 disabled:opacity-30 rounded-lg border border-white/10 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bookmark action */}
          <button
            onClick={() => onToggleBookmark(post.id)}
            className={`flex items-center gap-1.5 font-semibold cursor-pointer ${
              post.bookmarked ? 'text-[#A78BFA]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${post.bookmarked ? 'fill-[#A78BFA]' : ''}`} />
            <span>{post.bookmarked ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
