interface MessagesContent {
  success: {
    title: string;
    description:string
  };
  error: {
    title: string;
    description: string;
  };
  fatal: {
    title: string;
    description:string;
  }
}
export const messagesCompany:Record<"es" | "en", MessagesContent> = {
  es: {
    success: {
      title: "Mensaje enviado correctamente",
      description: "Pronto un asesor se pondrá en contacto."
    },
    error: {
      title: "Hubo un problema al enviar el mensaje!",
      description: "Por favor reintente nuevamente"
    },
    fatal: {
       title: "Hubo un problema al enviar el mensaje!",
       description: "Por favor contactese a traves de los otros medios."
    }
  },
  en: {
    success: {
      title:"Your message was sent successfully",
      description: "An advisor will be in touch soon."
    },
    error: {
      title: "There was a problem sending the message.",
      description: "Please try again later"
    },
    fatal: {
       title: "There was a problem sending the message.",
       description: "Please contact us through other available channels."
    }
  }
}