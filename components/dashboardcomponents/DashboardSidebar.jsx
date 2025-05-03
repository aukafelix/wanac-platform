// components/dashboardcomponents/DashboardSidebar.jsx
import CalendarWidget from './widgets/CalendarWidget';
import TimeWidget from './widgets/TimeWidget';
import CommunityFeedWidget from './widgets/CommunityFeedWidget';

export default function DashboardSidebar() {
  return (
    <aside className="w-80 bg-gray-50 p-4 space-y-4 hidden lg:block">
      <TimeWidget />
      <CalendarWidget />
      <CommunityFeedWidget />
    </aside>
  );
}
