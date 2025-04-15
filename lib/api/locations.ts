import api from './client';
import { LocationCreate, Location, LocationInventory, ConditionsCreate } from '@/types/api';

export const locationsApi = {
  // Get all locations
  getLocations: async () => {
    const response = await api.get<Location[]>('/standorte/');
    return response.data;
  },

  // Get single location
  getLocation: async (id: number) => {
    const response = await api.get<Location>(`/standorte/${id}`);
    return response.data;
  },

  // Create location
  createLocation: async (data: LocationCreate) => {
    const response = await api.post<Location>('/standorte', data);
    return response.data;
  },

  // Update location
  updateLocation: async (id: number, data: Partial<LocationCreate>) => {
    const response = await api.put<Location>(`/standorte/${id}`, data);
    return response.data;
  },

  // Delete location
  deleteLocation: async (id: number) => {
    await api.delete(`/standorte/${id}`);
  },

  // Get location inventory
  getLocationInventory: async (id: number) => {
    const response = await api.get<LocationInventory[]>(`/standorte/${id}/inventar`);
    return response.data;
  },

  // Update location inventory
  updateLocationInventory: async (
    locationId: number,
    articleId: number,
    data: { quantity?: number; is_available?: boolean }
  ) => {
    const response = await api.put(`/standorte/${locationId}/inventar/${articleId}`, data);
    return response.data;
  },

  // Create conditions
  createConditions: async (data: ConditionsCreate) => {
    const response = await api.post('/konditionen', data);
    return response.data;
  },

  // Update conditions
  updateConditions: async (id: number, data: Partial<ConditionsCreate>) => {
    const response = await api.put(`/konditionen/${id}`, data);
    return response.data;
  }
};