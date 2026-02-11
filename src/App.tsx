import React, { useState, useMemo } from 'react';
import { generateAllEvents } from './lib/dateHelpers';
import { fredericoWestphalenEvents, cruzAltaIjuiEvents } from './lib/regionalEventsData';
import { FilterState, MusicalEvent, Region, RegionalConfig } from './types';
import { EventCard } from './components/features/EventCard';
import { Filters } from './components/features/Filters';
import { ChurchList } from './components/features/ChurchList';
import { RegionMap } from './components/features/RegionMap';
import { Music, CalendarDays, Map, CalendarRange, History, ChevronDown, ChevronUp } from 'lucide-react';

// Regional configurations
const REGIONAL_CONFIGS: RegionalConfig[] = [
  {
    id: Region.URUGUAIANA,
    name: 'Uruguaiana',
    fullTitle: 'Agenda Musical - Região Uruguaiana',
    hasChurches: true
  },
  {
    id: Region.FREDERICO_WESTPHALEN,
    name: 'Frederico Westphalen',
    fullTitle: 'Agenda Musical - Região Frederico Westphalen',
    hasChurches: false
  },
  {
    id: Region.IJUI,
    name: 'Ijuí',
    fullTitle: 'Agenda Musical - Região Ijuí',
    hasChurches: false
  }
];

