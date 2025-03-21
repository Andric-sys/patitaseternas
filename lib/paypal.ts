// Función para inicializar el botón de PayPal
export const initPayPalButton = (containerId: string, amount: number, onSuccess: (details: any) => void) => {
  // Esta función se ejecutaría en el cliente
  if (typeof window !== "undefined" && (window as any).paypal) {
    const paypal = (window as any).paypal

    paypal
      .Buttons({
        style: {
          shape: "rect",
          color: "gold",
          layout: "vertical",
          label: "paypal",
        },

        createOrder: (data: any, actions: any) =>
          actions.order.create({
            purchase_units: [
              {
                description: "Donación a Patitas Eternas",
                amount: {
                  currency_code: "USD",
                  value: amount.toString(),
                },
              },
            ],
          }),

        onApprove: (data: any, actions: any) =>
          actions.order.capture().then((details: any) => {
            // Llamar a la función de éxito proporcionada
            onSuccess(details)
          }),

        onError: (err: any) => {
          console.error("Error en el pago con PayPal:", err)
        },
      })
      .render(`#${containerId}`)
  }
}

// Función para enviar correo con detalles de pago
export const sendPaymentConfirmationEmail = async (email: string, paymentDetails: any) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject: "Confirmación de Donación - Patitas Eternas",
        paymentDetails,
      }),
    })

    if (!response.ok) {
      throw new Error("Error al enviar el correo de confirmación")
    }

    return await response.json()
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}

// Función para generar PDF de recibo
export const generateReceiptPDF = async (paymentDetails: any) => {
  try {
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentDetails }),
    })

    if (!response.ok) {
      throw new Error("Error al generar el PDF")
    }

    // Devuelve el blob del PDF
    return await response.blob()
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}

