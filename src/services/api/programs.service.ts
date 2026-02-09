import axios from 'axios';

const API_URL = 'https://api.wanac.org/api/v1/programs';

function getAuthHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}

export const ProgramsService = {
  async getAll() {
    const res = await axios.get(API_URL, { headers: getAuthHeaders() });
    return res.data;
  },

  async getById(id: string | number) {
    const res = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return res.data;
  },

  async create(data: any) {
    const res = await axios.post(`${API_URL}/add`, data, { headers: getAuthHeaders() });
    return res.data;
  },

  async update(id: string | number, data: any) {
    const res = await axios.put(`${API_URL}/update/${id}`, data, { headers: getAuthHeaders() });
    return res.data;
  },

  async delete(id: string | number) {
    const res = await axios.delete(`${API_URL}/delete/${id}`, { headers: getAuthHeaders() });
    return res.data;
  },

  async addUnit(data: any) {
    const res = await axios.post(`${API_URL}/unit/add`, data, { headers: getAuthHeaders() });
    return res.data;
  },

  async getUnitsByProgramId(programId: string | number) {
    const res = await this.getById(programId);
    // Try to find units in the response (adjust key as needed)
    if (res && (res.units || (res.data && res.data.units))) {
      return res.units || res.data.units;
    }
    return [];
  },
};
