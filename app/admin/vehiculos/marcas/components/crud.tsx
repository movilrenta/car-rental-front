import { Sheet, SheetTrigger } from "@/components/sheet";
import React from "react";
import CRUD_Form from "./form";
import { Brand } from "@/types/car.interface";

export default function CRUD_Brand({
  children,
  Brand,
}: {
  children: React.ReactNode;
  Brand?: Brand;
}) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <CRUD_Form
        Brand={Brand}
      />
    </Sheet>
  );
}
