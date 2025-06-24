import React from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import AddEventModal from './AddEventModal';

const Calendar: React.FC = () => {
  const {
    currentDate,
    calendarMonth,
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
  } = useCalendar();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <CalendarHeader
        currentDate={currentDate}
        onNavigate={navigateMonth}
        onToday={goToToday}
      />
      
      <CalendarGrid
        calendarMonth={calendarMonth}
        eventConflicts={eventConflicts}
        onEventClick={selectEvent}
        onDateClick={openAddEventModal}
      />
      
      <EventModal
        event={selectedEvent}
        hasConflict={selectedEvent ? !!eventConflicts[selectedEvent.id] : false}
        onClose={() => selectEvent(null)}
      />

      <AddEventModal
        isOpen={isAddEventModalOpen}
        selectedDate={selectedDateForNewEvent}
        onClose={closeAddEventModal}
        onSave={addEvent}
      />
    </div>
  );
};

export default Calendar;