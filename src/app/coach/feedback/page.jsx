

"use client";

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import CoachSidebar from '../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';

export default function FeedbackPage() {
	const [form, setForm] = useState({
		name: '',
		email: '',
		feedback: '',
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle feedback submission logic here
		alert('Thank you for your feedback!');
		setForm({ name: '', email: '', feedback: '' });
	};

	// Mock coach user for topbar
	const coachUser = { name: 'Coach' };

	return (
		<div className="h-screen flex bg-white font-body text-foreground" style={{ fontFamily: 'var(--font-body)' }}>
			{/* Sidebar */}
			<CoachSidebar />
			{/* Main Area */}
			<div className="flex-1 flex flex-col h-full transition-all duration-300">
				{/* Top Bar */}
				<ClientTopbar user={coachUser} />
				{/* Main Content */}
				<main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 sm:px-4 md:px-8 py-4 md:py-6 bg-muted">
					<div className="max-w-2xl mx-auto">
						<section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md animate-fadeIn">
							<Typography variant="h4" gutterBottom>
								Coach Feedback
							</Typography>
							<Box component="form" onSubmit={handleSubmit}>
								<TextField
									label="Name"
									name="name"
									value={form.name}
									onChange={handleChange}
									fullWidth
									margin="normal"
									required
								/>
								<TextField
									label="Email"
									name="email"
									value={form.email}
									onChange={handleChange}
									fullWidth
									margin="normal"
									type="email"
									required
								/>
								<TextField
									label="Your Feedback"
									name="feedback"
									value={form.feedback}
									onChange={handleChange}
									fullWidth
									margin="normal"
									multiline
									rows={4}
									required
								/>
								<Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
									Submit
								</Button>
							</Box>
						</section>
					</div>
				</main>
			</div>
		</div>
	);
}
