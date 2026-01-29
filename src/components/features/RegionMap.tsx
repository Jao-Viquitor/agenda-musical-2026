import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { regionalCities } from '../../lib/churchData';

export const RegionMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map only once
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current);
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      mapInstanceRef.current = map;

      const markers: L.Marker[] = [];

      // Add City Markers
      regionalCities.forEach(city => {
         // Custom HTML Marker
         const iconHtml = `
           <div class="marker-pin main-church"></div>
         `;

         const customIcon = L.divIcon({
           className: 'custom-div-icon',
           html: iconHtml,
           iconSize: [30, 42],
           iconAnchor: [15, 42],
           popupAnchor: [0, -42]
         });

         const marker = L.marker([city.lat, city.lng], { icon: customIcon }).addTo(map);
         markers.push(marker);
         
         const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city.name)}`;
         
         marker.bindPopup(`
           <div class="p-1 min-w-[120px] text-center">
             <strong class="block text-[#033d60] text-sm mb-2">${city.name}</strong>
             <a href="${mapsUrl}" target="_blank" class="text-xs bg-[#033d60] text-white px-3 py-1.5 rounded-full inline-block hover:bg-[#022c45] transition-colors">
               Ver no Mapa
             </a>
           </div>
         `);
      });

      // Fit bounds to show all markers
      if (markers.length > 0) {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds(), { padding: [50, 50] });
      } else {
        // Fallback center
        map.setView([-29.75, -57.08], 9);
      }
    }

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-sm border border-slate-200 z-10 relative">
      <div ref={mapContainerRef} className="w-full h-full" id="map-container"></div>
    </div>
  );
};