import type { Pet } from "@/types/pet"

// Simulated data storage
let petsData: Pet[] = [
  {
    id: "1",
    nombre: "Max",
    especie: "perro",
    raza: "Labrador",
    edad: "joven",
    tamaño: "grande",
    descripcion:
      "Max es un labrador muy juguetón y cariñoso. Le encanta correr y jugar con pelotas. Es muy bueno con los niños y se lleva bien con otros perros.",
    estado: "disponible",
    fechaPublicacion: "2023-05-15T10:30:00Z",
    ubicacion: "Ciudad de México",
    foto: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    nombre: "Luna",
    especie: "gato",
    raza: "Siamés",
    edad: "adulto",
    tamaño: "mediano",
    descripcion:
      "Luna es una gata siamesa muy tranquila y cariñosa. Le gusta dormir en lugares cálidos y jugar con juguetes pequeños. Es independiente pero muy afectuosa con su familia.",
    estado: "disponible",
    fechaPublicacion: "2023-06-20T14:45:00Z",
    ubicacion: "Guadalajara",
    foto: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    nombre: "Rocky",
    especie: "perro",
    raza: "Bulldog",
    edad: "adulto",
    tamaño: "mediano",
    descripcion:
      "Rocky es un bulldog con mucha energía. Le encanta jugar y dar paseos. Es muy leal y protector con su familia.",
    estado: "adoptado",
    fechaPublicacion: "2023-04-10T09:15:00Z",
    ubicacion: "Monterrey",
    foto: "/placeholder.svg?height=400&width=600",
  },
]

// Get all pets
export const getPets = async (): Promise<Pet[]> => {
  // In a real application, this would fetch from a database or API
  // For GitHub Pages, we're using local data

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [...petsData]
}

// Get a pet by ID
export const getPetById = async (id: string): Promise<Pet | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const pet = petsData.find((p) => p.id === id)
  return pet || null
}

// Save a new pet
export const savePet = async (petData: Partial<Pet>, imageFile: File): Promise<Pet> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real application, we would upload the image to a server or cloud storage
  // For GitHub Pages, we're simulating this process

  // Generate a unique ID
  const id = Date.now().toString()

  // Create a URL for the image (in a real app, this would be the uploaded image URL)
  // For this demo, we'll use a data URL
  const imageUrl = await readFileAsDataURL(imageFile)

  // Create the new pet object
  const newPet: Pet = {
    id,
    nombre: petData.nombre || "",
    especie: petData.especie || "perro",
    raza: petData.raza || "",
    edad: petData.edad || "adulto",
    tamaño: petData.tamaño || "mediano",
    descripcion: petData.descripcion || "",
    estado: "disponible",
    fechaPublicacion: new Date().toISOString(),
    ubicacion: petData.ubicacion || "",
    foto: imageUrl,
  }

  // Add to our "database"
  petsData = [newPet, ...petsData]

  // In a real application, we would save this to a database or API
  // For GitHub Pages, we're just keeping it in memory

  return newPet
}

// Update pet status
export const updatePetStatus = async (id: string, status: "disponible" | "adoptado"): Promise<Pet> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const petIndex = petsData.findIndex((p) => p.id === id)

  if (petIndex === -1) {
    throw new Error("Mascota no encontrada")
  }

  // Update the pet status
  petsData[petIndex] = {
    ...petsData[petIndex],
    estado: status,
  }

  return petsData[petIndex]
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

