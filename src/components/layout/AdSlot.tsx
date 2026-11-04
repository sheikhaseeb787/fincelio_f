import React from 'react';

interface AdSlotProps {
  placement?: 'top-banner' | 'sidebar' | 'inline' | 'bottom';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ placement = 'inline', className = '' }) => {
  return (
    <div className={`my-8 no-print ${className}`}>
      <div className="flex items-center justify-between text-[10px] text-[#17231C]/40 uppercase tracking-widest pb-1 max-w-3xl mx-auto px-1">
        <span>Advertisement</span>
        <span>Fincelio Ad Network</span>
      </div>
      <div className="max-w-3xl mx-auto min-h-[90px] border border-dashed border-[#E3EBE5] bg-[#F4F8F5]/60 rounded-xl flex flex-col items-center justify-center p-4 text-center">
        <div className="text-xs font-medium text-[#17231C]/60">
          Google AdSense Placement Slot
        </div>
        <div className="text-[11px] text-[#17231C]/40 mt-0.5">
          Standard Responsive Display Unit (728×90 / 320×100) · Policy Compliant
        </div>
      </div>
    </div>
  );
};
