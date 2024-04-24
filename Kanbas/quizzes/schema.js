import mongoose from "mongoose";

export const questionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizModel",
      required: true,
    },
    title: { type: String, default: "New Question" },
    points: { type: Number, default: 5 },
    text: { type: String, default: "" },
    order: Number,
    questionType: {
      type: String,
      enum: ["MULTIPLE_CHOICE", "TRUE_OR_FALSE", "FILL_IN_BLANKS"],
      default: "MULTIPLE_CHOICE",
    },
    multipleChoiceAnswers: [
      {
        answerText: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        order: { type: Number, required: true },
      },
    ],
    trueOrFalseAnswer: {
      type: String,
      enum: ["TRUE", "FALSE"],
    },
    fillInBlanksAnswers: [
      {
        correctAnswer: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        order: { type: Number, required: true },
      },
    ],
  },
  { collection: "questions" }
);

export const quizSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseModel",
      required: true,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuestionModel" }],
    title: { type: String, default: "New Quiz" },
    description: { type: String, default: "" },
    quizType: {
      type: String,
      enum: [
        "GRADED_QUIZ",
        "PRACTICE_QUIZ",
        "GRADED_SURVEY",
        "UNGRADED_SURVEY",
      ],
      default: "GRADED_QUIZ",
    },
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
      default: "QUIZZES",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 }, // in minutes
    multipleAttempts: { type: Boolean, default: false },
    showCorrectAnswers: { type: Boolean, default: false },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: Date,
    availableDate: Date,
    untilDate: Date,
    isPublished: { type: Boolean, default: false },
  },
  { collection: "quizzes" }
);
