import React from "react";
import { Sheet, SheetTrigger } from "@/components/sheet";
import CRUD_Carousel_Form from "./form";

export default function CRUD_Carousel({
  children,
  item,
}: {
  children: React.ReactNode;
  item?: any;
}) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <CRUD_Carousel_Form item={item}/>
    </Sheet>
  );
}
