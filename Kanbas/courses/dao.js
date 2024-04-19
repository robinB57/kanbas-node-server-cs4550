import model from "./model.js";

export function createCourse(course) {
  delete course._id;
  return model.create(course);
}
export function findAllCourses() {
  return model.find();
}
export function findCourseById(courseId) {
  return model.findById(courseId);
}
export function updateCourse(courseId, course) {
  return model.findByIdAndUpdate({ _id: courseId }, { $set: course });
}
export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}
