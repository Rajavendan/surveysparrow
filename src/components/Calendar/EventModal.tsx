import React from 'react';
import { CalendarEvent } from '../../types/calendar';
import { formatTime, formatDuration, getCategoryColor } from '../../utils/dateUtils';
import { X, Clock, Calendar, MapPin, FileText, Tag } from 'lucide-react';
import dayjs from 'dayjs';

interface EventModalProps {
  event: CalendarEvent | null;
  hasConflict: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, hasConflict, onClose }) => {
  if (!event) return null;

  const formattedDate = dayjs(event.date).format('dddd, MMMM D, YYYY');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h2>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(event.category, hasConflict)}`}>
                <Tag size={14} className="mr-1" />
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={24} />
            </button>
          </div>

          {hasConflict && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <div className="flex items-center text-red-800">
                <span className="text-xl mr-2">⚠️</span>
                <span className="font-semibold">Scheduling Conflict Detected</span>
              </div>
              <p className="text-red-700 text-sm mt-1">
                This event overlaps with another event on the same day.
              </p>
            </div>
          )}

          {/* Event Details */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <Calendar size={18} className="mr-3 text-blue-500" />
              <span className="font-medium">{formattedDate}</span>
            </div>

            <div className="flex items-center text-gray-700">
              <Clock size={18} className="mr-3 text-green-500" />
              <div>
                <span className="font-medium">
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  ({formatDuration(event.duration)})
                </span>
              </div>
            </div>

            {event.description && (
              <div className="flex items-start text-gray-700">
                <FileText size={18} className="mr-3 mt-1 text-purple-500 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Description</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;