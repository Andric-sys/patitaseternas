"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, Ruler, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check } from "lucide-react"

export default function PetDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [pet, setPet] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [adoptionDialogOpen, setAdoptionDialogOpen] = useState(false)
  const [adoptionMessage, setAdoptionMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchPet = async () => {
      if (typeof params.id !== "string") {
        router.push("/mascotas")
        return
      }

      try {
        const response = await fetch(`/api/pets/${params.id}`)

        if (!response.ok) {
          throw new Error("Error al obtener la mascota")
        }

        const petData = await response.json()
        setPet(petData)
      } catch (error) {
        console.error("Error fetching pet:", error)
        router.push("/mascotas")
      } finally {
        setLoading(false)
      }
    }

    fetchPet()
  }, [params.id, router])

  const handleAdoptionRequest = async () => {
    if (!session) {
      // Redirect to login
      router.push("/api/auth/signin")
      return
    }

    setAdoptionDialogOpen(true)
  }

  const submitAdoptionRequest = async () => {
    if (!session || !pet) return

    setSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/adoption-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petId: pet._id,
          mensaje: adoptionMessage,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar la solicitud")
      }

      setSubmitStatus("success")

      // Update pet status locally
      setPet({
        ...pet,
        estado: "en_proceso",
      })

      // Close dialog after 2 seconds
      setTimeout(() => {
        setAdoptionDialogOpen(false)
      }, 2000)
    } catch (error) {
      console.error("Error submitting adoption request:", error)
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Error al enviar la solicitud")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-4xl">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!pet) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/mascotas">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a mascotas
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src={pet.foto || "/placeholder.svg?height=400&width=600"}
            alt={pet.nombre}
            fill
            className="object-cover"
            priority
          />
          {pet.estado !== "disponible" && (
            <div className="absolute top-4 right-4">
              <Badge
                className={`text-white text-lg py-1 px-3 ${
                  pet.estado === "adoptado" ? "bg-green-500" : "bg-yellow-500"
                }`}
              >
                {pet.estado === "adoptado" ? "Adoptado" : "En proceso"}
              </Badge>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-navy-blue">{pet.nombre}</h1>
            <Badge variant={pet.especie === "perro" ? "default" : "secondary"} className="text-sm">
              {pet.especie === "perro" ? "Perro" : "Gato"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="flex items-center p-4">
                <Ruler className="h-5 w-5 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Tamaño</p>
                  <p className="font-medium">{pet.tamaño}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-4">
                <Calendar className="h-5 w-5 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Edad</p>
                  <p className="font-medium">{pet.edad}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-4">
                <Heart className="h-5 w-5 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Raza</p>
                  <p className="font-medium">{pet.raza}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-4">
                <MapPin className="h-5 w-5 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Ubicación</p>
                  <p className="font-medium">{pet.ubicacion || "No especificada"}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-navy-blue mb-2">Sobre {pet.nombre}</h2>
            <p className="text-gray-700 whitespace-pre-line">{pet.descripcion}</p>
          </div>

          {pet.estado === "disponible" ? (
            <div className="space-y-4">
              <Button
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-navy-blue"
                onClick={handleAdoptionRequest}
                disabled={status === "loading"}
              >
                Solicitar adopción
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Al solicitar la adopción, nuestro equipo se pondrá en contacto contigo para iniciar el proceso.
              </p>
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-gray-600">
                {pet.estado === "adoptado"
                  ? "Esta mascota ya ha sido adoptada. ¡Hay muchas más esperando un hogar!"
                  : "Esta mascota está en proceso de adopción. ¡Hay muchas más esperando un hogar!"}
              </p>
              <Link href="/mascotas">
                <Button variant="link" className="text-navy-blue mt-2">
                  Ver otras mascotas
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Dialog open={adoptionDialogOpen} onOpenChange={setAdoptionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Solicitud de adopción para {pet.nombre}</DialogTitle>
            <DialogDescription>
              Cuéntanos por qué quieres adoptar a {pet.nombre} y cómo sería su nuevo hogar.
            </DialogDescription>
          </DialogHeader>

          {submitStatus === "success" ? (
            <Alert className="bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">¡Solicitud enviada!</AlertTitle>
              <AlertDescription className="text-green-700">
                Tu solicitud ha sido enviada correctamente. Te contactaremos pronto.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              {submitStatus === "error" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage || "Ha ocurrido un error al enviar la solicitud."}</AlertDescription>
                </Alert>
              )}

              <div className="py-4">
                <Textarea
                  placeholder="Describe por qué quieres adoptar a esta mascota, tu experiencia con mascotas, y cómo sería su nuevo hogar..."
                  value={adoptionMessage}
                  onChange={(e) => setAdoptionMessage(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setAdoptionDialogOpen(false)} disabled={submitting}>
                  Cancelar
                </Button>
                <Button
                  onClick={submitAdoptionRequest}
                  disabled={!adoptionMessage.trim() || submitting}
                  className="bg-yellow-400 hover:bg-yellow-500 text-navy-blue"
                >
                  {submitting ? "Enviando..." : "Enviar solicitud"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

