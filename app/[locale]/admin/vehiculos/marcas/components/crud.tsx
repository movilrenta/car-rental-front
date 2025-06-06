"use client";
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
  const [toggle, setToggle] = React.useState<boolean>(false)
  return (
    <Sheet open={toggle} onOpenChange={setToggle}>
      <SheetTrigger>{children}</SheetTrigger>
      <CRUD_Form
        onSuccess={() =>setToggle(false)}
        Brand={Brand}
      />
    </Sheet>
  );
}
