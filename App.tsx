import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScriptLibrary from './components/ScriptLibrary';
import ScriptModal from './components/ScriptModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { ScriptData, ViewState } from './types';
import { INITIAL_SCRIPTS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [scripts, setScripts] = useState<ScriptData[]>([]);
  const [selectedScript, setSelectedScript] = useState<ScriptData | null>(null);

  // Load scripts from local storage or use constants
  useEffect(() => {
    const savedScripts = localStorage.getItem('nexus_scripts');
    if (savedScripts) {
      try {
        setScripts(JSON.parse(savedScripts));
      } catch (e) {
        console.error("Failed to parse scripts", e);
        setScripts(INITIAL_SCRIPTS);
      }
    } else {
      setScripts(INITIAL_SCRIPTS);
      localStorage.setItem('nexus_scripts', JSON.stringify(INITIAL_SCRIPTS));
    }
  }, []);

  const handleAddScript = (newScript: ScriptData) => {
    const updatedScripts = [newScript, ...scripts];
    setScripts(updatedScripts);
    localStorage.setItem('nexus_scripts', JSON.stringify(updatedScripts));
  };

  const handleDeleteScript = (id: string) => {
    const updatedScripts = scripts.filter(s => s.id !== id);
    setScripts(updatedScripts);
    localStorage.setItem('nexus_scripts', JSON.stringify(updatedScripts));
  };

  const openScript = (script: ScriptData) => {
    // Increment view count artificially for vibe
    const updatedScripts = scripts.map(s => 
      s.id === script.id ? { ...s, views: s.views + 1 } : s
    );
    setScripts(updatedScripts);
    localStorage.setItem('nexus_scripts', JSON.stringify(updatedScripts));
    
    setSelectedScript(script);
  };

  return (
    <div className="min-h-screen bg-nexus-dark text-white selection:bg-nexus-accent selection:text-white font-sans flex flex-col">
      <Navbar currentView={view} setView={setView} />
      
      <main className="flex-grow">
        {view === 'HOME' && (
          <>
            <Hero onBrowse={() => setView('LIBRARY')} />
            {/* Show a preview of library on home */}
            <div className="border-t border-white/5">
              <ScriptLibrary scripts={scripts.slice(0, 3)} onSelectScript={openScript} />
              <div className="text-center pb-12">
                 <button 
                  onClick={() => setView('LIBRARY')}
                  className="text-nexus-cyan hover:text-white underline underline-offset-4 transition-colors"
                >
                  View All Scripts
                 </button>
              </div>
            </div>
          </>
        )}

        {view === 'LIBRARY' && (
          <ScriptLibrary scripts={scripts} onSelectScript={openScript} />
        )}

        {view === 'ADMIN' && (
          <AdminPanel 
            onAddScript={handleAddScript} 
            onDeleteScript={handleDeleteScript}
            scripts={scripts}
            exitAdmin={() => setView('HOME')}
          />
        )}
      </main>

      <Footer onAdminClick={() => setView('ADMIN')} />

      {selectedScript && (
        <ScriptModal 
          script={selectedScript} 
          onClose={() => setSelectedScript(null)} 
        />
      )}
    </div>
  );
};

export default App;