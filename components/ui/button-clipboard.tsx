"use client";

import React from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa6";

export const ButtonClipboard = () => {
  const [copySuccess, setCopySuccess] = React.useState(false);
  const code = sessionStorage.getItem("movil_renta_code") ?? "sin datos";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Mensaje temporal
    } catch (error) {
      console.error("Error al copiar el texto:", error);
    }
  };

  return (
    <div className="bg-gray-300 dark:bg-slate-300 px-6 py-4 rounded-md flex items-center gap-x-6">
      <span className="text-xl text-slate-800 dark:text-gray-700 font-medium">
        {code}
      </span>
      <div>
        <button
          title="Copiar al portapapeles"
          onClick={handleCopy}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
        >
          {copySuccess ? <FaCheck size={20} /> : <FaRegCopy size={20} />}
        </button>
      </div>
    </div>
  );
};
