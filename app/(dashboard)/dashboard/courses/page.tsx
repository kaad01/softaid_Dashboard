"use client";

import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign 
} from "lucide-react";
import { courses, trainers } from "@/lib/data";
import { Course } from "@/types/course";
import { User } from "@/types/user";
import { toast } from "sonner";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [trainerFilter, setTrainerFilter] = useState("all");
  const [coursesList, setCoursesList] = useState<Course[]>(courses);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isTrainer, setIsTrainer] = useState(false);
  const [trainerCourses, setTrainerCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    capacity: 20,
    enrolled: 0,
    trainerId: "unassigned",
    trainerName: "",
    status: "open",
    location: "",
    price: 0
  });

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      setIsTrainer(parsedUser.role === "trainer");
      
      // If user is a trainer, filter courses for this trainer
      if (parsedUser.role === "trainer") {
        const trainer = trainers.find(t => t.email === parsedUser.email);
        if (trainer) {
          const filteredCourses = coursesList.filter(course => course.trainerId === trainer.id);
          setTrainerCourses(filteredCourses);
        }
      }
    }
  }, [coursesList]);

  // Filter courses based on search query and filters
  const filteredCourses = isTrainer 
    ? trainerCourses.filter((course) => {
        const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || course.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      })
    : coursesList.filter((course) => {
        const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || course.status === statusFilter;
        const matchesTrainer = trainerFilter === "all" || 
                              (trainerFilter === "unassigned" && !course.trainerId) ||
                              course.trainerId === trainerFilter;
        
        return matchesSearch && matchesStatus && matchesTrainer;
      });

  const handleCreateCourse = () => {
    // In a real app, this would be an API call
    const id = (Math.max(...coursesList.map(c => parseInt(c.id))) + 1).toString();
    
    // Find trainer name if trainerId is provided
    let trainerName = null;
    if (newCourse.trainerId && newCourse.trainerId !== "unassigned") {
      const trainer = trainers.find(t => t.id === newCourse.trainerId);
      trainerName = trainer ? trainer.name : null;
    }
    
    const course: Course = {
      id,
      name: newCourse.name || "",
      description: newCourse.description || "",
      date: newCourse.date || "",
      startTime: newCourse.startTime || "",
      endTime: newCourse.endTime || "",
      capacity: newCourse.capacity || 20,
      enrolled: 0,
      trainerId: newCourse.trainerId === "unassigned" ? null : newCourse.trainerId || null,
      trainerName: trainerName,
      status: newCourse.status as "open" | "closed" | "fully_booked" || "open",
      location: newCourse.location || "",
      price: newCourse.price || 0
    };
    
    setCoursesList([...coursesList, course]);
    setIsCreateDialogOpen(false);
    setNewCourse({
      name: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      capacity: 20,
      enrolled: 0,
      trainerId: "unassigned",
      trainerName: "",
      status: "open",
      location: "",
      price: 0
    });
    
    toast.success("Course created successfully");
  };

  const handleEditCourse = () => {
    if (!currentCourse) return;
    
    // Find trainer name if trainerId is provided
    let trainerName = null;
    if (currentCourse.trainerId && currentCourse.trainerId !== "unassigned") {
      const trainer = trainers.find(t => t.id === currentCourse.trainerId);
      trainerName = trainer ? trainer.name : null;
    }
    
    const updatedCourse = {
      ...currentCourse,
      trainerId: currentCourse.trainerId === "unassigned" ? null : currentCourse. trainerId,
      trainerName
    };
    
    setCoursesList(coursesList.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    setIsEditDialogOpen(false);
    setCurrentCourse(null);
    
    toast.success("Course updated successfully");
  };

  const handleDeleteCourse = () => {
    if (!currentCourse) return;
    
    setCoursesList(coursesList.filter(c => c.id !== currentCourse.id));
    setIsDeleteDialogOpen(false);
    setCurrentCourse(null);
    
    toast.success("Course deleted successfully");
  };

  const openEditDialog = (course: Course) => {
    // Make sure trainerId is never null for the form
    setCurrentCourse({
      ...course,
      trainerId: course.trainerId || "unassigned"
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (course: Course) => {
    setCurrentCourse(course);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground">
            {isTrainer ? "View your assigned courses" : "Manage your course listings and schedules"}
          </p>
        </div>
        {!isTrainer && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
                <DialogDescription>
                  Add a new course to your catalog. Fill in all the details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Course Name</Label>
                    <Input
                      id="name"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      placeholder="e.g., CPR Training"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newCourse.date}
                      onChange={(e) => setNewCourse({ ...newCourse, date: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newCourse.startTime}
                      onChange={(e) => setNewCourse({ ...newCourse, startTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newCourse.endTime}
                      onChange={(e) => setNewCourse({ ...newCourse, endTime: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    placeholder="Provide a detailed description of the course"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      value={newCourse.capacity}
                      onChange={(e) => setNewCourse({ ...newCourse, capacity: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newCourse.price}
                      onChange={(e) => setNewCourse({ ...newCourse, price: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="trainer">Assign Trainer</Label>
                    <Select 
                      onValueChange={(value) => setNewCourse({ ...newCourse, trainerId: value })}
                      value={newCourse.trainerId || "unassigned"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a trainer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        {trainers.map((trainer) => (
                          <SelectItem key={trainer.id} value={trainer.id}>
                            {trainer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      onValueChange={(value) => setNewCourse({ ...newCourse, status: value as "open" | "closed" | "fully_booked" })}
                      value={newCourse.status}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="fully_booked">Fully Booked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newCourse.location}
                    onChange={(e) => setNewCourse({ ...newCourse, location: e.target.value })}
                    placeholder="e.g., Main Training Center, Room 101"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCourse}>Create Course</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Management</CardTitle>
          <CardDescription>
            {isTrainer ? "View your assigned courses" : "View, filter, and manage all your courses"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select onValueChange={setStatusFilter} defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="fully_booked">Fully Booked</SelectItem>
                </SelectContent>
              </Select>
              {!isTrainer && (
                <Select onValueChange={setTrainerFilter} defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by trainer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Trainers</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {trainers.map((trainer) => (
                      <SelectItem key={trainer.id} value={trainer.id}>
                        {trainer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Date</TableHead>
                  {!isTrainer && <TableHead>Trainer</TableHead>}
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {new Date(course.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Clock className="mr-2 h-3 w-3" />
                          {course.startTime} - {course.endTime}
                        </div>
                      </TableCell>
                      {!isTrainer && (
                        <TableCell>
                          {course.trainerName || (
                            <span className="text-muted-foreground">Unassigned</span>
                          )}
                        </TableCell>
                      )}
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          {course.enrolled}/{course.capacity}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          course.status === "open" 
                            ? "bg-green-100 text-green-800" 
                            : course.status === "fully_booked" 
                            ? "bg-amber-100 text-amber-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {course.status === "open" 
                            ? "Open" 
                            : course.status === "fully_booked" 
                            ? "Fully Booked" 
                            : "Closed"}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {!isTrainer && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditDialog(course)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openDeleteDialog(course)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              // View course details
                              toast.success(`Viewing details for ${course.name}`);
                            }}
                          >
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isTrainer ? 5 : 6} className="h-24 text-center">
                      No courses found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Update the course details below.
            </DialogDescription>
          </DialogHeader>
          {currentCourse && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Course Name</Label>
                  <Input
                    id="edit-name"
                    value={currentCourse.name}
                    onChange={(e) => setCurrentCourse({ ...currentCourse, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={currentCourse.date}
                    onChange={(e) => setCurrentCourse({ ...currentCourse, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-startTime">Start Time</Label>
                  <Input
                    id="edit-startTime"
                    type="time"
                    value={currentCourse.startTime}
                    onChange={(e) => setCurrentCourse({ ...currentCourse, startTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-endTime">End Time</Label>
                  <Input
                    id="edit-endTime"
                    type="time"
                    value={currentCourse.endTime}
                    onChange={(e) => setCurrentCourse({ ...currentCourse, endTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentCourse.description}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-capacity">Capacity</Label>
                  <Input
                    id="edit-capacity"
                    type="number"
                    min="1"
                    value={currentCourse.capacity}
                    onChange={(e) => setCurrentCourse({ ...currentCourse, capacity: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={currentCourse.price}
                    onChange={(e) => setCurrentCourse({ ...currentCourse, price: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-trainer">Assign Trainer</Label>
                  <Select 
                    onValueChange={(value) => setCurrentCourse({ ...currentCourse, trainerId: value })}
                    value={currentCourse.trainerId || "unassigned"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {trainers.map((trainer) => (
                        <SelectItem key={trainer.id} value={trainer.id}>
                          {trainer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    onValueChange={(value) => setCurrentCourse({ ...currentCourse, status: value as "open" | "closed" | "fully_booked" })}
                    value={currentCourse.status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="fully_booked">Fully Booked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={currentCourse.location}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, location: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCourse}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Course Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentCourse && (
            <div className="py-4">
              <p className="font-medium">{currentCourse.name}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(currentCourse.date).toLocaleDateString()} ({currentCourse.startTime} - {currentCourse.endTime})
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCourse}>
              Delete Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}