"use client";

import { useState } from "react";
import { useLocations } from "@/hooks/useLocations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { locations, isLoading, deleteLocation } = useLocations();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<number | null>(null);

  const filteredLocations = locations?.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (locationToDelete) {
      try {
        await deleteLocation.mutateAsync(locationToDelete);
        setIsDeleteDialogOpen(false);
        setLocationToDelete(null);
      } catch (error) {
        toast.error("Standort konnte nicht gelöscht werden");
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Standorte</h1>
          <p className="text-muted-foreground">
            Verwalten Sie Ihre Schulungsstandorte und Einrichtungen
          </p>
        </div>
        <Button asChild>
          <Link href="/locations/new">
            <Plus className="mr-2 h-4 w-4" /> Neuen Standort hinzufügen
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Standortverwaltung</CardTitle>
          <CardDescription>
            Alle Standorte anzeigen und verwalten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Standorte suchen..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Lädt...</div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Maximale Teilnehmer</TableHead>
                    <TableHead>Dienstleistungen</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLocations?.length ? (
                    filteredLocations.map((location) => (
                      <TableRow key={location.id}>
                        <TableCell className="font-medium">
                          {location.name}
                        </TableCell>
                        <TableCell>
                          {location.maximum_participants || "Nicht angegeben"}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {location.passport_photos_offered && (
                              <div className="text-sm">
                                Passfotos (${location.passport_photo_price})
                              </div>
                            )}
                            {location.vision_test_offered && (
                              <div className="text-sm">
                                Sehtest (${location.vision_test_price})
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                            Aktiv
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                            >
                              <Link href={`/locations/${location.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                            >
                              <Link href={`/locations/${location.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setLocationToDelete(location.id);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-24 text-center"
                      >
                        Keine Standorte gefunden.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Löschen bestätigen</DialogTitle>
            <DialogDescription>
              Sind Sie sicher, dass Sie diesen Standort löschen möchten? Diese Aktion kann nicht
              rückgängig gemacht werden.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Abbrechen
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteLocation.isPending}
            >
              {deleteLocation.isPending ? "Wird gelöscht..." : "Standort löschen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}