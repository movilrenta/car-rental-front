import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
  },
  header: {
    flexDirection: "row",
    border: "1px solid black",
    padding: 10,
  },
  leftBox: {
    flex: 2,
  },
  rightBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderLeft: "1px solid black",
  },
  bold: {
    fontWeight: "bold",
  },
  box: {
    marginTop: 10,
    border: "1px solid black",
    padding: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 3,
  },
  label: {
    width: 100,
    fontWeight: "bold",
  },
  imputaciones: {
    marginTop: 20,
    border: "1px solid black",
  },
  imputacionesHeader: {
    backgroundColor: "#eee",
    textAlign: "center",
    padding: 4,
    fontWeight: "bold",
    fontSize: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderTop: "1px solid black",
    padding: 4,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});

export const ReciboPDF = ({
  numero = 215,
  fecha = "05/05/2025",
  cliente = "Pedro Gimenez",
  direccion = "Cerro Colorado 2956 - Bella Vista",
  montoTexto = "SIN VALOR",
  formaPago = "Efectivo",
  detalles = "Prueba",
  nroVenta = "ACF127YRT",
  importeImputado = "210000",
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Image
        src="https://www.movilrenta.com.ar/_next/image?url=%2Fimages2%2Fbrand.png&w=640&q=100&dpl=dpl_GpN89CKhomumPqzBxMaAZPAQ4gzK"
        style={{ width: 120, height: 'auto', marginBottom: 20, alignSelf: 'center' }}
      />
      <View style={styles.header}>
        <View style={styles.leftBox}>
          <Text style={styles.bold}>MOVIL RENTA S.A.</Text>
          <Text>CUIT: 30-95555555-8</Text>
          <Text>Alquiler de vehículos</Text>
          <Text>San Lorenzo 370 - San Miguel de Tucumán</Text>
          <Text>Teléfonos: 0800 777 7368 // 4668-8733</Text>
          <Text>Email: informes@movilrenta.com.ar</Text>
        </View>
        <View style={styles.rightBox}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>X</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>RECIBO</Text>
          <Text style={{ fontSize: 8 }}>Documento no válido como factura</Text>
          <Text style={{ marginTop: 5 }}>
            <Text style={styles.bold}>Número:</Text> {numero.toString().padStart(10,'0')}
          </Text>
          <Text>
            <Text style={styles.bold}>Fecha:</Text> {fecha}
          </Text>
        </View>
      </View>

      {/* Cliente y pago info */}
      <View style={styles.box}>
        <Text style={{ marginBottom: 5 }}>
          <Text style={styles.bold}>Cliente:</Text> {cliente}
        </Text>
        <Text style={{ marginBottom: 5 }}>
          <Text style={styles.bold}>Dirección:</Text> {direccion}
        </Text>
        <Text style={{ marginBottom: 5 }}>
          <Text style={styles.bold}>Recibimos la suma de $</Text>{importeImputado} ({montoTexto})
        </Text>
        <Text style={{ marginBottom: 5 }}>
          <Text style={styles.bold}>Forma de Pago:</Text> {formaPago}
        </Text>
        <Text>
          <Text style={styles.bold}>Detalles:</Text> {detalles}
        </Text>
      </View>

      {/* Imputaciones */}
      <View style={styles.imputaciones}>
        <Text style={styles.imputacionesHeader}>DETALLE DE IMPUTACIONES</Text>
        <View style={styles.tableRow}>
          <Text style={[styles.cell, styles.bold]}>Código de reserva</Text>
          <Text style={[styles.cell, styles.bold]}>Importe Imputado</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>{nroVenta}</Text>
          <Text style={styles.cell}>{importeImputado}</Text>
        </View>
      </View>
    </Page>
  </Document>
);
