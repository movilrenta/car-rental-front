export type UserRole = "vendedor" | "auditor" | "admin" | "superadmin";

export interface User {
  _id: string;
  id?: string;
  role: "vendedor" | "auditor" | "admin" | "superadmin";
  name:string;
  email:string;
  password:string;
  isBloqued:boolean;
}
