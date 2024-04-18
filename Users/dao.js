import model from "./model.js";

export function createUser(user) {
  delete user._id;
  return model.create(user);
}
export function findAllUsers() {
  return model.find();
}
export function findUserById(userId) {
  return model.findById(userId);
}
export function findUserByUsername(username) {
  return model.findOne({ username });
}
export function findUsersByRole(role) {
  return model.find({ role });
}
export function findUserByCredentials(username, password) {
  return model.findOne({ username, password });
}
export function updateUser(userId, user) {
  return model.updateOne({ _id: userId }, { $set: user });
}
export function deleteUser(userId) {
  return model.deleteOne({ _id: userId });
}
