import { Document, Schema, model, Types } from "mongoose";

import { TokenInt } from "../ts/interfaces";

type TokenSchemaType = TokenInt & Document;

const TokenSchema = new Schema<TokenSchemaType>({
  refreshToken: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Token = model<TokenSchemaType>("Token", TokenSchema);

export default Token;
