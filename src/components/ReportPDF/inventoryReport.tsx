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

  doc.output("pdfobjectnewwindow"); 
};