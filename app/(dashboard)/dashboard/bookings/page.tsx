"use client";

import { useState } from "react";
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
  Search, 
  Calendar, 
  Download, 
  CheckCircle, 
  XCircle, 
  Info, 
  Mail 
} from "lucide-react";
import { bookings } from "@/lib/data";
import { Booking } from "@/types/booking";
import { toast } from "sonner";

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [bookingsList, setBookingsList] = useState<Booking[]>(bookings);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Filter bookings based on search query and filters
  const filteredBookings = bookingsList.filter((booking) => {
    const matchesSearch = booking.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesDate = !dateFilter || booking.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleApproveBooking = () => {
    if (!currentBooking) return;
    
    const updatedBookings = bookingsList.map(booking => 
      booking.id === currentBooking.id 
        ? { ...booking, status: "approved" as Booking["status"]} 
        : booking
    );
    
    setBookingsList(updatedBookings);
    setIsApproveDialogOpen(false);
    setCurrentBooking(null);
    
    toast.success("Booking approved successfully");
  };

  const handleRejectBooking = () => {
    if (!currentBooking) return;
    
    const updatedBookings = bookingsList.map(booking => 
      booking.id === currentBooking.id 
        ? { ...booking, status: "rejected" as Booking["status"], notes: rejectionReason } 
        : booking
    );
    
    setBookingsList(updatedBookings);
    setIsRejectDialogOpen(false);
    setCurrentBooking(null);
    setRejectionReason("");
    
    toast.success("Booking rejected successfully");
  };

  const openViewDialog = (booking: Booking) => {
    setCurrentBooking(booking);
    setIsViewDialogOpen(true);
  };

  const openApproveDialog = (booking: Booking) => {
    setCurrentBooking(booking);
    setIsApproveDialogOpen(true);
  };

  const openRejectDialog = (booking: Booking) => {
    setCurrentBooking(booking);
    setIsRejectDialogOpen(true);
  };

  const exportBookings = (format: "csv" | "pdf") => {
    // In a real app, this would generate and download a file
    toast.success(`Bookings exported as ${format.toUpperCase()}`);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
          <p className="text-muted-foreground">
            Manage course bookings and registrations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportBookings("csv")}>
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportBookings("pdf")}>
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
          <CardDescription>
            View, filter, and manage all course bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or course..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-[160px]"
                />
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">#{booking.id}</TableCell>
                      <TableCell>
                        <div>{booking.userName}</div>
                        <div className="text-xs text-muted-foreground">{booking.userEmail}</div>
                      </TableCell>
                      <TableCell>{booking.courseName}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeClass(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openViewDialog(booking)}
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                          {booking.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-600"
                                onClick={() => openApproveDialog(booking)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600"
                                onClick={() => openRejectDialog(booking)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toast.success(`Email sent to ${booking.userName}`)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No bookings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Booking Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Complete information about this booking
            </DialogDescription>
          </DialogHeader>
          {currentBooking && (
            <div className="py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Booking ID</h3>
                  <p>#{currentBooking.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold mt-1 ${getStatusBadgeClass(currentBooking.status)}`}>
                    {currentBooking.status.charAt(0).toUpperCase() + currentBooking.status.slice(1)}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">User</h3>
                  <p>{currentBooking.userName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p>{currentBooking.userEmail}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Course</h3>
                  <p>{currentBooking.courseName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                  <p>{new Date(currentBooking.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Created At</h3>
                  <p>{new Date(currentBooking.createdAt).toLocaleString()}</p>
                </div>
              </div>
              {currentBooking.notes && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                  <p className="mt-1">{currentBooking.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Booking Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this booking?
            </DialogDescription>
          </DialogHeader>
          {currentBooking && (
            <div className="py-4">
              <p className="font-medium">{currentBooking.userName}</p>
              <p className="text-sm text-muted-foreground">
                {currentBooking.courseName} - {new Date(currentBooking.date).toLocaleDateString()}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApproveBooking}>
              Approve Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Booking Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Booking</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this booking.
            </DialogDescription>
          </DialogHeader>
          {currentBooking && (
            <div className="py-4">
              <div className="mb-4">
                <p className="font-medium">{currentBooking.userName}</p>
                <p className="text-sm text-muted-foreground">
                  {currentBooking.courseName} - {new Date(currentBooking.date).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">Rejection Reason</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Please provide a reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectBooking}>
              Reject Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}