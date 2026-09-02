import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronUp, 
  ChevronDown, 
  Bookmark, 
  CheckCircle2, 
  Copy, 
  Check, 
  Share2, 
  MessageSquare, 
  Zap, 
  Star,
  Send,
  Code2,
  Bold,
  Italic,
  Link2,
  CornerDownRight
} from 'lucide-react';
import { Post, Answer } from '../types';
import { RELATED_QUESTIONS } from '../data/mockData';

interface QuestionDetailViewProps {
  post: Post;
  onBack: () => void;
  onVotePost: (postId: string, direction: 1 | -1) => void;
  onToggleBookmark: (postId: string) => void;
  onVoteAnswer: (postId: string, answerId: string, direction: 1 | -1) => void;
  onAddAnswer: (postId: string, content: string, codeSnippet?: string) => void;
  onSelectRelatedQuestion: (questionTitle: string) => void;
  onViewProfile: (userId?: string) => void;
}

export const QuestionDetailView: React.FC<QuestionDetailViewProps> = ({
  post,
  onBack,
  onVotePost,
  onToggleBookmark,
  onVoteAnswer,
  onAddAnswer,
  onSelectRelatedQuestion,
  onViewProfile,
}) => {
  const [answerContent, setAnswerContent] = useState('');
  const [answerCode, setAnswerCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAnswerCodeId, setCopiedAnswerCodeId] = useState<string | null>(null);
  const [sortAnswersBy, setSortAnswersBy] = useState<'highest' | 'newest'>('highest');

  const handleCopy = (code: string, id?: string) => {
    navigator.clipboard.writeText(code);
    if (id) {
      setCopiedAnswerCodeId(id);
      setTimeout(() => setCopiedAnswerCodeId(null), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerContent.trim()) return;
    onAddAnswer(post.id, answerContent, answerCode.trim() ? answerCode : undefined);
    setAnswerContent('');
    setAnswerCode('');
    setShowCodeInput(false);
  };

  const sortedAnswers = [...post.answers].sort((a, b) => {
    if (a.isAccepted) return -1;
    if (b.isAccepted) return 1;
    if (sortAnswersBy === 'highest') {
      return b.votes - a.votes;
    }
    return b.id.localeCompare(a.id);
  });

  return (
    <div className="flex-1 w-full max-w-[1280px] mx-auto p-4 sm:p-6 lg:p-8 pb-20 bg-[#0A0A0A]">
      {/* Back to feed button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white mb-4 px-3.5 py-2 rounded-xl hover:bg-[#141414] border border-transparent hover:border-white/10 transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Discussions</span>
      </button>

      {/* Main Layout Container */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left / Main Question Area */}
        <main className="flex-1 w-full lg:w-8/12">
          {/* Question Header */}
          <div className="mb-6">
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-zinc-400 text-xs">
              <span>Asked <time>{post.createdAt}</time></span>
              <span>•</span>
              <span>Viewed {post.views} times</span>
              {post.courseCode && (
                <>
                  <span>•</span>
                  <span className="font-semibold text-emerald-400">{post.courseCode}</span>
                </>
              )}
            </div>
          </div>

          {/* Question Body Bento Card */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 sm:p-6 mb-8 shadow-ambient-lvl1">
            <div className="flex gap-4 sm:gap-6">
              {/* Vote Column */}
              <div className="flex flex-col items-center gap-1 shrink-0">
                <button
                  onClick={() => onVotePost(post.id, post.userVote === 1 ? -1 : 1)}
                  className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                    post.userVote === 1
                      ? 'text-[#A78BFA] bg-[#8B5CF6]/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                  title="Upvote question"
                  id="upvote-question-btn"
                >
                  <ChevronUp className="w-7 h-7" />
                </button>
                <span className={`font-heading text-lg font-bold ${
                  post.userVote === 1 ? 'text-[#A78BFA]' : 'text-white'
                }`}>
                  {post.votes}
                </span>
                <button
                  onClick={() => onVotePost(post.id, post.userVote === -1 ? 1 : -1)}
                  className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                    post.userVote === -1
                      ? 'text-rose-400 bg-rose-500/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                  title="Downvote question"
                  id="downvote-question-btn"
                >
                  <ChevronDown className="w-7 h-7" />
                </button>
                <button
                  onClick={() => onToggleBookmark(post.id)}
                  className={`mt-2 p-1.5 rounded-xl transition-colors cursor-pointer ${
                    post.bookmarked
                      ? 'text-[#A78BFA] bg-[#8B5CF6]/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                  title="Bookmark question"
                >
                  <Bookmark className={`w-5 h-5 ${post.bookmarked ? 'fill-[#A78BFA]' : ''}`} />
                </button>
              </div>

              {/* Body Column */}
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed mb-4 whitespace-pre-line">
                  {post.content}
                </p>

                {/* Code Snippet Block */}
                {post.codeSnippet && (
                  <div className="relative mb-5 group">
                    <div className="flex items-center justify-between bg-[#1f1f23] px-3.5 py-1.5 rounded-t-xl border-t border-x border-white/10 text-xs font-mono text-zinc-400">
                      <span>{post.codeLanguage || 'code'}</span>
                      <button
                        onClick={() => handleCopy(post.codeSnippet!)}
                        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                        title="Copy code"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="bg-[#18181b] p-4 rounded-b-xl overflow-x-auto text-xs sm:text-sm font-mono border border-white/10 leading-relaxed text-zinc-100">
                      <code>{post.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {/* Tags & Author Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/5 text-zinc-300 text-xs font-medium px-3 py-1 rounded-full border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Author Card Box */}
                  <div
                    onClick={() => onViewProfile(post.author.id)}
                    className="flex items-center gap-3 bg-[#18181b] p-2.5 rounded-xl border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
                  >
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <div className="font-heading text-xs font-bold text-white">
                        {post.author.name}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-amber-300 mt-0.5">
                        <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{post.author.reputation.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Answers Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              {sortedAnswers.length} {sortedAnswers.length === 1 ? 'Answer' : 'Answers'}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSortAnswersBy('highest')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                  sortAnswersBy === 'highest'
                    ? 'bg-white text-black border-white'
                    : 'text-zinc-400 border-white/10 hover:bg-white/5 hover:text-white'
                }`}
              >
                Highest score
              </button>
              <button
                onClick={() => setSortAnswersBy('newest')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                  sortAnswersBy === 'newest'
                    ? 'bg-white text-black border-white'
                    : 'text-zinc-400 border-white/10 hover:bg-white/5 hover:text-white'
                }`}
              >
                Date created
              </button>
            </div>
          </div>

          {/* Answers List */}
          <div className="flex flex-col gap-4 mb-8">
            {sortedAnswers.map((answer) => {
              const isAccepted = answer.isAccepted;

              return (
                <div
                  key={answer.id}
                  className={`bg-[#141414] rounded-2xl p-5 sm:p-6 border border-white/10 shadow-ambient-lvl1 ${
                    isAccepted ? 'border-l-4 border-l-[#8B5CF6]' : ''
                  }`}
                  id={`answer-${answer.id}`}
                >
                  <div className="flex gap-4 sm:gap-6">
                    {/* Answer Votes */}
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <button
                        onClick={() => onVoteAnswer(post.id, answer.id, answer.userVote === 1 ? -1 : 1)}
                        className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                          answer.userVote === 1
                            ? 'text-[#A78BFA] bg-[#8B5CF6]/20'
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <ChevronUp className="w-7 h-7" />
                      </button>
                      <span className="font-heading text-lg font-bold text-white">
                        {answer.votes}
                      </span>
                      <button
                        onClick={() => onVoteAnswer(post.id, answer.id, answer.userVote === -1 ? 1 : -1)}
                        className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                          answer.userVote === -1
                            ? 'text-rose-400 bg-rose-500/20'
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <ChevronDown className="w-7 h-7" />
                      </button>
                      {isAccepted && (
                        <div title="Accepted Answer" className="mt-2 text-emerald-400">
                          <CheckCircle2 className="w-6 h-6 fill-emerald-500/20 text-emerald-400" />
                        </div>
                      )}
                    </div>

                    {/* Answer Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base text-zinc-200 leading-relaxed mb-4 whitespace-pre-line">
                        {answer.content}
                      </p>

                      {answer.codeSnippet && (
                        <div className="relative mb-4 group">
                          <div className="flex items-center justify-between bg-[#1f1f23] px-3.5 py-1.5 rounded-t-xl border-t border-x border-white/10 text-xs font-mono text-zinc-400">
                            <span>{answer.codeLanguage || 'code'}</span>
                            <button
                              onClick={() => handleCopy(answer.codeSnippet!, answer.id)}
                              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                            >
                              {copiedAnswerCodeId === answer.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400 font-medium">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="bg-[#18181b] p-4 rounded-b-xl overflow-x-auto text-xs sm:text-sm font-mono border border-white/10 leading-relaxed text-zinc-100">
                            <code>{answer.codeSnippet}</code>
                          </pre>
                        </div>
                      )}

                      {/* Answer Author Footer */}
                      <div className="flex justify-end mt-4 pt-4 border-t border-white/10">
                        <div
                          onClick={() => onViewProfile(answer.author.id)}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <span className="text-xs text-zinc-400">
                            Answered {answer.createdAt} by
                          </span>
                          <img
                            src={answer.author.avatar}
                            alt={answer.author.name}
                            className="w-8 h-8 rounded-full object-cover border border-white/20 group-hover:ring-2 group-hover:ring-white"
                          />
                          <div>
                            <div className="font-heading text-xs font-bold text-white group-hover:underline">
                              {answer.author.name}
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-amber-300">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>{answer.author.reputation > 999 ? `${(answer.author.reputation/1000).toFixed(0)}k` : answer.author.reputation}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Your Answer Input Form */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-ambient-lvl1">
            <h3 className="font-heading text-lg font-bold text-white mb-3 flex items-center gap-2">
              <CornerDownRight className="w-5 h-5 text-amber-400" />
              <span>Your Answer</span>
            </h3>

            <form onSubmit={handleSubmitAnswer} className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs text-zinc-400">
                <span>Support for Markdown formatting</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setAnswerContent((prev) => `${prev} **bold text** `)}
                    className="p-1 hover:bg-white/5 rounded text-zinc-300 hover:text-white"
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnswerContent((prev) => `${prev} *italic text* `)}
                    className="p-1 hover:bg-white/5 rounded text-zinc-300 hover:text-white"
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCodeInput(!showCodeInput)}
                    className={`p-1.5 rounded-lg flex items-center gap-1 text-xs font-semibold ${
                      showCodeInput ? 'bg-white text-black' : 'hover:bg-white/5 text-zinc-300'
                    }`}
                    title="Insert Code Block"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </button>
                </div>
              </div>

              <textarea
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                placeholder="Write your explanation or solution here..."
                rows={5}
                className="w-full p-3.5 text-sm text-zinc-100 bg-[#18181b] border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 leading-relaxed placeholder:text-zinc-500"
                required
              />

              {showCodeInput && (
                <div className="flex flex-col gap-1.5 animate-in fade-in duration-150">
                  <label className="text-xs font-semibold text-zinc-300">
                    Code Block Snippet (Optional)
                  </label>
                  <textarea
                    value={answerCode}
                    onChange={(e) => setAnswerCode(e.target.value)}
                    placeholder="// Paste your code solution here"
                    rows={4}
                    className="w-full p-3 font-mono text-xs text-zinc-100 bg-[#18181b] border border-white/10 rounded-xl focus:outline-none focus:border-white/30 placeholder:text-zinc-600"
                  />
                </div>
              )}

              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!answerContent.trim()}
                  className="flex items-center gap-2 bg-white text-black font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-zinc-200 disabled:opacity-50 transition-all shadow-md cursor-pointer active:scale-98"
                  id="post-answer-btn"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Answer</span>
                </button>
              </div>
            </form>
          </div>
        </main>

        {/* Right Sidebar: Related Questions */}
        <aside className="w-full lg:w-4/12 flex flex-col gap-6">
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 shadow-ambient-lvl1 sticky top-24">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-3 border-b border-white/10 pb-3">
              Related Questions
            </h3>

            <ul className="flex flex-col divide-y divide-white/5">
              {RELATED_QUESTIONS.map((rel) => (
                <li key={rel.id} className="py-3">
                  <button
                    onClick={() => onSelectRelatedQuestion(rel.title)}
                    className="font-body text-xs sm:text-sm text-zinc-200 hover:text-emerald-400 transition-colors block text-left mb-1.5 leading-snug font-medium cursor-pointer"
                  >
                    {rel.title}
                  </button>
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span className="flex items-center gap-1 font-semibold text-zinc-200">
                      <ChevronUp className="w-3.5 h-3.5 text-[#A78BFA]" /> {rel.votes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> {rel.answersCount}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};
