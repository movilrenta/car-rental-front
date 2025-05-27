import { getUserInformation } from "@/actions/auth/getUser";
import getAuthorized from "@/components/utils/get-authorized";
import { TbForbid } from "react-icons/tb";

export const dynamic = "force-dynamic";

export default async function UsuariosPage() {

const { role } = await getUserInformation()
  const authorized = getAuthorized(role, 'crearUsuarios')
  if(!authorized) return <div className="flex flex-col gap-2 items-center text-center p-6">
    <TbForbid className="text-5xl"/>
    <span>No tienes permisos para ver esta sección</span>
    <span>Si esto es un error ponte en contacto con un administrador</span></div>
  return (
    <div>
      <h1>Creación de usuarios Page</h1>
    </div>
  )
}