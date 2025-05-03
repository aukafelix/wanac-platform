"use client";

// Settings Page with Role-Based Options for WANAC Coaching Platform
import { useState, useEffect } from 'react';
import {
  FaUserCircle,
  FaLock,
  FaBell,
  FaPalette,
  FaShieldAlt,
  FaCreditCard,
  FaUsersCog,
  FaFileContract,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
  FaUserShield
} from 'react-icons/fa';

export default function SettingsPage() {
  // State to store the user role
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching user role from API/Auth service
  useEffect(() => {
    // This would be replaced with actual authentication logic
    const fetchUserRole = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo purposes, you can change this to 'admin', 'coach', or 'client'
        // In production, this would come from your auth system
        const role = 'client'; // Change this to test different roles
        setUserRole(role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  // Common settings available to all user types
  const commonSettings = [
    {
      id: 'profile',
      title: 'Profile Information',
      icon: <FaUserCircle />,
      description: 'Update your personal information and profile details'
    },
    {
      id: 'password',
      title: 'Password & Security',
      icon: <FaLock />,
      description: 'Change your password and security settings'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <FaBell />,
      description: 'Manage email and in-app notification preferences'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: <FaPalette />,
      description: 'Customize the look and feel of your dashboard'
    },
    {
      id: 'privacy',
      title: 'Privacy',
      icon: <FaShieldAlt />,
      description: 'Control your data and privacy settings'
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <FaQuestionCircle />,
      description: 'Get assistance or report issues'
    }
  ];

  // Admin-specific settings
  const adminSettings = [
    {
      id: 'user-management',
      title: 'User Management',
      icon: <FaUsersCog />,
      description: 'Manage all users, roles, and permissions'
    },
    {
      id: 'platform-settings',
      title: 'Platform Settings',
      icon: <FaCog />,
      description: 'Configure global platform settings and features'
    },
    {
      id: 'security-audit',
      title: 'Security & Audit',
      icon: <FaUserShield />,
      description: 'Review security logs and platform activity'
    }
  ];

  // Coach-specific settings
  const coachSettings = [
    {
      id: 'coaching-profile',
      title: 'Coaching Profile',
      icon: <FaUserCircle />,
      description: 'Update your public coaching profile and expertise'
    },
    {
      id: 'availability',
      title: 'Availability & Calendar',
      icon: <FaCog />,
      description: 'Set your coaching hours and availability'
    },
    {
      id: 'payment-info',
      title: 'Payment Information',
      icon: <FaCreditCard />,
      description: 'Manage your payment details and history'
    }
  ];

  // Client-specific settings
  const clientSettings = [
    {
      id: 'subscription',
      title: 'Subscription & Billing',
      icon: <FaCreditCard />,
      description: 'Manage your subscription plan and payment methods'
    },
    {
      id: 'agreements',
      title: 'Agreements & Consents',
      icon: <FaFileContract />,
      description: 'Review and manage coaching agreements'
    }
  ];

  // Get role-specific settings based on user role
  const getRoleSpecificSettings = () => {
    switch (userRole) {
      case 'admin':
        return adminSettings;
      case 'coach':
        return coachSettings;
      case 'client':
        return clientSettings;
      default:
        return [];
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-brand-blue flex items-center justify-center">
        <div className="text-white text-xl">Loading settings...</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-brand-blue">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Settings</h1>
          <p className="text-brand-blue mb-6">
            Manage your account settings and preferences
          </p>

          {/* Role indicator */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-brand-navy font-medium">
              You are logged in as: <span className="font-bold capitalize">{userRole}</span>
            </p>
          </div>

          {/* Settings Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Common Settings */}
            {commonSettings.map((setting) => (
              <div key={setting.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
                  {setting.icon} {setting.title}
                </h2>
                <p className="text-brand-blue text-sm mb-4">{setting.description}</p>
                <button className="mt-2 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
                  Manage
                </button>
              </div>
            ))}

            {/* Role-specific Settings */}
            {getRoleSpecificSettings().map((setting) => (
              <div key={setting.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-brand-navy mb-2 flex items-center gap-2">
                  {setting.icon} {setting.title}
                </h2>
                <p className="text-brand-blue text-sm mb-4">{setting.description}</p>
                <button className="mt-2 bg-[#002147] text-white px-4 py-2 rounded hover:bg-orange-500 transition">
                  Manage
                </button>
              </div>
            ))}
          </div>

          {/* Logout Option */}
          <div className="mt-10 border-t pt-6">
            <button className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
