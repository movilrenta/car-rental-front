'use client'
import React from "react";
import { Sheet, SheetTrigger } from "@/components/sheet";
import CRUD_Fecha_Form from "./form";
import { ROLES } from "@/constant/roles";

export default function CRUD_Fechas({
  children,
  fecha
}: {
  children: React.ReactNode;
  fecha?: any;
}) {
  const [open, setOpen] = React.useState(false)
  return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger onClick={() => setOpen(true)}>{children}</SheetTrigger>
        <CRUD_Fecha_Form fecha={fecha} onClose={() => setOpen(false)}/>
      </Sheet>
  );
}
