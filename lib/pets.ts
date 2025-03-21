import dbConnect from "./mongodb"
import Pet, { type IPet } from "@/models/Pet"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// Get all pets
export const getPets = async (): Promise<IPet[]> => {
  await dbConnect()
  const pets = await Pet.find({}).sort({ fechaPublicacion: -1 })
  return JSON.parse(JSON.stringify(pets))
}

// Get a pet by ID
export const getPetById = async (id: string): Promise<IPet | null> => {
  await dbConnect()
  const pet = await Pet.findById(id)
  return pet ? JSON.parse(JSON.stringify(pet)) : null
}

// Save a new pet
export const savePet = async (petData: Partial<IPet>, imageFile: File): Promise<IPet> => {
  await dbConnect()

  // Get the current user session
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error("Debes iniciar sesión para crear una publicación")
  }

  // Handle image upload (in a real app, you'd upload to a storage service)
  // For this example, we'll use a data URL
  const imageUrl = await readFileAsDataURL(imageFile)

  // Create the new pet
  const newPet = new Pet({
    ...petData,
    foto: imageUrl,
    createdBy: session.user.id,
  })

  await newPet.save()

  return JSON.parse(JSON.stringify(newPet))
}

// Update pet status
export const updatePetStatus = async (id: string, status: "disponible" | "adoptado" | "en_proceso"): Promise<IPet> => {
  await dbConnect()

  // Get the current user session
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error("Debes iniciar sesión para actualizar una mascota")
  }

  const pet = await Pet.findByIdAndUpdate(id, { estado: status }, { new: true })

  if (!pet) {
    throw new Error("Mascota no encontrada")
  }

  return JSON.parse(JSON.stringify(pet))
}

// Helper function to read a file as a data URL
const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

