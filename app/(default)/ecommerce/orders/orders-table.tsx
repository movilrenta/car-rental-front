'use client'

import { ReservationsDB } from '@/types'
import OrdersTableItem from './orders-table-item'
//import { useState } from 'react';


export default function OrdersTable({ orders, totalOrders  }: { orders: ReservationsDB[], totalOrders: number}) {
  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = Math.ceil(orders.length / itemsPerPage);

  // const handlePageChange = (page: number) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };

  // const currentData = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
      <header className="px-5 py-4 flex gap-1 items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Todas las reservas</h2>
          <span className="text-gray-400 dark:text-gray-500 font-lg">{totalOrders}</span>
          
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300 divide-y divide-gray-100 dark:divide-gray-700/60">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-gray-100 dark:border-gray-700/60">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Id</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Fecha</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Lugar salida</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Lugar llegada</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Total</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Estado</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-center">Opciones</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {orders.map((order, index) => (
              <OrdersTableItem
                key={index}
                order={order}
                //branches={branches}
                />
            ))}
          </table>

        </div>
      </div>
    </div>
  )
}