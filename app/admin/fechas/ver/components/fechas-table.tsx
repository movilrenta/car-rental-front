import { LuPlus } from "react-icons/lu";
import AdicionalesTableItem from "./fecha-table-item";
import CRUD_Fechas from "./crud";

export const FechasTable = ({
  Fechas
}: {
  Fechas: {
    id: number;
    reason: string;
    multiplier: string;
    start_date: string;
  }[];
}) => {

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
      <header className="flex justify-between items-center px-5 py-4">
        <h2 className="font-semibold flex justify-center items-center gap-2 text-gray-800 dark:text-gray-100">
          Todas las fechas especiales{" "}
          <span className="text-gray-400 dark:text-gray-500 font-medium">
            {Fechas.length}
          </span>
        </h2>
        <CRUD_Fechas
        children={<div className="border group duration-200 rounded-md w-fit px-2 bg-red-700 flex gap-2 text-white items-center justify-center"><LuPlus className="text-3xl p-2 w-11 h-11" /><span className="">Nueva</span></div>}
        />
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
              <tr>
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Id</div>
                </th> */}
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Motivo</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Multiplicador</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Día (Año/Mes/Día)</div>
                </th>
 

                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Opciones</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {Fechas?.map((item) => (
                <AdicionalesTableItem key={item.id} fecha={item}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
