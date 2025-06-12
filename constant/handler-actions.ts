export const STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500
};

export const generateCrudResponses = (entity: string) => ({
  POST: {
    SUCCESS: {
      message: `${entity} creado/a correctamente`,
      code: STATUS.CREATED
    },
    CONFLICT:{
      message: `${entity} ya existe`,
      code: STATUS.CONFLICT
    },
    ERROR: {
      message: `Error al crear ${entity}`,
      code: STATUS.BAD_REQUEST
    },
    NO_IMAGE: {
      message:`Se debe incluir una imagen`,
      code: STATUS.BAD_REQUEST
    },
    ERROR_UPLOAD: {
      message: 'Error al subir imagen',
      code: STATUS.BAD_REQUEST
    }
  },
  PUT: {
    SUCCESS: {
      message: `${entity} actualizado/a correctamente`,
      code: STATUS.OK
    },
    ERROR: {
      message: `Error al actualizar ${entity}`,
      code: STATUS.BAD_REQUEST
    },
    NO_IMAGE: {
      message:`Se debe incluir una imagen`,
      code: STATUS.BAD_REQUEST
    },
    ERROR_UPLOAD: {
      message: 'Error al subir imagen',
      code: STATUS.BAD_REQUEST
    }
  },
  DELETE: {
    SUCCESS: {
      message: `${entity} eliminado/a correctamente`,
      code: STATUS.OK
    },
    ERROR: {
      message: `Error al eliminar ${entity}`,
      code: STATUS.BAD_REQUEST
    }
  }
});

export const RESPONSE = {
  UNAUTHORIZED: {
    message: 'No autorizado',
    code: 401
  },
  ADDRESSES: generateCrudResponses('Dirección'),
  BRAND: generateCrudResponses('Marca'),
  BRANCHES: generateCrudResponses('Sucursal'),
  CARROUSEL: generateCrudResponses('Carrousel'),
  CARS: generateCrudResponses('Auto'),
  FECHAS: generateCrudResponses('Fecha'),
  GROUPS: generateCrudResponses('Grupo'),
  RESERVATION: generateCrudResponses('Reserva'),
  USER: generateCrudResponses('Usuario'),
  PASSWORD: generateCrudResponses('Contraseña')
};
