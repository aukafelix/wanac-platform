"use client";

import { useState } from 'react';
import { FaChartLine, FaChevronRight, FaChevronDown, FaInfoCircle, FaDownload, FaShare, FaHistory } from 'react-icons/fa';

export default function LifeScorePage() {
  const [activeCategory, setActiveCategory] = useState('overall');
  
  // Sample data - replace with actual data fetching in production
  const lifeScoreData = {
    overall: 72,
    categories: {
      career: {
        score: 68,
        description: "Your career satisfaction and professional growth",
        insights: [
          "You've made progress in your career transition",
          "Your skills are well-aligned with your current role",
          "Consider exploring additional professional development opportunities"
        ],
        recommendations: [
          "Schedule a session with a career coach",
          "Update your LinkedIn profile",
          "Explore networking events in your industry"
        ],
        history: [
          { date: "Oct 2023", score: 62 },
          { date: "Sep 2023", score: 58 },
          { date: "Aug 2023", score: 55 }
        ]
      },
      finances: {
        score: 65,
        description: "Your financial health and stability",
        insights: [
          "Your emergency fund is below recommended levels",
          "You're making good progress on debt reduction",
          "Consider reviewing your retirement planning strategy"
        ],
        recommendations: [
          "Schedule a financial planning session",
          "Review your budget and spending patterns",
          "Explore VA loan benefits for homeownership"
        ],
        history: [
          { date: "Oct 2023", score: 63 },
          { date: "Sep 2023", score: 60 },
          { date: "Aug 2023", score: 58 }
        ]
      },
      relationships: {
        score: 78,
        description: "Your connections with family, friends, and community",
        insights: [
          "You've been actively rebuilding civilian relationships",
          "Your family support system is strong",
          "Consider expanding your social network"
        ],
        recommendations: [
          "Join a community group or volunteer organization",
          "Schedule regular family activities",
          "Reconnect with pre-service friends"
        ],
        history: [
          { date: "Oct 2023", score: 75 },
          { date: "Sep 2023", score: 72 },
          { date: "Aug 2023", score: 70 }
        ]
      },
      health: {
        score: 82,
        description: "Your physical and mental wellbeing",
        insights: [
          "Your physical fitness routine is consistent",
          "You're managing stress effectively",
          "Consider adding more variety to your exercise routine"
        ],
        recommendations: [
          "Schedule a comprehensive health check-up",
          "Try a new physical activity or sport",
          "Explore mindfulness practices for stress management"
        ],
        history: [
          { date: "Oct 2023", score: 80 },
          { date: "Sep 2023", score: 78 },
          { date: "Aug 2023", score: 75 }
        ]
      },
      purpose: {
        score: 70,
        description: "Your sense of meaning and direction in life",
        insights: [
          "You're finding new purpose in civilian life",
          "Your volunteer work is providing fulfillment",
          "Consider exploring additional ways to serve your community"
        ],
        recommendations: [
          "Reflect on your personal mission statement",
          "Explore mentoring opportunities",
          "Consider how your military experience can benefit others"
        ],
        history: [
          { date: "Oct 2023", score: 68 },
          { date: "Sep 2023", score: 65 },
          { date: "Aug 2023", score: 62 }
        ]
      }
    }
  };

  // Get score color based on value
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Get score background color based on value
  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 70) return 'bg-blue-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  // Calculate progress since last assessment
  const calculateProgress = (category) => {
    if (category === 'overall') return 4; // Sample overall progress
    
    const history = lifeScoreData.categories[category].history;
    if (history.length < 2) return 0;
    
    return lifeScoreData.categories[category].score - history[0].score;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#002147]">Life Score</h1>
          <p className="text-gray-600 mt-1">Track your progress across key life areas</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <FaHistory /> History
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <FaDownload /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <FaShare /> Share
          </button>
        </div>
      </div>

      {/* Overall Score Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative mb-6 md:mb-0 md:mr-8">
            <div className={`w-40 h-40 rounded-full flex items-center justify-center ${getScoreBgColor(lifeScoreData.overall)} border-8 ${getScoreColor(lifeScoreData.overall).replace('text', 'border')}`}>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(lifeScoreData.overall)}`}>
                  {lifeScoreData.overall}
                </div>
                <div className="text-gray-500 text-sm">Overall Score</div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
              +{calculateProgress('overall')}
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[#002147] mb-3">Your Life Score Summary</h2>
            <p className="text-gray-600 mb-4">
              Your overall Life Score is {lifeScoreData.overall}, which indicates you're doing well in most areas of your life. 
              You've made significant progress since your last assessment, with a {calculateProgress('overall')} point improvement.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(lifeScoreData.categories).map(([key, category]) => (
                <button
                  key={key}
                  className={`p-3 rounded-lg text-center transition-all ${
                    activeCategory === key 
                      ? 'bg-[#002147] text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveCategory(key)}
                >
                  <div className="font-semibold capitalize">{key}</div>
                  <div className={`text-xl font-bold ${activeCategory === key ? 'text-white' : getScoreColor(category.score)}`}>
                    {category.score}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Detail */}
      {activeCategory !== 'overall' && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-[#002147] capitalize">{activeCategory} Score</h2>
              <p className="text-gray-600">{lifeScoreData.categories[activeCategory].description}</p>
            </div>
            
            <div className="mt-2 md:mt-0 flex items-center">
              <div className={`text-2xl font-bold ${getScoreColor(lifeScoreData.categories[activeCategory].score)}`}>
                {lifeScoreData.categories[activeCategory].score}
              </div>
              <div className="ml-2 bg-blue-500 text-white px-2 py-0.5 rounded text-sm">
                +{calculateProgress(activeCategory)}
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold text-[#002147] mb-3 flex items-center">
                <FaInfoCircle className="mr-2" /> Insights
              </h3>
              <ul className="space-y-2">
                {lifeScoreData.categories[activeCategory].insights.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <FaChevronRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#002147] mb-3 flex items-center">
                <FaChartLine className="mr-2" /> Recommendations
              </h3>
              <ul className="space-y-2">
                {lifeScoreData.categories[activeCategory].recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <FaChevronRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Progress Chart */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-[#002147] mb-3">Progress Over Time</h3>
            <div className="h-64 bg-gray-50 rounded-lg p-4 flex items-end justify-between">
              {[...lifeScoreData.categories[activeCategory].history, { date: "Nov 2023", score: lifeScoreData.categories[activeCategory].score }].reverse().map((point, index, array) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className={`w-8 ${getScoreBgColor(point.score)} rounded-t`} 
                    style={{ height: `${point.score * 0.6}%` }}
                  ></div>
                  <div className="mt-2 text-xs text-gray-500">{point.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Assessment History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-[#002147] mb-4">Recent Assessments</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Overall</th>
                {Object.keys(lifeScoreData.categories).map(category => (
                  <th key={category} className="py-3 px-4 text-left text-sm font-semibold text-gray-700 capitalize">
                    {category}
                  </th>
                ))}
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 text-sm text-gray-700">November 10, 2023</td>
                <td className="py-3 px-4">
                  <span className={`font-semibold ${getScoreColor(lifeScoreData.overall)}`}>
                    {lifeScoreData.overall}
                  </span>
                </td>
                {Object.entries(lifeScoreData.categories).map(([key, category]) => (
                  <td key={key} className="py-3 px-4">
                    <span className={`font-semibold ${getScoreColor(category.score)}`}>
                      {category.score}
                    </span>
                  </td>
                ))}
                <td className="py-3 px-4">
                  <button className="text-blue-500 hover:text-blue-700">View</button>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 text-sm text-gray-700">October 12, 2023</td>
                <td className="py-3 px-4">
                  <span className={`font-semibold ${getScoreColor(lifeScoreData.overall - 4)}`}>
                    {lifeScoreData.overall - 4}
                  </span>
                </td>
                {Object.entries(lifeScoreData.categories).map(([key, category]) => (
                  <td key={key} className="py-3 px-4">
                    <span className={`font-semibold ${getScoreColor(category.history[0].score)}`}>
                      {category.history[0].score}
                    </span>
                  </td>
                ))}
                <td className="py-3 px-4">
                  <button className="text-blue-500 hover:text-blue-700">View</button>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 text-sm text-gray-700">September 15, 2023</td>
                <td className="py-3 px-4">
                  <span className={`font-semibold ${getScoreColor(lifeScoreData.overall - 8)}`}>
                    {lifeScoreData.overall - 8}
                  </span>
                </td>
                {Object.entries(lifeScoreData.categories).map(([key, category]) => (
                  <td key={key} className="py-3 px-4">
                    <span className={`font-semibold ${getScoreColor(category.history[1].score)}`}>
                      {category.history[1].score}
                    </span>
                  </td>
                ))}
                <td className="py-3 px-4">
                  <button className="text-blue-500 hover:text-blue-700">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1 mx-auto">
            View All History <FaChevronDown className="ml-1" />
          </button>
        </div>
      </div>
      
      {/* Take New Assessment CTA */}
      <div className="mt-8 bg-[#002147] text-white rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Ready for a New Assessment?</h2>
        <p className="mb-4">Take a new Life Score assessment to track your progress and get updated recommendations.</p>
        <button className="bg-white text-[#002147] px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
          Start New Assessment
        </button>
      </div>
    </div>
  );
}
