"use client"

import type React from "react"

import { useState, useRef, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check, Upload } from "lucide-react"
import { savePet, getPets, updatePetStatus } from "@/lib/pets"
import type { Pet } from "@/types/pet"
import Image from "next/image"

export default function AdminPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    tamaño: "",
    descripcion: "",
    ubicacion: "",
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [pets, setPets] = useState<Pet[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load pets on tab change
  const handleTabChange = async (value: string) => {
    if (value === "manage") {
      try {
        const petsData = await getPets()
        setPets(petsData)
      } catch (error) {
        console.error("Error loading pets:", error)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      // Validate form
      if (!formData.nombre || !formData.especie || !formData.edad || !formData.tamaño) {
        throw new Error("Por favor completa todos los campos obligatorios")
      }

      if (!selectedFile) {
        throw new Error("Por favor selecciona una imagen")
      }

      // Create new pet object
      const newPet: Partial<Pet> = {
        ...formData,
        estado: "disponible",
        fechaPublicacion: new Date().toISOString(),
      }

      // Save pet data and upload image
      await savePet(newPet, selectedFile)

      // Reset form
      setFormData({
        nombre: "",
        especie: "",
        raza: "",
        edad: "",
        tamaño: "",
        descripcion: "",
        ubicacion: "",
      })
      setSelectedFile(null)
      setPreviewUrl(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      setSubmitStatus("success")

      // Reload pets list
      const petsData = await getPets()
      setPets(petsData)
    } catch (error) {
      console.error("Error saving pet:", error)
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Error al guardar la mascota")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStatusChange = async (petId: string, newStatus: "disponible" | "adoptado") => {
    try {
      await updatePetStatus(petId, newStatus)

      // Update local state
      setPets((prev) => prev.map((pet) => (pet.id === petId ? { ...pet, estado: newStatus } : pet)))
    } catch (error) {
      console.error("Error updating pet status:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-navy-blue mb-6">Panel de Administración</h1>

      <Tabs defaultValue="create" className="w-full" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="create">Crear Publicación</TabsTrigger>
          <TabsTrigger value="manage">Gestionar Mascotas</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Nueva Mascota</CardTitle>
              <CardDescription>Completa el formulario para publicar una nueva mascota en adopción</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {submitStatus === "success" && (
                  <Alert className="bg-green-50 border-green-200">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800">¡Publicación creada!</AlertTitle>
                    <AlertDescription className="text-green-700">
                      La mascota ha sido publicada correctamente.
                    </AlertDescription>
                  </Alert>
                )}

                {submitStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {errorMessage || "Ha ocurrido un error al crear la publicación."}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre *</Label>
                    <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="especie">Especie *</Label>
                    <Select
                      value={formData.especie}
                      onValueChange={(value) => handleSelectChange("especie", value)}
                      required
                    >
                      <SelectTrigger id="especie">
                        <SelectValue placeholder="Seleccionar especie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="perro">Perro</SelectItem>
                        <SelectItem value="gato">Gato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="raza">Raza</Label>
                    <Input id="raza" name="raza" value={formData.raza} onChange={handleInputChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edad">Edad *</Label>
                    <Select value={formData.edad} onValueChange={(value) => handleSelectChange("edad", value)} required>
                      <SelectTrigger id="edad">
                        <SelectValue placeholder="Seleccionar edad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cachorro">Cachorro</SelectItem>
                        <SelectItem value="joven">Joven</SelectItem>
                        <SelectItem value="adulto">Adulto</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tamaño">Tamaño *</Label>
                    <Select
                      value={formData.tamaño}
                      onValueChange={(value) => handleSelectChange("tamaño", value)}
                      required
                    >
                      <SelectTrigger id="tamaño">
                        <SelectValue placeholder="Seleccionar tamaño" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pequeño">Pequeño</SelectItem>
                        <SelectItem value="mediano">Mediano</SelectItem>
                        <SelectItem value="grande">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ubicacion">Ubicación</Label>
                    <Input id="ubicacion" name="ubicacion" value={formData.ubicacion} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Describe la personalidad, historia y características de la mascota..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Foto *</Label>
                  <div
                    className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={triggerFileInput}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />

                    {previewUrl ? (
                      <div className="relative h-48 w-full max-w-xs mb-4">
                        <Image
                          src={previewUrl || "/placeholder.svg"}
                          alt="Vista previa"
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    )}

                    <p className="text-sm text-gray-500">
                      {previewUrl ? "Haz clic para cambiar la imagen" : "Haz clic para subir una imagen"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG o GIF. Máximo 5MB.</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-navy-blue"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Guardando..." : "Publicar mascota"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Gestionar Mascotas</CardTitle>
              <CardDescription>Administra las publicaciones de mascotas existentes</CardDescription>
            </CardHeader>
            <CardContent>
              {pets.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No hay mascotas publicadas</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {pets.map((pet) => (
                    <div key={pet.id} className="flex flex-col md:flex-row gap-4 border rounded-lg p-4">
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <Image
                          src={pet.foto || "/placeholder.svg?height=100&width=100"}
                          alt={pet.nombre}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-navy-blue">{pet.nombre}</h3>
                            <p className="text-sm text-gray-500">
                              {pet.especie === "perro" ? "Perro" : "Gato"} • {pet.raza} • {pet.edad}
                            </p>
                          </div>
                          <div>
                            <Select
                              value={pet.estado}
                              onValueChange={(value) => handleStatusChange(pet.id, value as "disponible" | "adoptado")}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="disponible">Disponible</SelectItem>
                                <SelectItem value="adoptado">Adoptado</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <p className="text-sm line-clamp-2 mt-2">{pet.descripcion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

