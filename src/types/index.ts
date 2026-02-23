export enum EventCategory {
  ENSAIO_LOCAL = 'Ensaio Local',
  ENSAIO_REGIONAL = 'Ensaio Regional',
  PRATICA_CONJUNTO = 'Prática em Conjunto',
  REUNIAO = 'Reunião',
  ENSAIO_GERAL = 'Ensaio Geral',
  EXAME = 'Exames',
  REUNIAO_TECNICA_ORGANISTAS = 'Reunião Técnica Organistas',
}

export enum Region {
  URUGUAIANA = 'uruguaiana',
  FREDERICO_WESTPHALEN = 'frederico-westphalen',
  IJUI = 'ijui',
  GRAVATAI = 'gravatai',
}

export interface RegionalConfig {
  id: Region;
  name: string;
  fullTitle: string;
  hasChurches: boolean;
}


export interface MusicalEvent {
  id: string;
  title: string;
  location: string;
  date?: Date; // If undefined, it's TBD (A definir)
  time: string;
  category: EventCategory;
  description?: string;
  isSpecial?: boolean; // For highlighting important events
}

export interface FilterState {
  category: string;
  location: string;
  month: string;
  onlyFavorites: boolean;
}