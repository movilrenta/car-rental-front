import {
  Sheet,
  SheetTrigger,
} from "@/components/sheet";
import { VehicleType } from "@/constant/cars";
import React from "react";
import CRUD_Form from "./form";

export default async function CRUD_Vehycle({
  children,
  car,
  groups,
  brands,
  branches,
}: {
  children: React.ReactNode;
  car?: VehicleType;
  groups: any;
  brands: any;
  branches: any;
}) {


  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <CRUD_Form
        groups={groups}
        brands={brands}
        branches={branches}
        car={car}
      />
    </Sheet>
  );
}
