"use client";

import { useParams } from "next/navigation";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInstructor, useInstructors } from "@/hooks/useInstructors";
import { ChevronLeft, Upload } from "lucide-react";
import Link from "next/link";

export default function InstructorDocumentsPage() {
  const params = useParams();
  const instructorId = parseInt(params.id as string);
  const { instructor, isLoading } = useInstructor(instructorId);
  const { uploadDocument } = useInstructors();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        try {
          await uploadDocument.mutateAsync({
            instructorId,
            file,
          });
        } catch (error) {
          // Error is handled by the API client
        }
      }
    },
    [instructorId, uploadDocument]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  });

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
        <h1 className="text-3xl font-bold tracking-tight">
          Documents - {instructor.first_name} {instructor.last_name}
        </h1>
        <p className="text-muted-foreground">
          Manage instructor documents and certifications
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>
              Drag and drop files or click to select
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              {isDragActive ? (
                <p>Drop the files here...</p>
              ) : (
                <div className="space-y-2">
                  <p>Drag & drop files here, or click to select files</p>
                  <p className="text-sm text-muted-foreground">
                    Supported formats: PDF, JPG, PNG
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document List</CardTitle>
            <CardDescription>
              View and manage uploaded documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              Document management will be implemented when the backend API supports it
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}