export interface Pet {
  id: string
  nombre: string
  especie: "perro" | "gato"
  raza: string
  edad: "cachorro" | "joven" | "adulto" | "senior"
  tamaño: "pequeño" | "mediano" | "grande"
  descripcion: string
  estado: "disponible" | "adoptado"
  fechaPublicacion: string
  ubicacion?: string
  foto?: string
}

