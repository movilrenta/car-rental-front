'use client'

import React from "react";
import {
  Sheet,
  SheetTrigger,
} from "@/components/sheet";
import CRUD_Address_Form from "./form";

export default function CRUD_Addresses({
  children,
  address
}: {
  children: React.ReactNode;
  address?: any;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger onClick={() => setOpen(true)}>{children}</SheetTrigger>
      <CRUD_Address_Form
        address={address}
        onClose={() => setOpen(false)}
      />
    </Sheet>
  );
}
