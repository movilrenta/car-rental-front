"use client";

import React from "react";
import { Sheet, SheetTrigger } from "@/components/sheet";

import CRUD_Form from "./form";
import { Group } from "@/types/car.interface";

export default function CRUD_Group({
  children,
  Group,
}: {
  children: React.ReactNode;
  Group?: Group;
}) {
  
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <CRUD_Form
        Group={Group}
        onClose={setOpen}
      />
    </Sheet>
  );
}
