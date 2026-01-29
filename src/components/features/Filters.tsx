import React from 'react';
import { FilterState, EventCategory } from '../../types';
import { Heart } from 'lucide-react';

interface FiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableLocations: string[];
}

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters, availableLocations }) => {
  const months = [
    { value: '0', label: 'Janeiro' },
    { value: '1', label: 'Fevereiro' },
    { value: '2', label: 'Março' },
    { value: '3', label: 'Abril' },
    { value: '4', label: 'Maio' },
    { value: '5', label: 'Junho' },
    { value: '6', label: 'Julho' },
    { value: '7', label: 'Agosto' },
    { value: '8', label: 'Setembro' },
    { value: '9', label: 'Outubro' },
    { value: '10', label: 'Novembro' },
    { value: '11', label: 'Dezembro' },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        
        {/* Month Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Mês</label>
          <select
            value={filters.month}
            onChange={(e) => setFilters(prev => ({ ...prev, month: e.target.value }))}
            className="block w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none border transition-colors hover:bg-slate-100"
          >
            <option value="">Todos os Meses</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Localidade</label>
          <select
             value={filters.location}
             onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
             className="block w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none border transition-colors hover:bg-slate-100"
          >
            <option value="">Todas as Localidades</option>
            {availableLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Tipo de Evento</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="block w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none border transition-colors hover:bg-slate-100"
          >
            <option value="">Todos os Tipos</option>
            {Object.values(EventCategory).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Favorites Toggle */}
        <div className="flex">
            <button
                onClick={() => setFilters(prev => ({ ...prev, onlyFavorites: !prev.onlyFavorites }))}
                className={`flex items-center justify-center gap-2 w-full p-2.5 rounded-lg border text-sm font-medium transition-all ${
                    filters.onlyFavorites 
                        ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
            >
                <Heart className={`w-4 h-4 ${filters.onlyFavorites ? 'fill-rose-500' : ''}`} />
                {filters.onlyFavorites ? 'Meus Favoritos' : 'Ver Favoritos'}
            </button>
        </div>

      </div>
    </div>
  );
};