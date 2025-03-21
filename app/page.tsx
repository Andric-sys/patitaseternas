import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Heart, Home, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-12 md:py-20 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue">Encuentra tu compañero perfecto</h1>
          <p className="text-lg text-gray-700">
            Patitas Eternas conecta mascotas que necesitan un hogar con familias amorosas. Adopta responsablemente y
            cambia una vida para siempre.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/mascotas">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-navy-blue">
                Ver mascotas <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sobre-nosotros">
              <Button variant="outline" className="border-navy-blue text-navy-blue">
                Conoce más
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Perros y gatos en adopción"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 rounded-lg my-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy-blue">¿Por qué adoptar con nosotros?</h2>
          <p className="text-gray-600 mt-2">Hacemos que el proceso de adopción sea seguro y sencillo</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full mb-4">
              <Heart className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold text-navy-blue mb-2">Adopción Responsable</h3>
            <p className="text-gray-600">
              Verificamos a todos los adoptantes para asegurar hogares amorosos y responsables.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full mb-4">
              <Home className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold text-navy-blue mb-2">Variedad de Mascotas</h3>
            <p className="text-gray-600">
              Perros y gatos de diferentes edades, tamaños y personalidades esperando un hogar.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full mb-4">
              <Shield className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold text-navy-blue mb-2">Proceso Seguro</h3>
            <p className="text-gray-600">
              Plataforma confiable con información detallada y soporte durante todo el proceso.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold text-navy-blue mb-4">¿Listo para cambiar una vida?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Miles de mascotas están esperando encontrar un hogar. Tu adopción puede hacer la diferencia.
        </p>
        <Link href="/mascotas">
          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-navy-blue">
            Encuentra tu compañero ideal
          </Button>
        </Link>
      </section>
    </div>
  )
}

