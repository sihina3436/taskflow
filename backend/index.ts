import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import connectDB from "./src/config/db";

import { initSocket } from "./src/utils/socket";
import { startReminder } from "./src/utils/todoReminder";

import userRouter from "./src/router/user.route";
import todoRouter from "./src/router/todo.route";
import categoryRouter from "./src/router/category.route";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server running...");
});

app.use("/api/categories", categoryRouter);
app.use("/api/auth", userRouter);
app.use("/api/todos", todoRouter);

const server = http.createServer(app);

// ✅ Initialize socket first
const io = initSocket(server);

// ✅ Start reminder AFTER socket is ready
startReminder(io);

server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
