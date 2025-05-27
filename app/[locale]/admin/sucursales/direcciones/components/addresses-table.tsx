import { LuPlus } from "react-icons/lu";
import AddressesTableItem from "./addresses-table-item";
import CRUD_Addresses from "./crud";
import { getUserInformation } from "@/actions/auth/getUser";
import { ROLES } from "@/constant/roles";

export const AddressesTable = async ({
  Addresses,
}: {
  Addresses: {
    id: number;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    latitude: string;
    longitude: string
  }[];
}) => {
  const { role } = await getUserInformation()
  const authorized = role === ROLES.admin || role === ROLES.superadmin
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
      <header className="flex justify-between items-center px-5 py-4 h-20">
        <h2 className="font-semibold flex items-center justify-center gap-2 text-gray-800 dark:text-gray-100">
          Todos las direcciones{" "}
          <span className="text-gray-400 dark:text-gray-500 font-medium">
            {Addresses.length}
          </span>
        </h2>
        {authorized && <CRUD_Addresses
        children={<div className="border group duration-200 rounded-md w-fit px-2 bg-red-700 flex gap-2 text-white items-center justify-center"><LuPlus className="text-3xl p-2 w-11 h-11" /><span className="">Nuevo</span></div>}
        />}
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Provincia</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Ciudad</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Calle</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Código Postal</div>
                </th>

                {authorized && <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Opciones</div>
                </th>}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {Addresses?.map((item) => (
                <AddressesTableItem key={item.id} address={item} authorized={authorized}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
