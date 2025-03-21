import Link from "next/link"
import { PawPrint, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <PawPrint className="h-8 w-8 text-secondary" />
              <span className="text-xl font-bold">Patitas Eternas</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Facilitando el encuentro entre mascotas en busca de un hogar y adoptantes responsables.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-secondary">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-secondary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/mascotas" className="text-sm hover:text-secondary transition-colors">
                  Mascotas
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-sm hover:text-secondary transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm hover:text-secondary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-secondary">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-secondary" />
                <span>info@patitaseternas.com</span>
              </li>
              <li className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-secondary" />
                <span>+123 456 7890</span>
              </li>
              <li className="flex items-start text-sm">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-secondary" />
                <span>Calle Principal #123, Ciudad, País</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-secondary">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>© {new Date().getFullYear()} Patitas Eternas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

