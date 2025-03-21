import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import AdoptionRequest from "@/models/AdoptionRequest"
import Pet from "@/models/Pet"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const request = await AdoptionRequest.findById(params.id).populate("petId")

    if (!request) {
      return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 })
    }

    // Check if user is authorized to view this request
    if (request.userId.toString() !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    return NextResponse.json(request)
  } catch (error) {
    console.error("Error fetching adoption request:", error)
    return NextResponse.json({ error: "Error al obtener la solicitud de adopción" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const data = await req.json()

    const request = await AdoptionRequest.findById(params.id)

    if (!request) {
      return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 })
    }

    // Only admin can update status
    if (data.estado && session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado para cambiar el estado" }, { status: 403 })
    }

    // Update request
    Object.assign(request, data)
    await request.save()

    // If status is updated to 'aprobada', 'rechazada', or 'completada', update pet status
    if (data.estado) {
      const pet = await Pet.findById(request.petId)

      if (pet) {
        if (data.estado === "aprobada") {
          // Keep as 'en_proceso' until payment is completed
          pet.estado = "en_proceso"
        } else if (data.estado === "completada") {
          pet.estado = "adoptado"
        } else if (data.estado === "rechazada") {
          // Check if there are other pending requests for this pet
          const otherRequests = await AdoptionRequest.find({
            petId: pet._id,
            estado: "pendiente",
            _id: { $ne: request._id },
          })

          if (otherRequests.length === 0) {
            pet.estado = "disponible"
          }
        }

        await pet.save()
      }
    }

    return NextResponse.json(request)
  } catch (error) {
    console.error("Error updating adoption request:", error)
    return NextResponse.json({ error: "Error al actualizar la solicitud de adopción" }, { status: 500 })
  }
}

