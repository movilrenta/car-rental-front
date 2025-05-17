"use client";

import clsx from "clsx";
import { FaUser, FaPhoneAlt, FaIndustry, FaPencilAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CompanyFormValues, getCompanySchema } from "@/types";
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
import { useLocale, useTranslations } from "next-intl";

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
  buttonSendingText: string;
}

export const FormContact: React.FC<{ text: EmpresasFormText }> = ({ text }) => {
  const { toast } = useToast();
  const t = useTranslations("ContactoPage.form");
  const locale = useLocale() as 'es' | 'en';

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(getCompanySchema(t)),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      description: "",
    },
  });

  async function onSubmit(values: CompanyFormValues) {
    try {
      const resp = await sendEmailCompany({values, locale});
      if (!resp.ok) {
        toast({
          variant: "default",
          title: resp.title,
          description: `${resp.description} + code: ${resp.status}`
        });
      } else {
        toast({
          variant: "default",
          title: resp.title,
          description: resp.description,
        });
        form.reset()
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
        className="grid grid-cols-12 gap-4 lg:gap-6 max-w-3xl mx-auto"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-full md:col-span-6">
              <FormLabel className="flex items-center gap-x-2"><FaUser className="hidden md:block"/>{t("labels.name")}</FormLabel>
              <FormControl>
                <Input placeholder={text.name.placeholder} {...field} />
              </FormControl>
              <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis"/>
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-full md:col-span-6">
              <FormLabel className="flex items-center gap-x-2"><IoIosMail className="hidden md:block"/>{t("labels.email")}</FormLabel>
              <FormControl>
                <Input placeholder={text.email.placeholder} {...field} />
              </FormControl>
              <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-full md:col-span-6">
              <FormLabel className="flex items-center gap-x-2"><FaPhoneAlt className="hidden md:block"/>{t("labels.phone")}</FormLabel>
              <FormControl>
                <Input placeholder={text.phone.placeholder} {...field} />
              </FormControl>
              <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
            </FormItem>
          )}
        />
        <FormField
          name="company"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-full md:col-span-6">
              <FormLabel className="flex items-center gap-x-2"><FaIndustry className="hidden md:block"/>{t("labels.company")}</FormLabel>
              <FormControl>
                  <Input placeholder={t("placeholders.company")} {...field} />
              </FormControl>
              <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel className="flex items-center gap-x-2"><FaPencilAlt className="hidden md:block"/>{t("labels.description")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("placeholders.description")}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
            </FormItem>
          )}
        />
         <div className="col-span-full flex justify-end mt-2 md:mt-0">
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
            {form.formState.isSubmitting ? t("buttons.bSending") : t("buttons.bConfirm")}
          </button>
        </div>
      </form>
    </Form>
  );
};
