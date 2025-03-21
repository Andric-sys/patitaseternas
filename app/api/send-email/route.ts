import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { to, subject, paymentDetails } = await request.json()

    // Configurar el transporte de correo (en producción usarías un servicio real)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.example.com",
      port: Number.parseInt(process.env.EMAIL_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || "user@example.com",
        pass: process.env.EMAIL_PASSWORD || "password",
      },
    })

    // Crear el contenido del correo
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #003366; color: white; padding: 20px; text-align: center;">
          <h1>Patitas Eternas</h1>
          <p>¡Gracias por tu donación!</p>
        </div>
        
        <div style="padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9;">
          <h2>Detalles de tu donación</h2>
          
          <p><strong>ID de Transacción:</strong> ${paymentDetails.id}</p>
          <p><strong>Fecha:</strong> ${new Date(paymentDetails.create_time).toLocaleDateString()}</p>
          <p><strong>Monto:</strong> $${paymentDetails.purchase_units[0].amount.value} ${paymentDetails.purchase_units[0].amount.currency_code}</p>
          <p><strong>Estado:</strong> ${paymentDetails.status}</p>
          
          <p style="margin-top: 30px;">Tu generosa contribución nos ayudará a seguir cuidando de nuestras mascotas y encontrarles un hogar amoroso.</p>
          
          <div style="margin-top: 30px; text-align: center;">
            <p>Si tienes alguna pregunta, no dudes en contactarnos:</p>
            <p>info@patitaseternas.com | +123 456 7890</p>
          </div>
        </div>
        
        <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>© ${new Date().getFullYear()} Patitas Eternas. Todos los derechos reservados.</p>
        </div>
      </div>
    `

    // Enviar el correo
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "info@patitaseternas.com",
      to,
      subject,
      html: emailContent,
    })

    return NextResponse.json({ success: true, message: "Correo enviado correctamente" })
  } catch (error) {
    console.error("Error al enviar el correo:", error)
    return NextResponse.json({ success: false, message: "Error al enviar el correo" }, { status: 500 })
  }
}

