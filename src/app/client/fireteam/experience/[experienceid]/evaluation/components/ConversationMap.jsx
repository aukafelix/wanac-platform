import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ConversationMap({ conversationMap, participants }) {
  if (!conversationMap || !participants) return null;

  // Transform bubbles data for the chart
  const chartData = conversationMap.bubbles.map(bubble => {
    const participant = participants.find(p => p.id === bubble.participantId);
    return {
      x: bubble.timestamp / 60, // Convert to minutes
      y: Math.random() * 10 + 1, // Y position for visual spread
      z: bubble.understandingDepth * 20, // Bubble size
      participantId: bubble.participantId,
      participantName: participant?.name || 'Unknown',
      participantColor: participant?.color || '#gray',
      comment: bubble.comment,
      timestamp: formatTimestamp(bubble.timestamp),
      rubric: bubble.rubric || 'General Discussion'
    };
  });

  // Format timestamp helper
  function formatTimestamp(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg max-w-xs">
          <p className="font-semibold text-sm text-gray-900">{data.participantName}</p>
          <p className="text-xs text-gray-600 mb-1">{data.timestamp} - {data.rubric}</p>
          <p className="text-xs text-gray-700">{data.comment}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Conversation Map</h3>
        <p className="text-sm text-gray-600">
          The Conversation Map shows a timeline of individual comments related to the experience rubrics. 
          The size of each bubble reflects the depth of understanding in each comment.
        </p>
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-3">
        {participants.map(participant => (
          <div key={participant.id} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: participant.color }}
            />
            <span className="text-sm text-gray-700">{participant.name}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Time (minutes)"
              domain={['dataMin - 5', 'dataMax + 5']}
              tickFormatter={(value) => `${Math.floor(value)}:${Math.round((value % 1) * 60).toString().padStart(2, '0')}`}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Comments"
              domain={[0, 12]}
              tick={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter dataKey="z" data={chartData}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.participantColor} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Timeline markers */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        Timeline: {conversationMap.timeline.startTime} - {conversationMap.timeline.endTime}
      </div>
    </div>
  );
}
