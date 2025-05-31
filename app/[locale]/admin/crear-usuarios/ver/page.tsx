import { getUserInformation } from "@/actions/auth/getUser";
import getAuthorized from "@/components/utils/get-authorized";
import { TbForbid } from "react-icons/tb";
import { TableUsers } from "./ui/TableUsers";
import { mockUsers } from "@/constant/mockUser";

export default async function UsuariosPage() {

const { role } = await getUserInformation()
  const authorized = getAuthorized(role, 'crearUsuarios');
  if(!authorized) return <div className="flex flex-col gap-2 items-center text-center p-6">
    <TbForbid className="text-5xl"/>
    <span>No tienes permisos para ver esta sección</span>
    <span>Si esto es un error ponte en contacto con un administrador</span></div>
  
  //pegada al back de usuarios
  return (
    <div className="my-5 px-2 w-full flex flex-col items-center gap-y-8 text-gray-800 dark:text-white">
      <div className="md:min-w-[500px] lg:min-w-[800px]">
        <TableUsers users={mockUsers}/>
      </div>
    </div>
  )
}