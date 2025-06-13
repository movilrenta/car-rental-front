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
    auditor: true,
    vendedor: true,
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
    auditor: false,
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
    auditor: true,
    vendedor: true,
  },
  sucursales: {
    superadmin: true,
    admin: true,
    auditor: true,
    vendedor: true,
  },
  carousel: {
    superadmin: true,
    admin: true,
    auditor: false,
    vendedor: true,
  },
  log: {
    superadmin: false, //TODO PASAR A TRUE
    admin: false,//TODO PASAR A TRUE
    auditor: false,
    vendedor: false,
  },
  roles: {
    superadmin: false,//TODO PASAR A TRUE
    admin: false,//TODO PASAR A TRUE
    auditor: false,
    vendedor: false,
  },
  crearUsuarios: {
    superadmin: true,//TODO PASAR A TRUE
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