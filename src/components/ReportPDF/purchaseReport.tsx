import jsPDF from "jspdf";
import "jspdf-autotable";
import { dateParse } from "src/utils/dateParser";

export const generaPdf = (data: any) => {

  const { provider, purchaseDetails, ...others} = data;

  const ventaDetalle = [];

  purchaseDetails.map((item:any) => {
    const { product, inventory, ...detalle } = item;

    return ventaDetalle.push({
      codigo: product.codigo,
      nombreProducto: product.nombreProducto,
      lot:inventory.lot,
      ...detalle,
    });
  });

  const columns = [
    { title: "Codigo Producto", field: "codigo" },
    { title: "Nombre Producto", field: "nombreProducto" },
    { title: "Lote", field: "lot" },
    { title: "Cantidad", field: "quantity" },
    { title: "Precio Unitario Bs.", field: "price", type: "numeric" },
    { title: "Importe Bs.", field: "amount", type: "currency" },
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
  doc.text(`Compra # ${others.id} `, 20, 47);

  //Fecha
  doc.setTextColor(33, 33, 33);
  doc.text(`Fecha de Compra: ${dateParse(others.date)}`, 120, 46);

  //Datos del Proveedor
  doc.setFontSize(12);
  doc.text(`DNI / NIT: ${provider.nitCi}`, 20, 60);
  doc.text(`Razon Social: ${provider.businessName}`,20,70);

  //Titulo 
  doc.setFont("PTSans", "bold").setFontSize(20);
  doc.text("DETALLE DE COMPRA", 40, 30, { align: "left", charSpace: 3 });

  doc.autoTable({
    margin: { top: 80 },
    theme: "striped",
    headStyles: { fillColor: [124, 95, 240] },
    columns: columns.map((col) => ({ ...col, dataKey: col.field })),
    body: ventaDetalle,
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