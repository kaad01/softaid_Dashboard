"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useInstructor, useInstructors } from "@/hooks/useInstructors";
import { InstructorCreate } from "@/types/api";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const instructorSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  date_of_birth: z.string(),
  bafoeg: z.boolean(),
  bafoeg_amount: z.number().optional(),
  drivers_license: z.boolean(),
  insurance: z.string(),
  phone_number: z.string().optional(),
  email_address: z.string().email().optional(),
  languages: z.string().optional(),
  salary: z.number().optional(),
  employment_type: z.string(),
  study_start: z.string().optional(),
  work_start: z.string().optional(),
  licensed_until: z.string().optional(),
  workplace_id: z.number().optional(),
});

export default function EditInstructorPage() {
  const params = useParams();
  const router = useRouter();
  const instructorId = parseInt(params.id as string);
  const { instructor, isLoading } = useInstructor(instructorId);
  const { updateInstructor } = useInstructors();

  const form = useForm<InstructorCreate>({
    resolver: zodResolver(instructorSchema),
  });

  useEffect(() => {
    if (instructor) {
      form.reset({
        first_name: instructor.first_name,
        last_name: instructor.last_name,
        date_of_birth: instructor.date_of_birth,
        bafoeg: instructor.bafoeg,
        bafoeg_amount: instructor.bafoeg_amount,
        drivers_license: instructor.drivers_license,
        insurance: instructor.insurance,
        phone_number: instructor.phone_number,
        email_address: instructor.email_address,
        languages: instructor.languages,
        salary: instructor.salary,
        employment_type: instructor.employment_type,
        study_start: instructor.study_start,
        work_start: instructor.work_start,
        licensed_until: instructor.licensed_until,
        workplace_id: instructor.workplace_id,
      });
    }
  }, [instructor, form]);

  const onSubmit = async (data: InstructorCreate) => {
    try {
      await updateInstructor.mutateAsync({ id: instructorId, data });
      router.push(`/instructors/${instructorId}`);
    } catch (error) {
      // Error is handled by the API client
    }
  };

  if (isLoading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (!instructor) {
    return <div className="container mx-auto py-8">Instructor not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/instructors/${instructorId}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Instructor Details
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Instructor</h1>
        <p className="text-muted-foreground">
          Update instructor details and information
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    {...form.register("first_name")}
                  />
                  {form.formState.errors.first_name && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.first_name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    {...form.register("last_name")}
                  />
                  {form.formState.errors.last_name && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    {...form.register("date_of_birth")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="languages">Languages</Label>
                  <Input
                    id="languages"
                    {...form.register("languages")}
                    placeholder="e.g., English, German"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email_address">Email</Label>
                  <Input
                    id="email_address"
                    type="email"
                    {...form.register("email_address")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone</Label>
                  <Input
                    id="phone_number"
                    {...form.register("phone_number")}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="bafoeg">BAföG Status</Label>
                  <Switch
                    id="bafoeg"
                    checked={form.watch("bafoeg")}
                    onCheckedChange={(checked) =>
                      form.setValue("bafoeg", checked)
                    }
                  />
                </div>
                {form.watch("bafoeg") && (
                  <div className="space-y-2">
                    <Label htmlFor="bafoeg_amount">BAföG Amount</Label>
                    <Input
                      id="bafoeg_amount"
                      type="number"
                      step="0.01"
                      {...form.register("bafoeg_amount", {
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
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Update qualifications and certifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="drivers_license">Driver's License</Label>
                <Switch
                  id="drivers_license"
                  checked={form.watch("drivers_license")}
                  onCheckedChange={(checked) =>
                    form.setValue("drivers_license", checked)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insurance">Insurance</Label>
                <Input
                  id="insurance"
                  {...form.register("insurance")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="licensed_until">Licensed Until</Label>
                <Input
                  id="licensed_until"
                  type="date"
                  {...form.register("licensed_until")}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Employment Details</CardTitle>
              <CardDescription>Update work and compensation information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employment_type">Employment Type</Label>
                  <Select
                    value={form.watch("employment_type")}
                    onValueChange={(value) =>
                      form.setValue("employment_type", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_time">Full Time</SelectItem>
                      <SelectItem value="part_time">Part Time</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    step="0.01"
                    {...form.register("salary", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="study_start">Study Start</Label>
                  <Input
                    id="study_start"
                    type="date"
                    {...form.register("study_start")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="work_start">Work Start</Label>
                  <Input
                    id="work_start"
                    type="date"
                    {...form.register("work_start")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workplace_id">Workplace</Label>
                <Select
                  value={form.watch("workplace_id")?.toString()}
                  onValueChange={(value) =>
                    form.setValue("workplace_id", parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select workplace" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Location #1</SelectItem>
                    <SelectItem value="2">Location #2</SelectItem>
                    <SelectItem value="3">Location #3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-end gap-4 w-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/instructors/${instructorId}`)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updateInstructor.isPending}
                >
                  {updateInstructor.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}