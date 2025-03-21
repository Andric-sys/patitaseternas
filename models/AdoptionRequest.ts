import mongoose, { Schema, type Document } from "mongoose"

export interface IAdoptionRequest extends Document {
  petId: mongoose.Schema.Types.ObjectId
  userId: mongoose.Schema.Types.ObjectId
  estado: "pendiente" | "aprobada" | "rechazada" | "completada"
  fechaSolicitud: Date
  mensaje: string
  paymentId?: string
  paymentStatus?: "pending" | "completed" | "failed"
}

const AdoptionRequestSchema: Schema = new Schema(
  {
    petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    estado: {
      type: String,
      required: true,
      enum: ["pendiente", "aprobada", "rechazada", "completada"],
      default: "pendiente",
    },
    fechaSolicitud: { type: Date, default: Date.now },
    mensaje: { type: String, required: true },
    paymentId: { type: String, required: false },
    paymentStatus: {
      type: String,
      required: false,
      enum: ["pending", "completed", "failed"],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.AdoptionRequest ||
  mongoose.model<IAdoptionRequest>("AdoptionRequest", AdoptionRequestSchema)

