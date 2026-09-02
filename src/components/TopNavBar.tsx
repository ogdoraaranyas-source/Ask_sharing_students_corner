import React, { useState } from 'react';
import { Search, Bell, Bookmark, Plus, X, Check, BookOpen } from 'lucide-react';
import { UserProfile, NotificationItem } from '../types';

interface TopNavBarProps {
  currentUser: UserProfile;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeNav: 'explore' | 'community' | 'profile';
  onNavChange: (nav: 'explore' | 'community' | 'profile') => void;
  onOpenCreatePost: () => void;
  onOpenBookmarks: () => void;
  bookmarksCount: number;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onSelectPost: (postId: string) => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentUser,
  searchQuery,
  onSearchChange,
  activeNav,
  onNavChange,
  onOpenCreatePost,
  onOpenBookmarks,
  bookmarksCount,
  notifications,
  onMarkNotificationRead,
  onSelectPost,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md w-full border-b border-white/10 shadow-ambient-lvl1 transition-all">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand & Search */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavChange('community')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            id="logo-brand-btn"
          >
            <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
              <span className="font-heading">S</span>
            </div>
            <span className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
              ScholarSync
            </span>
          </button>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex relative w-72 lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search questions, notes, tags..."
              className="w-full bg-[#141414] border border-white/10 rounded-xl py-2 pl-9 pr-8 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
              id="top-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-2 font-medium text-sm">
          <button
            onClick={() => onNavChange('explore')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeNav === 'explore'
                ? 'bg-white/10 text-white font-semibold border border-white/15 shadow-xs'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            id="nav-explore-btn"
          >
            Explore
          </button>
          <button
            onClick={() => onNavChange('community')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeNav === 'community'
                ? 'bg-white/10 text-white font-semibold border border-white/15 shadow-xs'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            id="nav-community-btn"
          >
            Community
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors relative cursor-pointer"
              aria-label="Notifications"
              id="notifications-toggle-btn"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-[#0A0A0A]" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#141414] border border-white/10 rounded-2xl shadow-modal z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-[#18181b]">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-white" />
                    <span className="font-heading font-semibold text-sm text-white">Notifications</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-zinc-300">
                    {unreadCount} unread
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        onMarkNotificationRead(n.id);
                        if (n.targetPostId) {
                          onSelectPost(n.targetPostId);
                          setShowNotifications(false);
                        }
                      }}
                      className={`p-3 hover:bg-white/5 cursor-pointer transition-colors ${
                        !n.read ? 'bg-white/[0.03] border-l-4 border-l-[#8B5CF6]' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-zinc-100">{n.title}</h4>
                        <span className="text-[10px] text-zinc-500 whitespace-nowrap">{n.time}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{n.description}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-white/10 text-center bg-[#18181b]">
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-zinc-400 hover:text-white font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bookmarks quick button */}
          <button
            onClick={onOpenBookmarks}
            className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors relative cursor-pointer"
            aria-label="Bookmarks"
            title="View Saved Bookmarks"
            id="bookmarks-top-btn"
          >
            <Bookmark className="w-5 h-5" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#8B5CF6] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Primary Ask Question Button */}
          <button
            onClick={onOpenCreatePost}
            className="hidden sm:flex items-center gap-1.5 bg-white text-black text-xs font-bold px-4 py-2 rounded-xl hover:bg-zinc-200 transition-all shadow-md active:scale-95 cursor-pointer"
            id="ask-question-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Ask Question</span>
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => onNavChange('profile')}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/20 transition-all cursor-pointer ${
              activeNav === 'profile' ? 'ring-2 ring-white scale-105' : 'hover:border-white'
            }`}
            title="Dr. Eleanor Vance Profile"
            id="user-profile-avatar-btn"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Mobile Search Row */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-white/10 bg-[#0A0A0A]">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search questions, notes, tags..."
              className="w-full bg-[#141414] border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-white/30"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};
