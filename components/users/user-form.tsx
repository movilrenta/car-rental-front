"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoaderIcon } from "lucide-react";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "../input";
import { UserFormValues, userSchema } from "../schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { InputTogglePassword } from "../ui/input-toggle-password";

interface UserFromProps {
  initialValues?: UserFormValues;
  onSubmit: (values: UserFormValues) => Promise<void>;
  isEditing?: boolean;
}

export const UserForm = ({
  initialValues,
  onSubmit,
  isEditing = false,
}: UserFromProps) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: initialValues || {
      name: "",
      email: "",
      password: "",
      roles: "vendedor",
    },
  });


  React.useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input maxLength={35} placeholder="José Lopez" {...field} />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="joselopez@movilrenta.com"
                  readOnly={!!initialValues}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className={`col-span-1 ${isEditing ? "hidden" : ""}`}>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <InputTogglePassword field={field}/>
              </FormControl>
              <FormDescription className="text-xs">
                La contraseña debe tener al menos 8 caracteres
              </FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Eleja un rol</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Elegi uno por favor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="dark:bg-gray-700 dark:text-white">
                  <SelectItem value="vendedor">Vendedor</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="auditor">Auditor</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <Button
          onClick={form.handleSubmit(onSubmit)}
          variant="default"
          disabled={form.formState.isSubmitting}
          className="min-w-24 w-fit px-6 py-2 bg-red-700 text-white hover:bg-red-800 duration-200"
        >
          {form.formState.isSubmitting ? (
            <LoaderIcon className="w-4 h-4 animate-spin" />
          ) : isEditing ? (
            "Editar"
          ) : (
            "Crear"
          )}
        </Button>
      </form>
    </Form>
  );
};
