import React from 'react';

const Ticker = () => {
  return (
    <div className="bg-[#0B1B2B] text-cyan-400/50 overflow-hidden whitespace-nowrap h-8 flex items-center relative border-b border-blue-900/20 z-[70]">
      <div className="flex animate-marquee gap-12 items-center px-4 w-full justify-center opacity-30">
        <div className="w-full h-px bg-blue-500/20" />
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Ticker;