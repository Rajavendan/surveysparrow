import React from 'react';
import { CalendarMonth, CalendarEvent } from '../../types/calendar';
import CalendarDay from './CalendarDay';

interface CalendarGridProps {
  calendarMonth: CalendarMonth;
  eventConflicts: { [key: string]: boolean };
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: string) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  calendarMonth, 
  eventConflicts, 
  onEventClick, 
  onDateClick 
}) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 bg-gray-100">
        {weekdays.map(day => (
          <div key={day} className="py-3 px-4 text-center font-semibold text-gray-700 border-r border-gray-200 last:border-r-0">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Days */}
      <div className="grid grid-cols-7">
        {calendarMonth.days.map((day, index) => (
          <CalendarDay
            key={`${day.date}-${index}`}
            day={day}
            eventConflicts={eventConflicts}
            onEventClick={onEventClick}
            onDateClick={onDateClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;