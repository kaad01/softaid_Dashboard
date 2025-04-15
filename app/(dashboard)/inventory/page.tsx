"use client";

import { useState } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useArticles } from "@/hooks/useInventory";
import { useCities } from "@/hooks/useCities";

export default function InventoryPage() {
  const { articles, isLoading: articlesLoading, createArticle } = useArticles();
  const { cities, isLoading: citiesLoading } = useCities();
  const [newArticle, setNewArticle] = useState({
    name: "",
    is_checkbox: false,
    is_consumable: false
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateArticle = async () => {
    try {
      await createArticle.mutateAsync(newArticle);
      setIsDialogOpen(false);
      setNewArticle({
        name: "",
        is_checkbox: false,
        is_consumable: false
      });
    } catch (error) {
      // Error wird durch den API Client behandelt
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventur</h2>
          <p className="text-muted-foreground">
            Verwalten Sie Ihre Artikel und den Bestand an allen Standorten
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Erstelle neuen Artikel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neuen Artikel erstellen</DialogTitle>
              <DialogDescription>
                Fügen Sie einen neuen Artikel zum Inventar hinzu
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Artikelname</Label>
                <Input
                  id="name"
                  value={newArticle.name}
                  onChange={(e) => setNewArticle({ ...newArticle, name: e.target.value })}
                  placeholder="z.B. Erste-Hilfe-Kasten"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_checkbox"
                  checked={newArticle.is_checkbox}
                  onCheckedChange={(checked) => setNewArticle({ ...newArticle, is_checkbox: checked })}
                />
                <Label htmlFor="is_checkbox">Als Checkbox darstellen</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_consumable"
                  checked={newArticle.is_consumable}
                  onCheckedChange={(checked) => setNewArticle({ ...newArticle, is_consumable: checked })}
                />
                <Label htmlFor="is_consumable">Verbrauchsmaterial</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button 
                onClick={handleCreateArticle}
                disabled={createArticle.isPending}
              >
                {createArticle.isPending ? "Wird erstellt..." : "Artikel erstellen"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Städte</CardTitle>
          <CardDescription>
            Wählen Sie eine Stadt aus, um deren Inventar zu verwalten
          </CardDescription>
        </CardHeader>
        <CardContent>
          {citiesLoading ? (
            <div className="text-center py-8">Städte werden geladen...</div>
          ) : cities && cities.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {cities.map((city) => (
                <Card key={city.id} className="cursor-pointer hover:bg-muted/50">
                  <CardHeader>
                    <CardTitle>
                      <Link href={`/inventory/${city.id}`} className="block">
                        {city.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Keine Städte verfügbar
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Artikelliste</CardTitle>
          <CardDescription>
            Alle verfügbaren Artikel im System
          </CardDescription>
        </CardHeader>
        <CardContent>
          {articlesLoading ? (
            <div className="text-center py-8">Artikel werden geladen...</div>
          ) : articles && articles.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Typ</TableHead>
                  <TableHead>Verbrauchsmaterial</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>{article.name}</TableCell>
                    <TableCell>
                      {article.is_checkbox ? "Checkbox" : "Mengeneingabe"}
                    </TableCell>
                    <TableCell>
                      {article.is_consumable ? "Ja" : "Nein"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Keine Artikel verfügbar
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}