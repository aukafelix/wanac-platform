import React, { useState } from 'react';

export default function RoleTabView({ children, userRole = 'client' }) {
  const [activeTab, setActiveTab] = useState(userRole);

  // Define available tabs based on user role
  const getAvailableTabs = () => {
    const tabs = [];
    
    if (userRole === 'client' || userRole === 'participant') {
      tabs.push({ id: 'client', label: 'Your View', description: 'Your personal evaluation' });
    }
    
    if (userRole === 'coach' || userRole === 'admin') {
      tabs.push({ id: 'coach', label: 'Coach View', description: 'Facilitator insights' });
    }
    
    if (userRole === 'admin') {
      tabs.push({ id: 'admin', label: 'Admin View', description: 'System analytics' });
    }
    
    return tabs;
  };

  const availableTabs = getAvailableTabs();
  
  // If only one tab available, don't show tabs
  if (availableTabs.length <= 1) {
    return <div>{children}</div>;
  }

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-start">
                <span>{tab.label}</span>
                <span className="text-xs text-gray-400">{tab.description}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {React.cloneElement(children, { userRole: activeTab })}
      </div>
    </div>
  );
}
