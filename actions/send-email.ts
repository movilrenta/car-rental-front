import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { getTranslations } from 'next-intl/server';
import { z } from "zod";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_KEY;

const formSchema = z.object({
  userEmail: z.string().trim().email({message:"El email es obligatorio"}),
  firstName: z.string().min(3, "El nombre es obligatorio"),
  code: z.string().min(4, "El código de reserva es obligatorio")
})

export const sendEmail = async (values:z.infer<typeof formSchema>) => {
  const t = await getTranslations("PaymentsPage.sendEmail")
    try {
      await emailjs.send(
        `${SERVICE_ID}`,
        `${TEMPLATE_ID}`,
        values,
        {
          publicKey: `${PUBLIC_KEY}`,
        },
      );
      return {
        ok:true,
        message:t("success.message"),
        description: t("success.description")
      }
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log('EMAILJS FAILED...', err);
        return {
          ok:false,
          message: t("error.message")
        }
      }
    
      console.log('ERROR', err);
      return {
        ok:false,
        message:t("error.message")
      }
    }
}