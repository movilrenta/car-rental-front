'use client'

import { GetInfoDataPaywayAction } from "@/actions/get-data-payway";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DataPayway({siteOperationId}:{siteOperationId: string}) {
  const [objeto, setObjeto] = useState<any>()
  const [loading, setLoading] = useState(false);

  async function handleGetData() {
    setLoading(true);
    try {
      const data = await GetInfoDataPaywayAction(siteOperationId);
      if (data?.data.length < 1)
        setObjeto("No hay registros en PAYWAY de haberse efectuado el pago");
      else setObjeto(data?.data);
    } catch (error) {
      console.log(error);
      setObjeto("Error en la solicitud");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button className="bg-red-700 mr-2" onClick={handleGetData}>Ver datos en PAYWAY</Button>
      {objeto 
        ? <>
            <Button variant="outline" onClick={() => setObjeto(null)}>Limpiar</Button>
            <pre>{JSON.stringify(objeto, null, 2)}</pre>
          </>
        : null
      }
      {loading && <p className="animate-pulse">Cargando...</p>}
    </div>
  )
}