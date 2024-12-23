import { FormConfirm, ListItems } from "@/app/(public)/reservas/confirmar";
import BannerPage from "./banner-page";
import axios from "axios";
import { GetBranchesAction } from "@/actions/branchs";
const BACK = process.env.NEXT_PUBLIC_URL_BACK

export const Confirm = async () => {
  const {data} = await axios.get(`${BACK}aditionals`);
  const branches = await GetBranchesAction()

  return (
    <div className="w-full flex flex-col items-center overflow-clip animate-fade-in mb-14">
      <BannerPage title="Su reserva" image="/images2/carBanner.webp"/>
      <div className="px-4 sm:px-14 py-8 lg:mx-auto flex flex-col lg:flex-row gap-12 mt-4">
        <div className="w-full mb-6 md:mb-0 md:px-4">
          <h2 className="text-xl md:text-2xl text-gray-900 dark:text-slate-100 mb-5">
            Revise y <span className="font-semibold">confirme su reserva</span>
          </h2>
          <ListItems data={data} branches={branches}/>
        </div>
        <div className="w-full md:px-4">
          <h2 className="text-xl md:text-2xl text-gray-900 dark:text-slate-100 mb-5">
            Datos <span className="font-semibold">personales</span>
          </h2>
					<FormConfirm/>
        </div>
      </div>
    </div>
  );
};
