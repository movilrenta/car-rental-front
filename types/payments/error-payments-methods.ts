
export interface ResponseErrorPaymentsMethods {
  id:                                number;
  status:                            string;
  status_details:                    StatusDetails;
}

export interface StatusDetails {
  ticket:                  string;
  card_authorization_code: string;
  address_validation_code: string;
  error:                   Error;
}

export interface Error {
  type:   string;
  reason: Reason;
}

export interface Reason {
  id:                     ErrorCodes;
  description:            string;
  additional_description: string;
}

export enum ErrorCodes {
  PEDIR_AUTORIZACION = 1,
  COMERCIO_INVALIDO = 3,
  CAPTURAR_TARJETA = 4,
  DENEGADA = 5,
  RETENGA_Y_LLAME = 7,
  INGRESO_MANUAL_INCORRECTO = 8,
  TRANSACCION_INVALIDA = 12,
  MONTO_INVALIDO = 13,
  TARJETA_INVALIDA = 14,
  AUTO_APPROVE_IN_RECEIVEPAYMENT = 19,
  NO_EXISTE_ORIGINAL = 25,
  SERVICIO_NO_DISPONIBLE = 28,
  ERROR_EN_FORMATO = 30,
  PARAMETER_MUST_BE_SPECIFIED = 31,
  EXCEDE_ING_DE_PIN = 38,
  INGRESO_MANUAL_INCORRECTO_AGAIN = 39,
  RETENER_TARJETA = 43,
  NO_OPERA_EN_CUOTAS = 45,
  TARJETA_NO_VIGENTE = 46,
  PIN_REQUERIDO = 47,
  EXCEDE_MAX_CUOTAS = 48,
  ERROR_FECHA_VENCIM = 49,
  ENTREGA_SUPERA_LIMITE = 50,
  FONDOS_INSUFICIENTES = 51,
  CUENTA_INEXISTENTE = 53,
  TARJETA_VENCIDA = 54,
  PIN_INCORRECTO = 55,
  TARJ_NO_HABILITADA = 56,
  TRANS_NO_PERMITIDA = 57,
  SERVICIO_INVALIDO = 58,
  EXCEDE_LIMITE = 61,
  EXCEDE_LIM_TARJETA = 65,
  LLAMAR_AL_EMISOR = 76,
  ERROR_PLAN_CUOTAS = 77,
  TERMINAL_INVALIDA = 89,
  EMISOR_FUERA_LINEA = 91,
  NRO_SEC_DUPLICAD = 94,
  RE_TRANSMITIENDO = 95,
  ERROR_EN_SISTEMA = 96,
  ERROR_SISTEMA_HOST = 97,
  VER_RECHAZO_EN_TICKET = 98,
}

