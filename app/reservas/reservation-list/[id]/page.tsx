import { getReservationById } from "@/actions/get-reservations-by-id";
import { calcularDiasEntreFechas2, formatDate } from "@/components/utils/utils";
import { redirect } from "next/navigation";

interface Params {
  params: Promise<{ id: string }>;
}

export default async function ReservationByIdPage({ params }: Params) {
  const orderId = (await params).id;
  const { ok, data } = await getReservationById(+orderId);
  if (!ok) {
    redirect("/reservas/reservation-list");
  }
  const countDays = calcularDiasEntreFechas2(data!.reservation_detail.start_date, data!.reservation_detail.end_date);

  const statusDetail = JSON.parse(data!.reservation_detail.payment.status_details);
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Detalles de reserva: <span className="font-light">ID - {data?.reservation_detail.id}</span>
      </h1>
      <div className="flex flex-col items-start gap-4">
        <h2 className="text-lg md:text-xl font-semibold">
          Datos de la reserva:
        </h2>
        <hr className="w-full h-[1px] border-none bg-gray-700 dark:bg-gray-100"/>
        <ul className="flex flex-col gap-1">
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Auto: {data?.car_details.name ?? ""}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Marca: {data?.car_details.brand.name ?? ""}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Grupo: {data?.car_details.group.name ?? ""}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Valor por dia: $ {data?.car_details.group.rate ?? ""}</p>
            </div>
          </li>
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
                Fecha de incio de reserva:{" "}
                {formatDate(data!.reservation_detail.start_date) ?? "S/D"}
              </p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>
                Fecha de finalización de reserva:{" "}
                {formatDate(data!.reservation_detail.end_date) ?? "S/D"}
              </p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Lugar de partida: {data?.reservation_detail.start_branch_id}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Lugar de finalización: {data?.reservation_detail.end_branch_id}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>
                Fecha de creación de reserva:{" "}
                {formatDate(data!.reservation_detail.created_at) ?? "S/D"}
              </p>
            </div>
          </li>
        </ul>

        <h2 className="text-lg md:text-xl font-semibold">Datos del cliente:</h2>
        <hr className="w-full h-[1px] border-none bg-gray-700 dark:bg-gray-100"/>
        <ul className="flex flex-col gap-1">
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>
                Nombre y apellido: {data?.reservation_detail.reservation_detail.firstname}{" "}
                {data?.reservation_detail.reservation_detail.lastname}
              </p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Correo electrónico: {data?.reservation_detail.reservation_detail.email}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Teléfono: {data?.reservation_detail.reservation_detail.phone}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Observaciones: {data?.reservation_detail.reservation_detail.observation}</p>
            </div>
          </li>
        </ul>
        <hr />
        <h2 className="text-lg md:text-xl font-semibold">Datos del pago:</h2>
        <hr className="w-full h-[1px] border-none bg-gray-700 dark:bg-gray-100"/>
        <ul>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Id de la transacción: {data?.reservation_detail.payment.site_transaction_id}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Método de pago: {data?.reservation_detail.payment.payment_method_id}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Tarjeta: {data?.reservation_detail.payment.card_brand}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Tipo de moneda: {data?.reservation_detail.payment.currency}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Monto total: $ {data?.reservation_detail.payment.amount}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Cuotas: {data?.reservation_detail.payment.installments}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Fecha: {formatDate(data!.reservation_detail.payment.date) ?? "S/D"}</p>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-2">
              <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
              <p>Estado del pago: {data?.reservation_detail.payment.status}</p>
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
                {!data?.reservation_detail.payment.fraud_detection
                  ? "Sin datos"
                  : data.reservation_detail.payment.fraud_detection}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
