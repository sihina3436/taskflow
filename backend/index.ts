import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import connectDB from "./src/config/db";

import { initSocket } from "./src/utils/socket";
import "./src/utils/todoReminder";

import userRouter from "./src/router/user.route";
import todoRouter from "./src/router/todo.route";
import categoryRouter from "./src/router/category.route";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello, World!");
});

app.use("/api/categories", categoryRouter);
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

const server = http.createServer(app);
initSocket(server);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
