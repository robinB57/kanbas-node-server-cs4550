import mongoose from "mongoose";
import { quizSchema, questionSchema } from "./schema.js";

export const questionModel = mongoode.model("QuestionModel", questionSchema);
export const quizModel = mongoose.model("QuizModel", quizSchema);
