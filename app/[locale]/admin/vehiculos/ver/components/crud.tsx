"use client";
import React from "react";
import { Sheet, SheetTrigger } from "@/components/sheet";
import { VehicleType } from "@/constant/cars";
import CRUD_Form from "./form";


export default function CRUD_Vehycle({
  children,
  car,
  groups,
  brands,
  branches
}: {
  children: React.ReactNode;
  car?: VehicleType;
  groups: any;
  brands: any;
  branches: any;
}) {
  const [open, setOpen] = React.useState<boolean>(false)
  return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>{children}</SheetTrigger>
        <CRUD_Form
          groups={groups}
          brands={brands}
          branches={branches}
          car={car}
          onClose={() => setOpen(false)}
        />
      </Sheet>
  );
}
