"use client";

import { useState } from "react";
import { useInstructors } from "@/hooks/useInstructors";
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
import { Plus, Search, Edit, Trash2, Eye, FileText } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { de } from "date-fns/locale";

export default function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { instructors, isLoading, deleteInstructor } = useInstructors();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [instructorToDelete, setInstructorToDelete] = useState<number | null>(null);

  const filteredInstructors = instructors?.filter((instructor) =>
    `${instructor.first_name} ${instructor.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (instructorToDelete) {
      try {
        await deleteInstructor.mutateAsync(instructorToDelete);
        setIsDeleteDialogOpen(false);
        setInstructorToDelete(null);
      } catch (error) {
        // Error is handled by the API client
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ausbilder</h1>
          <p className="text-muted-foreground">
            Verwalten Sie Ihre Ausbilder und deren Zertifizierungen
          </p>
        </div>
        <Button asChild>
          <Link href="/instructors/new">
            <Plus className="mr-2 h-4 w-4" /> Neuen Ausbilder hinzufügen
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ausbilderverwaltung</CardTitle>
          <CardDescription>
            Alle Ausbilder anzeigen und verwalten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ausbilder suchen..."
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
                    <TableHead>E-Mail</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Beschäftigungsart</TableHead>
                    <TableHead>Lizenziert bis</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInstructors?.length ? (
                    filteredInstructors.map((instructor) => (
                      <TableRow key={instructor.id}>
                        <TableCell className="font-medium">
                          {instructor.first_name} {instructor.last_name}
                        </TableCell>
                        <TableCell>{instructor.email_address || "-"}</TableCell>
                        <TableCell>{instructor.phone_number || "-"}</TableCell>
                        <TableCell>
                          <div className="capitalize">
                            {instructor.employment_type === "full_time"
                              ? "Vollzeit"
                              : instructor.employment_type === "part_time"
                              ? "Teilzeit"
                              : "Freiberuflich"}
                          </div>
                        </TableCell>
                        <TableCell>
                          {instructor.licensed_until
                            ? format(new Date(instructor.licensed_until), "dd. MMMM yyyy", { locale: de })
                            : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                            >
                              <Link href={`/instructors/${instructor.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                            >
                              <Link href={`/instructors/${instructor.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setInstructorToDelete(instructor.id);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                            >
                              <Link href={`/instructors/${instructor.id}/documents`}>
                                <FileText className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="h-24 text-center"
                      >
                        Keine Ausbilder gefunden.
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
              Sind Sie sicher, dass Sie diesen Ausbilder löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.
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
              disabled={deleteInstructor.isPending}
            >
              {deleteInstructor.isPending ? "Wird gelöscht..." : "Ausbilder löschen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}