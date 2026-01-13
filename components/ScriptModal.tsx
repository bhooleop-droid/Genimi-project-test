import React, { useState } from 'react';
import { ScriptData } from '../types';
import { X, Copy, Check, Download, AlertTriangle } from 'lucide-react';
import Button from './Button';

interface ScriptModalProps {
  script: ScriptData | null;
  onClose: () => void;
}

const ScriptModal: React.FC<ScriptModalProps> = ({ script, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!script) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(script.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([script.code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${script.title.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-[#0F0F0F] rounded-2xl shadow-2xl border border-white/10 flex flex-col max-h-[90vh] overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141414]">
          <div>
            <h3 className="text-xl font-bold text-white">{script.title}</h3>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
               <span>By <span className="text-nexus-cyan">{script.author}</span></span>
               <span>•</span>
               <span>{new Date(script.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="glass-panel p-4 rounded-lg bg-indigo-900/10 border-l-4 border-nexus-accent">
            <h4 className="font-bold text-white mb-1">Description</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{script.description}</p>
          </div>

          <div className="relative group">
            <div className="absolute top-0 right-0 p-2 flex gap-2">
               <button 
                 onClick={handleCopy}
                 className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-md backdrop-blur-sm transition-all"
                 title="Copy to clipboard"
               >
                 {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
               </button>
            </div>
            <pre className="block w-full p-4 bg-[#050505] rounded-lg border border-white/10 text-gray-300 font-mono text-sm overflow-x-auto min-h-[300px]">
              <code>{script.code}</code>
            </pre>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-900/10 border border-orange-500/20 text-orange-400 text-xs">
             <AlertTriangle className="w-4 h-4" />
             <p>Use this script at your own risk. We are not responsible for bans.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-[#141414] flex justify-end gap-3">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download .txt
          </Button>
          <Button onClick={handleCopy} glow>
            {copied ? 'Copied!' : 'Copy Script'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScriptModal;