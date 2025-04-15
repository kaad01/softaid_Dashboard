import { Course } from "@/types/course";
import { Booking } from "@/types/booking";
import { User } from "@/types/user";

// Mock data for courses
export const courses: Course[] = [
  {
    id: "1",
    name: "CPR Training",
    description: "Learn essential CPR techniques for emergency situations",
    date: "2025-05-10",
    startTime: "09:00",
    endTime: "17:00",
    capacity: 20,
    enrolled: 15,
    trainerId: "1",
    trainerName: "John Doe",
    status: "open",
    location: "Main Training Center, Room 101",
    price: 199.99
  },
  {
    id: "2",
    name: "First Aid Basics",
    description: "Comprehensive introduction to first aid procedures",
    date: "2025-05-15",
    startTime: "10:00",
    endTime: "16:00",
    capacity: 15,
    enrolled: 15,
    trainerId: "2",
    trainerName: "Jane Smith",
    status: "fully_booked",
    location: "Health Sciences Building, Lab 3",
    price: 149.99
  },
  {
    id: "3",
    name: "Advanced Life Support",
    description: "Professional-level life support techniques for healthcare providers",
    date: "2025-05-20",
    startTime: "08:00",
    endTime: "18:00",
    capacity: 12,
    enrolled: 8,
    trainerId: "1",
    trainerName: "John Doe",
    status: "open",
    location: "Medical Training Facility, Suite 5",
    price: 299.99
  },
  {
    id: "4",
    name: "Emergency Response",
    description: "Rapid response protocols for emergency situations",
    date: "2025-05-25",
    startTime: "09:30",
    endTime: "16:30",
    capacity: 18,
    enrolled: 10,
    trainerId: "3",
    trainerName: "Robert Johnson",
    status: "open",
    location: "Community Center, Hall B",
    price: 179.99
  },
  {
    id: "5",
    name: "Pediatric First Aid",
    description: "Specialized first aid techniques for infants and children",
    date: "2025-06-01",
    startTime: "10:00",
    endTime: "15:00",
    capacity: 15,
    enrolled: 0,
    trainerId: null,
    trainerName: null,
    status: "closed",
    location: "Children's Hospital, Training Room",
    price: 169.99
  }
];

// Mock data for bookings
export const bookings: Booking[] = [
  {
    id: "1",
    userId: "101",
    userName: "Alice Smith",
    userEmail: "alice@example.com",
    courseId: "1",
    courseName: "CPR Training",
    date: "2025-05-10",
    status: "approved",
    createdAt: "2025-04-15T10:30:00Z"
  },
  {
    id: "2",
    userId: "102",
    userName: "Bob Johnson",
    userEmail: "bob@example.com",
    courseId: "1",
    courseName: "CPR Training",
    date: "2025-05-10",
    status: "pending",
    createdAt: "2025-04-16T14:20:00Z"
  },
  {
    id: "3",
    userId: "103",
    userName: "Carol Williams",
    userEmail: "carol@example.com",
    courseId: "2",
    courseName: "First Aid Basics",
    date: "2025-05-15",
    status: "approved",
    createdAt: "2025-04-10T09:15:00Z"
  },
  {
    id: "4",
    userId: "104",
    userName: "David Brown",
    userEmail: "david@example.com",
    courseId: "3",
    courseName: "Advanced Life Support",
    date: "2025-05-20",
    status: "rejected",
    createdAt: "2025-04-12T16:45:00Z",
    notes: "Applicant does not meet prerequisites"
  },
  {
    id: "5",
    userId: "105",
    userName: "Emma Davis",
    userEmail: "emma@example.com",
    courseId: "2",
    courseName: "First Aid Basics",
    date: "2025-05-15",
    status: "cancelled",
    createdAt: "2025-04-05T11:30:00Z",
    notes: "Cancelled by user"
  },
  {
    id: "6",
    userId: "106",
    userName: "Frank Miller",
    userEmail: "frank@example.com",
    courseId: "4",
    courseName: "Emergency Response",
    date: "2025-05-25",
    status: "pending",
    createdAt: "2025-04-18T13:10:00Z"
  }
];

// Mock data for trainers
export const trainers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    specialization: "CPR, Advanced Life Support",
    certifications: ["AHA Instructor", "PALS Provider"],
    availability: "Full-time",
    bio: "15+ years experience in emergency medical training"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    specialization: "First Aid, Pediatric Care",
    certifications: ["Red Cross Instructor", "PALS Instructor"],
    availability: "Weekends only",
    bio: "Pediatric nurse with 10 years of teaching experience"
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    specialization: "Emergency Response, Wilderness First Aid",
    certifications: ["Wilderness First Aid Instructor", "EMT-B"],
    availability: "Part-time",
    bio: "Former paramedic with wilderness rescue experience"
  }
];

// Mock data for users
export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-10T08:00:00Z"
  },
  {
    id: "2",
    name: "Trainer User",
    email: "trainer@example.com",
    role: "trainer",
    status: "active",
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "3",
    name: "John Doe",
    email: "john@example.com",
    role: "trainer",
    status: "active",
    createdAt: "2024-02-01T09:15:00Z"
  },
  {
    id: "4",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "trainer",
    status: "active",
    createdAt: "2024-02-05T14:20:00Z"
  },
  {
    id: "5",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "trainer",
    status: "inactive",
    createdAt: "2024-02-10T11:45:00Z"
  }
];

// Analytics data
export const analyticsData = {
  totalCourses: 5,
  totalBookings: 6,
  totalTrainers: 3,
  totalUsers: 5,
  revenueData: [
    { month: "Jan", revenue: 0 },
    { month: "Feb", revenue: 0 },
    { month: "Mar", revenue: 0 },
    { month: "Apr", revenue: 1500 },
    { month: "May", revenue: 4500 },
    { month: "Jun", revenue: 2000 },
    { month: "Jul", revenue: 0 },
    { month: "Aug", revenue: 0 },
    { month: "Sep", revenue: 0 },
    { month: "Oct", revenue: 0 },
    { month: "Nov", revenue: 0 },
    { month: "Dec", revenue: 0 },
  ],
  bookingStatusData: [
    { status: "Approved", count: 2 },
    { status: "Pending", count: 2 },
    { status: "Rejected", count: 1 },
    { status: "Cancelled", count: 1 },
  ],
  courseEnrollmentData: [
    { name: "CPR Training", enrolled: 15, capacity: 20 },
    { name: "First Aid Basics", enrolled: 15, capacity: 15 },
    { name: "Advanced Life Support", enrolled: 8, capacity: 12 },
    { name: "Emergency Response", enrolled: 10, capacity: 18 },
    { name: "Pediatric First Aid", enrolled: 0, capacity: 15 },
  ],
};