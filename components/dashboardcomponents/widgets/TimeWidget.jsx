// components/dashboardcomponents/widgets/TimeWidget.jsx
import { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa';

export default function TimeWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
  
  const formattedDate = time.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold text-brand-navy mb-2 flex items-center gap-2">
        <FaClock /> Current Time
      </h3>
      <div className="text-center">
        <div className="text-2xl font-bold text-brand-blue">{formattedTime}</div>
        <div className="text-sm text-gray-600">{formattedDate}</div>
      </div>
    </div>
  );
}
