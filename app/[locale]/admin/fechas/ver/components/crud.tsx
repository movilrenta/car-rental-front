import React from "react";
import { Sheet, SheetTrigger } from "@/components/sheet";
import CRUD_Fecha_Form from "./form";
import { ROLES } from "@/constant/roles";

export default function CRUD_Fechas({
  children,
  fecha,
  role,
}: {
  children: React.ReactNode;
  fecha?: any;
  role: string;
}) {
  return (
    (role === ROLES.SUPERADMIN || role === ROLES.ADMIN) && (
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <CRUD_Fecha_Form fecha={fecha} role={role} />
      </Sheet>
    )
  );
}
