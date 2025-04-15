"use client";

import { useParams, useRouter } from "next/navigation";
import { useInstructor } from "@/hooks/useInstructors";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Edit, Upload } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function InstructorDetailPage() {
  const params = useParams();
  const instructorId = parseInt(params.id as string);
  const { instructor, isLoading } = useInstructor(instructorId);

  if (isLoading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (!instructor) {
    return <div className="container mx-auto py-8">Instructor not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" asChild>
            <Link href="/instructors">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Instructors
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button asChild>
              <Link href={`/instructors/${instructorId}/documents`}>
                <Upload className="mr-2 h-4 w-4" />
                Manage Documents
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/instructors/${instructorId}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Instructor
              </Link>
            </Button>
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          {instructor.first_name} {instructor.last_name}
        </h1>
        <p className="text-muted-foreground">Instructor details and management</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="professional">Professional Information</TabsTrigger>
          <TabsTrigger value="employment">Employment Details</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Date of Birth</h3>
                  <p className="text-muted-foreground">
                    {format(new Date(instructor.date_of_birth), "MMMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Languages</h3>
                  <p className="text-muted-foreground">
                    {instructor.languages || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">
                    {instructor.email_address || "Not specified"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">
                    {instructor.phone_number || "Not specified"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium">BAföG Status</h3>
                {instructor.bafoeg ? (
                  <div className="mt-2">
                    <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                      Receiving BAföG
                    </div>
                    {instructor.bafoeg_amount && (
                      <p className="mt-1 text-muted-foreground">
                        Amount: ${instructor.bafoeg_amount}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mt-2">
                    <div className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800">
                      Not Receiving BAföG
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professional">
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Qualifications and certifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Driver's License</h3>
                <div className="mt-2">
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      instructor.drivers_license
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {instructor.drivers_license ? "Yes" : "No"}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Insurance</h3>
                <p className="text-muted-foreground mt-2">{instructor.insurance}</p>
              </div>

              <div>
                <h3 className="font-medium">Licensed Until</h3>
                <p className="text-muted-foreground mt-2">
                  {instructor.licensed_until
                    ? format(new Date(instructor.licensed_until), "MMMM d, yyyy")
                    : "Not specified"}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employment">
          <Card>
            <CardHeader>
              <CardTitle>Employment Details</CardTitle>
              <CardDescription>Work and compensation information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Employment Type</h3>
                  <p className="text-muted-foreground capitalize">
                    {instructor.employment_type}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Salary</h3>
                  <p className="text-muted-foreground">
                    {instructor.salary ? `$${instructor.salary}` : "Not specified"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Study Start</h3>
                  <p className="text-muted-foreground">
                    {instructor.study_start
                      ? format(new Date(instructor.study_start), "MMMM d, yyyy")
                      : "Not specified"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Work Start</h3>
                  <p className="text-muted-foreground">
                    {instructor.work_start
                      ? format(new Date(instructor.work_start), "MMMM d, yyyy")
                      : "Not specified"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Workplace</h3>
                <p className="text-muted-foreground">
                  {instructor.workplace_id
                    ? `Location #${instructor.workplace_id}`
                    : "Not assigned"}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}