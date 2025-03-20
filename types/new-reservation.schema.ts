import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const documentType = ["DNI", "Pasaporte"] as const;

export const newReservationSchema = z.object({
  car_id: z.number().min(1, "Debe elegir un vehiculo"),
  code: z.string().min(9, "El código es obligatorio"),
  start_date: z.string().date("El campo es obligatorio"),
  // start_date: z.date().refine((val) => val instanceof Date, { message: "Fecha y hora requeridas" }),
  start_hour: z.string(),
  end_hour: z.string(),
  // end_date: z.string().min(1, "La fecha de fin es obligatoria"),
  // end_date: z.date().refine((val) => val instanceof Date, { message: "Fecha y hora requeridas" }),
  end_date: z.string().date("El campo es obligatorio"),
  start_branch_id: z.coerce.number().min(1, "Debe elegir una sucursal de inicio"),
  end_branch_id: z.coerce.number().min(1, "Debe elegir una sucursal de devolución"),
  firstname: z.string().trim().min(1, "El nombre es obligatorio"),
  lastname: z.string().trim().min(1, "El apellido es obligatorio"),
  observation: z.string().max(200, "No se admiten más de 200 caracteres").optional(),
  email: z.string().email("El email no es válido").min(1, "El email es obligatorio"),
  phone: z.string().min(10, "El teléfono es obligatorio"),
  document_type: z.enum(documentType).default("DNI"),
  document_number: z.string().min(7, "El campo es obligatorio"),
  license_number: z.string().min(1, "El número de licencia es obligatorio"),
  license_expiration_date: z.string().date("El campo es obligatorio"),
  drivers_address: z.string().min(1, "La dirección es obligatoria"),
  drivers_city: z.string().min(1, "La ciudad es obligatoria"),
  flight_number: z.string().optional(),
  origin: z.string().default("offline_agent")
});

export const resolver = zodResolver(newReservationSchema);