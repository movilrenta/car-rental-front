import { FormConfirm, ListItems } from "@/app/[locale]/(public)/reservas/confirmar";
import BannerPage from "./banner-page";
import axios from "axios";
import { GetBranchesAction } from "@/actions/branchs";
import { getTranslations } from "next-intl/server";
const BACK = process.env.NEXT_PUBLIC_URL_BACK

export const Confirm = async () => {
  const {data} = await axios.get(`${BACK}aditionals`);
  const branches = await GetBranchesAction();
  const t = await getTranslations("ReservaPage.ConfirmarPage")

  return (
    <div className="w-full grid grid-cols-2 overflow-clip animate-fade-in mb-14">
      <div className="col-span-2">
      <BannerPage title={t("bannerTitle")} image="/images2/carBanner.webp" />
      </div>
      <div className="col-span-2 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4 max-w-7xl mx-auto p-4">
        <ListItems data={data} branches={branches}/>
				<FormConfirm/>
      </div>
    </div>
  );
};
