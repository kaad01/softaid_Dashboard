"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Senior administrator with 5+ years of experience in course management."
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    bookingAlerts: true,
    courseReminders: true,
    marketingEmails: false
  });
  const [displaySettings, setDisplaySettings] = useState({
    darkMode: false,
    compactView: false,
    highContrast: false
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profil erfolgreich aktualisiert");
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Die neuen Passwörter stimmen nicht überein");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error("Das Passwort muss mindestens 8 Zeichen lang sein");
      return;
    }
    
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    
    toast.success("Passwort erfolgreich aktualisiert");
  };

  const handleNotificationUpdate = () => {
    toast.success("Benachrichtigungseinstellungen aktualisiert");
  };

  const handleDisplayUpdate = () => {
    toast.success("Anzeigeeinstellungen aktualisiert");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Einstellungen</h2>
        <p className="text-muted-foreground">
          Verwalten Sie Ihre Kontoeinstellungen und Präferenzen
        </p>
      </div>

      <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Konto</TabsTrigger>
          <TabsTrigger value="password">Passwort</TabsTrigger>
          <TabsTrigger value="notifications">Benachrichtigungen</TabsTrigger>
          <TabsTrigger value="display">Anzeige</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Kontoinformationen</CardTitle>
              <CardDescription>
                Aktualisieren Sie Ihre persönlichen Informationen
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileUpdate}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Vollständiger Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefonnummer</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografie</Label>
                  <Input
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Änderungen speichern</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Passwort ändern</CardTitle>
              <CardDescription>
                Aktualisieren Sie Ihr Passwort, um Ihr Konto zu schützen
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordUpdate}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Aktuelles Passwort</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Neues Passwort</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Neues Passwort bestätigen</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Passwort aktualisieren</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Benachrichtigungseinstellungen</CardTitle>
              <CardDescription>
                Konfigurieren Sie, wie Sie Benachrichtigungen erhalten
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">E-Mail-Benachrichtigungen</Label>
                  <p className="text-sm text-muted-foreground">
                    Erhalten Sie E-Mail-Benachrichtigungen für wichtige Updates
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailNotifications: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="booking-alerts">Buchungsbenachrichtigungen</Label>
                  <p className="text-sm text-muted-foreground">
                    Werden Sie über neue Buchungen informiert
                  </p>
                </div>
                <Switch
                  id="booking-alerts"
                  checked={notificationSettings.bookingAlerts}
                  onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, bookingAlerts: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="course-reminders">Kurserinnerungen</Label>
                  <p className="text-sm text-muted-foreground">
                    Erhalten Sie Erinnerungen für bevorstehende Kurse
                  </p>
                </div>
                <Switch
                  id="course-reminders"
                  checked={notificationSettings.courseReminders}
                  onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, courseReminders: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing-E-Mails</Label>
                  <p className="text-sm text-muted-foreground">
                    Erhalten Sie Werbe-E-Mails und Angebote
                  </p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, marketingEmails: checked })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleNotificationUpdate}>Einstellungen speichern</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle>Anzeigeeinstellungen</CardTitle>
              <CardDescription>
                Passen Sie Ihre Anzeigeeinstellungen an
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dunkelmodus</Label>
                  <p className="text-sm text-muted-foreground">
                    Dunkles Theme für das Dashboard verwenden
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={displaySettings.darkMode}
                  onCheckedChange={(checked) => setDisplaySettings({ ...displaySettings, darkMode: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-view">Kompakte Ansicht</Label>
                  <p className="text-sm text-muted-foreground">
                    Mehr Inhalte mit weniger Abstand anzeigen
                  </p>
                </div>
                <Switch
                  id="compact-view"
                  checked={displaySettings.compactView}
                  onCheckedChange={(checked) => setDisplaySettings({ ...displaySettings, compactView: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">Hoher Kontrast</Label>
                  <p className="text-sm text-muted-foreground">
                    Kontrast für bessere Sichtbarkeit erhöhen
                  </p>
                </div>
                <Switch
                  id="high-contrast"
                  checked={displaySettings.highContrast}
                  onCheckedChange={(checked) => setDisplaySettings({ ...displaySettings, highContrast: checked })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleDisplayUpdate}>Anzeigeeinstellungen speichern</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}