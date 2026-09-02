import React, { useState, useRef } from 'react';
import { 
  X, 
  CloudUpload, 
  Bold, 
  Italic, 
  Link as LinkIcon, 
  Code as CodeIcon, 
  ChevronDown, 
  FileText, 
  Image as ImageIcon,
  Check,
  Eye,
  Plus
} from 'lucide-react';
import { Post, AcademicCategory, Attachment } from '../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPost: (newPost: Partial<Post>) => void;
  defaultCategory?: AcademicCategory;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmitPost,
  defaultCategory = 'cse',
}) => {
  const [activeTab, setActiveTab] = useState<'question' | 'note'>('question');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<AcademicCategory>(defaultCategory === 'all' ? 'cse' : defaultCategory);
  const [tags, setTags] = useState<string[]>(['Physics']);
  const [customTagInput, setCustomTagInput] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [showCodeSnippet, setShowCodeSnippet] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleAddTag = (tagToAdd: string) => {
    const cleaned = tagToAdd.trim().replace(/^#/, '');
    if (cleaned && !tags.includes(cleaned)) {
      setTags([...tags, cleaned]);
    }
    setCustomTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as AcademicCategory;
    if (val) {
      setCategory(val);
      const catLabel = val === 'cse' ? 'Computer Science' : val === 'ece' ? 'ECE' : val === 'math' ? 'Mathematics' : 'Physics';
      if (!tags.includes(catLabel)) {
        setTags([...tags, catLabel]);
      }
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newAttachments: Attachment[] = Array.from(files).map((file) => ({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.type.includes('pdf') ? 'pdf' : 'image',
      pages: file.type.includes('pdf') ? Math.floor(Math.random() * 12) + 3 : undefined,
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onSubmitPost({
      type: activeTab,
      title: title.trim(),
      content: description.trim(),
      codeSnippet: showCodeSnippet && codeSnippet.trim() ? codeSnippet : undefined,
      category,
      tags: tags.length > 0 ? tags : ['General'],
      pageCount: activeTab === 'note' ? (attachments[0]?.pages || 14) : undefined,
      pdfThumbnail: activeTab === 'note' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtxeqTjUn2ViQ0-xvQY9ZeAiLhw1PZzePikeUqEuTmrPA2yu_9CsIyHnziAp4HzNuUUsfaD5cThM_0sRf8O5Nz2bIXL3Bt7jxatSmI5Ru17XHBip9mIu3MJaKE1Fs-k_OQXglkJBCsJKWZ952R4m4THFlUfanolg0ynWqWelNX8EWz7FjvANI_VD6zly2msZZQzch4b0bqj-kQV5vuSfx_bruVy4GAi_TjCwN_4jSpWxT8Wd3Ssdnpag' : undefined,
      attachments,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#141414] w-full max-w-3xl rounded-3xl border border-white/10 shadow-modal overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-[#141414] sticky top-0 z-10">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-white">
            Create New Post
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Scrollable Form */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {/* Post Mode Tabs */}
          <div className="flex border-b border-white/10 mb-5 gap-4" role="tablist">
            <button
              type="button"
              onClick={() => setActiveTab('question')}
              className={`px-4 py-2 border-b-2 font-heading font-bold text-xs transition-colors cursor-pointer ${
                activeTab === 'question'
                  ? 'border-white text-white'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Ask a Question
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('note')}
              className={`px-4 py-2 border-b-2 font-heading font-bold text-xs transition-colors cursor-pointer ${
                activeTab === 'note'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Upload Notes
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Title Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="post-title" className="font-heading font-semibold text-xs text-zinc-300">
                Title
              </label>
              <input
                id="post-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  activeTab === 'question'
                    ? 'e.g., Need help understanding Quantum Entanglement'
                    : 'e.g., Complete Study Guide: Quantum Mechanics II (Midterm Prep)'
                }
                className="w-full px-3.5 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-colors"
                required
              />
            </div>

            {/* Category Dropdown & Tags */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="post-tags-select" className="font-heading font-semibold text-xs text-zinc-300">
                Tags & Category
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="relative">
                  <select
                    id="post-tags-select"
                    value={category}
                    onChange={handleCategorySelect}
                    className="w-full px-3.5 py-2.5 bg-[#18181b] border border-white/10 rounded-xl text-sm text-zinc-100 appearance-none focus:outline-none focus:border-white/30 cursor-pointer pr-8"
                  >
                    <option value="cse">Computer Science (CSE)</option>
                    <option value="ece">Electronics (ECE)</option>
                    <option value="physics">Physics</option>
                    <option value="math">Mathematics</option>
                    <option value="general">General Academic Notes</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={customTagInput}
                    onChange={(e) => setCustomTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag(customTagInput);
                      }
                    }}
                    placeholder="Add custom tag (e.g. react)"
                    className="flex-1 px-3 py-2 bg-[#18181b] border border-white/10 rounded-xl text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-white/30"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddTag(customTagInput)}
                    className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl border border-white/10 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 mt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-zinc-300"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-rose-400 focus:outline-none cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Description with Formatting Toolbar */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="post-description" className="font-heading font-semibold text-xs text-zinc-300">
                  Detailed Description
                </label>
                
                <div className="flex items-center gap-1 text-zinc-400">
                  <button
                    type="button"
                    onClick={() => setDescription((prev) => `${prev} **bold text** `)}
                    className="p-1 hover:bg-white/5 rounded text-zinc-300 hover:text-white cursor-pointer"
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDescription((prev) => `${prev} *italic text* `)}
                    className="p-1 hover:bg-white/5 rounded text-zinc-300 hover:text-white cursor-pointer"
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDescription((prev) => `${prev} [Link description](url) `)}
                    className="p-1 hover:bg-white/5 rounded text-zinc-300 hover:text-white cursor-pointer"
                    title="Link"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCodeSnippet(!showCodeSnippet)}
                    className={`p-1 rounded cursor-pointer ${
                      showCodeSnippet ? 'bg-white text-black' : 'hover:bg-white/5 text-zinc-300'
                    }`}
                    title="Toggle Code Block"
                  >
                    <CodeIcon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode(!previewMode)}
                    className={`p-1 rounded text-xs font-semibold px-2 flex items-center gap-1 ${
                      previewMode ? 'bg-white text-black' : 'hover:bg-white/5 text-zinc-300'
                    }`}
                    title="Preview"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{previewMode ? 'Edit' : 'Preview'}</span>
                  </button>
                </div>
              </div>

              {previewMode ? (
                <div className="w-full p-3.5 bg-[#18181b] border border-white/10 rounded-xl min-h-[140px] text-sm leading-relaxed text-zinc-200 whitespace-pre-line">
                  {description || <span className="text-zinc-500 italic">No description provided yet...</span>}
                </div>
              ) : (
                <textarea
                  id="post-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your question or the contents of your notes in detail. Markdown is supported."
                  rows={5}
                  className="w-full p-3.5 bg-[#18181b] border border-white/10 rounded-xl text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 leading-relaxed"
                  required
                />
              )}
            </div>

            {/* Optional Code Snippet Input */}
            {showCodeSnippet && (
              <div className="flex flex-col gap-1.5 animate-in fade-in duration-150">
                <label className="font-heading font-semibold text-xs text-zinc-300">
                  Code Snippet (Formatted with monospace syntax)
                </label>
                <textarea
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  placeholder="// Paste your code or function implementation here"
                  rows={4}
                  className="w-full p-3 font-mono text-xs text-zinc-100 bg-[#18181b] border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
                />
              </div>
            )}

            {/* Attachments / Drag & Drop Upload Zone */}
            <div className="flex flex-col gap-1.5">
              <label className="font-heading font-semibold text-xs text-zinc-300">
                Attachments {activeTab === 'note' ? '(Required for study notes)' : '(Optional)'}
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFileUpload(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`border border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-emerald-400 bg-emerald-500/10'
                    : 'border-white/15 bg-[#18181b] hover:bg-[#1f1f23]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,image/*,.doc,.docx,.zip"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />
                <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-2 text-white">
                  <CloudUpload className="w-5 h-5 text-amber-400" />
                </div>
                <p className="font-heading font-semibold text-xs text-zinc-200 mb-0.5">
                  Click to upload or drag and drop
                </p>
                <p className="text-[11px] text-zinc-400">PDF, PNG, JPG (Max. 10MB)</p>
              </div>

              {/* Uploaded Files list */}
              {attachments.length > 0 && (
                <div className="flex flex-col gap-1.5 mt-1">
                  {attachments.map((att, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#18181b] border border-white/10 text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        <span className="font-medium text-zinc-200 truncate">{att.name}</span>
                        <span className="text-[10px] text-zinc-400">({att.size})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}
                        className="text-zinc-400 hover:text-rose-400 p-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-white/10 text-zinc-300 hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-black hover:bg-zinc-200 transition-all shadow-md cursor-pointer active:scale-98"
                id="submit-post-btn"
              >
                Post to Community
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
