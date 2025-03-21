import { NextResponse } from "next/server"
import PDFDocument from "pdfkit"

export async function POST(request: Request) {
  try {
    const { paymentDetails } = await request.json()

    // Crear un buffer para almacenar el PDF
    const buffers: Buffer[] = []
    const doc = new PDFDocument({ margin: 50 })

    // Recopilar los datos del PDF en buffers
    doc.on("data", buffers.push.bind(buffers))

    // Agregar contenido al PDF
    doc.fontSize(25).text("Patitas Eternas", { align: "center" }).moveDown()

    doc.fontSize(20).text("Recibo de Donación", { align: "center" }).moveDown()

    doc
      .fontSize(12)
      .text(`ID de Transacción: ${paymentDetails.id}`)
      .text(`Fecha: ${new Date(paymentDetails.create_time).toLocaleDateString()}`)
      .text(
        `Monto: $${paymentDetails.purchase_units[0].amount.value} ${paymentDetails.purchase_units[0].amount.currency_code}`,
      )
      .text(`Estado: ${paymentDetails.status}`)
      .moveDown()

    doc
      .fontSize(12)
      .text(
        "Gracias por tu generosa donación. Tu contribución nos ayudará a seguir cuidando de nuestras mascotas y encontrarles un hogar amoroso.",
        {
          align: "center",
          width: 410,
        },
      )
      .moveDown(2)

    doc.fontSize(10).text("© Patitas Eternas. Todos los derechos reservados.", {
      align: "center",
    })

    // Finalizar el PDF
    doc.end()

    // Convertir los buffers a un solo buffer
    const pdfBuffer = Buffer.concat(buffers)

    // Devolver el PDF como respuesta
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=recibo-donacion.pdf",
      },
    })
  } catch (error) {
    console.error("Error al generar el PDF:", error)
    return NextResponse.json({ success: false, message: "Error al generar el PDF" }, { status: 500 })
  }
}

