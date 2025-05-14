"use server";

import { GetFechasAction } from "./fechas";

const normalizeDate = (date: Date): number => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0); // Ajustamos la fecha a medianoche local
  return normalized.getTime();
};

export const getMaxIncrement = async (
  startDate: Date,
  endDate: Date
) => {
  if (!startDate || !endDate) return 1;

  const start = normalizeDate(startDate);
  const end = normalizeDate(endDate);

  const specialDates = await GetFechasAction();

  const relevantMultipliers = specialDates
    .map(({ start_date, end_date, multiplier }: any) => {
      const [year, month, day] = start_date.split("-").map(Number);
      const [year2, month2, day2] = end_date.split("-").map(Number);
      const specialStart = normalizeDate(new Date(year, month - 1, day));
      const specialEnd = normalizeDate(new Date(year2, month2 - 1, day2));
      const numberMultiplier = Number(multiplier);

      const overlaps =
        (start >= specialStart && start <= specialEnd) ||
        (end >= specialStart && end <= specialEnd) ||
        (start <= specialStart && end >= specialEnd); // cubre todo el rango

      return overlaps ? numberMultiplier : null;
    })
    .filter((m: any): m is number => m !== null);

  const greaterThanOne = relevantMultipliers.filter((m: any) => m > 1);
  if (greaterThanOne.length > 0) return Math.max(...greaterThanOne);

  const lessThanOne = relevantMultipliers.filter((m: any) => m < 1);
  if (lessThanOne.length > 0) return Math.min(...lessThanOne);

  const equalToOne = relevantMultipliers.find((m: any) => m === 1);
  if (equalToOne !== undefined) return 1;

  return 1; // por defecto si no hay coincidencias
};
