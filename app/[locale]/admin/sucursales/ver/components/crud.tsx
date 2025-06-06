'use client'
import React from "react";
import {
  Sheet,
  SheetTrigger,
} from "@/components/sheet";
import CRUD_Branch_Form from "./form";

export default function CRUD_Branches({
  children,
  address,
  branch
}: {
  children: React.ReactNode;
  address: any;
  branch?: any;
}) {

  const [open, setOpen] = React.useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger onClick={() => setOpen(true)}>{children}</SheetTrigger>
      <CRUD_Branch_Form
        address={address}
        branch={branch}
        onClose={() => setOpen(false)}
      />
    </Sheet>
  );
}
