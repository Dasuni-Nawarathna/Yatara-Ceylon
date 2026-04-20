import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  phone: string;
  email: string;
  password?: string;
  role: "admin" | "staff" | "fleet_manager" | "hotel_partner" | "customer";
  status: "active" | "disabled";
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { 
      type: String, 
      enum: ["admin", "staff", "fleet_manager", "hotel_partner", "customer"], 
      default: "customer" 
    },
    status: { 
      type: String, 
      enum: ["active", "disabled"], 
      default: "active" 
    },
  },
  { timestamps: true }
);

// Prevent mongoose from compiling the model multiple times in development
export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
