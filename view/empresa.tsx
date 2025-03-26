import { PageUnderConstruction } from "@/components/page-under-construction";
import BannerPage from "./banner-page";

export const Empresa = () => {
  return (
    <div className="min-h-screen fade-in mx-auto my-4 space-y-2 md:space-y-6 text-gray-900 dark:text-white">
      <BannerPage title="Empresas" image="/images2/carBanner.webp" />
      <PageUnderConstruction />
    </div>
  );
};
