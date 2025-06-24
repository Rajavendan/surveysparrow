export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  duration: number; // in minutes
  description?: string;
  category: 'work' | 'personal' | 'meeting' | 'reminder' | 'other';
  color?: string;
}

export interface CalendarDay {
  date: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export interface CalendarMonth {
  year: number;
  month: number;
  days: CalendarDay[];
}