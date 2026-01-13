import React from 'react';

interface FooterProps {
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="border-t border-white/10 bg-[#050505] py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold tracking-tighter text-white mb-4">
          NEXUS<span className="text-nexus-cyan">HUB</span>
        </h2>
        <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
          The premium destination for Roblox scripting. Community driven, always free, forever uncapped.
        </p>
        <div className="flex justify-center gap-6 text-sm text-gray-600 mb-8">
          <a href="#" className="hover:text-nexus-cyan transition-colors">Discord</a>
          <a href="#" className="hover:text-nexus-cyan transition-colors">YouTube</a>
          <a href="#" className="hover:text-nexus-cyan transition-colors">Terms</a>
        </div>
        <div className="text-xs text-gray-800">
          <button onClick={onAdminClick} className="hover:text-gray-700 transition-colors">
             &copy; 2024 Nexus Hub. All rights reserved.
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;