import React from 'react';
import { Home, Code, Cpu, Variable, Atom, Plus, Settings, HelpCircle, GraduationCap } from 'lucide-react';
import { AcademicCategory } from '../types';

interface SideNavBarProps {
  selectedCategory: AcademicCategory;
  onSelectCategory: (cat: AcademicCategory) => void;
  onOpenJoinGroup: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenJoinGroup,
  onOpenSettings,
  onOpenHelp,
}) => {
  const navItems: Array<{
    id: AcademicCategory;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'all', label: 'Home', icon: Home },
    { id: 'cse', label: 'CSE', icon: Code },
    { id: 'ece', label: 'ECE', icon: Cpu },
    { id: 'math', label: 'Math', icon: Variable },
    { id: 'physics', label: 'Physics', icon: Atom },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col gap-2 p-4 border-r border-white/10 bg-[#0A0A0A] min-h-[calc(100vh-57px)]">
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 mb-4 px-2 pt-2">
        <div className="w-10 h-10 rounded-2xl bg-[#18181b] flex items-center justify-center text-white border border-white/10 shadow-xs">
          <GraduationCap className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-base text-white leading-tight">
            Study Groups
          </h2>
          <p className="text-xs text-zinc-400 font-medium">Your Academic Hub</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-col gap-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedCategory === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 cursor-pointer text-left ${
                isActive
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
              id={`nav-tab-${item.id}`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Join New Group Button */}
        <button
          onClick={onOpenJoinGroup}
          className="w-full flex items-center justify-center gap-2 border border-white/10 bg-[#141414] text-white font-semibold text-xs py-2.5 px-3 rounded-xl hover:bg-[#1f1f23] hover:border-white/20 transition-all mt-3 shadow-xs cursor-pointer active:scale-98"
          id="join-new-group-btn"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Join New Group</span>
        </button>
      </div>

      {/* Footer Navigation */}
      <div className="mt-auto pt-3 border-t border-white/10 flex flex-col gap-1">
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-3 px-3.5 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl text-sm font-medium transition-colors text-left cursor-pointer"
          id="sidebar-settings-btn"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
        <button
          onClick={onOpenHelp}
          className="flex items-center gap-3 px-3.5 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl text-sm font-medium transition-colors text-left cursor-pointer"
          id="sidebar-help-btn"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Help</span>
        </button>
      </div>
    </aside>
  );
};
