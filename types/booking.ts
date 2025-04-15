export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  courseId: string;
  courseName: string;
  date: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  createdAt: string;
  notes?: string;
}