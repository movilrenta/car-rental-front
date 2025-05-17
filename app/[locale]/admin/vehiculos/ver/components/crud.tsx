import { Sheet, SheetTrigger } from "@/components/sheet";
import { VehicleType } from "@/constant/cars";
import React from "react";
import CRUD_Form from "./form";
import { UserRole } from "@/types";
import { ROLES } from "@/constant/roles";

export default function CRUD_Vehycle({
  children,
  car,
  groups,
  brands,
  branches,
  role,
}: {
  children: React.ReactNode;
  car?: VehicleType;
  groups: any;
  brands: any;
  branches: any;
  role: UserRole;
}) {
  return (
    (role === ROLES.superadmin || role === ROLES.admin) && (
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <CRUD_Form
          groups={groups}
          brands={brands}
          branches={branches}
          car={car}
          role={role}
        />
      </Sheet>
    )
  );
}
