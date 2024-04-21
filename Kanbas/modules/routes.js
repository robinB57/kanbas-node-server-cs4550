import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  // Create
  async function createModule(req, res) {
    const { courseId } = req.params;
    const module = await dao.createModuleForCourse(courseId, req.body);
    res.json(module);
  }

  // Read
  async function findModulesByCourse(req, res) {
    const { courseId } = req.params;
    const modules = await dao.findModulesByCourse(courseId);
    res.send(modules);
  }

  // Update
  async function updateModule(req, res) {
    const { moduleId } = req.params;
    const module = await dao.updateModule(moduleId, req.body);
    res.json(module);
  }

  // Delete
  async function deleteModule(req, res) {
    const { moduleId } = req.params;
    const status = await dao.deleteModule(moduleId);
    res.json(status);
  }

  app.post("/api/courses/:courseId/modules", createModule);
  app.get("/api/courses/:courseId/modules", findModulesByCourse);
  app.put("/api/modules/:moduleId", updateModule);
  app.delete("/api/modules/:moduleId", deleteModule);
}
