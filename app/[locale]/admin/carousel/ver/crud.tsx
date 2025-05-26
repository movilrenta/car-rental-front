'use client'
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
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger onClick={() => setOpen(true)}>{children}</SheetTrigger>
      <CRUD_Carousel_Form item={item} onClose={() => setOpen(false)}/>
    </Sheet>
  );
}
