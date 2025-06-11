"use client";

import React from "react";
import { createUpdateUser } from "@/actions";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  //SheetTrigger,
} from "@/components/sheet";
import { UserForm } from "@/components/users/user-form";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types";
import { UserFormValues } from "@/components/schemas";
import { createUser, updateUser } from "@/actions/users/users-mongo";

interface SheetProps {
  user?: User;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const SheetFormUser = ({ user, open, onOpenChange }: SheetProps) => {
  const { toast } = useToast();

  const userTransformValues = (user: User): UserFormValues => ({
    id: user.id ?? "",
    name: user.name,
    email: user.email,
    isBloqued: user.isBlocked,
    roles: user.role,
    password: user.password,
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* <SheetTrigger asChild>
      </SheetTrigger> */}
      <SheetContent>
        <SheetHeader className="mb-5">
          <SheetTitle>
            {user ? `Editando usuario ${user.name}` : "Crear un nuevo usuario"}
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <UserForm
          initialValues={user ? userTransformValues(user) : undefined}
          isEditing={!!user}
          onSubmit={async (values) => {
            // const resp = await createUpdateUser(values);
            if (!user) {
              const resp = await createUser(values);
              if (resp.status === 201) {
                toast({
                  variant: "default",
                  title: resp.message,
                });
                onOpenChange?.(false);
              } else {
                toast({
                  variant: "destructive",
                  title: resp.message,
                  description: `Código: ${resp.status}`,
                });
              }
            } else {
              const resp = await updateUser(userTransformValues(user!));
              if (resp.status === 201) {
                toast({
                  variant: "default",
                  title: resp.message,
                });
                onOpenChange?.(false);
              } else {
                toast({
                  variant: "destructive",
                  title: resp.message,
                  description: `Código: ${resp.status}`,
                });
              }
            }
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
