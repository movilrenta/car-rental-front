"use client";

import React from "react";
import { createUpdateUser } from "@/actions";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet";
import { Button } from "@/components/ui/button";
import { UserForm } from "@/components/users/user-form";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types";
import { UserFormValues } from "@/components/schemas";

interface SheetProps {
  user?: User;
  open:boolean;
  onOpenChange?:(open:boolean) => void;
}

export const SheetFormUser = ({ user, open, onOpenChange }: SheetProps) => {
  const { toast } = useToast();

  const userTransformValues = (user: User): UserFormValues => ({
    name: user.name,
    email: user.email,
    isBloqued: user.isBlocked,
    roles: user.role,
    password: user.password,
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-5">
          <SheetTitle>
            {user ? "Editar usuario" : "Crear un nuevo usuario"}
          </SheetTitle>
          <SheetDescription>
            Aquí podra crear/editar un usuario.
          </SheetDescription>
        </SheetHeader>

        <UserForm
          initialValues={user ? userTransformValues(user) : undefined}
          isEditing={!!user}
          onSubmit={async (values) => {
            const resp = await createUpdateUser(values);
            console.log(resp);
            if (resp.status === 201) {
              toast({
                variant: "default",
                title: resp.message,
              });
            } else {
              toast({
                variant: "destructive",
                title: resp.message,
                description: `Código: ${resp.status}`,
              });
            }
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
