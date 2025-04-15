import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { locationsApi } from '@/lib/api/locations';
import { LocationCreate } from '@/types/api';
import { toast } from 'sonner';

export function useLocations() {
  const queryClient = useQueryClient();

  // Get all locations
  const { data: locations, isLoading, error } = useQuery({
    queryKey: ['locations'],
    queryFn: locationsApi.getLocations
  });

  // Create location
  const createLocation = useMutation({
    mutationFn: (data: LocationCreate) => locationsApi.createLocation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      toast.success('Location created successfully');
    }
  });

  // Update location
  const updateLocation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<LocationCreate> }) =>
      locationsApi.updateLocation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      toast.success('Location updated successfully');
    }
  });

  // Delete location
  const deleteLocation = useMutation({
    mutationFn: (id: number) => locationsApi.deleteLocation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      toast.success('Location deleted successfully');
    }
  });

  return {
    locations,
    isLoading,
    error,
    createLocation,
    updateLocation,
    deleteLocation
  };
}

export function useLocation(id: number) {
  // Get single location
  const { data: location, isLoading, error } = useQuery({
    queryKey: ['locations', id],
    queryFn: () => locationsApi.getLocation(id)
  });

  // Get location inventory
  const { data: inventory, isLoading: inventoryLoading } = useQuery({
    queryKey: ['locations', id, 'inventory'],
    queryFn: () => locationsApi.getLocationInventory(id)
  });

  return {
    location,
    inventory,
    isLoading: isLoading || inventoryLoading,
    error
  };
}