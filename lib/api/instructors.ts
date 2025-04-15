import api from './client';
import { InstructorCreate, Instructor } from '@/types/api';

export const instructorsApi = {
  // Get all instructors
  getInstructors: async () => {
    const response = await api.get<Instructor[]>('/dozenten');
    return response.data;
  },

  // Get single instructor
  getInstructor: async (id: number) => {
    const response = await api.get<Instructor>(`/dozenten/${id}`);
    return response.data;
  },

  // Create instructor
  createInstructor: async (data: InstructorCreate) => {
    const response = await api.post<Instructor>('/dozenten', data);
    return response.data;
  },

  // Update instructor
  updateInstructor: async (id: number, data: Partial<InstructorCreate>) => {
    const response = await api.put<Instructor>(`/dozenten/${id}`, data);
    return response.data;
  },

  // Delete instructor
  deleteInstructor: async (id: number) => {
    await api.delete(`/dozenten/${id}`);
  },

  // Upload instructor document
  uploadDocument: async (instructorId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(
      `/dozent-dokumente/${instructorId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }
};