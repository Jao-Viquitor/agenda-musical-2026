import React from 'react';
import { churchGroups } from '../../lib/churchData';
import { shareContent, generateChurchShareText } from '../../lib/actionHelpers';
import { MapPin, Clock, Users, Share2, Navigation } from 'lucide-react';

export const ChurchList: React.FC = () => {
  
  const handleShare = (church: any, region: string) => {
    shareContent(`CCB - ${church.name}`, generateChurchShareText(church, region));
  };

  return (
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500">
      {churchGroups.map((group) => (
        <section key={group.regionName}>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-[#033d60]">{group.regionName}</h2>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.churches.map((church, idx) => {
              const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(church.address)}`;
              
              return (
                <div 
                  key={`${group.regionName}-${idx}`} 
                  className={`
                    relative rounded-xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col h-full bg-white
                    ${church.isMain 
                      ? 'border-2 border-[#033d60]' 
                      : 'border border-slate-200'}
                  `}
                >
                  <div className="mb-4">
                    <h3 className={`text-lg font-bold text-[#033d60]`}>
                      {church.name}
                    </h3>
                    {church.isMain && <span className="text-[10px] font-bold uppercase tracking-wider text-[#033d60]/70">Central</span>}
                  </div>
                  
                  <div className="space-y-3 text-sm text-slate-600 flex-grow">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="h-4 w-4 text-[#033d60] mt-0.5 flex-shrink-0" />
                      <span>{church.address}</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-slate-700 block mb-0.5">Dias de Culto</span>
                        <span>{church.services}</span>
                      </div>
                    </div>

                    {church.rjm && church.rjm !== '-' && (
                      <div className="flex items-start gap-2.5">
                        <Users className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-slate-700 block mb-0.5">Reunião de Jovens</span>
                          <span>{church.rjm}</span>
                        </div>
                      </div>
                    )}

                    {church.obs && (
                       <div className="mt-2 pt-2 border-t border-slate-100 text-xs text-amber-600 italic">
                          Nota: {church.obs}
                       </div>
                    )}
                  </div>

                   {/* Action Bar */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end gap-2">
                    <a 
                      href={mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#033d60] transition-colors px-2 py-1"
                    >
                      <Navigation className="w-4 h-4" />
                      <span className="font-medium">Rota</span>
                    </a>
                    <button 
                      onClick={() => handleShare(church, group.regionName)}
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#033d60] transition-colors px-2 py-1"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="font-medium">Compartilhar</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};