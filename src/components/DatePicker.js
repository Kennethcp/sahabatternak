import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';

const DatePicker = ({ selectedDate, onDateSelect, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const daysInMonth = Array.from(
    { length: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate() },
    (_, i) => i + 1
  );

  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDateClick = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onDateSelect(newDate);
    onClose(); // Close the calendar after a date is selected
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // Close when clicking outside
    >
      <div
        className="p-4 max-w-sm mx-auto bg-white rounded-lg border-darkgreen border-4 bg-opacity-10 backdrop-blur relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="text-greentext p-1 rounded-full"
          >
            &lt;
          </button>
          <div className="text-center">
            <div className="text-lg text-greentext font-semibold font-poppins">
              {format(currentMonth, 'yyyy')}
            </div>
            <div className="text-sm text-greentext font-poppins">
              {format(currentMonth, 'MMM')}
            </div>
          </div>
          <button
            onClick={handleNextMonth}
            className="text-greentext p-1 rounded-full"
          >
            &gt;
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
          {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }).map((_, i) => (
            <div key={i} />
          ))}
          {daysInMonth.map((day) => (
            <div
              key={day}
              className="w-8 h-8 flex items-center justify-center bg-greentext text-white rounded-md font-poppins cursor-pointer hover:bg-darkgreen"
              onClick={() => handleDateClick(day)}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
