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

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <CRUD_Address_Form
        address={address}
      />
    </Sheet>
  );
}
