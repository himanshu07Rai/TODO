const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const createError = require("http-errors");
const authorisation = require("../middleware/authorisation");
const prisma = require("../prisma/client");

router.get("/", authorisation, async (req, res, next) => {
  try {
    console.log(req.user);
    // const data = await pool.query(
    //   "SELECT u.user_id, u.user_name,u.user_email,t.todo_id,t.description FROM users as u LEFT JOIN todos as t ON u.user_id = t.user_id WHERE u.user_id = $1 ORDER BY t.todo_id",
    //   [req.user]
    // );

    const data = await prisma.user.findUnique({
      where: {
        user_id: req.user,
      },
      // include: {
      //   Todo: true,
      // },
      select: {
        user_email: true,
        user_name: true,
        Todo: true,
      },
    });
    res.json(data);
  } catch (error) {
    next(createError(500, error.message));
  }
});

router.get("/:id", authorisation, async (req, res, next) => {
  try {
    // console.log(req.user);
    const { id } = req.params;
    var numbers = /^[0-9]+$/;
    if (!id.match(numbers)) next(createError(400, "Not a valid id!"));
    // const todo = await pool.query(
    //   "SELECT * FROM todos WHERE todo_id = $1 AND user_id=$2",
    //   [id, req.user]
    // );
    // if (todo.rowCount === 0) next(createError("No such todo!"));
    const t = await prisma.todo.findUnique({
      where: {
        todo_id: Number(id),
      },
    });
    if (!t) next(createError("No such todo!"));
    else if (t.user_id !== req.user)
      next(createError(400, "This todo is not yours"));
    else res.json(t);
  } catch (error) {
    next(createError(500, "Server Error"));
  }
});

router.post("/", authorisation, async (req, res, next) => {
  try {
    // console.log(req.user);
    const { description } = req.body;
    if (description.length === 0)
      next(createError(401, "Description can't be empty!"));
    // const newTodo = await pool.query(
    //   "INSERT INTO todos (user_id,description) VALUES ($1,$2) RETURNING *",
    //   [req.user, description]
    // );
    else {
      const newTodo = await prisma.todo.create({
        data: {
          description,
          user_id: req.user,
        },
      });
      res.json(newTodo);
    }
  } catch (error) {
    next(createError(500, error.message));
  }
});

router.put("/:id", authorisation, async (req, res, next) => {
  try {
    const { id } = req.params;
    var numbers = /^[0-9]+$/;
    if (!id.match(numbers)) next(createError(400, "Not a valid id!"));
    const { description } = req.body;
    if (!description || description.length === 0)
      next(createError(401, "Description can't be empty!"));
    // const updatedTodo = await pool.query(
    //   "UPDATE todos SET description = $1 where todo_id = $2 AND user_id=$3 RETURNING *",
    //   [description, id, req.user]
    // );

    const t = await prisma.todo.findUnique({
      where: {
        todo_id: Number(id),
      },
    });
    if (!t) next(createError("No such todo!"));
    else if (t.user_id !== req.user)
      next(createError(400, "This todo is not yours"));
    else {
      const td = await prisma.todo.update({
        where: {
          todo_id: Number(id),
        },
        data: {
          description,
        },
      });
      res.json(td);
    }
  } catch (error) {
    next(createError(500, error.message));
  }
});

router.delete("/:id", authorisation, async (req, res, next) => {
  try {
    const { id } = req.params;

    var numbers = /^[0-9]+$/;
    if (!id.match(numbers)) next(createError(400, "Not a valid id!"));

    // const deletedTodo = await pool.query(
    //   "DELETE FROM todos where todo_id = $1  AND user_id=$2 RETURNING *",
    //   [id, req.user]
    // );
    // console.log("dt ", deletedTodo);

    const t = await prisma.todo.findUnique({
      where: {
        todo_id: Number(id),
      },
    });
    if (!t) next(createError("No such todo!"));
    else if (t.user_id !== req.user)
      next(createError(400, "This todo is not yours"));
    else {
      const deletedTodo = await prisma.todo.delete({
        where: {
          todo_id: Number(id),
        },
      });
      res.json(deletedTodo);
    }

    if (deletedTodo.rowCount === 0) {
      next(createError(401, "This isn't your todo"));
    } else res.json(deletedTodo.rows);
  } catch (error) {
    next(createError(500, "Server Error"));
  }
});

module.exports = router;
