import React, { useState } from 'react';
import { X, Bell, Moon, Sun, Shield, BookOpen, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
}) => {
  const [name, setName] = useState(currentUser.name);
  const [department, setDepartment] = useState(currentUser.department);
  const [bio, setBio] = useState(currentUser.bio);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [answerNotifs, setAnswerNotifs] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name, department, bio });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141414] w-full max-w-lg rounded-3xl border border-white/10 shadow-modal overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="font-heading text-lg font-bold text-white">ScholarSync Settings</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/5 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="font-heading font-semibold text-xs text-zinc-300">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-white/30"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-heading font-semibold text-xs text-zinc-300">Department / Discipline</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-white/30"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-heading font-semibold text-xs text-zinc-300">Academic Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-3.5 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-white/30"
            />
          </div>

          <div className="pt-3 border-t border-white/10 space-y-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-zinc-400">Notifications</h3>
            <label className="flex items-center justify-between cursor-pointer py-1">
              <span className="text-xs text-zinc-300">Email notifications for new answers</span>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded bg-[#18181b] border-white/10"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer py-1">
              <span className="text-xs text-zinc-300">Notify me when study notes are uploaded in my courses</span>
              <input
                type="checkbox"
                checked={answerNotifs}
                onChange={(e) => setAnswerNotifs(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded bg-[#18181b] border-white/10"
              />
            </label>
          </div>

          <div className="flex justify-end gap-2.5 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold border border-white/10 rounded-xl text-zinc-300 hover:bg-white/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-white text-black rounded-xl hover:bg-zinc-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-emerald-600" /> : null}
              <span>{savedSuccess ? 'Saved' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
