"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Mascotas", href: "/mascotas" },
  { label: "Sobre Nosotros", href: "/sobre-nosotros" },
  { label: "Contacto", href: "/contacto" },
  { label: "Admin", href: "/admin" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-navy-blue">Patitas</span>
            <span className="text-2xl font-bold text-yellow-400">Eternas</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-navy-blue",
                pathname === item.href ? "text-navy-blue" : "text-gray-500",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-navy-blue">Adoptar</Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b py-4">
                <div className="flex items-center">
                  <span className="text-xl font-bold text-navy-blue">Patitas</span>
                  <span className="text-xl font-bold text-yellow-400">Eternas</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex flex-col gap-4 py-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-navy-blue px-2 py-1",
                      pathname === item.href ? "text-navy-blue bg-gray-100 rounded-md" : "text-gray-500",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pb-6">
                <Button
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-navy-blue"
                  onClick={() => {
                    setIsOpen(false)
                    window.location.href = "/mascotas"
                  }}
                >
                  Adoptar
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

