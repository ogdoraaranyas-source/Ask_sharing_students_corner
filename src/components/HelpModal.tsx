import React from 'react';
import { X, BookOpen, HelpCircle, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141414] w-full max-w-lg rounded-3xl border border-white/10 shadow-modal overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h2 className="font-heading text-lg font-bold text-white">ScholarSync Guidelines</h2>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/5 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <div className="p-4 bg-[#18181b] rounded-2xl border border-white/10">
            <h3 className="font-heading font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A78BFA]" />
              How ScholarSync Works
            </h3>
            <p className="text-zinc-400 leading-relaxed text-xs">
              ScholarSync is an open peer-to-peer academic platform for university students, teaching assistants, and researchers. Ask coursework questions, share verified lecture notes, and earn community reputation.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-1.5 text-xs uppercase tracking-wider">Asking Quality Questions</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-400">
              <li>Include code snippets or math equations whenever possible.</li>
              <li>Tag with both the course code (e.g., <code className="bg-white/5 border border-white/10 text-emerald-400 px-1.5 py-0.5 rounded text-[11px]">#CSE340</code>) and topic tags.</li>
              <li>Accept the most helpful answer by clicking the checkmark to reward the author.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-1.5 text-xs uppercase tracking-wider">Markdown & Code Formatting</h4>
            <p className="mb-2 text-xs text-zinc-400">You can use standard Markdown syntax in posts and answers:</p>
            <div className="bg-[#18181b] border border-white/10 p-3 rounded-xl font-mono text-xs text-zinc-300 space-y-1">
              <div>**bold text** &nbsp;•&nbsp; *italic text*</div>
              <div>`inline code` &nbsp;•&nbsp; ```language code block```</div>
            </div>
          </div>
        </div>

        <div className="p-3.5 border-t border-white/10 bg-[#141414] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white text-black font-bold text-xs rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
