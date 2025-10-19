import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function GroupBalanceScore({ groupBalanceScore }) {
  if (!groupBalanceScore) return null;

  // Prepare data for the chart
  const chartData = groupBalanceScore.participants.map(participant => ({
    name: participant.name,
    talkTime: participant.talkTimeMinutes,
    color: participant.color
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold text-sm">{data.name}</p>
          <p className="text-sm text-gray-600">{data.talkTime.toFixed(1)} mins</p>
        </div>
      );
    }
    return null;
  };

  // Custom bar component to use participant colors
  const CustomBar = (props) => {
    const { payload, fill, ...rest } = props;
    return <Bar {...rest} fill={payload?.color || fill} />;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Group Balance Score</h3>
        <p className={`text-sm ${groupBalanceScore.isBalanced ? 'text-green-600' : 'text-orange-600'}`}>
          {groupBalanceScore.message}
        </p>
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="horizontal"
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number"
              domain={[0, 'dataMax + 5']}
              tickFormatter={(value) => `${value}m`}
            />
            <YAxis 
              dataKey="name" 
              type="category"
              width={80}
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              x={groupBalanceScore.averageTalkTime} 
              stroke="#666" 
              strokeDasharray="5 5"
              label={{ value: "Average", position: "topRight" }}
            />
            <Bar 
              dataKey="talkTime" 
              shape={<CustomBar />}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Statistics */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Average Talk Time</p>
          <p className="font-semibold">{groupBalanceScore.averageTalkTime.toFixed(1)} mins</p>
        </div>
        <div>
          <p className="text-gray-600">Total Participants</p>
          <p className="font-semibold">{groupBalanceScore.participants.length}</p>
        </div>
      </div>

      {/* Participant details */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Individual Talk Time</h4>
        <div className="space-y-1">
          {groupBalanceScore.participants.map((participant) => (
            <div key={participant.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: participant.color }}
                />
                <span className="text-gray-700">{participant.name}</span>
              </div>
              <span className="font-medium text-gray-900">
                {participant.talkTimeMinutes.toFixed(1)}m
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
