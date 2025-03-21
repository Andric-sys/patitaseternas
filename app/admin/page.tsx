"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import {
  PlusCircle,
  MoreVertical,
  Edit,
  Trash2,
  Check,
  X,
  Search,
  FileUp,
  Users,
  PawPrint,
  MessageSquare,
} from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("mascotas")
  const [isAddPetDialogOpen, setIsAddPetDialogOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-primary py-8 text-white">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-lg">Gestiona mascotas, adopciones y usuarios desde un solo lugar.</p>
          </div>
        </section>

        {/* Admin Dashboard */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* Stats Card 1 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Mascotas Activas</p>
                      <h3 className="text-3xl font-bold text-primary mt-1">42</h3>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <PawPrint className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card 2 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Adopciones Completadas</p>
                      <h3 className="text-3xl font-bold text-green-600 mt-1">18</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card 3 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Usuarios Registrados</p>
                      <h3 className="text-3xl font-bold text-blue-600 mt-1">156</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card 4 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Mensajes Nuevos</p>
                      <h3 className="text-3xl font-bold text-yellow-600 mt-1">7</h3>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <MessageSquare className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="mascotas" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-3 md:w-[400px]">
                <TabsTrigger value="mascotas">Mascotas</TabsTrigger>
                <TabsTrigger value="adopciones">Adopciones</TabsTrigger>
                <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
              </TabsList>

              {/* Mascotas Tab */}
              <TabsContent value="mascotas" className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <h2 className="text-2xl font-bold text-primary">Gestión de Mascotas</h2>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="Buscar mascota..." className="pl-10 w-full md:w-[250px]" />
                    </div>

                    <Dialog open={isAddPetDialogOpen} onOpenChange={setIsAddPetDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-secondary text-primary hover:bg-secondary/90">
                          <PlusCircle className="mr-2 h-4 w-4" /> Agregar Mascota
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Agregar Nueva Mascota</DialogTitle>
                          <DialogDescription>
                            Completa el formulario para agregar una nueva mascota al sistema.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="nombre">Nombre</Label>
                              <Input id="nombre" placeholder="Nombre de la mascota" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="especie">Especie</Label>
                              <Select>
                                <SelectTrigger id="especie">
                                  <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="perro">Perro</SelectItem>
                                  <SelectItem value="gato">Gato</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="raza">Raza</Label>
                              <Input id="raza" placeholder="Raza" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edad">Edad</Label>
                              <Input id="edad" placeholder="Edad en años" type="number" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="genero">Género</Label>
                              <Select>
                                <SelectTrigger id="genero">
                                  <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="macho">Macho</SelectItem>
                                  <SelectItem value="hembra">Hembra</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="tamaño">Tamaño</Label>
                              <Select>
                                <SelectTrigger id="tamaño">
                                  <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pequeño">Pequeño</SelectItem>
                                  <SelectItem value="mediano">Mediano</SelectItem>
                                  <SelectItem value="grande">Grande</SelectItem>
                                  <SelectItem value="muy-grande">Muy Grande</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="descripcion">Descripción</Label>
                            <Textarea id="descripcion" placeholder="Descripción de la mascota..." rows={3} />
                          </div>

                          <div className="space-y-2">
                            <Label>Características</Label>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox id="vacunado" />
                                <label htmlFor="vacunado" className="text-sm">
                                  Vacunado
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="esterilizado" />
                                <label htmlFor="esterilizado" className="text-sm">
                                  Esterilizado
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="niños" />
                                <label htmlFor="niños" className="text-sm">
                                  Apto para niños
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="otros-animales" />
                                <label htmlFor="otros-animales" className="text-sm">
                                  Convive con otros animales
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="fotos">Fotos</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                              <FileUp className="mx-auto h-8 w-8 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-500">
                                Arrastra y suelta imágenes o haz clic para seleccionar
                              </p>
                              <Input id="fotos" type="file" className="hidden" accept="image/*" multiple />
                              <Button
                                variant="outline"
                                className="mt-2"
                                onClick={() => document.getElementById("fotos")?.click()}
                              >
                                Seleccionar Archivos
                              </Button>
                            </div>
                          </div>
                        </div>

                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddPetDialogOpen(false)}>
                            Cancelar
                          </Button>
                          <Button className="bg-secondary text-primary hover:bg-secondary/90">Guardar Mascota</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mascota</TableHead>
                          <TableHead>Especie</TableHead>
                          <TableHead>Raza</TableHead>
                          <TableHead>Edad</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Fecha de Ingreso</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full overflow-hidden relative">
                                <Image
                                  src="/placeholder.svg?height=40&width=40"
                                  alt="Luna"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span>Luna</span>
                            </div>
                          </TableCell>
                          <TableCell>Perro</TableCell>
                          <TableCell>Labrador</TableCell>
                          <TableCell>2 años</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Disponible</Badge>
                          </TableCell>
                          <TableCell>15/03/2023</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" /> Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Check className="mr-2 h-4 w-4" /> Marcar como Adoptado
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full overflow-hidden relative">
                                <Image
                                  src="/placeholder.svg?height=40&width=40"
                                  alt="Simba"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span>Simba</span>
                            </div>
                          </TableCell>
                          <TableCell>Gato</TableCell>
                          <TableCell>Atigrado</TableCell>
                          <TableCell>1 año</TableCell>
                          <TableCell>
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En Proceso</Badge>
                          </TableCell>
                          <TableCell>02/02/2023</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" /> Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Check className="mr-2 h-4 w-4" /> Marcar como Adoptado
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full overflow-hidden relative">
                                <Image
                                  src="/placeholder.svg?height=40&width=40"
                                  alt="Max"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span>Max</span>
                            </div>
                          </TableCell>
                          <TableCell>Perro</TableCell>
                          <TableCell>Mestizo</TableCell>
                          <TableCell>3 años</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Reservado</Badge>
                          </TableCell>
                          <TableCell>10/01/2023</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" /> Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Check className="mr-2 h-4 w-4" /> Marcar como Adoptado
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Adopciones Tab */}
              <TabsContent value="adopciones" className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <h2 className="text-2xl font-bold text-primary">Gestión de Adopciones</h2>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="Buscar adopción..." className="pl-10 w-full md:w-[250px]" />
                    </div>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Mascota</TableHead>
                          <TableHead>Adoptante</TableHead>
                          <TableHead>Fecha de Solicitud</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">#A001</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="h-8 w-8 rounded-full overflow-hidden relative">
                                <Image
                                  src="/placeholder.svg?height=32&width=32"
                                  alt="Luna"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span>Luna</span>
                            </div>
                          </TableCell>
                          <TableCell>Juan Pérez</TableCell>
                          <TableCell>18/03/2023</TableCell>
                          <TableCell>
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En Revisión</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" /> Ver Detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Check className="mr-2 h-4 w-4" /> Aprobar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <X className="mr-2 h-4 w-4" /> Rechazar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium">#A002</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="h-8 w-8 rounded-full overflow-hidden relative">
                                <Image
                                  src="/placeholder.svg?height=32&width=32"
                                  alt="Max"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span>Max</span>
                            </div>
                          </TableCell>
                          <TableCell>María González</TableCell>
                          <TableCell>15/03/2023</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" /> Ver Detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Check className="mr-2 h-4 w-4" /> Completar Adopción
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium">#A003</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="h-8 w-8 rounded-full overflow-hidden relative">
                                <Image
                                  src="/placeholder.svg?height=32&width=32"
                                  alt="Simba"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span>Simba</span>
                            </div>
                          </TableCell>
                          <TableCell>Carlos Rodríguez</TableCell>
                          <TableCell>10/03/2023</TableCell>
                          <TableCell>
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" /> Ver Detalles
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Usuarios Tab */}
              <TabsContent value="usuarios" className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <h2 className="text-2xl font-bold text-primary">Gestión de Usuarios</h2>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="Buscar usuario..." className="pl-10 w-full md:w-[250px]" />
                    </div>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Teléfono</TableHead>
                          <TableHead>Fecha de Registro</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Juan Pérez</TableCell>
                          <TableCell>juan.perez@email.com</TableCell>
                          <TableCell>+123 456 7890</TableCell>
                          <TableCell>15/01/2023</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verificado</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" /> Ver Perfil
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <X className="mr-2 h-4 w-4" /> Suspender
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium">María González</TableCell>
                          <TableCell>maria.gonzalez@email.com</TableCell>
                          <TableCell>+123 456 7891</TableCell>
                          <TableCell>20/02/2023</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verificado</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" /> Ver Perfil
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <X className="mr-2 h-4 w-4" /> Suspender
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium">Carlos Rodríguez</TableCell>
                          <TableCell>carlos.rodriguez@email.com</TableCell>
                          <TableCell>+123 456 7892</TableCell>
                          <TableCell>05/03/2023</TableCell>
                          <TableCell>
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" /> Ver Perfil
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Check className="mr-2 h-4 w-4" /> Verificar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <X className="mr-2 h-4 w-4" /> Rechazar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

