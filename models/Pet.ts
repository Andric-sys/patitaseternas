import mongoose, { Schema, type Document } from "mongoose"

export interface IPet extends Document {
  nombre: string
  especie: "perro" | "gato"
  raza: string
  edad: "cachorro" | "joven" | "adulto" | "senior"
  tamaño: "pequeño" | "mediano" | "grande"
  descripcion: string
  estado: "disponible" | "adoptado" | "en_proceso"
  fechaPublicacion: Date
  ubicacion?: string
  foto?: string
  createdBy?: mongoose.Schema.Types.ObjectId
}

const PetSchema: Schema = new Schema(
  {
    nombre: { type: String, required: true },
    especie: { type: String, required: true, enum: ["perro", "gato"] },
    raza: { type: String, required: false, default: "" },
    edad: { type: String, required: true, enum: ["cachorro", "joven", "adulto", "senior"] },
    tamaño: { type: String, required: true, enum: ["pequeño", "mediano", "grande"] },
    descripcion: { type: String, required: false, default: "" },
    estado: { type: String, required: true, enum: ["disponible", "adoptado", "en_proceso"], default: "disponible" },
    fechaPublicacion: { type: Date, default: Date.now },
    ubicacion: { type: String, required: false },
    foto: { type: String, required: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Pet || mongoose.model<IPet>("Pet", PetSchema)

