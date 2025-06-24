import React, { useState } from 'react';
import { X, Calendar, Clock, FileText, Tag } from 'lucide-react';
import { CalendarEvent } from '../../types/calendar';
import dayjs from 'dayjs';

interface AddEventModalProps {
  isOpen: boolean;
  selectedDate: string | null;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, selectedDate, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    startTime: '09:00',
    endTime: '10:00',
    description: '',
    category: 'other' as CalendarEvent['category']
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen || !selectedDate) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    }

    const startTime = dayjs(`2000-01-01 ${formData.startTime}`);
    const endTime = dayjs(`2000-01-01 ${formData.endTime}`);

    if (endTime.isBefore(startTime) || endTime.isSame(startTime)) {
      newErrors.endTime = 'End time must be after start time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateDuration = () => {
    const startTime = dayjs(`2000-01-01 ${formData.startTime}`);
    const endTime = dayjs(`2000-01-01 ${formData.endTime}`);
    return endTime.diff(startTime, 'minute');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newEvent: Omit<CalendarEvent, 'id'> = {
      title: formData.title.trim(),
      date: selectedDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      duration: calculateDuration(),
      description: formData.description.trim(),
      category: formData.category
    };

    onSave(newEvent);
    
    // Reset form
    setFormData({
      title: '',
      startTime: '09:00',
      endTime: '10:00',
      description: '',
      category: 'other'
    });
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      startTime: '09:00',
      endTime: '10:00',
      description: '',
      category: 'other'
    });
    setErrors({});
    onClose();
  };

  const formattedDate = dayjs(selectedDate).format('dddd, MMMM D, YYYY');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Event</h2>
              <p className="text-gray-600 text-sm mt-1">{formattedDate}</p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Event Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Time Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <div className="relative">
                  <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="time"
                    id="startTime"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <div className="relative">
                  <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="time"
                    id="endTime"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.endTime ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.endTime && (
                  <p className="text-red-600 text-sm mt-1">{errors.endTime}</p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="relative">
                <Tag size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                >
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="meeting">Meeting</option>
                  <option value="reminder">Reminder</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <div className="relative">
                <FileText size={16} className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Add event description..."
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;