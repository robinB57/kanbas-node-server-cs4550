import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  // Create
  async function createCourse(req, res) {
    const course = await dao.createCourse(req.body);
    res.json(course);
  }

  // Read
  async function findAllCourses(req, res) {
    const courses = await dao.findAllCourses();
    res.json(courses);
  }
  async function findCourseById(req, res) {
    const { courseId } = req.params;
    const course = await dao.findCourseById(courseId);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.json(course);
  }

  // Update
  async function updateCourse(req, res) {
    const { courseId } = req.params;
    const course = await dao.updateCourse(courseId, req.body);
    res.json(course);
  }

  // Delete
  async function deleteCourse(req, res) {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.json(status);
  }

  app.post("/api/courses", createCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:courseId", findCourseById);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
}
