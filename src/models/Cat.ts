import mongoose, { Schema, Document, model } from "mongoose";
import { CatInt } from "../ts/interfaces";

type CatSchemaType = CatInt & Document;

const CatSchema = new Schema<CatSchemaType>({
  name: {
    type: String,
    required: [true, "please provide name"],
    minlength: 4,
    maxlength: 12,
  },
});

const Cat = model<CatSchemaType>("Cat", CatSchema);

export default Cat;
