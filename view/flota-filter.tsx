'use client'
import SimpleCardCar from "@/components/flota/car-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

export default function FlotaFilter({agrupedCars}: {agrupedCars: any}){
  const searchParams = useSearchParams();
  const router = useRouter()
  const [filter, setFilter] = useState(searchParams.get("filter") || "all");

  function handleFilter(newFilter: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("filter") === newFilter) {
      params.delete("filter");
      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : window.location.pathname; 
      setFilter("all")
      router.push(newUrl, { scroll: false });
    } else {
      params.set("filter", newFilter);
      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : window.location.pathname; 
      setFilter(newFilter)
      router.push(newUrl, { scroll: false });
    }
  
  }

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4 grid grid-cols-12 gap-6">
      <div className="col-span-12 flex flex-wrap justify-center gap-2 w-full max-h-fit">
        <Button variant="outline" className={`${filter === "car" ? "bg-red-700 text-white" : "group"} hover:text-white hover:bg-red-500 duration-200 w-[120px] min-w-[120px]`} onClick={() => handleFilter("car")}>Autos {filter === "car" ? <IoMdCloseCircle  className="" /> : <ArrowLeft className="hidden group-hover:inline stroke-2" />}</Button>
        <Button variant="outline" className={`${filter === "utility" ? "bg-red-700 text-white" : "group"} hover:text-white hover:bg-red-500 duration-200 w-[120px] min-w-[120px]`} onClick={() => handleFilter("utility")}>Utilitarios {filter === "utility" ? <IoMdCloseCircle  className="" /> : <ArrowLeft className="hidden group-hover:inline stroke-2" />}</Button>
        <Button variant="outline" className={`${filter === "van" ? "bg-red-700 text-white" : "group"} hover:text-white hover:bg-red-500 duration-200 w-[120px] min-w-[120px]`} onClick={() => handleFilter("van")}>Camionetas {filter === "van" ? <IoMdCloseCircle  className="" /> : <ArrowLeft className="hidden group-hover:inline stroke-2" />}</Button>
      </div>
      {Object.entries(agrupedCars).map(([name, Cars]: any, index) => {
        const firstCar = Cars[0];
        // const totalCars = total(cars)[name];
        return firstCar ? (
          (filter === firstCar.vehicle_type || filter === "all") && 
            <div className={`col-span-12 md:col-span-4 duration-200`} key={firstCar.id}>
              <div className="relative grid col-span-full sm:col-span-6 md:col-span-4 xl:col-span-3">
                <SimpleCardCar key={firstCar.id} car={firstCar} />
              </div>
            </div>
          ) : null;
      })}
    </div>
  )
}