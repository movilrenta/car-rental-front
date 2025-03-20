import Image from "next/image";
import CRUD_Vehycle from "./crud";
import { VehicleType } from "@/constant/cars";
import DeleteComponent from "./delete-component";
import { FaEdit, FaGasPump, FaTrash } from "react-icons/fa";
import { Branch, Brand, Group } from "@/types/car.interface";
//import { LuLock } from "react-icons/lu";
// import { getSatusCar, lockCar } from "@/actions/save-card";
import { useState } from "react";
//import { LucideUnlock } from "lucide-react";
import {
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
//import { Label } from "@/components/label";
import { MdOutlineControlPointDuplicate } from "react-icons/md";
import { Input } from "@/components/input";
import { toast } from "@/hooks/use-toast";
import { PostCarAction } from "@/actions/car";
//import axios from "axios";

interface CarTipe extends VehicleType {
  brand_name: string;
  group_name: string;
  status: boolean;
}

interface CarTableItemProps {
  car: CarTipe;
  Groups: Group[];
  Brands: Brand[];
  Branches: Branch[];
  //cars: any[];
}

export default function CarsTableItem({
  car,
  Groups,
  Brands,
  //cars,
  Branches,
}: CarTableItemProps) {
  const [copies, setCopies] = useState<number>(1);
  const [patentes, setPatentes] = useState<string>("");

  // const handlerLockCar = async (locked_status: boolean) => {
  //   window.location.reload();
  //   await axios.post("/api/lock-car", {
  //     id: car.id,
  //     locked_status,
  //   });
  // };
  
  const handlerCopyCar = async () => {
    const patentes_array = patentes.split(",");
    const formData = Array.from({ length: copies }, (_, index) => {
      const patent = patentes_array[index]?.trim();
      return {
        name: car?.name || "",
        brand_id: Number(car?.brand_id),
        group_id: Number(car?.group_id),
        doors: car?.doors || 0,
        seats: car?.seats || 0,
        transmission: car?.transmission || "",
        luggage: car?.luggage || 0,
        fuel_type: car?.fuel_type || "",
        branch_id: Number(car?.branch_id),
        image: car?.image || "",
        description: "",
        plate: patent,
      };
    });

    try {
      const requests = formData.map(async (newCar) => {
        return PostCarAction(newCar);
      });

      const responses = await Promise.all(requests);

      const allSuccessful = responses.every((res) => res.status === 200);

      if (allSuccessful) {
        toast({
          variant: "default",
          title: `Todos los autos fueron creados con éxito`,
        });

        window.location.reload();
      } else {
        toast({
          variant: "default",
          title: `Algunos autos no se pudieron crear.`,
        });
      }
    } catch (error) {
      toast({
        variant: "default",
        title: `Hubo un error en la creación.`,
      });

      console.log(error);
    }
  };

  return (
    <tr className="dark:bg-gray-950/80 bg-neutral-50 hover:bg-black/5 dark:hover:bg-gray-950/50 duration-200">
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"></td>
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{car?.id}</div>
      </td> */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left"></div>
      </td>
      <td className=" h-[47px] min-h-full">
        <div className="flex gap-3 items-center">
          <Image
            className="hidden sm:block rounded-md w-auto h-10"
            src={car?.image}
            width={60}
            height={48}
            alt={car?.name}
          />
          <div className="font-medium text-gray-800 dark:text-gray-100 text-ellipsis line-clamp-1">
            {car?.name}
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center border bottom-1 bg-black rounded-md text-white font-bold p-1 ">
          {car.plate || "-"}
        </div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{car?.brand_name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{car?.group_name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{car?.doors}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
        <div className="text-left font-medium text-green-600 flex items-center gap-2">
          {car?.fuel_type}
          <FaGasPump className="text-gray-600" size={20} />
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center justify-center gap-4">
          <CRUD_Vehycle
            car={car}
            children={
              <div className="w-full h-full bg-cover bg-center">
                <FaEdit className="text-blue-500" size={20} />
              </div>
            }
            branches={Branches}
            brands={Brands}
            groups={Groups}
          />
          <DeleteComponent
            children={
              <div className="w-full">
                <FaTrash className="text-red-500" size={20} />
              </div>
            }
            id={car.id}
          />
          {/* <Dialog>
            <DialogTrigger asChild>
              {car.status ? (
                <LuLock className="text-red-500 cursor-pointer" size={20} />
              ) : (
                <LucideUnlock
                  className="text-green-500 cursor-pointer"
                  size={20}
                />
              )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>
                  Vas a {car.status ? "desbloquear" : "bloquear"} el vehiculo
                </DialogTitle>
                <DialogDescription>
                  {car.status
                    ? "Si desbloqueas el vehiculo podra ser rentado por el usuario."
                    : "Si bloqueas el vehiculo no podra ser rentado por el usuario."}
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button
                  type="button"
                  onClick={() => handlerLockCar(!car.status)}
                >
                  {car.status ? "Desbloquear" : "Bloquear"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
          <Dialog>
            <DialogTrigger asChild>
              <MdOutlineControlPointDuplicate
                className="cursor-pointer"
                size={20}
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>Vas a hacer una copia del vehiculo</DialogTitle>
              </DialogHeader>{" "}
              <Input
                type="number"
                placeholder="Numero de copias"
                className="cursor-pointer"
                size={20}
                onChange={(e) => setCopies(Number(e.target.value))}
              />{" "}
              <DialogDescription>
                Vas a crear vehiculos de iguales caracteristicas, por favor
                ingresa las distintas patentes separadas por una coma ','.
              </DialogDescription>
              <Input
                type="text"
                placeholder="ABE123, ABC123, ABD123"
                className="cursor-pointer"
                size={20}
                onChange={(e) => setPatentes(e.target.value)}
              />
              <DialogFooter>
                <Button type="submit" onClick={handlerCopyCar}>
                  Copiar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </td>
    </tr>
  );
}
