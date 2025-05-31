export type UserRole = "vendedor" | "auditor" | "admin" | "superadmin";

export interface User {
  id?: string;
  role: "vendedor" | "auditor" | "admin";
  name:string;
  email:string;
  password:string;
  isBlocked:boolean;
}
