"use client";

import React, { useState, useCallback } from 'react';
import Sidebar from '../../../../components/dashboardcomponents/sidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import SectionSidebar from '../../../../components/dashboardcomponents/SectionSidebar';
import CareerCompassModal from '../../../../components/dashboardcomponents/CareerCompassModal';
import { BookOpen, Briefcase, Users, ClipboardList, CheckCircle, Home, FolderOpen, BarChart2, Image, Video, FileText, Search, ShoppingCart, Calendar, Clock, Play, Download, Upload, Star, Award, Target, TrendingUp } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';

// Comprehensive program data with sessions and modules
const program = {
  id: 1,
  title: 'PLEP',
  duration: '1 Years',
  currentSemester: 'Semester 1',
  totalCredits: 120,
  completedCredits: 45,
  gpa: 3.7,
  modules: [
  {
    id: 1,
      title: 'PLEP',
      code: 'CS101',
      credits: 3,
      status: 'completed',
      progress: 100,
      sessions: [
        { id: 1, title: 'Introduction to Programming', date: '2024-01-15', duration: '2 hours', type: 'lecture', status: 'completed' },
        { id: 2, title: 'Variables and Data Types', date: '2024-01-22', duration: '2 hours', type: 'lecture', status: 'completed' },
        { id: 3, title: 'Control Structures', date: '2024-01-29', duration: '2 hours', type: 'lecture', status: 'completed' },
        { id: 4, title: 'Functions and Methods', date: '2024-02-05', duration: '2 hours', type: 'lecture', status: 'completed' },
        { id: 5, title: 'Lab Session - Basic Programs', date: '2024-02-12', duration: '3 hours', type: 'lab', status: 'completed' }
      ],
      assignments: [
        { id: 1, title: 'Hello World Program', dueDate: '2024-01-20', points: 10, status: 'submitted', grade: 95 },
        { id: 2, title: 'Calculator Application', dueDate: '2024-02-10', points: 25, status: 'submitted', grade: 88 },
        { id: 3, title: 'Student Grade Tracker', dueDate: '2024-02-25', points: 30, status: 'submitted', grade: 92 }
      ]
  },
  {
    id: 2,
      title: 'Data Structures and Algorithms',
      code: 'CS201',
      credits: 4,
      status: 'in-progress',
      progress: 65,
      sessions: [
        { id: 6, title: 'Introduction to Data Structures', date: '2024-02-15', duration: '2 hours', type: 'lecture', status: 'completed' },
        { id: 7, title: 'Arrays and Linked Lists', date: '2024-02-22', duration: '2 hours', type: 'lecture', status: 'completed' },
        { id: 8, title: 'Stacks and Queues', date: '2024-02-29', duration: '2 hours', type: 'lecture', status: 'completed' },
        { id: 9, title: 'Trees and Graphs', date: '2024-03-07', duration: '2 hours', type: 'lecture', status: 'upcoming' },
        { id: 10, title: 'Lab Session - Implementation', date: '2024-03-14', duration: '3 hours', type: 'lab', status: 'upcoming' }
      ],
      assignments: [
        { id: 4, title: 'Array Implementation', dueDate: '2024-02-28', points: 20, status: 'submitted', grade: 90 },
        { id: 5, title: 'Linked List Operations', dueDate: '2024-03-12', points: 25, status: 'in-progress', grade: null },
        { id: 6, title: 'Tree Traversal Algorithms', dueDate: '2024-03-25', points: 30, status: 'pending', grade: null }
      ]
  },
  {
    id: 3,
      title: 'Database Systems',
      code: 'CS301',
      credits: 3,
      status: 'upcoming',
      progress: 0,
      sessions: [
        { id: 11, title: 'Introduction to Databases', date: '2024-03-20', duration: '2 hours', type: 'lecture', status: 'upcoming' },
        { id: 12, title: 'SQL Fundamentals', date: '2024-03-27', duration: '2 hours', type: 'lecture', status: 'upcoming' },
        { id: 13, title: 'Database Design', date: '2024-04-03', duration: '2 hours', type: 'lecture', status: 'upcoming' },
        { id: 14, title: 'Lab Session - SQL Practice', date: '2024-04-10', duration: '3 hours', type: 'lab', status: 'upcoming' }
      ],
      assignments: [
        { id: 7, title: 'Database Schema Design', dueDate: '2024-04-15', points: 25, status: 'pending', grade: null },
        { id: 8, title: 'SQL Query Implementation', dueDate: '2024-04-30', points: 30, status: 'pending', grade: null }
      ]
    }
  ],
  upcomingSessions: [
    { id: 9, title: 'Trees and Graphs', module: 'Data Structures and Algorithms', date: '2024-03-07', time: '10:00 AM', type: 'lecture' },
    { id: 10, title: 'Lab Session - Implementation', module: 'Data Structures and Algorithms', date: '2024-03-14', time: '2:00 PM', type: 'lab' },
    { id: 11, title: 'Introduction to Databases', module: 'Database Systems', date: '2024-03-20', time: '10:00 AM', type: 'lecture' }
  ],
  recentActivity: [
    { id: 1, title: 'Submitted: Calculator Application', module: 'Programming Fundamentals', time: '2 hours ago', type: 'assignment' },
    { id: 2, title: 'Attended: Control Structures Lecture', module: 'Programming Fundamentals', time: '1 day ago', type: 'session' },
    { id: 3, title: 'Graded: Hello World Program', module: 'Programming Fundamentals', time: '2 days ago', type: 'grade' }
  ]
};

