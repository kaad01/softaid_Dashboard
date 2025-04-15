"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocation, useLocations } from "@/hooks/useLocations";
import { ALLOWED_COURSES, LocationCreate } from "@/types/api";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const locationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  city_id: z.number(),
  maximum_participants: z.number().optional(),
  passport_photos_offered: z.boolean(),
  passport_photo_price: z.number().optional(),
  vision_test_offered: z.boolean(),
  vision_test_price: z.number().optional(),
  location_instructions_instructor: z.string().optional(),
  location_instructions_customer: z.string().optional(),
  offered_courses: z.array(z.string()).optional(),
});

export default function EditLocationPage() {
  const params = useParams();
  const router = useRouter();
  const locationId = parseInt(params.id as string);
  const { location, isLoading } = useLocation(locationId);
  const { updateLocation } = useLocations();

  const form = useForm<LocationCreate>({
    resolver: zodResolver(locationSchema),
  });

  useEffect(() => {
    if (location) {
      form.reset({
        name: location.name,
        city_id: location.city_id,
        maximum_participants: location.maximum_participants,
        passport_photos_offered: location.passport_photos_offered,
        passport_photo_price: location.passport_photo_price,
        vision_test_offered: location.vision_test_offered,
        vision_test_price: location.vision_test_price,
        location_instructions_instructor: location.location_instructions_instructor,
        location_instructions_customer: location.location_instructions_customer,
        offered_courses: location.offered_courses,
      });
    }
  }, [location, form]);

  const onSubmit = async (data: LocationCreate) => {
    try {
      await updateLocation.mutateAsync({ id: locationId, data });
      router.push(`/locations/${locationId}`);
    } catch (error) {
      // Error is handled by the API client
    }
  };

  if (isLoading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (!location) {
    return <div className="container mx-auto py-8">Location not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/locations/${locationId}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Location Details
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Location</h1>
        <p className="text-muted-foreground">
          Update location details and settings
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update the location's basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Location Name</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="e.g., Main Training Center"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city_id">City</Label>
                <Select
                  value={form.watch("city_id")?.toString()}
                  onValueChange={(value) =>
                    form.setValue("city_id", parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Berlin</SelectItem>
                    <SelectItem value="2">Hamburg</SelectItem>
                    <SelectItem value="3">Munich</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maximum_participants">Maximum Participants</Label>
                <Input
                  id="maximum_participants"
                  type="number"
                  {...form.register("maximum_participants", {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>Configure available services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="passport_photos">Passport Photos Offered</Label>
                  <Switch
                    id="passport_photos"
                    checked={form.watch("passport_photos_offered")}
                    onCheckedChange={(checked) =>
                      form.setValue("passport_photos_offered", checked)
                    }
                  />
                </div>
                {form.watch("passport_photos_offered") && (
                  <div className="space-y-2">
                    <Label htmlFor="passport_photo_price">
                      Passport Photo Price
                    </Label>
                    <Input
                      id="passport_photo_price"
                      type="number"
                      step="0.01"
                      {...form.register("passport_photo_price", {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="vision_test">Vision Test Offered</Label>
                  <Switch
                    id="vision_test"
                    checked={form.watch("vision_test_offered")}
                    onCheckedChange={(checked) =>
                      form.setValue("vision_test_offered", checked)
                    }
                  />
                </div>
                {form.watch("vision_test_offered") && (
                  <div className="space-y-2">
                    <Label htmlFor="vision_test_price">Vision Test Price</Label>
                    <Input
                      id="vision_test_price"
                      type="number"
                      step="0.01"
                      {...form.register("vision_test_price", {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Courses and Instructions</CardTitle>
              <CardDescription>
                Update offered courses and location instructions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Offered Courses</Label>
                <div className="grid grid-cols-2 gap-4">
                  {ALLOWED_COURSES.map((course) => (
                    <div
                      key={course}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={course}
                        value={course}
                        {...form.register("offered_courses")}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor={course} className="capitalize">
                        {course.replace("_", " ")}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions for Instructors</Label>
                <Textarea
                  id="instructions"
                  {...form.register("location_instructions_instructor")}
                  placeholder="Special instructions for instructors..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer_instructions">
                  Instructions for Customers
                </Label>
                <Textarea
                  id="customer_instructions"
                  {...form.register("location_instructions_customer")}
                  placeholder="Information for customers..."
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-end gap-4 w-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/standorte/${locationId}`)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updateLocation.isPending}
                >
                  {updateLocation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}