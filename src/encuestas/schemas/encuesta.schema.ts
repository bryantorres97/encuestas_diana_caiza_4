import { Schema } from 'mongoose';
import { userModelName } from '../../users/schemas/user.schema';

export const encuestaSchema = new Schema(
  {
    canton: { type: String, uppercase: true },
    parroquia: { type: String, uppercase: true },
    sector: { type: String, uppercase: true },
    edad: { type: Number },
    genero: { type: String, uppercase: true },
    respuesta1: { type: String, uppercase: true },
    respuesta2: { type: String, uppercase: true },
    respuesta3: { type: String, uppercase: true },
    respuesta4: { type: String, uppercase: true },
    respuesta5: { type: String, uppercase: true },
    respuesta6: { type: String, uppercase: true },
    respuesta7: { type: String, uppercase: true },
    respuesta8: { type: String, uppercase: true },
    respuesta9: { type: String, uppercase: true },
    respuesta10: { type: String, uppercase: true },
    respuesta11: { type: String, uppercase: true },
    respuesta12: { type: String, uppercase: true },
    respuesta13: { type: String, uppercase: true },
    respuesta14: { type: String, uppercase: true },
    respuesta15: { type: String, uppercase: true },
    longitud: { type: Number },
    latitud: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: userModelName },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const encuestaModelName = 'encuestas';
