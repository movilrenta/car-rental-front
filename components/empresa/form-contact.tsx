"use client";

import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { companySchema } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { useToast } from "@/hooks/use-toast";
import { sendEmailCompany } from "@/actions";

interface EmpresasFormText {
  name: {
    label: string;
    placeholder: string;
  };
  email: {
    label: string;
    placeholder: string;
  };
  phone: {
    label: string;
    placeholder: string;
  };
  company: {
    label: string;
    placeholder: string;
  };
  description: {
    label: string;
    placeholder: string;
  };
  buttonConfirmText: string;
}

export const FormContact: React.FC<{ text: EmpresasFormText }> = ({ text }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof companySchema>) {
    console.log(values);
    try {
      const resp = await sendEmailCompany(values);
      if (!resp.ok) {
        toast({
          variant: "default",
          title: resp.message,
        });
      } else {
        toast({
          variant: "default",
          title: resp.message,
          description: resp.description,
        });
      }
    } catch (error) {
      toast({
        variant:"destructive",
        title: "No se pudo enviar el mensaje",
        description:"Intente nuevamente más tarde"
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-2 md:gap-4 lg:gap-6 max-w-3xl mx-auto"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-full md:col-span-6">
              <FormLabel>{text.name.label}</FormLabel>
              <FormControl>
                <Input placeholder={text.name.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-full md:col-span-6">
              <FormLabel>{text.email.label}</FormLabel>
              <FormControl>
                <Input placeholder={text.email.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-full md:col-span-6">
              <FormLabel>{text.phone.label}</FormLabel>
              <FormControl>
                <Input placeholder={text.phone.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="company"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-full md:col-span-6">
              <FormLabel>{text.company.label}</FormLabel>
              <FormControl>
                <Input placeholder={text.company.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>{text.description.label}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={text.description.placeholder}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-full flex justify-end">
          <button
            type="submit"
            className={clsx(
              "w-full md:w-[200px] rounded-lg bg-red-500 dark:hover:bg-red-700 py-2 text-white shadow-md",
              {
                "bg-red-300 cursor-not-allowed": form.formState.isSubmitting,
              }
            )}
            disabled={form.formState.isSubmitting}
          >
            {text.buttonConfirmText}
          </button>
        </div>
      </form>
    </Form>
  );
};
