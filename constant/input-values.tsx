import {
  IoMailOutline,
  IoPersonOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";
import { LuFactory } from "react-icons/lu";

export const inputsValues = [
  {
    icon: <IoPersonOutline size={25} className="text-red-700" />,
    type: "text",
    id: "name",
    registerName:"name",
    placeHolder: "Nombre y Apellido",
  },
  {
    icon: <IoMailOutline size={25} className="text-red-700" />,
    type: "email",
    id: "email",
    registerName: "email",
    placeHolder: "Correo",
  },
  {
    icon: <IoPhonePortraitOutline size={25} className="text-red-700" />,
    type: "text",
    id: "phone",
    registerName: "phone",
    placeHolder: "Teléfono",
  },
  {
    icon: <LuFactory size={25} className="text-red-700" />,
    type: "text",
    id: "company",
    registerName: "company",
    placeHolder: "Empresa",
  },
]
