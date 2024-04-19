import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    number: { type: String, required: true, unique: true },
    startDate: Date,
    endDate: Date,
    image: String,
  },
  { collection: "courses" }
);

export default courseSchema;
