import React, { useState } from 'react';
import { ScriptData, TAG_OPTIONS, STATUS_OPTIONS } from '../types';
import { ADMIN_PASSWORD } from '../constants';
import Button from './Button';
import { Lock, Upload, Trash2, LogOut } from 'lucide-react';

interface AdminPanelProps {
  onAddScript: (script: ScriptData) => void;
  onDeleteScript: (id: string) => void;
  scripts: ScriptData[];
  exitAdmin: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onAddScript, onDeleteScript, scripts, exitAdmin }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [code, setCode] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [status, setStatus] = useState<ScriptData['status']>('NEW');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Access Key');
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !code) return;

    const newScript: ScriptData = {
      id: Date.now().toString(),
      title,
      description: desc,
      code,
      tags: selectedTags,
      views: 0,
      status,
      author: 'Admin',
      createdAt: Date.now()
    };

    onAddScript(newScript);
    
    // Reset form
    setTitle('');
    setDesc('');
    setCode('');
    setSelectedTags([]);
    setStatus('NEW');
    alert('Script Uploaded Successfully');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 glass-panel rounded-2xl border border-white/10">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-white/5 rounded-full">
               <Lock className="w-8 h-8 text-nexus-cyan" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-white mb-2">Restricted Area</h2>
          <p className="text-center text-gray-500 mb-8">Enter access key to continue.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-nexus-accent outline-none"
              placeholder="Access Key..."
              autoFocus
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" glow className="w-full">Authenticate</Button>
          </form>
          <div className="mt-4 text-center">
            <button onClick={exitAdmin} className="text-gray-500 text-sm hover:text-white underline">Return to Site</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <div className="w-3 h-8 bg-nexus-cyan rounded-full"></div>
          Admin Dashboard
        </h2>
        <Button variant="outline" onClick={exitAdmin}>
          <LogOut className="w-4 h-4 mr-2" /> Exit
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Upload className="w-5 h-5 text-nexus-accent" /> Upload New Script
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Script Title</label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded focus:border-nexus-accent outline-none text-white"
                  placeholder="e.g. Blox Fruits Auto Farm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded focus:border-nexus-accent outline-none text-white h-24 resize-none"
                  placeholder="Short description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Lua Code</label>
                <textarea
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded focus:border-nexus-accent outline-none text-white font-mono text-xs h-48"
                  placeholder="print('Hello World')..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded focus:border-nexus-accent outline-none text-white"
                  >
                    {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-400 mb-2">Tags</label>
                   <div className="flex flex-wrap gap-2">
                     {TAG_OPTIONS.slice(0, 6).map(tag => (
                       <button
                         key={tag}
                         type="button"
                         onClick={() => toggleTag(tag)}
                         className={`px-2 py-1 text-xs rounded border transition-colors ${selectedTags.includes(tag) ? 'bg-nexus-accent border-nexus-accent text-white' : 'border-gray-700 text-gray-500'}`}
                       >
                         {tag}
                       </button>
                     ))}
                   </div>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" glow className="w-full">Publish Script</Button>
              </div>
            </form>
          </div>
        </div>

        {/* Management List */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 rounded-xl h-full flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6">Manage Library</h3>
            <div className="flex-1 overflow-y-auto space-y-3 max-h-[600px] pr-2 custom-scrollbar">
              {scripts.map(script => (
                <div key={script.id} className="p-3 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-colors flex justify-between items-center group">
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">{script.title}</p>
                    <p className="text-xs text-gray-500">{script.views} views</p>
                  </div>
                  <button 
                    onClick={() => onDeleteScript(script.id)}
                    className="p-2 text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;