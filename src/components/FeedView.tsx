import React, { useState } from 'react';
import { 
  ChevronUp, 
  MessageSquare, 
  Heart, 
  Download, 
  FileText, 
  Star, 
  Zap, 
  MoreVertical, 
  TrendingUp, 
  Award, 
  Eye, 
  Bookmark, 
  Sparkles,
  Share2,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { Post, AcademicCategory } from '../types';
import { TRENDING_TOPICS, TOP_CONTRIBUTORS } from '../data/mockData';

interface FeedViewProps {
  posts: Post[];
  selectedCategory: AcademicCategory;
  onSelectCategory: (cat: AcademicCategory) => void;
  onSelectPost: (postId: string) => void;
  onVotePost: (postId: string, direction: 1 | -1) => void;
  onToggleBookmark: (postId: string) => void;
  onLikeNote: (postId: string) => void;
  onPreviewNote: (post: Post) => void;
  searchQuery: string;
  onSelectTrendingTag: (tag: string) => void;
  onViewProfile: (userId?: string) => void;
}

export const FeedView: React.FC<FeedViewProps> = ({
  posts,
  selectedCategory,
  onSelectCategory,
  onSelectPost,
  onVotePost,
  onToggleBookmark,
  onLikeNote,
  onPreviewNote,
  searchQuery,
  onSelectTrendingTag,
  onViewProfile,
}) => {
  const [feedFilter, setFeedFilter] = useState<'popular' | 'new' | 'unanswered'>('popular');

  // Filter and sort posts
  const filteredPosts = posts.filter((post) => {
    // Category filter
    if (selectedCategory !== 'all' && post.category !== selectedCategory) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchContent = post.content.toLowerCase().includes(q);
      const matchTag = post.tags.some((t) => t.toLowerCase().includes(q));
      const matchAuthor = post.author.name.toLowerCase().includes(q);
      if (!matchTitle && !matchContent && !matchTag && !matchAuthor) {
        return false;
      }
    }
    // Feed sub-filter
    if (feedFilter === 'unanswered') {
      return post.answersCount === 0 || post.answers.length === 0;
    }
    return true;
  }).sort((a, b) => {
    if (feedFilter === 'popular') {
      return b.votes - a.votes;
    }
    if (feedFilter === 'new') {
      return b.id.localeCompare(a.id);
    }
    return 0;
  });

  const getCategoryLabel = (cat: AcademicCategory) => {
    switch (cat) {
      case 'cse': return 'Computer Science (CSE)';
      case 'ece': return 'Electronics & Hardware (ECE)';
      case 'math': return 'Mathematics';
      case 'physics': return 'Applied Physics';
      default: return 'All Academic Hubs';
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-full bg-[#0A0A0A]">
      {/* Feed Sticky Sub-Header */}
      <div className="sticky top-[57px] z-30 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {selectedCategory === 'all' ? 'Your Feed' : getCategoryLabel(selectedCategory)}
          </h1>
          {selectedCategory !== 'all' && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-zinc-400">Filtered by study group</span>
              <button
                onClick={() => onSelectCategory('all')}
                className="text-xs text-emerald-400 font-semibold hover:underline cursor-pointer"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>

        {/* Popular / New / Unanswered Tabs */}
        <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setFeedFilter('popular')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              feedFilter === 'popular'
                ? 'bg-white text-black shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
            id="filter-popular-btn"
          >
            Popular
          </button>
          <button
            onClick={() => setFeedFilter('new')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              feedFilter === 'new'
                ? 'bg-white text-black shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
            id="filter-new-btn"
          >
            New
          </button>
          <button
            onClick={() => setFeedFilter('unanswered')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              feedFilter === 'unanswered'
                ? 'bg-white text-black shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
            id="filter-unanswered-btn"
          >
            Unanswered
          </button>
        </div>
      </div>

      {/* Main Canvas & Sidebar Container */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1280px] w-full mx-auto pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Feed Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            {filteredPosts.length === 0 ? (
              <div className="bg-[#141414] rounded-2xl border border-dashed border-white/15 p-10 text-center flex flex-col items-center justify-center">
                <FileText className="w-12 h-12 text-zinc-500 mb-3" />
                <h3 className="font-heading text-lg font-bold text-white mb-1">
                  No discussions found
                </h3>
                <p className="text-sm text-zinc-400 max-w-sm mb-4">
                  {searchQuery
                    ? `No questions or notes match "${searchQuery}". Try a different keyword or check other study groups.`
                    : 'Be the first scholar to ask a question or upload lecture notes in this hub!'}
                </p>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => onSelectCategory('all')}
                    className="text-xs font-semibold px-4 py-2 bg-white text-black rounded-xl hover:bg-zinc-200 transition-colors"
                  >
                    View All Hubs
                  </button>
                )}
              </div>
            ) : (
              filteredPosts.map((post) => {
                const isNote = post.type === 'note';

                return (
                  <article
                    key={post.id}
                    className={`bg-[#141414] rounded-2xl p-5 sm:p-6 border border-white/10 shadow-ambient-lvl1 hover:shadow-ambient-lvl2 hover:border-white/20 transition-all duration-200 ${
                      isNote
                        ? 'border-l-4 border-l-emerald-500'
                        : 'border-l-4 border-l-[#8B5CF6]'
                    }`}
                    id={`post-card-${post.id}`}
                  >
                    {/* Card Header: Author Info */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onViewProfile(post.author.id)}
                          className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-[#18181b] flex items-center justify-center shrink-0 cursor-pointer hover:ring-2 hover:ring-white"
                        >
                          {post.author.avatar ? (
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="font-heading text-xs font-bold text-white">
                              {post.author.name.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </button>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onViewProfile(post.author.id)}
                              className="font-heading text-sm font-bold text-white hover:underline text-left cursor-pointer"
                            >
                              {post.author.name}
                            </button>
                            {post.author.reputation && (
                              <span className="flex items-center gap-0.5 text-amber-300 text-[11px] font-semibold bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                                {post.author.repType === 'bolt' ? (
                                  <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                                ) : (
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                )}
                                <span>{post.author.reputation > 999 ? `${(post.author.reputation/1000).toFixed(1)}k` : post.author.reputation}</span>
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                            <span>{post.createdAt}</span>
                            <span>•</span>
                            {isNote ? (
                              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                                <FileText className="w-3 h-3" /> Note Share
                              </span>
                            ) : (
                              <span>{post.views} views</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onToggleBookmark(post.id)}
                          className={`p-2 rounded-xl transition-colors cursor-pointer ${
                            post.bookmarked
                              ? 'text-[#A78BFA] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30'
                              : 'text-zinc-400 hover:text-white hover:bg-white/5'
                          }`}
                          title={post.bookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
                        >
                          <Bookmark className={`w-4 h-4 ${post.bookmarked ? 'fill-[#A78BFA]' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3
                      onClick={() => isNote ? onPreviewNote(post) : onSelectPost(post.id)}
                      className="font-heading text-lg sm:text-xl font-bold text-white mb-2 hover:text-emerald-400 transition-colors cursor-pointer leading-snug"
                    >
                      {post.title}
                    </h3>

                    {/* Card Body Snippet */}
                    <p className="text-sm text-zinc-300 leading-relaxed mb-4 line-clamp-2">
                      {post.content}
                    </p>

                    {/* Note PDF Preview Banner (if Note Share) */}
                    {isNote && (
                      <div
                        onClick={() => onPreviewNote(post)}
                        className="relative mb-4 rounded-xl overflow-hidden border border-white/10 bg-[#18181b] group cursor-pointer h-44 sm:h-52"
                      >
                        {post.pdfThumbnail ? (
                          <img
                            src={post.pdfThumbnail}
                            alt="Study Guide preview"
                            className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-[#18181b] p-6 text-center">
                            <FileSpreadsheet className="w-12 h-12 text-emerald-400 mb-2" />
                            <span className="font-heading font-semibold text-sm text-white">
                              {post.title}
                            </span>
                            <span className="text-xs text-zinc-400">Click to view document</span>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                          <button className="flex items-center gap-1.5 bg-white text-black font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-md hover:bg-zinc-200 transition-colors">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview Document</span>
                          </button>
                        </div>

                        {post.pageCount && (
                          <div className="absolute top-2.5 right-2.5 bg-[#0A0A0A]/90 backdrop-blur-md rounded-lg px-2.5 py-1 text-[11px] font-semibold border border-white/15 shadow-xs flex items-center gap-1.5 text-zinc-200">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span>{post.pageCount} Pages</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Card Footer: Tags & Interactivity */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => onSelectTrendingTag(tag.startsWith('#') ? tag : `#${tag}`)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                              isNote
                                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                                : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      {/* Counters & Actions */}
                      <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400">
                        {isNote ? (
                          <>
                            <button
                              onClick={() => onLikeNote(post.id)}
                              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                                post.userLiked ? 'text-rose-400' : 'hover:text-rose-400'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${post.userLiked ? 'fill-rose-400' : ''}`} />
                              <span>{post.likesCount || 0}</span>
                            </button>
                            <button
                              onClick={() => onPreviewNote(post)}
                              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer"
                            >
                              <Download className="w-4 h-4" />
                              <span>{post.downloadCount || 0}</span>
                            </button>
                          </>
                        ) : (
                          <>
                            {/* Upvote button */}
                            <div className="flex items-center gap-1.5 bg-[#18181b] px-2.5 py-1 rounded-xl border border-white/10">
                              <button
                                onClick={() => onVotePost(post.id, post.userVote === 1 ? -1 : 1)}
                                className={`p-0.5 rounded transition-colors cursor-pointer ${
                                  post.userVote === 1
                                    ? 'text-[#A78BFA] font-bold'
                                    : 'text-zinc-400 hover:text-white'
                                }`}
                                title="Upvote"
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <span className={post.userVote === 1 ? 'text-[#A78BFA] font-bold' : 'text-zinc-100'}>
                                {post.votes}
                              </span>
                            </div>

                            {/* Answers Link */}
                            <button
                              onClick={() => onSelectPost(post.id)}
                              className="flex items-center gap-1.5 hover:text-[#A78BFA] transition-colors cursor-pointer"
                            >
                              <MessageSquare className="w-4 h-4" />
                              <span>{post.answersCount} {post.answersCount === 1 ? 'answer' : 'answers'}</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* Right Sidebar: Trending Topics & Top Contributors (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Trending Topics Widget */}
            <div className="bg-[#141414] rounded-2xl p-5 border border-white/10 shadow-ambient-lvl1">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
                  Trending Topics
                </h3>
              </div>

              <div className="flex flex-col gap-2">
                {TRENDING_TOPICS.map((topic) => (
                  <button
                    key={topic.tag}
                    onClick={() => onSelectTrendingTag(topic.tag)}
                    className="flex flex-col p-2.5 rounded-xl hover:bg-white/5 text-left transition-colors group cursor-pointer"
                  >
                    <span className="font-heading text-sm font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                      {topic.tag}
                    </span>
                    <span className="text-xs text-zinc-500 mt-0.5">{topic.count}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => onSelectCategory('all')}
                className="w-full mt-3 py-2.5 text-center text-xs font-semibold text-white hover:bg-white/10 rounded-xl border border-white/10 transition-colors cursor-pointer"
              >
                View All Topics
              </button>
            </div>

            {/* Top Contributors Widget */}
            <div className="bg-[#141414] rounded-2xl p-5 border border-white/10 shadow-ambient-lvl1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full pointer-events-none blur-2xl" />

              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
                    Top Contributors
                  </h3>
                </div>
              </div>

              <ul className="space-y-3 relative z-10">
                {TOP_CONTRIBUTORS.map((contributor) => (
                  <li
                    key={contributor.id}
                    onClick={() => onViewProfile(contributor.id)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-white/15 bg-[#18181b] flex items-center justify-center shrink-0">
                        {contributor.avatar ? (
                          <img
                            src={contributor.avatar}
                            alt={contributor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-heading text-xs font-bold text-white">
                            {contributor.initials || contributor.name.slice(0, 2)}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-heading text-xs font-bold text-white">
                          {contributor.name}
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          {contributor.department}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30 text-xs font-semibold">
                      {contributor.repType === 'bolt' ? (
                        <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ) : (
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      )}
                      <span>{contributor.reputation}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
