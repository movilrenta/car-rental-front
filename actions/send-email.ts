import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { z } from "zod";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_KEY;

const formSchema = z.object({
  userEmail: z.string().email({message:"El email es obligatorio"}),
  firstName: z.string().min(3, "El nombre es obligatorio"),
  code: z.string().min(4, "El código de reserva es obligatorio")
})

export const sendEmail = async (values:z.infer<typeof formSchema>) => {
 
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
        message:"Se ha enviado un email con su código de reserva",
        description: "Por favor revise su bandeja de entrada"
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