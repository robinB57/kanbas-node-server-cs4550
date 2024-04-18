import * as dao from "./dao.js";

export default function UserRoutes(app) {
  async function createUser(req, res) {
    const user = await dao.createUser(req.body);
    res.json(user);
  }
  async function deleteUser(req, res) {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  }
  async function findAllUsers(req, res) {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  }
  async function findUserById(req, res) {
    console.log(req.params.userId);
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  }
  async function updateUser(req, res) {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    res.json(status);
  }
  async function signup(req, res) {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  }
  async function signin(req, res) {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);

    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Username or password is incorrect" });
    }
  }
  function signout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  }
  async function profile(req, res) {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  }
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
