"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PawPrint, Menu, X, LogIn } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <PawPrint className="h-8 w-8 text-secondary" />
          <span className="text-xl font-bold">Patitas Eternas</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-secondary transition-colors">
            Inicio
          </Link>
          <Link href="/mascotas" className="hover:text-secondary transition-colors">
            Mascotas
          </Link>
          <Link href="/nosotros" className="hover:text-secondary transition-colors">
            Sobre Nosotros
          </Link>
          <Link href="/contacto" className="hover:text-secondary transition-colors">
            Contacto
          </Link>
          <Button variant="outline" className="bg-secondary text-primary hover:bg-secondary/90">
            <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6 text-secondary" /> : <Menu className="h-6 w-6 text-secondary" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden container mx-auto mt-4 pb-4 flex flex-col space-y-4">
          <Link href="/" className="hover:text-secondary transition-colors" onClick={toggleMenu}>
            Inicio
          </Link>
          <Link href="/mascotas" className="hover:text-secondary transition-colors" onClick={toggleMenu}>
            Mascotas
          </Link>
          <Link href="/nosotros" className="hover:text-secondary transition-colors" onClick={toggleMenu}>
            Sobre Nosotros
          </Link>
          <Link href="/contacto" className="hover:text-secondary transition-colors" onClick={toggleMenu}>
            Contacto
          </Link>
          <Button variant="outline" className="bg-secondary text-primary hover:bg-secondary/90 w-full">
            <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
          </Button>
        </div>
      )}
    </nav>
  )
}

