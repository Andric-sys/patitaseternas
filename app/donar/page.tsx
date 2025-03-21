"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { initPayPalButton, sendPaymentConfirmationEmail, generateReceiptPDF } from "@/lib/paypal"
import { useToast } from "@/hooks/use-toast"
import { Heart, Download } from "lucide-react"
import Script from "next/script"

export default function DonarPage() {
  const [amount, setAmount] = useState<number>(25)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [isPayPalReady, setIsPayPalReady] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [paymentDetails, setPaymentDetails] = useState<any>(null)

  const { toast } = useToast()

  // Inicializar el botón de PayPal cuando el script se carga
  useEffect(() => {
    if (isPayPalReady && !isProcessing && !isSuccess) {
      const finalAmount = customAmount ? Number.parseFloat(customAmount) : amount

      initPayPalButton("paypal-button-container", finalAmount, (details) => {
        setIsProcessing(true)
        setPaymentDetails(details)

        // Enviar correo de confirmación si se proporcionó un email
        if (email) {
          sendPaymentConfirmationEmail(email, details)
            .then(() => {
              toast({
                title: "Correo enviado",
                description: "Se ha enviado un recibo a tu correo electrónico.",
              })
            })
            .catch((error) => {
              console.error("Error al enviar el correo:", error)
              toast({
                title: "Error",
                description: "No se pudo enviar el correo de confirmación.",
                variant: "destructive",
              })
            })
        }

        setIsProcessing(false)
        setIsSuccess(true)
      })
    }
  }, [isPayPalReady, amount, customAmount, email, isProcessing, isSuccess, toast])

  const handleAmountChange = (value: number) => {
    setAmount(value)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomAmount(value)
    }
  }

  const handleDownloadReceipt = async () => {
    if (!paymentDetails) return

    try {
      const pdfBlob = await generateReceiptPDF(paymentDetails)

      // Crear un enlace para descargar el PDF
      const url = window.URL.createObjectURL(pdfBlob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "recibo-donacion.pdf")
      document.body.appendChild(link)
      link.click()

      // Limpiar
      link.parentNode?.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error al descargar el recibo:", error)
      toast({
        title: "Error",
        description: "No se pudo descargar el recibo.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-primary py-12 text-white">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Haz una Donación</h1>
            <p className="text-lg max-w-2xl">
              Tu generosidad nos ayuda a cuidar de nuestras mascotas y encontrarles un hogar amoroso. Cada donación
              marca la diferencia.
            </p>
          </div>
        </section>

        {/* Donation Form */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              {!isSuccess ? (
                <Card>
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-8">
                      <div className="bg-primary/10 p-4 rounded-full">
                        <Heart className="h-10 w-10 text-primary" />
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center mb-6 text-primary">Selecciona un monto para donar</h2>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <Button
                        variant={amount === 10 && !customAmount ? "default" : "outline"}
                        className={amount === 10 && !customAmount ? "bg-secondary text-primary" : ""}
                        onClick={() => handleAmountChange(10)}
                      >
                        $10
                      </Button>
                      <Button
                        variant={amount === 25 && !customAmount ? "default" : "outline"}
                        className={amount === 25 && !customAmount ? "bg-secondary text-primary" : ""}
                        onClick={() => handleAmountChange(25)}
                      >
                        $25
                      </Button>
                      <Button
                        variant={amount === 50 && !customAmount ? "default" : "outline"}
                        className={amount === 50 && !customAmount ? "bg-secondary text-primary" : ""}
                        onClick={() => handleAmountChange(50)}
                      >
                        $50
                      </Button>
                      <Button
                        variant={amount === 100 && !customAmount ? "default" : "outline"}
                        className={amount === 100 && !customAmount ? "bg-secondary text-primary" : ""}
                        onClick={() => handleAmountChange(100)}
                      >
                        $100
                      </Button>
                      <Button
                        variant={amount === 250 && !customAmount ? "default" : "outline"}
                        className={amount === 250 && !customAmount ? "bg-secondary text-primary" : ""}
                        onClick={() => handleAmountChange(250)}
                      >
                        $250
                      </Button>
                      <Button
                        variant={amount === 500 && !customAmount ? "default" : "outline"}
                        className={amount === 500 && !customAmount ? "bg-secondary text-primary" : ""}
                        onClick={() => handleAmountChange(500)}
                      >
                        $500
                      </Button>
                    </div>

                    <div className="mb-6">
                      <Label htmlFor="custom-amount" className="mb-2 block">
                        O ingresa un monto personalizado
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                        <Input
                          id="custom-amount"
                          type="text"
                          placeholder="Otro monto"
                          className="pl-8"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                        />
                      </div>
                    </div>

                    <div className="mb-8">
                      <Label htmlFor="email" className="mb-2 block">
                        Email (opcional, para recibir el recibo)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <Tabs defaultValue="paypal" className="mb-8">
                      <TabsList className="grid w-full grid-cols-1">
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      </TabsList>
                      <TabsContent value="paypal" className="mt-4">
                        <div id="paypal-button-container"></div>

                        {/* Script de PayPal */}
                        <Script
                          src="https://www.paypal.com/sdk/js?client-id=test&currency=USD"
                          onLoad={() => setIsPayPalReady(true)}
                        />
                      </TabsContent>
                    </Tabs>

                    <p className="text-sm text-gray-500 text-center">
                      Tu donación ayuda a cubrir gastos de alimentación, atención veterinaria, y mantenimiento de
                      nuestras instalaciones.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-8">
                      <div className="bg-green-100 p-4 rounded-full">
                        <Heart className="h-10 w-10 text-green-600" />
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center mb-4 text-primary">¡Gracias por tu donación!</h2>

                    <p className="text-center mb-8">
                      Tu generosa contribución nos ayudará a seguir cuidando de nuestras mascotas y encontrarles un
                      hogar amoroso.
                    </p>

                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                      <h3 className="font-semibold mb-4">Detalles de la transacción:</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">ID de Transacción:</span>
                          <span>{paymentDetails?.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fecha:</span>
                          <span>{new Date(paymentDetails?.create_time).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monto:</span>
                          <span>
                            ${paymentDetails?.purchase_units[0].amount.value}{" "}
                            {paymentDetails?.purchase_units[0].amount.currency_code}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Estado:</span>
                          <span className="text-green-600">{paymentDetails?.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="flex-1" onClick={handleDownloadReceipt}>
                        <Download className="mr-2 h-4 w-4" /> Descargar Recibo
                      </Button>

                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setIsSuccess(false)
                          setPaymentDetails(null)
                          setAmount(25)
                          setCustomAmount("")
                          setEmail("")
                        }}
                      >
                        Hacer otra donación
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Donation Info */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-3 rounded-full mb-4">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Alimentación</h3>
                      <p className="text-gray-600">
                        Tu donación ayuda a proporcionar alimentos de calidad a nuestras mascotas.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-3 rounded-full mb-4">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Atención Veterinaria</h3>
                      <p className="text-gray-600">Contribuyes a cubrir gastos médicos, vacunas y tratamientos.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-3 rounded-full mb-4">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Infraestructura</h3>
                      <p className="text-gray-600">
                        Ayudas a mantener y mejorar nuestras instalaciones para el bienestar animal.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

