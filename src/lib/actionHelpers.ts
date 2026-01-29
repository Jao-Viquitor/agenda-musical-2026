import { MusicalEvent } from '../types';
import { Church } from './churchData';

export const shareContent = async (title: string, text: string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
      });
    } catch (error) {
      console.log('Error sharing:', error);
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
  
  return `📅 *Evento Musical - CCB*\n\n` +
         `🎵 *${event.title}*\n` +
         `📍 Local: ${event.location}\n` +
         `📆 Data: ${dateStr}\n` +
         `⏰ Horário: ${event.time}\n` +
         `🏷️ Tipo: ${event.category}\n` +
         (event.description ? `ℹ️ Obs: ${event.description}` : '');
};

export const generateChurchShareText = (church: Church, region: string): string => {
  return `⛪ *Congregação Cristã no Brasil*\n` +
         `📍 *${church.name}* (${region})\n` +
         `🗺️ Endereço: ${church.address}\n\n` +
         `🛐 Cultos: ${church.services}\n` +
         (church.rjm && church.rjm !== '-' ? `🔥 RJM: ${church.rjm}\n` : '') +
         (church.obs ? `⚠️ Obs: ${church.obs}` : '');
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