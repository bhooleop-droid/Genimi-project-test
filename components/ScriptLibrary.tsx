import React, { useState, useMemo } from 'react';
import { ScriptData, TAG_OPTIONS } from '../types';
import { Search, Filter, Eye, Code2 } from 'lucide-react';
import Button from './Button';

interface ScriptLibraryProps {
  scripts: ScriptData[];
  onSelectScript: (script: ScriptData) => void;
}

const ScriptLibrary: React.FC<ScriptLibraryProps> = ({ scripts, onSelectScript }) => {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredScripts = useMemo(() => {
    return scripts.filter(script => {
      const matchesSearch = script.title.toLowerCase().includes(search.toLowerCase()) || 
                            script.description.toLowerCase().includes(search.toLowerCase());
      const matchesTag = selectedTag ? script.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [scripts, search, selectedTag]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Script Library</h2>
          <p className="text-gray-400">Browse {scripts.length} verified scripts</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg leading-5 bg-white/5 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-nexus-accent focus:border-nexus-accent sm:text-sm transition-all"
            placeholder="Search for scripts (e.g. 'Blox Fruits')"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
            selectedTag === null 
            ? 'bg-nexus-accent border-nexus-accent text-white shadow-[0_0_10px_rgba(139,92,246,0.4)]' 
            : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500'
          }`}
        >
          All
        </button>
        {TAG_OPTIONS.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
              selectedTag === tag 
              ? 'bg-nexus-accent border-nexus-accent text-white shadow-[0_0_10px_rgba(139,92,246,0.4)]' 
              : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filteredScripts.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10 border-dashed">
          <Filter className="mx-auto h-12 w-12 text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-300">No scripts found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScripts.map((script) => (
            <div 
              key={script.id} 
              className="glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 group flex flex-col h-full border-t-2 border-t-transparent hover:border-t-nexus-accent"
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2">
                    {script.status === 'HOT' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">HOT</span>
                    )}
                    {script.status === 'NEW' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-nexus-cyan/20 text-nexus-cyan border border-nexus-cyan/30">NEW</span>
                    )}
                    {script.status === 'VERIFIED' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30">VERIFIED</span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-500 text-xs gap-1">
                    <Eye className="w-3 h-3" />
                    {script.views.toLocaleString()}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-nexus-cyan transition-colors">
                  {script.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {script.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {script.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">By {script.author}</span>
                <Button size="sm" variant="outline" onClick={() => onSelectScript(script)}>
                   View Script <Code2 className="ml-2 w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScriptLibrary;