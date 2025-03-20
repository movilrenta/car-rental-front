"use server";

import { GetFechasAction } from "./fechas";

//TODO: AUMENTAR COSTO DE RESERVA POR DIA ESPECIAL

// const specialDates = [
//   { date: "2025-03-17", value: 2, name: "1" },
//   { date: "2025-03-25", value: 2, name: "2" },
//   { date: "2025-04-05", value: 1.5, name: "3" },
//   { date: "2025-04-17", value: 7, name: "4" },
//   { date: "2025-08-07", value: 1.2, name: "5" },
//   { date: "2025-08-16", value: 1.2, name: "6" },
//   { date: "2025-10-12", value: 1.2, name: "7" },
//   { date: "2025-11-01", value: 1.2, name: "8" },
//   { date: "2025-11-11", value: 1.2, name: "9" },
//   { date: "2025-12-08", value: 1.2, name: "10" },
//   { date: "2025-12-25", value: 1.2, name: "11" }
// ]

const normalizeDate = (date: Date): number => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0); // Ajustamos la fecha a medianoche local
  return normalized.getTime();
};

export const getMaxIncrement = async (
  startDate: Date,
  endDate: Date
  //specialDates: { date: string; value: number, name: string }[]
) => {
  if (!startDate || !endDate) return 1;
  const start = normalizeDate(startDate);
  const end = normalizeDate(endDate);

  const specialDates = await GetFechasAction();
  //console.log(specialDates);

  //const maxIncrement = specialDates.reduce((maxValue: number, { start_date, multiplier, reason }: any) => {
  const maxIncrement = specialDates.reduce(
    (maxValue: number, { start_date, multiplier }: any) => {
      const [year, month, day] = start_date.split("-").map(Number);
      const specialDate = normalizeDate(new Date(year, month - 1, day));
      //console.log(specialDate, reason);
      return specialDate >= start && specialDate <= end
        ? multiplier > 1
          ? Math.max(maxValue, Number(multiplier))
          : maxValue * Number(multiplier)
        : maxValue;
    },
    1
  );
  return maxIncrement;
};