// Progress Bar Component
const ProgressBar = ({ percent, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  };
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`${colorClasses[color]} h-2 rounded-full transition-all duration-300`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

// Program Overview Component
const ProgramOverview = ({ program }) => {
  const overallProgress = Math.round((program.completedCredits / program.totalCredits) * 100);
  
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-md mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#002147]" style={{ fontFamily: 'var(--font-heading)' }}>
          {program.title}
        </h2>
        <div className="text-right">
          <div className="text-sm text-gray-600">{program.currentSemester}</div>
          <div className="text-xs text-gray-500">{program.duration}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center p-3 bg-[#002147]/5 rounded-lg">
          <div className="text-2xl font-bold text-[#002147]">{program.completedCredits}</div>
          <div className="text-xs text-gray-600">Credits Completed</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{program.gpa}</div>
          <div className="text-xs text-gray-600">Current GPA</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{program.modules.length}</div>
          <div className="text-xs text-gray-600">Active Modules</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{program.upcomingSessions.length}</div>
          <div className="text-xs text-gray-600">Upcoming Sessions</div>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Overall Progress</span>
          <span>{overallProgress}%</span>
        </div>
        <ProgressBar percent={overallProgress} color="blue" />
      </div>
    </div>
  );
};

// Module Card Component
const ModuleCard = ({ module, expanded, onToggle, onAddAssignment }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'upcoming': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-800">{module.title}</h3>
            <span className="text-sm text-gray-500">({module.code})</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{module.credits} Credits</span>
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(module.status)}`}>
              {module.status.replace('-', ' ')}
            </span>
          </div>
        </div>
        <button
          onClick={() => onToggle(module.id)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <span className={`text-[#002147] text-xl transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}>▶</span>
        </button>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Module Progress</span>
          <span>{module.progress}%</span>
        </div>
        <ProgressBar percent={module.progress} color={module.status === 'completed' ? 'green' : 'blue'} />
      </div>
      
      {expanded && (
        <div className="space-y-4">
          {/* Sessions */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Sessions ({module.sessions.length})
            </h4>
            <div className="space-y-2">
              {module.sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      session.status === 'completed' ? 'bg-green-500' : 
                      session.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{session.title}</div>
                      <div className="text-xs text-gray-500">{session.date} • {session.duration}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    session.type === 'lecture' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {session.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Assignments */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <ClipboardList className="w-4 h-4" />
              Assignments ({module.assignments.length})
            </h4>
            <div className="space-y-2">
              {module.assignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      assignment.status === 'submitted' ? 'bg-green-500' : 
                      assignment.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{assignment.title}</div>
                      <div className="text-xs text-gray-500">Due: {assignment.dueDate} • {assignment.points} points</div>
                    </div>
                  </div>
                  <div className="text-right">
                    {assignment.grade ? (
                      <span className="text-sm font-semibold text-green-600">{assignment.grade}%</span>
                    ) : (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        assignment.status === 'submitted' ? 'bg-green-100 text-green-700' :
                        assignment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {assignment.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {onAddAssignment && (
              <button
                type="button"
                onClick={() => onAddAssignment(module.id)}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#002147] hover:underline"
              >
                <FaPlus className="text-xs" /> Add assignment
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Section Content Component for non-overview tabs
const SectionContent = ({
  selectedSection,
  programState,
  expandedModuleId,
  onToggleModule,
  onOpenAddModule,
  onOpenAddAssignment,
  onOpenAddSession,
  searchTerm,
  onSearchChange,
}) => {
  const section = EDUCATION_SECTIONS.find((s) => s.sectionId === selectedSection);
  const title = section?.name ?? selectedSection;

  // Derived data used in multiple sections
  const allAssignments = programState.modules.flatMap((module) =>
    module.assignments.map((assignment) => ({
      ...assignment,
      moduleTitle: module.title,
    })),
  );

  const gradedAssignments = allAssignments.filter((a) => a.grade != null);
  const moduleGrades = programState.modules.map((module) => {
    const moduleGradedAssignments = module.assignments.filter((a) => a.grade != null);
    const averageGrade =
      moduleGradedAssignments.length > 0
        ? Math.round(
            moduleGradedAssignments.reduce((sum, a) => sum + a.grade, 0) /
              moduleGradedAssignments.length,
          )
        : null;
    return {
      moduleTitle: module.title,
      averageGrade,
      status: module.status,
    };
  });

  const filteredModules = searchTerm
    ? programState.modules.filter((m) =>
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.code.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : programState.modules;

  const filteredAssignments = searchTerm
    ? allAssignments.filter(
        (a) =>
          a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.moduleTitle.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : allAssignments;

  const filteredSessions = searchTerm
    ? programState.upcomingSessions.filter(
        (s) =>
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.module.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : programState.upcomingSessions;

  if (selectedSection === 'syllabus') {
    return (
      <div className="space-y-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className="text-xl font-bold text-[#002147] flex items-center gap-2 mb-1"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <BookOpen className="w-5 h-5 text-[#002147]" />
                Course Syllabus
              </h2>
              <p className="text-sm text-gray-600">
                High-level view of modules, sessions, and learning milestones for this program.
              </p>
            </div>
            <div className="hidden md:block text-right text-xs text-gray-500">
              {programState.modules.length} modules •{' '}
              {programState.upcomingSessions.length} upcoming sessions
            </div>
          </div>
          <div className="space-y-4">
            {programState.modules.map((module) => (
              <div
                key={module.id}
                className="border border-gray-100 rounded-xl p-4 bg-gray-50/60"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-md font-semibold text-gray-900">
                        {module.title}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#002147]/5 text-[#002147]">
                        {module.code}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {module.sessions.length} sessions • {module.assignments.length} assignments
                    </p>
                  </div>
                  <div className="text-xs text-gray-600 flex flex-col items-end">
                    <span className="mb-1">Progress</span>
                    <div className="w-32">
                      <ProgressBar
                        percent={module.progress}
                        color={module.status === 'completed' ? 'green' : 'blue'}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Sessions roadmap
                    </h4>
                    <div className="space-y-2">
                      {module.sessions.map((session) => (
                        <div
                          key={session.id}
                          className="flex items-start gap-3 text-xs bg-white rounded-lg px-3 py-2"
                        >
                          <div
                            className={`mt-1 w-1 h-8 rounded-full ${
                              session.status === 'completed'
                                ? 'bg-green-500'
                                : session.status === 'upcoming'
                                ? 'bg-blue-500'
                                : 'bg-gray-300'
                            }`}
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">
                              {session.title}
                            </div>
                            <div className="text-gray-500">
                              {session.date} • {session.duration} •{' '}
                              <span className="capitalize">{session.type}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Assessment overview
                    </h4>
                    <div className="space-y-2">
                      {module.assignments.map((assignment) => (
                        <div
                          key={assignment.id}
                          className="flex items-center justify-between text-xs bg-white rounded-lg px-3 py-2"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">
                              {assignment.title}
                            </div>
                            <div className="text-gray-500">
                              Due {assignment.dueDate} • {assignment.points} pts
                            </div>
                          </div>
                          <div className="text-right">
                            {assignment.grade != null ? (
                              <span className="text-xs font-semibold text-green-600">
                                {assignment.grade}%
                              </span>
                            ) : (
                              <span className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
                                {assignment.status}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                      {module.assignments.length === 0 && (
                        <p className="text-xs text-gray-500 italic">
                          No assessments defined yet for this module.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedSection === 'modules') {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2
              className="text-xl font-bold text-[#002147] flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <FolderOpen className="w-5 h-5 text-[#002147]" />
              All Modules
            </h2>
            <p className="text-sm text-gray-600">
              Browse, filter, and manage every module in your program.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">
                Completed: {programState.modules.filter((m) => m.status === 'completed').length}
              </span>
              <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                In progress: {programState.modules.filter((m) => m.status === 'in-progress').length}
              </span>
              <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                Upcoming: {programState.modules.filter((m) => m.status === 'upcoming').length}
              </span>
            </div>
            {onOpenAddModule && (
              <button
                type="button"
                onClick={onOpenAddModule}
                className="inline-flex items-center gap-1 text-sm font-medium text-[#002147] hover:underline"
              >
                <FaPlus className="text-xs" /> Add module
              </button>
            )}
          </div>
        </div>
        <div className="space-y-3">
          {programState.modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              expanded={expandedModuleId === module.id}
              onToggle={onToggleModule}
              onAddAssignment={onOpenAddAssignment}
            />
          ))}
        </div>
      </div>
    );
  }

  if (selectedSection === 'assignments') {
    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2
              className="text-xl font-bold text-[#002147] flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <ClipboardList className="w-5 h-5 text-[#002147]" />
              Assignments
            </h2>
            <p className="text-sm text-gray-600">
              See all assignments across your modules with due dates and statuses.
            </p>
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <div>
              Total assignments:{' '}
              <span className="font-semibold text-[#002147]">{allAssignments.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                Pending:{' '}
                {allAssignments.filter((a) => a.status === 'pending').length}
              </span>
              <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                In progress:{' '}
                {allAssignments.filter((a) => a.status === 'in-progress').length}
              </span>
              <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">
                Submitted:{' '}
                {allAssignments.filter((a) => a.status === 'submitted').length}
              </span>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto bg-white border border-gray-100 rounded-2xl shadow-sm">
          <table className="min-w-full text-xs md:text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="text-left px-4 py-3 font-medium">Assignment</th>
                <th className="text-left px-4 py-3 font-medium">Module</th>
                <th className="text-left px-4 py-3 font-medium">Due</th>
                <th className="text-left px-4 py-3 font-medium">Points</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Grade</th>
              </tr>
            </thead>
            <tbody>
              {allAssignments.map((assignment) => (
                <tr key={`${assignment.moduleTitle}-${assignment.id}`} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{assignment.title}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{assignment.moduleTitle}</td>
                  <td className="px-4 py-3 text-gray-600">{assignment.dueDate}</td>
                  <td className="px-4 py-3 text-gray-600">{assignment.points}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] capitalize ${
                        assignment.status === 'submitted'
                          ? 'bg-green-100 text-green-700'
                          : assignment.status === 'in-progress'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {assignment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {assignment.grade != null ? (
                      <span className="text-sm font-semibold text-green-600">
                        {assignment.grade}%
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {allAssignments.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-sm text-gray-500"
                  >
                    No assignments have been added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (selectedSection === 'quizzes') {
    const MOCK_QUIZZES = [
      {
        id: 1,
        title: 'Intro to Programming Quiz',
        module: 'PLEP',
        questions: 10,
        status: 'completed',
        score: 92,
        date: '2024-02-10',
      },
      {
        id: 2,
        title: 'Data Structures Basics',
        module: 'Data Structures and Algorithms',
        questions: 15,
        status: 'available',
        score: null,
        date: '2024-03-08',
      },
    ];

    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2
              className="text-xl font-bold text-[#002147] flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <CheckCircle className="w-5 h-5 text-[#002147]" />
              Quizzes & Checks for Understanding
            </h2>
            <p className="text-sm text-gray-600">
              Short assessments to help you check your understanding of key concepts.
            </p>
          </div>
          <div className="text-xs text-gray-600">
            <div>Quizzes completed: 1</div>
            <div>Upcoming quizzes: 1</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_QUIZZES.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col justify-between"
            >
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-md font-semibold text-gray-900">{quiz.title}</h3>
                  <span className="text-xs text-gray-500">{quiz.date}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{quiz.module}</p>
                <p className="text-xs text-gray-600">
                  {quiz.questions} multiple-choice questions • approx. 15 minutes
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  {quiz.status === 'completed' ? (
                    <div className="text-xs">
                      <span className="text-gray-600">Score: </span>
                      <span className="font-semibold text-green-600">
                        {quiz.score}%
                      </span>
                    </div>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs">
                      Available
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#002147] text-white text-xs font-medium hover:bg-[#001632] transition-colors"
                >
                  <Play className="w-3 h-3" />
                  {quiz.status === 'completed' ? 'Review' : 'Start quiz'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selectedSection === 'grades') {
    const overallAverage =
      gradedAssignments.length > 0
        ? Math.round(
            gradedAssignments.reduce((sum, a) => sum + a.grade, 0) /
              gradedAssignments.length,
          )
        : null;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#002147]" />
              Current GPA
            </h3>
            <div className="text-3xl font-bold text-[#002147]">
              {programState.gpa.toFixed(2)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Based on completed, graded coursework in this program.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
              <Star className="w-4 h-4 text-[#002147]" />
              Overall assignment average
            </h3>
            <div className="text-3xl font-bold text-green-600">
              {overallAverage != null ? `${overallAverage}%` : '—'}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Average score across all graded assignments.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#002147]" />
              Progress
            </h3>
            <div className="mb-2">
              <ProgressBar
                percent={Math.round(
                  (programState.completedCredits / programState.totalCredits) * 100,
                )}
                color="blue"
              />
            </div>
            <p className="text-xs text-gray-500">
              {programState.completedCredits} of {programState.totalCredits} credits
              completed.
            </p>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            Module gradebook
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs md:text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600">
                  <th className="text-left px-4 py-3 font-medium">Module</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Average grade</th>
                  <th className="text-left px-4 py-3 font-medium">Assignments graded</th>
                </tr>
              </thead>
              <tbody>
                {moduleGrades.map((mg) => {
                  const count = programState.modules
                    .find((m) => m.title === mg.moduleTitle)
                    ?.assignments.filter((a) => a.grade != null).length;
                  return (
                    <tr key={mg.moduleTitle} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-gray-900 font-medium">
                        {mg.moduleTitle}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] capitalize ${
                            mg.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : mg.status === 'in-progress'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {mg.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {mg.averageGrade != null ? (
                          <span className="font-semibold text-green-600">
                            {mg.averageGrade}%
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">No grades yet</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {count ?? 0}{' '}
                        <span className="text-xs text-gray-400">graded</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (selectedSection === 'media-gallery') {
    const MEDIA_SECTIONS = [
      {
        title: 'Lecture recordings',
        icon: Video,
        count: 8,
        description: 'Recorded sessions you can replay on demand.',
        accent: 'bg-blue-50 text-blue-700',
      },
      {
        title: 'Slide decks & PDFs',
        icon: FileText,
        count: 12,
        description: 'Downloadable lecture slides and reference PDFs.',
        accent: 'bg-emerald-50 text-emerald-700',
      },
      {
        title: 'Images & diagrams',
        icon: Image,
        count: 18,
        description: 'Course visuals, infographics, and diagrams.',
        accent: 'bg-orange-50 text-orange-700',
      },
    ];

    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2
              className="text-xl font-bold text-[#002147] flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <Image className="w-5 h-5 text-[#002147]" />
              Media Gallery
            </h2>
            <p className="text-sm text-gray-600">
              Access recordings, slide decks, and visual materials from your courses.
            </p>
          </div>
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search media..."
              value={searchTerm}
              onChange={onSearchChange}
              className="w-full border border-gray-300 rounded-full px-3 py-2 text-xs focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MEDIA_SECTIONS.map((sectionItem) => {
            const Icon = sectionItem.icon;
            return (
              <div
                key={sectionItem.title}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${sectionItem.accent}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {sectionItem.title}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-500">
                    {sectionItem.count} items
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  {sectionItem.description}
                </p>
                <button
                  type="button"
                  className="mt-auto inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full bg-[#002147] text-white text-xs font-medium hover:bg-[#001632] transition-colors"
                >
                  <Download className="w-3 h-3" />
                  View collection
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (selectedSection === 'zoom') {
    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2
              className="text-xl font-bold text-[#002147] flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <Video className="w-5 h-5 text-[#002147]" />
              Live sessions (Zoom)
            </h2>
            <p className="text-sm text-gray-600">
              Upcoming virtual sessions and office hours for your courses.
            </p>
          </div>
          {onOpenAddSession && (
            <button
              type="button"
              onClick={onOpenAddSession}
              className="inline-flex items-center gap-1 text-sm font-medium text-[#002147] hover:underline"
            >
              <FaPlus className="text-xs" /> Add session
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programState.upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col justify-between"
            >
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-md font-semibold text-gray-900">
                    {session.title}
                  </h3>
                  <span className="text-xs text-gray-500">{session.date}</span>
                </div>
                <p className="text-xs text-gray-500 mb-1">{session.module}</p>
                <p className="text-xs text-gray-600">
                  {session.time} •{' '}
                  <span className="capitalize">{session.type}</span> session
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs">
                  Zoom link will appear here
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#002147] text-white text-xs font-medium hover:bg-[#001632] transition-colors"
                >
                  <Play className="w-3 h-3" />
                  Join session
                </button>
              </div>
            </div>
          ))}
          {programState.upcomingSessions.length === 0 && (
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm text-sm text-gray-600">
              You don&apos;t have any upcoming sessions scheduled yet. Use the &quot;Add
              session&quot; button to plan your next live class.
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedSection === 'reader-solutions') {
    return (
      <div className="space-y-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md">
          <h2
            className="text-xl font-bold text-[#002147] flex items-center gap-2 mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <BookOpen className="w-5 h-5 text-[#002147]" />
            Course Reader & Solutions
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Access curated readings, solution guides, and worked examples for your
            course materials.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/60">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Weekly readings
              </h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li>• Week 1: Foundational concepts and terminology</li>
                <li>• Week 2: Problem-solving strategies and patterns</li>
                <li>• Week 3: Case studies and real-world examples</li>
                <li>• Week 4: Advanced applications and extensions</li>
              </ul>
            </div>
            <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/60">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Solution outlines
              </h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li>• Step-by-step worked examples aligned to assignments</li>
                <li>• Common pitfalls and &quot;what to watch out for&quot; notes</li>
                <li>• Alternative solution strategies for deeper understanding</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedSection === 'library-resources') {
    const RESOURCES = [
      {
        title: 'Digital textbooks',
        description: 'Access core course texts via your institution&apos;s digital library.',
      },
      {
        title: 'Research databases',
        description: 'Find peer-reviewed articles and conference papers for projects.',
      },
      {
        title: 'Citation guides',
        description: 'APA, MLA, and Chicago style quick references.',
      },
    ];

    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2
              className="text-xl font-bold text-[#002147] flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <Home className="w-5 h-5 text-[#002147]" />
              Library Resources
            </h2>
            <p className="text-sm text-gray-600">
              Connect to your institution&apos;s academic resources and support services.
            </p>
          </div>
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={onSearchChange}
              className="w-full border border-gray-300 rounded-full px-3 py-2 text-xs focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RESOURCES.map((resource) => (
            <div
              key={resource.title}
              className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {resource.title}
              </h3>
              <p className="text-xs text-gray-600 mb-3">{resource.description}</p>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#002147] hover:underline"
              >
                <Search className="w-3 h-3" />
                Open resource
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selectedSection === 'store-materials') {
    const MATERIALS = [
      {
        title: 'Course reader (print)',
        price: '$39.99',
        description: 'Bound print edition of the core course readings.',
      },
      {
        title: 'Lab workbook',
        price: '$24.99',
        description: 'Hands-on exercises and practice problems for lab sessions.',
      },
      {
        title: 'Supplemental problem set pack',
        price: '$14.99',
        description: 'Extra practice questions grouped by topic and difficulty.',
      },
    ];

    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2
              className="text-xl font-bold text-[#002147] flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <ShoppingCart className="w-5 h-5 text-[#002147]" />
              Store: Course Materials
            </h2>
            <p className="text-sm text-gray-600">
              Optional physical and supplemental materials that support your learning.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MATERIALS.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 mb-3">{item.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-sm font-semibold text-[#002147]">
                  {item.price}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#002147] text-white text-xs font-medium hover:bg-[#001632] transition-colors"
                >
                  <ShoppingCart className="w-3 h-3" />
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selectedSection === 'media-reserves') {
    const RESERVES = [
      {
        title: 'Recorded review session',
        module: 'PLEP',
        availableUntil: '2024-03-31',
      },
      {
        title: 'Guest lecture recording',
        module: 'Data Structures and Algorithms',
        availableUntil: '2024-04-15',
      },
    ];

    return (
      <div className="space-y-4">
        <div>
          <h2
            className="text-xl font-bold text-[#002147] flex items-center gap-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Clock className="w-5 h-5 text-[#002147]" />
            Media Reserves
          </h2>
          <p className="text-sm text-gray-600">
            Time-limited media items provided by your instructors or library.
          </p>
        </div>
        <div className="space-y-3">
          {RESERVES.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500">{item.module}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Available until {item.availableUntil}
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#002147] text-white text-xs font-medium hover:bg-[#001632] transition-colors"
              >
                <Play className="w-3 h-3" />
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selectedSection === 'search') {
    const hasResults =
      filteredModules.length > 0 ||
      filteredAssignments.length > 0 ||
      filteredSessions.length > 0;

    return (
      <div className="space-y-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2
                className="text-xl font-bold text-[#002147] flex items-center gap-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <Search className="w-5 h-5 text-[#002147]" />
                Search your course
              </h2>
              <p className="text-sm text-gray-600">
                Find modules, assignments, and sessions by keyword.
              </p>
            </div>
            <div className="w-full md:w-80">
              <input
                type="text"
                placeholder="Try &quot;arrays&quot; or &quot;lab session&quot;..."
                value={searchTerm}
                onChange={onSearchChange}
                className="w-full border border-gray-300 rounded-full px-3 py-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
              />
            </div>
          </div>
        </div>
        {searchTerm && (
          <p className="text-xs text-gray-500">
            Showing results for <span className="font-semibold">{searchTerm}</span>
          </p>
        )}
        {hasResults ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Modules ({filteredModules.length})
              </h3>
              <div className="space-y-2 text-xs">
                {filteredModules.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{m.title}</div>
                      <div className="text-gray-500 text-[11px]">{m.code}</div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-[11px] capitalize ${
                        m.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : m.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {m.status.replace('-', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Assignments ({filteredAssignments.length})
              </h3>
              <div className="space-y-2 text-xs">
                {filteredAssignments.map((a) => (
                  <div
                    key={`${a.moduleTitle}-${a.id}`}
                    className="bg-gray-50 rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-gray-900">{a.title}</div>
                      <span className="text-[11px] text-gray-500">
                        {a.dueDate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                      <span>{a.moduleTitle}</span>
                      <span>{a.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Sessions ({filteredSessions.length})
              </h3>
              <div className="space-y-2 text-xs">
                {filteredSessions.map((s) => (
                  <div
                    key={s.id}
                    className="bg-gray-50 rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-gray-900">{s.title}</div>
                      <span className="text-[11px] text-gray-500">
                        {s.date} • {s.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                      <span>{s.module}</span>
                      <span className="capitalize">{s.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-sm text-gray-600">
            Start typing above to search across your modules, assignments, and upcoming
            sessions.
          </div>
        )}
      </div>
    );
  }

  // Fallback: generic section card (should not normally be hit)
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md">
      <h2
        className="text-xl font-bold text-[#002147] mb-2"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h2>
      <p className="text-gray-600 text-sm">
        This section is ready to be configured with additional content.
      </p>
    </div>
  );
};

const EDUCATION_SECTIONS = [
  { name: 'Home', sectionId: 'overview' },
  { name: 'Syllabus', sectionId: 'syllabus' },
  { name: 'Modules', sectionId: 'modules' },
  { name: 'Assignments', sectionId: 'assignments' },
  { name: 'Quizzes', sectionId: 'quizzes' },
  { name: 'Grades', sectionId: 'grades' },
  { name: 'Media Gallery', sectionId: 'media-gallery' },
  { name: 'Zoom', sectionId: 'zoom' },
  { name: 'Course Reader Solutions', sectionId: 'reader-solutions' },
  { name: 'Library Resources', sectionId: 'library-resources' },
  { name: 'Store Course Materials', sectionId: 'store-materials' },
  { name: 'Media Reserves', sectionId: 'media-reserves' },
  { name: 'Search', sectionId: 'search' },
];

const MODULE_STATUS_OPTIONS = ['upcoming', 'in-progress', 'completed'];
const ASSIGNMENT_STATUS_OPTIONS = ['pending', 'in-progress', 'submitted'];
const SESSION_TYPE_OPTIONS = ['lecture', 'lab', 'workshop', 'other'];

export default function MyEducationCompassPage() {
  const [programState, setProgramState] = useState(() => JSON.parse(JSON.stringify(program)));
  const [expandedModuleId, setExpandedModuleId] = useState(null);
  const [selectedSection, setSelectedSection] = useState('overview');
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Add Module modal
  const [addModuleOpen, setAddModuleOpen] = useState(false);
  const [moduleForm, setModuleForm] = useState({ title: '', code: '', credits: 3, status: 'in-progress' });
  const [moduleFormError, setModuleFormError] = useState('');

  // Add Assignment modal (per module)
  const [addAssignmentOpen, setAddAssignmentOpen] = useState(false);
  const [assignmentModuleId, setAssignmentModuleId] = useState(null);
  const [assignmentForm, setAssignmentForm] = useState({ title: '', dueDate: '', points: 20, status: 'pending' });
  const [assignmentFormError, setAssignmentFormError] = useState('');

  // Add Session modal (upcoming)
  const [addSessionOpen, setAddSessionOpen] = useState(false);
  const [sessionForm, setSessionForm] = useState({
    title: '',
    moduleId: '',
    date: new Date().toISOString().slice(0, 10),
    time: '10:00',
    type: 'lecture',
  });
  const [sessionFormError, setSessionFormError] = useState('');

  // Fetch user from localStorage for topbar
  React.useEffect(() => {
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const handleModuleToggle = (moduleId) => {
    setExpandedModuleId(expandedModuleId === moduleId ? null : moduleId);
  };

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const nextId = (items) => (items.length ? Math.max(...items.map((x) => x.id)) + 1 : 1);

  const handleOpenAddModule = useCallback(() => {
    setModuleForm({ title: '', code: '', credits: 3, status: 'in-progress' });
    setModuleFormError('');
    setAddModuleOpen(true);
  }, []);

  const handleCloseAddModule = useCallback(() => {
    setAddModuleOpen(false);
    setModuleFormError('');
  }, []);

  const handleModuleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setModuleForm((prev) => ({ ...prev, [name]: name === 'credits' ? parseInt(value, 10) || 0 : value }));
  }, []);

  const handleAddModule = useCallback(() => {
    if (!moduleForm.title?.trim()) {
      setModuleFormError('Title is required.');
      return;
    }
    if (!moduleForm.code?.trim()) {
      setModuleFormError('Code is required.');
      return;
    }
    const newModule = {
      id: nextId(programState.modules),
      title: moduleForm.title.trim(),
      code: moduleForm.code.trim(),
      credits: moduleForm.credits || 3,
      status: moduleForm.status,
      progress: 0,
      sessions: [],
      assignments: [],
    };
    setProgramState((prev) => ({
      ...prev,
      modules: [...prev.modules, newModule],
    }));
    handleCloseAddModule();
  }, [moduleForm, programState.modules, handleCloseAddModule]);

  const handleOpenAddAssignment = useCallback((moduleId) => {
    setAssignmentModuleId(moduleId);
    setAssignmentForm({
      title: '',
      dueDate: new Date().toISOString().slice(0, 10),
      points: 20,
      status: 'pending',
    });
    setAssignmentFormError('');
    setAddAssignmentOpen(true);
  }, []);

  const handleCloseAddAssignment = useCallback(() => {
    setAddAssignmentOpen(false);
    setAssignmentModuleId(null);
    setAssignmentFormError('');
  }, []);

  const handleAssignmentFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setAssignmentForm((prev) => ({
      ...prev,
      [name]: name === 'points' ? parseInt(value, 10) || 0 : value,
    }));
  }, []);

  const handleAddAssignment = useCallback(() => {
    if (!assignmentForm.title?.trim()) {
      setAssignmentFormError('Title is required.');
      return;
    }
    if (assignmentModuleId == null) return;
    const mod = programState.modules.find((m) => m.id === assignmentModuleId);
    const newAssignment = {
      id: nextId(mod?.assignments ?? []),
      title: assignmentForm.title.trim(),
      dueDate: assignmentForm.dueDate,
      points: assignmentForm.points || 20,
      status: assignmentForm.status,
      grade: null,
    };
    setProgramState((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.id === assignmentModuleId
          ? { ...m, assignments: [...m.assignments, newAssignment] }
          : m
      ),
    }));
    handleCloseAddAssignment();
  }, [assignmentForm, assignmentModuleId, programState.modules, handleCloseAddAssignment]);

  const handleOpenAddSession = useCallback(() => {
    setSessionForm({
      title: '',
      moduleId: programState.modules[0]?.id ?? '',
      date: new Date().toISOString().slice(0, 10),
      time: '10:00',
      type: 'lecture',
    });
    setSessionFormError('');
    setAddSessionOpen(true);
  }, [programState.modules]);

  const handleCloseAddSession = useCallback(() => {
    setAddSessionOpen(false);
    setSessionFormError('');
  }, []);

  const handleSessionFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setSessionForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAddSession = useCallback(() => {
    if (!sessionForm.title?.trim()) {
      setSessionFormError('Title is required.');
      return;
    }
    const moduleTitle = programState.modules.find((m) => m.id === Number(sessionForm.moduleId))?.title ?? '—';
    const newSession = {
      id: nextId(programState.upcomingSessions),
      title: sessionForm.title.trim(),
      module: moduleTitle,
      date: sessionForm.date,
      time: sessionForm.time + (sessionForm.time.length <= 2 ? ':00' : ''),
      type: sessionForm.type,
    };
    setProgramState((prev) => ({
      ...prev,
      upcomingSessions: [...prev.upcomingSessions, newSession],
    }));
    handleCloseAddSession();
  }, [sessionForm, programState.modules, programState.upcomingSessions, handleCloseAddSession]);

  return (
    <div className="h-screen flex bg-gray-50 font-serif">
      {/* Main Sidebar */}
      <Sidebar />
      {/* Section Sidebar for Programs */}
      <SectionSidebar
        title="Education Compass"
        items={EDUCATION_SECTIONS}
        collapsedDefault={true}
        onSectionSelect={setSelectedSection}
        activeSectionId={selectedSection}
      />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 h-0 overflow-y-auto px-4 md:px-8 py-4 bg-gray-50">
          <div className="max-w-7xl mx-auto h-full">
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold mb-2 text-[#002147]" style={{ fontFamily: 'var(--font-heading)' }}>
                My Education Compass
              </h1>
              <p className="text-gray-600">Track your academic progress and manage your learning journey</p>
            </div>

            {selectedSection === 'overview' ? (
              <>
            {/* Program Overview */}
            <ProgramOverview program={programState} />
            
            {/* Canvas-like Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
              {/* Main Content - Modules */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-[#002147]" />
                    Course Modules
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{programState.modules.length} modules</span>
                    <button
                      type="button"
                      onClick={handleOpenAddModule}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#002147] hover:underline"
                    >
                      <FaPlus className="text-xs" /> Add module
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {programState.modules.map((module) => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      expanded={expandedModuleId === module.id}
                      onToggle={handleModuleToggle}
                      onAddAssignment={handleOpenAddAssignment}
                    />
                  ))}
                </div>
              </div>
              
              {/* Sidebar - Upcoming Sessions & Activity */}
              <div className="space-y-4">
                {/* Upcoming Sessions */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#002147]" />
                      Upcoming Sessions
                    </h3>
                    <button
                      type="button"
                      onClick={handleOpenAddSession}
                      className="text-xs font-medium text-[#002147] hover:underline"
                    >
                      <FaPlus className="text-xs" /> Add
                    </button>
                  </div>
                  <div className="space-y-3">
                    {programState.upcomingSessions.map((session) => (
                      <div key={session.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-800">{session.title}</div>
                            <div className="text-xs text-gray-500">{session.module}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{session.date}</span>
                          <span>{session.time}</span>
                        </div>
                        <div className="mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            session.type === 'lecture' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {session.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#002147]" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {programState.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'assignment' ? 'bg-green-500' : 
                          activity.type === 'session' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}></div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-800">{activity.title}</div>
                          <div className="text-xs text-gray-500">{activity.module} • {activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#002147]" />
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Completed Modules</span>
                      <span className="text-sm font-semibold text-green-600">
                        {programState.modules.filter(m => m.status === 'completed').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">In Progress</span>
                      <span className="text-sm font-semibold text-blue-600">
                        {programState.modules.filter(m => m.status === 'in-progress').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Upcoming</span>
                      <span className="text-sm font-semibold text-gray-600">
                        {programState.modules.filter(m => m.status === 'upcoming').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Assignments</span>
                      <span className="text-sm font-semibold text-[#002147]">
                        {programState.modules.reduce((acc, module) => acc + module.assignments.length, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              </>
            ) : (
              <SectionContent
                selectedSection={selectedSection}
                programState={programState}
                expandedModuleId={expandedModuleId}
                onToggleModule={handleModuleToggle}
                onOpenAddModule={handleOpenAddModule}
                onOpenAddAssignment={handleOpenAddAssignment}
                onOpenAddSession={handleOpenAddSession}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
              />
            )}
          </div>
        </main>
      </div>

      {/* Add Module Modal */}
      <CareerCompassModal
        open={addModuleOpen}
        onClose={handleCloseAddModule}
        title="Add Module"
        icon={<FaPlus size={14} />}
        onSubmit={handleAddModule}
        submitLabel="Add Module"
      >
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={moduleForm.title}
            onChange={handleModuleFormChange}
            placeholder="e.g. Data Structures"
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Code *</label>
            <input
              type="text"
              name="code"
              value={moduleForm.code}
              onChange={handleModuleFormChange}
              placeholder="e.g. CS201"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Credits</label>
            <input
              type="number"
              name="credits"
              min={1}
              value={moduleForm.credits}
              onChange={handleModuleFormChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={moduleForm.status}
            onChange={handleModuleFormChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
          >
            {MODULE_STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt.replace('-', ' ')}</option>
            ))}
          </select>
        </div>
        {moduleFormError && <p className="text-red-600 text-xs">⚠ {moduleFormError}</p>}
      </CareerCompassModal>

      {/* Add Assignment Modal */}
      <CareerCompassModal
        open={addAssignmentOpen}
        onClose={handleCloseAddAssignment}
        title="Add Assignment"
        icon={<FaPlus size={14} />}
        onSubmit={handleAddAssignment}
        submitLabel="Add Assignment"
      >
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={assignmentForm.title}
            onChange={handleAssignmentFormChange}
            placeholder="e.g. Essay 1"
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Due date</label>
            <input
              type="date"
              name="dueDate"
              value={assignmentForm.dueDate}
              onChange={handleAssignmentFormChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Points</label>
            <input
              type="number"
              name="points"
              min={0}
              value={assignmentForm.points}
              onChange={handleAssignmentFormChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={assignmentForm.status}
            onChange={handleAssignmentFormChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
          >
            {ASSIGNMENT_STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt.replace('-', ' ')}</option>
            ))}
          </select>
        </div>
        {assignmentFormError && <p className="text-red-600 text-xs">⚠ {assignmentFormError}</p>}
      </CareerCompassModal>

      {/* Add Session Modal */}
      <CareerCompassModal
        open={addSessionOpen}
        onClose={handleCloseAddSession}
        title="Add Upcoming Session"
        icon={<FaPlus size={14} />}
        onSubmit={handleAddSession}
        submitLabel="Add Session"
      >
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={sessionForm.title}
            onChange={handleSessionFormChange}
            placeholder="e.g. Introduction to Databases"
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Module</label>
          <select
            name="moduleId"
            value={sessionForm.moduleId}
            onChange={handleSessionFormChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
          >
            {programState.modules.map((m) => (
              <option key={m.id} value={m.id}>{m.title}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={sessionForm.date}
              onChange={handleSessionFormChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={sessionForm.time}
              onChange={handleSessionFormChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={sessionForm.type}
            onChange={handleSessionFormChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] outline-none"
          >
            {SESSION_TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {sessionFormError && <p className="text-red-600 text-xs">⚠ {sessionFormError}</p>}
      </CareerCompassModal>
    </div>
  );
}
