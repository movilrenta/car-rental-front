"use client"

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { User, 
  UserRole 
} from "@/types";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { SheetFormUser } from "./SheetFormUser";
import { Button } from "@/components/ui/button";
import { ResetPassword } from "./ResetPassword";

interface TableProps {
  users: User[];
}

type Sortkey = "name" | "email" | "role";
type SortDirection = "asc" | "desc";

export const TableUsers = ({ users }: TableProps) => {
  const [sortKey, setSortKey] = React.useState<Sortkey>("name");
  const [sortDirection, setSortDirection] = React.useState<SortDirection>("asc");
  const [openSheet, setOpenSheet] = React.useState<boolean>(false);
  const [userEdit, setUserEdit] = React.useState<User | undefined>(undefined);

  const handleCreate = () => {
    setUserEdit(undefined);
    setOpenSheet(true);
  }

  const handleEdit = (user:User) => {
    setUserEdit(user)
    setOpenSheet(true);
  }
  // const [roleFilter, setRoleFilter] = React.useState<UserRole | "">("");

  const toggleSort = (key:Sortkey) => {
    if(sortKey === key){
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    }else{
      setSortKey(key);
      setSortDirection("asc")
    }
  }

  const sortedUsers = users.sort((a,b) => {
    const valueA = a[sortKey].toLowerCase();
    const valueB = b[sortKey].toLowerCase();

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;

    return 0;
  });

  //TODO: Por si agregamos mas condiciones para mostrar o no usuarios
  const visibleUsers = sortedUsers.filter((user) => user.role !== "superadmin")

  return (
    <div className="space-y-7 mt-6 md:mt-8">
      <div className="flex flex-col gap-6 md:gap-0 md:flex-row md:justify-between md:items-center">
        <h1 className="text-3xl font-semibold">Usuarios</h1>
        <Button type="button" onClick={handleCreate} variant="outline" className="bg-red-700 w-[150px] text-white">Crear Usuario</Button>
      </div>
    <Table className="w-full">
      <TableCaption>Lista de todos los usuarios.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-all" onClick={() => toggleSort("name")}><span className="flex items-center gap-x-2">Nombre {sortKey === "name" && (sortDirection === "asc" ? <IoMdArrowDropup/> : <IoMdArrowDropdown/>)}</span></TableHead>
          <TableHead className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-all" onClick={() => toggleSort("email")}><span className="flex items-center gap-x-2">Correo {sortKey === "email" && (sortDirection === "asc" ? <IoMdArrowDropup/> : <IoMdArrowDropdown/>)}</span></TableHead>
          <TableHead className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-all" onClick={() => toggleSort("role")}><span className="flex items-center gapx-2">Rol {sortKey === "role" && (sortDirection === "asc" ? <IoMdArrowDropup/> : <IoMdArrowDropdown/>)}</span></TableHead>
          <TableHead className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-all">Estado</TableHead>
          <TableHead className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-all text-right">Opciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {visibleUsers.map((user, index) => (
          <TableRow  key={index} className="cursor-pointer h-12 hover:bg-gray-200 dark:hover:bg-gray-800 duration-200" onClick={() => handleEdit(user)}>
          {/* <TableRow  key={user.id} className="cursor-pointer h-12 hover:bg-gray-200 dark:hover:bg-gray-800 duration-200"> */}
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              {
                user.isBlocked ? (<span className="text-red-500 font-semibold">Bloqueado</span>) : (<span className="text-green-500 font-semibold">Activo</span>)
              }
            </TableCell>
            <TableCell className="text-right">
              {/* <Button type="button" className="border p-1 pointer-events-auto" onClick={(e) => {
              e.stopPropagation()
              console.log('click')}}>Reset Password</Button> */}
              <ResetPassword/>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <SheetFormUser user={userEdit} open={openSheet} onOpenChange={setOpenSheet}/>
    </div>
  );
};