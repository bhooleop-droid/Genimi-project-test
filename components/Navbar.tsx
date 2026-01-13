import React from 'react';
import { Terminal, Code, Shield } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setView('HOME')}
          >
            <div className="bg-gradient-to-br from-indigo-500 to-nexus-accent p-2 rounded-lg group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="font-mono text-xl font-bold tracking-tighter text-white">
              NEXUS<span className="text-nexus-cyan">HUB</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => setView('HOME')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'HOME' ? 'text-nexus-cyan' : 'text-gray-300 hover:text-white'}`}
              >
                Home
              </button>
              <button
                onClick={() => setView('LIBRARY')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'LIBRARY' ? 'text-nexus-cyan' : 'text-gray-300 hover:text-white'}`}
              >
                Script Library
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button
                onClick={() => setView('LIBRARY')}
                className="md:hidden p-2 text-gray-300 hover:text-white"
              >
                <Code className="w-6 h-6" />
              </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;