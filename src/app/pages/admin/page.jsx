"use client";
// Admin Dashboard for WANAC Coaching Platform
import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../../components/dashboardcomponents/adminsidebar';
import { Box, Grid, Card, CardContent, Typography, Button, Avatar, Paper } from '@mui/material';
import { People, Event, PieChart, SupervisorAccount, Edit, BarChart } from '@mui/icons-material';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
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

  // Placeholder stats
  const stats = [
    { icon: <People color="primary" />, label: 'Manage Users', desc: 'View, edit, or remove users' },
    { icon: <SupervisorAccount color="secondary" />, label: 'Manage Coaches', desc: 'Control coach services and profiles' },
    { icon: <Edit color="action" />, label: 'Manage Clients', desc: 'Control client services and profiles' },
    { icon: <Event color="warning" />, label: 'Sessions', desc: 'Monitor all sessions' },
    { icon: <PieChart color="primary" />, label: 'Analytics', desc: 'View platform analytics' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.50', fontFamily: 'serif' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Top Bar */}
        <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 4, py: 2, borderBottom: 1, borderColor: 'grey.200', position: 'sticky', top: 0, zIndex: 10 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'grey.300', color: 'grey.700' }}><SupervisorAccount /></Avatar>
            <Typography variant="subtitle1" color="text.secondary">{user ? user.name : 'Admin'}</Typography>
          </Box>
        </Paper>
        {/* Main Content */}
        <Box component="main" sx={{ flex: 1, overflowY: 'auto', px: { xs: 2, md: 6 }, py: 4, bgcolor: 'grey.50' }}>
          <Box maxWidth="lg" mx="auto">
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {/* Welcome Section */}
                <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3 }}>
                  <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                      Welcome Back{user?.name ? `, ${user.name}` : ''}!
                    </Typography>
                    <Typography color="text.secondary" variant="body1">
                      Admin control panel for WANAC platform.
                    </Typography>
                  </Box>
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <img src="/dashboard-illustration.svg" alt="Dashboard" style={{ width: 120, height: 120, objectFit: 'contain' }} />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12}>
                {/* Quick Actions Row */}
                <Grid container spacing={2}>
                  {stats.map((stat, idx) => (
                    <Grid item xs={12} sm={6} md={2.4} key={stat.label}>
                      <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 120, transition: '0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.03)' } }}>
                        <Box mb={1}>{stat.icon}</Box>
                        <Typography variant="subtitle1" fontWeight={600}>{stat.label}</Typography>
                        <Typography variant="caption" color="text.secondary">{stat.desc}</Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {/* More Insights Section */}
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3, minHeight: 220 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    User & Session Growth (Chart Placeholder)
                  </Typography>
                  <Box sx={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'grey.400' }}>
                    <BarChart sx={{ fontSize: 60 }} />
                    <Typography color="text.secondary" sx={{ ml: 2 }}>
                      Chart coming soon...
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3, minHeight: 220 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Recent Activity
                  </Typography>
                  <Typography color="text.secondary">Recent activity feed coming soon...</Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
  