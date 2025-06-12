import "../css/style.css";

import { Inter } from "next/font/google";

import Navbar from "../navbar";
import Footer from "../footer";
import { Toaster } from "@/components/ui/toaster";
import AdminButton from "../admin-button";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: {
    template: "%s | Movil Renta",
    default: "Movil Renta",
  },
};

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;

  return (
    <>
      <Script
        id="clarity-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ru80vy1wto");
            `,
        }}
      />
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
      <AdminButton />
      <Toaster />
    </>
  );
}
