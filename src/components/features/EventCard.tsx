import React, { useState } from 'react';
import { MusicalEvent, EventCategory } from '../../types';
import { formatDate } from '../../lib/dateHelpers';
import { generateEventShareText, getGoogleCalendarLink, shareContent } from '../../lib/actionHelpers';
import { getMainChurchAddress } from '../../lib/churchData';
import { MapPin, Clock, Calendar, Share2, Heart, CalendarPlus, Navigation, X } from 'lucide-react';

interface EventCardProps {
  event: MusicalEvent;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const getCategoryColor = (category: EventCategory) => {
  switch (category) {
    case EventCategory.ENSAIO_REGIONAL:
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case EventCategory.PRATICA_CONJUNTO:
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case EventCategory.REUNIAO:
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case EventCategory.ENSAIO_GERAL:
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case EventCategory.EXAME:
      return 'bg-rose-100 text-rose-800 border-rose-200';
    case EventCategory.ENSAIO_LOCAL:
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

const extractCityFromLocation = (location: string): string => {
  // Extract city name from location
  // Examples: "Uruguaiana", "São Borja", "Itaqui", etc.
  const mainChurches: Record<string, string> = {
    'São João': 'Uruguaiana',
    'Cabo Luís Quevedo': 'Uruguaiana',
    'Santo Inácio': 'Uruguaiana',
    'União das Vilas': 'Uruguaiana',
    'Vila Imbaá': 'Uruguaiana',
    'COHAB': 'Itaqui',
    'Vila Nova': 'Itaqui',
    'Rodoviária': 'São Borja',
    'Alegrete': 'Alegrete',
    'Barra do Quaraí': 'Barra do Quaraí',
    'Quaraí': 'Quaraí',
    'Artigas': 'Artigas (UY)',
    'Bella Union': 'Bella Unión (UY)',
    'Libres': 'Paso de los Libres (AR)'
  };

  // Check if location directly matches a city
  for (const [key, city] of Object.entries(mainChurches)) {
    if (location.includes(key)) {
      return city;
    }
  }

  // Fallback to the location itself
  return location;
};

const formatAddressStreetOnly = (address: string): string => {
  // Remove city and state from address
  // Example: "Rua Min. Joaquim Murtinho, 2869, Uruguaiana - RS" -> "Rua Min. Joaquim Murtinho, 2869"
  const parts = address.split(',');
  if (parts.length >= 2) {
    // Return street and number only (first two parts)
    return parts.slice(0, 2).join(',').trim();
  }
  return address;
};

export const EventCard: React.FC<EventCardProps> = ({ event, isFavorite, onToggleFavorite }) => {
  const [showModal, setShowModal] = useState(false);
  
  const isTBD = !event.date;
  const dateObj = event.date || new Date(); 

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = generateEventShareText(event);
    shareContent(event.title, text);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(event.id);
  }

  const mainAddress = getMainChurchAddress(event.location);
  const mapsUrl = mainAddress 
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mainAddress)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;

  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        className={`
          relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-200 hover:shadow-md flex flex-col cursor-pointer group
          ${event.isSpecial ? 'border-l-4 border-l-[#033d60]' : 'border-slate-200'}
          hover:scale-[1.02]
        `}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex-grow">
              {/* Header: Date (Right) and Title (Left) */}
              <div className="flex items-start justify-between mb-2">
                  <div className="pr-4">
                      <h3 className="text-lg font-bold text-[#033d60] leading-tight mb-1">{event.title}</h3>
                      
                       {/* City and Time */}
                      <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                              <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                              <span>{extractCityFromLocation(event.location)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                              <span>{event.time}</span>
                          </div>
                          {event.description && (
                              <div className="flex items-center gap-2 text-xs text-slate-500 italic">
                                  <span>• {event.description}</span>
                              </div>
                          )}
                      </div>
                  </div>

                  {!isTBD && (
                      <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-lg p-2 min-w-[60px]">
                          <span className="text-xs uppercase font-bold tracking-wider text-[#033d60]/60">{new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(dateObj)}</span>
                          <span className="text-xl font-bold leading-none text-[#033d60]">{dateObj.getDate()}</span>
                      </div>
                  )}
              </div>
          </div>
          
          {/* Footer: Badge */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
               <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${getCategoryColor(event.category)}`}>
                  {event.category}
              </span>
              <button 
                onClick={handleFavoriteClick}
                className={`p-2 rounded-full transition-colors ${isFavorite ? 'bg-rose-100 text-rose-500' : 'text-slate-400 hover:bg-rose-50 hover:text-rose-500'}`}
                title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-start justify-between rounded-t-2xl">
              <div className="flex-grow pr-4">
                <h2 className="text-xl font-bold text-[#033d60] mb-1">{event.title}</h2>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Date and Time */}
              <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#033d60] rounded-lg text-white">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Data</span>
                    <span className="text-sm text-slate-700 font-semibold capitalize">{formatDate(event.date)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#033d60] rounded-lg text-white">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Horário</span>
                    <span className="text-sm text-slate-700 font-semibold">{event.time}</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="flex-grow">
                    <span className="block text-xs text-slate-500 font-medium mb-1">Local</span>
                    <span className="block font-bold text-[#033d60] text-sm">{event.location}</span>
                    {mainAddress && (
                      <span className="block text-xs text-slate-500 mt-1">{formatAddressStreetOnly(mainAddress)}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              {event.description && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <span className="block text-xs text-amber-700 font-semibold uppercase mb-2">Observações</span>
                  <p className="text-sm text-slate-700">{event.description}</p>
                </div>
              )}

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a 
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#033d60] text-white rounded-lg hover:bg-[#033d60]/90 transition-colors font-medium text-sm"
                >
                  <Navigation className="w-4 h-4" />
                  Ver Rota
                </a>

                {!isTBD && (
                  <a 
                    href={getGoogleCalendarLink(event)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    Adicionar
                  </a>
                )}

                <button 
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm"
                >
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </button>

                <button 
                  onClick={handleFavoriteClick}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors font-medium text-sm ${
                    isFavorite 
                      ? 'bg-rose-100 text-rose-600 hover:bg-rose-200' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600' : ''}`} />
                  {isFavorite ? 'Salvo' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};