import { CompanyFormValues } from '@/types';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_COMPANY = process.env.NEXT_PUBLIC_TEMPLATE_ID_COMPANY;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_KEY;
interface EmailResponse {
  success:boolean;
  status:number;
}

export const sendEmailCompany = async (values:CompanyFormValues):Promise<EmailResponse> => {
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
        success:true,
        status: 200,
      }
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log('EMAILJS FAILED...', err);
        return {
          success:false,
          status: err.status,
        }
      }
    
      console.log('ERROR', err);
      return {
        success:false,
        status: 500,
      }
    }
}