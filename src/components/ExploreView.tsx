import React from 'react';
import { 
  Compass, 
  Users, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  GraduationCap,
  Code,
  Cpu,
  Variable,
  Atom,
  ChevronRight
} from 'lucide-react';
import { StudyGroup, Post, AcademicCategory } from '../types';

interface ExploreViewProps {
  groups: StudyGroup[];
  posts: Post[];
  onSelectCategory: (cat: AcademicCategory) => void;
  onSelectPost: (postId: string) => void;
  onPreviewNote: (post: Post) => void;
  onOpenJoinGroup: () => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  groups,
  posts,
  onSelectCategory,
  onSelectPost,
  onPreviewNote,
  onOpenJoinGroup,
}) => {
  const notes = posts.filter((p) => p.type === 'note');
  const questions = posts.filter((p) => p.type === 'question');

  const getCategoryIcon = (code: string) => {
    switch (code) {
      case 'CSE': return Code;
      case 'ECE': return Cpu;
      case 'MATH': return Variable;
      case 'PHYS': return Atom;
      default: return GraduationCap;
    }
  };

  return (
    <div className="flex-1 w-full max-w-[1280px] mx-auto p-4 sm:p-6 lg:p-8 pb-20 bg-[#0A0A0A]">
      {/* Explore Banner Header - Bento Hero Card */}
      <div className="bg-[#141414] rounded-3xl border border-white/10 shadow-ambient-lvl2 p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-zinc-300 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Academic Discovery Hub</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
            Explore University Study Hubs & Course Notes
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
            Discover peer-reviewed lecture notes, exam cheat sheets, and active problem-solving discussions across engineering, science, and mathematics.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenJoinGroup}
              className="bg-white text-black font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-zinc-200 transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Users className="w-4 h-4" />
              <span>Browse All Study Groups</span>
            </button>
            <button
              onClick={() => onSelectCategory('cse')}
              className="bg-[#1f1f23] text-white border border-white/15 font-semibold text-xs px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Computer Science</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Study Groups Grid - Bento Grid Cards */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Active Study Hubs
            </h2>
            <p className="text-xs text-zinc-400">Join department groups to customize your feed</p>
          </div>
          <button
            onClick={onOpenJoinGroup}
            className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {groups.map((group) => {
            const Icon = getCategoryIcon(group.code);
            return (
              <div
                key={group.id}
                onClick={() => onSelectCategory(group.id as AcademicCategory)}
                className="bg-[#141414] p-5 rounded-2xl border border-white/10 shadow-ambient-lvl1 hover:shadow-ambient-lvl2 hover:border-white/25 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#1f1f23] border border-white/10 flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
                      {group.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-white/5 text-zinc-300 rounded-full border border-white/10">
                      {group.code}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {group.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {group.membersCount.toLocaleString()} scholars
                  </span>
                  <span className="text-[11px] font-semibold text-white group-hover:text-emerald-400 group-hover:underline">
                    Enter Hub →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Shared Notes Section - Bento 2-Col Grid */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Top Reviewed Course Notes & Guides
            </h2>
            <p className="text-xs text-zinc-400">High-impact study guides shared by top contributors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => onPreviewNote(note)}
              className="bg-[#141414] rounded-2xl border border-white/10 border-l-4 border-l-emerald-500 shadow-ambient-lvl1 hover:shadow-ambient-lvl2 hover:border-white/25 p-5 transition-all cursor-pointer flex flex-col sm:flex-row gap-4 group"
            >
              {note.pdfThumbnail && (
                <div className="w-full sm:w-36 h-32 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-[#18181b]">
                  <img
                    src={note.pdfThumbnail}
                    alt={note.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="bg-emerald-500/10 text-emerald-300 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-500/30">
                      {note.pageCount || 14} Pages
                    </span>
                    <span className="text-xs text-zinc-400">{note.author.name}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-white group-hover:text-emerald-400 transition-colors leading-snug mb-1">
                    {note.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                    {note.content}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/10 text-xs text-zinc-400">
                  <span className="font-medium">{note.courseCode || 'Study Guide'}</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1 group-hover:underline">
                    Preview PDF →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
