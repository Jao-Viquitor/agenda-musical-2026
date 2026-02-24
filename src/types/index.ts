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


export interface InstrumentStat {
  name: string;
  count: number;
}

export interface FamilyStat {
  name: string;
  total: number;
  percentage: number;
  idealPercentage: number;
}

export interface EventStats {
  hinoAbertura: number;
  anciao: string;
  palavra: string;
  regentes: string[];
  totalMusicians: number;
  instruments: InstrumentStat[];
  hinosTocados: number[];
  families: FamilyStat[];
  organistas?: number;
  examinadoras?: number;
  encarregadosRegionais?: number;
  totalGeral?: number; // Músicos + Org + Min
}

export interface GemSchedule {
  scale: string;
  hinosRJM: string;
  hinosMeiaHora: string;
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
  stats?: EventStats; // Data from past events
  gemSchedule?: GemSchedule; // Detalhamento de ensaio (escala, hinos)
}

export interface FilterState {
  category: string;
  location: string;
  month: string;
  onlyFavorites: boolean;
}