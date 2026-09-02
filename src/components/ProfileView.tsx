import React, { useState } from 'react';
import { 
  Star, 
  School, 
  CheckCircle2, 
  ChevronRight, 
  Download, 
  ThumbsUp, 
  Bookmark, 
  FileText, 
  Award,
  ArrowLeft,
  Eye,
  Plus
} from 'lucide-react';
import { UserProfile, Post } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  posts: Post[];
  onSelectPost: (postId: string) => void;
  onPreviewNote: (post: Post) => void;
  onBackToFeed: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  posts,
  onSelectPost,
  onPreviewNote,
  onBackToFeed,
}) => {
  const [activeTab, setActiveTab] = useState<'contributions' | 'notes' | 'bookmarks'>('contributions');

  // User's own contributions
  const userContributions = posts.filter(
    (p) => p.author.id === user.id || p.author.name === user.name
  );

  // User's shared notes
  const userNotes = userContributions.filter((p) => p.type === 'note');

  // Saved bookmarks across the app
  const bookmarkedPosts = posts.filter((p) => p.bookmarked);

  return (
    <div className="flex-1 w-full max-w-[1280px] mx-auto p-4 sm:p-6 lg:p-8 pb-20 bg-[#0A0A0A]">
      {/* Back button */}
      <button
        onClick={onBackToFeed}
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white mb-4 px-3.5 py-2 rounded-xl hover:bg-[#141414] border border-transparent hover:border-white/10 transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Feed</span>
      </button>

      {/* Profile Header Section - Bento Hero Card */}
      <section className="bg-[#141414] rounded-3xl border border-white/10 shadow-ambient-lvl2 p-6 md:p-8 mb-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center relative overflow-hidden">
        {/* Ambient background blob */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full opacity-30 -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full opacity-30 translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

        {/* User Avatar */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/10 shadow-md overflow-hidden z-10 shrink-0 bg-[#18181b]">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info Details */}
        <div className="flex-grow z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-white">
                {user.name}
              </h1>
              <p className="text-sm md:text-base text-zinc-300 font-medium mt-0.5">
                {user.department}
              </p>
            </div>

            {/* Reputation Badge */}
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-2 rounded-full shadow-xs whitespace-nowrap self-start md:self-auto">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-heading font-bold text-sm">
                {user.reputation.toLocaleString()} Rep
              </span>
            </div>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl mt-3">
            {user.bio}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <School className="w-3.5 h-3.5" /> Grad Student
            </span>
            <span className="bg-purple-500/10 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Top Contributor
            </span>
          </div>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Tabs Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 gap-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('contributions')}
              className={`font-heading font-bold text-sm pb-2.5 px-1 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'contributions'
                  ? 'text-white border-b-2 border-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
              id="profile-tab-contributions"
            >
              My Contributions ({userContributions.length})
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`font-heading font-bold text-sm pb-2.5 px-1 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'notes'
                  ? 'text-white border-b-2 border-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
              id="profile-tab-notes"
            >
              Shared Notes ({userNotes.length})
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`font-heading font-bold text-sm pb-2.5 px-1 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'bookmarks'
                  ? 'text-white border-b-2 border-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
              id="profile-tab-bookmarks"
            >
              Saved Bookmarks ({bookmarkedPosts.length})
            </button>
          </div>

          {/* Tab 1: Contributions */}
          {activeTab === 'contributions' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              {userContributions.length === 0 ? (
                <div className="bg-[#141414] rounded-2xl border border-dashed border-white/10 p-8 text-center text-zinc-400">
                  No contributions yet. Ask questions or share notes in your study groups.
                </div>
              ) : (
                userContributions.map((contrib) => (
                  <div
                    key={contrib.id}
                    onClick={() => contrib.type === 'note' ? onPreviewNote(contrib) : onSelectPost(contrib.id)}
                    className="bg-[#141414] rounded-2xl border border-white/10 border-l-4 border-l-[#8B5CF6] shadow-ambient-lvl1 hover:shadow-ambient-lvl2 hover:border-white/20 p-5 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center min-w-[50px] bg-[#18181b] p-2 rounded-xl border border-white/10">
                        <span className="font-heading font-bold text-lg text-emerald-400">
                          {contrib.votes}
                        </span>
                        <span className="text-[10px] text-zinc-400 uppercase font-semibold">votes</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-base font-bold text-white mb-1 hover:text-emerald-400 transition-colors">
                          {contrib.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 mb-3 leading-relaxed">
                          {contrib.content}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {contrib.tags.map((t) => (
                            <span
                              key={t}
                              className="bg-white/5 text-zinc-300 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-white/10"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              <button
                onClick={onBackToFeed}
                className="w-full py-3 text-center font-heading text-xs font-semibold text-white border border-white/10 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer"
              >
                View All Community Discussions
              </button>
            </div>
          )}

          {/* Tab 2: Shared Notes */}
          {activeTab === 'notes' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
              {userNotes.length === 0 ? (
                <div className="col-span-2 bg-[#141414] rounded-2xl border border-dashed border-white/10 p-8 text-center text-zinc-400">
                  No shared notes yet.
                </div>
              ) : (
                userNotes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => onPreviewNote(note)}
                    className="bg-[#141414] rounded-2xl border border-white/10 shadow-ambient-lvl1 hover:shadow-ambient-lvl2 hover:border-white/20 p-5 transition-all flex flex-col h-full cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-emerald-500/10 text-emerald-300 px-2.5 py-1 rounded-full text-xs font-semibold border border-emerald-500/30 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> PDF Document
                      </span>
                      <button className="text-zinc-400 hover:text-white p-1">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="font-heading text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors leading-snug">
                      {note.title}
                    </h3>
                    <p className="text-xs text-zinc-300 mb-4 flex-grow leading-relaxed">
                      {note.content}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                      <span className="text-xs font-semibold text-zinc-400">
                        {note.courseCode || 'Course Note'}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-zinc-400 font-semibold">
                        <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" /> {note.likesCount || note.votes}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 3: Saved Bookmarks */}
          {activeTab === 'bookmarks' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              {bookmarkedPosts.length === 0 ? (
                <div className="bg-[#141414] rounded-2xl border border-white/10 border-dashed shadow-xs p-10 text-center flex flex-col items-center justify-center">
                  <Bookmark className="w-12 h-12 text-zinc-600 mb-3" />
                  <h3 className="font-heading text-lg font-bold text-white mb-1">
                    No Bookmarks Yet
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-xs">
                    Save interesting questions or notes to find them easily later.
                  </p>
                </div>
              ) : (
                bookmarkedPosts.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => b.type === 'note' ? onPreviewNote(b) : onSelectPost(b.id)}
                    className="bg-[#141414] rounded-2xl border border-white/10 shadow-ambient-lvl1 hover:shadow-ambient-lvl2 hover:border-white/20 p-5 transition-all cursor-pointer flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          b.type === 'note' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                        }`}>
                          {b.type}
                        </span>
                        <span className="text-xs text-zinc-400">{b.author.name}</span>
                      </div>
                      <h4 className="font-heading text-base font-bold text-white hover:text-emerald-400 transition-colors">
                        {b.title}
                      </h4>
                      <p className="text-xs text-zinc-300 line-clamp-2 mt-1">
                        {b.content}
                      </p>
                    </div>
                    <Bookmark className="w-5 h-5 fill-[#A78BFA] text-[#A78BFA] shrink-0 mt-1" />
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Statistics & Followed Courses Sidebar (4 cols) - Bento Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Impact Statistics */}
          <div className="bg-[#141414] rounded-2xl border border-white/10 shadow-ambient-lvl1 p-5">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3 mb-4">
              Impact Statistics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#18181b] p-3.5 rounded-xl border border-white/10 text-center">
                <span className="block font-heading text-2xl font-bold text-white mb-0.5">
                  {user.stats.totalUpvotes}
                </span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Total Upvotes
                </span>
              </div>
              <div className="bg-[#18181b] p-3.5 rounded-xl border border-white/10 text-center">
                <span className="block font-heading text-2xl font-bold text-emerald-400 mb-0.5">
                  {user.stats.acceptedAns}
                </span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Accepted Ans
                </span>
              </div>
              <div className="bg-[#18181b] p-3.5 rounded-xl border border-white/10 text-center">
                <span className="block font-heading text-2xl font-bold text-white mb-0.5">
                  {user.stats.notesShared}
                </span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Notes Shared
                </span>
              </div>
              <div className="bg-[#18181b] p-3.5 rounded-xl border border-white/10 text-center">
                <span className="block font-heading text-2xl font-bold text-white mb-0.5">
                  {user.stats.coursesCount}
                </span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Courses
                </span>
              </div>
            </div>
          </div>

          {/* Followed Courses */}
          <div className="bg-[#141414] rounded-2xl border border-white/10 shadow-ambient-lvl1 p-5">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3 mb-3">
              Followed Courses
            </h3>
            <ul className="flex flex-col divide-y divide-white/5">
              {user.followedCourses.map((course) => (
                <li
                  key={course.code}
                  className="flex items-center justify-between py-2.5 hover:bg-white/5 px-2 rounded-xl transition-colors cursor-pointer"
                >
                  <span className="font-heading text-xs sm:text-sm font-semibold text-zinc-200">
                    {course.code}: {course.title}
                  </span>
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
