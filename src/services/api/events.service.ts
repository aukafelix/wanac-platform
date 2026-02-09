import { apiClient } from './config';

// Update an event by ID
export async function updateEvent(eventId: number | string, data: any) {
  const res = await apiClient.put(`https://api.wanac.org/api/v1/events/update/${eventId}`, data);
  return res.data;
}

// Delete an event by ID
export async function deleteEvent(eventId: number | string) {
  const res = await apiClient.delete(`https://api.wanac.org/api/v1/events/delete/${eventId}`);
  return res.data;
}

// Fetch all events
export async function getEvents() {
  const res = await apiClient.get('https://api.wanac.org/api/v1/events');
  return res.data;
}