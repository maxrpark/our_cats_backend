import { Document, Schema, model } from "mongoose";
import { UserSchemaInt } from "../ts/interfaces";
import bcrypt from "bcryptjs";

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

UserSchema.pre("save", async function () {
  if (!this.isDirectModified("password")) return;
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<Boolean> {
  let isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = model<UserSchemaType>("User", UserSchema);

export default User;
