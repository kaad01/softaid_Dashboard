export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "trainer";
  status: "active" | "inactive";
  createdAt: string;
}