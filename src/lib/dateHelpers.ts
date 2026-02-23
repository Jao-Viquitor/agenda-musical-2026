import { MusicalEvent, EventCategory } from '../types';

const YEAR = new Date().getFullYear(); // Use current year

// Helper to get specific weekday of a month (e.g., 1st Sunday, Last Saturday)
// weekOrdinal: 1 (1st), 2 (2nd), 3 (3rd), 4 (4th), -1 (Last)
// dayOfWeek: 0 (Sunday) to 6 (Saturday)
export const getNthWeekday = (monthIndex: number, dayOfWeek: number, weekOrdinal: number): Date => {
  const date = new Date(YEAR, monthIndex, 1);
  const daysInMonth = new Date(YEAR, monthIndex + 1, 0).getDate();

  // Find first occurrence of the day
  let day = date.getDay();
  let diff = dayOfWeek - day;
  if (diff < 0) diff += 7;
  let firstOccurrence = 1 + diff;

  if (weekOrdinal === -1) {
    // Find last occurrence
    let lastOccurrence = firstOccurrence;
    while (lastOccurrence + 7 <= daysInMonth) {
      lastOccurrence += 7;
    }
    return new Date(YEAR, monthIndex, lastOccurrence);
  } else {
    const dayOfMonth = firstOccurrence + (weekOrdinal - 1) * 7;
    if (dayOfMonth > daysInMonth) {
      // Fallback/Error handling if 5th week doesn't exist, though typically not requested here
      return new Date(YEAR, monthIndex, daysInMonth);
    }
    return new Date(YEAR, monthIndex, dayOfMonth);
  }
};

// Parser for "DD/MM" format
export const parseDateString = (dateStr: string): Date => {
  const [day, month] = dateStr.split('/').map(Number);
  return new Date(YEAR, month - 1, day);
};

