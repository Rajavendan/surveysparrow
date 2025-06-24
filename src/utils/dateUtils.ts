import dayjs, { Dayjs } from 'dayjs';
import { CalendarEvent, CalendarDay, CalendarMonth } from '../types/calendar';

export const formatDate = (date: Dayjs | string, format: string = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};

export const isToday = (date: Dayjs | string) => {
  return dayjs(date).isSame(dayjs(), 'day');
};

export const isSameMonth = (date: Dayjs | string, monthDate: Dayjs | string) => {
  return dayjs(date).isSame(dayjs(monthDate), 'month');
};

export const getMonthName = (month: number) => {
  return dayjs().month(month).format('MMMM');
};

export const getDaysInMonth = (year: number, month: number): CalendarDay[] => {
  const firstDay = dayjs(`${year}-${month + 1}-01`);
  const lastDay = firstDay.endOf('month');
  const startDate = firstDay.startOf('week');
  const endDate = lastDay.endOf('week');
  
  const days: CalendarDay[] = [];
  let currentDate = startDate;
  
  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    days.push({
      date: currentDate.format('YYYY-MM-DD'),
      dayNumber: currentDate.date(),
      isCurrentMonth: currentDate.isSame(firstDay, 'month'),
      isToday: isToday(currentDate),
      events: []
    });
    currentDate = currentDate.add(1, 'day');
  }
  
  return days;
};

export const generateCalendarMonth = (year: number, month: number, events: CalendarEvent[]): CalendarMonth => {
  const days = getDaysInMonth(year, month);
  
  // Add events to corresponding days
  const daysWithEvents = days.map(day => ({
    ...day,
    events: events.filter(event => event.date === day.date)
  }));
  
  return {
    year,
    month,
    days: daysWithEvents
  };
};

export const checkEventConflicts = (events: CalendarEvent[]): { [key: string]: boolean } => {
  const conflicts: { [key: string]: boolean } = {};
  
  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      const event1 = events[i];
      const event2 = events[j];
      
      if (event1.date === event2.date) {
        const start1 = dayjs(`${event1.date} ${event1.startTime}`);
        const end1 = dayjs(`${event1.date} ${event1.endTime}`);
        const start2 = dayjs(`${event2.date} ${event2.startTime}`);
        const end2 = dayjs(`${event2.date} ${event2.endTime}`);
        
        // Check for overlap
        if (start1.isBefore(end2) && start2.isBefore(end1)) {
          conflicts[event1.id] = true;
          conflicts[event2.id] = true;
        }
      }
    }
  }
  
  return conflicts;
};

export const getCategoryColor = (category: CalendarEvent['category'], hasConflict: boolean = false) => {
  const colors = {
    work: hasConflict ? 'bg-red-100 text-red-800 border-red-200' : 'bg-blue-100 text-blue-800 border-blue-200',
    personal: hasConflict ? 'bg-red-100 text-red-800 border-red-200' : 'bg-green-100 text-green-800 border-green-200',
    meeting: hasConflict ? 'bg-red-100 text-red-800 border-red-200' : 'bg-purple-100 text-purple-800 border-purple-200',
    reminder: hasConflict ? 'bg-red-100 text-red-800 border-red-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200',
    other: hasConflict ? 'bg-red-100 text-red-800 border-red-200' : 'bg-gray-100 text-gray-800 border-gray-200'
  };
  
  return colors[category];
};

export const formatTime = (time: string) => {
  return dayjs(`2000-01-01 ${time}`).format('h:mm A');
};

export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  
  if (hours === 0) {
    return `${minutes}m`;
  } else if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}m`;
  }
};