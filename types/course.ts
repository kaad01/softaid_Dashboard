export interface Course {
  id: string;
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  enrolled: number;
  trainerId: string | null;
  trainerName: string | null;
  status: "open" | "closed" | "fully_booked" | "cancelled";
  location: string;
  price: number;
}