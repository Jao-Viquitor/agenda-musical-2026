export interface Church {
  name: string;
  address: string;
  services: string;
  rjm?: string;
  obs?: string;
  isMain?: boolean; // Highlight central or unique churches
  lat?: number;
  lng?: number;
}

export interface ChurchGroup {
  regionName: string;
  churches: Church[];
}

export interface CityLocation {
  name: string;
  lat: number;
  lng: number;
}

// Data for the List View (Specific Churches)
export const churchGroups: ChurchGroup[] = [
  {
    regionName: 'Uruguaiana (RS)',
    churches: [
      {
        name: 'São João',
        address: 'Rua Min. Joaquim Murtinho, 2869, Uruguaiana - RS',
        services: 'Quarta, Sábado e Domingo (19h30)',
        rjm: 'Domingo (10h)',
        isMain: true,
        lat: -29.764816,
        lng: -57.077053
      },
      {
        name: 'Cabo Luís Quevedo',
        address: 'Rua Pinheiro Machado, 600',
        services: 'Segunda e Sexta (19h30)',
        rjm: '-',
        lat: -29.755400,
        lng: -57.088900
      },
      {
        name: 'Santo Inácio',
        address: 'R. Dr. Fábio de Barros, 50 - Santo Inacio, Uruguaiana - RS, 97513-222',
        services: 'Segunda e Quinta (19h30)',
        rjm: '-',
        lat: -29.748500,
        lng: -57.095200
      },
      {
        name: 'União das Vilas',
        address: 'Rua Imbaa, 26 - Quadra Q',
        services: 'Terça e Sexta (19h30)',
        rjm: 'Domingo (10h)',
        lat: -29.778100,
        lng: -57.091500
      },
      {
        name: 'Vila Imbaá',
        address: 'Rodovia BR-472',
        services: 'Domingo (16h)',
        obs: 'Horário diferenciado',
        lat: -29.682000,
        lng: -56.985000
      }
    ]
  },
  {
    regionName: 'Itaqui (RS)',
    churches: [
      {
        name: 'COHAB',
        address: 'Rua Coronel Assunção, 270, Itaqui - RS',
        services: 'Quinta, Sábado e Domingo (19h30)',
        rjm: 'Domingo (10h)',
        isMain: true,
        lat: -29.123500,
        lng: -56.559700
      },
      {
        name: 'Vila Nova',
        address: 'Quadra Area Verde, 21',
        services: 'Terça e Sexta (19h30)',
        rjm: '-',
        lat: -29.135000,
        lng: -56.545000
      }
    ]
  },
  {
    regionName: 'Outras Cidades',
    churches: [
      {
        name: 'São Borja - Rodoviária',
        address: 'Rua Frei Caneca, 1065, São Borja - RS',
        services: 'Terça, Sábado e Domingo (19h30)',
        rjm: 'Domingo (10h)',
        isMain: true,
        lat: -28.660900,
        lng: -56.004900
      },
      {
        name: 'Alegrete - Vila Nova',
        address: 'Rua Celestino Prunes, 328, Alegrete - RS',
        services: 'Quarta, Sábado e Domingo (19h30)',
        rjm: 'Domingo (10h)',
        isMain: true,
        lat: -29.792000,
        lng: -55.783000
      },
      {
        name: 'Barra do Quaraí - Centro',
        address: 'Rua General Neto, 913, Barra do Quaraí - RS',
        services: 'Sábado (19h30)',
        rjm: '-',
        isMain: true,
        lat: -30.207000,
        lng: -57.555000
      },
      {
        name: 'Quaraí - Santa Carmem',
        address: 'Av. Airton Senna, 303, Quaraí - RS',
        services: 'Terça e Sábado (19h30)',
        rjm: '-',
        isMain: true,
        lat: -30.389000,
        lng: -56.448000
      }
    ]
  },
  {
    regionName: 'Exterior (Uruguai e Argentina)',
    churches: [
      {
        name: 'Artigas (UY) - Barrio 25 de agosto',
        address: 'Calle 20 de Setiembre, 722, Artigas, Uruguay',
        services: 'Horários a confirmar',
        obs: 'Consulte a administração local',
        lat: -30.407500,
        lng: -56.476000
      },
      {
        name: 'Artigas (UY) - Barrio Industrial',
        address: 'Calle Celiar López, 935, Artigas, Uruguay',
        services: 'Horários a confirmar',
        obs: 'Consulte a administração local',
        isMain: true,
        lat: -30.418500,
        lng: -56.463500
      },
      {
        name: 'Bella Unión (UY) - Pueblo Las Piedras',
        address: 'Calle A2, 3156, Bella Unión, Uruguay',
        services: 'Horários a confirmar',
        obs: 'Consulte a administração local',
        isMain: true,
        lat: -30.250000,
        lng: -57.620000
      },
      {
        name: 'Paso de los Libres (AR)',
        address: 'Bartolomé Mitre, 2030, Paso de los Libres, Corrientes, Argentina',
        services: 'Horários a confirmar',
        obs: 'Consulte a administração local',
        isMain: true,
        lat: -29.725500,
        lng: -57.087500
      }
    ]
  }
];

