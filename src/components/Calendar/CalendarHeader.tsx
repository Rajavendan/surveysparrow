import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { getMonthName } from '../../utils/dateUtils';
import dayjs, { Dayjs } from 'dayjs';

interface CalendarHeaderProps {
  currentDate: Dayjs;
  onNavigate: (direction: 'prev' | 'next') => void;
  onToday: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, onNavigate, onToday }) => {
  const monthName = getMonthName(currentDate.month());
  const year = currentDate.year();
  const isCurrentMonth = currentDate.isSame(dayjs(), 'month');

  return (
    <div className="flex items-center justify-between mb-6 bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="text-blue-600" size={24} />
          <h1 className="text-2xl font-bold text-gray-900">
            {monthName} {year}
          </h1>
        </div>
        {!isCurrentMonth && (
          <button
            onClick={onToday}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors font-medium"
          >
            Today
          </button>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onNavigate('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
          aria-label="Previous month"
        >
          <ChevronLeft 
            size={20} 
            className="text-gray-600 group-hover:text-gray-900" 
          />
        </button>
        <button
          onClick={() => onNavigate('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
          aria-label="Next month"
        >
          <ChevronRight 
            size={20} 
            className="text-gray-600 group-hover:text-gray-900" 
          />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;