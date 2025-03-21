import { GetCarsAction } from "@/actions/car";
import { Flota } from "@/view";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata:Metadata = {
  title:"Flota de vehículos | Movil Renta"
}

export default async function FlotaPage() {
  const resp = await GetCarsAction()
  if(!resp){
    redirect('/home')
  }
  return (
   <Flota cars={resp}/>
  );
}