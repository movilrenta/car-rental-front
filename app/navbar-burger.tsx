'use client';
import { LuX } from "react-icons/lu";
import NavbarLinks from "./navbar-links";
import React from "react";
import ThemeToggle from "@/components/theme-toggle";
import { FaBurger } from "react-icons/fa6";
import { Menu } from "lucide-react";

export default function BurgerMenu() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex justify-end w-fit sm:hidden">
      <div className="flex justify-center items-center px-4">
        <Menu onClick={() => setOpen(true)} className="w-11 h-11"/>
      </div>
      { open && <div className="fixed flex justify-between inset-0 z-[99] bg-black/90">
        <div>
          <ThemeToggle />
          <NavbarLinks burger={true}/>
        </div>
        <LuX onClick={() => setOpen(false)} className="text-white w-11 h-11 m-4"/>

      </div>}
    </div>
  )
}