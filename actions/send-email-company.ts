import { messagesCompany } from '@/constant/email-messages-response';
import { CompanyFormValues } from '@/types';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_COMPANY = process.env.NEXT_PUBLIC_TEMPLATE_ID_COMPANY;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_KEY;

interface SendEmailProps {
  values:CompanyFormValues;
  locale?:'es' | 'en'
}

interface EmailResponse {
  ok:boolean;
  status:number;
  title:string;
  description:string;
}

export const sendEmailCompany = async ({values, locale='es'}:SendEmailProps):Promise<EmailResponse> => {
  const t = messagesCompany[locale];
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
        status: 200,
        ...t.success
      }
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log('EMAILJS FAILED...', err);
        return {
          ok:false,
          status: err.status,
          ...t.error
        }
      }
    
      console.log('ERROR', err);
      return {
        ok:false,
        status: 500,
        ...t.fatal
      }
    }
}