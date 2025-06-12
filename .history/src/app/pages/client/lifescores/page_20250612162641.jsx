"use client";

import { useState, useEffect } from "react";
import Sidebar from '../../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../../components/dashboardcomponents/clienttopbar';
import CommunityFeedWidget from '../../../../../components/dashboardcomponents/widgets/CommunityFeedWidget';
import LifeScorePreview from '../../../../../components/LifeScorePreview';
import InfographicWheel from '../../../../../components/infographicWheel';
import { FaChartLine, FaHistory } from "react-icons/fa";
import { Button, LinearProgress, Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';

// Demo data for charts
const dailyHabitsData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  score: Math.floor(Math.random() * 5) + 1,
}));
const wholeLifeData = [
  { month: 'Jan', score: 6 },
  { month: 'Feb', score: 7 },
  { month: 'Mar', score: 8 },
  { month: 'Apr', score: 7 },
  { month: 'May', score: 9 },
  { month: 'Jun', score: 8 },
];

export default function LifeScoresPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [assessmentStep, setAssessmentStep] = useState(1);
  const totalAssessmentSteps = 10;

  useEffect(() => {
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Sidebar */}
      <Sidebar className="w-56 bg-white border-r border-gray-200" collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-12 py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1 space-y-10">
                {/* Hero / Preview Section */}
                <LifeScorePreview />

                {/* Daily Habits Section */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-brand-navy">Daily Habits (Last 30 Days)</h3>
                    <Button variant="contained" color="primary" size="small">Take Assessment</Button>
                  </div>
                  <Typography variant="body2" className="mb-2 text-gray-600">Track your daily habits and see your progress over the last month.</Typography>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={dailyHabitsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill="#ff9800" name="Habit Score" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex justify-between items-center mt-2">
                    <Button startIcon={<FaHistory />} size="small" color="secondary">View History</Button>
                    <span className="text-xs text-gray-500">Visualizes your daily habit scores</span>
                  </div>
                </section>

                {/* Whole Life Habits Section */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-brand-navy">Whole Life Habits (Last 6 Months)</h3>
                    <Button variant="contained" color="primary" size="small">Take Assessment</Button>
                  </div>
                  <Typography variant="body2" className="mb-2 text-gray-600">See your overall life habits and trends for the past 6 months.</Typography>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={wholeLifeData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#1976d2" name="Life Score" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="flex justify-between items-center mt-2">
                    <Button startIcon={<FaHistory />} size="small" color="secondary">View History</Button>
                    <span className="text-xs text-gray-500">Visualizes your whole life habit scores</span>
                  </div>
                </section>

                {/* Assessment Progress Example (Daily Habits) */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-brand-navy">Daily Habits Assessment</h3>
                    <span className="text-sm text-gray-500">{assessmentStep} of {totalAssessmentSteps}</span>
                  </div>
                  <Typography variant="body2" className="mb-2 text-gray-600">Rate yourself on each dimension below. Click a number to select your rating.</Typography>
                  <Box sx={{ width: '100%', mb: 2 }}>
                    <LinearProgress variant="determinate" value={(assessmentStep / totalAssessmentSteps) * 100} />
                  </Box>
                  {/* Example assessment item */}
                  <div className="mb-4">
                    <Typography variant="subtitle1" className="mb-1">Clarity</Typography>
                    <Typography variant="caption" className="mb-2 text-gray-500">How clear do you feel about your goals and priorities today?</Typography>
                    <div className="flex gap-2 mt-2">
                      {[1,2,3,4,5].map(val => (
                        <Button key={val} variant="outlined" color="primary" size="small">{val}</Button>
                      ))}
                    </div>
                  </div>
                  {/* Add more assessment items as needed */}
                  <Button variant="contained" color="primary" size="small" className="mt-2">Next</Button>
                </section>

                {/* Whole Life Assessment Progress Example */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-brand-navy">Whole Life Assessment</h3>
                    <span className="text-sm text-gray-500">2 of 10</span>
                  </div>
                  <Typography variant="body2" className="mb-2 text-gray-600">Rate yourself on each life area below. Click a number to select your rating.</Typography>
                  <Box sx={{ width: '100%', mb: 2 }}>
                    <LinearProgress variant="determinate" value={20} />
                  </Box>
                  {/* Example assessment item */}
                  <div className="mb-4">
                    <Typography variant="subtitle1" className="mb-1">Health</Typography>
                    <Typography variant="caption" className="mb-2 text-gray-500">How would you rate your overall physical health?</Typography>
                    <div className="flex gap-2 mt-2">
                      {[1,2,3,4,5,6,7,8,9,10].map(val => (
                        <Button key={val} variant="outlined" color="primary" size="small">{val}</Button>
                      ))}
                    </div>
                  </div>
                  {/* Add more assessment items as needed */}
                  <Button variant="contained" color="primary" size="small" className="mt-2">Next</Button>
                </section>

                {/* Historical Trends & Progress Visualization */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-none mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-brand-navy">Historical Trends & Progress</h3>
                    <Button startIcon={<FaHistory />} size="small" color="secondary">View Detailed History</Button>
                  </div>
                  <Typography variant="body2" className="mb-2 text-gray-600">See your progress over time with interactive charts and visuals.</Typography>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={wholeLifeData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#43a047" name="Life Score" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </section>

                {/* Infographic Wheel or other visual summary */}
                <InfographicWheel />
              </div>
              {/* Right Sidebar Widgets */}
             
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
