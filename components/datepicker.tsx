"use client";

import Flatpickr from "react-flatpickr";
import { Hook, Options } from "flatpickr/dist/types/options";

export default function Datepicker({
  align,
  mode = "range",
  defaultStart,
  defaultEnd,
  onDatesChange,
  minDate, 
  maxDate 
}: {
  align?: "left" | "right";
  mode?: "range" | "single";
  defaultStart?: Date;
  defaultEnd?: Date;
  onDatesChange?: (dates: Date[]) => void;
  minDate?: Date,  // Propiedad para la fecha mínima
  maxDate?: Date  // Propiedad para la fecha máxima
}) {
  const onReady: Hook = (selectedDates, dateStr, instance) => {
    (instance.element as HTMLInputElement).value = dateStr.replace("to", "-");
    const customClass = align ?? "";
    instance.calendarContainer.classList.add(`flatpickr-${customClass}`);
  };

  const onChange: Hook = (selectedDates, dateStr, instance) => {
    (instance.element as HTMLInputElement).value = dateStr.replace("to", "-");
    if (onDatesChange) {
      onDatesChange(selectedDates);
    }
  };

  const options: Options = {
    mode: mode,
    disableMobile: true,
    static: true,
    monthSelectorType: "static",
    dateFormat: "j/m/y",
    defaultDate: defaultStart ? [new Date(defaultStart)] : undefined,
    //defaultDate: [new Date().setDate(new Date().getDate() - 6), new Date()],
    minDate: minDate,  // Establecer fecha mínima
    maxDate: maxDate,  // Establecer fecha máxima
    prevArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    onReady,
    onChange,
  };

  return (
    <div className="relative w-full">
      <Flatpickr
        className="form-input pl-9 h-12 text-gray-600 hover:text-gray-800 
        dark:text-gray-300 dark:hover:text-gray-100 font-medium min-w-28 w-full"
        options={options}
        placeholder="Selecciona una fecha"
      />
      <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
        <svg
          className="fill-current text-gray-400 dark:text-gray-500 ml-3"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z" />
          <path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
        </svg>
      </div>
    </div>
  );
}
