import React from 'react';
import { CalendarDay as CalendarDayType, CalendarEvent } from '../../types/calendar';
import EventCard from './EventCard';
import { Plus } from 'lucide-react';

interface CalendarDayProps {
  day: CalendarDayType;
  eventConflicts: { [key: string]: boolean };
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: string) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ 
  day, 
  eventConflicts, 
  onEventClick, 
  onDateClick 
}) => {
  const handleDateClick = (e: React.MouseEvent) => {
    // Only trigger date click if clicking on empty space (not on events)
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.date-header')) {
      onDateClick(day.date);
    }
  };

  return (
    <div 
      className={`
        min-h-[120px] p-2 border border-gray-200 bg-white transition-all duration-200 cursor-pointer
        ${day.isCurrentMonth ? 'hover:bg-gray-50' : 'bg-gray-50 text-gray-400'}
        ${day.isToday ? 'ring-2 ring-blue-500 ring-inset bg-blue-50' : ''}
        hover:shadow-sm
      `}
      onClick={handleDateClick}
    >
      <div className={`
        date-header flex items-center justify-between mb-2 
        ${day.isToday ? 'text-blue-700 font-bold' : day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
      `}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{day.dayNumber}</span>
          {day.isToday && (
            <span className="text-xs bg-blue-500 text-white px-1 rounded">Today</span>
          )}
        </div>
        {day.isCurrentMonth && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDateClick(day.date);
            }}
            className="opacity-0 group-hover:opacity-100 hover:opacity-100 p-1 hover:bg-blue-100 rounded transition-all duration-200"
            title="Add event"
          >
            <Plus size={12} className="text-blue-600" />
          </button>
        )}
      </div>
      
      <div className="space-y-1 max-h-20 overflow-y-auto">
        {day.events.slice(0, 3).map(event => (
          <EventCard
            key={event.id}
            event={event}
            hasConflict={!!eventConflicts[event.id]}
            onClick={() => onEventClick(event)}
          />
        ))}
        {day.events.length > 3 && (
          <div className="text-xs text-gray-500 font-medium px-2 py-1">
            +{day.events.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDay;