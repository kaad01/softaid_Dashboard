import api from './client';
import { Article, StandortArtikel } from '@/types/api';

export const inventoryApi = {
  // Artikel endpoints
  getArticles: async () => {
    const response = await api.get<Article[]>('/artikel/');
    return response.data;
  },

  getArticle: async (id: number) => {
    const response = await api.get<Article>(`/artikel/${id}`);
    return response.data;
  },

  createArticle: async (data: { 
    name: string;
    is_checkbox: boolean;
    is_consumable: boolean;
  }) => {
    const response = await api.post<Article>('/artikel', data);
    return response.data;
  },

  updateArticle: async (id: number, data: {
    name?: string;
    is_checkbox?: boolean;
    is_consumable?: boolean;
  }) => {
    const response = await api.put<Article>(`/artikel/${id}`, data);
    return response.data;
  },

  deleteArticle: async (id: number) => {
    await api.delete(`/artikel/${id}`);
  },

  // Standort Inventar endpoints
  getLocationInventory: async (standortId: number) => {
    const response = await api.get<StandortArtikel[]>(`/standorte/${standortId}/inventar`);
    return response.data;
  },

  createInventoryEntry: async (standortId: number, data: {
    artikel_id: number;
    checkbox_value?: boolean;
    quantity_value?: number;
  }) => {
    const response = await api.post<StandortArtikel>(`/standorte/${standortId}/inventar`, data);
    return response.data;
  },

  updateInventoryEntry: async (
    standortId: number,
    standortArtikelId: number,
    data: {
      checkbox_value?: boolean;
      quantity_value?: number;
    }
  ) => {
    const response = await api.put<StandortArtikel>(
      `/standorte/${standortId}/inventar/${standortArtikelId}`,
      data
    );
    return response.data;
  },

  deleteInventoryEntry: async (standortId: number, standortArtikelId: number) => {
    await api.delete(`/standorte/${standortId}/inventar/${standortArtikelId}`);
  }
};