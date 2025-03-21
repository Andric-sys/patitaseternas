import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Pet from "@/models/Pet"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const pet = await Pet.findById(params.id)

    if (!pet) {
      return NextResponse.json({ error: "Mascota no encontrada" }, { status: 404 })
    }

    return NextResponse.json(pet)
  } catch (error) {
    console.error("Error fetching pet:", error)
    return NextResponse.json({ error: "Error al obtener la mascota" }, { status: 500 })
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

    const pet = await Pet.findByIdAndUpdate(params.id, { ...data }, { new: true })

    if (!pet) {
      return NextResponse.json({ error: "Mascota no encontrada" }, { status: 404 })
    }

    return NextResponse.json(pet)
  } catch (error) {
    console.error("Error updating pet:", error)
    return NextResponse.json({ error: "Error al actualizar la mascota" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const pet = await Pet.findByIdAndDelete(params.id)

    if (!pet) {
      return NextResponse.json({ error: "Mascota no encontrada" }, { status: 404 })
    }

    return NextResponse.json({ message: "Mascota eliminada correctamente" })
  } catch (error) {
    console.error("Error deleting pet:", error)
    return NextResponse.json({ error: "Error al eliminar la mascota" }, { status: 500 })
  }
}

