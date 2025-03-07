import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  name: string;
  phone: string;
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
});

const User = mongoose.model<User>("User", UserSchema);

export default User;
