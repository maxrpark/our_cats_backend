import { Document, Schema, model } from "mongoose";
import { UserSchemaInt } from "../ts/interfaces";

type UserSchemaType = UserSchemaInt & Document;

const UserSchema = new Schema<UserSchemaType>({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 3,
    maxlength: 12,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 5,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
  },
  verificationToken: {
    type: String,
    required: [true, "Name is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
});

const User = model<UserSchemaType>("User", UserSchema);

export default User;
