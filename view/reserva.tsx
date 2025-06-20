import ReservaConfirm from "@/components/reserva/reserva-confirm";
import PickAditional from "@/components/reserva/reserva-pick-aditional";
import PickCar from "@/components/reserva/reserva-pick-car";
import PickDate from "@/components/reserva/reserva-pick-date";
import BannerPage from "./banner-page";
import axios from "axios";
import { GetBranchesAction } from "@/actions/branchs";
import { getTranslations } from "next-intl/server";
const BACK = process.env.NEXT_PUBLIC_URL_BACK

export default async function ReservaView() {
  const aditionals = await axios.get(`${BACK}aditionals`)
  const branches = await GetBranchesAction()
  const t = await getTranslations("BookingPage")
  return (
    <div className="w-full flex flex-col items-center animate-fade-in mb-14">
    <BannerPage title={t("banner")} image="/images2/carBanner.webp"/>
    <div className="flex px-4 sm:px-14 flex-col gap-12 pt-12 max-w-7xl min-w-0 w-full">
      <PickDate branches={branches}/>
      <PickCar />
      <PickAditional data={aditionals.data}/>
    </div>
      <ReservaConfirm />
  </div>
  )
}