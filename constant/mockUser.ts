import { User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    role: "admin",
    password: "Movilrenta123",
    isBlocked: false,
  },
  {
    id: "2",
    name: "Ana Torres",
    email: "ana@example.com",
    role: "vendedor",
    password: "Movilrenta123",
    isBlocked: true,
  },
  {
    id: "3",
    name: "Pedro Guitierrez",
    email: "perdro@example.com",
    role: "auditor",
    password: "Movilrenta123",
    isBlocked: false,
  },
];