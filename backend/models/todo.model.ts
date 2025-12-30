import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  user_id: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  due_date?: Date;
  priority: "low" | "medium" | "high";
  image: string;
}

const TodoSchema: Schema<ITodo> = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    due_date: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    image:{
        type: String,
        required: true,
    }

  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITodo>("Todo", TodoSchema);