const App: React.FC = () => {
  const [currentRegion, setCurrentRegion] = useState<Region>(Region.URUGUAIANA);
  const [currentView, setCurrentView] = useState<'calendar' | 'churches'>('calendar');
  const [showPastEvents, setShowPastEvents] = useState(false);

  // Get current region config
  const regionConfig = REGIONAL_CONFIGS.find(r => r.id === currentRegion)!;


  // Favorites State
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('musicalCalendarFavorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (eventId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId];

      localStorage.setItem('musicalCalendarFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Generate events based on current region
  const allEvents = useMemo(() => {
    switch (currentRegion) {
      case Region.URUGUAIANA:
        return generateAllEvents();
      case Region.FREDERICO_WESTPHALEN:
        return fredericoWestphalenEvents;
      case Region.IJUI:
        return cruzAltaIjuiEvents;
      default:
        return generateAllEvents();
    }
  }, [currentRegion]);


  // Extract unique locations for the filter
  const locations = useMemo(() => {
    return Array.from(new Set(allEvents.map(e => e.location))).sort();
  }, [allEvents]);

  const [filters, setFilters] = useState<FilterState>({
    category: '',
    location: '',
    month: '',
    onlyFavorites: false,
  });

  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      // 1. Filter by Favorites
      if (filters.onlyFavorites && !favorites.includes(event.id)) return false;

      // 2. Filter by Category
      if (filters.category && event.category !== filters.category) return false;

      // 3. Filter by Location
      if (filters.location && event.location !== filters.location) return false;

      // 4. Filter by Month
      if (filters.month !== '') {
        if (!event.date) return false;
        if (event.date.getMonth().toString() !== filters.month) return false;
      }

      return true;
    });
  }, [allEvents, filters, favorites]);

  // Split events into Upcoming and Past
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to start of day

    const upcoming: MusicalEvent[] = [];
    const past: MusicalEvent[] = [];

    filteredEvents.forEach(event => {
      if (!event.date) {
        // TBD events are always upcoming
        upcoming.push(event);
      } else {
        if (event.date >= today) {
          upcoming.push(event);
        } else {
          past.push(event);
        }
      }
    });

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [filteredEvents]);


  // Helper to group events by month
  const groupEventsByMonth = (events: MusicalEvent[]) => {
    const groups: Record<string, MusicalEvent[]> = {};
    const tbd: MusicalEvent[] = [];

    events.forEach(event => {
      if (!event.date) {
        tbd.push(event);
      } else {
        const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(event.date);
        const key = monthName.charAt(0).toUpperCase() + monthName.slice(1);
        if (!groups[key]) groups[key] = [];
        groups[key].push(event);
      }
    });

    if (tbd.length > 0) {
      groups['A definir / Sem Data'] = tbd;
    }
    return groups;
  };

  // Memoize grouped events
  // If a specific month is selected, we simply show everything found (past or future) in the main view
  // Otherwise, we split them.
  const isMonthSelected = filters.month !== '';

  const mainViewGroups = useMemo(() => {
    if (isMonthSelected) return groupEventsByMonth(filteredEvents);
    return groupEventsByMonth(upcomingEvents);
  }, [filteredEvents, upcomingEvents, isMonthSelected]);

  const pastViewGroups = useMemo(() => {
    if (isMonthSelected) return {}; // Don't show separate past section if month is filtered
    return groupEventsByMonth(pastEvents);
  }, [pastEvents, isMonthSelected]);

  const hasPastEvents = Object.keys(pastViewGroups).length > 0;

  return (
    <div className="min-h-screen bg-[#f1f2f6] text-[#033d60] pb-20">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 shadow-sm">
        <div className="w-full px-4">
          {/* Grid Layout: Logo | Title (centered) | Buttons */}
          <div className="grid grid-cols-3 items-center gap-4 mb-1">
            {/* Logo - Left */}
            <div className="flex justify-start items-center ml-24">
              <img
                src="/logo.png"
                alt="Setor Musical"
                className="h-42 md:h-48 w-auto object-contain"
              />
            </div>

            {/* Title - Center (truly centered) */}
            <div className="text-center">
              <h1 className="text-xl md:text-3xl font-bold text-[#033d60] leading-tight">
                Agenda Musical
              </h1>
              <h2 className="text-sm md:text-lg font-semibold text-[#033d60] opacity-80">
                Região {regionConfig.name}
              </h2>
            </div>

            {/* View Navigation - Right */}
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-slate-500 font-medium mr-1">Uruguaiana - RS</span>
              <nav className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setCurrentRegion(Region.URUGUAIANA);
                    setCurrentView('calendar');
                  }}
                  className={`px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm flex items-center gap-2 transition-colors ${currentView === 'calendar' && currentRegion === Region.URUGUAIANA
                    ? 'bg-[#033d60] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  <CalendarRange className="w-4 h-4" />
                  <span className="hidden sm:inline">Agenda Musical</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentRegion(Region.URUGUAIANA);
                    setCurrentView('churches');
                  }}
                  className={`px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm flex items-center gap-2 transition-colors ${currentView === 'churches' && currentRegion === Region.URUGUAIANA
                    ? 'bg-[#033d60] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  <Map className="w-4 h-4" />
                  <span className="hidden sm:inline">Casas de Oração</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Regional Navigation - Below view buttons, only non-Uruguaiana regions */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs text-slate-500 font-medium">Outras cidades da região</span>
            <div className="flex gap-2">
              {REGIONAL_CONFIGS.filter(config => config.id !== Region.URUGUAIANA).map((config) => (
                <button
                  key={config.id}
                  onClick={() => {
                    setCurrentRegion(config.id);
                    setCurrentView('calendar');
                  }}
                  className={`px-3 py-1.5 rounded-lg font-medium text-xs whitespace-nowrap transition-colors ${currentRegion === config.id
                    ? 'bg-[#033d60] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  {config.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8">

        {currentView === 'calendar' ? (
          <>
            <div className="mt-8">
              <Filters
                filters={filters}
                setFilters={setFilters}
                availableLocations={locations}
              />
            </div>

            {/* Results Count */}
            <div className="mb-4 text-slate-400 text-sm font-medium flex justify-between items-center">
              <span>
                {isMonthSelected
                  ? `Encontrados ${filteredEvents.length} eventos`
                  : `Próximos eventos: ${upcomingEvents.length}`
                }
              </span>
              {favorites.length > 0 && !filters.onlyFavorites && (
                <span className="text-xs text-rose-500 font-semibold">{favorites.length} salvos</span>
              )}
            </div>

            {/* Main Content (Upcoming or Filtered) */}
            {Object.keys(mainViewGroups).length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                {filters.onlyFavorites ? (
                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-rose-50 rounded-full mb-3">
                      <Music className="w-8 h-8 text-rose-300" />
                    </div>
                    <h3 className="text-lg font-medium text-[#033d60]">Nenhum favorito salvo</h3>
                    <p className="text-slate-500">Marque eventos com o coração para vê-los aqui.</p>
                  </div>
                ) : (
                  <>
                    <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-[#033d60]">
                      {isMonthSelected ? 'Nenhum evento encontrado' : 'Nenhum evento futuro encontrado'}
                    </h3>
                    <p className="text-slate-500">
                      {isMonthSelected ? 'Tente ajustar os filtros.' : 'Verifique os eventos passados abaixo.'}
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-10 pb-6">
                {(Object.entries(mainViewGroups) as [string, MusicalEvent[]][]).map(([monthName, events]) => (
                  <section key={monthName} className="animate-in fade-in slide-in-from-bottom-4 duration-500 scroll-mt-24" id={monthName}>
                    <div className="flex items-center gap-4 mb-6 sticky top-20 z-20 py-2 bg-[#f1f2f6]/95 backdrop-blur">
                      <h2 className="text-xl font-bold text-[#033d60]">{monthName}</h2>
                      <div className="h-px bg-slate-200 flex-grow"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {events.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          isFavorite={favorites.includes(event.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* Past Events Section */}
            {!isMonthSelected && hasPastEvents && (
              <div className="mt-12 pt-8 border-t border-slate-300">
                <button
                  onClick={() => setShowPastEvents(!showPastEvents)}
                  className="flex items-center gap-2 text-slate-500 font-semibold hover:text-[#033d60] transition-colors mb-6 mx-auto bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200"
                >
                  <History className="w-4 h-4" />
                  {showPastEvents ? 'Ocultar eventos passados' : 'Mostrar eventos passados'}
                  {showPastEvents ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showPastEvents && (
                  <div className="space-y-10 opacity-75 grayscale-[0.5] transition-all duration-500">
                    {(Object.entries(pastViewGroups) as [string, MusicalEvent[]][]).map(([monthName, events]) => (
                      <section key={monthName} className="animate-in fade-in duration-500">
                        <div className="flex items-center gap-4 mb-6">
                          <h2 className="text-lg font-bold text-slate-500">{monthName} (Passado)</h2>
                          <div className="h-px bg-slate-200 flex-grow"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {events.map((event) => (
                            <div key={event.id} className="opacity-80 hover:opacity-100 transition-opacity">
                              <EventCard
                                event={event}
                                isFavorite={favorites.includes(event.id)}
                                onToggleFavorite={toggleFavorite}
                              />
                            </div>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="pt-6 space-y-8">
            <ChurchList />

            <div className="mt-8">
              <h3 className="text-lg font-bold text-[#033d60] mb-4 flex items-center gap-2">
                <Map className="w-5 h-5" />
                Mapa da Regional
              </h3>
              <RegionMap />
            </div>
          </div>
        )}

      </main>

      <footer className="mt-20 border-t border-slate-200 bg-white py-8 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Setor Musical. Regional Uruguaiana.</p>
      </footer>
    </div>
  );
};

export default App;