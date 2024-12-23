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

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <CRUD_Branch_Form
        address={address}
        branch={branch}
      />
    </Sheet>
  );
}
