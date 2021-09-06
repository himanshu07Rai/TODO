const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const authorisation = require("../middleware/authorisation");

router.get("/", authorisation, async (req, res) => {
  try {
    // console.log(req.user);
    const data = await pool.query(
      "SELECT u.user_id, u.user_name,u.user_email,t.todo_id,t.description FROM fsusers as u LEFT JOIN todos as t ON u.user_id = t.user_id WHERE u.user_id = $1 ORDER BY t.todo_id",
      [req.user]
    );
    res.json(data.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

router.post("/", authorisation, async (req, res) => {
  try {
    // console.log(req.user);
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (user_id,description) VALUES ($1,$2) RETURNING *",
      [req.user, description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", authorisation, async (req, res) => {
  try {
    const { id } = req.params; //where
    const { description } = req.body; //set
    const updatedTodo = await pool.query(
      "UPDATE todos SET description = $1 where todo_id = $2 AND user_id=$3 RETURNING *",
      [description, id, req.user]
    );

    if (updatedTodo.rows.length === 0) {
      return res.json("This todo is not yours");
    }
    res.json(updatedTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", authorisation, async (req, res) => {
  try {
    const { id } = req.params; //where
    // const { description } = req.body; //set
    const deletedTodo = await pool.query(
      "DELETE FROM todos where todo_id = $1  AND user_id=$2 RETURNING *",
      [id, req.user]
    );
    // console.log(deletedTodo);
    if (deletedTodo.rows.length === 0) {
      return res.json("This isn't your todo");
    }
    res.send(deletedTodo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
