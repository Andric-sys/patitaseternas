"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Check, Mail, MapPin, Phone } from "lucide-react"
import { sendContactForm } from "@/lib/contact"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, asunto: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      // Validate form
      if (!formData.nombre || !formData.email || !formData.asunto || !formData.mensaje) {
        throw new Error("Por favor completa todos los campos obligatorios")
      }

      // Send contact form
      await sendContactForm(formData)

      // Reset form
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        asunto: "",
        mensaje: "",
      })

      setSubmitStatus("success")
    } catch (error) {
      console.error("Error sending contact form:", error)
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Error al enviar el formulario")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-navy-blue mb-6">Contacto</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un mensaje</CardTitle>
              <CardDescription>
                Completa el formulario y nos pondremos en contacto contigo lo antes posible
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {submitStatus === "success" && (
                  <Alert className="bg-green-50 border-green-200">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800">¡Mensaje enviado!</AlertTitle>
                    <AlertDescription className="text-green-700">
                      Hemos recibido tu mensaje. Te responderemos lo antes posible.
                    </AlertDescription>
                  </Alert>
                )}

                {submitStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMessage || "Ha ocurrido un error al enviar el mensaje."}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre completo *</Label>
                    <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asunto">Asunto *</Label>
                    <Select value={formData.asunto} onValueChange={handleSelectChange} required>
                      <SelectTrigger id="asunto">
                        <SelectValue placeholder="Seleccionar asunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adopcion">Información sobre adopción</SelectItem>
                        <SelectItem value="publicacion">Publicar una mascota</SelectItem>
                        <SelectItem value="voluntariado">Voluntariado</SelectItem>
                        <SelectItem value="donacion">Donaciones</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje *</Label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    rows={5}
                    required
                  />
                </div>
              </CardContent>

              <CardFooter className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-navy-blue"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Información de contacto</CardTitle>
              <CardDescription>Otras formas de ponerte en contacto con nosotros</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-navy-blue">Correo electrónico</p>
                  <p className="text-gray-600">contacto@patitaseternas.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-navy-blue">Teléfono</p>
                  <p className="text-gray-600">+52 123 456 7890</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-navy-blue">Ubicación</p>
                  <p className="text-gray-600">
                    Av. Ejemplo 123
                    <br />
                    Col. Centro
                    <br />
                    Ciudad de México, CP 12345
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="font-medium text-navy-blue mb-2">Horario de atención</p>
                <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                <p className="text-gray-600">Sábados: 10:00 - 14:00</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

