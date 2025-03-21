import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Pet from "@/models/Pet"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(req: NextRequest) {
  try {
    await dbConnect()

    // Get query parameters
    const url = new URL(req.url)
    const especie = url.searchParams.get("especie")
    const tamaño = url.searchParams.get("tamaño")
    const edad = url.searchParams.get("edad")
    const estado = url.searchParams.get("estado")

    // Build query
    const query: any = {}
    if (especie && especie !== "todas") query.especie = especie
    if (tamaño && tamaño !== "todos") query.tamaño = tamaño
    if (edad && edad !== "todas") query.edad = edad
    if (estado && estado !== "todos") query.estado = estado

    const pets = await Pet.find(query).sort({ fechaPublicacion: -1 })

    return NextResponse.json(pets)
  } catch (error) {
    console.error("Error fetching pets:", error)
    return NextResponse.json({ error: "Error al obtener las mascotas" }, { status: 500 })
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
    if (!data.nombre || !data.especie || !data.edad || !data.tamaño) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // Create new pet
    const newPet = new Pet({
      ...data,
      createdBy: session.user.id,
      fechaPublicacion: new Date(),
    })

    await newPet.save()

    return NextResponse.json(newPet, { status: 201 })
  } catch (error) {
    console.error("Error creating pet:", error)
    return NextResponse.json({ error: "Error al crear la mascota" }, { status: 500 })
  }
}