export const generateAllEvents = (): MusicalEvent[] => {
  const events: MusicalEvent[] = [];
  let idCounter = 1;

  const addEvent = (
    title: string,
    location: string,
    date: Date | undefined,
    time: string,
    category: EventCategory,
    description: string = ''
  ) => {
    // Highlight ONLY regional events and meetings as requested
    const isSpecial =
      category === EventCategory.ENSAIO_REGIONAL ||
      category === EventCategory.REUNIAO;

    // Ajustar descrição para ensaios locais às 19h30
    let finalTime = time;
    let finalDescription = description;

    if (category === EventCategory.ENSAIO_LOCAL && time === '19:30') {
      finalDescription = 'Junto do culto';
    }

    events.push({
      id: `evt-${idCounter++}`,
      title,
      location,
      date,
      time: finalTime,
      category,
      description: finalDescription,
      isSpecial
    });
  };

  // 1. Ensaios Locais (Fixos - Repetem todos os meses)
  // Inclui Janeiro e Fevereiro conforme solicitado
  for (let m = 0; m < 12; m++) {
    // Uruguaiana: 1º Domingo
    addEvent('Ensaio Local', 'Uruguaiana', getNthWeekday(m, 0, 1), '17:00', EventCategory.ENSAIO_LOCAL);
    // São Borja: 2º Domingo
    addEvent('Ensaio Local', 'São Borja', getNthWeekday(m, 0, 2), '19:30', EventCategory.ENSAIO_LOCAL);
    // Itaqui: 3º Domingo
    addEvent('Ensaio Local', 'Itaqui', getNthWeekday(m, 0, 3), '17:00', EventCategory.ENSAIO_LOCAL);
    // Alegrete: Último Domingo
    addEvent('Ensaio Local', 'Alegrete', getNthWeekday(m, 0, -1), '17:00', EventCategory.ENSAIO_LOCAL);
  }

  // 2. Ensaios Locais (Datas Variáveis)
  const variableLocals = [
    { loc: 'Libres', date: '08/03', time: '19:30' },
    { loc: 'Libres', date: '10/05', time: '10:00' }, // Manhã
    { loc: 'Libres', date: '12/07', time: '19:30' },
    { loc: 'Libres', date: '08/11', time: '19:30' },
    { loc: 'Artigas', date: '29/03', time: '19:30' },
    { loc: 'Artigas', date: '31/05', time: '10:00' }, // Manhã
    { loc: 'Artigas', date: '26/07', time: '19:30' },
    { loc: 'Artigas', date: '22/11', time: '19:30' },
    { loc: 'Bella Union', date: '22/03', time: '19:30' },
    { loc: 'Bella Union', date: '13/08', time: '19:30' },
    { loc: 'Bella Union', date: '20/12', time: '19:30' },
  ];

  variableLocals.forEach(item => {
    addEvent('Ensaio Local', item.loc, parseDateString(item.date), item.time, EventCategory.ENSAIO_LOCAL);
  });

  // 3. Ensaios Regionais
  const regionals = [
    { loc: 'Alegrete', date: '12/04', time: '09:00' },
    { loc: 'São Borja', date: '19/07', time: '09:00' },
    { loc: 'Uruguaiana', date: '22/08', time: '19:00' },
    { loc: 'Itaqui', date: '11/10', time: '09:00' },
    { loc: 'Artigas', date: null, time: 'A definir' },
    { loc: 'Libres', date: null, time: 'A definir' },
  ];

  regionals.forEach(item => {
    addEvent('Ensaio Regional', item.loc, item.date ? parseDateString(item.date) : undefined, item.time, EventCategory.ENSAIO_REGIONAL);
  });

  // 4. Práticas em Conjunto (Fixos Mensais - GEM)
  // Começam em Março (m=2) pois Jan/Fev são férias
  for (let m = 2; m < 12; m++) {
    // Itaqui: 1º Sábado
    addEvent('Prática em Conjunto', 'Itaqui', getNthWeekday(m, 6, 1), 'Após o Santo Culto', EventCategory.PRATICA_CONJUNTO);
    // Alegrete: 2º Sábado
    addEvent('Prática em Conjunto', 'Alegrete', getNthWeekday(m, 6, 2), 'Após o Santo Culto', EventCategory.PRATICA_CONJUNTO);
    // Uruguaiana: 2º Sábado
    addEvent('Prática em Conjunto', 'Uruguaiana', getNthWeekday(m, 6, 2), 'Após o Santo Culto', EventCategory.PRATICA_CONJUNTO);
    // São Borja: Último Sábado
    addEvent('Prática em Conjunto', 'São Borja', getNthWeekday(m, 6, -1), 'Após o Santo Culto', EventCategory.PRATICA_CONJUNTO);
  }

  // 5. Eventos Especiais Uruguaiana (Reuniões, Práticas, Ensaios)
  const eventsUru = [
    { title: 'Prática Geral', dates: ['24/05', '13/12'], time: 'Após o Santo Culto', category: EventCategory.PRATICA_CONJUNTO },
    { title: 'Teste e Exames de Músicos e Organistas', dates: ['21/03', '22/08'], time: 'A definir', category: EventCategory.EXAME },
    { title: 'Ensaio Geral Por Famílias', dates: ['22/03', '15/11'], time: '08:30', category: EventCategory.ENSAIO_GERAL },
    { title: 'Reunião Setor Musical', dates: ['01/03', '14/06', '13/12'], time: '14:00', category: EventCategory.REUNIAO },
  ];

  eventsUru.forEach(evt => {
    evt.dates.forEach(dateStr => {
      addEvent(evt.title, 'Uruguaiana', parseDateString(dateStr), evt.time, evt.category);
    });
  });

  // Sort events by date, then by time. Put TBD at the end.
  return events.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;

    // Se mesma data, ordenar por horário
    if (a.date.getTime() === b.date.getTime()) {
      // Converter horários para comparação
      const timeA = parseTimeToMinutes(a.time);
      const timeB = parseTimeToMinutes(b.time);
      return timeA - timeB;
    }

    return a.date.getTime() - b.date.getTime();
  });
};

// Helper para converter horário em minutos para ordenação
const parseTimeToMinutes = (time: string): number => {
  // Handle special cases
  if (time === 'A definir') return 9999;
  if (time.includes('Após')) return 1000; // Após culto

  // Parse HH:MM format
  const match = time.match(/(\d{1,2}):(\d{2})/);
  if (match) {
    return parseInt(match[1]) * 60 + parseInt(match[2]);
  }

  return 9999; // Fallback
};

export const formatDate = (date: Date | undefined): string => {
  if (!date) return 'Data a definir';
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  }).format(date);
};

export const getMonthName = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);
};