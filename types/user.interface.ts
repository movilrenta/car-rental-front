export type UserRole = "vendedor" | "auditor" | "admin" | "superadmin";

export interface User {
  id: string;
  role: UserRole;
}
