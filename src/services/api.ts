import axios from 'axios';
import type { Guitar, Brand, BodyType } from '../types/guitar';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your Express server port

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const guitarService = {
  // Fetch all guitars with filter/sort params
  getAll: async (params?: { brandId?: string; size?: string; sort?: string; showSold?: boolean }) => {
    const response = await api.get<Guitar[]>('/guitars', { params });
    return response.data;
  },

  // Get single guitar by ID
  getById: async (id: number) => {
    const response = await api.get<Guitar>(`/guitars/${id}`);
    return response.data;
  },

  // Create new guitar (Admin)
  create: async (guitar: Omit<Guitar, 'guitarId'>) => {
    const response = await api.post<Guitar>('/guitars', guitar);
    return response.data;
  },

  // Update guitar (Admin)
  update: async (id: number, guitar: Partial<Guitar>) => {
    const response = await api.put<Guitar>(`/guitars/${id}`, guitar);
    return response.data;
  },

  // Delete guitar (Admin)
  delete: async (id: number) => {
    const response = await api.delete(`/guitars/${id}`);
    return response.data;
  },

  // Lookup data helpers
  getBrands: async () => {
    const response = await api.get<Brand[]>('/brands');
    return response.data;
  },

  getBodyTypes: async () => {
    const response = await api.get<BodyType[]>('/body-types');
    return response.data;
  },
};