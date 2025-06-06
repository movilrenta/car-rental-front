export function numeroATextoCompleto(numero: number): string {
  if (isNaN(numero) || !isFinite(numero)) {
    return "Número inválido";
  }

  const partes = numero.toString().split('.');
  const entero = parseInt(partes[0], 10);
  const decimalStr = partes[1];
  let textoDecimal = "";

  if (decimalStr) {
    const centavos = decimalStr.padEnd(2, '0').slice(0, 2);
    textoDecimal = `con ${centavos}/100`;
  } else {
    textoDecimal = "";
  }

  let textoEntero = "";
  if (entero === 0) {
    textoEntero = "cero pesos";
  } else if (entero === 1) {
    textoEntero = "un peso";
  } else {
    const millones = Math.floor(entero / 1000000);
    const miles = Math.floor((entero % 1000000) / 1000);
    const resto = entero % 1000;

    let enteroEnTexto = "";
    if (millones > 0) {
      enteroEnTexto += convertirGrupo(millones) + (millones === 1 ? " millón" : " millones");
    }

    if (miles > 0) {
      if (enteroEnTexto !== "") {
        enteroEnTexto += " ";
      }
      enteroEnTexto += (miles === 1 && millones === 0 ? "mil" : convertirGrupo(miles) + " mil");
    }

    if (resto > 0 || (entero === 0 && millones === 0 && miles === 0)) {
      if (enteroEnTexto !== "" && resto !== 0) {
        enteroEnTexto += " ";
      }
      enteroEnTexto += convertirGrupo(resto);
    }
    textoEntero = enteroEnTexto ? `${enteroEnTexto} pesos` : `${entero} pesos`;
    if (entero === 0) textoEntero = "cero pesos";
    if (entero === 1) textoEntero = "un peso";
  }

  return `${textoEntero} ${textoDecimal}`.trim();
}

export function convertirGrupo(n: number): string {
  if (n === 0) return "";
  if (n < 0) return "menos " + convertirGrupo(-n);

  const unidades = ["", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
  const decenasEspeciales = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
  const decenas = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  const centenas = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

  let texto = "";

  const cent = Math.floor(n / 100);
  const dec = Math.floor((n % 100) / 10);
  const uni = n % 10;

  if (cent > 0) {
    texto += centenas[cent];
    if (dec > 0 || uni > 0) {
      texto += " ";
    }
  }

  if (dec === 1) {
    texto += decenasEspeciales[uni];
  } else if (dec > 0) {
    texto += decenas[dec];
    if (uni > 0) {
      texto += " y " + unidades[uni];
    }
  } else if (uni > 0) {
    texto += unidades[uni];
  }

  return texto;
}

export const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result?.toString() || '';
      const base64 = result.split(',')[1]; // Remueve el encabezado "data:application/pdf;base64,"
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });