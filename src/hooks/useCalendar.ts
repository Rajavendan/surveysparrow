import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { CalendarEvent, CalendarMonth } from '../types/calendar';
import { generateCalendarMonth, checkEventConflicts } from '../utils/dateUtils';
import eventsData from '../data/events.json';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>(eventsData as CalendarEvent[]);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [selectedDateForNewEvent, setSelectedDateForNewEvent] = useState<string | null>(null);
  
  const calendarMonth = useMemo(() => {
    return generateCalendarMonth(currentDate.year(), currentDate.month(), events);
  }, [currentDate, events]);
  
  const eventConflicts = useMemo(() => {
    return checkEventConflicts(events);
  }, [events]);
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'prev' 
        ? prev.subtract(1, 'month')
        : prev.add(1, 'month')
    );
  };
  
  const goToToday = () => {
    setCurrentDate(dayjs());
  };
  
  const selectEvent = (event: CalendarEvent | null) => {
    setSelectedEvent(event);
  };

  const openAddEventModal = (date: string) => {
    setSelectedDateForNewEvent(date);
    setIsAddEventModalOpen(true);
  };

  const closeAddEventModal = () => {
    setIsAddEventModalOpen(false);
    setSelectedDateForNewEvent(null);
  };

  const addEvent = (newEventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...newEventData,
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    setEvents(prev => [...prev, newEvent]);
  };
  
  return {
    currentDate,
    calendarMonth,
    events,
    eventConflicts,
    selectedEvent,
    isAddEventModalOpen,
    selectedDateForNewEvent,
    navigateMonth,
    goToToday,
    selectEvent,
    openAddEventModal,
    closeAddEventModal,
    addEvent
  };
};