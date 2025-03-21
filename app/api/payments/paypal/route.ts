import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import AdoptionRequest from "@/models/AdoptionRequest"
import Pet from "@/models/Pet"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// PayPal API endpoints
const PAYPAL_API_URL = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com"
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_SECRET = process.env.PAYPAL_SECRET

// Function to get PayPal access token
async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64")

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()
  return data.access_token
}

// Create PayPal order
export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { adoptionRequestId } = await req.json()

    if (!adoptionRequestId) {
      return NextResponse.json({ error: "ID de solicitud de adopción requerido" }, { status: 400 })
    }

    // Get adoption request
    const adoptionRequest = await AdoptionRequest.findById(adoptionRequestId).populate("petId")

    if (!adoptionRequest) {
      return NextResponse.json({ error: "Solicitud de adopción no encontrada" }, { status: 404 })
    }

    // Check if user is authorized
    if (adoptionRequest.userId.toString() !== session.user.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    // Check if request is approved
    if (adoptionRequest.estado !== "aprobada") {
      return NextResponse.json({ error: "La solicitud de adopción no está aprobada" }, { status: 400 })
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken()

    // Create PayPal order
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: adoptionRequestId,
            description: `Adopción de ${adoptionRequest.petId.nombre}`,
            amount: {
              currency_code: "MXN",
              value: "500.00", // Fixed adoption fee
            },
          },
        ],
        application_context: {
          brand_name: "Patitas Eternas",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${process.env.NEXTAUTH_URL}/adopcion/confirmacion`,
          cancel_url: `${process.env.NEXTAUTH_URL}/adopcion/cancelacion`,
        },
      }),
    })

    const order = await response.json()

    if (order.error) {
      console.error("PayPal API error:", order)
      return NextResponse.json({ error: "Error al crear la orden de PayPal" }, { status: 500 })
    }

    // Update adoption request with PayPal order ID
    adoptionRequest.paymentId = order.id
    adoptionRequest.paymentStatus = "pending"
    await adoptionRequest.save()

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error creating PayPal order:", error)
    return NextResponse.json({ error: "Error al procesar el pago" }, { status: 500 })
  }
}

// Capture PayPal payment
export async function PUT(req: NextRequest) {
  try {
    await dbConnect()

    const { orderId, adoptionRequestId } = await req.json()

    if (!orderId || !adoptionRequestId) {
      return NextResponse.json({ error: "ID de orden y ID de solicitud de adopción requeridos" }, { status: 400 })
    }

    // Get adoption request
    const adoptionRequest = await AdoptionRequest.findById(adoptionRequestId)

    if (!adoptionRequest) {
      return NextResponse.json({ error: "Solicitud de adopción no encontrada" }, { status: 404 })
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken()

    // Capture payment
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const captureData = await response.json()

    if (captureData.error) {
      console.error("PayPal API error:", captureData)
      return NextResponse.json({ error: "Error al capturar el pago de PayPal" }, { status: 500 })
    }

    // Update adoption request
    adoptionRequest.paymentStatus = "completed"
    adoptionRequest.estado = "completada"
    await adoptionRequest.save()

    // Update pet status
    const pet = await Pet.findById(adoptionRequest.petId)
    if (pet) {
      pet.estado = "adoptado"
      await pet.save()
    }

    return NextResponse.json(captureData)
  } catch (error) {
    console.error("Error capturing PayPal payment:", error)
    return NextResponse.json({ error: "Error al procesar el pago" }, { status: 500 })
  }
}

