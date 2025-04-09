import { GetBranchesAction } from "@/actions/branchs";
import { GetCarsAction } from "@/actions/car";
import { ReservaAddNew } from "@/components/reserva";
import { redirect } from "next/navigation";

export default async function AddReservationPage() {
  const cars = await GetCarsAction()
  const branches = await GetBranchesAction()
  if(!cars && !branches) redirect('/home')
  return (
    <div className="w-full p-4 space-y-4 md:container md:mx-auto lg:px-6">
      <h1 className="text-xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Agregar Reserva</h1>
      <h3 className="text-md md:text-lg text-gray-800 dark:text-gray-100 font-semibold">En esta sección puede crear una reserva completando los siguientes datos</h3>
      <p className="text-xs text-gray-600 dark:text-gray-100"><span className="text-red-700">*</span> campo requerido</p>
      <ReservaAddNew cars={cars} branches={branches}/>
    </div>
  );
}