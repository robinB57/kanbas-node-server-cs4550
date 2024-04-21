import model from "./model.js";
import { findCourseById } from "../courses/dao.js";

export async function createModuleForCourse(courseId, module) {
  delete module._id;
  const courseNum = (await findCourseById(courseId)).number;
  const moduleWithCourseNum = {
    ...module,
    course: courseNum,
  };
  return model.create(moduleWithCourseNum);
}
export async function findModulesByCourse(courseId) {
  const courseNum = (await findCourseById(courseId)).number;
  return model.find({ course: courseNum });
}
export function updateModule(moduleId, module) {
  return model.findByIdAndUpdate(
    { _id: moduleId },
    { $set: module },
    { returnDocument: "after" }
  );
}
export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId });
}
