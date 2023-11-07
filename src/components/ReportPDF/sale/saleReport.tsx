import jsPDF from "jspdf";
import "jspdf-autotable";
import { dateParse } from "src/utils/dateParser";

export const saleReportPDF = (data: any) => {

  const { client, saleDetails, ...others} = data;

  const formattedSaleDetails = saleDetails.map((detail:any) => ({
    "codigo": detail.product.codigo,
    "nombreProducto": detail.product.nombreProducto,
    "cantidad": detail.cantidad,
    "precio": detail.precio,
    "importe": detail.importe,
  }));

  const columns = [
    { title: "Codigo Producto", field: "codigo" },
    { title: "Nombre Producto", field: "nombreProducto" },
    { title: "Cantidad", field: "cantidad" },
    { title: "Precio Unitario Bs.", field: "precio", type: "numeric" },
    { title: "Importe Bs.", field: "importe", type: "currency" },
  ];

  const doc = new jsPDF();


  //Triangulo gris cabecera
  doc.setDrawColor(0);
  doc.setFillColor(234, 237, 237);
  doc.rect(0, 0, 800, 50, "F");

  //Figura forma flecha
  doc.setFillColor(124, 95, 240);
  doc.rect(0, 40, 80, 10, "F");
  doc.triangle(80, 40, 85, 45, 80, 50, "F");

  //Numero de Recibo
  doc.setTextColor(255, 255, 255);
  doc.text(`Venta # ${others.idVenta} `, 20, 47);

  //Fecha
  doc.setTextColor(33, 33, 33);
  doc.text(`Fecha de Venta: ${dateParse(others.fecha)}`, 120, 46);

  //Datos del Proveedor
  doc.setFontSize(12);
  doc.text(`DNI / NIT: ${client.nitCi}`, 20, 60);
  doc.text(`Razon Social: ${client.businessName}`,20,70);

 //Titulo 
 doc.setFont("PTSans", "bold").setFontSize(20);
 doc.text("DETALLE VENTA", 58, 30, { align: "left", charSpace: 3 });

  doc.autoTable({
    margin: { top: 80 },
    theme: "striped",
    headStyles: { fillColor: [124, 95, 240] },
    columns: columns.map((col) => ({ ...col, dataKey: col.field })),
    body: formattedSaleDetails,
  });

  const alto = doc.lastAutoTable.finalY;
  doc.setFillColor(124, 95, 240);
  doc.rect(135, alto + 4, 55, 11, "F");
  doc.triangle(190, alto + 4, 195, alto + 9.5, 190, alto + 15, "F");

  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  const importeTotal = parseFloat(others.total).toFixed(2)
  doc.text(`Total Bs.:  ${importeTotal}`, 145, alto + 11);

  doc.setTextColor(33, 33, 33);
  doc.setFontSize(12);

  doc.output("pdfobjectnewwindow"); 
};