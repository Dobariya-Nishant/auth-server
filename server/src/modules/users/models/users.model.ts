import mongoose, { Document, Schema } from "mongoose";

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  session?: string;
  createdAt: Date;
  updatedAt: Date;
  age: Number;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, "UserName is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    session: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export { UserModel, UserDocument };
