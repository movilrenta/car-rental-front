import { z } from "zod";

export const getCompanySchema = (t?: (key: string) => string) => {
  return z.object({
    name: z
      .string()
      .min(2, t ? t("validations.name.min") : "El nombre es obligatorio")
      .max(
        40,
        t
          ? t("validations.name.max")
          : "El nombre no puede exceder los 40 caracteres"
      )
      .trim(),
    email: z
      .string()
      .email(
        t ? t("validations.email.min") : "El correo electrónico es obligatorio"
      )
      .max(
        60,
        t
          ? t("validations.email.max")
          : "El correo electrónico no puede exceder los 60 caracteres"
      )
      .trim(),
    phone: z
      .string()
      .min(
        10,
        t
          ? t("validations.phone.min")
          : "El teléfono debe tener al menos 10 dígitos"
      )
      .max(
        21,
        t
          ? t("validations.phone.max")
          : "El teléfono no puede tener más de 21 dígitos"
      )
      .trim(),
    company: z
      .string()
      .min(2, t ? t("validations.company.min") : "El campo es obligatorio")
      .max(
        40,
        t
          ? t("validations.company.max")
          : "El campo no puede exceder los 40 caracteres"
      )
      .trim(),
    description: z
      .string()
      .min(
        10,
        t ? t("validations.description.min") : "El detalle es demasiado corto"
      )
      .max(
        500,
        t ? t("validations.description.max") : "El detalle es demasiado extenso"
      ),
  });
};

export type CompanyFormValues = z.infer<
  Awaited<ReturnType<typeof getCompanySchema>>
>;
