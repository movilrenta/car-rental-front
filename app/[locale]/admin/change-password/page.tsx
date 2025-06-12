'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/form";
import { Lock } from "lucide-react";
import { NewPasswordFormSchema } from "./schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { InputTogglePassword } from "@/components/ui/input-toggle-password";
import { changePasswordAction } from "@/actions/users/users-mongo/update-user";
import { useToast } from "@/hooks/use-toast";

export default function ChangePassword() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof NewPasswordFormSchema>>({
    resolver: zodResolver(NewPasswordFormSchema),
    defaultValues: {
      _id: "id",
      actualPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof NewPasswordFormSchema>) => {
    try {
      const res = await changePasswordAction(data)
      if(res.status === 200) {
        toast({
          variant:"default",
          title: "Actualización de contraseña",
          description: res.message
            })
      } else {
        toast({
          variant:"destructive",
          title: "Error",
          description: res.message
            })
      }
      form.reset();
    } catch (error) {
      console.log(error);
       toast({
        variant:"default",
        title: "Error",
        description: "Error en la actualizacion"
          })
    }
  };

  return (
    <div className="flex flex-col items-center pt-8">
      <Lock className="stroke-white text-white bg-red-700 p-3 w-14 h-14 rounded-lg"/>
      <h1 className="font-semibold">Cambiar Contraseña</h1>
      <p>Actualiza tu contraseña para mantener tu cuenta segura</p>
      <div className="min-w-72 shadow dark:shadow-white rounded-md mt-6 p-4">
        <Form {...form} >
          <form className="w-full flex flex-col gap-4 items-center min-w-72 !text-start ">
            <FormField
              control={form.control}
              name="actualPassword"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-end">
                  <FormLabel>Contraseña Actual</FormLabel>
                  <FormControl>
                    <InputTogglePassword className="form-input w-full" field={field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-end">
                  <FormLabel>Nueva Contraseña</FormLabel>
                  <FormControl>
                    <InputTogglePassword className="form-input w-full" field={field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatNewPassword"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-end">
                  <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                  <FormControl>
                    <InputTogglePassword className="form-input w-full" field={field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />

            <Button
          onClick={form.handleSubmit(onSubmit)}
          variant="default"
          disabled={form.formState.isSubmitting}
          className="col-span-8 min-w-52 w-fit px-6 py-2 my-4 bg-red-700 text-white hover:bg-red-800 duration-200"
        >
          {form.formState.isSubmitting ? "Actualizando": "Actualizar contraseña"}
        </Button>
            </form>
            </Form>
      </div>
    </div>
  )
}