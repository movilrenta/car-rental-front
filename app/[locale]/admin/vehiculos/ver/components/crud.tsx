"use client";
import React from "react";

import { Sheet, SheetTrigger } from "@/components/sheet";
import { VehicleType } from "@/constant/cars";
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
  const [open, setOpen] = React.useState<boolean>(false)
  return (
    (role === ROLES.superadmin || role === ROLES.admin) && (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>{children}</SheetTrigger>
        <CRUD_Form
          groups={groups}
          brands={brands}
          branches={branches}
          car={car}
          role={role}
          onClose={() => setOpen(false)}
        />
      </Sheet>
    )
  );
}
