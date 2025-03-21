import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function MascotasPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-primary py-12 text-white">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Encuentra tu compañero ideal</h1>
            <p className="text-lg max-w-2xl">
              Explora nuestra lista de perros y gatos en busca de un hogar. Utiliza los filtros para encontrar la
              mascota perfecta para ti.
            </p>
          </div>
        </section>

        {/* Filters and Pets Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
                  <h2 className="text-xl font-semibold mb-6 text-primary">Filtros</h2>

                  {/* Search */}
                  <div className="mb-6">
                    <Label htmlFor="search" className="mb-2 block">
                      Buscar
                    </Label>
                    <Input id="search" placeholder="Nombre o descripción..." className="w-full" />
                  </div>

                  {/* Species Filter */}
                  <div className="mb-6">
                    <Label className="mb-2 block">Especie</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="perros" />
                        <label htmlFor="perros" className="text-sm cursor-pointer">
                          Perros
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="gatos" />
                        <label htmlFor="gatos" className="text-sm cursor-pointer">
                          Gatos
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Age Filter */}
                  <div className="mb-6">
                    <Label htmlFor="age" className="mb-2 block">
                      Edad
                    </Label>
                    <Select>
                      <SelectTrigger id="age">
                        <SelectValue placeholder="Seleccionar edad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cachorro">Cachorro (0-1 año)</SelectItem>
                        <SelectItem value="joven">Joven (1-3 años)</SelectItem>
                        <SelectItem value="adulto">Adulto (3-8 años)</SelectItem>
                        <SelectItem value="senior">Senior (8+ años)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Size Filter */}
                  <div className="mb-6">
                    <Label htmlFor="size" className="mb-2 block">
                      Tamaño
                    </Label>
                    <Select>
                      <SelectTrigger id="size">
                        <SelectValue placeholder="Seleccionar tamaño" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pequeño">Pequeño</SelectItem>
                        <SelectItem value="mediano">Mediano</SelectItem>
                        <SelectItem value="grande">Grande</SelectItem>
                        <SelectItem value="muy-grande">Muy Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Gender Filter */}
                  <div className="mb-6">
                    <Label htmlFor="gender" className="mb-2 block">
                      Género
                    </Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Seleccionar género" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="macho">Macho</SelectItem>
                        <SelectItem value="hembra">Hembra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Apply Filters Button */}
                  <Button className="w-full bg-secondary text-primary hover:bg-secondary/90">Aplicar Filtros</Button>
                </div>
              </div>

              {/* Pets Grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                        Max es un perro tranquilo y leal. Perfecto para familias o personas que buscan un compañero
                        fiel.
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Ver Detalles</Button>
                    </CardContent>
                  </Card>

                  {/* Pet Card 4 */}
                  <Card className="overflow-hidden">
                    <div className="relative h-64">
                      <Image src="/placeholder.svg?height=300&width=400" alt="Mia" fill className="object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">Mia</h3>
                        <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs font-medium">
                          Gato
                        </span>
                      </div>
                      <div className="flex gap-2 mb-4 text-sm text-gray-600">
                        <span>Siamés</span>
                        <span>•</span>
                        <span>4 años</span>
                        <span>•</span>
                        <span>Hembra</span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        Mia es una gata tranquila que adora los mimos. Ideal para un hogar tranquilo.
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Ver Detalles</Button>
                    </CardContent>
                  </Card>

                  {/* Pet Card 5 */}
                  <Card className="overflow-hidden">
                    <div className="relative h-64">
                      <Image src="/placeholder.svg?height=300&width=400" alt="Rocky" fill className="object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">Rocky</h3>
                        <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs font-medium">
                          Perro
                        </span>
                      </div>
                      <div className="flex gap-2 mb-4 text-sm text-gray-600">
                        <span>Pastor Alemán</span>
                        <span>•</span>
                        <span>5 años</span>
                        <span>•</span>
                        <span>Macho</span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        Rocky es un perro inteligente y protector. Excelente para familias activas.
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Ver Detalles</Button>
                    </CardContent>
                  </Card>

                  {/* Pet Card 6 */}
                  <Card className="overflow-hidden">
                    <div className="relative h-64">
                      <Image src="/placeholder.svg?height=300&width=400" alt="Coco" fill className="object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">Coco</h3>
                        <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs font-medium">
                          Gato
                        </span>
                      </div>
                      <div className="flex gap-2 mb-4 text-sm text-gray-600">
                        <span>Persa</span>
                        <span>•</span>
                        <span>2 años</span>
                        <span>•</span>
                        <span>Hembra</span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        Coco es una gata elegante y cariñosa. Le encanta la tranquilidad y los mimos.
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Ver Detalles</Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" className="w-10 h-10 p-0">
                      1
                    </Button>
                    <Button variant="outline" className="w-10 h-10 p-0">
                      2
                    </Button>
                    <Button variant="outline" className="w-10 h-10 p-0">
                      3
                    </Button>
                    <Button variant="outline" className="w-10 h-10 p-0">
                      ...
                    </Button>
                    <Button variant="outline" className="w-10 h-10 p-0">
                      10
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

