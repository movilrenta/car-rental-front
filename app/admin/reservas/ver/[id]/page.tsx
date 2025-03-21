import { getReservationById } from "@/actions/get-reservations-by-id";
import { calcularDiasEntreFechas, formatDateComplete } from "@/components/utils/utils";
import { Aditional } from "@/types";
import { Branch } from "@/types/car.interface";
import { redirect } from "next/navigation";

interface Params {
  params: Promise<{ id: string }>;
}

export default async function ReservationByIdPage({ params }: Params) {
  const orderId = (await params).id;
  const { ok, data, branches } = await getReservationById(+orderId);
  if (!ok) {
    redirect("/admin/reservas/ver");
  }
  const countDays = calcularDiasEntreFechas(
    data!.reservation.start_date,
    data!.reservation.end_date
  );
  const aditionals: Aditional[] = data?.reservation.aditionals ?? [];
  const statusDetail = JSON.parse(
    data?.reservation?.payment?.status_details || "{}"
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Detalles de reserva:{" "}
        <span className="font-light">{data?.reservation.id}</span>
      </h1>
      <div className="flex flex-col items-start gap-4">
        <h2 className="text-lg md:text-xl font-semibold">Datos:</h2>
        <hr className="w-full h-[1px] border-none bg-gray-700 dark:bg-gray-100" />
        <ul className="flex flex-col gap-1">
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Auto: {data?.car_details?.name ?? ""}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Marca: {data?.car_details?.brand?.name ?? ""}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Patente: {data?.car_details?.description ?? ""}</p>
            </div>
          </li>
          {aditionals.length !== 0 && <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p> Adicionales:{" "}
                {aditionals.length > 0 &&
                  aditionals.map((aditional, index) => (
                    <span key={index}> 
                     {aditional?.name}
                    {index < aditionals.length - 1 && " - "}
                    </span>
                  ))}
              </p>
            </div>
          </li>}
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Grupo: {data?.car_details?.group?.name ?? ""}</p>
            </div>
          </li>
          {/* <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Valor por dia: $ {data?.car_details.group.rate ?? ""}</p>
            </div>
          </li> */}
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Cantidad de dias: {countDays ?? 0}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>
                Fecha de inicio:{" "}
                {formatDateComplete(data!?.reservation?.start_date) ?? "S/D"} Hs.
              </p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>
                Fecha de finalización:{" "}
                {formatDateComplete(data!?.reservation?.end_date) ?? "S/D"} Hs.
              </p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Lugar de partida: {branches ? branches.find((item:Branch) => item.id === data?.reservation?.start_branch_id)?.name : "sin datos"}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Lugar de finalización: {branches ? branches.find((item:Branch) => item.id === data?.reservation?.end_branch_id)?.name : "sin datos"}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>
                Fecha de creación de reserva:{" "}
                {formatDateComplete(data!.reservation.created_at) ?? "S/D"} Hs.
              </p>
            </div>
          </li>
        </ul>

        <h2 className="text-lg md:text-xl font-semibold">Datos del cliente:</h2>
        <hr className="w-full h-[1px] border-none bg-gray-700 dark:bg-gray-100" />
        <ul className="flex flex-col gap-1">
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>
                Nombre y apellido:{" "}
                {data?.reservation.reservation_detail.firstname}{" "}
                {data?.reservation.reservation_detail.lastname}
              </p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>
                Correo electrónico: {data?.reservation.reservation_detail.email}
              </p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Teléfono: {data?.reservation.reservation_detail.phone}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>{data?.reservation?.reservation_detail?.document_type}: {data?.reservation.reservation_detail.document_number}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Licencia n°: {data?.reservation?.reservation_detail?.license_number} Vencimiento: {data?.reservation?.reservation_detail?.license_expiration_date}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Domicilio: {data?.reservation.reservation_detail.drivers_address}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Localidad: {data?.reservation.reservation_detail.drivers_city}</p>
            </div>
          </li>
          {data?.reservation.reservation_detail.flight_number && <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Vuelo: {data?.reservation.reservation_detail.flight_number}</p>
            </div>
          </li>}
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>
                Observaciones:{" "}
                {data?.reservation.reservation_detail.observation}
              </p>
            </div>
          </li>
        </ul>
        <hr />
        <h2 className="text-lg md:text-xl font-semibold">Datos del pago:</h2>
        <hr className="w-full h-[1px] border-none bg-gray-700 dark:bg-gray-100" />
        {data?.reservation.payment ? (
          <ul>
            <li>
              <div className="flex items-center gap-x-2">
                <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
                <p>
                  Código de la transacción:{" "}
                  {data?.reservation?.payment?.site_transaction_id}
                </p>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-2">
                <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
                <p>Tarjeta: {data?.reservation?.payment?.card_brand}</p>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-2">
                <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
                <p>Tipo de moneda: {data?.reservation?.payment?.currency}</p>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-2">
                <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
                <p>Monto total: $ {data?.reservation?.payment?.amount}</p>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-2">
                <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
                <p>Cuotas: {data?.reservation?.payment?.installments}</p>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-2">
                <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
                <p>
                  Fecha:{" "}
                  {data!.reservation?.payment?.date
                    ? formatDateComplete(data!.reservation?.payment?.date)
                    : "S/D"} Hs.
                </p>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-2">
                <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
                <p>Estado del pago: {data?.reservation?.payment?.status}</p>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-2">
                <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
                <p>Ticket: {statusDetail.ticket}</p>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-2">
                <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
                <p>
                  Address validation code:{" "}
                  {!statusDetail.address_validation_code
                    ? "Sin datos"
                    : statusDetail.address_validation_code}
                </p>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-2">
                <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
                <p>
                  Card authorization code:{" "}
                  {!statusDetail.card_authorization_code
                    ? "Sin datos"
                    : statusDetail.card_authorization_code}
                </p>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-2">
                <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
                <p>
                  Fraud detection:{" "}
                  {!data?.reservation?.payment?.fraud_detection
                    ? "Sin datos"
                    : data.reservation?.payment?.fraud_detection}
                </p>
              </div>
            </li>
          </ul>
        ) : (
          <p> No hay datos </p>
        )}
      </div>
    </div>
  );
}
