import jsPDF from "jspdf";
import "jspdf-autotable";
import { dateParse } from "src/utils/dateParser";

export const generaPdf = (data: any) => {

  const { client, ...others} = data;
    console.log('vvv',data)

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
  doc.text(`Servicio # ${others.id} `, 20, 47);

  //Fecha
  doc.setTextColor(33, 33, 33);
  doc.text(`Fecha: ${dateParse(others.createdAtt)}`, 130, 46);

  //Datos
  doc.setFontSize(12);
  doc.text(`NIT: ${client.nitCi}`, 20, 60);
  doc.text(`Cliente: ${client.businessName}`,20,70);

  //Titulo 
  doc.setFont("PTSans", "bold").setFontSize(20);
  doc.text("ORDEN DE SERVICIO", 40, 30, { align: "left", charSpace: 3 });

    //Datos
    doc.setFontSize(12);
    doc.text(`CONCEPTO`, 20, 90, );
    doc.text(` ${others.description}`,20,100);

    doc.setFontSize(12);
    doc.text(`IMPORTE`, 160, 90, );
    doc.text(` ${others.amount}`,160,100);
 

  doc.output("pdfobjectnewwindow"); 
};