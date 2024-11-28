import React, { useState } from 'react';
import DatePicker from './DatePicker';
import { fetchDataByDate, fetchDataByDateRange } from './supabaseAPI';

const CalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0];
    const data = await fetchDataByDate(formattedDate);
    setEvents(data);
  };

  const handleDateRangeSelect = async (start, end) => {
    const startFormatted = start.toISOString().split('T')[0];
    const endFormatted = end.toISOString().split('T')[0];
    const data = await fetchDataByDateRange(startFormatted, endFormatted);
    setEvents(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Calendar Events</h1>

      {/* Open DatePicker */}
      <button
        onClick={() => setShowDatePicker(true)}
        className="bg-darkgreen text-white px-4 py-2 rounded"
      >
        Select Date
      </button>

      {/* DatePicker Modal */}
      {showDatePicker && (
        <DatePicker
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onDateRangeSelect={handleDateRangeSelect}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {/* Event List */}
      <div className="mt-4">
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event.id} className="mb-2">
                <strong>{event.name}</strong> - {event.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found for the selected date or range.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarApp;
