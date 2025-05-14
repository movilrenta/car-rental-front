import { CompanyFormValues } from '@/types';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { z } from "zod";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_COMPANY = process.env.NEXT_PUBLIC_TEMPLATE_ID_COMPANY;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_KEY;

export const sendEmailCompany = async (values:CompanyFormValues) => {
 
    try {
      await emailjs.send(
        `${SERVICE_ID}`,
        `${TEMPLATE_ID_COMPANY}`,
        values,
        {
          publicKey: `${PUBLIC_KEY}`,
        },
      );
      return {
        ok:true,
        message:"Mensaje enviado correctamente",
        description: "Pronto un asesor se pondrá en contacto."
      }
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log('EMAILJS FAILED...', err);
        return {
          ok:false,
          message: "Hubo un problema al enviar el mensaje!"
        }
      }
    
      console.log('ERROR', err);
      return {
        ok:false,
        message:"Hubo un problema al enviar el mensaje."
      }
    }
}