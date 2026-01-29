import React, { useRef, useEffect } from 'react';

interface MonthNavigationProps {
  currentMonth: string;
  onMonthChange: (month: string) => void;
}

export const MonthNavigation: React.FC<MonthNavigationProps> = ({ currentMonth, onMonthChange }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const months = [
    { value: '', label: 'Todos' },
    { value: '0', label: 'Jan' },
    { value: '1', label: 'Fev' },
    { value: '2', label: 'Mar' },
    { value: '3', label: 'Abr' },
    { value: '4', label: 'Mai' },
    { value: '5', label: 'Jun' },
    { value: '6', label: 'Jul' },
    { value: '7', label: 'Ago' },
    { value: '8', label: 'Set' },
    { value: '9', label: 'Out' },
    { value: '10', label: 'Nov' },
    { value: '11', label: 'Dez' },
  ];

  // Auto-scroll to selected item on mount or change
  useEffect(() => {
    if (currentMonth !== '' && scrollContainerRef.current) {
        const selectedBtn = scrollContainerRef.current.querySelector(`[data-value="${currentMonth}"]`);
        if (selectedBtn) {
            selectedBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
  }, [currentMonth]);

  return (
    <div className="sticky top-0 z-30 bg-[#f1f2f6] pt-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-2 pb-2 no-scrollbar mask-gradient"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {months.map((m) => {
          const isActive = currentMonth === m.value;
          return (
            <button
              key={m.value}
              data-value={m.value}
              onClick={() => onMonthChange(m.value)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                ${isActive 
                  ? 'bg-[#033d60] text-white shadow-md shadow-[#033d60]/20 scale-105' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#033d60] hover:text-[#033d60]'}
              `}
            >
              {m.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};