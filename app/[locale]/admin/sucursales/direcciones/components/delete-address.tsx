'use client'
import React from "react"
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
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import { DeleteAddressesAction } from "@/actions/address";

export default function DeleteAddress({children, id} : {children: React.ReactNode, id: number}) {
  const { toast } = useToast();
  async function handleDelete() {
    try {
      //console.log(id);
      const response = await DeleteAddressesAction(id)
      //console.log(response, "soy response")
      if(response.status === 200) {
          toast({
          title: "Sucursal eliminada",
          description: response.message,
        })
        return
      }
      } catch (error) {
        console.log(error)
        toast({
        title: "Error",
        description: "Ha ocurrido un error al eliminar la dirección",
        variant: "destructive",
      })
    }
  }


  return (
    <AlertDialog>
  <AlertDialogTrigger>{children}</AlertDialogTrigger>
  <AlertDialogContent className="bg-white dark:bg-zinc-800 max-w-[85%] sm:max-w-96">
    <AlertDialogHeader>
      <AlertDialogTitle>¿Esta seguro?</AlertDialogTitle>
      <AlertDialogDescription>
        Esta accion no se puede deshacer y eliminará al objeto de la base de datos.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className="border-none shadow-none">Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete} className="bg-red-700 text-white">Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}