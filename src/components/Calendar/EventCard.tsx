import React from 'react';
import { CalendarEvent } from '../../types/calendar';
import { formatTime, getCategoryColor } from '../../utils/dateUtils';
import { Clock } from 'lucide-react';

interface EventCardProps {
  event: CalendarEvent;
  hasConflict: boolean;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, hasConflict, onClick }) => {
  return (
    <div
      className={`
        px-2 py-1 mb-1 rounded text-xs cursor-pointer border transition-all duration-200
        hover:shadow-sm hover:scale-105 active:scale-95
        ${getCategoryColor(event.category, hasConflict)}
      `}
      onClick={onClick}
      title={hasConflict ? `⚠️ ${event.title} (Conflict detected)` : event.title}
    >
      <div className="flex items-center gap-1">
        <Clock size={10} />
        <span className="font-medium truncate">{formatTime(event.startTime)}</span>
      </div>
      <div className="truncate font-semibold">{event.title}</div>
      {hasConflict && (
        <div className="text-xs font-bold">⚠️ Conflict</div>
      )}
    </div>
  );
};

export default EventCard;