"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PayPalButton } from "@/components/paypal-button"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function MisSolicitudesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Redirect if not logged in
    if (status === "unauthenticated") {
      router.push("/api/auth/signin")
    }

    if (status === "authenticated") {
      fetchRequests()
    }
  }, [status, router])

  const fetchRequests = async () => {
    try {
      const response = await fetch(`/api/adoption-requests?userId=${session?.user.id}`)

      if (!response.ok) {
        throw new Error("Error al obtener las solicitudes")
      }

      const data = await response.json()
      setRequests(data)
    } catch (error) {
      console.error("Error fetching adoption requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = () => {
    // Refresh requests after successful payment
    fetchRequests()
  }

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-4xl">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (requests.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-navy-blue mb-6">Mis Solicitudes de Adopción</h1>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 mb-4">No tienes solicitudes de adopción</p>
            <Link href="/mascotas">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-navy-blue">Ver mascotas disponibles</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-navy-blue mb-6">Mis Solicitudes de Adopción</h1>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="approved">Aprobadas</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-6">
            {requests.map((request) => (
              <RequestCard key={request._id} request={request} onPaymentSuccess={handlePaymentSuccess} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="grid gap-6">
            {requests
              .filter((req) => req.estado === "pendiente")
              .map((request) => (
                <RequestCard key={request._id} request={request} onPaymentSuccess={handlePaymentSuccess} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="grid gap-6">
            {requests
              .filter((req) => req.estado === "aprobada")
              .map((request) => (
                <RequestCard key={request._id} request={request} onPaymentSuccess={handlePaymentSuccess} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid gap-6">
            {requests
              .filter((req) => req.estado === "completada")
              .map((request) => (
                <RequestCard key={request._id} request={request} onPaymentSuccess={handlePaymentSuccess} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RequestCard({ request, onPaymentSuccess }: { request: any; onPaymentSuccess: () => void }) {
  const pet = request.petId
  const formattedDate = format(new Date(request.fechaSolicitud), "d 'de' MMMM, yyyy", { locale: es })

  const getStatusBadge = () => {
    switch (request.estado) {
      case "pendiente":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Pendiente
          </Badge>
        )
      case "aprobada":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Aprobada
          </Badge>
        )
      case "rechazada":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            Rechazada
          </Badge>
        )
      case "completada":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Completada
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Solicitud para adoptar a {pet.nombre}</CardTitle>
            <CardDescription>Enviada el {formattedDate}</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative h-40 w-40 flex-shrink-0">
            <Image
              src={pet.foto || "/placeholder.svg?height=160&width=160"}
              alt={pet.nombre}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex-grow">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Especie</p>
                <p className="font-medium">{pet.especie === "perro" ? "Perro" : "Gato"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Raza</p>
                <p className="font-medium">{pet.raza || "No especificada"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Edad</p>
                <p className="font-medium">{pet.edad}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tamaño</p>
                <p className="font-medium">{pet.tamaño}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Tu mensaje</p>
              <p className="text-gray-700">{request.mensaje}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6 flex flex-col items-stretch gap-4">
        {request.estado === "aprobada" && (
          <div className="w-full">
            <h3 className="font-semibold mb-2">Completar adopción</h3>
            <PayPalButton adoptionRequestId={request._id} onSuccess={onPaymentSuccess} />
          </div>
        )}

        <div className="flex justify-between w-full">
          <Link href={`/mascotas/${pet._id}`}>
            <Button variant="outline">Ver mascota</Button>
          </Link>

          {request.estado === "completada" && (
            <Button className="bg-green-500 hover:bg-green-600 text-white">Descargar certificado</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

