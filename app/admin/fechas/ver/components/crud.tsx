import React from "react";
import { Sheet, SheetTrigger } from "@/components/sheet";
import CRUD_Fecha_Form from "./form";

export default function CRUD_Fechas({
  children,
  fecha,
}: {
  children: React.ReactNode;
  fecha?: any;
}) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <CRUD_Fecha_Form fecha={fecha} />
    </Sheet>
  );
}
