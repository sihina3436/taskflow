import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  gender?: "male" | "female";
  resetOTP?: string;
  resetOTPExpire?: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },

    resetOTP: String,
    resetOTPExpire: Date,
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
