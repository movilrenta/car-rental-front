import React from "react";
import {
  Sheet,
  SheetTrigger,
} from "@/components/sheet";
import CRUD_Rate_Form from "./form";

export default function CRUD_Rates({
  children,
  rate
}: {
  children: React.ReactNode;
  rate?: any;
}) {

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <CRUD_Rate_Form
        rate={rate}
      />
    </Sheet>
  );
}
