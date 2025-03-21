import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Shield, Search } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=600&width=1920"
              alt="Mascotas en adopción"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="container mx-auto px-6 relative z-10 text-white">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Encuentra tu compañero perfecto</h1>
              <p className="text-xl mb-8">
                Patitas Eternas conecta mascotas en busca de un hogar con familias amorosas. Adopta, no compres.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90">
                  Ver Mascotas
                </Button>
                <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                  Cómo Adoptar
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">¿Por qué adoptar con nosotros?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Search className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Búsqueda Personalizada</h3>
                    <p className="text-gray-600">
                      Filtra por especie, raza, tamaño y edad para encontrar la mascota perfecta para tu hogar.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Adopción Segura</h3>
                    <p className="text-gray-600">
                      Proceso de verificación para asegurar que nuestras mascotas encuentren hogares responsables.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Seguimiento Post-Adopción</h3>
                    <p className="text-gray-600">
                      Te acompañamos después de la adopción para asegurar una transición feliz para todos.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Pets Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-primary">Mascotas Destacadas</h2>
              <Link href="/mascotas" className="text-secondary font-semibold hover:underline">
                Ver todas
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Pet Card 1 */}
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <Image src="/placeholder.svg?height=300&width=400" alt="Luna" fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Luna</h3>
                    <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs font-medium">
                      Perro
                    </span>
                  </div>
                  <div className="flex gap-2 mb-4 text-sm text-gray-600">
                    <span>Labrador</span>
                    <span>•</span>
                    <span>2 años</span>
                    <span>•</span>
                    <span>Hembra</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    Luna es juguetona, cariñosa y se lleva bien con niños. Está vacunada y lista para encontrar un
                    hogar.
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/90">Ver Detalles</Button>
                </CardContent>
              </Card>

              {/* Pet Card 2 */}
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <Image src="/placeholder.svg?height=300&width=400" alt="Simba" fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Simba</h3>
                    <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs font-medium">
                      Gato
                    </span>
                  </div>
                  <div className="flex gap-2 mb-4 text-sm text-gray-600">
                    <span>Atigrado</span>
                    <span>•</span>
                    <span>1 año</span>
                    <span>•</span>
                    <span>Macho</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    Simba es un gato muy sociable y juguetón. Le encanta estar con personas y otros gatos.
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/90">Ver Detalles</Button>
                </CardContent>
              </Card>

              {/* Pet Card 3 */}
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <Image src="/placeholder.svg?height=300&width=400" alt="Max" fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Max</h3>
                    <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs font-medium">
                      Perro
                    </span>
                  </div>
                  <div className="flex gap-2 mb-4 text-sm text-gray-600">
                    <span>Mestizo</span>
                    <span>•</span>
                    <span>3 años</span>
                    <span>•</span>
                    <span>Macho</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    Max es un perro tranquilo y leal. Perfecto para familias o personas que buscan un compañero fiel.
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/90">Ver Detalles</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para cambiar una vida?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Adoptar una mascota no solo cambia su vida, también cambiará la tuya. Da el primer paso hoy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90">
                Adoptar Ahora
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Donar
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

