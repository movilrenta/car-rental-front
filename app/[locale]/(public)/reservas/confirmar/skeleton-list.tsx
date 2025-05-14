import React from "react";
import { SkeletonItem } from "./skeleton-item";
import { useTranslations } from "next-intl";

export const SkeletonList = () => {
  //!Falta acomodar separacion de items y probar la altura del list
  const t = useTranslations("ReservaPage.ConfirmarPage");

  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-xl md:text-2xl text-gray-900 dark:text-slate-100 mb-5">
        {t("subtitleCheck.title")}<span className="font-semibold">{" "}{t("subtitleCheck.span")}</span>
      </h2>
    <ul className="flex w-full flex-col gap-10">
      {Array.from({ length: 4 }).map((_, index) => (
        <React.Fragment key={index}>
          <SkeletonItem />
          {index < 3 && (
            <hr className="w-full h-[2px] animate-pulse bg-gray-500 dark:bg-slate-100"/>
          )}
        </React.Fragment>
      ))}
    </ul>
    </div>
  );
};