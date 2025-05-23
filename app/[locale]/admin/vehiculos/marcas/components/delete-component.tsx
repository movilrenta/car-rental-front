"use client";
import React from "react";
import { DeleteCarAction } from "@/actions/car";
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
import { deleteBrand } from "@/actions";

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
      const resp = await deleteBrand(id);
      if (resp.status === 200) {
        toast({
          variant: "default",
          title: resp.message,
        });
      } else {
        toast({
          variant: "default",
          title: resp.message,
          description: `Código: ${resp.status}`
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al eliminar la Marca",
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
