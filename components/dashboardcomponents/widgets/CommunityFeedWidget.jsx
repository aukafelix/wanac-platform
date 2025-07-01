// components/dashboardcomponents/widgets/CommunityFeedWidget.jsx
import { FaUsers } from 'react-icons/fa';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function CommunityFeedWidget({ feedItems = [], onPost, onLike, onReshare }) {
  const [postContent, setPostContent] = React.useState('');
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold text-brand-navy mb-3 flex items-center gap-2">
        <FaUsers /> Community Feed
      </h3>
      {/* Post box */}
      <form
        onSubmit={e => {
          e.preventDefault();
          if (postContent.trim()) {
            onPost && onPost(postContent);
            setPostContent('');
          }
        }}
        className="mb-4"
      >
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={2}
          placeholder="Share something with the community..."
          value={postContent}
          onChange={e => setPostContent(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Post</button>
      </form>
      <div className="space-y-3">
        {feedItems.map(item => (
          <div key={item.id} className="border-b pb-2 last:border-0">
            <div className="flex items-start">
              <div className="bg-brand-navy text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-2">
                {item.user?.charAt(0) || 'M'}
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{item.user || item.host || 'Meetup'}</span> {item.action || (item.type === 'meetup' ? 'created a meetup' : 'posted')}
                </p>
                <p className="text-xs text-gray-500">{item.time || item.date || ''}</p>
                <p className="text-sm mt-1">{item.content || item.title}</p>
                {item.type === 'meetup' && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-600">{item.duration} • {item.location || ''}</span>
                  </div>
                )}
                {/* Like/Reshare buttons */}
                <div className="flex gap-2 mt-2">
                  <button className="text-blue-600 hover:underline text-xs" onClick={() => onLike && onLike(item.id)}>Like</button>
                  <button className="text-blue-600 hover:underline text-xs" onClick={() => onReshare && onReshare(item.id)}>Reshare</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-3 bg-[#002147] text-white px-3 py-1 rounded text-sm hover:bg-orange-500 transition" onClick={() => router.push('/pages/client/socialcommunity')}>
        View All Updates
      </button>
    </div>
  );
}
