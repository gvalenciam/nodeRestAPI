import db from "../db/db";
import models from "../models";

class TodosController {
  getAllTodos(req, res) {
    models.Todo.findAll().then(todos =>
      res.status(200).send({
        success: "true",
        message: "todos retrieved successfully",
        todos
      })
    );
  }

  getTodo(req, res) {
    const id = parseInt(req.params.id, 10);

    models.Todo.findByPk(id).then(todo => {
      if (todo) {
        return res.status(200).send({
          success: "true",
          message: "todo retrieved successfully",
          todo
        });
      }

      return res.status(404).send({
        success: "false",
        message: "todo does not exist"
      });
    });
  }

  createTodo(req, res) {
    if (!req.body.title) {
      return res.status(400).send({
        success: "false",
        message: "title is required"
      });
    }

    models.Todo.findOne({
      where: { title: req.body.title }
    }).then(todoFound => {
      if (todoFound) {
        return res.status(403).send({
          success: "true",
          message: "A todo with that title exist already"
        });
      }

      const todo = {
        title: req.body.title
      };

      models.Todo.create(todo).then(todo => {
        return res.status(201).send({
          success: "true",
          message: "todo added successfully",
          todo
        });
      });
    });
  }

  updateTodo(req, res) {
    const id = parseInt(req.params.id, 10);

    models.Todo.findByPk(id).then(todo => {
      if (todo) {
        if (!req.body.title) {
          return res.status(400).send({
            success: "false",
            message: "title is required"
          });
        }

        models.Todo.update(
          { title: req.body.title },
          {
            where: {
              id: parseInt(req.params.id, 10)
            }
          }
        );

        return res.status(201).send({
          success: "true",
          message: "todo updated successfully"
        });
      }

      return res.status(404).send({
        success: "false",
        message: "todo does not exist"
      });
    });
  }

  deleteTodo(req, res) {
    const id = parseInt(req.params.id, 10);

    models.Todo.findByPk(id).then(todo => {
      if (todo) {
        models.Todo.destroy({
          where: {
            id: parseInt(req.params.id, 10)
          }
        });

        return res.status(200).send({
          success: "true",
          message: "Todo deleted successfuly"
        });
      }

      return res.status(404).send({
        success: "false",
        message: "todo does not exist"
      });
    });
  }
}

const todoController = new TodosController();
export default todoController;
