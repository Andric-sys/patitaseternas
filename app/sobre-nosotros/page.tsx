import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Shield, Award } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-navy-blue mb-6">Sobre Nosotros</h1>

        <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-8">
          <Image
            src="/placeholder.svg?height=300&width=800"
            alt="Equipo de Patitas Eternas"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose max-w-none mb-12">
          <h2 className="text-2xl font-semibold text-navy-blue">Nuestra Misión</h2>
          <p className="text-gray-700">
            En Patitas Eternas, nos dedicamos a conectar mascotas que necesitan un hogar con familias amorosas y
            responsables. Creemos que cada animal merece una segunda oportunidad y un hogar donde sea querido y cuidado.
          </p>
          <p className="text-gray-700">
            Nuestra plataforma nació de la necesidad de crear un espacio seguro y confiable donde los amantes de los
            animales puedan encontrar a su compañero ideal, y donde las mascotas abandonadas o en situación de
            vulnerabilidad puedan tener una nueva oportunidad.
          </p>

          <h2 className="text-2xl font-semibold text-navy-blue mt-8">Nuestros Valores</h2>
          <p className="text-gray-700">
            Trabajamos con pasión y dedicación para asegurar que cada adopción sea exitosa y duradera. Nuestros valores
            fundamentales guían todo lo que hacemos:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="flex items-start p-6">
              <div className="mr-4 mt-1">
                <Heart className="h-8 w-8 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-blue text-lg mb-2">Amor por los Animales</h3>
                <p className="text-gray-600">
                  Creemos que cada mascota merece ser amada y respetada. Trabajamos incansablemente para encontrar
                  hogares donde sean tratadas como miembros de la familia.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start p-6">
              <div className="mr-4 mt-1">
                <Shield className="h-8 w-8 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-blue text-lg mb-2">Adopción Responsable</h3>
                <p className="text-gray-600">
                  Promovemos la adopción responsable, asegurándonos de que los adoptantes comprendan el compromiso que
                  implica tener una mascota y estén preparados para ello.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start p-6">
              <div className="mr-4 mt-1">
                <Users className="h-8 w-8 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-blue text-lg mb-2">Comunidad</h3>
                <p className="text-gray-600">
                  Fomentamos una comunidad de amantes de los animales que comparten experiencias, consejos y apoyo mutuo
                  en el cuidado de sus mascotas.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start p-6">
              <div className="mr-4 mt-1">
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-blue text-lg mb-2">Transparencia</h3>
                <p className="text-gray-600">
                  Operamos con total transparencia, proporcionando información clara y precisa sobre cada mascota y los
                  procesos de adopción.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="prose max-w-none mb-12">
          <h2 className="text-2xl font-semibold text-navy-blue">Nuestro Equipo</h2>
          <p className="text-gray-700">
            Somos un equipo de apasionados por los animales, comprometidos con la causa de la adopción responsable. Cada
            miembro aporta sus habilidades y experiencia para hacer de Patitas Eternas una plataforma confiable y
            efectiva.
          </p>
          <p className="text-gray-700">
            Desde veterinarios hasta especialistas en comportamiento animal, nuestro equipo está aquí para ayudarte en
            cada paso del proceso de adopción y asegurarse de que tanto tú como tu nueva mascota tengan una experiencia
            positiva.
          </p>

          <h2 className="text-2xl font-semibold text-navy-blue mt-8">Únete a Nuestra Causa</h2>
          <p className="text-gray-700">
            Si compartes nuestra pasión por los animales y quieres contribuir a nuestra misión, hay muchas formas de
            hacerlo:
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Adopta una mascota y dale un hogar amoroso</li>
            <li>Comparte nuestras publicaciones para ayudar a difundir las mascotas disponibles</li>
            <li>Conviértete en hogar temporal para mascotas en espera de adopción</li>
            <li>Dona para ayudar a cubrir gastos veterinarios y de cuidado</li>
            <li>Voluntariado en eventos y actividades de la plataforma</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Juntos podemos hacer la diferencia en la vida de muchas mascotas y crear un mundo donde ningún animal sea
            abandonado o maltratado.
          </p>
        </div>
      </div>
    </div>
  )
}

