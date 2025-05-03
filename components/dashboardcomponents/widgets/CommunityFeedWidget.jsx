// components/dashboardcomponents/widgets/CommunityFeedWidget.jsx
import { FaUsers } from 'react-icons/fa';

export default function CommunityFeedWidget() {
  // Mock data for community feed
  const feedItems = [
    {
      id: 1,
      user: 'John D.',
      action: 'posted in Veterans Support',
      time: '10 min ago',
      content: 'Just completed my first week of the transition program!'
    },
    {
      id: 2,
      user: 'Sarah M.',
      action: 'shared a resource',
      time: '1 hour ago',
      content: 'Found this great article on resume building for veterans.'
    },
    {
      id: 3,
      user: 'Michael T.',
      action: 'created an event',
      time: '3 hours ago',
      content: 'Virtual coffee meetup this Friday at 10am PT.'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold text-brand-navy mb-3 flex items-center gap-2">
        <FaUsers /> Community Feed
      </h3>
      <div className="space-y-3">
        {feedItems.map(item => (
          <div key={item.id} className="border-b pb-2 last:border-0">
            <div className="flex items-start">
              <div className="bg-brand-navy text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-2">
                {item.user.charAt(0)}
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">{item.user}</span> {item.action}
                </p>
                <p className="text-xs text-gray-500">{item.time}</p>
                <p className="text-sm mt-1">{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-3 bg-[#002147] text-white px-3 py-1 rounded text-sm hover:bg-orange-500 transition">
        View All Updates
      </button>
    </div>
  );
}
