import express from "express";
import db from "../db/db";
import todoController from "../todosController/todos";

const router = express.Router();

router.get("/api/v1/todos", todoController.getAllTodos);
router.get("/api/v1/todos/:id", todoController.getTodo);
router.post("/api/v1/todos", todoController.createTodo);
router.delete("/api/v1/todos/:id", todoController.deleteTodo);
router.put("/api/v1/todos/:id", todoController.updateTodo);

export default router;
