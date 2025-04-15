import api from './client';
import { City } from '@/types/api';

export const citiesApi = {
  // Alle Städte abrufen
  getCities: async () => {
    const response = await api.get<City[]>('/staedte/');
    return response.data;
  },

  // Eine einzelne Stadt abrufen
  getCity: async (id: number) => {
    const response = await api.get<City>(`/staedte/${id}`);
    return response.data;
  }
};