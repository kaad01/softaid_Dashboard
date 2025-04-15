import { useQuery } from '@tanstack/react-query';
import { citiesApi } from '@/lib/api/cities';

export function useCities() {
  const { data: cities, isLoading, error } = useQuery({
    queryKey: ['cities'],
    queryFn: citiesApi.getCities
  });

  return {
    cities,
    isLoading,
    error
  };
}

export function useCity(id: number) {
  const { data: city, isLoading, error } = useQuery({
    queryKey: ['cities', id],
    queryFn: () => citiesApi.getCity(id)
  });

  return {
    city,
    isLoading,
    error
  };
}