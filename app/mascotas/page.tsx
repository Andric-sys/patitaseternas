"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getPets } from "@/lib/pets"
import type { Pet } from "@/types/pet"

export default function MascotasPage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [filteredPets, setFilteredPets] = useState<Pet[]>([])
  const [activeTab, setActiveTab] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    especie: "",
    tamaño: "",
    edad: "",
  })

  useEffect(() => {
    const loadPets = async () => {
      const petsData = await getPets()
      setPets(petsData)
      setFilteredPets(petsData)
    }

    loadPets()
  }, [])

  useEffect(() => {
    let result = [...pets]

    // Filter by tab (adoption status)
    if (activeTab === "disponibles") {
      result = result.filter((pet) => pet.estado === "disponible")
    } else if (activeTab === "adoptados") {
      result = result.filter((pet) => pet.estado === "adoptado")
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (pet) =>
          pet.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.raza.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply dropdown filters
    if (filters.especie) {
      result = result.filter((pet) => pet.especie === filters.especie)
    }

    if (filters.tamaño) {
      result = result.filter((pet) => pet.tamaño === filters.tamaño)
    }

    if (filters.edad) {
      result = result.filter((pet) => pet.edad === filters.edad)
    }

    setFilteredPets(result)
  }, [pets, activeTab, searchTerm, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const resetFilters = () => {
    setFilters({
      especie: "",
      tamaño: "",
      edad: "",
    })
    setSearchTerm("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-navy-blue mb-6">Mascotas en Adopción</h1>

      {/* Tabs */}
      <Tabs defaultValue="todos" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="disponibles">Disponibles</TabsTrigger>
          <TabsTrigger value="adoptados">Adoptados</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search and Filters */}
      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nombre o raza..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Filtros:</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="especie">Especie</Label>
            <Select value={filters.especie} onValueChange={(value) => handleFilterChange("especie", value)}>
              <SelectTrigger id="especie">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="perro">Perro</SelectItem>
                <SelectItem value="gato">Gato</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="tamaño">Tamaño</Label>
            <Select value={filters.tamaño} onValueChange={(value) => handleFilterChange("tamaño", value)}>
              <SelectTrigger id="tamaño">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pequeño">Pequeño</SelectItem>
                <SelectItem value="mediano">Mediano</SelectItem>
                <SelectItem value="grande">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="edad">Edad</Label>
            <Select value={filters.edad} onValueChange={(value) => handleFilterChange("edad", value)}>
              <SelectTrigger id="edad">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="cachorro">Cachorro</SelectItem>
                <SelectItem value="joven">Joven</SelectItem>
                <SelectItem value="adulto">Adulto</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button variant="outline" onClick={resetFilters} className="w-full">
              Limpiar filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredPets.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600 mb-2">No se encontraron mascotas</h3>
          <p className="text-gray-500">Intenta con otros filtros o vuelve más tarde</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <Card key={pet.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={pet.foto || "/placeholder.svg?height=200&width=300"}
                  alt={pet.nombre}
                  fill
                  className="object-cover"
                />
                {pet.estado === "adoptado" && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Badge className="bg-green-500 text-white text-lg py-1 px-3">Adoptado</Badge>
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-navy-blue">{pet.nombre}</CardTitle>
                  <Badge variant={pet.especie === "perro" ? "default" : "secondary"}>
                    {pet.especie === "perro" ? "Perro" : "Gato"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Raza:</span> {pet.raza}
                  </p>
                  <p>
                    <span className="font-medium">Edad:</span> {pet.edad}
                  </p>
                  <p>
                    <span className="font-medium">Tamaño:</span> {pet.tamaño}
                  </p>
                  <p className="line-clamp-2">{pet.descripcion}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/mascotas/${pet.id}`} className="w-full">
                  <Button className="w-full bg-navy-blue hover:bg-navy-blue/90" disabled={pet.estado === "adoptado"}>
                    {pet.estado === "adoptado" ? "Adoptado" : "Ver detalles"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

