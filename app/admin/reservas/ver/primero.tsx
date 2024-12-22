'use client'

import OrdersTable from "@/app/(default)/ecommerce/orders/orders-table"
//import PaginationList from "./pagination";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function OrderesList({data}:{data: any}) {
  const [itemsShow, setItemsShow] = useState(data.slice(0, 10))
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const onPageChange = (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setCurrentPage(page);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setItemsShow(data.slice(startIndex, endIndex));
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto min-h-screen">
    {/* Page header */}
    <div className="sm:flex sm:justify-between sm:items-center mb-8">
      {/* Left: Title */}
      <div className="mb-4 sm:mb-0">
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
          Reservas
        </h1>
      </div>

      {/* Right: Actions */}
      {/* <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
        <FilterButton align="right" />
      </div> */}
    </div>

    {/* Table */}
    {!data.length ? (
      <div className="text-center flex items-center justify-center h-[50vh]">
        <p className="text-md lg:text-xl font-light">Aún no hay reservas.</p>
      </div>
    ) : (
      <OrdersTable orders={itemsShow} totalOrders={data.length}/>
    )}

    {/* Pagination Agregar server action */}
    {data.length > 0 && (
      <div className="mt-8">
        {/* <PaginationClassic /> */}
        <div>
      <nav className="flex justify-between" role="navigation" aria-label="Navigation">
        <div className="flex-1 mr-2">
          <Button
            className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;-<span className="hidden sm:inline">&nbsp;Atr.</span>
          </Button>
        </div>
        <div className="grow text-center">
          <ul className="inline-flex text-sm font-medium space-x-2">
            {generatePageNumbers().map((page, index) => (
              <li key={index}>
                {typeof page === "number" ? (
                  <Button
                    className={`inline-flex items-center justify-center leading-5 rounded-full px-2 py-2 w-9 ${
                      page === currentPage
                        ? "bg-violet-500 text-white"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 text-gray-600 dark:text-gray-300 hover:text-violet-500"
                    }`}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </Button>
                ) : (
                  <span className="inline-flex items-center justify-center leading-5 px-2 py-2 text-gray-400 dark:text-gray-500">
                    …
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 text-right ml-2">
          <Button
            className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="hidden sm:inline">Sig.&nbsp;</span>-&gt;
          </Button>
        </div>
      </nav>
    </div>
      </div>
    )}
  </div>
  )
}