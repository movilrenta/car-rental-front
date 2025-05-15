import { UserRole } from "@/types";

export const ROLES:Record<UserRole, string> = {
  vendedor: "vendedor",
  auditor:"auditor",
  admin: "admin",
  superadmin: "superadmin"
}