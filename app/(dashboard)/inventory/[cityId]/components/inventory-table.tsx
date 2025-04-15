"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocationInventory } from "@/hooks/useInventory";
import { Location, Article } from "@/types/api";

interface InventoryTableProps {
  locations: Location[];
  articles: Article[];
  cityId: number;
}

export function InventoryTable({ locations, articles, cityId }: InventoryTableProps) {
  const cityLocations = locations.filter(loc => loc.city_id === cityId);
  const [inventoryData, setInventoryData] = useState<Record<number, Record<number, { checkbox_value: boolean; quantity_value: number }>>>({});
  
  // Hole das Inventar für jeden Standort
  const locationInventories = cityLocations.map(location => {
    const { inventory, isLoading, updateInventoryEntry, createInventoryEntry } = useLocationInventory(location.id);
    return { locationId: location.id, inventory, isLoading, updateInventoryEntry, createInventoryEntry };
  });

  // Initialisiere die Inventardaten
  useEffect(() => {
    const newInventoryData: Record<number, Record<number, { checkbox_value: boolean; quantity_value: number }>> = {};
    
    cityLocations.forEach(location => {
      const locationInventory = locationInventories.find(inv => inv.locationId === location.id);
      if (locationInventory) {
        newInventoryData[location.id] = {};
        articles.forEach(article => {
          const inventoryItem = locationInventory.inventory?.find(item => item.artikel_id === article.id);
          newInventoryData[location.id][article.id] = {
            checkbox_value: inventoryItem?.checkbox_value || false,
            quantity_value: inventoryItem?.quantity_value || 0
          };
        });
      }
    });

    setInventoryData(newInventoryData);
  }, [cityLocations, articles, locationInventories]);

  const handleQuantityChange = async (locationId: number, articleId: number, value: number) => {
    const locationInventory = locationInventories.find(inv => inv.locationId === locationId);
    if (!locationInventory) return;

    try {
      const inventoryItem = locationInventory.inventory?.find(item => item.artikel_id === articleId);
      if (inventoryItem) {
        await locationInventory.updateInventoryEntry.mutateAsync({
          standortArtikelId: inventoryItem.id,
          data: { quantity_value: value }
        });
      } else {
        await locationInventory.createInventoryEntry.mutateAsync({
          artikel_id: articleId,
          quantity_value: value
        });
      }

      setInventoryData(prev => ({
        ...prev,
        [locationId]: {
          ...prev[locationId],
          [articleId]: {
            ...prev[locationId][articleId],
            quantity_value: value
          }
        }
      }));
    } catch (error) {
      // Error wird durch den API Client behandelt
    }
  };

  const handleCheckboxChange = async (locationId: number, articleId: number, checked: boolean) => {
    const locationInventory = locationInventories.find(inv => inv.locationId === locationId);
    if (!locationInventory) return;

    try {
      const inventoryItem = locationInventory.inventory?.find(item => item.artikel_id === articleId);
      if (inventoryItem) {
        await locationInventory.updateInventoryEntry.mutateAsync({
          standortArtikelId: inventoryItem.id,
          data: { checkbox_value: checked }
        });
      } else {
        await locationInventory.createInventoryEntry.mutateAsync({
          artikel_id: articleId,
          checkbox_value: checked
        });
      }

      setInventoryData(prev => ({
        ...prev,
        [locationId]: {
          ...prev[locationId],
          [articleId]: {
            ...prev[locationId][articleId],
            checkbox_value: checked
          }
        }
      }));
    } catch (error) {
      // Error wird durch den API Client behandelt
    }
  };

  if (locationInventories.some(inv => inv.isLoading)) {
    return <div className="text-center py-8">Inventardaten werden geladen...</div>;
  }

  if (cityLocations.length === 0) {
    return <div className="text-center py-8">Keine Standorte in dieser Stadt gefunden.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Artikel</TableHead>
            {cityLocations.map((location) => (
              <TableHead key={location.id}>{location.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell className="font-medium">{article.name}</TableCell>
              {cityLocations.map((location) => (
                <TableCell key={location.id}>
                  {article.is_checkbox ? (
                    <Checkbox
                      checked={inventoryData[location.id]?.[article.id]?.checkbox_value || false}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange(location.id, article.id, checked as boolean)
                      }
                    />
                  ) : (
                    <Input
                      type="number"
                      min="0"
                      value={inventoryData[location.id]?.[article.id]?.quantity_value || 0}
                      onChange={(e) => 
                        handleQuantityChange(location.id, article.id, parseInt(e.target.value) || 0)
                      }
                      className="w-24"
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}