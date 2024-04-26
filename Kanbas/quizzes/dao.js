import { questionModel, quizModel } from "./model.js";

function validateQuestion(question) {
  switch (question.questionType) {
    case "MULTIPLE_CHOICE":
      assert(question.multipleChoiceAnswers !== undefined);
      assert(question.multipleChoiceAnswers.length > 0);
      delete question.trueOrFalseAnswer;
      delete question.fillInBlanksAnswers;
    case "TRUE_OR_FALSE":
      assert(question.trueOrFalseAnswer !== undefined);
      delete question.multipleChoiceAnswers;
      delete question.fillInBlanksAnswers;
    case "FILL_IN_BLANKS":
      assert(question.fillInBlanksAnswers !== undefined);
      assert(question.fillInBlanksAnswers.length > 0);
      delete question.multipleChoiceAnswers;
      delete question.trueOrFalseAnswer;
    default:
      assert(false);
  }
}

export function createQuiz(quiz) {
  delete quiz._id;
  return quizModel.create(quiz);
}
export function findAllQuizzes() {
  return quizModel.find();
}
export function findQuizById(quizId) {
  return quizModel.findById(quizId);
}
export function updateQuiz(quizId, quiz) {
  return quizModel.findByIdAndUpdate(
    { _id: quizId },
    { $set: quiz },
    { returnDocument: "after" }
  );
}
export function deleteQuiz(quizId) {
  return quizModel.deleteOne({ _id: quizId });
}

export async function createQuestion(quizId, question) {
  try {
    validateQuestion(question);
  } catch (e) {
    return false;
  }
  const newQuestion = await questionModel.create({ ...question, quiz: quizId });
  await quizModel.updateOne(
    { _id: quizId },
    { $push: { questions: newQuestion._id } }
  );
  return newQuestion;
}
export async function findQuestionsByQuiz(quizId) {
  return questionModel.find({ quiz: quizId });
}
export function updateQuestion(questionId, question) {
  try {
    validateQuestion(question);
  } catch (e) {
    return false;
  }
  return questionModel.findByIdAndUpdate(
    { _id: questionId },
    { $set: question },
    { returnDocument: "after" }
  );
}

export async function deleteQuestion(questionId, quizId) {
  await quizModel.updateOne({ _id: quizId }, { $pull: { _id: questionId } });
  return questionModel.deleteOne({ _id: questionId });
}
