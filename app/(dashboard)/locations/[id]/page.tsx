"use client";

import { useParams, useRouter } from "next/navigation";
import { useLocation } from "@/hooks/useLocations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Edit } from "lucide-react";
import Link from "next/link";

export default function LocationDetailPage() {
  const params = useParams();
  const locationId = parseInt(params.id as string);
  const { location, inventory, isLoading } = useLocation(locationId);

  if (isLoading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (!location) {
    return <div className="container mx-auto py-8">Location not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button asChild>
            <Link href={`/locations/${locationId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Location
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{location.name}</h1>
        <p className="text-muted-foreground">Location details and management</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="conditions">Conditions</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Basic location details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Maximum Participants</h3>
                  <p className="text-muted-foreground">
                    {location.maximum_participants || "Not specified"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">City ID</h3>
                  <p className="text-muted-foreground">{location.city_id}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Instructor Instructions</h3>
                <p className="text-muted-foreground">
                  {location.location_instructions_instructor || "No instructions provided"}
                </p>
              </div>

              <div>
                <h3 className="font-medium">Customer Instructions</h3>
                <p className="text-muted-foreground">
                  {location.location_instructions_customer || "No instructions provided"}
                </p>
              </div>

              <div>
                <h3 className="font-medium">Offered Courses</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {location.offered_courses?.map((course) => (
                    <div
                      key={course}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary"
                    >
                      {course.replace("_", " ")}
                    </div>
                  )) || "No courses specified"}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Additional Services</CardTitle>
              <CardDescription>Available services at this location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium">Passport Photos</h3>
                {location.passport_photos_offered ? (
                  <div className="mt-2">
                    <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                      Available
                    </div>
                    <p className="mt-1 text-muted-foreground">
                      Price: ${location.passport_photo_price}
                    </p>
                  </div>
                ) : (
                  <div className="mt-2">
                    <div className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800">
                      Not Available
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-medium">Vision Test</h3>
                {location.vision_test_offered ? (
                  <div className="mt-2">
                    <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                      Available
                    </div>
                    <p className="mt-1 text-muted-foreground">
                      Price: ${location.vision_test_price}
                    </p>
                  </div>
                ) : (
                  <div className="mt-2">
                    <div className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800">
                      Not Available
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Location Inventory</CardTitle>
              <CardDescription>Available items and equipment</CardDescription>
            </CardHeader>
            <CardContent>
              {inventory?.length ? (
                <div className="space-y-4">
                  {inventory.map((item) => (
                    <div
                      key={item.article_id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">Article #{item.article_id}</h4>
                        {item.quantity !== undefined && (
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        )}
                      </div>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          item.is_available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.is_available ? "Available" : "Unavailable"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No inventory items found</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conditions">
          <Card>
            <CardHeader>
              <CardTitle>Location Conditions</CardTitle>
              <CardDescription>Contract and rental information</CardDescription>
            </CardHeader>
            <CardContent>
              {location.conditions ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Contact Person</h3>
                    <p className="text-muted-foreground">
                      {location.conditions.contact_person}
                    </p>
                  </div>
                  {location.conditions.contact_email && (
                    <div>
                      <h3 className="font-medium">Contact Email</h3>
                      <p className="text-muted-foreground">
                        {location.conditions.contact_email}
                      </p>
                    </div>
                  )}
                  {location.conditions.contact_phone && (
                    <div>
                      <h3 className="font-medium">Contact Phone</h3>
                      <p className="text-muted-foreground">
                        {location.conditions.contact_phone}
                      </p>
                    </div>
                  )}
                  {location.conditions.rental_price && (
                    <div>
                      <h3 className="font-medium">Rental Price</h3>
                      <p className="text-muted-foreground">
                        ${location.conditions.rental_price}
                      </p>
                    </div>
                  )}
                  {location.conditions.rental_period && (
                    <div>
                      <h3 className="font-medium">Rental Period</h3>
                      <p className="text-muted-foreground">
                        {location.conditions.rental_period}
                      </p>
                    </div>
                  )}
                  {location.conditions.payment_terms && (
                    <div>
                      <h3 className="font-medium">Payment Terms</h3>
                      <p className="text-muted-foreground">
                        {location.conditions.payment_terms}
                      </p>
                    </div>
                  )}
                  {location.conditions.additional_notes && (
                    <div>
                      <h3 className="font-medium">Additional Notes</h3>
                      <p className="text-muted-foreground">
                        {location.conditions.additional_notes}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No conditions specified</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}