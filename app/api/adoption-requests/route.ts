import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import AdoptionRequest from "@/models/AdoptionRequest"
import Pet from "@/models/Pet"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(req: NextRequest) {
  try {
    await dbConnect()

    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(req.url)
    const userId = url.searchParams.get("userId")

    // Build query
    const query: any = {}
    if (userId) query.userId = userId

    const requests = await AdoptionRequest.find(query).populate("petId").sort({ fechaSolicitud: -1 })

    return NextResponse.json(requests)
  } catch (error) {
    console.error("Error fetching adoption requests:", error)
    return NextResponse.json({ error: "Error al obtener las solicitudes de adopción" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const data = await req.json()

    // Validate required fields
    if (!data.petId || !data.mensaje) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // Check if pet exists and is available
    const pet = await Pet.findById(data.petId)
    if (!pet) {
      return NextResponse.json({ error: "Mascota no encontrada" }, { status: 404 })
    }

    if (pet.estado !== "disponible") {
      return NextResponse.json({ error: "Esta mascota no está disponible para adopción" }, { status: 400 })
    }

    // Check if user already has a pending request for this pet
    const existingRequest = await AdoptionRequest.findOne({
      petId: data.petId,
      userId: session.user.id,
      estado: "pendiente",
    })

    if (existingRequest) {
      return NextResponse.json({ error: "Ya tienes una solicitud pendiente para esta mascota" }, { status: 400 })
    }

    // Create new adoption request
    const newRequest = new AdoptionRequest({
      petId: data.petId,
      userId: session.user.id,
      mensaje: data.mensaje,
      fechaSolicitud: new Date(),
    })

    await newRequest.save()

    // Update pet status to 'en_proceso'
    pet.estado = "en_proceso"
    await pet.save()

    return NextResponse.json(newRequest, { status: 201 })
  } catch (error) {
    console.error("Error creating adoption request:", error)
    return NextResponse.json({ error: "Error al crear la solicitud de adopción" }, { status: 500 })
  }
}

