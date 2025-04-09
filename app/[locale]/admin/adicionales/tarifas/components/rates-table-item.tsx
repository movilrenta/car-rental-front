interface RatesTableItemProps {
  rate: {id: number, name: string, description: string}
}

export default function RatesTableItem({
  rate
}:
RatesTableItemProps) {
  return (
    <tr className="hover:bg-black/5 dark:hover:bg-black/10 duration-200">
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{rate?.id}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{rate?.name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{rate?.description}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        {/* <div className="flex items-center justify-center gap-4">
        <CRUD_Branches
          branch={branch}
          children={<div className="w-full h-full bg-cover bg-center"><FaEdit className="text-blue-500" size={20}/></div>}
          address={Addresses}
        />
        <DeleteBrunch children={<div className="w-full"><FaTrash className="text-red-500" size={20}/></div>} id={branch.id} />
        </div> */}
      </td>
    </tr>
  );
}
