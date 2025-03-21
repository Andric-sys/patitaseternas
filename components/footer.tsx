import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-navy-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-white">Patitas</span>
              <span className="text-xl font-bold text-yellow-400">Eternas</span>
            </div>
            <p className="text-gray-300 mb-4">Conectando mascotas con familias amorosas desde 2023.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/mascotas" className="text-gray-300 hover:text-white">
                  Mascotas
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="text-gray-300 hover:text-white">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Adopción</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mascotas" className="text-gray-300 hover:text-white">
                  Ver mascotas
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Proceso de adopción
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Requisitos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">contacto@patitaseternas.com</li>
              <li className="text-gray-300">+52 123 456 7890</li>
              <li className="text-gray-300">
                Av. Ejemplo 123, Col. Centro
                <br />
                Ciudad de México, CP 12345
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Patitas Eternas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

