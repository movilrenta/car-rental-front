"use client";

import React, { useState } from "react";
import { resetPassword } from "@/actions/users/users-mongo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types";

export const ResetPassword = ({user}: {user: User}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast();
  const [open, setOpen] = React.useState<boolean>(false)

  const handleReset = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true)
    const { _id, email} = user
    const resp = await resetPassword({_id, password:email})
    if(resp.status === 200){
      toast({
        title: `${resp.message}`
      })
      setOpen(false)
    }else{
      toast({
        title:`${resp.message}`
      })
    }
    setIsLoading(false)
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="border pointer-events-auto rounded-lg bg-blue-400 hover:bg-blue-700 duration-200 px-2 text-white p-1">
        Solicitar
      </DialogTrigger>
      <DialogContent  className="bg-gray-200 dark:bg-gray-800 max-w-80">
        <DialogHeader>
          <DialogTitle className="text-center">Reset contraseña</DialogTitle>
          <DialogDescription className="text-center">
            Va a resetear la contraseña del email <strong>{user?.email}</strong>, La nueva contraseña sera el mismo email, por favor solicitar al usuario el cambio de la misma con urgencia.
          </DialogDescription>
          <DialogFooter className="flex !flex-col !items-center !justify-center gap-1 !mt-4">
            <Button variant="default" disabled={isLoading} type="button" className="bg-red-600 hover:bg-red-700 duration-200 text-white" onClick={handleReset}>{isLoading ? "Reseteando...": "Aceptar"}</Button>
            <Button variant="link" onClick={() => setOpen(false)} className="!m-0">Cancelar</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
