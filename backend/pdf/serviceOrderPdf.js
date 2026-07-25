import PDFDocument from "pdfkit";

export function generateServiceOrderPDF(order, reply) {

  const doc = new PDFDocument();

  reply.header("Content-Type", "application/pdf");
  reply.header(
    "Content-Disposition",
    `attachment; filename=ordem-servico-${order.id}.pdf`
  );

  doc.pipe(reply.raw);

  doc.fontSize(20)
    .text("ORDEM DE SERVIÇO", {
      align: "center"
    });

  doc.moveDown();

  doc.fontSize(12);

  doc.text(`Número da OS: ${order.id}`);
  doc.text(`Data: ${order.service_date}`);
  doc.text(`Veículo ID: ${order.vehicle_id}`);
  doc.text(`KM: ${order.km_vehicle}`);

  doc.moveDown();

  doc.fontSize(14)
    .text("Serviço");

  doc.fontSize(12);

  doc.text(`Tipo: ${order.service_type}`);
  doc.text(`Descrição: ${order.description}`);
  doc.text(`Mecânico: ${order.mechanic}`);
  doc.text(`Status: ${order.status}`);

  doc.moveDown();

  doc.text(`Valor: R$ ${order.cost}`);

  doc.moveDown();

  doc.text("--------------------------------");

  doc.text("Assinatura do responsável:");

  doc.moveDown(3);

  doc.text("____________________________");

  doc.end();
}