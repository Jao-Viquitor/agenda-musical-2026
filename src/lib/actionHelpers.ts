import { MusicalEvent } from '../types';
import { Church, getMainChurchAddress } from './churchData';

export const shareToWhatsApp = (text: string) => {
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
};

export const shareContent = async (title: string, text: string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
      });
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.log('Error sharing:', error);
      }
    }
  } else {
    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(`${title}\n\n${text}`);
      alert('Informações copiadas para a área de transferência!');
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  }
};

export const generateEventShareText = (event: MusicalEvent): string => {
  const dateStr = event.date
    ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(event.date)
    : 'Data a definir';

  const address = getMainChurchAddress(event.location);

  // Using Unicode escapes for emojis to avoid encoding issues (\uXXXX)
  let text = `\uD83D\uDCC5 *AGENDA MUSICAL - CCB*\n\n`;
  text += `\uD83C\uDFB5 *${event.title}*\n\n`;
  text += `\uD83D\uDCC6 *Data:* ${dateStr}\n`;
  text += `\u23F0 *Horário:* ${event.time}\n`;
  text += `\uD83D\uDCCD *Local:* ${event.location}\n`;

  if (address) {
    text += `\uD83D\uDDFA\uFE0F *Endereço:* ${address}\n`;
  }

  text += `\uD83C\uDFF7\uFE0F *Categoria:* ${event.category}\n`;

  if (event.description) {
    text += `\n\u2139\uFE0F *Observações:*\n${event.description}\n`;
  }

  text += `\nVeja mais detalhes em: https://setormusical-uruguaiana.vercel.app`;

  return text;
};

export const generateChurchShareText = (church: Church, region: string): string => {
  return `\u26EA *CCB - Casa de Oração*\n\n` +
    `\uD83D\uDCCD *${church.name}* (${region})\n` +
    `\uD83D\uDDFA\uFE0F *Endereço:* ${church.address}\n\n` +
    `\uD83D\uDED0 *Cultos:* ${church.services}\n` +
    (church.rjm && church.rjm !== '-' ? `\uD83D\uDD25 *RJM:* ${church.rjm}\n` : '') +
    (church.obs ? `\n\u26A0\uFE0F *Obs:* ${church.obs}` : '');
};

export const getGoogleCalendarLink = (event: MusicalEvent): string => {
  if (!event.date) return '#';

  const title = encodeURIComponent(`CCB - ${event.title}`);
  const location = encodeURIComponent(event.location);
  const details = encodeURIComponent(`${event.category} - ${event.description || ''}`);

  // Construct dates. Assuming event duration is approx 2 hours.
  // Format: YYYYMMDDTHHMMSS
  const start = new Date(event.date);
  const [hours, minutes] = event.time.includes(':')
    ? event.time.split(':').map(Number)
    : [19, 30]; // Default time if parsing fails or text like "Após culto"

  if (!isNaN(hours)) {
    start.setHours(hours, minutes || 0);
  } else {
    // If time is "Após o Santo Culto", default to 21:00 roughly? Or just keep date.
    // Let's assume late evening for safety or 9am for morning.
    // Simple heuristic for "Manhã" or default evening.
    if (event.time.toLowerCase().includes('manhã') || event.time.includes('9h')) {
      start.setHours(9, 0);
    } else {
      start.setHours(19, 30);
    }
  }

  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // +2 hours

  const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(start)}/${formatDate(end)}&details=${details}&location=${location}&sf=true&output=xml`;
};