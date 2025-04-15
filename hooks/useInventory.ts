import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryApi } from '@/lib/api/inventory';
import { toast } from 'sonner';

export function useArticles() {
  const queryClient = useQueryClient();

  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: inventoryApi.getArticles
  });

  const createArticle = useMutation({
    mutationFn: inventoryApi.createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast.success('Artikel erfolgreich erstellt');
    },
    onError: () => {
      toast.error('Fehler beim Erstellen des Artikels');
    }
  });

  const updateArticle = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      inventoryApi.updateArticle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast.success('Artikel erfolgreich aktualisiert');
    },
    onError: () => {
      toast.error('Fehler beim Aktualisieren des Artikels');
    }
  });

  const deleteArticle = useMutation({
    mutationFn: inventoryApi.deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast.success('Artikel erfolgreich gelöscht');
    },
    onError: () => {
      toast.error('Fehler beim Löschen des Artikels');
    }
  });

  return {
    articles,
    isLoading,
    error,
    createArticle,
    updateArticle,
    deleteArticle
  };
}

export function useLocationInventory(locationId: number) {
  const queryClient = useQueryClient();

  const { data: inventory, isLoading, error } = useQuery({
    queryKey: ['inventory', locationId],
    queryFn: () => inventoryApi.getLocationInventory(locationId)
  });

  const createInventoryEntry = useMutation({
    mutationFn: (data: { artikel_id: number; checkbox_value?: boolean; quantity_value?: number }) =>
      inventoryApi.createInventoryEntry(locationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', locationId] });
      toast.success('Inventareintrag erfolgreich erstellt');
    },
    onError: () => {
      toast.error('Fehler beim Erstellen des Inventareintrags');
    }
  });

  const updateInventoryEntry = useMutation({
    mutationFn: ({ standortArtikelId, data }: { standortArtikelId: number; data: any }) =>
      inventoryApi.updateInventoryEntry(locationId, standortArtikelId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', locationId] });
      toast.success('Inventareintrag erfolgreich aktualisiert');
    },
    onError: () => {
      toast.error('Fehler beim Aktualisieren des Inventareintrags');
    }
  });

  const deleteInventoryEntry = useMutation({
    mutationFn: (standortArtikelId: number) =>
      inventoryApi.deleteInventoryEntry(locationId, standortArtikelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', locationId] });
      toast.success('Inventareintrag erfolgreich gelöscht');
    },
    onError: () => {
      toast.error('Fehler beim Löschen des Inventareintrags');
    }
  });

  return {
    inventory,
    isLoading,
    error,
    createInventoryEntry,
    updateInventoryEntry,
    deleteInventoryEntry
  };
}