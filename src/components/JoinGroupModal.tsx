import React, { useState } from 'react';
import { X, Check, Users, Plus, Code, Cpu, Variable, Atom, Dna, Brain } from 'lucide-react';
import { StudyGroup } from '../types';

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  groups: StudyGroup[];
  onToggleJoin: (groupId: string) => void;
}

export const JoinGroupModal: React.FC<JoinGroupModalProps> = ({
  isOpen,
  onClose,
  groups,
  onToggleJoin,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = groups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.code.toLowerCase().includes(search.toLowerCase()) ||
    g.description.toLowerCase().includes(search.toLowerCase())
  );

  const getGroupIcon = (icon: string) => {
    switch (icon) {
      case 'code': return Code;
      case 'memory': return Cpu;
      case 'functions': return Variable;
      case 'science': return Atom;
      case 'biotech': return Dna;
      case 'psychology': return Brain;
      default: return Code;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141414] w-full max-w-xl rounded-3xl border border-white/10 shadow-modal overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div>
            <h2 className="font-heading text-lg font-bold text-white">Join Academic Study Groups</h2>
            <p className="text-xs text-zinc-400">Connect with peers in your department and courses</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-white/10 bg-[#18181b]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search academic groups (e.g., CSE, Physics)..."
            className="w-full px-3.5 py-2.5 bg-[#141414] border border-white/10 rounded-xl text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-white/30"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.map((group) => {
            const Icon = getGroupIcon(group.icon);
            return (
              <div
                key={group.id}
                className="p-4 rounded-2xl border border-white/10 bg-[#18181b] hover:bg-[#1f1f23] transition-colors flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-200 border border-white/10 shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-sm text-white">{group.name}</h4>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-white/5 text-zinc-300 rounded-full border border-white/10">
                        {group.code}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{group.description}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mt-2">
                      <Users className="w-3.5 h-3.5" />
                      <span>{group.membersCount.toLocaleString()} members</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onToggleJoin(group.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                    group.isJoined
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/30'
                      : 'bg-white text-black hover:bg-zinc-200 font-bold'
                  }`}
                >
                  {group.isJoined ? 'Joined' : '+ Join'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="p-3.5 border-t border-white/10 bg-[#141414] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-black font-bold text-xs rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
