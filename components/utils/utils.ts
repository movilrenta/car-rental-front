import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfigFile from '@/tailwind.config.js'

export const tailwindConfig = resolveConfig(tailwindConfigFile) as any

export const getBreakpointValue = (value: string): number => {
  const screenValue = tailwindConfig.theme.screens[value]
  return +screenValue.slice(0, screenValue.indexOf('px'))
}

export const getBreakpoint = () => {
  let currentBreakpoint
  let biggestBreakpointValue = 0
  let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0
  for (const breakpoint of Object.keys(tailwindConfig.theme.screens)) {
    const breakpointValue = getBreakpointValue(breakpoint)
    if (
      breakpointValue > biggestBreakpointValue &&
      windowWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue
      currentBreakpoint = breakpoint
    }
  }
  return currentBreakpoint
}

export const hexToRGB = (h: string): string => {
  let r = 0
  let g = 0
  let b = 0
  if (h.length === 4) {
    r = parseInt(`0x${h[1]}${h[1]}`)
    g = parseInt(`0x${h[2]}${h[2]}`)
    b = parseInt(`0x${h[3]}${h[3]}`)
  } else if (h.length === 7) {
    r = parseInt(`0x${h[1]}${h[2]}`)
    g = parseInt(`0x${h[3]}${h[4]}`)
    b = parseInt(`0x${h[5]}${h[6]}`)
  }
  return `${+r},${+g},${+b}`
}

export const formatValue = (value: number): string => Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value)

export const formatThousands = (value: number): string => Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value)


export function calcularDiasEntreFechas(fechaInicio: Date | string, fechaFin: Date | string): number {
  const unDiaEnMilisegundos = 1000 * 60 * 60 * 24;
  const periodoDeGraciaEnMilisegundos = 2 * 60 * 60 * 1000; // 26 horas


  const fechaInicioDate = fechaInicio instanceof Date ? fechaInicio : new Date(fechaInicio);
  const fechaFinDate = fechaFin instanceof Date ? fechaFin : new Date(fechaFin);

  const fechaHoraInicio = new Date(fechaInicioDate);
  const fechaHoraFin = new Date(fechaFinDate);

  const diferenciaEnMilisegundos = fechaHoraFin.getTime() - fechaHoraInicio.getTime();

  // Calcular el número de días completos
  const diasCompletos = Math.floor(diferenciaEnMilisegundos / unDiaEnMilisegundos);

  // Calcular el tiempo restante después de contar los días completos
  const tiempoRestante = diferenciaEnMilisegundos % unDiaEnMilisegundos;
  console.log(tiempoRestante);

  let totalDias
  totalDias =
    tiempoRestante > 0 && tiempoRestante > periodoDeGraciaEnMilisegundos
      ? diasCompletos + 1
      : diasCompletos;

  if (totalDias <= 0) totalDias = 1;

  return totalDias;
}
export function calcularDiasEntreFechas2(fechaInicio: Date | string, horaInicio: string, fechaFin: Date | string, horaFin: string): number {
  if (!horaInicio || !horaFin || !fechaFin || !fechaInicio) return 1;
  const unDiaEnMilisegundos = 1000 * 60 * 60 * 24;
  const periodoDeGraciaEnMilisegundos = 2 * 60 * 60 * 1000; // 26 horas

  const fechaInicioDate = fechaInicio instanceof Date ? fechaInicio : new Date(fechaInicio);
  const fechaFinDate = fechaFin instanceof Date ? fechaFin : new Date(fechaFin);

  const fechaHoraInicio = new Date(`${fechaInicioDate.toISOString().split('T')[0]}T${horaInicio || "06:00"}:00.000Z`);
  const fechaHoraFin = new Date(`${fechaFinDate.toISOString().split('T')[0]}T${horaFin || "06:00"}:00.000Z`);

  const diferenciaEnMilisegundos = fechaHoraFin.getTime() - fechaHoraInicio.getTime();

  // Calcular el número de días completos
  const diasCompletos = Math.floor(diferenciaEnMilisegundos / unDiaEnMilisegundos);

  // Calcular el tiempo restante después de contar los días completos
  const tiempoRestante = diferenciaEnMilisegundos % unDiaEnMilisegundos;

  let totalDias
  totalDias =
    tiempoRestante > 0 && tiempoRestante > periodoDeGraciaEnMilisegundos
      ? diasCompletos + 1
      : diasCompletos;

  if (totalDias <= 0) totalDias = 1;

  return totalDias;
}

export const formatDate = (isoDate:Date) => {
  const date = new Date(isoDate);

  // Obtener el formato en español:
  return new Intl.DateTimeFormat('es-ES', {weekday:'long', day:'numeric',month:'short',year:'numeric'} ).format(date);
};

export const formatDateComplete = (isoDate:Date) => {
  const date = new Date(isoDate);

  // Obtener el formato en español:
  return new Intl.DateTimeFormat('es-ES', {weekday:'long', day:'numeric',month:'short',year:'numeric', hour:'2-digit', minute:'2-digit'} ).format(date);
};

export const formatDateShort = (isoDate:Date) => {
  const date = new Date(isoDate);

  // Obtener el formato en español:
  return new Intl.DateTimeFormat('es-ES', {day:'numeric',month:'2-digit',year:'2-digit'}).format(date);
};