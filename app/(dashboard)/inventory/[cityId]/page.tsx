"use client";

import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InventoryTable } from "./components/inventory-table";
import { useArticles } from "@/hooks/useInventory";
import { useLocations } from "@/hooks/useLocations";
import { useCity } from "@/hooks/useCities";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CityInventoryPage() {
  const params = useParams();
  const cityId = parseInt(params.cityId as string);
  
  const { articles, isLoading: articlesLoading } = useArticles();
  const { locations, isLoading: locationsLoading } = useLocations();
  const { city, isLoading: cityLoading } = useCity(cityId);

  if (articlesLoading || locationsLoading || cityLoading) {
    return <div className="text-center py-8">Daten werden geladen...</div>;
  }

  if (!articles || !locations || !city) {
    return <div className="text-center py-8">Keine Daten verfügbar</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/inventory">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Zurück zur Übersicht
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Inventar - {city.name}</h2>
        <p className="text-muted-foreground">
          Verwalten Sie den Bestand aller Standorte in {city.name}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bestandsübersicht</CardTitle>
          <CardDescription>
            Aktueller Bestand aller Artikel an den verschiedenen Standorten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InventoryTable
            locations={locations}
            articles={articles}
            cityId={cityId}
          />
        </CardContent>
      </Card>
    </div>
  );
}