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
  //specialDates: { date: string; value: number, name: string }[]
) => {
  if (!startDate || !endDate) return 1;
  const start = normalizeDate(startDate);
  const end = normalizeDate(endDate);

  const specialDates = await GetFechasAction();

  //const maxIncrement = specialDates.reduce((maxValue: number, { start_date, multiplier, reason }: any) => {
  const maxIncrement = specialDates.reduce(
    (maxValue: number, { start_date, end_date, multiplier }: any) => {
      const [year, month, day] = start_date.split("-").map(Number);
      const [year2, month2, day2] = end_date.split("-").map(Number);
      const startDate = normalizeDate(new Date(year, month - 1, day));
      const endDate = normalizeDate(new Date(year2, month2 - 1, day2));

      return (start >= startDate && start <= endDate) ||
        (end >= startDate && end <= endDate)
        ? multiplier > 1
          ? Math.max(maxValue, Number(multiplier))
          : maxValue * Number(multiplier)
        : maxValue;
    },
    1
  );

  return maxIncrement;
};
