import { UserRole } from "@/types";

type Location = 'cars' | 'marcas' | 'grupos' | 'adicionales' | 'fechas' | 'sucursales' | 'direcciones' | 'carousel' | 'log' | 'roles' | 'crearUsuarios';

const ROL_AUTHORIZED: Record<Location, Record<UserRole, boolean>> = {
  cars: {
    superadmin: true,
    admin: true,
    auditor: true,
    vendedor: true,
  },
  marcas: {
    superadmin: true,
    admin: true,
    auditor: false,
    vendedor: false,
  },
  grupos: {
    superadmin: true,
    admin: true,
    auditor: true,
    vendedor: true,
  },
  adicionales: {
    superadmin: true,
    admin: true,
    auditor: true,
    vendedor: true,
  },
  fechas: {
    superadmin: true,
    admin: true,
    auditor: true,
    vendedor: true,
  },
  direcciones: {
    superadmin: true,
    admin: true,
    auditor: false,
    vendedor: false,
  },
  sucursales: {
    superadmin: true,
    admin: false,
    auditor: true,
    vendedor: false,
  },
  carousel: {
    superadmin: true,
    admin: true,
    auditor: true,
    vendedor: true,
  },
  log: {
    superadmin: true,
    admin: true,
    auditor: false,
    vendedor: false,
  },
  roles: {
    superadmin: true,
    admin: true,
    auditor: false,
    vendedor: false,
  },
  crearUsuarios: {
    superadmin: true,
    admin: true,
    auditor: false,
    vendedor: false,
  },
};

export default function getAuthorized(role: string | null, location: Location): boolean {
  if (!role) return false;
  const roleExists = role in ROL_AUTHORIZED[location as Location];
  if (!roleExists) return false;
  return ROL_AUTHORIZED[location as Location][role as UserRole];
}