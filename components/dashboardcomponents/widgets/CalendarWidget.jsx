// components/dashboardcomponents/widgets/CalendarWidget.jsx
import { useState } from 'react';
import { FaCalendar } from 'react-icons/fa';

export default function CalendarWidget() {
  const [currentDate] = useState(new Date());
  
  // Get current month and year
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  
  // Get days in current month
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  
  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();
  
  // Create calendar grid
  const calendarDays = [];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="text-center text-gray-300"></div>);
  }
  
  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === currentDate.getDate();
    calendarDays.push(
      <div 
        key={day} 
        className={`text-center p-1 text-sm ${
          isToday ? 'bg-orange-500 text-white rounded-full' : ''
        }`}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold text-brand-navy mb-2 flex items-center gap-2">
        <FaCalendar /> Calendar
      </h3>
      <div className="text-center mb-2 text-brand-blue font-medium">
        {month} {year}
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {calendarDays}
      </div>
    </div>
  );
}
