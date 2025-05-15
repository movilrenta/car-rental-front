'use client'
import React from "react";
import { Sheet, SheetTrigger } from "@/components/sheet";
import CRUD_Fecha_Form from "./form";
import { ROLES } from "@/constant/roles";
import { UserRole } from "@/types";

export default function CRUD_Fechas({
  children,
  fecha,
  role,
}: {
  children: React.ReactNode;
  fecha?: any;
  role: UserRole;
}) {
  const [open, setOpen] = React.useState(false)
  return (
    (role === ROLES.superadmin || role === ROLES.admin) && (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger onClick={() => setOpen(true)}>{children}</SheetTrigger>
        <CRUD_Fecha_Form fecha={fecha} role={role} onClose={() => setOpen(false)}/>
      </Sheet>
    )
  );
}
