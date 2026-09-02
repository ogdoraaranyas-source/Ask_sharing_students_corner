import React, { useState } from 'react';
import { TopNavBar } from './components/TopNavBar';
import { SideNavBar } from './components/SideNavBar';
import { FeedView } from './components/FeedView';
import { QuestionDetailView } from './components/QuestionDetailView';
import { ProfileView } from './components/ProfileView';
import { ExploreView } from './components/ExploreView';
import { CreatePostModal } from './components/CreatePostModal';
import { NotePreviewModal } from './components/NotePreviewModal';
import { JoinGroupModal } from './components/JoinGroupModal';
import { SettingsModal } from './components/SettingsModal';
import { HelpModal } from './components/HelpModal';
import { 
  CURRENT_USER, 
  INITIAL_STUDY_GROUPS, 
  INITIAL_POSTS, 
  INITIAL_NOTIFICATIONS,
  TOP_CONTRIBUTORS 
} from './data/mockData';
import { Post, AcademicCategory, UserProfile, NotificationItem, StudyGroup } from './types';

export default function App() {
  // State
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>(INITIAL_STUDY_GROUPS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  
  // Navigation & View States
  const [activeNav, setActiveNav] = useState<'explore' | 'community' | 'profile'>('community');
  const [selectedCategory, setSelectedCategory] = useState<AcademicCategory>('all');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [previewNotePost, setPreviewNotePost] = useState<Post | null>(null);
  const [viewingProfileUser, setViewingProfileUser] = useState<UserProfile>(CURRENT_USER);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal Dialogs
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isJoinGroupModalOpen, setIsJoinGroupModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Voting on a post
  const handleVotePost = (postId: string, direction: 1 | -1) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;
        const currentVote = post.userVote || 0;
        const newVote = currentVote === direction ? 0 : direction;
        const delta = newVote - currentVote;
        return {
          ...post,
          votes: post.votes + delta,
          userVote: newVote as 1 | -1 | 0,
        };
      })
    );
  };

  // Voting on an answer
  const handleVoteAnswer = (postId: string, answerId: string, direction: 1 | -1) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;
        const updatedAnswers = post.answers.map((ans) => {
          if (ans.id !== answerId) return ans;
          const currentVote = ans.userVote || 0;
          const newVote = currentVote === direction ? 0 : direction;
          const delta = newVote - currentVote;
          return {
            ...ans,
            votes: ans.votes + delta,
            userVote: newVote as 1 | -1 | 0,
          };
        });
        return {
          ...post,
          answers: updatedAnswers,
        };
      })
    );
  };

  // Bookmark toggle
  const handleToggleBookmark = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
      )
    );
  };

  // Note like
  const handleLikeNote = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;
        const wasLiked = post.userLiked;
        return {
          ...post,
          userLiked: !wasLiked,
          likesCount: (post.likesCount || 0) + (wasLiked ? -1 : 1),
        };
      })
    );
    if (previewNotePost && previewNotePost.id === postId) {
      setPreviewNotePost((prev) =>
        prev
          ? {
              ...prev,
              userLiked: !prev.userLiked,
              likesCount: (prev.likesCount || 0) + (prev.userLiked ? -1 : 1),
            }
          : null
      );
    }
  };

  // Adding an answer
  const handleAddAnswer = (postId: string, content: string, codeSnippet?: string) => {
    const newAnswer = {
      id: `ans-${Date.now()}`,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        reputation: currentUser.reputation,
        repType: 'star' as const,
      },
      content,
      codeSnippet,
      votes: 1,
      createdAt: 'Just now',
      userVote: 1 as const,
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          answersCount: post.answersCount + 1,
          answers: [...post.answers, newAnswer],
        };
      })
    );

    // Increase user stats
    setCurrentUser((prev) => ({
      ...prev,
      reputation: prev.reputation + 15,
      stats: {
        ...prev.stats,
        totalUpvotes: prev.stats.totalUpvotes + 1,
      },
    }));
  };

  // Creating a new post or note
  const handleCreatePost = (newPostData: Partial<Post>) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      type: newPostData.type || 'question',
      title: newPostData.title || '',
      content: newPostData.content || '',
      category: newPostData.category || 'cse',
      tags: newPostData.tags || ['General'],
      author: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        reputation: currentUser.reputation,
        repType: 'star',
      },
      votes: 1,
      userVote: 1,
      answersCount: 0,
      views: 1,
      createdAt: 'Just now',
      answers: [],
      codeSnippet: newPostData.codeSnippet,
      codeLanguage: 'typescript',
      pageCount: newPostData.pageCount,
      pdfThumbnail: newPostData.pdfThumbnail,
      likesCount: newPostData.type === 'note' ? 1 : undefined,
      downloadCount: newPostData.type === 'note' ? 0 : undefined,
      userLiked: newPostData.type === 'note' ? true : undefined,
      bookmarked: false,
      attachments: newPostData.attachments,
    };

    setPosts([newPost, ...posts]);
    setActiveNav('community');
    setSelectedPostId(null);

    // Update stats if it's a note
    if (newPost.type === 'note') {
      setCurrentUser((prev) => ({
        ...prev,
        reputation: prev.reputation + 25,
        stats: {
          ...prev.stats,
          notesShared: prev.stats.notesShared + 1,
        },
      }));
    }
  };

  // Join or leave a study group
  const handleToggleJoinGroup = (groupId: string) => {
    setStudyGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              isJoined: !g.isJoined,
              membersCount: g.isJoined ? g.membersCount - 1 : g.membersCount + 1,
            }
          : g
      )
    );
  };

  // Update user profile
  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...updated }));
    setViewingProfileUser((prev) => ({ ...prev, ...updated }));
  };

  // Mark notification read
  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Navigate to trending tag
  const handleSelectTrendingTag = (tag: string) => {
    setSearchQuery(tag);
    setSelectedPostId(null);
    setActiveNav('community');
  };

  // View specific user profile
  const handleViewProfile = (userId?: string) => {
    if (!userId || userId === currentUser.id) {
      setViewingProfileUser(currentUser);
    } else {
      const found = TOP_CONTRIBUTORS.find((c) => c.id === userId);
      if (found) {
        setViewingProfileUser({
          id: found.id,
          name: found.name,
          department: found.department,
          avatar: found.avatar || '',
          reputation: found.reputation === '12.45k' ? 12450 : typeof found.reputation === 'string' ? parseFloat(found.reputation) * 1000 : found.reputation,
          bio: `Faculty and active mentor in ${found.department}. Published researcher and active problem solver on ScholarSync.`,
          badges: [{ label: 'Faculty / Fellow', icon: 'school' }],
          followedCourses: [{ code: 'ADV 501', title: 'Advanced Research Topics' }],
          stats: {
            totalUpvotes: 4200,
            acceptedAns: 198,
            notesShared: 38,
            coursesCount: 8,
          },
        });
      } else {
        setViewingProfileUser(currentUser);
      }
    }
    setActiveNav('profile');
    setSelectedPostId(null);
  };

  // Bookmarks count
  const bookmarksCount = posts.filter((p) => p.bookmarked).length;

  // Selected post object for QuestionDetailView
  const currentSelectedPost = selectedPostId
    ? posts.find((p) => p.id === selectedPostId)
    : null;

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-body selection:bg-[#6cf8bb] selection:text-[#002113]">
      {/* Top Application Bar */}
      <TopNavBar
        currentUser={currentUser}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeNav={activeNav}
        onNavChange={(nav) => {
          setActiveNav(nav);
          setSelectedPostId(null);
          if (nav === 'profile') {
            setViewingProfileUser(currentUser);
          }
        }}
        onOpenCreatePost={() => setIsCreatePostModalOpen(true)}
        onOpenBookmarks={() => {
          setActiveNav('profile');
          setSelectedPostId(null);
        }}
        bookmarksCount={bookmarksCount}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onSelectPost={(id) => {
          setSelectedPostId(id);
          setActiveNav('community');
        }}
      />

      {/* Main App Layout */}
      <div className="flex-1 flex w-full max-w-[1440px] mx-auto">
        {/* Left Side Navigation Bar */}
        <SideNavBar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSelectedPostId(null);
            setActiveNav('community');
          }}
          onOpenJoinGroup={() => setIsJoinGroupModalOpen(true)}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          onOpenHelp={() => setIsHelpModalOpen(true)}
        />

        {/* Dynamic Center Stage Content Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Detail View for Single Question */}
          {selectedPostId && currentSelectedPost ? (
            <QuestionDetailView
              post={currentSelectedPost}
              onBack={() => setSelectedPostId(null)}
              onVotePost={handleVotePost}
              onToggleBookmark={handleToggleBookmark}
              onVoteAnswer={handleVoteAnswer}
              onAddAnswer={handleAddAnswer}
              onSelectRelatedQuestion={(questionTitle) => {
                const matched = posts.find((p) => p.title.toLowerCase().includes(questionTitle.toLowerCase().slice(0, 15)));
                if (matched) {
                  setSelectedPostId(matched.id);
                } else {
                  // If question title isn't a direct post ID, create a mock search query or post view
                  setSearchQuery(questionTitle);
                  setSelectedPostId(null);
                }
              }}
              onViewProfile={handleViewProfile}
            />
          ) : activeNav === 'profile' ? (
            <ProfileView
              user={viewingProfileUser}
              posts={posts}
              onSelectPost={(id) => {
                setSelectedPostId(id);
                setActiveNav('community');
              }}
              onPreviewNote={(notePost) => setPreviewNotePost(notePost)}
              onBackToFeed={() => setActiveNav('community')}
            />
          ) : activeNav === 'explore' ? (
            <ExploreView
              groups={studyGroups}
              posts={posts}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setActiveNav('community');
              }}
              onSelectPost={(id) => {
                setSelectedPostId(id);
                setActiveNav('community');
              }}
              onPreviewNote={(notePost) => setPreviewNotePost(notePost)}
              onOpenJoinGroup={() => setIsJoinGroupModalOpen(true)}
            />
          ) : (
            /* Default: Feed View */
            <FeedView
              posts={posts}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectPost={(id) => setSelectedPostId(id)}
              onVotePost={handleVotePost}
              onToggleBookmark={handleToggleBookmark}
              onLikeNote={handleLikeNote}
              onPreviewNote={(notePost) => setPreviewNotePost(notePost)}
              searchQuery={searchQuery}
              onSelectTrendingTag={handleSelectTrendingTag}
              onViewProfile={handleViewProfile}
            />
          )}
        </main>
      </div>

      {/* Floating Action Button on Mobile */}
      <div className="sm:hidden fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsCreatePostModalOpen(true)}
          className="w-14 h-14 rounded-full bg-black text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          aria-label="Create Post"
          id="mobile-fab-create-btn"
        >
          <span className="text-2xl font-bold">+</span>
        </button>
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onSubmitPost={handleCreatePost}
        defaultCategory={selectedCategory}
      />

      <NotePreviewModal
        post={previewNotePost}
        onClose={() => setPreviewNotePost(null)}
        onLikeNote={handleLikeNote}
        onToggleBookmark={handleToggleBookmark}
      />

      <JoinGroupModal
        isOpen={isJoinGroupModalOpen}
        onClose={() => setIsJoinGroupModalOpen(false)}
        groups={studyGroups}
        onToggleJoin={handleToggleJoinGroup}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
      />

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
}
