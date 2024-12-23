import { Sheet, SheetTrigger } from "@/components/sheet";
import React from "react";

import CRUD_Form from "./form";
import { Group } from "@/types/car.interface";

export default function CRUD_Group({
  children,
  Group,
}: {
  children: React.ReactNode;
  Group?: Group;
}) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <CRUD_Form
        Group={Group}
      />
    </Sheet>
  );
}
