"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { useLocations } from "@/hooks/useLocations";
import { ALLOWED_COURSES, LocationCreate } from "@/types/api";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

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

export default function NewLocationPage() {
  const router = useRouter();
  const { createLocation } = useLocations();
  const [step, setStep] = useState(1);

  const form = useForm<LocationCreate>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      passport_photos_offered: false,
      vision_test_offered: false,
      offered_courses: [],
    },
  });

  const onSubmit = async (data: LocationCreate) => {
    try {
      await createLocation.mutateAsync(data);
      router.push("/locations");
    } catch (error) {
      // Error is handled by the API client
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
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

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions for Instructors</Label>
              <Textarea
                id="instructions"
                {...form.register("location_instructions_instructor")}
                placeholder="Special instructions for instructors..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
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
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
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
              <Label htmlFor="customer_instructions">
                Instructions for Customers
              </Label>
              <Textarea
                id="customer_instructions"
                {...form.register("location_instructions_customer")}
                placeholder="Information for customers..."
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/locations">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Locations
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create New Location</h1>
        <p className="text-muted-foreground">
          Add a new training location to the system
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Location Details - Step {step} of 3</CardTitle>
          <CardDescription>
            {step === 1
              ? "Enter basic location information"
              : step === 2
              ? "Configure additional services"
              : "Set up courses and customer information"}
          </CardDescription>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 1}
          >
            Previous
          </Button>
          {step < 3 ? (
            <Button onClick={() => setStep((s) => s + 1)}>Next</Button>
          ) : (
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={createLocation.isPending}
            >
              {createLocation.isPending ? "Creating..." : "Create Location"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}