// Data for the Interactive Map (Cities Only)
export const regionalCities: CityLocation[] = [
  { name: 'Uruguaiana', lat: -29.7617, lng: -57.0870 },
  { name: 'Alegrete', lat: -29.7901, lng: -55.7933 },
  { name: 'Itaqui', lat: -29.1233, lng: -56.5563 },
  { name: 'São Borja', lat: -28.6594, lng: -56.0025 },
  { name: 'Manoel Viana', lat: -29.5889, lng: -55.4806 },
  { name: 'Quaraí', lat: -30.3842, lng: -56.4504 },
  { name: 'Barra do Quaraí', lat: -30.2074, lng: -57.5568 },
  { name: 'Artigas (UY)', lat: -30.4083, lng: -56.4675 },
  { name: 'Paso de los Libres (AR)', lat: -29.7139, lng: -57.0873 },
  { name: 'Bella Unión (UY)', lat: -30.2527, lng: -57.6006 },
];

// Helper to find the main church address for a given city location
export const getMainChurchAddress = (locationName: string): string | null => {
  const normalizedLoc = locationName.toLowerCase().trim();

  // Try to find a group that contains the location name (e.g. "Uruguaiana" matches "Uruguaiana (RS)")
  const group = churchGroups.find(g => g.regionName.toLowerCase().includes(normalizedLoc));
  
  // If we found a group, find the main church
  if (group) {
    const mainChurch = group.churches.find(c => c.isMain);
    if (mainChurch) return mainChurch.address;
  }
  
  // Special handling for cities grouped in "Outras Cidades" or "Exterior"
  // We iterate through all groups and check if any church name or specific logic matches
  for (const g of churchGroups) {
      for (const c of g.churches) {
          if (c.isMain && (
             c.name.toLowerCase().includes(normalizedLoc) || 
             c.address.toLowerCase().includes(normalizedLoc)
          )) {
              return c.address;
          }
      }
  }

  // Fallback map for specific event location names in the code to Main Churches
  const map: Record<string, string> = {
      'Libres': 'Bartolomé Mitre, 2030, Paso de los Libres, Corrientes, Argentina',
      'Artigas': 'Calle Celiar López, 935, Artigas, Uruguay',
      'Bella Union': 'Calle A2, 3156, Bella Unión, Uruguay',
      'São Borja': 'Rua Frei Caneca, 1065, São Borja - RS',
      'Alegrete': 'Rua Celestino Prunes, 328, Alegrete - RS',
      'Itaqui': 'Rua Coronel Assunção, 270, Itaqui - RS',
      'Uruguaiana': 'Rua Min. Joaquim Murtinho, 2869, Uruguaiana - RS'
  };

  return map[locationName] || null;
};