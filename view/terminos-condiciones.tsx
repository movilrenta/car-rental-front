import React from "react";
import BannerPage from "./banner-page";
import { ListRender } from "@/components/list-render";
import { getTranslations } from "next-intl/server";

interface ListItem {
  title: string;
  content?: string;
  subItems?: ListItem[];
}

export const TerminosCondiciones = async () => {
  const t = await getTranslations("AyudaPage");
  const termsAndConditions: ListItem[] = t.raw("terminosYCondiciones.termsAndConditions");

  return (
    <div className="min-h-screen mb-7 fade-in space-y-2 md:space-y-6 text-gray-900 dark:text-white">
      <BannerPage
        title={t("terminosYCondiciones.bannerTitle")}
        image="/images2/carBanner.webp"
      />
      <div className="max-w-7xl mx-auto">
        <ListRender items={termsAndConditions} />
      </div>
    </div>
  );
};
