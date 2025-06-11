import { getUserInformation } from "@/actions/auth/getUser";
import getAuthorized from "@/components/utils/get-authorized";
import { TbForbid } from "react-icons/tb";
import { TableUsers } from "./ui/TableUsers";
import { USERS } from "@/constant/mockUser";
import { getUsers } from "@/actions/users/users-mongo";

export default async function UsuariosPage() {

const { role } = await getUserInformation()
  const authorized = getAuthorized(role, 'crearUsuarios');
  // const users = await getUsers()
  // console.log(users)
  if(!authorized) return <div className="flex flex-col gap-2 items-center text-center p-6">
    <TbForbid className="text-5xl"/>
    <span>No tienes permisos para ver esta sección</span>
    <span>Si esto es un error ponte en contacto con un administrador</span></div>
  
  //pegada al back de usuarios
  return (
    <div className="my-5 px-4 md:px-2 w-full flex flex-col items-center gap-y-8 text-gray-800 dark:text-white">
      <div className="w-full md:min-w-[500px] lg:w-[800px]">
        <TableUsers users={USERS}/>
      </div>
    </div>
  )
}