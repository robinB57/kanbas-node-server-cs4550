import express from "express";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import UserRoutes from "./Users/routes.js";

mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(express.json());

// Kanbas routes
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);

// Other routes
Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000);
