export const accessoriesTranslate: Record<string, { es: string; en: string }> =
  {
    "Silla para niños": {
      es: "Silla para niños",
      en: "Baby chair",
    },
    GPS: {
      es: "GPS",
      en: "GPS",
    },
  };

export const typeDocTranslate: Record<string, { es: string; en: string }> = {
  DNI: {
    es: "DNI",
    en: "DNI",
  },
  Pasaporte: {
    es: "Pasaporte",
    en: "Passport",
  },
};

export const accesoriesAndDescriptionTranslate: Record<
  string,
  {
    es: { title: string; description: string; rate: string };
    en: { title: string; description: string; rate: string };
  }
> = {
  "Silla para niños": {
    es: {
      title: "Silla para niños",
      description:
        "Silla de seguridad para niños, se adapta a cualquier vehiculo",
      rate: "Pago diario",
    },
    en: {
      title: "Baby chair",
      description: "Child safety seat, fits any vehicle",
      rate: "Daily payment",
    },
  },
  GPS: {
    es: {
      title: "GPS",
      description:
        "Sistema de Posicionamiento Global portátil para automóviles.",
      rate: "Pago diario",
    },
    en: {
      title: "GPS",
      description: "Portable Global Positioning System for cars.",
      rate: "Daily payment",
    },
  },
};
