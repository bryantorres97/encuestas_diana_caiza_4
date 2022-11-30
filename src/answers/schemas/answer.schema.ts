import { Schema } from 'mongoose';

export const answerSchema = new Schema(
  {
    data: { type: String },
  },
  { timestamps: true },
);

export const answerModelName = 'answers';
