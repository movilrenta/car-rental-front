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
import { deleteImageAction, destroyImage } from "@/actions/upload-image";

export default function DeleteCarousel({children, id, path} : {children: React.ReactNode, id: number, path: string}) {
  const { toast } = useToast();
  async function handleDelete() {
    try {
      const response = await destroyImage(path)
      const response_2 = await deleteImageAction(id)
      //const response = {status: 200, message: path}
      
      if(response.status === 200 && response_2.status === 200) {
          toast({
          title: "Imagen eliminado",
          description: "La imagen ha sido eliminada correctamente",
        })
        //window.location.reload();
        return 
      }
      } catch (error) {
        console.log(error)
        toast({
        title: "Error",
        description: "Ha ocurrido un error al eliminar la imagen",
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