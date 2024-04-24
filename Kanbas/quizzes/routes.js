import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  // Create
  async function createQuiz(req, res) {
    const quiz = await dao.createQuiz(req.body);
    res.json(quiz);
  }
  async function createQuestion(req, res) {
    const { quizId } = req.params;
    let question;
    try {
      question = await dao.createQuestion(quizId, req.body);
    } catch (e) {
      res.sendStatus(422);
      return;
    }
    res.json(question);
  }

  // Read
  async function findAllQuizzes(req, res) {
    const quizzes = await dao.findAllQuizzes();
    res.json(quizzes);
  }
  async function findQuizById(req, res) {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    res.json(quiz);
  }
  async function findQuestionsByQuiz(req, res) {
    const { quizId } = req.params;
    const questions = await dao.findQuestionsByQuiz(quizId);
    res.json(questions);
  }

  // Update
  async function updateQuiz(req, res) {
    const { quizId } = req.params;
    const quiz = await dao.updateQuiz(quizId, res.body);
    res.json(quiz);
  }
  async function updateQuestion(req, res) {
    const { questionId } = req.params;
    let question;
    try {
      question = await dao.updateQuestion(questionId, res.body);
    } catch (e) {
      res.sendStatus(422);
      return;
    }
    res.json(question);
  }

  // Delete
  async function deleteQuiz(req, res) {
    const { quizId } = req.params;
    const status = await dao.deleteQuiz(quizId);
    res.json(quizId);
  }
  async function deleteQuestion(req, res) {
    const { questionId, quizId } = req.params;
    const status = dao.deleteQuestion(questionId, quizId);
    res.json(status);
  }

  app.post("/api/quizzes", createQuiz);
  app.get("/api/quizzes", findAllQuizzes);
  app.get("/api/quizzes/:quizId", findQuizById);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
  app.post("/api/quizzes/:quizId/questions", createQuestion);
  app.get("/api/quizzes/:quizId/questions", findQuestionsByQuiz);
  app.put("/api/quizzes/:quizId/questions/:questionId", updateQuestion);
  app.delete("/api/quizzes/:quizId/questions/:questionId", deleteQuestion);
}
