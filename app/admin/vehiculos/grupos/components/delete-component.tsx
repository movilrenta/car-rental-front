"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { deleteGroup } from "@/actions";

export default function DeleteComponent({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
}) {
  const { toast } = useToast();
  async function handleDelete() {
    try {
      const resp = await deleteGroup(id)
      if(resp.ok){
        toast({
          title: "Grupo eliminado",
          description: "El grupo ha sido eliminado correctamente",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al eliminar el Grupo",
        variant: "destructive",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-zinc-800 max-w-[85%] sm:max-w-96">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Esta seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta accion no se puede deshacer y eliminará al objeto de la base de
            datos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-none shadow-none">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-700 text-white"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
