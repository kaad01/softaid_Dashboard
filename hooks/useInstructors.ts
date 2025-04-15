import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { instructorsApi } from '@/lib/api/instructors';
import { InstructorCreate } from '@/types/api';
import { toast } from 'sonner';

export function useInstructors() {
  const queryClient = useQueryClient();

  // Get all instructors
  const { data: instructors, isLoading, error } = useQuery({
    queryKey: ['instructors'],
    queryFn: instructorsApi.getInstructors
  });

  // Create instructor
  const createInstructor = useMutation({
    mutationFn: (data: InstructorCreate) => instructorsApi.createInstructor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
      toast.success('Instructor created successfully');
    }
  });

  // Update instructor
  const updateInstructor = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InstructorCreate> }) =>
      instructorsApi.updateInstructor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
      toast.success('Instructor updated successfully');
    }
  });

  // Delete instructor
  const deleteInstructor = useMutation({
    mutationFn: (id: number) => instructorsApi.deleteInstructor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
      toast.success('Instructor deleted successfully');
    }
  });

  // Upload document
  const uploadDocument = useMutation({
    mutationFn: ({ instructorId, file }: { instructorId: number; file: File }) =>
      instructorsApi.uploadDocument(instructorId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
      toast.success('Document uploaded successfully');
    }
  });

  return {
    instructors,
    isLoading,
    error,
    createInstructor,
    updateInstructor,
    deleteInstructor,
    uploadDocument
  };
}

export function useInstructor(id: number) {
  // Get single instructor
  const { data: instructor, isLoading, error } = useQuery({
    queryKey: ['instructors', id],
    queryFn: () => instructorsApi.getInstructor(id)
  });

  return {
    instructor,
    isLoading,
    error
  };
}