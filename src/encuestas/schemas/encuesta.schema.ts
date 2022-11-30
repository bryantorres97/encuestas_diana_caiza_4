import { Schema } from 'mongoose';
import { userModelName } from '../../users/schemas/user.schema';

export const encuestaSchema = new Schema(
  {
    canton: { type: String, uppercase: true },
    parroquia: { type: String, uppercase: true },
    edad: { type: Number },
    genero: { type: String, uppercase: true },
    sector: { type: String, uppercase: true },
    pregunta1: { type: String, uppercase: true },
    longitud: { type: Number },
    latitud: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: userModelName },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const encuestaModelName = 'encuestas';
