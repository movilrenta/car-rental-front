import { Group } from '@/types/car.interface'
import { GroupsTableItem } from './groups-table-item'

interface GroupsTableProps {
  Groups: Group[]
}

export const GroupTable = ({Groups}:GroupsTableProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
    <header className="px-5 py-4">
      <h2 className="font-semibold text-gray-800 dark:text-gray-100">
        Todos los Grupos{" "}
        <span className="text-gray-400 dark:text-gray-500 font-medium">
          {Groups.length}
        </span>
      </h2>
    </header>
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full dark:text-gray-300">
          {/* Table header */}
          <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
            <tr>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">Id</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">Nombre</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">Agregado</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold">Opciones</div>
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
            {Groups.map((group) => (
              <GroupsTableItem key={group.id} group={group}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}
