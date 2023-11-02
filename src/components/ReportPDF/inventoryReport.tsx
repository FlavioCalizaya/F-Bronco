import jsPDF from "jspdf";
import "jspdf-autotable";
import { dateParse } from "src/utils/dateParser";

export const generaPdf = (data: any) => {

  const inventories = [];

  data.map((item:any, i:number) => {
    const { product, ...detalle } = item;

    return inventories.push({
      numero: i+1,
      codigo: product.codigo,
      nombreProducto: product.nombreProducto,
      fecha: dateParse(detalle.date),
      ...detalle,
    });
  });

  const columns = [
    { title: "N°", field: "numero" },
    { title: "Fecha Registro", field: "fecha" },
    { title: "Codigo Producto", field: "codigo" },
    { title: "Nombre Producto", field: "nombreProducto" },
    { title: "Lote", field: "lot" },
    { title: "Stock", field: "stock" },
    { title: "Precio Bs.", field: "price", type: "numeric" },
  ];

  const doc = new jsPDF();

  //Titulo 
  doc.setFont("PTSans", "bold").setFontSize(18);
  doc.text("DETALLE DE INVETARIO", 42, 16, { align: "left", charSpace: 2 });

  doc.autoTable({
    margin: { top: 30 },
    theme: "striped",
    headStyles: { fillColor: [124, 95, 240] },
    columns: columns.map((col) => ({ ...col, dataKey: col.field })),
    body: inventories,
  });

  /*
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
*/
  doc.output("pdfobjectnewwindow"); 
};