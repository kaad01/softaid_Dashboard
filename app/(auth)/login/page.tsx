"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // In einer echten App wäre dies ein API-Aufruf zur Authentifizierung
    setTimeout(() => {
      if (email === "admin@example.com" && password === "admin123") {
        localStorage.setItem("user", JSON.stringify({
          name: "Administrator",
          email: "admin@example.com",
          role: "admin"
        }));
        router.push("/dashboard");
      } else if (email === "trainer@example.com" && password === "trainer123") {
        localStorage.setItem("user", JSON.stringify({
          name: "Ausbilder",
          email: "trainer@example.com",
          role: "trainer"
        }));
        router.push("/dashboard");
      } else {
        setError("Ungültige E-Mail oder Passwort");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Anmelden</CardTitle>
          <CardDescription>
            Geben Sie Ihre Anmeldedaten ein, um auf das Dashboard zuzugreifen
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Passwort</Label>
                <Link href="#" className="text-sm text-primary underline-offset-4 hover:underline">
                  Passwort vergessen?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Demo-Anmeldedaten:</p>
              <p>Admin: admin@example.com / admin123</p>
              <p>Ausbilder: trainer@example.com / trainer123</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Bitte warten
                </>
              ) : (
                "Anmelden"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}