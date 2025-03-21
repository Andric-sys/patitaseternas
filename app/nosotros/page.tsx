import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Heart, Shield, Users, Award } from "lucide-react"

export default function NosotrosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-primary py-12 text-white">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Sobre Nosotros</h1>
            <p className="text-lg max-w-2xl">
              Conoce más sobre Patitas Eternas, nuestra misión y el equipo detrás de esta iniciativa.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary">Nuestra Misión</h2>
                <p className="text-lg text-gray-700 mb-6">
                  En Patitas Eternas, nos dedicamos a encontrar hogares amorosos y responsables para perros y gatos
                  abandonados o en situación de calle.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Creemos que cada mascota merece una segunda oportunidad y un hogar donde pueda recibir amor, cuidados
                  y atención. Trabajamos incansablemente para conectar a estas mascotas con familias que puedan
                  brindarles todo lo que necesitan.
                </p>
                <p className="text-lg text-gray-700">
                  Además de facilitar adopciones, educamos a la comunidad sobre la tenencia responsable de mascotas y
                  promovemos la esterilización como método para controlar la población animal.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Perros y gatos rescatados"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-primary text-center">Nuestros Valores</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Compasión</h3>
                    <p className="text-gray-600">
                      Actuamos con empatía y amor hacia todos los animales, reconociendo su valor y dignidad.
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
                    <h3 className="text-xl font-semibold mb-2">Responsabilidad</h3>
                    <p className="text-gray-600">
                      Promovemos la tenencia responsable y el compromiso a largo plazo con las mascotas adoptadas.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Comunidad</h3>
                    <p className="text-gray-600">
                      Trabajamos en colaboración con voluntarios, veterinarios y amantes de los animales.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Excelencia</h3>
                    <p className="text-gray-600">
                      Nos esforzamos por ofrecer el mejor servicio y cuidado tanto a las mascotas como a los adoptantes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-primary text-center">Nuestro Equipo</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="María Rodríguez"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">María Rodríguez</h3>
                  <p className="text-secondary font-medium mb-4">Fundadora y Directora</p>
                  <p className="text-gray-600">
                    Veterinaria con más de 15 años de experiencia en el cuidado animal. Fundó Patitas Eternas en 2015.
                  </p>
                </CardContent>
              </Card>

              {/* Team Member 2 */}
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Carlos Méndez"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">Carlos Méndez</h3>
                  <p className="text-secondary font-medium mb-4">Coordinador de Adopciones</p>
                  <p className="text-gray-600">
                    Especialista en comportamiento animal. Se encarga de evaluar y emparejar mascotas con familias
                    compatibles.
                  </p>
                </CardContent>
              </Card>

              {/* Team Member 3 */}
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <Image src="/placeholder.svg?height=300&width=300" alt="Ana Gómez" fill className="object-cover" />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">Ana Gómez</h3>
                  <p className="text-secondary font-medium mb-4">Veterinaria Principal</p>
                  <p className="text-gray-600">
                    Responsable de la salud y bienestar de todas las mascotas bajo nuestro cuidado.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Nuestra Historia</h2>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-secondary">2015: El Comienzo</h3>
                  <p className="text-gray-700">
                    Patitas Eternas nació como un pequeño proyecto de rescate animal liderado por María Rodríguez.
                    Comenzamos rescatando perros y gatos de las calles y buscándoles hogares a través de redes sociales.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-secondary">2017: Crecimiento</h3>
                  <p className="text-gray-700">
                    Con el apoyo de voluntarios y donantes, pudimos expandir nuestras operaciones y establecer nuestro
                    primer refugio temporal para mascotas rescatadas.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-secondary">2019: Plataforma Digital</h3>
                  <p className="text-gray-700">
                    Lanzamos nuestra plataforma digital para facilitar el proceso de adopción y llegar a más personas
                    interesadas en adoptar.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-secondary">2021: Expansión</h3>
                  <p className="text-gray-700">
                    Ampliamos nuestros servicios para incluir programas educativos sobre tenencia responsable y campañas
                    de esterilización.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-secondary">Hoy</h3>
                  <p className="text-gray-700">
                    Continuamos creciendo y mejorando nuestra plataforma para conectar a más mascotas con familias
                    amorosas. Hemos facilitado más de 1,000 adopciones exitosas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Únete a Nuestra Causa</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Hay muchas formas de apoyar nuestra misión. Puedes adoptar, donar, ser voluntario o ayudarnos a difundir
              nuestro mensaje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90">
                Adoptar
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Donar
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Ser Voluntario
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

