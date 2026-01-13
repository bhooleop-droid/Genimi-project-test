import React from 'react';
import { Zap, Shield, Globe, ChevronRight, Terminal } from 'lucide-react';
import Button from './Button';

interface HeroProps {
  onBrowse: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBrowse }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-nexus-accent/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-nexus-cyan/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-nexus-accent/30 text-nexus-accent text-xs font-mono mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nexus-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-nexus-accent"></span>
            </span>
            V2.0 IS LIVE NOW
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
              The Ultimate
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-nexus-accent to-nexus-cyan animate-pulse-slow">
              Roblox Script Hub
            </span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 font-light">
            Access thousands of premium scripts for free. 
            <span className="text-white font-medium"> Zero ads. Zero paywalls. </span>
            Just pure code.
          </p>
          
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" glow onClick={onBrowse}>
              Browse Scripts <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={onBrowse}>
              Latest Uploads
            </Button>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { icon: Zap, title: 'Instant Execution', desc: 'Optimized for Synapse, Krnl, and Fluxus.' },
              { icon: Shield, title: '100% Safe', desc: 'All scripts verified manually by our team.' },
              { icon: Globe, title: 'Community Driven', desc: 'Updates daily by elite developers.' }
            ].map((feature, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-xl text-left hover:border-nexus-accent/50 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-nexus-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-nexus-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/5">
             <p className="text-sm text-gray-500 font-mono">
               TRUSTED BY <span className="text-white font-bold">14,200+</span> EXPLOITERS WORLDWIDE
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;