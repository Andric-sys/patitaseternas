"use client"

import { useState } from "react"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check } from "lucide-react"

interface PayPalButtonProps {
  adoptionRequestId: string
  onSuccess: () => void
}

export function PayPalButton({ adoptionRequestId, onSuccess }: PayPalButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const createOrder = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/payments/paypal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adoptionRequestId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al crear la orden de PayPal")
      }

      return data.id
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar el pago")
      return null
    } finally {
      setLoading(false)
    }
  }

  const onApprove = async (data: { orderID: string }) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/payments/paypal", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: data.orderID,
          adoptionRequestId,
        }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || "Error al capturar el pago")
      }

      setSuccess(true)
      onSuccess()

      return responseData
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar el pago")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <Check className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">¡Pago completado!</AlertTitle>
        <AlertDescription className="text-green-700">
          Tu pago ha sido procesado correctamente. ¡Gracias por adoptar!
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600 mb-4">
          El costo de adopción es de $500 MXN. Este monto ayuda a cubrir gastos veterinarios y de cuidado de las
          mascotas.
        </p>

        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          style={{ layout: "vertical", shape: "rect" }}
          disabled={loading}
        />
      </div>
    </div>
  )
}

