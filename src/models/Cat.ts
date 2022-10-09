import mongoose, { Schema, Document, model, Types } from "mongoose";
import { CatInt } from "../ts/interfaces";

type CatSchemaType = CatInt & Document;

const CatSchema = new Schema<CatSchemaType>({
  name: {
    type: String,
    required: [true, "please provide name"],
    minlength: 4,
    maxlength: 12,
  },
  human: [{ type: Types.ObjectId, ref: "User", unique: true, required: true }],
});

const Cat = model<CatSchemaType>("Cat", CatSchema);

export default Cat;
