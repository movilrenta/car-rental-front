"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useItinerarioStore } from "@/stores/reserva-itinerario/reserva-itinerario.store";
import {
  addDays,
  addYears,
  endOfDay,
  format,
  isAfter,
  isBefore,
  startOfDay,
} from "date-fns";
import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ItinerarioPickDate() {
  const today = startOfDay(new Date());
  const oneYearFromNow = endOfDay(addYears(today, 1));
  const itinerario = useItinerarioStore((state) => state.getItinerario());
  const nuevoItinerario = useItinerarioStore((state) => state.addItinerario);
  const [isClient, setIsClient] = useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: itinerario?.startDay ? new Date(itinerario?.startDay) : undefined,
    to: itinerario?.endDay
      ? new Date(itinerario?.endDay)
      : undefined,
      //: addDays(new Date(), 7),
  });
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    nuevoItinerario({
      startLocation: itinerario?.startLocation || "",
      endLocation: itinerario?.endLocation || "",
      startDay: date?.from || null,
      endDay: date?.to || null,
      startTime: itinerario?.startTime || undefined,
      endTime: itinerario?.endTime || undefined,
    });
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-full min-w-0 text-ellipsis overflow-clip !text-start border justify-start h-12 px-3 bg-white dark:border-zinc-700 dark:bg-[rgb(17_24_39_/_0.3)] text-zinc-700 dark:text-white max-w-full",
            !date && "text-muted-foreground"
          )}
        >
          {/* <CalendarIcon /> */}
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "dd MMM yyyy", { locale: es })} {" hasta "}
                {format(date.to, "dd MMM yyyy", { locale: es })}
              </>
            ) : (
              format(date.from, "dd MMM yyyy", { locale: es })
            )
          ) : (
            <span>Selecciona un rango de fechas</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={1}
          disabled={(date) =>
            isBefore(date, today) || isAfter(date, oneYearFromNow)
          }
          className="bg-white dark:bg-black !rounded-lg"
        />
      </PopoverContent>
    </Popover>
  );
}