export const ErrorDescriptions: {
  [key in ErrorCodes]: { short: string; detailed: string };
} = {
  [ErrorCodes.PEDIR_AUTORIZACION]: {
    short: "PEDIR AUTORIZACION",
    detailed:
      "Solicitar autorización telefónica, en caso de ser aprobada, cargar el código obtenido y dejar la operación en OFFLINE.",
  },
  [ErrorCodes.COMERCIO_INVALIDO]: {
    short: "COMERCIO INVALIDO",
    detailed:
      "Verificar parámetros del sistema, código de comercio mal cargado",
  },
  [ErrorCodes.CAPTURAR_TARJETA]: {
    short: "CAPTURAR TARJETA",
    detailed: "Denegada, capturar la tarjeta.",
  },
  [ErrorCodes.DENEGADA]: { short: "DENEGADA", detailed: "Denegada." },
  [ErrorCodes.RETENGA_Y_LLAME]: {
    short: "RETENGA Y LLAME",
    detailed: "Denegada, llamar al Centro de Autorizaciones.",
  },
  [ErrorCodes.INGRESO_MANUAL_INCORRECTO]: {
    short: "INGRESO MANUAL INCORRECTO",
    detailed: "Ingreso manual incorrecto.",
  },
  [ErrorCodes.TRANSACCION_INVALIDA]: {
    short: "TRANSAC. INVALIDA",
    detailed: "Verificar el sistema, transacción no reconocida en el sistema.",
  },
  [ErrorCodes.MONTO_INVALIDO]: {
    short: "MONTO INVALIDO",
    detailed: "Verificar el sistema, error en el formato del campo importe.",
  },
  [ErrorCodes.TARJETA_INVALIDA]: {
    short: "TARJETA INVALIDA",
    detailed: "Denegada, tarjeta no corresponde.",
  },
  [ErrorCodes.AUTO_APPROVE_IN_RECEIVEPAYMENT]: {
    short: "AUTO APPROVE IN RECEIVEPAYMENT",
    detailed: "Auto approve in ReceivePayment.",
  },
  [ErrorCodes.NO_EXISTE_ORIGINAL]: {
    short: "NO EXISTE ORIGINAL	",
    detailed: "Denegada, registro no encontrado en el archivo de transacciones.",
  },
  [ErrorCodes.SERVICIO_NO_DISPONIBLE]: {
    short: "SERVICIO NO DISPONIBLE",
    detailed: "Momentáneamente el servicio no está disponible. Se debe reintentar en unos segundos.",
  },
  [ErrorCodes.ERROR_EN_FORMATO]: {
    short: "ERROR EN FORMATO",
    detailed: "Verificar el sistema, error en el formato del mensaje.",
  },
  [ErrorCodes.PARAMETER_MUST_BE_SPECIFIED]: {
    short: "THE PARAMETER MUST BE SPECIFIED",
    detailed: "The parameter must be specified when another.",
  },
  [ErrorCodes.EXCEDE_ING_DE_PIN]: {
    short: "EXCEDE ING.DE PIN	",
    detailed: "Denegada, excede cantidad de reintentos de PIN.",
  },
  [ErrorCodes.INGRESO_MANUAL_INCORRECTO_AGAIN]: {
    short: "INGRESO MANUAL INCORRECTO",
    detailed: "Ingreso manual incorrecto.",
  },
  [ErrorCodes.RETENER_TARJETA]: {
    short: "RETENER TARJETA",
    detailed: "Denegada, retener tarjeta.",
  },
  [ErrorCodes.NO_OPERA_EN_CUOTAS]: {
    short: "NO OPERA EN CUOTAS",
    detailed: "Denegada, tarjeta inhibida para operar en cuotas.",
  },
  [ErrorCodes.TARJETA_NO_VIGENTE]: {
    short: "TARJETA NO VIGENTE",
    detailed: "Denegada, tarjeta no está vigente aún.",
  },
  [ErrorCodes.PIN_REQUERIDO]: {
    short: "PIN REQUERIDO",
    detailed: "Denegada, tarjeta requiere ingreso de PIN.",
  },
  [ErrorCodes.EXCEDE_MAX_CUOTAS]: {
    short: "EXCEDE MAX. CUOTAS",
    detailed: "Denegada, excede cantidad máxima de cuotas permitida.",
  },
  [ErrorCodes.ERROR_FECHA_VENCIM]: {
    short: "ERROR FECHA VENCIM.",
    detailed: "Verificar el sistema, error en formato de fecha de expiración (vto).",
  },
  [ErrorCodes.ENTREGA_SUPERA_LIMITE]: {
    short: "ENTREGA SUPERA LIMITE",
    detailed: "Entrega supera limite.",
  },
  [ErrorCodes.FONDOS_INSUFICIENTES]: {
    short: "FONDOS INSUFICIENTES",
    detailed: "Denegada, no posee fondos suficientes.",
  },
  [ErrorCodes.CUENTA_INEXISTENTE]: {
    short: "CUENTA INEXISTENTE",
    detailed: "Denegada, no existe cuenta asociada.",
  },
  [ErrorCodes.TARJETA_VENCIDA]: {
    short: "TARJETA VENCIDA",
    detailed: "Denegada, tarjeta expirada.",
  },
  [ErrorCodes.PIN_INCORRECTO]: {
    short: "PIN INCORRECTO",
    detailed: "Denegada, código de identificación personal es incorrecto.",
  },
  [ErrorCodes.TARJ_NO_HABILITADA]: {
    short: "TARJ. NO HABILITADA",
    detailed: "Denegada, emisor no habilitado en el sistema.",
  },
  [ErrorCodes.TRANS_NO_PERMITIDA]: {
    short: "TRANS. NO PERMITIDA",
    detailed: "Verificar el sistema, transacción no permitida a dicha tarjeta.",
  },
  [ErrorCodes.SERVICIO_INVALIDO]: {
    short: "SERVICIO INVALIDO",
    detailed: "Verificar el sistema, transacción no permitida a dicha terminal.",
  },
  [ErrorCodes.EXCEDE_LIMITE]: {
    short: "EXCEDE LIMITE",
    detailed: "Denegada, excede límite remanente de la tarjeta.",
  },
  [ErrorCodes.EXCEDE_LIM_TARJETA]: {
    short: "EXCEDE LIM. TARJETA",
    detailed: "Denegada, excede límite remanente de la tarjeta.",
  },
  [ErrorCodes.LLAMAR_AL_EMISOR]: {
    short: "LLAMAR AL EMISOR",
    detailed: "Solicitar autorización telefónica, en caso de ser aprobada, cargar el código obtenido y dejar la operación en.",
  },
  [ErrorCodes.ERROR_PLAN_CUOTAS]: {
    short: "ERROR PLAN/CUOTAS",
    detailed: "Denegada, cantidad de cuotas inválida para el plan seleccionado.",
  },
  [ErrorCodes.TERMINAL_INVALIDA]: {
    short: "TERMINAL INVALIDA",
    detailed: "Denegada, número de terminal no habilitado por el Emisor.",
  },
  [ErrorCodes.EMISOR_FUERA_LINEA]: {
    short: "EMISOR FUERA LINEA	",
    detailed: "Solicitar autorización telefónica, en caso de ser aprobada, cargar el código obtenido y dejar la operación en",
  },
  [ErrorCodes.NRO_SEC_DUPLICAD]: {
    short: "NRO. SEC. DUPLICAD",
    detailed: "Denegada. Error en mensaje. Envíe nuevamente la transacción incrementando en uno el system trace de la misma",
  },
  [ErrorCodes.RE_TRANSMITIENDO]: {
    short: "RE-TRANSMITIENDO",
    detailed: "Diferencias en la conciliación del cierre, envíe Batch Upload.",
  },
  [ErrorCodes.ERROR_EN_SISTEMA]: {
    short: "ERROR EN SISTEMA",
    detailed: "Mal funcionamiento del sistema. Solicitar autorización telefónica.",
  },
  [ErrorCodes.ERROR_SISTEMA_HOST]: {
    short: "Error en sistema host",
    detailed: "Error en sistema host",
  },
  [ErrorCodes.VER_RECHAZO_EN_TICKET]: {
    short: "VER RECHAZO EN TICKET",
    detailed: "Deben imprimir la información Suministrada en el Campo ISO 63.",
  },
}; // Agrega el resto de los errores aquí... };
