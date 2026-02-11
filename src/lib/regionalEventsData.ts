import { MusicalEvent, EventCategory } from '../types';

const YEAR = 2026;

/**
 * Parser para formato "DD/MM/YYYY"
 */
const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
};

/**
 * Eventos da Região Frederico Westphalen
 * Fonte: CALENDARIO CCB musical.pdf
 * Administração Frederico Westphalen
 */
export const fredericoWestphalenEvents: MusicalEvent[] = [
    // 11/01/2026 - RSM dividido em 2 eventos
    {
        id: 'fw-1',
        title: 'Reunião Setor Musical',
        location: 'Frederico Westphalen Central',
        date: parseDate('11/01/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO,
        isSpecial: true
    },
    {
        id: 'fw-1-tech',
        title: 'Reunião Técnica para Organistas',
        location: 'Frederico Westphalen Central',
        date: parseDate('11/01/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO_TECNICA_ORGANISTAS,
        isSpecial: true
    },
    // 18/01/2026
    {
        id: 'fw-2',
        title: 'Ensaio Geral por Família - Palhetas',
        location: 'Coronel Bicaco',
        date: parseDate('18/01/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_GERAL,
        isSpecial: true
    },
    // 25/01/2026
    {
        id: 'fw-3',
        title: 'Ensaio Regional',
        location: 'Coronel Bicaco',
        date: parseDate('25/01/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 01/02/2026 - RSM dividido em 2 eventos
    {
        id: 'fw-4',
        title: 'Reunião Setor Musical',
        location: 'Palmeira das Missões',
        date: parseDate('01/02/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO,
        isSpecial: true
    },
    {
        id: 'fw-4-tech',
        title: 'Reunião Técnica para Organistas',
        location: 'Palmeira das Missões',
        date: parseDate('01/02/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO_TECNICA_ORGANISTAS,
        isSpecial: true
    },
    // 22/02/2026
    {
        id: 'fw-5',
        title: 'Ensaio Geral por Família - Cordas',
        location: 'Frederico Westphalen Central',
        date: parseDate('22/02/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_GERAL,
        isSpecial: true
    },
    // 15/03/2026
    {
        id: 'fw-6',
        title: 'Ensaio Regional',
        location: 'Palmeira das Missões',
        date: parseDate('15/03/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 29/03/2026
    {
        id: 'fw-7',
        title: 'Ensaio Geral por Família - Bocais',
        location: 'Palmeira das Missões',
        date: parseDate('29/03/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_GERAL,
        isSpecial: true
    },
    // 05/04/2026 - RSM dividido em 2 eventos
    {
        id: 'fw-8',
        title: 'Reunião Setor Musical',
        location: 'Frederico Westphalen Central',
        date: parseDate('05/04/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO,
        isSpecial: true
    },
    {
        id: 'fw-8-tech',
        title: 'Reunião Técnica para Organistas',
        location: 'Frederico Westphalen Central',
        date: parseDate('05/04/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO_TECNICA_ORGANISTAS,
        isSpecial: true
    },
    // 19/04/2026
    {
        id: 'fw-9',
        title: 'Ensaio Regional',
        location: 'Frederico Westphalen Central',
        date: parseDate('19/04/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 03/05/2026 - RSM dividido em 2 eventos
    {
        id: 'fw-10',
        title: 'Reunião Setor Musical',
        location: 'Palmeira das Missões',
        date: parseDate('03/05/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO,
        isSpecial: true
    },
    {
        id: 'fw-10-tech',
        title: 'Reunião Técnica para Organistas',
        location: 'Palmeira das Missões',
        date: parseDate('03/05/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO_TECNICA_ORGANISTAS,
        isSpecial: true
    },
    // 24/05/2026
    {
        id: 'fw-11',
        title: 'Ensaio Regional',
        location: 'Tenente Portela',
        date: parseDate('24/05/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 05/07/2026 - RSM dividido em 2 eventos
    {
        id: 'fw-12',
        title: 'Reunião Setor Musical',
        location: 'Frederico Westphalen Central',
        date: parseDate('05/07/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO,
        isSpecial: true
    },
    {
        id: 'fw-12-tech',
        title: 'Reunião Técnica para Organistas',
        location: 'Frederico Westphalen Central',
        date: parseDate('05/07/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO_TECNICA_ORGANISTAS,
        isSpecial: true
    },
    // 19/07/2026
    {
        id: 'fw-13',
        title: 'Ensaio Regional',
        location: 'Campo Novo',
        date: parseDate('19/07/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 02/08/2026 - RSM dividido em 2 eventos
    {
        id: 'fw-14',
        title: 'Reunião Setor Musical',
        location: 'Palmeira das Missões',
        date: parseDate('02/08/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO,
        isSpecial: true
    },
    {
        id: 'fw-14-tech',
        title: 'Reunião Técnica para Organistas',
        location: 'Palmeira das Missões',
        date: parseDate('02/08/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO_TECNICA_ORGANISTAS,
        isSpecial: true
    },
    // 23/08/2026
    {
        id: 'fw-15',
        title: 'Ensaio Regional',
        location: 'Iraí',
        date: parseDate('23/08/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 27/09/2026
    {
        id: 'fw-16',
        title: 'Ensaio Regional',
        location: 'Palmeira das Missões',
        date: parseDate('27/09/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 04/10/2026 - RSM dividido em 2 eventos
    {
        id: 'fw-17',
        title: 'Reunião Setor Musical',
        location: 'Frederico Westphalen Central',
        date: parseDate('04/10/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO,
        isSpecial: true
    },
    {
        id: 'fw-17-tech',
        title: 'Reunião Técnica para Organistas',
        location: 'Frederico Westphalen Central',
        date: parseDate('04/10/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO_TECNICA_ORGANISTAS,
        isSpecial: true
    },
    // 18/10/2026
    {
        id: 'fw-18',
        title: 'Ensaio Regional',
        location: 'Nonoai',
        date: parseDate('18/10/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 01/11/2026 - RSM dividido em 2 eventos
    {
        id: 'fw-19',
        title: 'Reunião Setor Musical',
        location: 'Palmeira das Missões',
        date: parseDate('01/11/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO,
        isSpecial: true
    },
    {
        id: 'fw-19-tech',
        title: 'Reunião Técnica para Organistas',
        location: 'Palmeira das Missões',
        date: parseDate('01/11/2026'),
        time: '09:00',
        category: EventCategory.REUNIAO_TECNICA_ORGANISTAS,
        isSpecial: true
    },
    // 02/11/2026
    {
        id: 'fw-20',
        title: 'Ensaio Regional',
        location: 'Ronda Alta Aparecida',
        date: parseDate('02/11/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        description: 'Feriado - Finados',
        isSpecial: true
    },
    // 13/12/2026
    {
        id: 'fw-21',
        title: 'Ensaio Regional',
        location: 'Planalto Área Indígena',
        date: parseDate('13/12/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    }
];

/**
 * Eventos da Região Ijuí
 * Fonte: DATAS DOS SERVIÇOS MUSICAIS 2026.pdf
 * Previsão de datas (Região Cruz Alta/Ijuí e arredores)
 */
export const ijuiEvents: MusicalEvent[] = [
    // 15/02/2026
    {
        id: 'ci-1',
        title: 'Ensaio Regional',
        location: 'Cruz Alta',
        date: parseDate('15/02/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 22/02/2026 - RSM dividido em 2 eventos
    {
        id: 'ci-2',
        title: 'Reunião Setor Musical',
        location: 'Ijuí',
        date: parseDate('22/02/2026'),
        time: '08:30',
        category: EventCategory.REUNIAO,
        isSpecial: true
    },
    {
        id: 'ci-2-tech',
        title: 'Reunião Técnica para Organistas',
        location: 'Ijuí',
        date: parseDate('22/02/2026'),
        time: '08:30',
        category: EventCategory.REUNIAO_TECNICA_ORGANISTAS,
        isSpecial: true
    },
    // 22/02/2026 - 10:00
    {
        id: 'ci-3',
        title: 'Ensaio Geral por Família',
        location: 'Ijuí',
        date: parseDate('22/02/2026'),
        time: '10:00',
        category: EventCategory.ENSAIO_GERAL,
        isSpecial: true
    },
    // 15/03/2026
    {
        id: 'ci-4',
        title: 'Ensaio Regional',
        location: 'Ijuí',
        date: parseDate('15/03/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 26/04/2026
    {
        id: 'ci-5',
        title: 'Ensaio Regional',
        location: 'Tucunduva',
        date: parseDate('26/04/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 17/05/2026
    {
        id: 'ci-6',
        title: 'Ensaio Regional',
        location: 'São Luiz Gonzaga',
        date: parseDate('17/05/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 02/08/2026
    {
        id: 'ci-7',
        title: 'Ensaio Regional',
        location: 'São Miguel das Missões',
        date: parseDate('02/08/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 30/08/2026 - RSM dividido em 2 eventos
    {
        id: 'ci-8',
        title: 'Reunião Setor Musical',
        location: 'Ijuí',
        date: parseDate('30/08/2026'),
        time: '08:30',
        category: EventCategory.REUNIAO,
        isSpecial: true
    },
    {
        id: 'ci-8-tech',
        title: 'Reunião Técnica para Organistas',
        location: 'Ijuí',
        date: parseDate('30/08/2026'),
        time: '08:30',
        category: EventCategory.REUNIAO_TECNICA_ORGANISTAS,
        isSpecial: true
    },
    // 20/09/2026
    {
        id: 'ci-9',
        title: 'Ensaio Regional',
        location: 'Independência',
        date: parseDate('20/09/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 18/10/2026
    {
        id: 'ci-10',
        title: 'Ensaio Regional',
        location: 'Santo Ângelo',
        date: parseDate('18/10/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 01/11/2026
    {
        id: 'ci-11',
        title: 'Ensaio Regional',
        location: 'Santa Rosa',
        date: parseDate('01/11/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    },
    // 29/11/2026 - RSM dividido em 2 eventos
    {
        id: 'ci-12',
        title: 'Reunião Setor Musical',
        location: 'Ijuí',
        date: parseDate('29/11/2026'),
        time: '08:30',
        category: EventCategory.REUNIAO,
        isSpecial: true
    },
    {
        id: 'ci-12-tech',
        title: 'Reunião Técnica para Organistas',
        location: 'Ijuí',
        date: parseDate('29/11/2026'),
        time: '08:30',
        category: EventCategory.REUNIAO_TECNICA_ORGANISTAS,
        isSpecial: true
    },
    // 06/12/2026
    {
        id: 'ci-13',
        title: 'Ensaio Regional',
        location: 'Três Passos',
        date: parseDate('06/12/2026'),
        time: '09:00',
        category: EventCategory.ENSAIO_REGIONAL,
        isSpecial: true
    }
];

// Export with old name for backward compatibility
export const cruzAltaIjuiEvents = ijuiEvents;
