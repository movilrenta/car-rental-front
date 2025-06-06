export const STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
};

export const generateCrudResponses = (entity: string) => ({
  POST: {
    SUCCESS: {
      message: `${entity} creado/a correctamente`,
      code: STATUS.CREATED
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
  USER: generateCrudResponses('Usuario')
};

//return Response.json(RESPONSE.FECHAS.POST.SUCCESS);


// export const RESPONSE = {
//   UNAUTHORIZED: {
//     mesage: 'No autorizado',
//     code: STATUS.UNAUTHORIZED
//   },
//   FECHAS: {
//     POST: {
//       SUCCESS: {
//         mesage: "Fecha creada",
//         code: 201
//       },
//       ERROR: {
//         mesage: "Error al crear fecha",
//         code: 400
//       },
//     },
//     PUT: {
//       SUCCESS: {
//         mesage: "Fecha actualizada",
//         code: 200
//       },
//       ERROR: {
//         mesage: "Error al actualizar fecha",
//         code: 400
//       }
//     },
//     DELETE: {
//       SUCCESS: {
//         mesage: "Fecha eliminada",
//         code: 200
//       },
//       ERROR: {
//         mesage: "Error al eliminar fecha",
//         code: 400
//       }
//     },
//   }
// }