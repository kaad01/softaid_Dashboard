"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, UserCog } from "lucide-react";

export default function DashboardPage() {
  const [user] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Willkommen zurück, {user?.name}!</h2>
        <p className="text-muted-foreground">
          Verwalten Sie Ihre Standorte und Ausbilder über dieses Dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Standorte</CardTitle>
            <CardDescription>
              Verwalten Sie Schulungsstandorte und Einrichtungen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/locations">
                <Building2 className="mr-2 h-4 w-4" />
                Standorte anzeigen
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ausbilder</CardTitle>
            <CardDescription>
              Verwalten Sie Ausbilder und deren Zertifizierungen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/instructors">
                <UserCog className="mr-2 h-4 w-4" />
                Ausbilder anzeigen
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}