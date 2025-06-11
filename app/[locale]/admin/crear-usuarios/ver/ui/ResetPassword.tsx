"use client";

import { resetPassword } from "@/actions/users/users-mongo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { useToast } from "@/hooks/use-toast";

export const ResetPassword = () => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState<boolean>(false)
  const handleReset = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    
    // const resp = await resetPassword(id);
    // if (resp.status === 200) {
    //   toast({
    //     variant: "default",
    //     title: resp.message,
    //   });
    //   setOpen(false)
    // } else {
    //   toast({
    //     variant: "destructive",
    //     title: resp.message,
    //     description: `Código: ${resp.status}`,
    //   });
    // }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={(e) => e.stopPropagation()} className="border rounded-lg p-1">
        Reset password
      </DialogTrigger>
      <DialogContent  className="bg-gray-200 dark:bg-gray-800 max-w-80">
        <DialogHeader>
          <DialogTitle className="text-center">¿Resetear contraseña?</DialogTitle>
          <DialogDescription>
            titulo
          </DialogDescription>
          <DialogFooter className="flex flex-col items-center gap-1 mt-2">

            <Button variant="outline" type="button" onClick={handleReset}>Aceptar</Button>
            <DialogClose asChild>
              <Button onClick={(e) => e.stopPropagation()}>Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
